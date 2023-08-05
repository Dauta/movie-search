import { fetcher } from "@/helpers/fetcher";
import useSWRInfinite from "swr/infinite";

type PaginatedApiResponse<Item> = {
  page: number;
  total_pages: number;
  total_results: number;
  results: Item[];
};

type UseApiOptions = {
  skip?: boolean;
}

export const useSearchApi = <T>(
  query: string,
  options: UseApiOptions = {},
) => {
  const getKey = (
    pageIndex: number,
    prevData: PaginatedApiResponse<T>
  ): string | null => {
    if (options.skip) return null;

    const base = '/api/search';

    // Return null if there are no more pages
    if (prevData && prevData.page >= prevData.total_pages) {
      return null;
    }

    return `${base}?q=${query}&page=${pageIndex + 1}`;
  };

  const { data, error, size, setSize, isLoading } = useSWRInfinite<
    PaginatedApiResponse<T>
  >(getKey, fetcher);

  // Flatten the data from all pages into a single array
  const flattenedData = data?.flatMap((d) => d.results);

  return {
    data: flattenedData,
    totalResults: (data && data[0].total_results) ?? 0,
    error,
    isLoading,
    size,
    setSize,
    isLastPage:
      data && data[data.length - 1].page >= data[data.length - 1].total_pages,
  };
};
