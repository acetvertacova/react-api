export default function Header() {
    return (
        <header className="bg-[#493D9E] text-center p-6 rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold text-[#C5BAFF] mb-4 drop-shadow-lg">Cafe</h1>
            <ul className="flex justify-center gap-8 text-lg font-medium">
                <li>
                    <a href="#slider" className="text-[#C4D9FF] hover:text-[#C5BAFF] transition-colors duration-300">
                        Slider
                    </a>
                </li>
                <li>
                    <a href="#filter" className="text-[#C4D9FF] hover:text-[#C5BAFF] transition-colors duration-300">
                        Filter
                    </a>
                </li>
            </ul>
        </header>
    )
}