"use client"

import { useState } from "react"
import { Toaster } from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../Context/authContext"
import { inactiveNewsService } from "../../Services/postsServices"
import { InactiveModal } from "../InactiveModal"
import { Modal } from "../Modal"

export function InactiveNews({ news, open, setOpen }) {
  const [loading, setLoading] = useState(false)
  const { token } = useAuth()
  const navigate = useNavigate()

  async function inactiveNew(e) {
    e.preventDefault()
    setLoading(true)

    try {
      const newsID = news.id
      await inactiveNewsService(newsID, token)
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
          <InactiveModal
            handleChange={inactiveNew}
            title="Inativar notícia"
            description="Certeza que deseja inativar essa notícia?"
            setOpen={() => setOpen(false)}
            loading={loading}
          />
        </Modal>
      ) : null}
    </>
  )
}
