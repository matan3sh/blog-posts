import { useEffect } from "react";
import { useInfiniteQuery } from "react-query";

interface Props {
  key: string;
  fetchFn: Function;
  limitItems: number;
  totalItems: number;
}

export function useInfiniteScroll<T>({
  key,
  fetchFn,
  limitItems,
  totalItems,
}: Props) {
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isLoading,
    isError,
    error,
    isFetchingNextPage,
  } = useInfiniteQuery<T[], Error>(
    key,
    ({ pageParam = 0 }) => fetchFn(pageParam, limitItems),
    {
      getNextPageParam: (lastPage, allPages) => {
        const maxPages = totalItems / limitItems;
        const nextPage = allPages.length + 1;
        return nextPage <= maxPages ? nextPage : undefined;
      },
    }
  );

  useEffect(() => {
    const onScroll = async (event: Event) => {
      const { scrollHeight, scrollTop, clientHeight } = (event.target as any)
        .scrollingElement;

      if (!isFetchingNextPage && scrollHeight - scrollTop <= clientHeight) {
        if (hasNextPage) await fetchNextPage();
      }
    };

    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, []);

  return { data, isLoading, isError, error };
}
