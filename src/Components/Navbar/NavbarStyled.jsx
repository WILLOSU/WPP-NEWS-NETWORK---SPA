import styled from "styled-components";

export const Nav = styled.nav`// utilizando componentes
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 100%;
  padding: 1rem;
  /* position: fixed;
  top: 0; */
  background-color: #fff;
  z-index: 1;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px;
`;

export const ImageLogo = styled.img` // styled - ImageLogo = Variável
                                     //         .img = tag
  width: 8rem;
  height: 3.5rem;
  object-fit: cover;
  cursor: pointer;
`;// como uma herança

export const InputSpace = styled.div`
  position: relative;
  width: 200px;
  display: flex;
  align-items: center;

  button {
    position: absolute;
    top: 1;
    right: 0.2rem;
    z-index: 10;
    border: none;
    background-color: #f5f5f5;
    color: #757575;
    border-radius: 0.3rem;
    padding: 0.5rem;
    cursor: pointer;
    transition: 0.3s;
  }

  button:hover { 
    background-color: #757575;
    color: #f5f5f5;
  }

  input { // filho
    outline: none;
    font-size: 0.9rem;
    padding: 0.8rem;
    background-color: #f5f5f5;
    border: none;
    width: 100%;
    border-radius: 0.3rem;

    :focus { // neto
      border: 1px solid #1c415c;
    }
  }
`;// como uma herança

export const ErrorSpan = styled.span`
  background-color: #ffcdcd;
  color: #9e0000;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  font-size: 1rem;
  border-radius: 7px;
`;

export const UserLoggedSpace = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  gap: 1rem;

  h2 {
    font-size: 1.1rem;
    color: #1c415c;
    transition: all 0.3s;
    cursor: pointer;
  }

  h2:hover {
    color: #043546;
  }

  i {
    font-size: 1.5rem;
    color: #1c415c;
    cursor: pointer;
  }
  i:hover {
    color: #043546;
  }
`;

/* 
 Utilizando style components ;

 npm install styled-components muito utilizado no react

 o cor do react é criar components, reutilizando components
 precisamos criar uma variável fora da função NAV BAR.

 em vez de abrir como uma função , chave ou parentezes aqui usamos 
 crase `` abrindo e fechando como templantes string 

 o resultado é o mesmo o STYLE COMPONENTS, usa CSS PURO , a ÚNICA diferença
 que agora o CSS tem o mesmo conceito de REACT, vai utilizar componetização
 nos estilos

 o nome da const (variável) é pode colocar o que quiser,
 agora depois de colocado o ponto (styled.nav) precisa 
 ser o nome de uma tag existente, exemplos;

 tag
 nav
 i
 img

 da erro, pq ele substitui a tag.

*/