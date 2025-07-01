"use client"

import { useState } from "react"
import { Toaster } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../Context/authContext"
import { publishNewsService } from "../../Services/postsServices"
import { PublishModal } from "../PublishModal"
import { Modal } from "../Modal"

export function PublishNews({ news, open, setOpen }) {
  const [loading, setLoading] = useState(false)
  const { token } = useAuth()
  const navigate = useNavigate()

  async function publishNew(e) {
    e.preventDefault()
    setLoading(true)

    try {
      const newsID = news.id
      await publishNewsService(newsID, token)
      setLoading(false)
      setOpen(false)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
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
            setOpen={() => setOpen(false)}
            loading={loading}
          />
        </Modal>
      ) : null}
    </>
  )
}
