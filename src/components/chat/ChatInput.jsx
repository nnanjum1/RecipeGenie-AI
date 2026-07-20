"use client";

import { useEffect, useRef } from "react";
import { SendHorizonal, Sparkles } from "lucide-react";

export default function ChatInput({
    input,
    setInput,
    sendMessage,
    loading,
}) {
    const textareaRef = useRef(null);

    useEffect(() => {
        if (!textareaRef.current) return;

        textareaRef.current.style.height = "0px";
        textareaRef.current.style.height =
            textareaRef.current.scrollHeight + "px";
    }, [input]);

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();

            if (!loading) {
                sendMessage();
            }
        }
    };

    return (
        <div className="border-t border-orange-100 bg-white/80 backdrop-blur-xl p-5">

            <div
                className="
                    flex
                    items-end
                    gap-3
                    rounded-3xl
                    border
                    border-orange-200
                    bg-white
                    p-3
                    shadow-lg
                    transition
                    focus-within:border-orange-500
                    focus-within:ring-4
                    focus-within:ring-orange-100
                "
            >
                {/* AI Icon */}

                <div
                    className="
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-2xl
                        bg-orange-100
                        text-orange-600
                    "
                >
                    <Sparkles size={20} />
                </div>

                {/* Textarea */}

                <textarea
                    ref={textareaRef}
                    rows={1}
                    value={input}
                    disabled={loading}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask Recipe Genie anything..."
                    className="
                        max-h-44
                        min-h-[28px]
                        flex-1
                        resize-none
                        bg-transparent
                        outline-none
                        text-gray-700
                        placeholder:text-gray-400
                        leading-7
                    "
                />

                {/* Send Button */}

                <button
                    disabled={!input.trim() || loading}
                    onClick={sendMessage}
                    className="
                        flex
                        h-12
                        w-12
                        shrink-0
                        items-center
                        justify-center
                        rounded-2xl
                        bg-gradient-to-r
                        from-orange-500
                        to-amber-500
                        text-white
                        shadow-lg
                        transition-all
                        duration-300
                        hover:scale-105
                        hover:shadow-xl
                        disabled:cursor-not-allowed
                        disabled:opacity-40
                    "
                >
                    <SendHorizonal size={20} />
                </button>
            </div>

            <p className="mt-3 text-center text-xs text-gray-400">
                Press <span className="font-semibold">Enter</span> to send •{" "}
                <span className="font-semibold">Shift + Enter</span> for a new line
            </p>
        </div>
    );
}