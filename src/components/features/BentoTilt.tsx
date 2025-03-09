import { useRef, useState } from "react"

interface BentoTiltProps {
    children: React.ReactNode
    className?: string
}

export const BentoTilt = ({ children, className }: BentoTiltProps) => {

    const [transformStyle, setTransformStyle] = useState('')
    const itemRef = useRef<HTMLDivElement>(null)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!itemRef.current) return

        const {left, top, width, height} = itemRef.current.getBoundingClientRect();
        const relativeX = (e.clientX - left) / width;
        const relativeY = (e.clientY - top) / height;

        const tiltX = (relativeY - 0.5) * 5;
        const tiltY = (relativeX - 0.5) * -5;

        const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.95, 0.95, 0.95)`

        setTransformStyle(newTransform);
        
        
    }

    const handleMouseLeave = () => {
        setTransformStyle('')
    }

    return (
        <div className={className} 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        ref={itemRef}
        style={{ transform: transformStyle }}
        >
            {children}
            
        </div>
    )
}