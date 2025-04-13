import { useState } from "react"

export default function MenuCard({ menuItem }) {
    const [selectedSize, setSize] = useState(menuItem.sizes[0]);

    const handleSizeChange = (size) => {
        setSize(size);
    };

    return (
        <div className="user-card">
            <img className="avatar" src={menuItem.image} alt={menuItem.name} />
            <div className="info">
                <h3>{menuItem.name}</h3>
                <p>{menuItem.description}</p>
                <p>${menuItem.price}</p>
                <div className="flex gap-2 flex-wrap mt-2">
                    {menuItem.sizes.map((size) => (
                        <button
                            key={size}
                            onClick={() => handleSizeChange(size)}
                            className={`px-4 py-2 rounded-md text-sm font-medium cursor-pointer ${selectedSize === size ? "bg-[#C8A19C] text-[#F3ECE3]" : "bg-gray-100 text-black"
                                }`}>
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            <div className="cart-button-container">
                <button className="cart-button">Add to cart</button>
            </div>
        </div>
    )
}