import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#F97316"];

export default function PerformancePie({ data }) {
  // Fallback demo data if not provided
  const safeData =
    Array.isArray(data) && data.length > 0
      ? data
      : [
          { name: "Quality", value: 30 },
          { name: "Efficiency", value: 40 },
          { name: "Satisfaction", value: 20 },
          { name: "Other", value: 10 },
        ];
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="font-semibold mb-2">Hospital Performance</h3>
      <div style={{ width: "100%", height: 180 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie dataKey="value" data={safeData} outerRadius={60} label>
              {safeData.map((entry, idx) => (
                <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
