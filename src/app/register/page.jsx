"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-hot-toast";

const RegisterPage = () => {
    const router = useRouter();

    const { data: session, isPending } = authClient.useSession();

    useEffect(() => {

        if (!isPending && session) {
            router.replace("/");
        }

    }, [session, isPending, router]);




    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const password = watch("password");

    const onSubmit = async (data) => {
        try {
            setLoading(true);

            const result = await authClient.signUp.email({
                name: data.name,
                email: data.email,
                password: data.password,
            });

            if (result.error) {
                toast.error(result.error.message || "Registration failed");
                return;
            }

            toast.success("Account created successfully!");

            router.push("/");
            router.refresh();
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignUp = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        });
    };
    if (isPending) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                Loading...
            </div>
        );
    }


    if (session) {
        return null;
    }
    return (
        <div className="min-h-screen bg-orange-50 flex items-center justify-center px-4 py-10">

            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

                <div className="text-center">

                    <h1 className="text-4xl font-bold text-orange-500">
                        Create Account
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Join RecipeGenie AI today
                    </p>

                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5 mt-8"
                >

                    {/* Name */}

                    <div>

                        <label className="font-medium">
                            Full Name
                        </label>

                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="w-full mt-2 border rounded-xl p-3 outline-none focus:border-orange-500"
                            {...register("name", {
                                required: "Name is required",
                                minLength: {
                                    value: 3,
                                    message: "Minimum 3 characters",
                                },
                            })}
                        />

                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.name.message}
                            </p>
                        )}

                    </div>

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
                                pattern: {
                                    value: /^\S+@\S+\.\S+$/,
                                    message: "Enter a valid email",
                                },
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
                                    pattern: {
                                        value:
                                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/,
                                        message:
                                            "Must contain uppercase, lowercase, number & special character",
                                    },
                                })}
                            />

                            <button
                                type="button"
                                className="absolute right-4 top-4"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>

                        </div>

                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}

                    </div>

                    {/* Confirm Password */}

                    <div>

                        <label className="font-medium">
                            Confirm Password
                        </label>

                        <div className="relative mt-2">

                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm password"
                                className="w-full border rounded-xl p-3 outline-none focus:border-orange-500"
                                {...register("confirmPassword", {
                                    required: "Confirm Password is required",
                                    validate: (value) =>
                                        value === password || "Passwords do not match",
                                })}
                            />

                            <button
                                type="button"
                                className="absolute right-4 top-4"
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                            >
                                {showConfirmPassword ? (
                                    <FaEyeSlash />
                                ) : (
                                    <FaEye />
                                )}
                            </button>

                        </div>

                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.confirmPassword.message}
                            </p>
                        )}

                    </div>

                    {/* Register */}

                    <button
                        disabled={loading}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl transition disabled:opacity-50 cursor-pointer"
                    >
                        {loading ? "Creating Account..." : "Register"}
                    </button>

                </form>

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
                    onClick={handleGoogleSignUp}
                    className="w-full border py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition cursor-pointer"
                >
                    <FcGoogle size={24} />

                    Continue with Google
                </button>

                {/* Login */}

                <p className="text-center mt-8 text-gray-500">

                    Already have an account?

                    <Link
                        href="/login"
                        className="text-orange-500 font-semibold ml-2"
                    >
                        Login
                    </Link>

                </p>

            </div>

        </div>
    );
};

export default RegisterPage; 