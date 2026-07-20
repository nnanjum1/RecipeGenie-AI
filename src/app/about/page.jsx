"use client";

import {
    Sparkles,
    ChefHat,
    Brain,
    Heart,
    Utensils
} from "lucide-react";


export default function AboutPage() {


    const features = [

        {
            icon: <Brain size={28} />,
            title: "AI Powered Recipes",
            description:
                "Recipe Genie uses advanced AI technology to generate personalized recipes based on your ingredients and preferences."
        },

        {
            icon: <ChefHat size={28} />,
            title: "Creative Cooking",
            description:
                "Discover new cooking ideas, cuisines, and techniques with recipes created specially for your needs."
        },

        {
            icon: <Heart size={28} />,
            title: "Made For Food Lovers",
            description:
                "Whether you are a beginner or an experienced cook, Recipe Genie helps everyone enjoy cooking."
        }

    ];



    return (

        <div className="max-w-6xl mx-auto px-5 py-12">


            {/* Hero */}

            <section className="text-center">


                <div className="flex justify-center mb-5">

                    <div className="bg-orange-100 text-orange-500 p-4 rounded-full">

                        <Sparkles size={40} />

                    </div>

                </div>


                <h1 className="text-4xl md:text-5xl font-bold text-orange-500">

                    About Recipe Genie

                </h1>


                <p className="mt-5 text-gray-600 max-w-3xl mx-auto text-lg leading-8">

                    Recipe Genie is an AI-powered cooking assistant designed
                    to help users discover, create, and save delicious recipes.
                    Using artificial intelligence, it transforms simple
                    ingredients into complete cooking experiences.

                </p>


            </section>





            {/* Mission */}

            <section className="mt-16 bg-orange-50 rounded-3xl p-8 md:p-12">


                <h2 className="text-3xl font-bold text-orange-500 mb-5">

                    Our Mission

                </h2>


                <p className="text-gray-700 leading-8">

                    Our mission is to make cooking easier, smarter, and more
                    enjoyable. Recipe Genie combines artificial intelligence
                    with culinary knowledge to provide personalized recipes
                    according to ingredients, cuisine preferences, cooking
                    time, and difficulty level.

                </p>


            </section>





            {/* Features */}


            <section className="mt-16">


                <h2 className="text-3xl font-bold text-center mb-8">

                    What Makes Recipe Genie Special?

                </h2>



                <div className="grid md:grid-cols-3 gap-6">


                    {
                        features.map((item, index) => (

                            <div
                                key={index}
                                className="bg-white shadow-lg rounded-3xl p-7 border border-orange-100"
                            >


                                <div className="text-orange-500 mb-5">

                                    {item.icon}

                                </div>


                                <h3 className="text-xl font-bold mb-3">

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






            {/* Closing CTA */}

            <section className="mt-16 text-center">


                <Utensils
                    className="mx-auto text-orange-500"
                    size={40}
                />


                <h2 className="text-3xl font-bold mt-5">

                    Start Creating Amazing Recipes Today

                </h2>


                <p className="text-gray-600 mt-3">

                    Let AI become your personal kitchen assistant.

                </p>


            </section>



        </div>

    );

}