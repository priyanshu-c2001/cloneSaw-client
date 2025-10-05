import { useEffect, useRef, useState } from "react"
import { ExternalLink } from "lucide-react"

const Work = () => {
    const galleryRef = useRef(null)
    const sectionRef = useRef(null)
    const containerRef = useRef(null)
    const [isVisible, setIsVisible] = useState(false)
    const [galleryWidth, setGalleryWidth] = useState(0)

    const images = [
        { id: 1, title: "Mountain Serenity", description: "Breathtaking views of alpine landscapes", imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80" },
        { id: 2, title: "Urban Dreams", description: "City lights and architectural wonders", imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80" },
        { id: 3, title: "Ocean Waves", description: "Peaceful coastal scenes and azure waters", imageUrl: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&q=80" },
        { id: 4, title: "Forest Whispers", description: "Deep woods and natural tranquility", imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80" },
        { id: 5, title: "Desert Sunset", description: "Golden hour in vast sandy expanses", imageUrl: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80" },
        { id: 6, title: "Northern Lights", description: "Aurora borealis dancing in the sky", imageUrl: "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=800&q=80" },
    ]

    useEffect(() => {
        const calculateGalleryWidth = () => {
            const isMobile = window.innerWidth < 768;

            const cardWidth = isMobile ? window.innerWidth * 0.75 : 380;
            const cardMargin = isMobile ? 16 : 32;
            const paddingLeft = isMobile ? 16 : 96;

            const totalWidth = paddingLeft + (images.length * (cardWidth + cardMargin));
            setGalleryWidth(totalWidth);
        };

        calculateGalleryWidth();
        window.addEventListener('resize', calculateGalleryWidth);

        const handleScroll = () => {
            if (!sectionRef.current || !galleryRef.current || !containerRef.current) return

            const container = containerRef.current
            const gallery = galleryRef.current
            const rect = container.getBoundingClientRect()
            const windowHeight = window.innerHeight

            if (rect.top < windowHeight && rect.bottom > 0) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }

            if (rect.top <= 0 && rect.bottom >= windowHeight) {
                const scrollProgress = -rect.top / (rect.height - windowHeight)
                const maxScroll = gallery.scrollWidth - window.innerWidth
                const translateX = -(maxScroll * scrollProgress)
                gallery.style.transform = `translateX(${translateX}px)`
            } else if (rect.top > 0) {
                gallery.style.transform = `translateX(0px)`
            } else if (rect.bottom < windowHeight) {
                const maxScroll = gallery.scrollWidth - window.innerWidth
                gallery.style.transform = `translateX(-${maxScroll}px)`
            }
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll()

        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', calculateGalleryWidth);
        }
    }, [images.length])

    return (
        <div ref={containerRef} style={{ height: '400vh' }}>
            <div
                ref={sectionRef}
                className="sticky top-0 h-screen w-screen overflow-hidden bg-white"
                style={{ transition: 'background-color 0.1s linear' }}
            >
                <div className="absolute top-16 left-4 md:top-20 md:left-24 z-10">
                    <h2
                        className="text-black text-3xl md:text-5xl"
                        style={{
                            fontFamily: 'system-ui, -apple-system, sans-serif',
                            fontWeight: '400',
                            letterSpacing: '-0.01em',
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? 'translateY(0)' : 'translateY(-20px)',
                            transition: 'all 0.6s ease'
                        }}
                    >
                        Featured Projects
                    </h2>
                </div>

                <div
                    ref={galleryRef}
                    className="flex h-screen pl-4 md:pl-24 pt-32 md:pt-48"
                    style={{
                        width: `${galleryWidth}px`,
                        transition: 'transform 0.05s linear',
                        willChange: 'transform',
                    }}
                >
                    {images.map((image, index) => (
                        <a
                            key={image.id}
                            href={image.imageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative h-[60vh] w-[75vw] md:h-[500px] md:w-[380px] flex-shrink-0 mr-4 md:mr-8 overflow-hidden rounded-lg shadow-xl"
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                                transition: `all 0.8s ease ${index * 0.2}s`,
                            }}
                        >
                            <img
                                src={image.imageUrl}
                                alt={image.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
                                <p className="text-neutral-300 text-xs mb-2 uppercase tracking-widest font-medium">
                                    PROJECT {image.id}
                                </p>
                                <h3 className="text-2xl md:text-3xl font-light mb-4 leading-tight" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                                    {image.title}
                                </h3>
                                <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                    <p className="text-neutral-300 text-sm md:text-base leading-relaxed mb-4">
                                        {image.description}
                                    </p>
                                    <div className="text-white text-sm flex items-center gap-2 font-medium">
                                        View Project
                                        <ExternalLink className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Work;