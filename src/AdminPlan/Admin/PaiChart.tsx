"use client";

import { apiRequest } from "@/src/lib/axiosSetup";
import { errorMessage } from "@/src/lib/ToastifyMessage/ToastifyMessage";
import { getCurrentUserInfo } from "@/src/utils/GetCurrentUser";
import React, { useEffect, useRef, useState } from "react";

import {
  Pie,
  PieChart,
  Sector,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const PieGradient = (props: any) => {
  return (
    <>
      <defs>
        <radialGradient
          id={`fillGradient${props.index}`}
          cx={props.cx}
          cy={props.cy}
          r={props.outerRadius}
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0%"
            stopColor={COLORS[props.index % COLORS.length]}
            stopOpacity={0}
          />
          <stop
            offset="100%"
            stopColor={COLORS[props.index % COLORS.length]}
            stopOpacity={0.8}
          />
        </radialGradient>

        <radialGradient
          id={`borderGradient${props.index}`}
          cx={(typeof props.width === "number" ? props.width : 0) / 2}
          cy={(typeof props.height === "number" ? props.height : 0) / 2}
        >
          <stop
            offset="0%"
            stopColor={COLORS[props.index % COLORS.length]}
            stopOpacity={0}
          />
          <stop
            offset="100%"
            stopColor={COLORS[props.index % COLORS.length]}
            stopOpacity={0.8}
          />
        </radialGradient>

        <clipPath id={`clipPath${props.index}`}>
          <Sector {...props} />
        </clipPath>
      </defs>

      <Sector
        {...props}
        clipPath={`url(#clipPath${props.index})`}
        fill={`url(#fillGradient${props.index})`}
        stroke={`url(#borderGradient${props.index})`}
        strokeWidth={props.isActive ? 5 : 0}
      />
    </>
  );
};

const PaiChart = ({
  isAnimationActive = true,
}: {
  isAnimationActive?: boolean;
}) => {
  const cureentUser = getCurrentUserInfo();
  const isFeatch = useRef(false);
  const [data, setData] = useState<any[]>([]);

  const handleGetStudentList = async () => {
    const params = {
      ...(cureentUser?.userType !== "ADMIN" &&
        cureentUser?.userType !== "MD" && {
          userId: cureentUser?.id,
        }),
    };

    try {
      const res: any = await apiRequest.get("/api/analytic/student", {
        params,
      });

      const apiData = res?.data || {};

      // 👉 transform object → array
      const formattedData = Object.entries(apiData).map(([key, value]) => ({
        name: key.replace(/^total/, ""), // remove "total"
        x: value,
      }));

      setData(formattedData);
    } catch (error) {
      errorMessage({ error });
    }
  };

  useEffect(() => {
    if (cureentUser && !isFeatch.current) {
      handleGetStudentList();
      isFeatch.current = true;
    }
  }, [cureentUser]);
  return (
    <div className=" p-3 " style={{ width: "100%", height: 350 }}>
      <div className=" text-center text-lg font-semibold ">Student Data</div>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="x"
            isAnimationActive={isAnimationActive}
            shape={PieGradient}
            innerRadius="20%"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PaiChart;
