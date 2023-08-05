import { ChangeEventHandler } from "react";
import { styled } from "styled-components";
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })


const Input = styled.input`
  border: 1px solid white;
  font-family: ${inter.style.fontFamily};
  color: white;
  border-radius: 4px;
  font-size: 20px;
  position: absolute;
  top: 20px;
  padding: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 60%;

  @media (max-width: 768px) {
    width: 80%;
  }
`

type SearchBarProps = {
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export const Searchbar = ({ onChange }: SearchBarProps) => {
  return <Input type="text" onChange={onChange} placeholder="Search Movie Title"/>;
};
