import Features from "../components/Features";
import Hero from "../components/Hero";
import SplitImageContent from "../components/SplitImageContent";

function Landing() {
    return (
        <>
            <div className="">
                <Hero />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#111827" fill-opacity="1" d="M0,320L48,277.3C96,235,192,149,288,138.7C384,128,480,192,576,181.3C672,171,768,85,864,69.3C960,53,1056,107,1152,112C1248,117,1344,75,1392,53.3L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
                </svg>
                <Features />
                <SplitImageContent />
            </div>
        </>
    )
}

export default Landing;