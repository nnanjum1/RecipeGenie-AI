import Link from "next/link";
import {
    Sparkles,
    ChefHat,
    MessageCircle,
    Lightbulb
} from "lucide-react";

const HelpPage = () => {
    return (
        <div className="min-h-screen bg-orange-50 flex items-center justify-center px-5 py-20">

            <div className="max-w-5xl w-full bg-white rounded-3xl shadow-xl p-10 text-center">

                <div className="w-20 h-20 mx-auto rounded-full bg-orange-100 flex items-center justify-center">
                    <Sparkles className="text-orange-500" size={40} />
                </div>


                <h1 className="text-4xl md:text-5xl font-bold mt-6 text-orange-500">
                    Need Help Creating Amazing Recipes?
                </h1>


                <p className="text-gray-600 mt-5 text-lg leading-8 max-w-3xl mx-auto">
                    RecipeGenie uses AI to help you discover recipes, generate
                    meal ideas, and save your favorite dishes. Start exploring
                    and make cooking easier than ever.
                </p>



                <div className="grid md:grid-cols-3 gap-6 mt-10">


                    <div className="bg-orange-50 rounded-2xl p-6">

                        <ChefHat
                            className="mx-auto text-orange-500"
                            size={35}
                        />

                        <h3 className="font-bold mt-4 text-xl">
                            Generate Recipes
                        </h3>

                        <p className="text-gray-600 mt-2">
                            Create personalized recipes with AI assistance.
                        </p>

                    </div>



                    <div className="bg-orange-50 rounded-2xl p-6">

                        <Lightbulb
                            className="mx-auto text-orange-500"
                            size={35}
                        />

                        <h3 className="font-bold mt-4 text-xl">
                            Get Cooking Ideas
                        </h3>

                        <p className="text-gray-600 mt-2">
                            Find inspiration for your next delicious meal.
                        </p>

                    </div>



                    <div className="bg-orange-50 rounded-2xl p-6">

                        <MessageCircle
                            className="mx-auto text-orange-500"
                            size={35}
                        />

                        <h3 className="font-bold mt-4 text-xl">
                            Share Feedback
                        </h3>

                        <p className="text-gray-600 mt-2">
                            Help us improve RecipeGenie with your reviews.
                        </p>

                    </div>


                </div>






            </div>

        </div>
    );
};

export default HelpPage;