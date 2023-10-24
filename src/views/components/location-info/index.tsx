import { IconBox, IconBoxProps } from '../icon-box'
import * as S from './styles'

export type LocationInfoProps = {
  label: string
  description: string
}

type Props = LocationInfoProps & {
  icon: IconBoxProps
}

export function LocationInfo({ label, icon, description }: Props) {
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
