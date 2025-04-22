import { useState, useEffect } from "react";
import * as menuApi from '../api/menu/menu';
import MenuCard from "./MenuCard";
import MenuCardSkeleton from "./MenuCardSkeleton";
import Search from "./Search";

/**
 * Menu component responsible for displaying a list of menu items.
 * It supports loading, searching, and deleting menu items.
 *
 * @component
 * @returns {JSX.Element} The rendered Menu component.
 */
export default function Menu() {
    const [menu, setMenu] = useState([]); // Stores the full list of menu items
    const [filteredMenu, setFilteredMenu] = useState([]); // Stores the filtered list based on search
    const [loading, setLoading] = useState(false); // Indicates loading state
    const [error, setError] = useState(null); // Stores error message if fetching fails

    /**
     * Fetch menu items from the API on initial render.
     */
    useEffect(() => {
        setLoading(true);
        setError(null);
        const fetchMenu = async () => {
            try {
                const data = await menuApi.getMenu();
                setMenu(data);
                setFilteredMenu(data);
            } catch (error) {
                console.error('An error loading:', error);
                setError(error.message || 'Failed to load menu. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchMenu();
    }, []);

    /**
     * Filters the menu items based on the search query.
     * 
     * @param {string} query - The search term entered by the user.
     */
    const handleSearch = (query) => {
        if (!query) {
            setFilteredMenu(menu);
        } else {
            setFilteredMenu(menu.filter(item => {
                return item.name.toLowerCase().includes(query.toLowerCase())
            }));
        }
    };

    /**
    * Deletes a menu item by ID and updates the filtered list.
    * 
    * @param {string} id - The ID of the menu item to delete.
    */
    const handleDelete = async (id) => {
        try {
            await menuApi.deleteMenuItem(id);
            setFilteredMenu(menu.filter(item => item.id !== id));
        } catch (error) {
            console.error("On delete error", error);
        }
    };

    return (
        <div>
            {loading && <MenuCardSkeleton cards={6} />}
            {error && <p>Error: {error}</p>}

            <Search onSearch={handleSearch} />
            {filteredMenu.map((item) => (
                <MenuCard key={item.id} menuItem={item} onDelete={handleDelete} />
            ))}
        </div>
    )
}