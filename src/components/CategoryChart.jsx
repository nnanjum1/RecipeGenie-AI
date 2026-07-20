"use client";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const COLORS = [
    "#f97316",
    "#3b82f6",
    "#22c55e",
    "#eab308",
    "#ec4899",
    "#8b5cf6",
    "#14b8a6",
    "#ef4444",
    "#06b6d4",
    "#84cc16",
    "#f43f5e",
    "#a855f7",
    "#0ea5e9",
    "#10b981",
    "#f59e0b",
    "#6366f1",
    "#64748b",
    "#78716c",
    "#db2777",
    "#059669",
];

const CategoryChart = ({ data = [] }) => {
    if (!data.length) {
        return (
            <div className="bg-white rounded-3xl shadow p-8 mt-12 text-center">
                <h2 className="text-2xl font-bold mb-6">
                    Recipe Category Distribution
                </h2>
                <p className="text-gray-500">
                    No category data available.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-3xl shadow p-8 mt-12">
            <h2 className="text-2xl font-bold text-center mb-6">
                Recipe Category Distribution
            </h2>

            <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        label
                    >
                        {data.map((_, index) => (
                            <Cell
                                key={index}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>

                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CategoryChart;