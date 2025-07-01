"use client";

import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/authContext";
import { publishNewsService } from "../../Services/postsServices";
import { PublishModal } from "../PublishModal";
import { Modal } from "../Modal";

export function PublishNews({ news, open, setOpen }) {
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();

  async function publishNew(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const newsID = news.id;
      const response = await publishNewsService(newsID, token);

      if (!response.ok) {
        const errorData = await response.json();

        toast.error(
          `Erro ao publicar notícia: ${
            errorData.message || "Erro desconhecido"
          }`
        );
        return;
      }

      const data = await response.json();

      toast.success("Notícia publicada com sucesso!");
      setOpen({ published: false });

      // Recarregar a página após 1 segundo
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error("Erro ao publicar notícia. Verifique o console.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Toaster />
      {open ? (
        <Modal>
          <PublishModal
            handleChange={publishNew}
            title="Publicar notícia"
            description="Certeza que deseja publicar essa notícia?"
            setOpen={() => setOpen({ published: false })}
            loading={loading}
          />
        </Modal>
      ) : null}
    </>
  );
}
