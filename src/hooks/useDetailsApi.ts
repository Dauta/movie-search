import { fetcher } from "@/helpers/fetcher";
import useSWR from 'swr';

export const useDetailsApi = (id: number) => {
  const base = `/api/details/${id}`;
  return useSWR(base, fetcher);
}