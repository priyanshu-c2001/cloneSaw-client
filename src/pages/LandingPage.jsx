import Hero from "../components/Hero";
import About from "../components/About";
import Work from "../components/Work";

const LandingPage = () => {
    return (
        <div>
            <Hero />
            <section id="about">
                <About />
            </section>
            <section id="work">
                <Work />
            </section>
        </div>
    );
};


export default LandingPage;