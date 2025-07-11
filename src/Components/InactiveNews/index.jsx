"use client";

import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/authContext";
import { inactiveNewsService } from "../../Services/postsServices";
import { InactiveModal } from "../InactiveModal";
import { Modal } from "../Modal";

export function InactiveNews({ news, open, setOpen }) {
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();

  async function inactiveNew(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const newsID = news.id;
      const response = await inactiveNewsService(newsID, token);

      if (!response.ok) {
        const errorData = await response.json();
        
        toast.error(
          `Erro ao inativar notícia: ${
            errorData.message || "Erro desconhecido"
          }`
        );
        return;
      }

      const data = await response.json();

      toast.success("Notícia inativada com sucesso!");
      setOpen({ inactive: false });

      // Recarregar a página após 1 segundo
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error("Erro ao inativar notícia. Verifique o console.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Toaster />
      {open ? (
        <Modal>
          <InactiveModal
            handleChange={inactiveNew}
            title="Inativar notícia"
            description="Certeza que deseja inativar essa notícia?"
            setOpen={() => setOpen({ inactive: false })}
            loading={loading}
          />
        </Modal>
      ) : null}
    </>
  );
}
