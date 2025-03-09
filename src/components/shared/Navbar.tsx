import { useEffect, useRef, useState } from "react";
import { AnimatedButton } from "./AnimatedButton";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface NavbarProps {
    children: React.ReactNode;
    className?: string;
}

const navLinks = [
    {
        label: "Nexus",
        href: "nexus", // Quitamos el "/"
    },
    {
        label: "Vault",
        href: "products", // Quitamos el "/"
    },
    {
        label: "Prologue",
        href: "prologue", // Quitamos el "/"
    },
    {
        label: "About",
        href: "about", // Quitamos el "/"
    },
    {
        label: "Contact",
        href: "contact", // Quitamos el "/"
    },     
]

export const Navbar = ({className, children}: NavbarProps) => {
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [isIndicatorActive, setIsIndicatorActive] = useState(false);
    const navContainerRef = useRef<HTMLDivElement>(null);
    const audioIndicatorRef = useRef<HTMLAudioElement>(null);

    //current scroll position
    const [currentScrollPosition, setCurrentScrollPosition] = useState(0);
    //last scroll position
    const [lastScrollPosition, setLastScrollPosition] = useState(0);
    //is navbar visible
    const [isNavbarVisible, setIsNavbarVisible] = useState(true);
    
    const toggleAudioIndicator = () => {
       setIsAudioPlaying(!isAudioPlaying);
       setIsIndicatorActive(!isIndicatorActive);
    }

    useEffect(() => {
        if (isAudioPlaying) {
            audioIndicatorRef.current?.play();
        } else {
            audioIndicatorRef.current?.pause();
        }
    }, [isAudioPlaying]);

    useEffect(() => {
        const handleScroll = () => {
            const currentPosition = window.scrollY;
            
            if (currentPosition === 0) {
                setIsNavbarVisible(true);
                navContainerRef.current?.classList.remove("floating-nav");
            } else if (currentPosition > lastScrollPosition) {
                // Scrolling DOWN
                setIsNavbarVisible(false);
                navContainerRef.current?.classList.add("floating-nav");
            } else if (currentPosition < lastScrollPosition) {
                // Scrolling UP
                setIsNavbarVisible(true);
                navContainerRef.current?.classList.add("floating-nav");
            }
    
            // Actualizar las posiciones después de la comparación
            setLastScrollPosition(currentPosition);
            setCurrentScrollPosition(currentPosition);
        };
    
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollPosition]); // Dependencia cambiada a lastScrollPosition

   useGSAP(() => {
    gsap.to(navContainerRef.current, {
        y: isNavbarVisible ? 0 : -100,
        opacity: isNavbarVisible ? 1 : 0,
        duration: 0.2,
        ease: "power2.inOut"
    });
   }, [isNavbarVisible]);
    
    return (
     <div ref={navContainerRef} className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6">
        <header className="absolute top-1/2 w-full -translate-y-1/2">
            <nav className="flex size-full items-center justify-between p-4">
                <div className="flex items-center gap-7">
                    {children}
                    <AnimatedButton title="products" id="products-button"  className="bg-blue-50 md:flex items-center justify-center gap-1" />
                </div>

                <div className="flex h-full items-center">

                    <div className="hidden md:block">
                        {navLinks.map((link) => (
                            <a href={`#${link.href}`} key={link.label} className="nav-hover-btn">
                                {link.label}
                            </a>
                        ))}

                    </div>
                    <button onClick={toggleAudioIndicator} className="ml-10 flex items-center space-x-0.5 ">
                        <audio ref={audioIndicatorRef} src="https://res.cloudinary.com/dinqyrkvx/video/upload/v1741117086/premio/audio/ly17yzmny8fnkd9scpla.mp3"  loop className="hidden"/>
                      
                        {[1,2,3,4,5].map((bar) => (
                            <div key={bar} className={`indicator-line ${isIndicatorActive ? "active" : ""}`} style={{animationDelay: `${bar * 0.1}s`}}>

                            </div>
                        ))}
                    </button>

                </div>

            </nav>
        </header>
     </div>
    )
}