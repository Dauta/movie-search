/* eslint-disable @next/next/no-img-element */
import { ChangeEventHandler, useCallback, useState } from "react";
import ResponsiveFlexContainer from "./ResponsiveFlexContainer";
import { Searchbar } from "./Searchbar";
import { useSearchApi } from "@/hooks/useSearchApi";
import { TMDBSearchResponse } from "@/types/TMDBResponses";
import Grid from "./Grid";
import styled from "styled-components";
import { throttle } from "@/helpers/throttle";
import { useOnScrollToBottomEvent } from "@/hooks/useOnScrollToBottomEvent";
import { ClickableCard } from "./ClickableCard";
import { PlaceholderPoster } from "./PosterPlaceholder";

const imageBasePath = "https://image.tmdb.org/t/p/w342";

const ScrollableContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  justify-content: center;
`;

const Image = styled.img`
  border-radius: 8px;
`;

const Title = styled.h2`
  margin: 12px;
  font-size: 20px;
  font-weight: 400;
  text-align: center;
`

export const SearchPage = () => {
  const [searchQ, setSearchQ] = useState("");

  const {
    data: movies,
    size,
    setSize,
    isLastPage,
  } = useSearchApi<TMDBSearchResponse>(searchQ, { skip: searchQ.length === 0});

  const onSearchThrottled: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => throttle(() => setSearchQ(e.target.value), 250),
    []
  );

  const fetchNextPage = useCallback(() => setSize(size + 1), [setSize, size]);

  const containerRef = useOnScrollToBottomEvent<HTMLDivElement>(fetchNextPage, {
    skip: isLastPage,
  });

  return (
    <>
      <ResponsiveFlexContainer height="100svh" width="100vw">
        <Searchbar onChange={onSearchThrottled} />
        <ScrollableContainer ref={containerRef}>
          <Grid>
            {movies?.map((movie) => (
              <ClickableCard key={`movie-${movie.id}`} href={`/movies/${movie.id}`}>
                {movie.poster_path ? <Image
                  src={`${imageBasePath}${movie.poster_path}`}
                  alt={`${movie.title} poster image`}
                  width="100%"
                  height="auto"
                />: <PlaceholderPoster />}
                <Title>{movie.title}</Title>
              </ClickableCard>
            ))}
          </Grid>
        </ScrollableContainer>
      </ResponsiveFlexContainer>
    </>
  );
};
