"use client";

import { useParams } from "next/navigation";
import { Clock, Users, ChefHat } from "lucide-react";
import { getRecipe } from "@/services/recipeApi";
import { useEffect, useState } from "react";
import { likeRecipe } from "@/services/recipeApi";
import { FaThumbsUp } from "react-icons/fa";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const RecipeDetails = () => {

    const { data: session } = authClient.useSession();

    const { id } = useParams();


    const queryClient = useQueryClient();

    const [liked, setLiked] = useState(false);


    const likeMutation = useMutation({

        mutationFn: ({ id, change }) =>
            likeRecipe(id, change),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["recipe", id]
            });
        }

    });



    const {
        data: recipe,
        isLoading,
        error
    } = useQuery({

        queryKey: ["recipe", id],

        queryFn: () => getRecipe(id),

        enabled: !!id

    });

    useEffect(() => {
        const isLiked = localStorage.getItem(`liked-${id}`);

        setLiked(isLiked === "true");
    }, [id]);

    const handleLike = () => {
        if (!session) {
            toast.error("Please login to like recipes");
            return;
        }

        if (liked) {
            // Remove like
            likeMutation.mutate({
                id,
                change: -1,
            });

            localStorage.removeItem(`liked-${id}`);

            setLiked(false);
        } else {
            // Add like
            likeMutation.mutate({
                id,
                change: 1,
            });

            localStorage.setItem(`liked-${id}`, "true");

            setLiked(true);
        }
    };




    if (isLoading) {

        return (

            <div className="max-w-5xl mx-auto py-20">

                <div className="h-96 bg-gray-200 animate-pulse rounded-3xl" />

            </div>

        );

    }




    if (!recipe) {

        return (

            <div className="text-center py-20">

                Recipe not found

            </div>

        );

    }




    return (


        <div className="max-w-6xl mx-auto px-5 py-10">


            {/* Hero Image */}


            <div className="rounded-3xl overflow-hidden">


                <img

                    src={recipe.image}

                    alt={recipe.title}

                    className="w-full h-[450px] object-cover"

                />


            </div>





            {/* Title */}


            <div className="mt-8">


                <h1 className="text-4xl font-bold text-orange-500">

                    {recipe.title}

                </h1>


                <p className="text-gray-600 mt-3 text-lg">

                    {recipe.shortDescription}

                </p>


            </div>






            {/* Information Cards */}


            <div className="grid md:grid-cols-3 gap-5 mt-8">



                <div className="bg-orange-50 rounded-2xl p-5 flex gap-3 items-center">

                    <Clock className="text-orange-500" />

                    <div>

                        <p className="text-gray-500 text-sm">
                            Cooking Time
                        </p>

                        <p className="font-semibold">
                            {recipe.cookingTime} minutes
                        </p>

                    </div>

                </div>




                <div className="bg-orange-50 rounded-2xl p-5 flex gap-3 items-center">

                    <Users className="text-orange-500" />

                    <div>

                        <p className="text-gray-500 text-sm">
                            Servings
                        </p>

                        <p className="font-semibold">
                            {recipe.servings} people
                        </p>

                    </div>

                </div>




                <div className="bg-orange-50 rounded-2xl p-5 flex gap-3 items-center">

                    <ChefHat className="text-orange-500" />

                    <div>

                        <p className="text-gray-500 text-sm">
                            Difficulty
                        </p>

                        <p className="font-semibold">
                            {recipe.difficulty}
                        </p>

                    </div>

                </div>



            </div>






            {/* Overview */}


            <section className="mt-10">


                <h2 className="text-2xl font-bold mb-3">

                    Overview

                </h2>


                <p className="text-gray-700 leading-relaxed">

                    {recipe.description}

                </p>


            </section>







            {/* Ingredients */}


            <section className="mt-10">


                <h2 className="text-2xl font-bold mb-4">

                    Ingredients

                </h2>



                <ul className="grid md:grid-cols-2 gap-4">
                    {
                        recipe.ingredients.map((ingredient, index) => (
                            <li
                                key={index}
                                className="bg-orange-50 rounded-xl p-4 text-gray-700"
                            >
                                {typeof ingredient === "object"
                                    ? `${ingredient.name} - ${ingredient.quantity}`
                                    : ingredient
                                }
                            </li>
                        ))
                    }
                </ul>


            </section>







            {/* Instructions */}



            <section className="mt-10">


                <h2 className="text-2xl font-bold mb-4">

                    Cooking Instructions

                </h2>



                <div className="space-y-4">


                    {
                        recipe.instructions.map(
                            (step, index) => (


                                <div

                                    key={index}

                                    className="flex gap-4"

                                >

                                    <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center shrink-0">

                                        {index + 1}

                                    </div>


                                    <p className="text-gray-700">

                                        {step}

                                    </p>


                                </div>


                            )
                        )
                    }


                </div>


            </section>



            <div className="flex items-center gap-3">

                <button
                    onClick={handleLike}
                    className={`font-semibold transition ${liked
                            ? "text-green-700"
                            : "text-green-500 hover:text-green-600"
                        }`}
                >
                    {liked ? "Liked" : "Like"}
                </button>


                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    {recipe.likes || 0}
                </span>

            </div>




        </div>


    );


};


export default RecipeDetails;