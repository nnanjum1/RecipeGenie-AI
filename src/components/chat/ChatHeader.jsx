"use client";

import { Sparkles, Trash2 } from "lucide-react";

export default function ChatHeader({ onClear }) {
    return (
        <div className="sticky top-0 z-10 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 backdrop-blur-xl">

            <div className="flex items-center justify-between px-6 py-5">

                <div className="flex items-center gap-4">

                    <div
                        className="
                        h-14
                        w-14
                        rounded-2xl
                        bg-white/20
                        backdrop-blur-md
                        flex
                        items-center
                        justify-center
                        shadow-lg
                    "
                    >
                        <Sparkles className="text-white" size={28} />
                    </div>

                    <div>

                        <h1 className="text-2xl font-bold tracking-tight text-white">
                            Recipe Genie AI
                        </h1>

                        <p className="text-orange-100 text-sm">
                            Your intelligent cooking companion
                        </p>

                    </div>

                </div>

                <button
                    onClick={onClear}
                    className="
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-white/15
                    hover:bg-white/25
                    transition-all
                    duration-300
                    px-4
                    py-3
                    text-white
                "
                >
                    <Trash2 size={18} />
                    <span className="hidden md:block">
                        Clear Chat
                    </span>
                </button>

            </div>

        </div>
    );
}