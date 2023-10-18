import styled, { css } from 'styled-components/native'

export const root = styled.Pressable.attrs(({ theme }) => ({
  android_ripple: { color: theme.COLORS.GRAY_400 },
}))`
  width: 100%;
  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
  padding: 20px 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border-radius: 6px;
  margin-bottom: 12px;
`

export const info = styled.View`
  flex: 1;
`

export const licensePlate = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.WHITE};
    font-size: ${theme.FONT_SIZE.MD};
    font-family: ${theme.FONT_FAMILY.BOLD};
  `}
`

export const departure = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_200};
    font-size: ${theme.FONT_SIZE.XS};
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `}
  margin-top: 4px;
`
