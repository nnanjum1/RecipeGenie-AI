const RecipeSkeleton = () => {
    return (
        <div className="animate-pulse bg-white rounded-2xl overflow-hidden shadow">

            <div className="h-56 bg-gray-200" />

            <div className="p-5">

                <div className="h-5 bg-gray-200 rounded w-1/2 mb-4"></div>

                <div className="h-4 bg-gray-200 rounded"></div>

                <div className="h-4 bg-gray-200 rounded mt-2"></div>

                <div className="h-10 bg-gray-200 rounded-xl mt-6"></div>

            </div>

        </div>
    );
};

export default RecipeSkeleton;