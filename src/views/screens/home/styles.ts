import styled, { css } from 'styled-components/native'

export const root = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_800};
`

export const content = styled.View`
  flex: 1;
  padding: 0 32px;
`

export const title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.WHITE};
    font-size: ${theme.FONT_SIZE.MD};
    font-family: ${theme.FONT_FAMILY.BOLD};
  `}
  margin-bottom: 12px;
`

export const label = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_400};
    font-size: ${theme.FONT_SIZE.SM};
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `}
  margin-top: 32px;
  text-align: center;
`
