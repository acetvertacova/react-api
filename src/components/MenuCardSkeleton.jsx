import Skeleton from "react-loading-skeleton";

export default function MenuCardSkeleton({ cards }) {
    return Array(cards)
        .fill(0)
        .map((_, i) =>
            <div className="card-skeleton" key={i}>
                <div className="left-col">
                    <Skeleton circle width={200} height={200} />
                </div>
                <div className="right-col">
                    <Skeleton count={5} />
                </div>
            </div>
        );
};