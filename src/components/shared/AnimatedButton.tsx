import React, { type ReactNode } from "react";

interface AnimatedButtonProps {
    id?: string;
    title: string;
    className?: string;
    onClick?: () => void;   
    children?: ReactNode;
}

export const AnimatedButton = ({ title, className, onClick, id, children }: AnimatedButtonProps) => {
    // Convertir children a array para poder acceder a los iconos
    const icons = React.Children.toArray(children);
    const leftIcon = icons[0];
    const rightIcon = icons[1];

    return (
        <button 
            id={id} 
            className={`group relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black ${className}`} 
            onClick={onClick}
        >
            {leftIcon}
            <span className="relative inline-flex overflow-hidden text-xs uppercase">
                <div>
                    {title}
                </div>
            </span>
            {rightIcon}
        </button>
    )
}