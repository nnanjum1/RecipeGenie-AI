"use client";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";


const CategoryChart = ({ data }) => {


    const COLORS = [
        "#f97316", // orange
        "#3b82f6", // blue
        "#22c55e", // green
        "#eab308", // yellow
        "#ec4899", // pink
        "#8b5cf6", // purple
        "#14b8a6", // teal
        "#ef4444", // red
        "#06b6d4", // cyan
        "#84cc16", // lime
        "#f43f5e", // rose
        "#a855f7", // violet
        "#0ea5e9", // sky blue
        "#10b981", // emerald
        "#f59e0b", // amber
        "#6366f1", // indigo
        "#64748b", // slate
        "#78716c", // stone
        "#db2777", // dark pink
        "#059669", // dark green
    ];


    return (

        <div className="bg-white rounded-3xl shadow p-8 mt-12">

            <h2 className="text-2xl font-bold text-center mb-6">
                Recipe Category Distribution
            </h2>


            <ResponsiveContainer
                width="100%"
                height={350}
            >

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

                        {
                            data.map((entry, index) => (

                                <Cell
                                    key={`cell-${index}`}
                                    fill={
                                        COLORS[index % COLORS.length]
                                    }
                                />

                            ))
                        }


                    </Pie>


                    <Tooltip />

                    <Legend />


                </PieChart>


            </ResponsiveContainer>


        </div>

    );
};


export default CategoryChart;