import Head from "next/head";
import { MovieDetailPage } from "@/components/MovieDetailPage";

import type { InferGetServerSidePropsType, GetServerSideProps, PageConfig } from "next";
import { TMDBDetailsResponse } from "@/types/TMDBResponses";

export const config: PageConfig = {
  runtime: "experimental-edge",
};

export default function Home({
  movieDetails,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const {title, tagline} = movieDetails;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content={tagline}
        />
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
  movieDetails: TMDBDetailsResponse;
}> = async (req) => {
  const movieId = req.params?.id;

  if (!movieId) throw new Error("movie id is required");

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
    throw new Error(result.statusText);
  }

  const movieDetails = (await result.json()) as TMDBDetailsResponse;

  return { props: { movieDetails } };
};
