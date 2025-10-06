import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";

const Navbar = () => {
    const [hidden, setHidden] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious();

        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    const navItems = [
        { name: "Work", link: "work", isScroll: true },
        { name: "About", link: "about", isScroll: true },
        { name: "Blogs", link: "/blogs", isScroll: false },
    ];

    return (
        <motion.nav
            variants={{
                visible: { y: 0, opacity: 1 },
                hidden: { y: -100, opacity: 0 },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-80 backdrop-blur-sm transition-colors duration-300"
        >
            <div className="container mx-auto flex h-20 items-center justify-between px-6 py-4 md:mt-4 md:px-28">
                <div className="cursor-pointer text-2xl font-bold tracking-widest text-white">
                    <RouterLink to="/">CLONESAW</RouterLink>
                </div>

                <div className="hidden items-center space-x-14 md:flex">
                    {navItems.map((item) =>
                        item.isScroll ? (
                            <ScrollLink
                                key={item.name}
                                to={item.link}
                                smooth={true}
                                duration={500}
                                offset={-80}
                                className="cursor-pointer text-base font-lg text-white hover:text-gray-400"
                            >
                                {item.name}
                            </ScrollLink>
                        ) : (
                            <RouterLink
                                key={item.name}
                                to={item.link}
                                className="text-base font-lg text-white hover:text-gray-400"
                            >
                                {item.name}
                            </RouterLink>
                        )
                    )}
                    <button className="ml-8 rounded-full border border-white px-6 py-2.5 text-sm font-large text-white transition-all duration-300 hover:bg-white hover:text-black">
                        <RouterLink to="/contact">Get in touch</RouterLink>
                    </button>
                </div>

                <div className="md:hidden">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="text-3xl text-white"
                    >
                        {menuOpen ? "✕" : "☰"}
                    </button>
                </div>
            </div>

            {menuOpen && (
                <div className="bg-black bg-opacity-90 px-6 pb-6 backdrop-blur-sm md:hidden">
                    <div className="mt-4 flex flex-col space-y-4">
                        {navItems.map((item) =>
                            item.isScroll ? (
                                <ScrollLink
                                    key={item.name}
                                    to={item.link}
                                    smooth={true}
                                    duration={500}
                                    offset={-80}
                                    className="cursor-pointer text-base font-lg text-white hover:text-gray-400"
                                    onClick={() => setMenuOpen(false)} 
                                >
                                    {item.name}
                                </ScrollLink>
                            ) : (
                                <RouterLink
                                    key={item.name}
                                    to={item.link}
                                    className="text-base font-lg text-white hover:text-gray-400"
                                    onClick={() => setMenuOpen(false)} 
                                >
                                    {item.name}
                                </RouterLink>
                            )
                        )}
                        <button className="mt-4 rounded-full border border-white px-6 py-2 text-sm text-white transition-all duration-300 hover:bg-white hover:text-black">
                            <RouterLink
                                to="/contact"
                                onClick={() => setMenuOpen(false)} 
                            >
                                Get in touch
                            </RouterLink>
                        </button>
                    </div>
                </div>
            )}
        </motion.nav>
    );
};

export default Navbar;