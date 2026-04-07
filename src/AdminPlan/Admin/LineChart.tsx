// import { apiRequest } from "@/src/lib/axiosSetup";
// import { errorMessage } from "@/src/lib/ToastifyMessage/ToastifyMessage";
// import React, { useEffect, useState } from "react";

// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// const data = [
//   { month: "Jan", value: 120 },
//   { month: "Mar", value: 150 },
//   { month: "Jun", value: 250 },
//   { month: "Jul", value: 410 },
//   { month: "Aug", value: 500 },
//   { month: "Oct", value: 450 },
//   { month: "Nov", value: 470 },
//   { month: "Dec", value: 520 },
// ];
// const LineChart = () => {
//   const today = new Date();
//   const year = today.getFullYear();

//   // Format helper
//   const formatDate = (date: Date) => date.toISOString().split("T")[0];
//   const [receptionList, setReceptionList] = useState<any[]>([]);

//   const MONTH_MAP: Record<string, string> = {
//     JANUARY: "Jan",
//     FEBRUARY: "Feb",
//     MARCH: "Mar",
//     APRIL: "Apr",
//     MAY: "May",
//     JUNE: "Jun",
//     JULY: "Jul",
//     AUGUST: "Aug",
//     SEPTEMBER: "Sep",
//     OCTOBER: "Oct",
//     NOVEMBER: "Nov",
//     DECEMBER: "Dec",
//   };

//   const handleGetReceptionList = async () => {
//     const params = {
//       startDate: `${year}-01-01`,
//       endDate: formatDate(today),
//     };

//     try {
//       const res: any = await apiRequest.get("api/analytic/reception-form", {
//         params,
//       });

//       const apiData = res?.data;

//       const formatDate = Object.entries(apiData).map(([Key, value]: any) => {
//         const [monthName] = Key.split(" ");
//         return {
//           month: MONTH_MAP[monthName],
//           value,
//         };
//       });
//       setReceptionList(formatDate);
//     } catch (error) {
//       errorMessage({ error });
//     }
//   };

//   useEffect(() => {
//     handleGetReceptionList();
//   }, []);
//   return (
//     <ResponsiveContainer width="100%" height={280}>
//       <AreaChart data={receptionList}>
//         {/* Gradient */}
//         <defs>
//           <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
//             <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
//             <stop offset="95%" stopColor="#2563eb" stopOpacity={0.05} />
//           </linearGradient>
//         </defs>

//         <XAxis dataKey="month" />
//         <YAxis />
//         <Tooltip />

//         <Area
//           type="monotone"
//           dataKey="value"
//           stroke="#2563eb"
//           strokeWidth={3}
//           fill="url(#colorValue)"
//           dot={{ r: 4 }}
//           activeDot={{ r: 6 }}
//         />
//       </AreaChart>
//     </ResponsiveContainer>
//   );
// };

// export default LineChart;

import { apiRequest } from "@/src/lib/axiosSetup";
import { errorMessage } from "@/src/lib/ToastifyMessage/ToastifyMessage";
import { getCurrentUserInfo } from "@/src/utils/GetCurrentUser";
import React, { useEffect, useRef, useState } from "react";
import { FaChartArea } from "react-icons/fa6";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid, // ← optional: adds light grid
} from "recharts";

const MONTH_MAP: Record<string, string> = {
  JANUARY: "Jan",
  FEBRUARY: "Feb",
  MARCH: "Mar",
  APRIL: "Apr",
  MAY: "May",
  JUNE: "Jun",
  JULY: "Jul",
  AUGUST: "Aug",
  SEPTEMBER: "Sep",
  OCTOBER: "Oct",
  NOVEMBER: "Nov",
  DECEMBER: "Dec",
};

// Optional: full month order (helps if API misses some months)
const MONTH_ORDER = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const LineChart = () => {
  const today = new Date();
  const year = today.getFullYear();
  const cureentUser = getCurrentUserInfo();

  const formatDate = (date: Date) => date.toISOString().split("T")[0];
  const hasFetched = useRef(false);

  const [chartData, setChartData] = useState<any[]>([]);

  const handleGetReceptionList = async () => {
    const params = {
      startDate: `${year}-01-01`,
      endDate: formatDate(today),

      ...(cureentUser?.userType !== "ADMIN" &&
        cureentUser?.userType !== "MD" && { userId: cureentUser?.id }),
    };

    try {
      const res: any = await apiRequest.get("api/analytic/reception-form", {
        params,
      });
      const apiData = res?.data || {};

      // Convert to array + map month name
      let formatted = Object.entries(apiData).map(
        ([key, value]: [string, any]) => {
          const [monthName] = key.split(" "); // e.g. "JANUARY 2025" → "JANUARY"
          return {
            month: MONTH_MAP[monthName.toUpperCase()] || monthName.slice(0, 3), // fallback
            value: Number(value) || 0,
          };
        },
      );

      // Sort by month order (very important!)
      formatted.sort((a, b) => {
        const aIndex = MONTH_ORDER.indexOf(a.month);
        const bIndex = MONTH_ORDER.indexOf(b.month);
        return aIndex - bIndex;
      });

      // Optional: fill missing months with 0 (makes chart continuous)
      const fullData = MONTH_ORDER.map((m) => {
        const found = formatted.find((d) => d.month === m);
        return found || { month: m, value: 0 };
      });

      setChartData(fullData);
      // setChartData(formatted);
    } catch (error) {
      errorMessage({ error });
    }
  };

  useEffect(() => {
    if (cureentUser && !hasFetched.current) {
      handleGetReceptionList();
      hasFetched.current = true;
    }
  }, [cureentUser]);

  return (
    <div>
      {chartData?.length > 0 ? (
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              opacity={0.6}
            />{" "}
            {/* optional - cleaner look */}
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#64748b" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#64748b" }}
              width={40}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(30, 41, 59, 0.95)",
                border: "none",
                borderRadius: "6px",
                color: "#e2e8f0",
              }}
            />
            <Area
              type="monotone" // smooth curve
              dataKey="value"
              stroke="#2563eb"
              strokeWidth={3}
              fill="url(#colorValue)"
              fillOpacity={1} // makes gradient more visible
              dot={false} // hide dots for clean dashboard look (or keep if you like them)
              activeDot={{
                r: 6,
                stroke: "#2563eb",
                strokeWidth: 2,
                fill: "#fff",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-[280px] flex flex-col items-center justify-center text-gray-500">
          <FaChartArea className="w-10 h-10 mb-2 text-gray-300" />
          <p className="text-sm font-medium">
            You haven’t added any reception data
          </p>
        </div>
      )}
    </div>
  );
};

export default LineChart;
