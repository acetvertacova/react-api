import { useState, useEffect } from "react";
import * as menuApi from '../api/menu/menu';
import MenuItemCard from "./MenuItemCard";
import Skeleton from "react-loading-skeleton";
import MenuItemCardSkeleton from "./MenuItemCardSkeleton";

export default function MenuItemList() {

    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        const fetchMenuList = async () => {
            try {
                const data = await menuApi.getMenu();
                setMenu(data);
            }catch (error) {
                console.error('An error loading:', error);
                setError(error.message || 'Failed to load menu. Please try again later.');
            }finally {
                setLoading(false);
            }
        };
            fetchMenuList();
      }, []);


    return(
        <div>
            {loading && <MenuItemCardSkeleton cards={6}/>}
            {error && <p>Error: {error}</p>}

            {menu.map((item) => (
            <MenuItemCard key={item.id} menuItem={item || <Skeleton />} />
            ))}
        </div>
    )
}