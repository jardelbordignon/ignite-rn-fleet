import { IconBox, IconBoxProps } from '../icon-box'
import * as S from './styles'

export type LocationInfoProps = {
  label: string
  description: string
  icon: IconBoxProps
}

export function LocationInfo({ label, icon, description }: LocationInfoProps) {
  return (
    <S.root>
      <IconBox icon={icon} />

      <S.info>
        <S.label>{label}</S.label>
        <S.description>{description}</S.description>
      </S.info>
    </S.root>
  )
}
