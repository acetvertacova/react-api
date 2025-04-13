import MenuCard from "../components/MenuCard";
import NotFoundPage from "./NotFoundPage";
import * as menuApi from '../api/menu/menu';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function ProductPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [menuItem, setMenuItem] = useState(null);
    const [error, setError] = useState(null);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const fetchMenuItem = async () => {
            try {
                const data = await menuApi.getMenuItemById(id);
                setMenuItem(data);
            } catch (err) {
                if (err.response && err.response.status === 404) {
                    setNotFound(true);
                } else {
                    console.error('An error loading:', err);
                    setError('Failed to load menu item. Please try again later.');
                }
            }
        };

        fetchMenuItem();
    }, [id]);

    if (notFound) {
        return <NotFoundPage />
    }

    if (error) {
        navigate('/');
    }

    if (!menuItem) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <MenuCard menuItem={menuItem[0]} />
        </div>
    );
}