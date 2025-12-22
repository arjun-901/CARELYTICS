import React from "react";

export default function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-3xl font-bold text-sky-600">{value}</div>
    </div>
  );
}
