"use client";


import {
    Mail,
    Phone,
    MapPin,
    Send
} from "lucide-react";

import { useState } from "react";
import toast from "react-hot-toast";



export default function ContactPage() {


    const [form, setForm] = useState({

        name: "",
        email: "",
        message: ""

    });



    const handleChange = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };



    const handleSubmit = (e) => {

        e.preventDefault();


        toast.success(
            "Message sent successfully!"
        );


        setForm({

            name: "",
            email: "",
            message: ""

        });


    };



    return (


        <div className="max-w-6xl mx-auto px-5 py-12">



            <div className="text-center">


                <h1 className="text-4xl md:text-5xl font-bold text-orange-500">

                    Contact Us

                </h1>


                <p className="text-gray-600 mt-4">

                    Have questions or suggestions?
                    We would love to hear from you.

                </p>


            </div>






            <div className="grid md:grid-cols-2 gap-10 mt-12">



                {/* Information */}


                <div className="space-y-6">


                    <div className="bg-orange-50 rounded-3xl p-6 flex gap-5">

                        <Mail className="text-orange-500" />

                        <div>

                            <h3 className="font-bold">
                                Email
                            </h3>

                            <p className="text-gray-600">
                                support@recipegenie.com
                            </p>

                        </div>

                    </div>





                    <div className="bg-orange-50 rounded-3xl p-6 flex gap-5">

                        <Phone className="text-orange-500" />

                        <div>

                            <h3 className="font-bold">
                                Phone
                            </h3>

                            <p className="text-gray-600">
                                +880 1234 567890
                            </p>

                        </div>

                    </div>






                    <div className="bg-orange-50 rounded-3xl p-6 flex gap-5">

                        <MapPin className="text-orange-500" />

                        <div>

                            <h3 className="font-bold">
                                Location
                            </h3>

                            <p className="text-gray-600">
                                Bangladesh
                            </p>

                        </div>

                    </div>



                </div>








                {/* Form */}


                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-xl rounded-3xl p-8 space-y-5 border border-orange-100"
                >


                    <input

                        name="name"

                        value={form.name}

                        onChange={handleChange}

                        placeholder="Your Name"

                        className="w-full border rounded-xl p-4 outline-none focus:border-orange-500"

                        required

                    />



                    <input

                        name="email"

                        type="email"

                        value={form.email}

                        onChange={handleChange}

                        placeholder="Your Email"

                        className="w-full border rounded-xl p-4 outline-none focus:border-orange-500"

                        required

                    />




                    <textarea

                        name="message"

                        rows="5"

                        value={form.message}

                        onChange={handleChange}

                        placeholder="Your Message"

                        className="w-full border rounded-xl p-4 outline-none focus:border-orange-500"

                        required

                    />





                    <button

                        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-semibold flex justify-center items-center gap-2"

                    >

                        <Send size={18} />

                        Send Message

                    </button>




                </form>



            </div>



        </div>


    );


}