"use client";

import {
    Clock,
    Users,
    ChefHat,
    Utensils,
    Globe,
    Copy,
    Save,
    Sparkles,
} from "lucide-react";
import { toast } from "react-hot-toast";

const AIRecipeCard = ({
    recipe,
    onSave,
    onGenerateAgain,
    saving = false,
}) => {

    if (!recipe) return null;

    const copyRecipe = async () => {

        const text = `
${recipe.title}

${recipe.shortDescription}

Ingredients:
${recipe.ingredients.join("\n")}

Instructions:
${recipe.instructions
                .map((step, index) => `${index + 1}. ${step}`)
                .join("\n")}
`;

        await navigator.clipboard.writeText(text);

        toast.success("Recipe copied!");
    };

    return (

        <div className="mt-12 bg-white rounded-3xl shadow-xl overflow-hidden">

            {/* Image */}

            <div className="relative">

                {
                    recipe.image && (

                        <img
                            src={
                                recipe.image ||
                                "https://images.unsplash.com/photo-1504674900247-0877df9cc836"
                            }
                            alt={recipe.title}
                            className="w-full h-72 object-cover rounded-3xl mb-6"
                        />

                    )
                }

                <div className="absolute top-5 left-5 bg-orange-500 text-white px-4 py-2 rounded-full flex items-center gap-2">
                    <Sparkles size={18} />
                    AI Generated
                </div>

            </div>

            {/* Body */}

            <div className="p-8">

                <h1 className="text-4xl font-bold text-orange-500">
                    {recipe.title}
                </h1>

                <p className="mt-4 text-gray-600 leading-8">
                    {recipe.shortDescription}
                </p>

                {/* Badges */}

                <div className="flex flex-wrap gap-3 mt-6">

                    <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full flex items-center gap-2">
                        <Utensils size={18} />
                        {recipe.category}
                    </span>

                    <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full flex items-center gap-2">
                        <Globe size={18} />
                        {recipe.cuisine}
                    </span>

                </div>

                {/* Info */}

                <div className="grid md:grid-cols-3 gap-5 mt-8">

                    <div className="bg-orange-50 rounded-2xl p-5 flex gap-3 items-center">

                        <Clock className="text-orange-500" />

                        <div>

                            <p className="text-gray-500 text-sm">
                                Cooking Time
                            </p>

                            <p className="font-semibold">
                                {recipe.cookingTime} Minutes
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
                                {recipe.servings}
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

                {/* Description */}

                <section className="mt-10">

                    <h2 className="text-2xl font-bold mb-4">
                        Description
                    </h2>

                    <p className="text-gray-700 leading-8">
                        {recipe.description}
                    </p>

                </section>

                {/* Ingredients */}

                <section className="mt-10">

                    <h2 className="text-2xl font-bold mb-5">
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

                    <h2 className="text-2xl font-bold mb-5">
                        Cooking Instructions
                    </h2>

                    <div className="space-y-5">

                        {recipe.instructions.map((step, index) => (

                            <div
                                key={index}
                                className="flex gap-4"
                            >

                                <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex justify-center items-center shrink-0">
                                    {index + 1}
                                </div>

                                <p className="leading-7 text-gray-700">
                                    {step}
                                </p>

                            </div>

                        ))}

                    </div>

                </section>

                {/* Buttons */}

                <div className="flex flex-wrap gap-4 mt-12">

                    <button
                        onClick={onSave}
                        disabled={saving}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl flex items-center gap-2"
                    >
                        <Save size={18} />

                        {
                            saving
                                ? "Saving..."
                                : "Save Recipe"
                        }

                    </button>

                    <button
                        onClick={copyRecipe}
                        className="border px-8 py-3 rounded-xl flex items-center gap-2 hover:bg-gray-100"
                    >
                        <Copy size={18} />
                        Copy Recipe
                    </button>

                    <button
                        onClick={onGenerateAgain}
                        className="border px-8 py-3 rounded-xl hover:bg-gray-100"
                    >
                        Generate Another
                    </button>

                </div>

            </div>

        </div>

    );
};

export default AIRecipeCard;