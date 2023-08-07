import { normalizeString } from "@/helpers/normalizeString";
import { MovieService } from "@/services/MovieService";
import { TMDBResponse } from "@/types/TMDBResponses";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = TMDBResponse;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const movieId = Number(normalizeString(req.query.id));
  const movieService = new MovieService();
  // await movieService.initDb();

  const movieDetails = await movieService.getMovieById(movieId);

  res.status(200).json(movieDetails);
}
