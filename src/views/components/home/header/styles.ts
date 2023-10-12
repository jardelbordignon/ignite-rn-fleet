import styled, { css } from 'styled-components/native'
import { Power } from 'phosphor-react-native'

export const root = styled.View`
  width: 100%;
  padding: 32px;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
`

export const greeting = styled.View`
  flex: 1;
  margin-left: 12px;
`

export const message = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_100};
    font-size: ${theme.FONT_SIZE.MD};
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `}
`

export const name = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_100};
    font-size: ${theme.FONT_SIZE.LG};
    font-family: ${theme.FONT_FAMILY.BOLD};
  `}
`

export const powerSvg = styled(Power).attrs(({ theme }) => ({
  size: 32,
  color: theme.COLORS.GRAY_400,
}))``
