import { useRef } from "react";
import { gsap } from "gsap";
import { RoundedCorners } from "../shared/RoundedCorners";
interface ImageCutEffectProps {
    children: React.ReactNode,
}

export const ImageCutEffect = ({children}: ImageCutEffectProps) => {
    const frameRef = useRef<HTMLDivElement>(null);

    const handleMouseLeave = () => {
      const element = frameRef.current;
      if (!element) return;

      gsap.to(element, {
        duration: 0.3,
        ease: "power1.inOut",
        rotationX: 0,
        rotationY: 0,
      });
    }
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const {clientX, clientY} = e;
      const element = frameRef.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();

      const x = clientX - rect.left;
      const y = clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;


      gsap.to(element, {
        duration: 0.3,
        ease: "power1.inOut",
        rotationX: rotateX,
        rotationY: rotateY,
        transformPerspective: "500",
      });

      
      
      
    }
    
    
    return (
        <div className="story-img-container">
        <div className="story-img-mask">
            <div className="story-img-content">
                <div ref={frameRef} onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseLeave} onMouseUp={handleMouseLeave} onMouseMove={handleMouseMove}>
                    {children}
                </div>
            </div>
        <RoundedCorners/>
        </div>

    </div>
    )
}