interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
}

export default function Button({ children, onClick, className }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`bg-primary rounded-md font-medium text-black px-6 py-3 hover:bg-transparent border border-primary hover:text-primary text-xs md:text-base md:px-4 md:py-2 ${className}`}>
            {children}
        </button>

    )
}