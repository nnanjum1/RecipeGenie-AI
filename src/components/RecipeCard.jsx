import Link from "next/link";
import { Clock3, ChefHat, Star } from "lucide-react";

const RecipeCard = ({ recipe }) => {
    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl duration-300 border group">

            <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-56 object-cover group-hover:scale-105 duration-500"
            />

            <div className="p-5">

                <div className="flex justify-between items-center">

                    <span className="text-xs bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
                        {recipe.cuisine}
                    </span>

                    <div className="flex items-center gap-1 text-yellow-500">
                        <Star size={16} fill="currentColor" />
                        {recipe.rating}
                    </div>

                </div>

                <h2 className="text-xl font-bold mt-4 line-clamp-1">
                    {recipe.title}
                </h2>

                <p className="text-gray-500 mt-2 line-clamp-2">
                    {recipe.shortDescription}
                </p>

                <div className="flex justify-between mt-5 text-sm text-gray-500">

                    <div className="flex items-center gap-2">
                        <Clock3 size={18} />
                        {recipe.cookingTime}
                    </div>

                    <div className="flex items-center gap-2">
                        <ChefHat size={18} />
                        {recipe.difficulty}
                    </div>

                </div>

                <Link
                    href={`/recipes/${recipe._id}`}
                    className="block mt-6 text-center bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl duration-300"
                >
                    View Details
                </Link>

            </div>

        </div>
    );
};

export default RecipeCard;