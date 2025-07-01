import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { createNewNewsService } from "../../Services/postsServices";

import { Button } from "../Button";
import { ErrorMessage } from "../ErrorMessage";
import { Form } from "../Form";
import { Input } from "../Input";
import { Modal } from "../Modal";

import { Link, Quote } from "lucide-react";
import { useAuth } from "../../Context/authContext";
import * as S from "./styles";

export function CreateNews({ open, setOpen }) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [newNews, setNewNews] = useState({
    title: "",
    banner: "",
    text: "",
  });

  const { token, user } = useAuth();
  const navigate = useNavigate();

  function handleInputChange(e) {
    const { name, value } = e.target;
    setNewNews({ ...newNews, [name]: value });
  }

  async function createNewNews(e) {
    e.preventDefault();

    const { title, text } = newNews;

    if (!title || !text) {
      setErrorMessage("Por favor, preencha o título e o texto da notícia.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    let newsDataToSend = { ...newNews };
    if (user && user.role === "admin") {
      newsDataToSend.status = "published";
    }

    try {
      const response = await createNewNewsService(token, newsDataToSend);

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(
          errorData.message || "Erro ao criar notícia. Tente novamente."
        );
        return;
      }

      await response.json();

      setLoading(false);
      setOpen(false);
      navigate("/profile");
    } catch (error) {
      console.error("Erro ao criar notícia:", error);
      setErrorMessage("Ocorreu um erro inesperado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {open ? (
        <Modal onClick={() => setOpen(false)}>
          <Form title="Publicar Notícia" handleClick={() => setOpen(false)}>
            <Input
              icon={<Quote />}
              type="text"
              placeholder="Título"
              name="title"
              onChange={handleInputChange}
            />

            <Input
              icon={<Link />}
              type="text"
              placeholder="Banner (URL da imagem)"
              name="banner"
              onChange={handleInputChange}
            />

            <S.TextArea
              name="text"
              cols="40"
              rows="5"
              placeholder="Conteúdo da notícia"
              onChange={handleInputChange}
            />
            <ErrorMessage>{errorMessage}</ErrorMessage>
            <Button onClick={createNewNews}>
              {loading ? (
                <ClipLoader color="#fff" size={16} />
              ) : (
                "Criar notícia"
              )}
            </Button>
          </Form>
        </Modal>
      ) : null}
    </>
  );
}
