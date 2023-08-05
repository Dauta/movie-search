import styled from "styled-components";

const PlaceHolderContainer = styled.div`
  width: 100%;
`;

const StyledImage = styled.img`
  border-radius: 8px;
  aspect-ratio: calc(2 / 3);
`;

export const PlaceholderPoster = () => {
  return (
    <PlaceHolderContainer>
      <StyledImage src="/poster-placeholder.png" width="100%" height="auto" />
    </PlaceHolderContainer>
  );
};
