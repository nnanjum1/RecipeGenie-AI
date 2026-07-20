"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";
import {
    getMyFavorites,
    removeFavorite,
} from "@/services/recipeApi";


const SavedRecipes = () => {

    const router = useRouter();
    const queryClient = useQueryClient();

    const {
        data: session,
        isPending
    } = authClient.useSession();



    useEffect(() => {

        if (!isPending && !session) {

            toast.error("Please login first");

            router.push("/login");

        }

    }, [session, isPending, router]);



    const email = session?.user?.email;



    const {
        data: favorites = [],
        isLoading
    } = useQuery({

        queryKey: [
            "my-favorites",
            email
        ],

        queryFn: () => getMyFavorites(email),

        enabled: !!email,

    });



    const removeMutation = useMutation({

        mutationFn: ({
            recipeId
        }) =>
            removeFavorite(recipeId, email),


        onSuccess: () => {

            toast.success(
                "Removed from saved items"
            );


            queryClient.invalidateQueries({
                queryKey: [
                    "my-favorites",
                    email
                ]
            });

        },

        onError: () => {

            toast.error(
                "Failed to remove"
            );

        }

    });



    if (isPending || isLoading) {

        return (
            <div className="text-center py-20">
                Loading saved recipes...
            </div>
        );

    }



    return (

        <div className="max-w-5xl mx-auto px-5 py-10">


            <h1 className="text-4xl font-bold text-orange-500 mb-10 text-center">
                My Saved Recipes
            </h1>



            {
                favorites.length === 0 ?

                    (

                        <div className="text-center py-20">

                            <h2 className="text-2xl font-semibold">
                                No saved recipes yet
                            </h2>

                        </div>

                    )

                    :

                    (

                        <div className="space-y-4">


                            {
                                favorites.map((item) => {


                                    const recipe = item.recipe;


                                    return (

                                        <div

                                            key={item._id}

                                            className="
                                flex
                                items-center
                                justify-between
                                bg-white
                                shadow-md
                                rounded-2xl
                                p-4
                                "

                                        >


                                            <div className="flex items-center gap-4">


                                                <img

                                                    src={recipe.image}

                                                    alt={recipe.title}

                                                    className="
                                        w-20
                                        h-20
                                        object-cover
                                        rounded-xl
                                        "

                                                />


                                                <div>

                                                    <h2 className="font-bold text-lg">
                                                        {recipe.title}
                                                    </h2>


                                                    <p className="text-gray-500 text-sm">
                                                        {recipe.category}
                                                    </p>


                                                    <p className="text-sm">
                                                        {recipe.cookingTime} min
                                                    </p>


                                                </div>


                                            </div>




                                            <div className="flex gap-3">


                                                <Link

                                                    href={`/recipes/${recipe._id}`}

                                                    className="
                                        flex
                                        items-center
                                        gap-2
                                        bg-orange-500
                                        text-white
                                        px-4
                                        py-2
                                        rounded-xl
                                        "

                                                >

                                                    <Eye size={18} />

                                                    View

                                                </Link>



                                                <button

                                                    onClick={() =>
                                                        removeMutation.mutate({
                                                            recipeId: recipe._id
                                                        })
                                                    }

                                                    className="
                                        flex
                                        items-center
                                        gap-2
                                        bg-red-500
                                        text-white
                                        px-4
                                        py-2
                                        rounded-xl
                                        "

                                                >

                                                    <Trash2 size={18} />

                                                    Remove

                                                </button>


                                            </div>



                                        </div>

                                    )

                                })
                            }


                        </div>

                    )

            }



        </div>

    );

};


export default SavedRecipes;