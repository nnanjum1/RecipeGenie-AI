"use client";

import {
    Sparkles,
    Search,
    Clock,
    Lightbulb
} from "lucide-react";


export default function AIBenefits() {


    const benefits = [

        {
            icon: <Sparkles size={30} />,
            title: "AI Recipe Creation",
            description:
                "Generate unique recipes instantly based on your ingredients and preferences."
        },

        {
            icon: <Search size={30} />,
            title: "Smart Ingredient Analysis",
            description:
                "AI understands your available ingredients and suggests the best possible meals."
        },

        {
            icon: <Clock size={30} />,
            title: "Save Cooking Time",
            description:
                "Get recipes based on your preferred cooking time and difficulty level."
        },

        {
            icon: <Lightbulb size={30} />,
            title: "Creative Cooking Ideas",
            description:
                "Discover new cuisines and cooking styles with AI-powered suggestions."
        }

    ];


    return (

        <section className="max-w-6xl mx-auto px-5 py-16">


            <div className="text-center mb-10">

                <h2 className="text-4xl font-bold text-orange-500">
                    AI Benefits
                </h2>

                <p className="text-gray-600 mt-3">
                    Experience smarter and easier cooking with artificial intelligence.
                </p>

            </div>



            <div className="grid md:grid-cols-4 gap-6">


                {
                    benefits.map((item, index) => (

                        <div
                            key={index}
                            className="bg-white rounded-3xl shadow-lg p-6 border border-orange-100 text-center"
                        >

                            <div className="flex justify-center text-orange-500 mb-5">

                                {item.icon}

                            </div>


                            <h3 className="font-bold text-xl mb-3">

                                {item.title}

                            </h3>


                            <p className="text-gray-600 leading-7">

                                {item.description}

                            </p>


                        </div>

                    ))
                }


            </div>


        </section>

    );

}