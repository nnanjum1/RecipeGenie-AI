const Button = ({ children, ...props }) => {
    return (
        <button
            {...props}
            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg transition duration-300 cursor-pointer"
        >
            {children}
        </button>
    );
};

export default Button;