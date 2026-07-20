"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Container from "./Container";
import {
    Menu,
    X,
    ChefHat,
    User,
    LogOut,
    LayoutDashboard,
    PlusCircle,
    Settings,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { RiChatAiLine } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { MdCollections } from "react-icons/md";

const Navbar = () => {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const { data: session } = authClient.useSession();
    const handleLogout = async () => {
        const result = await authClient.signOut();

        if (result.error) {
            return;
        }

        setProfileOpen(false);
        setOpen(false);
    };

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Recipes", href: "/recipes" },
        { name: "AI Generator", href: "/ai-generator" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-orange-100">
            <Container>
                <div className="flex items-center justify-between h-20">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="bg-orange-500 text-white p-2 rounded-xl">
                            <ChefHat size={24} />
                        </div>

                        <div>
                            <h2 className="font-bold text-xl text-orange-600">
                                RecipeGenie
                            </h2>

                            <p className="text-xs text-gray-500 -mt-1">
                                AI
                            </p>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`font-medium transition ${pathname === item.href
                                    ? "text-orange-500"
                                    : "text-gray-700 hover:text-orange-500"
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Auth */}
                    <div className="hidden lg:flex items-center gap-3">

                        {!session ? (
                            <>
                                <Link
                                    href="/login"
                                    className="px-5 py-2 rounded-lg border border-orange-500 text-orange-500 hover:bg-orange-50 transition"
                                >
                                    Login
                                </Link>

                                <Link
                                    href="/register"
                                    className="px-5 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition"
                                >
                                    Register
                                </Link>
                            </>
                        ) : (
                            <div className="relative">

                                <button
                                    onClick={() => setProfileOpen(!profileOpen)}
                                    className="flex items-center gap-3 cursor-pointer"
                                >

                                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">

                                        <User size={20} className="text-orange-600" />

                                    </div>

                                    <div className="text-left">

                                        <p className="font-semibold text-sm">
                                            {session.user?.name}
                                        </p>

                                        <p className="text-xs text-gray-500">
                                            {session.user?.email}
                                        </p>

                                    </div>

                                </button>

                                {profileOpen && (

                                    <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-orange-100 overflow-hidden">

                                        <Link
                                            href="/profile"
                                            onClick={() => setProfileOpen(false)}

                                            className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50"
                                        >
                                            <FaUser size={18} />
                                            Profile
                                        </Link>

                                        <Link
                                            href="/add-recipe"
                                            onClick={() => setProfileOpen(false)}

                                            className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50"
                                        >
                                            <PlusCircle size={18} />
                                            Add Recipe
                                        </Link>

                                        <Link
                                            href="/manage-recipes"
                                            onClick={() => setProfileOpen(false)}

                                            className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50"
                                        >
                                            <ChefHat size={18} />
                                            Manage Recipes
                                        </Link>

                                        <Link
                                            href="/saved-recipes"
                                            onClick={() => setProfileOpen(false)}

                                            className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50"
                                        >
                                            <MdCollections size={18} />
                                            Saved Recipes
                                        </Link>

                                        <Link
                                            href="/chat"
                                            onClick={() => setProfileOpen(false)}

                                            className="flex items-center gap-3 px-4 py-3 hover:bg-orange-50"
                                        >
                                            <RiChatAiLine size={18} />
                                            AI Chat
                                        </Link>

                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 cursor-pointer"
                                        >
                                            <LogOut size={18} />
                                            Logout
                                        </button>

                                    </div>

                                )}

                            </div>
                        )}

                    </div>

                    {/* Mobile Button */}
                    <button
                        onClick={() => setOpen(!open)}
                        className="lg:hidden"
                    >
                        {open ? (
                            <X size={28} />
                        ) : (
                            <Menu size={28} />
                        )}
                    </button>

                </div>

                {/* Mobile Menu */}
                {open && (
                    <div className="lg:hidden py-5 border-t border-orange-100">

                        <div className="flex flex-col gap-5">

                            {navLinks.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className={`font-medium ${pathname === item.href
                                        ? "text-orange-500"
                                        : "text-gray-700"
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            ))}

                            {!session ? (
                                <>
                                    <Link
                                        href="/login"
                                        className="border border-orange-500 rounded-lg py-2 text-center text-orange-500"
                                        onClick={() => setOpen(false)}
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        href="/register"
                                        className="bg-orange-500 rounded-lg py-2 text-center text-white"
                                        onClick={() => setOpen(false)}
                                    >
                                        Register
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <div className="flex items-center gap-3 border-b pb-4 mb-4">
                                        <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                                            <User className="text-orange-600" size={22} />
                                        </div>

                                        <div>
                                            <h3 className="font-semibold">
                                                {session.user?.name}
                                            </h3>

                                            <p className="text-sm text-gray-500">
                                                {session.user?.email}
                                            </p>
                                        </div>
                                    </div>

                                    <Link href="/profile" onClick={() => setOpen(false)}>
                                        Profile
                                    </Link>

                                    <Link href="/add-recipe" onClick={() => setOpen(false)}>
                                        Add Recipe
                                    </Link>

                                    <Link href="/manage-recipes" onClick={() => setOpen(false)}>
                                        Manage Recipes
                                    </Link>
                                    <Link href="/saved-recipes" onClick={() => setOpen(false)}>
                                        Saved Recipes
                                    </Link>
                                    <Link href="/chat" onClick={() => setOpen(false)}>
                                        AI Chat
                                    </Link>

                                    <button
                                        onClick={handleLogout}
                                        className="bg-red-500 text-white rounded-lg py-2"
                                    >
                                        Logout
                                    </button>
                                </>
                            )}

                        </div>

                    </div>
                )}

            </Container>
        </nav>
    );
};

export default Navbar;