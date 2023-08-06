export type PaginatedApiResponse<Item> = {
  page: number;
  total_pages: number;
  total_results: number;
  results: Item[];
};