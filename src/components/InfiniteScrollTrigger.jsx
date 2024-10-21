import { useEffect, useRef } from 'react';

const InfiniteScrollTrigger = ({
    onLoadMore,
    loading,
    hasMore
}) => {
    const sentinelRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const firstEntry = entries[0];
                if (firstEntry.isIntersecting && hasMore && !loading) {
                    onLoadMore();
                }
            },
            {
                root: null,
                rootMargin: '100px',
                threshold: 0,
            }
        );

        const sentinelElement = sentinelRef.current;
        if (sentinelElement) {
            observer.observe(sentinelElement);
        }

        return () => {
            if (sentinelElement) {
                observer.unobserve(sentinelElement);
            }
        };
    }, [loading, hasMore, onLoadMore]);

    return <div ref={sentinelRef}></div>;
};

export default InfiniteScrollTrigger;