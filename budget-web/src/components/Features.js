import FeatureItem from "./FeatureItem";

// https://www.hyperui.dev/components/marketing/sections
function Features() {
    return (
        <>

            <section className="text-gray text-black">
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                    <div className="mx-auto max-w-lg text-center">
                    <h2 className="text-3xl font-bold sm:text-4xl">See What We Have to Offer</h2>

                    <p className="mt-4 text-slate-500">
                        The budget tracker has extensive features to help you manage your finances.
                    </p>
                    </div>

                    <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <FeatureItem title={"Custom Budget"} description={"Ability to customize the monthly spending."} />
                        <FeatureItem title={"Advanced Analytics"} description={"Track spending habits over the course of time."} />
                        <FeatureItem title={"Transaction Tracking"} description={"Add any transaction and its cooresponding category."} />
                        <FeatureItem title={"Receipt Scanning"} description={"Scan information from receipts. "} />
                        <FeatureItem title={"Secure Tracking"} description={"Fully secure frontend and backend with user authentication."}/>
                        <FeatureItem title={"Customizable Section"} description={"Manage different categories to keep your transactions sorted."}/>
                    </div>

                    <div className="mt-12 text-center">
                    <a
                        href="/.auth/login/github"
                        className="inline-block rounded bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring focus:ring-yellow-400"
                    >
                        Get Started Today
                    </a>
                    </div>
                </div>
            </section>



        </>
    )
}

export default Features;