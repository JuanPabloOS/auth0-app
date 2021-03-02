import { createGlobalStyle } from "styled-components"
export const GlobalStyles = createGlobalStyle`
  body {
    background:
    ${({ theme, role }) => role === 'B' ? 'white' : theme.body};
    color: ${({ theme, role }) => role === 'B' ? "#000" : theme.text};
    display: flex;
    height: 100vh;
    flex-direction: column;
    align-items: "center";
    justify-content: center;
    width: 100%;
    background-color: color;
    font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
    transition: all 0.50s linear;
  }
  button{
    background: ${(props) =>
    props.role === 'B' ? (props.theme.button === '#008000' ? 'orange' : 'cyan') : props.theme.button};
    color: ${({ theme, role }) => role === 'B' ? "#000" : theme.text};
  }
`