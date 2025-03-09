import { useStore } from "@nanostores/react";
import { videoState, getVideoSrc } from "../../store/videoStore";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export const VideoPlayer = () => {
    const state = useStore(videoState);
    const mainVideoRef = useRef<HTMLVideoElement>(null);
    const nextVideoRef = useRef<HTMLVideoElement>(null);

    useGSAP(() => {
        if(state.isTransitioning) {
            // Configurar el video siguiente
            if(nextVideoRef.current) {
                gsap.set(nextVideoRef.current, { 
                    visibility: "visible",
                });

                // Animar la expansión después de un pequeño delay
                gsap.to(nextVideoRef.current, {
                    transformOrigin: "center center",
                    scale: 1,
                    width: "100%",
                    height: "100%",
                    duration: 1,
                    ease: "power1.inOut",
                    onStart: () => {
                        nextVideoRef.current?.play().catch(() => {});
                    }
                });
            }

        
        }
    }, {dependencies: [state.isTransitioning], revertOnUpdate: true});

    
    return (
        <div >
            <video 
                ref={mainVideoRef}
                key={`main-${state.currentIndex}`}
                loop 
                muted 
                autoPlay
                playsInline
                src={getVideoSrc(state.currentIndex)}
                className="absolute left-0 top-0 size-full object-cover object-center"
            />
            <video 
                ref={nextVideoRef}
                key={`next-${state.currentIndex + 1}`}
                loop 
                muted 
                playsInline
                src={getVideoSrc(state.currentIndex + 1 > state.totalVideos ? 1 : state.currentIndex + 1)}
                className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            />
        </div>
    );
}