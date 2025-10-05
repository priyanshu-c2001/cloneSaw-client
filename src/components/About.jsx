import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    useEffect(() => {
        var textContainer = document.getElementById("text");
        if (!textContainer) return;

        var bulletPoints = textContainer.querySelectorAll("div");

        bulletPoints.forEach((bulletPoint) => {
            var txtcon = bulletPoint.textContent;
            var splittxt = txtcon.split("");
            var clutter = "";
            splittxt.forEach((e) => {
                if (e === " ") {
                    clutter += `<span>&nbsp;</span>`;
                } else {
                    clutter += `<span>${e}</span>`;
                }
            });
            bulletPoint.innerHTML = clutter;
        });

        var elem = document.querySelectorAll("#text div span");
        elem.forEach((e) => {
            e.style.display = "inline-block";
            e.style.lineHeight = "1";
            e.style.paddingTop = "5px";
        });

        gsap.from("#text div span", {
            y: 40,
            opacity: 0,
            duration: 1,
            stagger: 0.05,
            scrollTrigger: {
                trigger: "#txt-container",
                start: "top 50%",
                end: "bottom 60%",
                scrub: 2,
                ease: "circ.out",
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.vars.trigger === "#txt-container") {
                    trigger.kill();
                }
            });
        };
    }, []);

    return (
        <div
            id="txt-container"
            className="flex justify-center w-full bg-black overflow-x-hidden pt-16 pb-32 md:py-48"
        >
            <div className="w-[90vw] md:w-3/4 lg:w-2/3 mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold mb-12 text-white text-center ">About Us?</h1>
                <div id="text" className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-white space-y-8">
                    <div className="text-[#006400]">
                        → Reveal insights that lead to demand.
                    </div>
                    <div>
                        → Approachable, direct and transparent communication.
                    </div>
                    <div className="text-[#006400]">
                        → Creative and pragmatic solutions.
                    </div>
                    <div>
                        → Track record of success.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;