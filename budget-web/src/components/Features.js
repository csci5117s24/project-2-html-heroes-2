import FeatureItem from "./FeatureItem";

// https://www.hyperui.dev/components/marketing/sections
function Features() {
    return (
        <>

            <section class="text-white text-black">
                <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                    <div class="mx-auto max-w-lg text-center">
                    <h2 class="text-3xl font-bold sm:text-4xl">Kickstart your marketing</h2>

                    <p class="mt-4 text-slate-500">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur aliquam doloribus
                        nesciunt eos fugiat. Vitae aperiam fugit consequuntur saepe laborum.
                    </p>
                    </div>

                    <div class="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <FeatureItem />
                        <FeatureItem />
                        <FeatureItem />
                        <FeatureItem />
                        <FeatureItem />
                        <FeatureItem />
                    </div>

                    <div class="mt-12 text-center">
                    <a
                        href="/"
                        class="inline-block rounded bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-pink-700 focus:outline-none focus:ring focus:ring-yellow-400"
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