"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }) {

    useEffect(() => {
        console.error(error);
    }, [error]);


    return (

        <div className="min-h-screen flex items-center justify-center bg-orange-50 px-5">

            <div className="bg-white shadow-xl rounded-3xl p-10 text-center max-w-md">

                <h1 className="text-6xl font-bold text-orange-500">
                    Oops!
                </h1>


                <h2 className="text-2xl font-semibold mt-5">
                    Something went wrong
                </h2>


                <p className="text-gray-600 mt-4">
                    We couldn't load this page. Please try again.
                </p>


                <div className="flex gap-4 justify-center mt-8">


                    <button
                        onClick={() => reset()}
                        className="
                        bg-orange-500 
                        text-white 
                        px-6 py-3 
                        rounded-xl
                        hover:bg-orange-600
                        "
                    >
                        Try Again
                    </button>


                    <Link
                        href="/"
                        className="
                        border 
                        px-6 py-3 
                        rounded-xl
                        hover:bg-gray-100
                        "
                    >
                        Go Home
                    </Link>


                </div>


            </div>


        </div>

    );
}