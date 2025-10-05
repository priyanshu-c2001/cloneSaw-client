import CLogo from '../assets/CLogo';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
    const fadeIn = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    };

    return (
        <motion.footer
            className="bg-black text-white py-16 px-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
        >
            <div className="container mx-auto max-w-7xl">
                {/* Section is now center-aligned on mobile and left-aligned on desktop */}
                <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left pb-12 md:pb-16 border-b border-gray-700 mb-12">
                    <h2 className="text-3xl md:text-4xl font-semibold mb-8 md:mb-0">
                        Transforming vision into reality.
                    </h2>
                    {/* Button is now full-width on mobile for easier tapping */}
                    <button className="px-8 py-4 border border-white text-white text-lg font-medium rounded-full hover:bg-white hover:text-black transition-all duration-300 w-full md:w-auto">
                        <Link to="/contact">Get in touch</Link>
                    </button>
                </div>

                {/* Grid gap is reduced on mobile for better spacing */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 lg:gap-20 mb-12">
                    <div className="flex flex-col space-y-4 items-center md:items-start">
                        {/* Assuming CLogo is your component, it will be centered on mobile */}
                        <CLogo className="w-16 h-16" />
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-6">Work</h3>
                        <ul className="space-y-3 text-gray-400">
                            <li><a href="#work" className="hover:text-white transition-colors duration-200">Work</a></li>
                            <li><a href="#expertise" className="hover:text-white transition-colors duration-200">Expertise</a></li>
                            <li><a href="#latest" className="hover:text-white transition-colors duration-200">Latest</a></li>
                            <li><a href="#the-workshop" className="hover:text-white transition-colors duration-200">The Workshop</a></li>
                            <li><a href="#futures-report" className="hover:text-white transition-colors duration-200">Futures Report 2025</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-6">About</h3>
                        <ul className="space-y-3 text-gray-400">
                            <li><a href="#about" className="hover:text-white transition-colors duration-200">About</a></li>
                            <li><a href="#awards" className="hover:text-white transition-colors duration-200">Awards</a></li>
                            <li><a href="#careers" className="hover:text-white transition-colors duration-200">Careers</a></li>
                            <li><a href="#contact" className="hover:text-white transition-colors duration-200">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-6">Sign up for our newsletter</h3>
                        <div className="flex border-b border-gray-500 pb-2 mb-8">
                            <input
                                type="email"
                                placeholder="Email"
                                className="bg-transparent flex-grow outline-none text-white placeholder-gray-500 text-lg"
                            />
                            <button className="text-gray-400 hover:text-white transition-colors duration-200 text-lg">
                                Submit
                            </button>
                        </div>
                        <div className="flex space-x-6">
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.715.056.815.035 1.488.196 2.048.423.573.235.986.536 1.393.943.407.407.708.82.943 1.393.227.56.388 1.233.423 2.048.043.93.056 1.285.056 3.715s-.013 2.784-.056 3.715c-.035.815-.196 1.488-.423 2.048-.235.573-.536.986-.943 1.393-.407.407-.82.708-1.393.943-.56.227-1.233.388-2.048.423-.93.043-1.285.056-3.715.056s-2.784-.013-3.715-.056c-.815-.035-1.488-.196-2.048-.423-.573-.235-.986-.536-1.393-.943-.407-.407-.708-.82-.943-1.393-.227-.56-.388-1.233-.423-2.048-.043-.93-.056-1.285-.056-3.715s.013-2.784.056-3.715c.035-.815.196-1.488.423-2.048.235-.573.536.986.943-1.393.407-.407.82.708.943-1.393.56-.227 1.233-.388 2.048-.423.93-.043 1.285-.056 3.715-.056ZM12 4.75a7.25 7.25 0 1 0 0 14.5a7.25 7.25 0 0 0 0-14.5ZM17.25 8a1 1 0 1 1 0 2a1 1 0 0 1 0-2Zm-5 1.5a4.25 4.25 0 1 1 0 8.5a4.25 4.25 0 0 1 0-8.5Z" clipRule="evenodd" />
                                </svg>
                            </a>

                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M19 0H5a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h14a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5ZM8 19H5V8h3v11Zm-1.5-12.27A3.37 3.37 0 0 1 5 10.33V19h3V10.33a3.37 3 0 0 1-1.5-2.27Zm11.5 12.27h-3V11.2a2.36 2.36 0 0 0-.67-1.74c-.58-.58-1.27-.88-2.07-.88a4.91 4.91 0 0 0-3.5 1.5V8H8v11h3V12.18c0-.72.33-1.44 1.05-1.44.72 0 1.05.72 1.05 1.44v6.82h3V19Z" clipRule="evenodd" />
                                </svg>
                            </a>

                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M19.61 3.25C20.37 3.99 21 5.34 21 8v8c0 2.66-.63 4.01-1.39 4.75-.76.74-2.11 1.25-4.61 1.25H8c-2.5 0-3.85-.51-4.61-1.25C2.63 20.01 2 18.66 2 16V8c0-2.66.63-4.01 1.39-4.75.76-.74 2.11-1.25 4.61-1.25h8c2.5 0 3.85.51 4.61 1.25ZM10 16V8l6 4-6 4Z" clipRule="evenodd" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright section now stacks vertically on mobile */}
                <div className="text-sm text-gray-500 pt-8 border-t border-gray-700 flex flex-col md:flex-row items-center md:justify-between gap-4 text-center md:text-left">
                    <p>© 1999-2025 Clonesaw Inc.</p>
                    <a href="#privacy" className="underline hover:text-white">Privacy Policy</a>
                </div>
            </div>
        </motion.footer>
    );
};

export default Footer;