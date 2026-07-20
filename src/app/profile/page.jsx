"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";


const ProfilePage = () => {

    const router = useRouter();

    const { data: session, isPending } = authClient.useSession();

    const [review, setReview] = useState("");

    const [rating, setRating] = useState(5);



    useEffect(() => {

        if (!isPending && !session) {
            router.replace("/login");
        }

    }, [session, isPending, router]);



    const submitReview = async () => {


        if (!session?.user) {
            toast.error("Please login first");
            return;
        }


        if (!review.trim()) {

            toast.error("Please write your review");

            return;

        }


        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/reviews`,
            {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    name: session.user.name,

                    email: session.user.email,

                    review,

                    rating: Number(rating)

                })

            }
        );


        if (response.ok) {

            toast.success(
                "Thanks for your review!"
            );

            setReview("");

        }
        else {

            toast.error(
                "Failed to submit review"
            );

        }

    };



    if (isPending || !session) {

        return (
            <div className="min-h-screen flex items-center justify-center bg-orange-50">

                <div className="text-center">

                    <div className="
                    w-12 h-12 
                    border-4 border-orange-500 
                    border-t-transparent 
                    rounded-full 
                    animate-spin mx-auto
                    ">
                    </div>


                    <p className="mt-4 text-gray-600">
                        Loading profile...
                    </p>

                </div>

            </div>
        );

    }



    return (

        <div className="max-w-3xl mx-auto p-6">


            <div className="bg-white shadow-xl rounded-3xl p-8">


                <h1 className="text-3xl font-bold text-orange-500">
                    My Profile
                </h1>


                <div className="mt-6 space-y-3">

                    <p>
                        <strong>Name:</strong>{" "}
                        {session.user.name}
                    </p>


                    <p>
                        <strong>Email:</strong>{" "}
                        {session.user.email}
                    </p>

                </div>


            </div>


            <div className="mt-8 bg-white shadow-xl rounded-3xl p-8">


                <h2 className="text-2xl font-bold">
                    Share Your RecipeGenie Experience
                </h2>


                <textarea

                    value={review}

                    onChange={(e) => setReview(e.target.value)}

                    placeholder="Tell us how RecipeGenie helped you..."

                    rows={5}

                    className="
                    w-full mt-5 border rounded-xl
                    p-4
                    "

                />


                <div className="mt-5">

                    <label>
                        Rating:
                    </label>


                    <select

                        value={rating}

                        onChange={(e) => setRating(e.target.value)}

                        className="
                        ml-3 border rounded-lg p-2
                        "

                    >

                        <option value="5">
                            ⭐⭐⭐⭐⭐
                        </option>

                        <option value="4">
                            ⭐⭐⭐⭐
                        </option>

                        <option value="3">
                            ⭐⭐⭐
                        </option>

                        <option value="2">
                            ⭐⭐
                        </option>

                        <option value="1">
                            ⭐
                        </option>

                    </select>

                </div>



                <button

                    onClick={submitReview}

                    className="
                    mt-6 bg-orange-500
                    text-white px-8 py-3
                    rounded-xl
                    "

                >
                    Submit Review

                </button>


            </div>


        </div>

    );

};


export default ProfilePage;