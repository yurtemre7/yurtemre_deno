interface SmoothScrollBtnProps {
    id: string;
    name: string;
}

export default function SmoothScrollBtn({ id, name }: SmoothScrollBtnProps) {
    const handleClick = (event: MouseEvent) => {
        event.preventDefault();
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: 'smooth' });
    };
    return (
        <button
            className="bg-white text-blue-800 rounded shadow-lg py-2 px-4 hover:bg-blue-800 hover:text-white transition-colors duration-300"
            onClick={handleClick}
        >  {name}
        </button>
    )
}