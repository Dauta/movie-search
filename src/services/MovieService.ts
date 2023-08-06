import Movie from "@/db/models/Movie";
import { TMDBResponse } from "@/types/TMDBResponses";

const API_TOKEN = process.env.API_TOKEN;
const baseUrl = "https://api.themoviedb.org/3";

type FetchOptions = {
  params?: Record<string, string>;
};

type PaginatedApiResponse<Item> = {
  page: number;
  total_pages: number;
  total_results: number;
  results: Item[];
};

export class MovieService {
  movieModel: typeof Movie;

  constructor(model: typeof Movie) {
    this.movieModel = model;
  }

  private fetchWithToken = async <T>(
    endpoint: string,
    options: FetchOptions = {}
  ) => {
    const authHeader = `Bearer ${API_TOKEN}`;
    const url = new URL(`${baseUrl}${endpoint}`);

    if (options.params) {
      const params = Object.entries(options.params);

      params.forEach(([key, value]) => {
        url.searchParams.set(key, value);
      });
    }

    const response = await fetch(url, {
      headers: {
        Authorization: authHeader,
      },
    });

    if (!response.ok) {
      console.error(response.statusText);
      throw new Error(response.statusText);
    }

    return response.json() as T;
  };

  private async cache(movieSearchResult: TMDBResponse[]) {
    const cachedItems = [];
    for (const movie of movieSearchResult) {
      const [cachedMovie, created] = await this.movieModel.findOrCreate({
        where: {
          id: movie.id,
        },
        defaults: movie,
      });

      const cacheLog = `${movie.id} ------- CACHE ${
        created ? "MISS ❌" : "HIT ✅"
      }`;
      console.log(cacheLog);

      cachedItems.push(cachedMovie);
    }

    return cachedItems;
  }

  private async findInCache(id: Movie["id"]) {
    try {
      return this.movieModel.findOne({
        where: {
          id,
        },
      });
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async search(query: string, page: string) {
    const endpoint = "/search/movie";
    const searchResult = await this.fetchWithToken<
      PaginatedApiResponse<TMDBResponse>
    >(endpoint, {
      params: { query, page },
    });

    const cachedResult = await this.cache(searchResult.results);

    return {
      ...searchResult,
      results: cachedResult,
    };
  }

  async getMovieById(id: number) {
    const cachedMovie = await this.findInCache(id);

    if (cachedMovie) return cachedMovie;

    const endpoint = `/movie/${id}`;
    return this.fetchWithToken<TMDBResponse>(endpoint);
  }
}
