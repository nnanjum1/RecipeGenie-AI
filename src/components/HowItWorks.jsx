"use client";


import {
    Search,
    Brain,
    ChefHat,
    Save
} from "lucide-react";


export default function HowItWorks() {


    const steps = [

        {
            icon: <Search size={30} />,
            title: "Enter Ingredients",
            description: "Tell AI what ingredients you have."
        },

        {
            icon: <Brain size={30} />,
            title: "AI Analyzes",
            description: "AI understands your preferences and creates a recipe."
        },

        {
            icon: <ChefHat size={30} />,
            title: "Cook Your Meal",
            description: "Follow the generated cooking instructions."
        },

        {
            icon: <Save size={30} />,
            title: "Save Recipe",
            description: "Save your favorite recipes for later."
        }

    ];



    return (

        <section className="bg-orange-50 py-16">


            <div className="max-w-6xl mx-auto px-5">


                <h2 className="text-4xl font-bold text-center text-orange-500 mb-10">

                    How Recipe Genie Works

                </h2>



                <div className="grid md:grid-cols-4 gap-6">


                    {
                        steps.map((step, index) => (

                            <div
                                key={index}
                                className="bg-white rounded-3xl p-7 shadow text-center"
                            >

                                <div className="mx-auto bg-orange-500 text-white w-14 h-14 rounded-full flex items-center justify-center">

                                    {step.icon}

                                </div>


                                <h3 className="font-bold text-xl mt-5">

                                    {step.title}

                                </h3>


                                <p className="text-gray-600 mt-3">

                                    {step.description}

                                </p>


                            </div>


                        ))
                    }


                </div>


            </div>


        </section>

    );

}