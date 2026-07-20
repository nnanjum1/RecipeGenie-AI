"use client";

import { useEffect, useRef, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { Bot, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import EmptyState from "@/components/chat/EmptyState";
import TypingIndicator from "@/components/chat/TypingIndicator";
import ChatMessage from "@/components/chat/ChatMessage";
import ChatInput from "@/components/chat/ChatInput";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ChatPage() {
    const { data: session, isPending } = authClient.useSession();

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const chatEndRef = useRef(null);

    useEffect(() => {
        if (session?.user?.email) {
            loadChat();
        }
    }, [session]);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages, loading]);

    const loadChat = async () => {
        try {
            const res = await fetch(
                `${API_URL}/chat-history/${encodeURIComponent(
                    session.user.email
                )}`
            );

            const data = await res.json();

            setMessages(data.messages || []);
        } catch (error) {
            console.log(error);
        }
    };

    const sendMessage = async () => {
        if (!input.trim() || loading) return;

        const currentMessage = input;

        setMessages((prev) => [
            ...prev,
            {
                role: "user",
                content: currentMessage,
            },
        ]);

        setInput("");
        setLoading(true);

        try {
            const res = await fetch(`${API_URL}/chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userEmail: session.user.email,
                    message: currentMessage,
                }),
            });

            const data = await res.json();

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: data.answer,
                },
            ]);
        } catch (error) {
            console.log(error);
            toast.error("AI response failed");
        } finally {
            setLoading(false);
        }
    };

    const clearChat = async () => {
        try {
            await fetch(
                `${API_URL}/chat-history/${encodeURIComponent(
                    session.user.email
                )}`,
                {
                    method: "DELETE",
                }
            );

            setMessages([]);

            toast.success("Conversation cleared");
        } catch (error) {
            console.log(error);
        }
    };

    if (isPending) {
        return (
            <div className="py-20 text-center">
                Loading...
            </div>
        );
    }

    if (!session) {
        redirect("/login");
    }

    return (
        <div className="mx-auto max-w-5xl px-5 py-10">
            <div className="overflow-hidden rounded-3xl border bg-white shadow-xl">

                {/* Header */}

                <div className="flex items-center justify-between bg-orange-500 p-6 text-white">

                    <div className="flex items-center gap-4">

                        <div className="rounded-2xl bg-white/20 p-3">
                            <Bot size={28} />
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold">
                                Recipe Genie AI
                            </h1>

                            <p className="text-orange-100">
                                Your personal cooking assistant
                            </p>
                        </div>

                    </div>

                    <button
                        onClick={clearChat}
                        className="rounded-xl bg-white p-3 text-orange-500 transition hover:bg-orange-100"
                    >
                        <Trash2 size={20} />
                    </button>

                </div>

                {/* Chat Area */}

                <div className="h-[550px] space-y-5 overflow-y-auto bg-orange-50 p-5 md:p-8">

                    {messages.length === 0 ? (
                        <EmptyState
                            onSuggestion={(text) => setInput(text)}
                        />
                    ) : (
                        messages.map((message, index) => (
                            <ChatMessage
                                key={index}
                                message={message}
                            />
                        ))
                    )}

                    {loading && <TypingIndicator />}

                    <div ref={chatEndRef} />

                </div>

                {/* Input */}

                <ChatInput
                    input={input}
                    setInput={setInput}
                    sendMessage={sendMessage}
                    loading={loading}
                />

            </div>
        </div>
    );
}