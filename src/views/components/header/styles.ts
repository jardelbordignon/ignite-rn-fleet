import { ArrowLeft } from 'phosphor-react-native'
import styled, { css } from 'styled-components/native'

export const root = styled.View`
  width: 100%;
  padding: 0 32px 24px;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
  z-index: 1;
`

export const title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_100};
    font-size: ${theme.FONT_SIZE.XL};
    font-family: ${theme.FONT_FAMILY.BOLD};
  `}
`

export const arrowLeftSvg = styled(ArrowLeft).attrs(({ theme }) => ({
  size: 24,
  color: theme.COLORS.BRAND_LIGHT,
}))``
