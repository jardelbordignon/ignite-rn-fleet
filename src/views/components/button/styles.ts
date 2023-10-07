import styled, { css } from 'styled-components/native'

export const root = styled.Pressable.attrs(({ theme }) => ({
  android_ripple: { color: theme.COLORS.BRAND_LIGHT },
}))`
  flex: 1;
  min-height: 56px;
  max-height: 56px;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.COLORS.BRAND_MID};
`

export const title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.WHITE};
    font-size: ${theme.FONT_SIZE.MD};
    font-family: ${theme.FONT_FAMILY.BOLD};
  `}
`

export const submittingIndicator = styled.ActivityIndicator.attrs(({ theme }) => ({
  color: theme.COLORS.WHITE,
}))``
