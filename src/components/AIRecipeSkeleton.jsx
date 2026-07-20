"use client";

const AIRecipeSkeleton = () => {

    return (

        <div className="mt-12 bg-white rounded-3xl shadow-xl overflow-hidden animate-pulse">

            {/* Image Skeleton */}

            <div className="h-[420px] bg-gray-200"></div>


            <div className="p-8 space-y-6">


                {/* Title */}

                <div className="h-10 bg-gray-200 rounded-xl w-3/4"></div>


                {/* Description */}

                <div className="space-y-3">

                    <div className="h-4 bg-gray-200 rounded w-full"></div>

                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>

                    <div className="h-4 bg-gray-200 rounded w-4/6"></div>

                </div>



                {/* Badges */}

                <div className="flex gap-3">

                    <div className="h-10 w-32 bg-gray-200 rounded-full"></div>

                    <div className="h-10 w-32 bg-gray-200 rounded-full"></div>

                </div>




                {/* Info Cards */}

                <div className="grid md:grid-cols-3 gap-5">


                    {
                        [1, 2, 3].map((item) => (

                            <div
                                key={item}
                                className="h-24 bg-gray-200 rounded-2xl"
                            />

                        ))
                    }


                </div>





                {/* Description Section */}

                <div className="space-y-3 mt-10">

                    <div className="h-8 bg-gray-200 rounded w-40"></div>

                    <div className="h-4 bg-gray-200 rounded"></div>

                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>

                </div>





                {/* Ingredients */}

                <div className="mt-10">

                    <div className="h-8 bg-gray-200 rounded w-48 mb-5"></div>


                    <div className="grid md:grid-cols-2 gap-4">


                        {
                            [1, 2, 3, 4].map((item) => (

                                <div
                                    key={item}
                                    className="h-16 bg-gray-200 rounded-xl"
                                />

                            ))
                        }


                    </div>


                </div>





                {/* Instructions */}

                <div className="mt-10 space-y-5">


                    <div className="h-8 bg-gray-200 rounded w-56"></div>


                    {
                        [1, 2, 3, 4].map((item) => (

                            <div
                                key={item}
                                className="flex gap-4"
                            >

                                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>


                                <div className="h-5 bg-gray-200 rounded flex-1"></div>


                            </div>

                        ))
                    }


                </div>





                {/* Buttons */}

                <div className="flex gap-4 mt-10">


                    <div className="h-12 w-40 bg-gray-200 rounded-xl"></div>


                    <div className="h-12 w-40 bg-gray-200 rounded-xl"></div>


                </div>



            </div>


        </div>

    );

};


export default AIRecipeSkeleton;