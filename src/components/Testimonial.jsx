"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";

export default function Testimonials() {

    const [reviews, setReviews] = useState([]);

    const [loading, setLoading] = useState(true);



    useEffect(() => {

        const fetchReviews = async () => {

            try {

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/reviews`
                );


                const data = await res.json();


                setReviews(data);


            }
            catch (error) {

                console.log(
                    "Failed to load reviews",
                    error
                );

            }
            finally {

                setLoading(false);

            }

        };


        fetchReviews();


    }, []);




    if (loading) {

        return (

            <section className="max-w-6xl mx-auto px-5 py-16">

                <p className="text-center">
                    Loading testimonials...
                </p>

            </section>

        );

    }



    return (

        <section className="max-w-6xl mx-auto px-5 py-16">


            <h2 className="
                text-4xl 
                font-bold 
                text-center 
                text-orange-500 
                mb-10
            ">

                Testimonials

            </h2>



            {
                reviews.length === 0 ? (

                    <p className="text-center text-gray-500">

                        No reviews yet. Be the first to share your experience!

                    </p>

                ) : (


                    <div className="
                        grid 
                        md:grid-cols-3 
                        gap-6
                    ">


                        {
                            reviews.map((item) => (


                                <div

                                    key={item._id}

                                    className="
                                    bg-white 
                                    shadow-lg 
                                    rounded-3xl 
                                    p-7 
                                    border 
                                    border-orange-100
                                    "

                                >


                                    <p className="
                                        text-gray-600 
                                        leading-7
                                    ">

                                        "{item.review}"

                                    </p>



                                    <div className="flex mt-5">

                                        {
                                            Array.from({
                                                length: item.rating
                                            }).map((_, index) => (

                                                <Star

                                                    key={index}

                                                    size={18}

                                                    className="
                                                    fill-orange-500 
                                                    text-orange-500
                                                    "

                                                />

                                            ))
                                        }

                                    </div>



                                    <h3 className="
                                        font-bold 
                                        mt-5
                                    ">

                                        {item.name}

                                    </h3>



                                </div>


                            ))
                        }


                    </div>

                )
            }



        </section>

    );

}