import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

/**
 * MenuCardSkeleton component renders a skeleton loader for menu items. 
 * This is typically shown while the data for the menu items is being fetched or loaded.
 * It simulates the layout of the `MenuCard` component but with placeholder elements.
 *
 * @param {Object} props - The props for the MenuCardSkeleton component
 * @param {number} props.cards - The number of skeleton cards to display
 * @returns {JSX.Element} The rendered skeleton loader for the menu cards
 */
export default function MenuCardSkeleton({ cards }) {
    return (
        <div>
            {Array(cards) // Creates an array of length 'cards'
                .fill(0) // Fills the array with zeros to simulate loading cards
                .map((_, i) => (
                    <div className="card-skeleton" key={i}>
                        <div className="left-col">
                            {/* Circle skeleton for image */}
                            <Skeleton circle width={200} height={200} />
                        </div>
                        <div className="right-col">
                            {/* Skeleton for title */}
                            <Skeleton width={150} height={20} style={{ marginBottom: '0.5rem' }} />
                            {/* Skeleton for description lines */}
                            <Skeleton count={4} height={15} style={{ marginBottom: '0.5rem' }} />

                            <div className="button-skeleton">
                                {/* Skeleton for three buttons - add to cart, edit, delete */}
                                <Skeleton width={100} height={36} style={{ borderRadius: '0.5rem' }} />
                                <Skeleton width={100} height={36} style={{ borderRadius: '0.5rem' }} />
                                <Skeleton width={100} height={36} style={{ borderRadius: '0.5rem' }} />
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    )
};