'use client';

import { useEffect, useRef, ReactNode } from "react";

interface InfiniteScrollProps<T> {
  items: T[] | undefined
  isLoading?: boolean
  loadMore: () => void | Promise<void>
  renderItem: (item: T, index: number) => ReactNode | null
  hasReachedEnd?: boolean
  loadingComponent?: ReactNode | null
  endComponent?: ReactNode | null
  className?: string
  loaderClassName?: string
}

export default function InfiniteScroll<T>({
  items,
  isLoading = false,
  renderItem,
  loadMore,
  loadingComponent,
  endComponent,
  className = "",
  loaderClassName = "",
  hasReachedEnd = false,
}: InfiniteScrollProps<T>) {
  const loader = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && items && !hasReachedEnd) {
          loadMore();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px',
      }
    );

    const loaderElement = loader.current;
    if (loaderElement) {
      observerRef.current.observe(loaderElement);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isLoading, items, hasReachedEnd, loadMore]);

  return (
    <div className={className}>
      {!isLoading && items?.map((item, index) => renderItem(item, index))}
      <div ref={loader} className={loaderClassName}>
        {
          hasReachedEnd
            ? endComponent
            : loadingComponent
        }
      </div>
    </div>
  );
}
