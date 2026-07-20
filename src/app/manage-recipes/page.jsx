"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/services/api";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { Trash2, Eye, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { getMyRecipes } from "@/services/recipeApi";


const ManageRecipes = () => {

    const router = useRouter();

    const queryClient = useQueryClient();


    const { data: session, isPending } = authClient.useSession();


    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const {
        data: recipes = [],
        isLoading,
    } = useQuery({
        queryKey: ["my-recipes", session?.user?.email],
        queryFn: () => getMyRecipes(session.user.email),
        enabled: !!session?.user?.email,

        refetchOnMount: "always",
        refetchOnWindowFocus: true,
    });



    const deleteMutation = useMutation({

        mutationFn: async (id) => {

            return await api.delete(`/recipes/${id}`);

        },


        onSuccess: () => {

            toast.success("Recipe deleted");

            queryClient.invalidateQueries({
                queryKey: [
                    "my-recipes",
                    session?.user?.email
                ]
            });

            queryClient.invalidateQueries({
                queryKey: ["recipes"]
            });

        },


        onError: () => {

            toast.error("Delete failed");

        }

    });



    const handleDelete = (recipe) => {

        setSelectedRecipe(recipe);

    };

    useEffect(() => {

        if (!isPending && !session) {
            router.push("/login");
        }

    }, [session, isPending, router]);

    if (isPending) {

        return (
            <div className="text-center py-20">
                Checking authentication...
            </div>
        );

    }





    if (isLoading) {

        return (
            <div>
                Loading...
            </div>
        );

    }


    return (

        <div className="max-w-6xl mx-auto px-5 py-10">


            <h1 className="text-4xl font-bold text-orange-500 mb-10 text-center">
                Manage Recipes
            </h1>



            {
                recipes.length === 0 ?

                    (
                        <div className="min-h-[400px] flex flex-col items-center justify-center gap-4">
                            <p className="text-center text-gray-500">
                                No recipes found
                            </p>

                            <Link
                                href="/add-recipe"
                                className="bg-orange-500 text-white px-6 py-3 rounded-xl"
                            >
                                Add Recipe
                            </Link>
                        </div>
                    )

                    :

                    (

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">


                            {
                                recipes.map(recipe => (


                                    <div
                                        key={recipe._id}
                                        className="bg-white rounded-3xl shadow-lg overflow-hidden"
                                    >


                                        <img
                                            src={recipe.image}
                                            alt={recipe.title}
                                            className="w-full h-52 object-cover"
                                        />



                                        <div className="p-5">


                                            <h2 className="font-bold text-xl">
                                                {recipe.title}
                                            </h2>



                                            <p className="text-gray-500 mt-2 line-clamp-2">
                                                {recipe.shortDescription}
                                            </p>



                                            <div className="flex justify-between text-sm mt-4">

                                                <span className="text-orange-500">
                                                    {recipe.category}
                                                </span>


                                                <span>
                                                    {recipe.cookingTime} min
                                                </span>

                                            </div>



                                            <div className="flex gap-3 mt-5">

                                                <Link
                                                    href={`/recipes/${recipe._id}`}
                                                    className="flex justify-center items-center gap-2 bg-orange-500 text-white py-2 px-4 rounded-xl"
                                                >
                                                    <Eye size={18} />
                                                    View
                                                </Link>


                                                <Link
                                                    href={`/manage-recipes/edit/${recipe._id}`}
                                                    className="px-6 bg-blue-500 text-white rounded-xl flex items-center justify-center"
                                                >
                                                    <Pencil size={18} />
                                                </Link>


                                                <button
                                                    onClick={() => handleDelete(recipe)}
                                                    className="px-6 bg-red-500 text-white rounded-xl"
                                                >
                                                    <Trash2 size={18} />
                                                </button>

                                            </div>


                                        </div>


                                    </div>


                                ))
                            }


                        </div>

                    )

            }

            {
                selectedRecipe && (

                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-5">


                        <div className="bg-white rounded-3xl p-8 max-w-sm w-full">


                            <h2 className="text-xl font-bold">
                                Delete Recipe?
                            </h2>


                            <p className="text-gray-500 mt-3">
                                Are you sure you want to delete
                                <span className="font-semibold">
                                    {" "}{selectedRecipe.title}
                                </span>?
                            </p>


                            <div className="flex gap-3 mt-6">


                                <button
                                    onClick={() => setSelectedRecipe(null)}
                                    className="flex-1 border rounded-xl py-3"
                                >
                                    Cancel
                                </button>



                                <button
                                    onClick={() => {

                                        deleteMutation.mutate(
                                            selectedRecipe._id
                                        );

                                        setSelectedRecipe(null);

                                    }}
                                    className="flex-1 bg-red-500 text-white rounded-xl py-3"
                                >
                                    Delete
                                </button>


                            </div>


                        </div>


                    </div>

                )
            }


        </div>

    );

};


export default ManageRecipes;