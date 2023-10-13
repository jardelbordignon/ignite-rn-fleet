import styled, { css } from 'styled-components/native'
import MaskInput from 'react-native-mask-input'

export const root = styled.View`
  width: 100%;
  padding: 16px;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
`

export const label = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_300};
    font-size: ${theme.FONT_SIZE.SM};
    font-family: ${theme.FONT_FAMILY.REGULAR};
  `}
`

export const input = styled(MaskInput).attrs(({ theme }) => ({
  placeholderTextColor: theme.COLORS.GRAY_400,
  autoCapitalize: 'characters',
}))`
  ${({ theme }) => css`
    color: ${theme.COLORS.GRAY_200};
    font-size: ${theme.FONT_SIZE.XXXL};
    font-family: ${theme.FONT_FAMILY.BOLD};
  `}
  text-align: center;
  margin-top: 16px;
`
