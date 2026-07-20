"use client";

import { useQuery } from "@tanstack/react-query";
import { getRecipes } from "@/services/recipeApi";
import { UtensilsCrossed } from "lucide-react";
import SectionTitle from "./SectionTitle";
import CategoryChart from "./CategoryChart";

const Categories = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["recipes"],
        queryFn: getRecipes,
    });

    const recipes = data?.recipes || [];

    // Unique categories
    const categories = [
        ...new Set(recipes.map((recipe) => recipe.category)),
    ];

    // Chart data
    const categoryCount = recipes.reduce((acc, recipe) => {
        acc[recipe.category] = (acc[recipe.category] || 0) + 1;
        return acc;
    }, {});

    const chartData = Object.entries(categoryCount).map(
        ([name, value]) => ({
            name,
            value,
        })
    );

    return (
        <section className="py-20 bg-orange-50">
            <div className="max-w-7xl mx-auto px-4">
                <SectionTitle
                    title="Recipe Categories"
                    subtitle="A collection of flavors from around the world."
                />

                {isLoading ? (
                    <p className="text-center">Loading...</p>
                ) : (
                    <>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                            {categories.map((category) => (
                                <div
                                    key={category}
                                    className="bg-white rounded-2xl shadow hover:shadow-lg transition p-6 text-center"
                                >
                                    <UtensilsCrossed className="mx-auto text-orange-500" />

                                    <h3 className="font-semibold mt-4">
                                        {category}
                                    </h3>
                                </div>
                            ))}
                        </div>

                        <CategoryChart data={chartData} />
                    </>
                )}
            </div>
        </section>
    );
};

export default Categories;