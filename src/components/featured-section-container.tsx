"use client";

import React, { useMemo } from "react";

interface FeaturedItem {
  id: string;
  featured?: boolean;
}

interface FeaturedSectionContainerProps<T extends FeaturedItem> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

export const FeaturedSectionContainer = <T extends FeaturedItem>({
  items,
  renderItem,
}: FeaturedSectionContainerProps<T>) => {
  // ⚡ Optimization: Memoize the split of featured/non-featured items to avoid re-filtering
  // the entire array on every render of the container.
  const { featuredItems, nonFeaturedItems } = useMemo(() => {
    return {
      featuredItems: items.filter((item) => item.featured),
      nonFeaturedItems: items.filter((item) => !item.featured),
    };
  }, [items]);

  return (
    <div className="flex flex-col gap-6 w-full px-4 md:px-10">
      {featuredItems.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredItems.map((item, index) => {
            const isFullWidth = featuredItems.length % 2 !== 0 && index === 0;
            return (
              <div key={item.id} className={isFullWidth ? "md:col-span-2" : ""}>
                {renderItem(item)}
              </div>
            );
          })}
        </div>
      )}
      {nonFeaturedItems.length > 0 && (
        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
          {nonFeaturedItems.map((item) => (
            <div key={item.id}>{renderItem(item)}</div>
          ))}
        </div>
      )}
    </div>
  );
};
