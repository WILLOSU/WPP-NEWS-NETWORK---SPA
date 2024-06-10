import { useNavigate } from 'react-router-dom';
export const TextLimit = ({ text, limit }) => {
   
  if (limit === null) {
    return <p>{text}</p>;  // Exibe o texto completo
  }

  const limitedText = text.length > limit ? `${text.substring(0, limit)}...Ler mais` : text;
  return <p>{limitedText}</p>;
};



// clique bait, apresenta parte da notícia e se o usuário precisar ver o restante da notícia
// precisa logar