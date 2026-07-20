"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";

import { getRecipes } from "@/services/recipeApi";
import Link from "next/link";
import { Eye } from "lucide-react";

export default function RecipesPage() {

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [difficulty, setDifficulty] = useState("All");
    const [sort, setSort] = useState("latest");



    const {
        data,
        isLoading,
    } = useQuery({
        queryKey: ["recipes"],
        queryFn: getRecipes,
        refetchOnMount: "always",
        refetchOnWindowFocus: true,
    });

    // const recipes = Array.isArray(data) ? data : [];
    const recipes = data?.recipes || [];



    console.log("API Data:", data);
    console.log("Recipes:", recipes);
    const filteredRecipes = useMemo(() => {

        let result = [...recipes];


        // Search
        if (search) {

            result = result.filter(recipe =>
                recipe.title
                    .toLowerCase()
                    .includes(search.toLowerCase())
            );

        }


        // Category
        if (category !== "All") {

            result = result.filter(
                recipe => recipe.category === category
            );

        }


        // Difficulty
        if (difficulty !== "All") {

            result = result.filter(
                recipe => recipe.difficulty === difficulty
            );

        }


        // Sorting

        if (sort === "latest") {

            result.sort(
                (a, b) =>
                    new Date(b.createdAt) - new Date(a.createdAt)
            );

        }


        if (sort === "oldest") {

            result.sort(
                (a, b) =>
                    new Date(a.createdAt) - new Date(b.createdAt)
            );

        }


        if (sort === "time") {

            result.sort(
                (a, b) =>
                    a.cookingTime - b.cookingTime
            );

        }


        return result;


    }, [
        recipes,
        search,
        category,
        difficulty,
        sort
    ]);




    return (

        <div className="max-w-7xl mx-auto px-5 py-10">


            <h1 className="text-4xl font-bold text-center text-orange-500 mb-10">
                Explore Recipes
            </h1>



            {/* Filters */}

            <div className="grid md:grid-cols-4 gap-4 mb-10">


                {/* Search */}

                <div className="relative">

                    <Search
                        size={20}
                        className="absolute left-3 top-3 text-gray-400"
                    />


                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search recipe..."
                        className="w-full border rounded-xl py-3 pl-10"
                    />

                </div>



                {/* Category */}

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border rounded-xl px-4"
                >

                    <option>All</option>
                    <option>Breakfast</option>
                    <option>Lunch</option>
                    <option>Dinner</option>
                    <option>Dessert</option>
                    <option>Snack</option>
                    <option>Beverage</option>

                </select>




                {/* Difficulty */}

                <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="border rounded-xl px-4"
                >

                    <option>All</option>
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>

                </select>




                {/* Sort */}

                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="border rounded-xl px-4"
                >

                    <option value="latest">
                        Latest
                    </option>

                    <option value="oldest">
                        Oldest
                    </option>

                    <option value="time">
                        Cooking Time
                    </option>

                </select>


            </div>




            {/* Cards */}
            {
                isLoading ? (

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

                        {
                            [...Array(8)].map((_, index) => (

                                <div
                                    key={index}
                                    className="h-80 bg-gray-200 rounded-3xl animate-pulse"
                                ></div>

                            ))
                        }

                    </div>



                ) : filteredRecipes.length === 0 ? (


                    <div className="text-center py-20">

                        <h2 className="text-2xl font-bold text-gray-700">
                            No Recipe Found
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Try changing your search or filters.
                        </p>

                    </div>


                ) : (


                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">


                        {
                            filteredRecipes.map(recipe => (

                                <div
                                    key={recipe._id}
                                    className="bg-white rounded-3xl shadow-md overflow-hidden"
                                >

                                    <img
                                        src={recipe.image}
                                        alt={recipe.title}
                                        className="h-48 w-full object-cover"
                                    />


                                    <div className="p-5">

                                        <h2 className="font-bold text-lg">
                                            {recipe.title}
                                        </h2>


                                        <p className="text-gray-500 text-sm mt-2">
                                            {recipe.shortDescription}
                                        </p>


                                        <div className="mt-3 text-sm">

                                            <p>
                                                Category: {recipe.category}
                                            </p>

                                            <p>
                                                Time: {recipe.cookingTime} min
                                            </p>

                                            <p>
                                                Difficulty: {recipe.difficulty}
                                            </p>

                                            <div className="flex items-center gap-2 text-sm text-gray-600">

                                                <span className="text-green-500">
                                                    ❤️
                                                </span>

                                                <p>
                                                    Saved by <span className="font-semibold text-gray-800">
                                                        {recipe.favorites || 0}
                                                    </span> people
                                                </p>

                                            </div>



                                        </div>
                                        <Link
                                            href={`/recipes/${recipe._id}`}
                                            className="mt-5 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-xl transition"
                                        >
                                            <Eye size={18} />
                                            View Details
                                        </Link>


                                    </div>


                                </div>

                            ))
                        }


                    </div>


                )
            }




        </div>

    );
}