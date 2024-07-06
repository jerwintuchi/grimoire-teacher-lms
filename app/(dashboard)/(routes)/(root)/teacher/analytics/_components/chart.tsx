"use client";

import { Card } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
interface ChartProps {
  data: {
    name: string;
    total: number;
  }[];
}
export const Chart = ({ data }: ChartProps) => {
  return (
    <Card className="bg-[#291839] border border-[#853bce] pt-4 w-full">
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            stroke="#853bce"
            fontSize={12}
            axisLine={false}
          />
          <YAxis
            stroke="#853bce"
            fontSize={12}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Bar dataKey="total" fill="#853bce" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};
