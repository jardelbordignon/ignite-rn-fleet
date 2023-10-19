import * as S from './styles'

export type LocationInfoProps = {
  label: string
  description: string
}

export function LocationInfo({ label, description }: LocationInfoProps) {
  return (
    <S.root>
      <S.info>
        <S.label>{label}</S.label>
        <S.description>{description}</S.description>
      </S.info>
    </S.root>
  )
}
