"use client";

import { ArrowLeftCircle, Plus, UserCog } from "lucide-react";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../Components/Button";
import { Card } from "../../Components/Cards/index";
import { CreateNews } from "../../Components/CreateNews/index";
import { EditUser } from "../../Components/EditUser/index";
import { useAuth } from "../../Context/authContext";
import { initialName } from "../../Services/initialName";
import {
  getNewsByUserService,
  getNewsForAdminViewService,
} from "../../Services/postsServices";
import * as S from "./styles";

export function Profile() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState({
    newNews: false,
    editUser: false,
  });

  const { user, token, signOut } = useAuth();
  const navigate = useNavigate();

  const getNews = async () => {
    try {
      setLoading(true);
      let response;

      if (user?.role === "admin") {
        response = await getNewsForAdminViewService(token, 0, 50);
      } else {
        response = await getNewsByUserService(token);
      }

      if (!response.ok) {
        // Tentar ler o erro da resposta
        try {
          const errorData = await response.json();
        } catch (e) {}

        throw new Error(`Erro na API: ${response.status}`);
      }

      const data = await response.json();

      const { results, message } = data;

      if (message === "Token Invalid!") {
        toast.error("Sua sessão expirou. Faça o Login novamente!", {
          duration: 3000,
        });
        setTimeout(() => {
          signOut();
        }, 3000);
        return;
      }

      if (results && results.length > 0) {
      }

      setNews(results || []);
    } catch (error) {
      toast.error(`Erro ao carregar notícias: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && token) {
      getNews();
    } else {
      console.log();
    }
  }, [user, token]);

  if (open.newNews) {
    return <CreateNews open={open.newNews} setOpen={setOpen} />;
  }

  if (open.editUser) {
    return <EditUser open={open.editUser} setOpen={setOpen} />;
  }

  return (
    <>
      <Toaster />
      <S.ProfileBody>
        <S.ContentSettings>
          <S.Settings>
            <Link to="/">
              <ArrowLeftCircle size={24} />
            </Link>
          </S.Settings>
          <S.Settings>
            <UserCog size={24} onClick={() => setOpen({ editUser: true })} />
          </S.Settings>
        </S.ContentSettings>

        <S.ContainerCardProfile>
          {!user?.banner ? (
            <div style={{ background: "rgb(0, 55, 128)", height: "8rem" }} />
          ) : (
            <S.BackgroundImage
              style={{
                backgroundImage: `url(${user?.background})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            />
          )}
          {user?.avatar ? (
            <img
              className="img-profile"
              src={user?.avatar || "/placeholder.svg"}
              alt="User profile photo"
            />
          ) : (
            <div className="img-profile profile">
              <h1>{initialName(user?.name)}</h1>
            </div>
          )}
          <S.BoxText>
            <div>
              <h1 className="name">{user?.name}</h1>
              <p>{user?.username}</p>
              {user?.role === "admin" && (
                <p
                  style={{
                    color: "rgb(0, 55, 128)",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                  }}
                ></p>
              )}
            </div>
            <Button
              title="Adicionar notícia"
              withOutColor
              onClick={() => setOpen({ newNews: true })}
            >
              <Plus size={16} color="rgb(0, 55, 128)" />
              Escrever
            </Button>
          </S.BoxText>
        </S.ContainerCardProfile>

        {loading ? (
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <p>Carregando notícias...</p>
          </div>
        ) : news?.length ? (
          <>
            <div
              style={{
                padding: "1rem",
                backgroundColor: user?.role === "admin" ? "#f0f9ff" : "#f0fdf4",
                border: `1px solid ${
                  user?.role === "admin" ? "#0ea5e9" : "#22c55e"
                }`,
                borderRadius: "8px",
                margin: "1rem 0",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  color: user?.role === "admin" ? "#0369a1" : "#15803d",
                  fontWeight: "bold",
                }}
              >
                {user?.role === "admin"
                  ? `📋 Painel de Moderação - ${news.length} notícia(s)`
                  : `📝 Suas Notícias - ${news.length} notícia(s)`}
              </p>
            </div>
            {news?.map((item) => (
              <Card key={item.id} news={item} />
            ))}
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "2rem" }}>
            {user?.role === "admin" ? (
              <h1>❌ Nenhuma notícia encontrada no sistema.</h1>
            ) : (
              <h1>
                Olá {user?.name}!{" "}
                <button
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "1.5rem",
                    color: "rgb(0, 55, 128)",
                  }}
                  onClick={() => setOpen({ newNews: true })}
                >
                  Crie sua primeira notícia
                </button>
              </h1>
            )}
          </div>
        )}
      </S.ProfileBody>
    </>
  );
}
