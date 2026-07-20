"use client";

import { useQuery } from "@tanstack/react-query";
import { getRecipes } from "@/services/recipeApi";

import RecipeCard from "./RecipeCard";
import RecipeSkeleton from "./RecipeSkeleton";
import SectionTitle from "./SectionTitle";

const FeaturedRecipes = () => {

    const { data, isLoading } = useQuery({
        queryKey: ["recipes"],
        queryFn: getRecipes,
    });


    const recipes = data?.recipes || [];


    const featured = recipes.slice(0, 8);

    return (
        <section className="py-24">

            <div className="max-w-7xl mx-auto px-4">

                <SectionTitle
                    title="Featured Recipes"
                    subtitle="Explore our most loved AI-powered recipes."
                />

                <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">

                    {
                        isLoading
                            ? [...Array(8)].map((_, i) =>
                                <RecipeSkeleton key={i} />
                            )
                            : featured.map(recipe =>
                                <RecipeCard
                                    key={recipe._id}
                                    recipe={recipe}
                                />
                            )
                    }

                </div>

            </div>

        </section>
    );
};

export default FeaturedRecipes;