import React, { ReactNode } from "react";
import styled from "styled-components";

type FlexContainerProps = {
  width?: string;
  height?: string;
  gap?: number;
};

type ResponsiveFlexContainerProps = FlexContainerProps & {
  children: ReactNode;
};

const FlexContainer = styled.div<FlexContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "100%"};
  overflow: hidden;
  position: relative;
  gap: ${(props) => props.gap || 32}px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ResponsiveFlexContainer = ({
  width,
  height,
  gap,
  children,
}: ResponsiveFlexContainerProps) => {
  return (
    <FlexContainer width={width} height={height} gap={gap}>
      {children}
    </FlexContainer>
  );
};

export default ResponsiveFlexContainer;
