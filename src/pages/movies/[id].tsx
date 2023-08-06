import Head from "next/head";
import { MovieDetailPage } from "@/components/MovieDetailPage";

import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { TMDBResponse } from "@/types/TMDBResponses";
import { MovieService } from "@/services/MovieService";
import Movie from "@/db/models/Movie";

export default function Home({
  movieDetails,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { title } = movieDetails;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={`${title} - detail page`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <MovieDetailPage movie={movieDetails} />
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  movieDetails: TMDBResponse;
}> = async (req) => {
  if (!req.params?.id) throw new Error("movie id is required");

  const movieId = Number(req.params?.id);
  const movieService = new MovieService(Movie);
  const movieDetails = await movieService.getMovieById(movieId);

  return { props: { movieDetails } };
};
