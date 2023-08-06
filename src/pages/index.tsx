import Head from "next/head";
import { SearchPage } from "@/components/SearchPage";

export default function Home() {
  return (
    <>
      <Head>
        <title>Movie search app</title>
        <meta
          name="description"
          content="Tally Code Challenge - Movie search"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <SearchPage />
      </main>
    </>
  );
}