import styled, { css } from 'styled-components/native'

export const root = styled.View`
  position: absolute;
  right: 0;
  left: 0;

  z-index: 1;

  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;

  padding-bottom: 4px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_500};
`

export const title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_100};
    font-size: ${theme.FONT_SIZE.SM};
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `}
`
