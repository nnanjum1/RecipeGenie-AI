"use client";

import { useState, useEffect } from "react";
import { generateRecipe, saveRecipe, getRecipeImage } from "@/services/recipeApi";
import toast from "react-hot-toast";
import AIRecipeCard from "@/components/AIRecipeCard";
import AIRecipeSkeleton from "@/components/AIRecipeSkeleton";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function AIGenerator() {

    const [loading, setLoading] = useState(false);

    const [recipe, setRecipe] = useState(null);
    const router = useRouter();

    const { data: session, isPending } = authClient.useSession();

    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
        ingredients: "",
        cuisine: "",
        difficulty: "Easy",
        cookingTime: 30,
        servings: 2,
    });

    useEffect(() => {

        if (!isPending && !session) {

            toast.error(
                "Please login to use AI Generator"
            );

            router.push("/login");

        }

    }, [session, isPending, router]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleGenerate = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);
            const result = await generateRecipe(form);


            const image = await getRecipeImage(
                result.imageQuery || result.title
            );



            setRecipe({

                ...result,

                image

            });

            toast.success("Recipe generated!");

        } catch (err) {

            console.log(err);

            toast.error("Generation failed");

        } finally {

            setLoading(false);

        }

    };

    const handleSaveRecipe = async () => {


        if (!session) {

            toast.error(
                "Please login to save recipe"
            );

            return;

        }


        try {


            setSaving(true);



            const recipeData = {


                ...recipe,


                image:
                    recipe.image ||
                    `https://source.unsplash.com/1200x700/?${recipe.imageQuery},food`,


                likes: 0,


                userEmail:
                    session.user.email,


                userName:
                    session.user.name,


                createdAt:
                    new Date()


            };



            const result = await saveRecipe(
                recipeData
            );



            if (result.insertedId) {


                toast.success(
                    "Recipe saved successfully"
                );


                router.push(
                    "/manage-recipes"
                );


            }


        }
        catch (error) {


            console.log(error);


            toast.error(
                "Failed to save recipe"
            );


        }
        finally {

            setSaving(false);

        }


    };

    if (isPending) {

        return (

            <div className="min-h-screen flex items-center justify-center">

                <div className="text-orange-500 text-xl font-semibold">
                    Checking authentication...
                </div>

            </div>

        );

    }


    if (!session) {

        return null;

    }


    return (

        <div className="max-w-5xl mx-auto px-5 py-10">

            <h1 className="text-4xl font-bold text-center text-orange-500 mb-10">
                AI Recipe Generator
            </h1>

            <form
                onSubmit={handleGenerate}
                className="bg-white rounded-3xl shadow-xl border border-orange-100 p-8 md:p-10 space-y-7"
            >

                <div className="text-center mb-5">

                    <h2 className="text-2xl font-bold text-orange-500">
                        Create Your AI Recipe
                    </h2>

                    <p className="text-gray-500 mt-2">
                        Tell us your ingredients and preferences. AI will create a delicious recipe for you.
                    </p>

                </div>


                {/* Ingredients */}

                <div>

                    <label className="font-semibold text-gray-700 block mb-2">
                        Ingredients
                    </label>


                    <textarea
                        name="ingredients"
                        rows={5}
                        placeholder="Example: Chicken, Garlic, Butter, Cheese..."
                        className="
                w-full 
                border 
                border-gray-200
                rounded-2xl
                p-4
                outline-none
                focus:border-orange-500
                focus:ring-2
                focus:ring-orange-200
                transition
            "
                        value={form.ingredients}
                        onChange={handleChange}
                        required
                    />

                </div>



                {/* Cuisine */}

                <div>

                    <label className="font-semibold text-gray-700 block mb-2">
                        Cuisine Type
                    </label>


                    <input
                        type="text"
                        name="cuisine"
                        placeholder="Italian, Bangladeshi, Chinese..."
                        className="
                w-full
                border
                border-gray-200
                rounded-2xl
                p-4
                outline-none
                focus:border-orange-500
                focus:ring-2
                focus:ring-orange-200
                transition
            "
                        value={form.cuisine}
                        onChange={handleChange}
                    />


                </div>




                {/* Options */}

                <div className="grid md:grid-cols-3 gap-5">


                    {/* Difficulty */}

                    <div>

                        <label className="font-semibold text-gray-700 block mb-2">
                            Difficulty
                        </label>


                        <select
                            name="difficulty"
                            className="
                    w-full
                    border
                    border-gray-200
                    rounded-2xl
                    p-4
                    bg-white
                    outline-none
                    focus:border-orange-500
                "
                            value={form.difficulty}
                            onChange={handleChange}
                        >

                            <option value="Easy">
                                Easy
                            </option>

                            <option value="Medium">
                                Medium
                            </option>

                            <option value="Hard">
                                Hard
                            </option>

                        </select>


                    </div>





                    {/* Cooking Time */}

                    <div>


                        <label className="font-semibold text-gray-700 block mb-2">
                            Cooking Time
                        </label>


                        <div className="relative">

                            <input
                                type="number"
                                name="cookingTime"
                                className="
                        w-full
                        border
                        border-gray-200
                        rounded-2xl
                        p-4
                        pr-20
                        outline-none
                        focus:border-orange-500
                    "
                                value={form.cookingTime}
                                onChange={handleChange}
                            />


                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                                min
                            </span>


                        </div>


                    </div>





                    {/* Servings */}

                    <div>


                        <label className="font-semibold text-gray-700 block mb-2">
                            Servings
                        </label>


                        <div className="relative">


                            <input
                                type="number"
                                name="servings"
                                className="
                        w-full
                        border
                        border-gray-200
                        rounded-2xl
                        p-4
                        pr-24
                        outline-none
                        focus:border-orange-500
                    "
                                value={form.servings}
                                onChange={handleChange}
                            />


                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                                people
                            </span>


                        </div>


                    </div>



                </div>





                {/* Generate Button */}


                <button

                    disabled={loading}

                    className="
            w-full
            bg-orange-500
            hover:bg-orange-600
            text-white
            py-4
            rounded-2xl
            font-semibold
            text-lg
            transition
            shadow-md
            hover:shadow-lg
            disabled:opacity-60
            cursor-pointer
        "

                >

                    {
                        loading
                            ?
                            "✨ Creating Recipe..."
                            :
                            "✨ Generate Recipe"
                    }


                </button>


            </form>

            {
                loading ? (
                    <AIRecipeSkeleton />
                ) : (
                    recipe && (
                        <AIRecipeCard

                            recipe={recipe}

                            onSave={handleSaveRecipe}

                            saving={saving}

                            onGenerateAgain={() => {
                                setRecipe(null);
                            }}

                        />
                    )
                )
            }

        </div>

    );

}