"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";


export default function FAQ() {


    const [openIndex, setOpenIndex] = useState(null);



    const questions = [

        {
            q: "How does Recipe Genie generate recipes?",
            a: "AI analyzes your ingredients, cuisine preference, cooking time, and difficulty to create personalized recipes."
        },

        {
            q: "Can I save generated recipes?",
            a: "Yes. Logged-in users can save recipes and manage them later."
        },

        {
            q: "Do I need cooking experience?",
            a: "No. Recipe Genie provides step-by-step instructions suitable for beginners."
        },

        {
            q: "Can I customize the generated recipes?",
            a: "Yes. You can provide ingredients, cuisine type, cooking time, difficulty level, and servings to get customized recipes."
        },

        {
            q: "Is Recipe Genie free to use?",
            a: "Recipe Genie provides AI-powered recipe generation features to help users create personalized meals easily."
        }

    ];




    const toggleFAQ = (index) => {

        setOpenIndex(
            openIndex === index ? null : index
        );

    };



    return (

        <section className="bg-orange-50 py-16">


            <div className="max-w-4xl mx-auto px-5">


                <h2 className="text-4xl font-bold text-center text-orange-500 mb-10">

                    Frequently Asked Questions

                </h2>




                <div className="space-y-4">


                    {
                        questions.map((item, index) => (


                            <div
                                key={index}
                                className="bg-white rounded-2xl shadow overflow-hidden border border-orange-100"
                            >



                                <button

                                    onClick={() => toggleFAQ(index)}

                                    className="w-full flex justify-between items-center p-6 text-left"

                                >


                                    <h3 className="font-bold text-lg">

                                        {item.q}

                                    </h3>



                                    <div className="text-orange-500">

                                        {
                                            openIndex === index
                                                ?
                                                <Minus size={24} />
                                                :
                                                <Plus size={24} />
                                        }

                                    </div>


                                </button>





                                <div

                                    className={`px-6 overflow-hidden transition-all duration-300 ${openIndex === index
                                            ? "max-h-40 pb-6"
                                            : "max-h-0"
                                        }`}

                                >

                                    <p className="text-gray-600 leading-7">

                                        {item.a}

                                    </p>


                                </div>



                            </div>


                        ))
                    }


                </div>


            </div>


        </section>

    );

}