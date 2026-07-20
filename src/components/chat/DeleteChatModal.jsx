"use client";

const DeleteChatModal = ({
    isOpen,
    onClose,
    onConfirm,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">

                <h2 className="text-2xl font-bold text-gray-800">
                    Clear Conversation?
                </h2>

                <p className="mt-3 text-gray-600">
                    This will permanently delete your chat history.
                    This action cannot be undone.
                </p>

                <div className="mt-8 flex justify-end gap-3">

                    <button
                        onClick={onClose}
                        className="rounded-xl border px-5 py-2 hover:bg-gray-100"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="rounded-xl bg-red-500 px-5 py-2 text-white hover:bg-red-600"
                    >
                        Delete
                    </button>

                </div>

            </div>
        </div>
    );
};

export default DeleteChatModal;