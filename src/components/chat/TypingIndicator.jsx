"use client";

import { Bot } from "lucide-react";

export default function TypingIndicator() {
    return (
        <div className="flex items-end gap-3 animate-fadeIn">

            {/* AI Avatar */}

            <div
                className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gradient-to-br
                    from-orange-500
                    to-amber-500
                    text-white
                    shadow-lg
                "
            >
                <Bot size={20} />
            </div>

            {/* Bubble */}

            <div
                className="
                    rounded-3xl
                    rounded-bl-md
                    bg-white
                    px-5
                    py-4
                    shadow-md
                    border
                    border-gray-100
                "
            >

                <p className="mb-3 text-sm font-medium text-gray-500">
                    Recipe Genie is thinking...
                </p>

                <div className="flex items-center gap-2">

                    <span
                        className="
                            h-2.5
                            w-2.5
                            rounded-full
                            bg-orange-500
                            animate-bounce
                        "
                    />

                    <span
                        className="
                            h-2.5
                            w-2.5
                            rounded-full
                            bg-orange-500
                            animate-bounce
                        "
                        style={{ animationDelay: "0.2s" }}
                    />

                    <span
                        className="
                            h-2.5
                            w-2.5
                            rounded-full
                            bg-orange-500
                            animate-bounce
                        "
                        style={{ animationDelay: "0.4s" }}
                    />

                </div>

            </div>

        </div>
    );
}