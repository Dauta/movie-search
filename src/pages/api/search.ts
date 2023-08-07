import Movie from "@/db/models/Movie";
import { normalizeString } from "@/helpers/normalizeString";
import { MovieService } from "@/services/MovieService";
import { PaginatedApiResponse } from "@/types/PaginatedResponse";
import { TMDBResponse } from "@/types/TMDBResponses";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = PaginatedApiResponse<TMDBResponse>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // TODO handle edge cases
  const queryString = normalizeString(req.query.q);
  // TODO handle non integer inputs
  const page = normalizeString(req.query.page);

  const movieService = new MovieService();
  await movieService.initDb();

  const movies = await movieService.search(queryString, page);
  res.status(200).json(movies);
}
