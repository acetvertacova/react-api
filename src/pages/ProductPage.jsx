import MenuCard from "../components/MenuCard";
import NotFoundPage from "./NotFoundPage";
import * as menuApi from '../api/menu/menu';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

/**
 * ProductPage component that fetches and displays a menu item by its ID.
 * Handles errors such as item not found (404) or general errors during fetch.
 *
 * @component
 * @returns {JSX.Element} The rendered ProductPage component.
 */
export default function ProductPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [menuItem, setMenuItem] = useState(null);
    const [error, setError] = useState(null);
    const [notFound, setNotFound] = useState(false); // State to manage 'not found' scenario

    /**
     * Fetches a menu item by ID and handles errors.
     * If the item is not found (404), it sets the notFound state.
     * Otherwise, it sets the error message for other types of errors.
     */
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
    }, [id]); // Dependency array ensures effect runs when `id` changes

    if (notFound) {
        return <NotFoundPage />
    }

    if (error) {
        return <p>{error}</p>
    }

    // If menu item is successfully fetched, render the MenuCard component
    return (
        <div>
            <MenuCard menuItem={menuItem} />
        </div>
    );
}