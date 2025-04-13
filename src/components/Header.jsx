export default function Header() {
    return (
        <header className="bg-[#C8A19C] text-center p-6 shadow-lg">
            <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">Cafe</h1>
            <ul className="flex justify-center gap-8 text-lg font-medium">
                <li>
                    <a href="#filter" className="text-[#F3ECE3] hover:text-[#000000] transition-colors duration-300">
                        Filter
                    </a>
                </li>
            </ul>
        </header>
    )
}