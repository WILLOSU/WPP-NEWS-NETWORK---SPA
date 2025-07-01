"use client"

import { Edit, MessageCircle, MoreVertical, ThumbsUp, Trash, EyeOff, Send, Clock, Eye } from "lucide-react"

import { useMemo, useState } from "react"

import { Toaster, toast } from "react-hot-toast"

import { formatData } from "../../Services/formatDate"

import { initialName } from "../../Services/initialName"

import { likeTheNewsService } from "../../Services/postsServices"

import { Comments } from "../Commets"

import { DeleteNews } from "../DeleteNews/index"

import { EditNews } from "../EditNews/index"

import { InactiveNews } from "../InactiveNews/index"

import { PublishNews } from "../PublishNews/index"

import { useAuth } from "../../Context/authContext"

import * as S from "./styles"

export function Card({ news }) {
  const [open, setOpen] = useState({
    updated: false,
    deleted: false,
    doComments: false,
    inactive: false,
    published: false,
  })

  const [openOptions, setOpenOptions] = useState(false)

  const [likes, setLikes] = useState(news.likes || [])

  const [comment, setComment] = useState(news.comments || [])

  const { user, token } = useAuth()

  const liked = useMemo(() => {
    return likes.some((item) => item.userId === user?._id)
  }, [likes])

  const commented = useMemo(() => {
    return comment.some((item) => item.userId === user?._id)
  }, [comment])

  // Função para renderizar o status da notícia
  const renderStatusBadge = () => {
    if (!news.status || news.status === "published") return null

    const statusConfig = {
      pending: {
        icon: <Clock size={14} />,
        text: "Aguardando aprovação",
        color: "#f59e0b", // amarelo
        bgColor: "#fef3c7",
      },
      inactive: {
        icon: <EyeOff size={14} />,
        text: "Inativa",
        color: "#6b7280", // cinza
        bgColor: "#f3f4f6",
      },
      rejected: {
        icon: <Eye size={14} />,
        text: "Rejeitada",
        color: "#dc2626", // vermelho
        bgColor: "#fee2e2",
      },
    }

    const config = statusConfig[news.status]
    if (!config) return null

    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          padding: "4px 8px",
          borderRadius: "12px",
          fontSize: "12px",
          fontWeight: "500",
          color: config.color,
          backgroundColor: config.bgColor,
          border: `1px solid ${config.color}20`,
          marginBottom: "8px",
        }}
      >
        {config.icon}
        {config.text}
      </div>
    )
  }

  async function doLikeNews() {
    if (!token) {
      return toast("Faça o Login para curtir a notícia!", {
        icon: "👍",
        style: {
          backgroundColor: "rgb(6, 72, 158)",
          color: "#fff",
        },
      })
    }

    const userLiked = likes.some((like) => like.userId === user?._id)

    !userLiked
      ? setLikes([...likes, { userId: user?._id }])
      : setLikes(likes.filter((like) => like.userId !== user?._id))

    const newsId = news.id

    await likeTheNewsService(newsId, token)
  }

  const { updated, deleted, doComments, inactive, published } = open

  if (updated) {
    return <EditNews news={news} open={open} setOpen={setOpen} />
  }

  if (deleted) {
    return <DeleteNews news={news} open={open} setOpen={setOpen} />
  }

  if (doComments) {
    return <Comments news={news} open={open.doComments} setOpen={setOpen} />
  }

  if (inactive) {
    return <InactiveNews news={news} open={open.inactive} setOpen={setOpen} />
  }

  if (published) {
    return <PublishNews news={news} open={open.published} setOpen={setOpen} />
  }

  return (
    <S.CardContainer>
      <Toaster />

      <S.ContainerProfile>
        <S.UserData>
          {news?.userAvatar ? (
            <S.ProfileImage src={news?.userAvatar} />
          ) : (
            <S.ProfileWithoutImage>{initialName(news.name)}</S.ProfileWithoutImage>
          )}

          <div>
            <S.UserName>{news?.name}</S.UserName>
            <S.CreatedAt>há {formatData(news.creatAt)}</S.CreatedAt>
          </div>
        </S.UserData>

        {(user?.username === news?.userName || user?.role === "admin") && (
          <S.ButtonMenuCard onClick={() => setOpenOptions(!openOptions)}>
            <MoreVertical className="dots" />
            <S.NavCard openOptions={openOptions}>
              <S.BottonNav onClick={() => setOpen({ updated: true })}>
                <Edit size={18} />
              </S.BottonNav>
              <S.BottonNav onClick={() => setOpen({ deleted: true })}>
                <Trash size={18} />
              </S.BottonNav>

              {user?.role === "admin" && (
                <>
                  <S.BottonNav onClick={() => setOpen({ inactive: true })}>
                    <EyeOff size={18} />
                  </S.BottonNav>
                  <S.BottonNav onClick={() => setOpen({ published: true })}>
                    <Send size={18} />
                  </S.BottonNav>
                </>
              )}
            </S.NavCard>
          </S.ButtonMenuCard>
        )}
      </S.ContainerProfile>

      <S.CardBody>
        {renderStatusBadge()}
        <S.Text>
          <h2>{news?.title}</h2>
          <p>{news?.text}</p>
        </S.Text>

        {news.banner && <S.ImageNews src={news?.banner} alt={news?.title} />}
      </S.CardBody>

      <S.CardFooter>
        <S.ButtonLike onClick={doLikeNews}>
          {liked ? <ThumbsUp color="#003479" fill="#004AAD" size={18} /> : <ThumbsUp color="#757575" size={18} />}
          <span>{likes.length}</span>
        </S.ButtonLike>

        <button onClick={() => setOpen({ doComments: true })}>
          {commented ? (
            <MessageCircle color="#003479" fill="#004AAD" size={18} />
          ) : (
            <MessageCircle color="#757575" size={18} />
          )}
          <span>{comment.length}</span>
        </button>
      </S.CardFooter>
    </S.CardContainer>
  )
}
