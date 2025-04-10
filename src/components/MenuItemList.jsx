import { useState, useEffect } from "react";
import menuJson from "../data/menu.json";
import MenuItemCard from "./MenuItemCard";
import Search from "./Search";

export default function MenuItemList() {

    const [menuItems, setMenuItems] = useState([]);
    const [filteredMenuItems, setFilteredMenuItems] = useState([]);

    useEffect(() => {
        setMenuItems(menuJson);
        setFilteredMenuItems(menuJson);
      }, []);

      const handleSearch = (query) => {
        setFilteredMenuItems(menuItems.filter(item => {
            return item.name.toLowerCase().includes(query.toLowerCase())
        }));
      };

    return(

    <div>
        {/* {menuItems.map((menuItem) => (
            <MenuItemCard key={menuItem.id} menuItem={menuItem} />
        ))}    */}

        <Search onSearch={handleSearch} />
        
        {filteredMenuItems.map((menuItem) => (
            <MenuItemCard key={menuItem.id} menuItem={menuItem} />
        ))}

    </div>
    )
}