import { normalizeString } from "@/helpers/normalizeString";
import { TMDBSearchResponse } from "@/types/TMDBResponses";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  movies: TMDBSearchResponse[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // TODO handle edge cases
  const queryString = normalizeString(req.query.q);
  // TODO handle non integer inputs
  const page = normalizeString(req.query.page);

  const authHeader = `Bearer ${process.env.API_TOKEN}`;
  const baseUrl = "https://api.themoviedb.org/3/search/movie";

  const requestUrl = new URL(baseUrl);

  requestUrl.searchParams.set("include_adult", "false");
  requestUrl.searchParams.set("query", queryString);
  requestUrl.searchParams.set("page", page);

  const options = {
    method: "GET",
    headers: { accept: "application/json", Authorization: authHeader },
  };

  const result = await fetch(requestUrl, options);

  if (!result.ok) {
    console.error(result.statusText);
  }

  const movies = await result.json();

  res.status(200).json(movies);
}
