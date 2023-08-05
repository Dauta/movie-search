import React, { ReactNode } from 'react';
import styled from 'styled-components';

type GridProps = {
  children: ReactNode;
  columns?: number;
  gap?: string;
}

const GridContainer = styled.div<GridProps>`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${props => props.gap || '16px'};
  padding: 32px;
  padding-top: 72px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 48px;
  }
`;

const Grid = ({ children, columns, gap }: GridProps) => {
  return (
    <GridContainer columns={columns} gap={gap}>
      {children}
    </GridContainer>
  );
};

export default Grid;
