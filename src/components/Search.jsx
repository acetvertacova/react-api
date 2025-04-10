import { useState } from "react";

export default function Search({ onSearch }) {

    const [search, setSearch] = useState("");

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <div className="w-full max-w-md mx-auto mt-4">
            <input id="filter"
                type="text"
                placeholder="Search..."
                onChange={handleSearchChange}
                value={search}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow focus:outline-none focus:border-[#493D9E] text-gray-700"
            />
        </div>
    );
}