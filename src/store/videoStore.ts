import { atom } from "nanostores";

export interface VideoState {
    currentIndex: number;
    hasClicked: boolean;
    isLoading: boolean;
    loadedVideos: number;
    totalVideos: number;
    isTransitioning: boolean; // Nuevo estado para controlar la animación
}

export const videoState = atom<VideoState>({
    currentIndex: 1,
    hasClicked: false,
    isLoading: true,
    loadedVideos: 0,
    totalVideos: 4,
    isTransitioning: false
});

export const getVideoSrc = (index: number) => {
    return `https://res.cloudinary.com/dinqyrkvx/video/upload/v1741117264/premio/video/hero-${index}.mp4`;
};

export const getNextVideoIndex = (currentIndex: number, totalVideos: number) => {
    return currentIndex >= totalVideos ? 1 : currentIndex + 1;
};

export const updateCurrentVideo = (nextIndex: number) => {
    const currentState = videoState.get();
    
    if (currentState.isTransitioning) return; // Prevenir múltiples transiciones

    videoState.set({
        ...currentState,
        isTransitioning: true
    });

    // Esperar a que termine la animación
    setTimeout(() => {
        videoState.set({
            ...videoState.get(),
            currentIndex: nextIndex,
            isTransitioning: false
        });
    }, 1000); // Ajustado a 1 segundo para coincidir con la duración de la animación
};