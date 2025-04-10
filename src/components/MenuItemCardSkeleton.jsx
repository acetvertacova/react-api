import Skeleton from "react-loading-skeleton";

export default function MenuItemCardSkeleton({cards}) {
    return(
        Array(cards)
            .fill(0)
            .map((item, i) =>
                <div className="card-skeleton" key={i}>
                    <div className="left-col">
                        <Skeleton circle width={200} height={200} />
                    </div>
                    <div className="right-col">
                        <Skeleton count={5}/>
                    </div>
                </div>
        ));
};