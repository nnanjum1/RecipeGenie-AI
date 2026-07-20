import Link from "next/link";


export default function NotFound() {

    return (

        <div className="min-h-screen flex items-center justify-center bg-orange-50">

            <div className="text-center">

                <h1 className="text-7xl font-bold text-orange-500">
                    404
                </h1>

                <p className="text-xl mt-4">
                    Recipe not found 🍲
                </p>


                <Link
                    href="/"
                    className="
                    inline-block mt-6
                    bg-orange-500
                    text-white
                    px-6 py-3
                    rounded-xl
                    "
                >
                    Back Home
                </Link>

            </div>

        </div>

    );
}