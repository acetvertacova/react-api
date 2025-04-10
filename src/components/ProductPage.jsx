import { useNavigate, useParams } from "react-router";
import menuJson from "../data/menu.json";
import MenuItemCard from "./MenuItemCard";
import NotFoundPage from "./NotFoundPage";

export default function ProductPage() {

    const { id } = useParams();

    const product = menuJson.find(product => product.id == id);

    if(!id || !product || isNaN(Number(id))){
        return <NotFoundPage />
    }

    return(
        <MenuItemCard menuItem={product}/>
    );
}