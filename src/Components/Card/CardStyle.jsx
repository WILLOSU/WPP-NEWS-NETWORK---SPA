
import styled from "styled-components";
import { isUserLoggedIn } from '../../Utils/Utils';


export const CardContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 100%;
 
  min-height: 400px; // Altura mínima para consistência
  max-height: 400px; // Altura máxima para evitar expansão exagerada
  overflow: hidden; // Evita que o conteúdo transborde

  box-shadow: rgba(50, 50, 105, 0.149) 0px 2px 5px 0px,
    rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
  border-radius: 0.3rem;
  background-color: #fff;
`;

export const CardBody = styled.article`
  display: flex;
  width: 100%;
  height: 100%;

  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    padding: 1rem;
    width: 100%;
    font-size: calc(10px + 0.5vw); // Texto responsivo
    overflow-y: auto;  // Sempre permite rolagem
    max-height: 400px; // Altura máxima sempre aplicada
    
  }

  img {
    width: 38%;
    height: calc(100% - 10px); // Ajuste para reduzir a altura e permitir a margem
    margin: 5px;  // Margem uniforme para criar um efeito de flutuação
    object-fit: cover;
    object-position: center;
    border-radius: 0.3rem; // Bordas arredondadas em todos os lados
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15); // Sombra para efeito de flutuação
  }

  span {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    gap: 1rem;
  }

  i {
    cursor: pointer;
    color: #1c415c;;
    font-size: 1.1rem;
    text-decoration: none;
    border: none;
  }
`;


export const CardHeader = styled.article`
  padding: 0.5rem;
  background-color: #f8f9fa; // Um fundo sutil para destaque
  //text-align: left;
  font-size: calc(12px + 0.5vw); // Texto responsivo
  padding-bottom: 1rem;
  text-align: justify;
  text-justify: inter-word;
  white-space: pre-wrap;

  h2 {
    margin-bottom: 1rem; // Mantém a margem original aqui também
    font-size: ${(props) => (props.top ? "3rem" : "1.1rem")};
    width: 100%;
    text-align: left; // Alinha o texto à esquerda

  }
`;

export const CardFooter = styled.article`
  display: flex;
  align-items: center;
  gap: 1rem;
  overflow: hidden; // Evita que o conteúdo transborde

 
  section {
    display: flex;
    align-items: center;
    gap: 0.2rem;
  }
`;




