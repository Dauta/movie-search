import { TMDBDetailsResponse } from "@/types/TMDBResponses";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  movies: TMDBDetailsResponse;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const movieId = req.query.id;

  const authHeader = `Bearer ${process.env.API_TOKEN}`;
  const baseUrl = `https://api.themoviedb.org/3/movie/${movieId}`;

  const requestUrl = new URL(baseUrl);

  requestUrl.searchParams.set("language", "en");

  const options = {
    method: "GET",
    headers: { accept: "application/json", Authorization: authHeader },
  };

  const result = await fetch(requestUrl, options);

  if (!result.ok) {
    console.error(result.statusText);
  }

  const movieDetails = await result.json();

  res.status(200).json(movieDetails);
}
