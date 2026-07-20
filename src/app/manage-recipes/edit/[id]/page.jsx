"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import axios from "axios";
import api from "@/services/api";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";

const EditRecipe = () => {

    const { data: session, isPending } = authClient.useSession();
    const [previewImage, setPreviewImage] = useState("");
    const { id } = useParams();
    const router = useRouter();
    const queryClient = useQueryClient();

    const [loading, setLoading] = useState(false);
    const [recipeLoading, setRecipeLoading] = useState(true);
    const [oldImage, setOldImage] = useState("");

    useEffect(() => {

        if (!isPending && !session) {

            toast.error("Please login first");

            router.push("/login");

        }

    }, [session, isPending, router]);


    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: {
            errors
        }
    } = useForm();

    useEffect(() => {
        return () => {
            if (previewImage?.startsWith("blob:")) {
                URL.revokeObjectURL(previewImage);
            }
        };
    }, [previewImage]);


    const formatIngredientsForInput = (ingredients = []) => {
        return ingredients
            .map(item => {

                if (typeof item === "string") {
                    return item;
                }

                if (typeof item === "object") {
                    return `${item.name || ""} ${item.quantity || ""}`.trim();
                }

                return "";

            })
            .filter(Boolean)
            .join("\n");
    };
    useEffect(() => {

        const fetchRecipe = async () => {

            try {

                const res = await api.get(`/recipes/${id}`);

                const recipe = res.data;

                setOldImage(recipe.image);
                setPreviewImage(recipe.image);

                reset({

                    title: recipe.title,

                    shortDescription: recipe.shortDescription,

                    description: recipe.description,

                    category: recipe.category,

                    cuisine: recipe.cuisine,

                    cookingTime: recipe.cookingTime,

                    difficulty: recipe.difficulty,

                    servings: recipe.servings,

                    ingredients: formatIngredientsForInput(recipe.ingredients),

                    instructions: recipe.instructions.join("\n"),

                });


            }
            catch (error) {

                toast.error("Failed to load recipe");

            }
            finally {

                setRecipeLoading(false);

            }

        };


        if (id) {
            fetchRecipe();
        }


    }, [id, reset]);





    const onSubmit = async (data) => {


        try {

            setLoading(true);


            let imageUrl = oldImage;



            // Upload new image if selected

            if (data.image?.length > 0) {


                const formData = new FormData();

                formData.append(
                    "image",
                    data.image[0]
                );


                const imageRes = await axios.post(

                    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,

                    formData

                );


                imageUrl = imageRes.data.data.url;

            }




            const updatedRecipe = {


                image: imageUrl,

                title: data.title,

                shortDescription: data.shortDescription,

                description: data.description,

                category: data.category,

                cuisine: data.cuisine,

                cookingTime: Number(data.cookingTime),

                difficulty: data.difficulty,

                servings: Number(data.servings),


                ingredients: data.ingredients
                    .split("\n")
                    .map(item => item.trim())
                    .filter(Boolean),



                instructions: data.instructions
                    .split("\n")
                    .map(item => item.trim())
                    .filter(Boolean),


            };



            const res = await api.patch(
                `/recipes/${id}`,
                updatedRecipe
            );


            if (res.data.modifiedCount > 0) {

                toast.success(
                    "Recipe updated successfully"
                );

                await queryClient.invalidateQueries({
                    queryKey: [
                        "my-recipes",
                        session?.user?.email,
                    ],
                });

                await queryClient.invalidateQueries({
                    queryKey: ["recipes"],
                });

                await queryClient.invalidateQueries({
                    queryKey: ["recipe", id],
                });

                router.push("/manage-recipes");

                router.refresh();

            }
            else {

                toast.success(
                    "No changes found"
                );

            }



        }
        catch (error) {

            console.log(error);

            toast.error(
                "Update failed"
            );

        }
        finally {

            setLoading(false);

        }

    };




    if (recipeLoading) {

        return (
            <div className="text-center py-20">
                Loading recipe...
            </div>
        );

    }





    return (

        <div className="max-w-5xl mx-auto px-5 py-10">


            <h1 className="text-4xl font-bold text-center text-orange-500 mb-10">
                Edit Recipe
            </h1>



            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white shadow-lg rounded-3xl p-8 space-y-6"
            >


                {/* Image */}

                <div>

                    <label className="font-semibold">
                        Change Image (Optional)
                    </label>


                    <input
                        type="file"
                        accept="image/*"
                        className="w-full border rounded-xl p-3 mt-2"
                        {...register("image")}
                        onChange={(e) => {
                            const file = e.target.files?.[0];

                            if (file) {
                                setPreviewImage(URL.createObjectURL(file));
                            }
                        }}
                    />


                    <img
                        src={previewImage}
                        alt="Preview"
                        className="mt-4 w-48 h-36 object-cover rounded-xl border"
                    />

                </div>



                {/* Title */}

                <div>

                    <label className="font-semibold">
                        Title
                    </label>

                    <input
                        className="w-full border rounded-xl p-3 mt-2"
                        {...register("title", {
                            required: "Title is required"
                        })}
                    />

                    {
                        errors.title &&
                        <p className="text-red-500 text-sm">
                            {errors.title.message}
                        </p>
                    }

                </div>



                {/* Short Description */}

                <textarea

                    rows={3}

                    className="w-full border rounded-xl p-3"

                    {...register("shortDescription", {
                        required: "Required"
                    })}

                />



                {/* Full Description */}

                <textarea

                    rows={5}

                    className="w-full border rounded-xl p-3"

                    {...register("description", {
                        required: "Required"
                    })}

                />



                <div className="grid md:grid-cols-2 gap-5">


                    <select
                        className="border rounded-xl p-3"
                        {...register("category")}
                    >

                        <option>Breakfast</option>
                        <option>Brunch</option>
                        <option>Lunch</option>
                        <option>Dinner</option>
                        <option>Appetizer</option>
                        <option>Soup</option>
                        <option>Salad</option>
                        <option>Main Course</option>
                        <option>Side Dish</option>
                        <option>Snack</option>
                        <option>Dessert</option>
                        <option>Bakery</option>
                        <option>Beverage</option>
                        <option>Smoothie</option>
                        <option>Juice</option>
                        <option>Seafood</option>
                        <option>Chicken</option>
                        <option>Beef</option>
                        <option>Vegetarian</option>
                        <option>Vegan</option>
                        <option>Pasta</option>
                        <option>Pizza</option>
                        <option>Rice</option>
                        <option>Noodles</option>
                        <option>BBQ</option>
                        <option>Street Food</option>
                        <option>Healthy</option>
                        <option>Low Carb</option>
                        <option>High Protein</option>
                        <option>Gluten Free</option>
                        <option>Kids</option>
                        <option>Holiday Special</option>

                    </select>



                    <input
                        className="border rounded-xl p-3"
                        placeholder="Cuisine"
                        {...register("cuisine")}
                    />



                    <input
                        type="number"
                        className="border rounded-xl p-3"
                        placeholder="Cooking time"
                        {...register("cookingTime")}
                    />



                    <select
                        className="border rounded-xl p-3"
                        {...register("difficulty")}
                    >

                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>

                    </select>



                    <input
                        type="number"
                        className="border rounded-xl p-3"
                        placeholder="Servings"
                        {...register("servings")}
                    />


                </div>



                <textarea

                    rows={6}

                    className="w-full border rounded-xl p-3"

                    {...register("ingredients")}

                />



                <textarea

                    rows={8}

                    className="w-full border rounded-xl p-3"

                    {...register("instructions")}

                />




                <button

                    disabled={loading}

                    className="w-full bg-orange-500 text-white py-4 rounded-xl font-semibold"

                >

                    {
                        loading
                            ?
                            "Updating..."
                            :
                            "Update Recipe"
                    }


                </button>



            </form>


        </div>

    );

};


export default EditRecipe;