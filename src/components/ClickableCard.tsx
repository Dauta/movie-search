import { styled } from "styled-components"
import Link from 'next/link';

export const ClickableCard = styled(Link)`
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease-in-out;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);
  }
`

