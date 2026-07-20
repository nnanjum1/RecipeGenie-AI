"use client";

import { Bot, User, Copy, Check } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ChatMessage({ message }) {
    const isUser = message.role === "user";

    const [copied, setCopied] = useState(false);

    const copyMessage = async () => {
        try {
            await navigator.clipboard.writeText(message.content);

            setCopied(true);

            toast.success("Copied");

            setTimeout(() => {
                setCopied(false);
            }, 1500);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div
            className={`flex gap-4 ${isUser ? "justify-end" : "justify-start"
                }`}
        >
            {/* AI Avatar */}

            {!isUser && (
                <div
                    className="
                        h-11
                        w-11
                        shrink-0
                        rounded-2xl
                        bg-gradient-to-br
                        from-orange-500
                        to-amber-500
                        flex
                        items-center
                        justify-center
                        text-white
                        shadow-lg
                    "
                >
                    <Bot size={20} />
                </div>
            )}

            {/* Message */}

            <div
                className={`
                    relative
                    group
                    max-w-[85%]
                    rounded-3xl
                    px-6
                    py-4
                    leading-8
                    whitespace-pre-wrap
                    break-words
                    transition-all
                    duration-300

                    ${isUser
                        ? `
                        bg-gradient-to-r
                        from-orange-500
                        to-amber-500
                        text-white
                        rounded-br-md
                        shadow-lg
                    `
                        : `
                        bg-white
                        text-gray-700
                        rounded-bl-md
                        border
                        border-gray-100
                        shadow-md
                    `
                    }
                `}
            >
                <div className="text-[15px]">{message.content}</div>

                {/* Copy button for AI */}

                {!isUser && (
                    <button
                        onClick={copyMessage}
                        className="
                            absolute
                            -top-3
                            right-3
                            opacity-0
                            group-hover:opacity-100
                            transition
                            bg-white
                            border
                            shadow-md
                            rounded-lg
                            p-2
                            hover:bg-orange-50
                        "
                    >
                        {copied ? (
                            <Check
                                size={16}
                                className="text-green-600"
                            />
                        ) : (
                            <Copy
                                size={16}
                                className="text-gray-600"
                            />
                        )}
                    </button>
                )}
            </div>

            {/* User Avatar */}

            {isUser && (
                <div
                    className="
                        h-11
                        w-11
                        shrink-0
                        rounded-2xl
                        bg-gray-900
                        flex
                        items-center
                        justify-center
                        text-white
                        shadow-lg
                    "
                >
                    <User size={20} />
                </div>
            )}
        </div>
    );
}