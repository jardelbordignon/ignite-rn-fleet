import styled, { css } from 'styled-components/native'
import { Car, Key } from 'phosphor-react-native'

export const root = styled.View`
  width: 100%;
  margin: 32px 0;
  padding: 22px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
  flex-direction: row;
  align-items: center;
`

export const IconBox = styled.View`
  width: 77px;
  height: 77px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_600};
  margin-right: 12px;
  justify-content: center;
  align-items: center;
`

export const message = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_100};
    font-size: ${theme.FONT_SIZE.SM};
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `}
  flex: 1;
`

export const textHighlight = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.BRAND_LIGHT};
    font-family: ${theme.FONT_FAMILY.BOLD};
  `}
`

export const carSvg = styled(Car).attrs(({ theme }) => ({
  size: 32,
  color: theme.COLORS.BRAND_LIGHT,
}))``

export const keySvg = styled(Key).attrs(({ theme }) => ({
  size: 32,
  color: theme.COLORS.BRAND_LIGHT,
}))``
