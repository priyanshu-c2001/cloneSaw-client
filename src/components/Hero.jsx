import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
    const videoRef = useRef(null);
    const heroSectionRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: heroSectionRef,
        offset: ['start start', 'center start']
    });

    const width = useTransform(scrollYProgress, [0, 1], ['85vw', '105vw']);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(error => {
                console.log("Autoplay prevented:", error);
            });
        }
    }, []);

    const taglineVariants = {
        hidden: { y: 100, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15,
                delay: 0.5,
                duration: 1
            }
        },
    };

    return (
        <section
            ref={heroSectionRef}
            className="relative w-full bg-black flex flex-col items-center justify-start 
               pt-28 md:pt-56 md:min-h-screen" 
        >
            <div className="relative z-10 px-4 sm:px-6 md:px-0 mb-8 md:mb-8"> 
                <motion.h1
                    className="text-white 
                               text-4xl sm:text-5xl md:text-5xl lg:text-7xl xl:text-[7rem]
                               leading-snug sm:leading-tight md:leading-tight 
                               font-serif font-medium // Changed font style
                               text-center md:text-left 
                               md:mr-72"
                    variants={taglineVariants}
                    initial="hidden"
                    animate="visible"
                >
                    Design & build what
                    <br />
                    others only imagine
                </motion.h1>
            </div>

            <motion.div
                style={{ width }}
                className="relative z-0 w-[98vw] sm:w-[90vw] mx-auto overflow-hidden rounded-lg h-[50vh] lg:h-[110vh]"
            >
                <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    loop
                    muted
                    playsInline
                    src="https://res.cloudinary.com/dof7yblai/video/upload/v1744090163/diving_d295is.mp4"
                />
            </motion.div>
        </section>
    );
};

export default Hero;