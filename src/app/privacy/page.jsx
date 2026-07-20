const PrivacyPage = () => {
    return (
        <div className="min-h-screen bg-orange-50 py-16 px-5">

            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8 md:p-12">

                <h1 className="text-4xl font-bold text-orange-500 mb-6">
                    Privacy Policy
                </h1>


                <p className="text-gray-600 leading-8 mb-6">
                    At RecipeGenie, we respect your privacy and are committed
                    to protecting your personal information. This Privacy
                    Policy explains how we collect, use, and protect your data
                    while using our AI-powered recipe platform.
                </p>


                <section className="space-y-6">


                    <div>
                        <h2 className="text-2xl font-semibold">
                            Information We Collect
                        </h2>

                        <p className="text-gray-600 mt-2 leading-7">
                            We may collect information such as your name,
                            email address, profile information, saved recipes,
                            reviews, and interactions with RecipeGenie.
                        </p>
                    </div>



                    <div>
                        <h2 className="text-2xl font-semibold">
                            How We Use Your Information
                        </h2>

                        <p className="text-gray-600 mt-2 leading-7">
                            Your information helps us provide personalized
                            recipe recommendations, improve our AI-generated
                            recipes, maintain your account, and enhance user
                            experience.
                        </p>
                    </div>



                    <div>
                        <h2 className="text-2xl font-semibold">
                            Data Protection
                        </h2>

                        <p className="text-gray-600 mt-2 leading-7">
                            We take reasonable security measures to protect
                            your personal information from unauthorized access,
                            modification, or disclosure.
                        </p>
                    </div>



                    <div>
                        <h2 className="text-2xl font-semibold">
                            Third Party Services
                        </h2>

                        <p className="text-gray-600 mt-2 leading-7">
                            RecipeGenie may use third-party services such as
                            authentication providers, image hosting services,
                            and AI services to provide better functionality.
                        </p>
                    </div>



                    <div>
                        <h2 className="text-2xl font-semibold">
                            Your Rights
                        </h2>

                        <p className="text-gray-600 mt-2 leading-7">
                            You can update your profile information, manage
                            your saved recipes, and request removal of your
                            personal information.
                        </p>
                    </div>



                    <div>
                        <h2 className="text-2xl font-semibold">
                            Contact Us
                        </h2>

                        <p className="text-gray-600 mt-2 leading-7">
                            If you have any questions regarding this Privacy
                            Policy, please contact RecipeGenie support.
                        </p>
                    </div>


                </section>


            </div>

        </div>
    );
};


export default PrivacyPage;