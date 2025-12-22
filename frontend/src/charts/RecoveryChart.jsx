import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function RecoveryChart({ data }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="font-semibold mb-2">Patient Recovery</h3>
      <div style={{ width: "100%", height: 180 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#34D399" strokeWidth={2}/>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
