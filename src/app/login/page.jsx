"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const LoginPage = () => {

    const router = useRouter();

    const { data: session, isPending } = authClient.useSession();


    useEffect(() => {

        if (!isPending && session) {
            router.replace("/");
        }

    }, [session, isPending, router]);

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            setLoading(true);

            const result = await authClient.signIn.email({
                email: data.email,
                password: data.password,
            });

            if (result.error) {
                toast.error(result.error.message || "Login failed");
                return;
            }

            toast.success("Login Successful");

            router.push("/");
            router.refresh();
        } catch (error) {
            toast.error("Something went wrong");
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        });
    };

    const handleDemoLogin = () => {
        setValue("email", "demo@recipegenie.ai");
        setValue("password", "Demo@123");
    };
    if (isPending) {
        return <p>Loading...</p>;
    }

    if (session) {
        return null;
    }


    return (
        <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-md bg-white shadow-xl rounded-3xl p-8">

                <div className="text-center">

                    <h1 className="text-4xl font-bold text-orange-500">
                        Welcome Back
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Login to your RecipeGenie AI account
                    </p>

                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-8 space-y-5"
                >

                    {/* Email */}

                    <div>

                        <label className="font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full mt-2 border rounded-xl p-3 outline-none focus:border-orange-500"
                            {...register("email", {
                                required: "Email is required",
                            })}
                        />

                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}

                    </div>

                    {/* Password */}

                    <div>

                        <label className="font-medium">
                            Password
                        </label>

                        <div className="relative mt-2">

                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter password"
                                className="w-full border rounded-xl p-3 outline-none focus:border-orange-500"
                                {...register("password", {
                                    required: "Password is required",
                                })}
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                                className="absolute right-4 top-4"
                            >
                                {showPassword ? (
                                    <FaEyeSlash />
                                ) : (
                                    <FaEye />
                                )}
                            </button>

                        </div>

                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}

                    </div>

                    {/* Login */}

                    <button
                        disabled={loading}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl transition cursor-pointer disabled:opacity-50"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

                {/* Demo */}

                <button
                    onClick={handleDemoLogin}
                    className="w-full mt-4 border border-orange-500 text-orange-500 py-3 rounded-xl hover:bg-orange-50 transition cursor-pointer"
                >
                    Demo Login
                </button>

                {/* Divider */}

                <div className="flex items-center gap-3 my-6">

                    <div className="flex-1 border-t"></div>

                    <span className="text-gray-500 text-sm">
                        OR
                    </span>

                    <div className="flex-1 border-t"></div>

                </div>

                {/* Google */}

                <button
                    onClick={handleGoogleLogin}
                    className="w-full border py-3 rounded-xl flex justify-center items-center gap-3 hover:bg-gray-50 transition cursor-pointer"
                >
                    <FcGoogle size={24} />

                    Continue with Google
                </button>

                {/* Register */}

                <p className="text-center mt-8 text-gray-500">

                    Don't have an account?

                    <Link
                        href="/register"
                        className="text-orange-500 font-semibold ml-2"
                    >
                        Register
                    </Link>

                </p>

            </div>
        </div>
    );
};

export default LoginPage;