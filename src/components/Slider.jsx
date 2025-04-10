import menu from "../data/menu.json";
import MenuItemCard from "./MenuItemCard";
import { useState, useEffect } from "react";


export default function Slider() {
   
    const [index, setIndex] = useState(0);

    function nextMenuItem() {
        if (index < menu.length - 1) {
            setIndex(index + 1);
        }
    }

    function previosMenuItem() {
        if (index > 0) {
            setIndex(index - 1);
        }
    }

    let currentSlide = menu[index];

    useEffect(() => {
        const interval = setInterval(() => {
          setIndex((prevIndex) => (prevIndex + 1) % menu.length);
        }, 3000);
    
        
        return () => {
          clearInterval(interval);
        };
      }, []);

    return(
        <div id="slider" className="relative flex flex-col items-center bg-[#E8F9FF] p-6 rounded-2xl shadow-lg">
            <MenuItemCard key={currentSlide.id} menuItem={currentSlide} />
            
            <div className="flex justify-between w-full">
                <button onClick={previosMenuItem} className="px-6 py-2 bg-[#493D9E] text-white rounded-lg shadow-md hover:bg-[#C4D9FF]">
                    Previous
                </button>

                <button onClick={nextMenuItem} className="px-6 py-2 bg-[#493D9E] text-white rounded-lg shadow-md hover:bg-[#C4D9FF]">
                    Next
                </button>
            </div>
        </div>
    )
}