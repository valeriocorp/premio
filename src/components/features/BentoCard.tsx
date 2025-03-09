interface BentoCardProps {
    title: string;
    description: string;
video: string;
    isComingSoon?: boolean;
}

export const BentoCard = ({ title, description, video, isComingSoon = false }: BentoCardProps) => {
    return (
        <div className="relative size-full">
            <video
            src={video}
            autoPlay
            muted
            loop
            className="absolute left-0 top-0 size-full object-cover object-center"
            >

            </video>

            <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
                <div>
                    <h1 className="bento-title special-font">
                        {title}
                    </h1>
                    {description && (
                        <p className="mt-3 max-w-64 text-xs md:text-base">
                            {description}
                        </p>
                    )}
                </div>

            </div>

            {isComingSoon && (
                <div className="absolute left-0 bottom-0 m-5">
                    <button className="group relative overflow-hidden rounded-lg border border-white/10 bg-black/20 px-4 py-2 backdrop-blur-sm">
                        <span className="relative z-10 font-zentry text-sm uppercase tracking-wider text-blue-50 transition-all duration-300 group-hover:text-yellow-300">
                            Coming Soon
                        </span>
                        <div className="absolute inset-0 -z-10 scale-x-0 bg-black/30 transition-transform duration-300 ease-out group-hover:scale-x-100 origin-left"/>
                    </button>
                </div>
            )}
        </div>
    )
}