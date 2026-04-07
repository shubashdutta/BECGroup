import { useProgramStore } from "@/src/lib/store/programStore";
import {
  BankOutlined,
  FlagOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { CiFlag1 } from "react-icons/ci";
import { LiaUniversitySolid } from "react-icons/lia";

const ProgramCard = ({ program }: any) => {
  const router = useRouter();

  const setSelectedProgram = useProgramStore(
    (state) => state.setSelectedProgram
  );

  const goToDetail = () => {
    setSelectedProgram(program);
    router.push(`/search-program/${program?.id}`);
  };
  const extractWebometricRank = () => {
    const match = program?.universityRanking?.match(
      /National Ranking\s*-\s*(\d+)/i
    );
    return match ? match[1] : "NA";
  };

  const webometricRank = extractWebometricRank();

  const openIntakes = program?.openIntakes
    ? program.openIntakes.split(",").map((i: string) => i.trim())
    : [];

  const allDeadlines = program?.applicationDeadLine
    ? program.applicationDeadLine.split(",").map((item: string) => {
        const [intake] = item.split(":");
        return intake.trim();
      })
    : [];

  const closedIntakes = allDeadlines.filter(
    (intake: string) => !openIntakes.includes(intake)
  );

  return (
    <div className=" border border-gray-400 space-y-3 rounded py-3 px-8">
      <div onClick={goToDetail}>
        <span className=" cursor-pointer text-blue-900 text-lg font-bold">
          {program?.programName}
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        <span className="flex items-center gap-1 bg-[#AD1457] text-white px-3 py-1 rounded text-xs font-medium">
          🏙 Major City
        </span>

        <span className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded text-xs font-medium">
          ⚡ Faster Offer TAT
        </span>

        <span className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded text-xs font-medium">
          🏦 Eligible Non Collateral Loan
        </span>

        {program?.scholarShipAvailable && (
          <span className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded text-xs font-medium">
            <InfoCircleOutlined />
            scholarShip Available
          </span>
        )}
      </div>

      <div className=" flex  gap-x-6">
        <div className=" flex items-center text-lg font-semibold  justify-center gap-x-2">
          <span className="bg-[#f0f0f0] p-2 rounded-full">
            <LiaUniversitySolid className=" text-blue-700" size={20} />
          </span>
          {`${program?.universityName} (${program?.campus})`}
        </div>
        <div className=" flex items-center text-lg font-semibold  justify-center gap-x-2">
          <span className="bg-[#f0f0f0] p-2 rounded-full">
            <CiFlag1 className=" text-blue-700" size={20} />
          </span>
          {`${program?.country} `}
        </div>
      </div>

      <div className="flex flex-col gap-3 text-sm">
        <div className="flex gap-x-6">
          <div className="font-medium text-gray-600">Duration:</div>
          <div>{program?.duration} </div>
        </div>

        <div className="flex gap-x-6 items-start">
          <div className="font-medium text-gray-600 mt-1">Intakes:</div>

          <div className="flex flex-wrap gap-2">
            {openIntakes.length > 0 && (
              <span className="px-3 py-1 rounded-md text-green-700 bg-green-100 text-xs font-medium">
                Open
              </span>
            )}

            {openIntakes.map((intake: any, index: number) => (
              <span
                key={`open-${index}`}
                className="px-3 py-1 rounded-md text-blue-700 bg-blue-100 text-xs font-medium flex items-center gap-1"
              >
                {intake}
                <span className="text-blue-500 cursor-pointer">ⓘ</span>
              </span>
            ))}

            {closedIntakes.length > 0 && (
              <span className="px-3 py-1 rounded-md text-red-700 bg-red-100 text-xs font-medium">
                Closed
              </span>
            )}

            {closedIntakes.map((intake: any, index: number) => (
              <span
                key={`closed-${index}`}
                className="px-3 py-1 rounded-md text-red-700 bg-red-100 text-xs font-medium"
              >
                {intake}
              </span>
            ))}
          </div>
        </div>
        <div className="flex gap-x-6 items-start">
          <div className="font-medium text-gray-600 mt-1">
            {" "}
            Admission Requirement:
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-md text-green-700 bg-green-100 text-xs font-medium">
              {program?.entryRequirement ?? ""}
            </span>

            <span className="px-3 py-1 rounded-md text-blue-700 bg-blue-100 text-xs font-medium flex items-center gap-1">
              ieltsScore ({program?.ieltsScore ?? "N/A"}){" "}
            </span>
            <span className="px-3 py-1 rounded-md text-blue-700 bg-blue-100 text-xs font-medium flex items-center gap-1">
              pteScore ({program?.pteScore ?? "N/A"}){" "}
            </span>
            <span className="px-3 py-1 rounded-md text-blue-700 bg-blue-100 text-xs font-medium flex items-center gap-1">
              toeflScore ({program?.toeflScore ?? "N/A"}){" "}
            </span>
          </div>
        </div>
      </div>

      <div className=" flex  gap-x-7">
        <div className="flex gap-x-7 text-lg font-semibold ">
          <div className=" text-gray-500">Yearly Tuition Fee:</div>{" "}
          <div className=" ">{program?.yearlytutionfees}</div>
        </div>
        <div className="flex gap-x-7 text-lg font-semibold ">
          <div className=" text-gray-500">Application Fee:</div>{" "}
          <div className=" ">{program?.applicationFee}</div>
        </div>
      </div>

      {webometricRank && (
        <div className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-2 text-sm text-gray-800">
          <span className="rounded-full bg-blue-700 px-3 py-1 font-semibold text-white">
            {webometricRank}
          </span>
          <span>in Webometrics Ranking of {program?.country} National</span>
        </div>
      )}
    </div>
  );
};

export default ProgramCard;
