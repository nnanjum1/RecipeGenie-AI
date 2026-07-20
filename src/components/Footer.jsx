"use client";

import Link from "next/link";

import {
    ChefHat,
    Mail,
    MapPin,
    Phone
} from "lucide-react";

import {
    FaFacebook,
    FaInstagram,
    FaTwitter
} from "react-icons/fa";


export default function Footer() {


    return (

        <footer className="bg-orange-200 text-gray-800 mt-20">


            <div className="max-w-6xl mx-auto px-5 py-12">


                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 text-center md:text-left">



                    {/* Brand */}

                    <div>


                        <div className="flex items-center justify-center md:justify-start gap-2">


                            <div className="bg-orange-500 text-white p-2 rounded-xl">

                                <ChefHat size={24} />

                            </div>


                            <h2 className="text-2xl font-bold text-orange-700">

                                Recipe Genie

                            </h2>


                        </div>




                        <p className="text-gray-700 mt-4 leading-7">

                            Your AI-powered cooking assistant that helps you
                            discover, create, and save delicious recipes.

                        </p>


                    </div>









                    {/* Quick Links */}


                    <div>


                        <h3 className="font-bold text-lg mb-5 text-orange-800">

                            Quick Links

                        </h3>


                        <ul className="space-y-3 text-gray-700">


                            <li>

                                <Link
                                    href="/"
                                    className="hover:text-orange-700 transition"
                                >
                                    Home
                                </Link>

                            </li>



                            <li>

                                <Link
                                    href="/recipes"
                                    className="hover:text-orange-700 transition"
                                >
                                    Explore Recipes
                                </Link>

                            </li>



                            <li>

                                <Link
                                    href="/ai-generator"
                                    className="hover:text-orange-700 transition"
                                >
                                    AI Generator
                                </Link>

                            </li>



                            <li>

                                <Link
                                    href="/about"
                                    className="hover:text-orange-700 transition"
                                >
                                    About
                                </Link>

                            </li>



                            <li>

                                <Link
                                    href="/contact"
                                    className="hover:text-orange-700 transition"
                                >
                                    Contact
                                </Link>

                            </li>


                        </ul>


                    </div>









                    {/* Support */}


                    <div>


                        <h3 className="font-bold text-lg mb-5 text-orange-800">

                            Support

                        </h3>



                        <ul className="space-y-3 text-gray-700">


                            <li>

                                <Link
                                    href="/help"
                                    className="hover:text-orange-700 transition"
                                >
                                    Help Center
                                </Link>

                            </li>



                            <li>

                                <Link
                                    href="/privacy"
                                    className="hover:text-orange-700 transition"
                                >
                                    Privacy Policy
                                </Link>

                            </li>




                            <li>

                                <Link
                                    href="/terms"
                                    className="hover:text-orange-700 transition"
                                >
                                    Terms & Conditions
                                </Link>

                            </li>


                        </ul>


                    </div>









                    {/* Contact */}


                    <div>


                        <h3 className="font-bold text-lg mb-5 text-orange-800">

                            Contact

                        </h3>



                        <div className="space-y-4 text-gray-700 flex flex-col items-center md:items-start">



                            <div className="flex gap-3 items-center">

                                <Mail
                                    size={18}
                                    className="text-orange-700"
                                />

                                <span>
                                    support@recipegenie.com
                                </span>


                            </div>





                            <div className="flex gap-3 items-center">

                                <Phone
                                    size={18}
                                    className="text-orange-700"
                                />

                                <span>
                                    +880 1234 567890
                                </span>


                            </div>





                            <div className="flex gap-3 items-center">

                                <MapPin
                                    size={18}
                                    className="text-orange-700"
                                />

                                <span>
                                    Bangladesh
                                </span>


                            </div>



                        </div>



                    </div>





                </div>









                {/* Bottom */}


                <div className="border-t border-orange-300 mt-10 pt-6 flex flex-col md:flex-row justify-center md:justify-between items-center gap-5 text-center">



                    <p className="text-gray-700 text-sm">

                        © {new Date().getFullYear()} Recipe Genie.
                        All rights reserved.

                    </p>






                    <div className="flex gap-4">


                        <a
                            href="#"
                            className="bg-white p-3 rounded-full text-orange-600 hover:bg-orange-300 transition"
                        >

                            <FaFacebook size={18} />

                        </a>



                        <a
                            href="#"
                            className="bg-white p-3 rounded-full text-orange-600 hover:bg-orange-300 transition"
                        >

                            <FaInstagram size={18} />

                        </a>




                        <a
                            href="#"
                            className="bg-white p-3 rounded-full text-orange-600 hover:bg-orange-300 transition"
                        >

                            <FaTwitter size={18} />

                        </a>


                    </div>



                </div>




            </div>



        </footer>

    );

}