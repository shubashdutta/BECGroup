import { AdminGetSalaryStatement } from "@/src/ApiList/AdminApi";
import ImagePreview from "@/src/lib/ImagePreview/ImagePreview";
import { errorMessage } from "@/src/lib/ToastifyMessage/ToastifyMessage";
import { HtmlDateFormat } from "@/src/utils/formatArrayToLocalDate";
import React, { FC, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ExcelDonwloadBtn from "@/src/Common/ExcelDonwloadBtn";
import { exportToExcelDynamic } from "@/src/Common/ExcelDobwload/test";
import { Download } from "lucide-react";
import PrintBtn from "@/src/Common/PrintBtn";
import PrintDynamically from "@/src/Common/printDynaically/PrintDynamically";
import { formatToFormDate } from "@/src/utils/formatToFormDate";

interface SalaryStatement {
  paymentId?: number;
  isExcelDownload?: boolean;
  isPrint?: boolean;

  ExcelDowloadName?: string;
}

const SalaryStatement: FC<SalaryStatement> = ({
  paymentId,
  ExcelDowloadName,
  isPrint = false,

  isExcelDownload = false,
}) => {
  const [salaryList, setSalaryList] = useState([]);
  const [donwloadPdf, setDownloadPDf] = useState([]);
  const [donwload, setDownload] = useState([]);

  const handleGetSalaryStatement = async () => {
    const params = {
      statusIn: "ACTIVE",
      paymentId,
    };

    try {
      const res: any = await AdminGetSalaryStatement(params);

      const filteredData1 = res?.data?.map((item: any) => {
        const owner = item.owner || {};

        const nameKey = Object.keys(owner).find((key) => key.endsWith("Name"));

        return {
          name: nameKey ? owner[nameKey] : null,
          year: item.year,
          month: item?.month,
          paid_On: HtmlDateFormat(item?.paymentDate),
          mode: item?.paymentMode,
          amount: item.amount,
          paymentStatus: item.paymentStatus,
          file: item?.file?.path,
        };
      });
      const filteredData = res?.data?.map((item: any) => {
        const owner = item.owner || {};

        const nameKey = Object.keys(owner).find((key) => key.endsWith("Name"));

        return {
          name: nameKey ? owner[nameKey] : null,
          year: item.year,
          month: item?.month,
          paid_On: HtmlDateFormat(item?.paymentDate),
          mode: item?.paymentMode,
          amount: item.amount,
          paymentStatus: item.paymentStatus,
        };
      });

      setDownloadPDf(filteredData1);
      setDownload(filteredData);
      // setDownload(filteredData);
      setSalaryList(res?.data);
    } catch (error) {
      errorMessage({ error });
    }
  };

  useEffect(() => {
    handleGetSalaryStatement();
  }, []);
  return (
    <div className="px-5 pb-5">
      <div className=" flex  justify-end gap-3">
        {isPrint && (
          <div className="flex justify-end mb-2">
            <PrintDynamically
              data={donwloadPdf}
              title={ExcelDowloadName || "Salary Statement"}
            />
          </div>
        )}
        {isExcelDownload && (
          <div className=" flex justify-end mb-2">
            <ExcelDonwloadBtn
              fun={() =>
                exportToExcelDynamic(donwload, `${ExcelDowloadName}.xlsx`)
              }
            />
          </div>
        )}
      </div>

      <div className="max-h-96 overflow-y-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">Year</th>
              <th className="px-4 py-3 text-left">Month</th>
              <th className="px-4 py-3 text-left">Paid On</th>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-left">Mode</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Slip</th>
            </tr>
          </thead>

          <tbody>
            {salaryList?.map((v: any, index: number) => (
              <tr key={index} className="border-t hover:bg-gray-50 transition">
                <td className="px-4 py-3">{v?.year}</td>
                <td className="px-4 py-3">{v?.month}</td>
                <td className="px-4 py-3">{HtmlDateFormat(v?.paymentDate)}</td>
                <td className="px-4 py-3 font-medium">Rs. {v?.amount}</td>
                <td className="px-4 py-3 uppercase">{v?.paymentMode}</td>

                <td className="px-4 py-3">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      v?.paymentStatus === "PAID"
                        ? "bg-green-100 text-green-700"
                        : v?.paymentStatus === "PARTIALLY_PAID"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {v?.paymentStatus.replace("_", " ")}
                  </span>
                </td>

                <td className="px-4 py-3">
                  {v?.file ? (
                    <ImagePreview File={v?.file} />
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalaryStatement;
