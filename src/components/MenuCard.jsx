import { useState } from "react"
import { useNavigate } from "react-router";


/**
 * MenuCard component displays a single menu item with its details (name, description, price, and sizes).
 * It allows users to:
 * - Change the size of the item
 * - Navigate to an edit form page
 * - Delete the item from the menu
 *
 * @param {Object} props - The props for the MenuCard component
 * @param {Object} props.menuItem - The menu item data (id, name, description, price, image, sizes)
 * @param {Function} props.onDelete - Function to handle the deletion of the menu item
 * @returns {JSX.Element} The rendered MenuCard component
 */
export default function MenuCard({ menuItem, onDelete }) {
    const navigate = useNavigate();
    const [selectedSize, setSize] = useState(menuItem.sizes[0]); // State to track the selected size for the menu item

    /**
    * Handle size selection change.
    * Sets the selected size to the chosen size.
    *
    * @param {string} size - The size selected by the user
    */
    const handleSizeChange = (size) => {
        setSize(size); // Updates the selected size
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

            <div className="button-container">
                <button className="button">Add to cart</button> {/* Button to add item to cart */}
                <button className="button" onClick={() => navigate(`form/${menuItem.id}/edit`)}>Edit</button> {/* Navigate to edit page */}
                <button className="button" onClick={() => onDelete(menuItem.id)}>Delete</button> {/* Handle item deletion */}
            </div>
        </div>
    )
}