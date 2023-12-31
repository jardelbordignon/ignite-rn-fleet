import styled, { css } from 'styled-components/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export const root = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_800};
`

export const keyboardAwareScrollView = styled(KeyboardAwareScrollView).attrs({
  extraHeight: 100,
})``

export const content = styled.View`
  flex: 1;
  gap: 16px;
  padding: 32px;
  margin-top: 16px;
`

export const message = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.WHITE};
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.SM};
  `}
  text-align: center;
  margin-top: 24px;
`
