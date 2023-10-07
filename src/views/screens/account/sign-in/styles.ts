import styled, { css } from 'styled-components/native'

export const root = styled.ImageBackground`
  flex: 1;
  justify-content: center;
  padding: 52px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_800};
  gap: 10px;
`

export const title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.BRAND_LIGHT};
    font-size: ${theme.FONT_SIZE.XXXL};
    font-family: ${theme.FONT_FAMILY.BOLD};
  `}
  text-align: center;
`

export const slogan = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_100};
    font-size: ${theme.FONT_SIZE.MD};
  `}
  text-align: center;
  margin-bottom: 32px;
`
