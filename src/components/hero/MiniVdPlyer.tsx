import { useEffect, useRef } from "react";
import { useStore } from "@nanostores/react";
import { videoState, getVideoSrc, getNextVideoIndex, updateCurrentVideo } from "../../store/videoStore";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export const MiniVdPlyer = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const nextVdRef = useRef<HTMLVideoElement>(null);
    const state = useStore(videoState);
    const nextVideoIndex = getNextVideoIndex(state.currentIndex, state.totalVideos);



    useEffect(() => {
        if(state.loadedVideos === state.totalVideos) {
           videoState.set({
            ...state,
            isLoading: false
           })
        }
    }, [state.loadedVideos]);

    useGSAP(() => {
        if(state.isTransitioning && containerRef.current && nextVdRef.current) {
            gsap.from(containerRef.current, {
                transformOrigin: "center center",
                scale: 0,
                duration: 1.5,
                ease: "power1.inOut",
            });
        }
    }, {dependencies: [state.isTransitioning], revertOnUpdate: true});
    
    
    
    const handleMiniVdPlyer = () => {
        if (!state.isTransitioning) {
            updateCurrentVideo(nextVideoIndex);
        }
    }

    return (
        <div 
            ref={containerRef} 
            onClick={handleMiniVdPlyer} 
            className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
        >
            <video 
                loop 
                muted 
                ref={nextVdRef} 
                src={getVideoSrc(nextVideoIndex)} 
                className="size-64 origin-center scale-150 object-cover object-center" 
                onLoadedData={() => {
                    videoState.set({
                        ...state,
                        loadedVideos: state.loadedVideos + 1
                    });
                }}
            />
        </div>
    )
}