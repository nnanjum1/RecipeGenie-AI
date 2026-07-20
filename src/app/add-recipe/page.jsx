"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "@/services/api";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { authClient } from "@/lib/auth-client";

const AddRecipe = () => {

    const router = useRouter();

    const { data: session, isPending } = authClient.useSession();

    const queryClient = useQueryClient();

    const [loading, setLoading] = useState(false);


    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm();



    useEffect(() => {

        if (!isPending && !session) {
            router.push("/login");
        }

    }, [session, isPending, router]);




    const onSubmit = async (data) => {

        if (!session) {
            toast.error("Please login first");
            return;
        }


        if (!data.image?.[0]) {

            toast.error("Please select recipe image");

            return;

        }



        try {

            setLoading(true);



            // Upload Image to ImgBB

            const formData = new FormData();

            formData.append(
                "image",
                data.image[0]
            );


            const imageRes = await axios.post(
                `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
                formData
            );


            const imageUrl = imageRes.data.data.url;




            // Convert text to arrays

            const ingredients = data.ingredients
                .split("\n")
                .map(item => item.trim())
                .filter(Boolean);



            const instructions = data.instructions
                .split("\n")
                .map(item => item.trim())
                .filter(Boolean);






            const recipe = {

                image: imageUrl,

                title: data.title,

                shortDescription: data.shortDescription,

                description: data.description,

                category: data.category,

                cuisine: data.cuisine,

                cookingTime: Number(data.cookingTime),

                difficulty: data.difficulty,

                servings: Number(data.servings),


                ingredients,

                instructions,


                // voting

                likes: 0,



                // owner info

                userEmail: session.user.email,

                userName:
                    session.user.name || "Anonymous",


                createdAt: new Date()

            };






            const res = await api.post(
                "/recipes",
                recipe
            );



            if (res.data.insertedId) {


                toast.success(
                    "Recipe added successfully!"
                );



                await queryClient.invalidateQueries({
                    queryKey: ["recipes"]
                });



                reset();



                router.push(
                    "/manage-recipes"
                );


            }



        } catch (error) {

            console.error(error);

            toast.error(
                "Failed to add recipe"
            );


        } finally {

            setLoading(false);

        }


    };





    if (isPending) {

        return (

            <div className="text-center py-20">

                Checking authentication...

            </div>

        );

    }



    if (!session) {

        return null;

    }

    return (
        <div className="max-w-5xl mx-auto py-10 px-5">

            <h1 className="text-4xl font-bold text-center text-orange-500 mb-10">
                Add New Recipe
            </h1>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 bg-white shadow-lg rounded-3xl p-8"
            >
                <div>
                    <label className="font-semibold block mb-2">
                        Recipe Image
                    </label>

                    <label
                        htmlFor="image"
                        className="flex items-center justify-between border rounded-xl px-4 py-3 cursor-pointer hover:border-orange-500 transition"
                    >
                        <span className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium">
                            Choose Image
                        </span>

                        <span className="text-gray-500 text-sm truncate ml-4">
                            {watch("image")?.[0]?.name || "No file selected"}
                        </span>
                    </label>

                    <input
                        id="image"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        {...register("image", {
                            required: "Recipe image is required",
                        })}
                    />

                    {errors.image && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.image.message}
                        </p>
                    )}
                </div>
                <div>

                    <label className="font-semibold">
                        Recipe Title
                    </label>

                    <input
                        type="text"
                        placeholder="Recipe title"
                        className="w-full border rounded-xl p-3 mt-2"
                        {...register("title", {
                            required: "Title is required",
                        })}
                    />

                    {errors.title && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.title.message}
                        </p>
                    )}

                </div>
                <div>

                    <label className="font-semibold">
                        Short Description
                    </label>

                    <textarea
                        rows={3}
                        className="w-full border rounded-xl p-3 mt-2"
                        {...register("shortDescription", {
                            required: "Short description is required",
                        })}
                    />

                    {errors.shortDescription && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.shortDescription.message}
                        </p>
                    )}

                </div>

                <div className="grid md:grid-cols-2 gap-6">

                    {/* Category */}

                    <div>

                        <label className="font-semibold">
                            Category
                        </label>

                        <select
                            className="w-full border rounded-xl p-3 mt-2"
                            {...register("category", {
                                required: "Category is required",
                            })}
                        >

                            <option value="">Select Category</option>

                            <option>Breakfast</option>
                            <option>Lunch</option>
                            <option>Dinner</option>
                            <option>Dessert</option>
                            <option>Snack</option>
                            <option>Beverage</option>

                        </select>

                        {errors.category && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.category.message}
                            </p>
                        )}

                    </div>

                    {/* Cuisine */}

                    <div>

                        <label className="font-semibold">
                            Cuisine
                        </label>

                        <input
                            type="text"
                            placeholder="Italian, Chinese, Bangladeshi..."
                            className="w-full border rounded-xl p-3 mt-2"
                            {...register("cuisine", {
                                required: "Cuisine is required",
                            })}
                        />

                        {errors.cuisine && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.cuisine.message}
                            </p>
                        )}

                    </div>

                    {/* Cooking Time */}

                    <div>

                        <label className="font-semibold">
                            Cooking Time (Minutes)
                        </label>

                        <input
                            type="number"
                            placeholder="30"
                            className="w-full border rounded-xl p-3 mt-2"
                            {...register("cookingTime", {
                                required: "Cooking time is required",
                            })}
                        />

                        {errors.cookingTime && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.cookingTime.message}
                            </p>
                        )}

                    </div>

                    {/* Difficulty */}

                    <div>

                        <label className="font-semibold">
                            Difficulty
                        </label>

                        <select
                            className="w-full border rounded-xl p-3 mt-2"
                            {...register("difficulty", {
                                required: "Difficulty is required",
                            })}
                        >

                            <option value="">Select Difficulty</option>

                            <option>Easy</option>
                            <option>Medium</option>
                            <option>Hard</option>

                        </select>

                        {errors.difficulty && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.difficulty.message}
                            </p>
                        )}

                    </div>

                    {/* Servings */}

                    <div>

                        <label className="font-semibold">
                            Servings
                        </label>

                        <input
                            type="number"
                            placeholder="4"
                            className="w-full border rounded-xl p-3 mt-2"
                            {...register("servings", {
                                required: "Servings are required",
                            })}
                        />

                        {errors.servings && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.servings.message}
                            </p>
                        )}

                    </div>

                </div>
                <div>

                    <label className="font-semibold">
                        Full Description
                    </label>

                    <textarea
                        rows={5}
                        className="w-full border rounded-xl p-3 mt-2"
                        {...register("description", {
                            required: "Description is required",
                        })}
                    />

                    {errors.description && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.description.message}
                        </p>
                    )}

                </div>
                <div>

                    <label className="font-semibold">
                        Ingredients
                    </label>

                    <textarea
                        rows={6}
                        placeholder={`2 Eggs
1 Cup Milk
Salt
Black Pepper`}
                        className="w-full border rounded-xl p-3 mt-2"
                        {...register("ingredients", {
                            required: "Ingredients are required",
                        })}
                    />

                    <p className="text-sm text-gray-500 mt-1">
                        Write one ingredient per line.
                    </p>

                    {errors.ingredients && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.ingredients.message}
                        </p>
                    )}

                </div>

                <div>

                    <label className="font-semibold">
                        Cooking Instructions
                    </label>

                    <textarea
                        rows={8}
                        placeholder={`Boil water

Add pasta

Cook for 10 minutes

Serve hot`}
                        className="w-full border rounded-xl p-3 mt-2"
                        {...register("instructions", {
                            required: "Instructions are required",
                        })}
                    />

                    <p className="text-sm text-gray-500 mt-1">
                        Write one instruction per line.
                    </p>

                    {errors.instructions && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.instructions.message}
                        </p>
                    )}

                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-semibold text-lg transition cursor-pointer disabled:opacity-60"
                >
                    {loading ? "Adding Recipe..." : "Add Recipe"}
                </button>
            </form>

        </div>
    );
};

export default AddRecipe;