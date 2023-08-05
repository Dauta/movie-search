import { TMDBDetailsResponse } from "@/types/TMDBResponses";
import styled from "styled-components";
import ResponsiveFlexContainer from "./ResponsiveFlexContainer";
import { PlaceholderPoster } from "./PosterPlaceholder";
import Link from "next/link";

type MovieDetailsPageProps = { movie: TMDBDetailsResponse };
type BackdropContainerProps = {
  url: string;
};

const backdropBaseUrl = "https://image.tmdb.org/t/p/original";
const posterBaseUrl = "https://image.tmdb.org/t/p/w780";

const BackdropContainer = styled.div`
  width: 100vw;
  min-height: 100svh;
  overflow-y: hidden;
  overflow-x: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 32px;
`;

const BlurredOverlay = styled.div<BackdropContainerProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #00000055;
  background-image: url(${(props) => props.url});
  background-size: cover;
  background-position: center;
  filter: blur(10px) brightness(0.4);
  z-index: -1;
`;

const Image = styled.img`
  border-radius: 8px;
`;

const ImageContainer = styled.div`
  width: 420px;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-evenly;
  max-width: 420px;
`;

const Title = styled.h1`
  margin-bottom: 24px;
  font-size: 36px;
  font-weight: 600;
`;

const SubTitle = styled.h3`
  margin-bottom: 24px;
  font-size: 24px;
  font-weight: 400;
`;

const Paragraph = styled.p`
  font-size: 24px;
  margin-bottom: 12px;
`;

const ParagraphItalic = styled(Paragraph)`
  font-style: italic;
`;

const BackLink = styled(Link)`
  position: absolute;
  top: 24px;
  left: 24px;
`

export const MovieDetailPage = ({ movie }: MovieDetailsPageProps) => {
  const backdropUrl = `${backdropBaseUrl}${movie.backdrop_path}`;
  const roundedScore = Math.round(movie.vote_average * 10) / 10;

  return (
    <>
      <BackdropContainer>
        <BlurredOverlay url={backdropUrl} />
        <ResponsiveFlexContainer gap={64}>
          <ImageContainer>
            {movie.poster_path ? (
              <Image
                src={`${posterBaseUrl}${movie.poster_path}`}
                width="100%"
                height="auto"
                alt={`${movie.title} poster`}
              />
            ) : (
              <PlaceholderPoster />
            )}
          </ImageContainer>
          <DetailsContainer>
            <Title>{movie.title}</Title>
            <SubTitle>{movie.tagline}</SubTitle>

            <ParagraphItalic>{movie.genres.map(genre => genre.name).join(', ')}</ParagraphItalic>
            <ParagraphItalic>Rating: {roundedScore}/10</ParagraphItalic>
            <ParagraphItalic>{new Date(movie.release_date).getFullYear()}</ParagraphItalic>

            <Paragraph>{movie.overview}</Paragraph>
          </DetailsContainer>
        </ResponsiveFlexContainer>
      </BackdropContainer>
      <BackLink href="/">Back</BackLink>
    </>
  );
};
