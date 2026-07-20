"use client";

import { useQuery } from "@tanstack/react-query";
import { getRecipes } from "@/services/recipeApi";

import RecipeCard from "./RecipeCard";
import RecipeSkeleton from "./RecipeSkeleton";
import SectionTitle from "./SectionTitle";
import Link from "next/link";

const FeaturedRecipes = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["recipes"],
        queryFn: getRecipes,
    });

    const recipes = Array.isArray(data) ? data : [];

    const featured = [...recipes]
        .sort(
            (a, b) =>
                new Date(b.createdAt) - new Date(a.createdAt)
        )
        .slice(0, 4);

    return (
        <section className="py-24">
            <div className="max-w-7xl mx-auto px-4">
                <SectionTitle
                    title="Featured Recipes"
                    subtitle="Explore our latest recipes."
                />

                <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
                    {isLoading
                        ? [...Array(4)].map((_, i) => (
                            <RecipeSkeleton key={i} />
                        ))
                        : featured.map((recipe) => (
                            <RecipeCard
                                key={recipe._id}
                                recipe={recipe}
                            />
                        ))}
                </div>

                {!isLoading && (
                    <div className="flex justify-center mt-12">
                        <Link
                            href="/recipes"
                            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-xl transition duration-300"
                        >
                            View All Recipes
                        </Link>
                    </div>
                )}
            </div>



        </section>
    );
};

export default FeaturedRecipes;