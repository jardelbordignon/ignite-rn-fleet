import styled, { css } from 'styled-components/native'

export const root = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
`

export const info = styled.View`
  flex: 1;
`

export const label = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_300};
    font-size: ${theme.FONT_SIZE.MD};
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `}
`

export const description = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_100};
    font-size: ${theme.FONT_SIZE.SM};
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `}
`
