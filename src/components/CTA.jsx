"use client";


import Link from "next/link";


export default function CTA() {


    return (

        <section className="max-w-6xl mx-auto px-5 py-16">


            <div className="bg-orange-500 rounded-3xl p-10 text-center text-white">


                <h2 className="text-4xl font-bold">

                    Ready To Create Your Next Recipe?

                </h2>


                <p className="mt-4 text-orange-100">

                    Let AI become your personal cooking assistant.

                </p>


                <Link
                    href="/ai-generator"
                    className="inline-block mt-8 bg-white text-orange-500 px-8 py-3 rounded-xl font-semibold hover:bg-orange-100"
                >

                    Generate Recipe

                </Link>


            </div>


        </section>

    );

}