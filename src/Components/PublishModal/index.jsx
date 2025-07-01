"use client"

import * as S from "./styles"

export function PublishModal({ handleChange, title, description, setOpen, loading }) {
  return (
    <S.Wrapper>
      <S.Container>
        <S.Title>{title}</S.Title>
        <S.Content>
          <S.Description>{description}</S.Description>
          <S.ButtonContainer>
            <S.ButtonConfirm onClick={handleChange} disabled={loading}>
              {loading ? "Publicando..." : "Sim"}
            </S.ButtonConfirm>
            <S.ButtonNo onClick={setOpen}>Não</S.ButtonNo>
          </S.ButtonContainer>
        </S.Content>
      </S.Container>
    </S.Wrapper>
  )
}
