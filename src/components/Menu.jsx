import { useState, useEffect } from "react";
import * as menuApi from '../api/menu/menu';
import MenuCard from "./MenuCard";
import MenuCardSkeleton from "./MenuCardSkeleton";
import Search from "./Search";
import Skeleton from "react-loading-skeleton";

export default function Menu() {
    const [menu, setMenu] = useState([]);
    const [filteredMenu, setFilteredMenu] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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

    const handleSearch = (query) => {
        if (!query) {
            setFilteredMenu(menu);
        } else {
            setFilteredMenu(menu.filter(item => {
                return item.name.toLowerCase().includes(query.toLowerCase())
            }));
        }
    };

    return (
        <div>
            {loading && <MenuCardSkeleton cards={6} />}
            {error && <p>Error: {error}</p>}

            <Search onSearch={handleSearch} />
            {filteredMenu.map((item) => (
                <MenuCard key={item.id} menuItem={item} />
            ))}
        </div>
    )
}