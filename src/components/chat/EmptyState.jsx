"use client";

import {
    Bot,
    Sparkles,
    ChefHat,
    Soup,
    Apple,
    Coffee,
} from "lucide-react";

const suggestions = [
    {
        icon: ChefHat,
        title: "Dinner Ideas",
        text: "Suggest a healthy dinner under 30 minutes",
    },
    {
        icon: Soup,
        title: "Recipe Generator",
        text: "Create a recipe using chicken, rice and carrots",
    },
    {
        icon: Apple,
        title: "Nutrition",
        text: "Give me high-protein breakfast ideas",
    },
    {
        icon: Coffee,
        title: "Cooking Tips",
        text: "How can I make fluffy pancakes?",
    },
];

export default function EmptyState({ onSuggestion }) {
    return (
        <div className="flex h-full flex-col items-center justify-center px-6 py-12">

            {/* AI Icon */}
            <div className="relative mb-8">

                <div className="absolute inset-0 rounded-full bg-orange-300 blur-3xl opacity-40"></div>

                <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 shadow-2xl">

                    <Bot className="text-white" size={42} />

                </div>

            </div>

            {/* Title */}

            <h2 className="text-3xl font-bold text-gray-800 text-center">
                Welcome to Recipe Genie AI
            </h2>

            <p className="mt-3 max-w-xl text-center text-gray-500 leading-7">
                Ask anything about cooking, recipes, ingredient substitutions,
                nutrition, meal planning, or food preparation. I'm here to help
                you become a better cook.
            </p>

            {/* Badge */}

            <div className="mt-6 flex items-center gap-2 rounded-full bg-orange-100 px-5 py-2 text-orange-600 font-medium">

                <Sparkles size={18} />

                AI Powered Cooking Assistant

            </div>

            {/* Suggestions */}

            <div className="mt-10 grid w-full max-w-4xl gap-5 md:grid-cols-2">

                {suggestions.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <button
                            key={index}
                            onClick={() => onSuggestion(item.text)}
                            className="
                                group
                                rounded-3xl
                                border
                                border-gray-200
                                bg-white
                                p-6
                                text-left
                                shadow-sm
                                transition-all
                                duration-300
                                hover:-translate-y-1
                                hover:border-orange-300
                                hover:shadow-xl
                            "
                        >
                            <div className="flex items-center gap-4">

                                <div className="
                                    flex
                                    h-12
                                    w-12
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    bg-orange-100
                                    text-orange-600
                                    transition-all
                                    duration-300
                                    group-hover:bg-orange-500
                                    group-hover:text-white
                                ">
                                    <Icon size={22} />
                                </div>

                                <div>

                                    <h3 className="font-semibold text-gray-800">
                                        {item.title}
                                    </h3>

                                    <p className="mt-1 text-sm text-gray-500 leading-6">
                                        {item.text}
                                    </p>

                                </div>

                            </div>

                        </button>
                    );
                })}

            </div>

        </div>
    );
}