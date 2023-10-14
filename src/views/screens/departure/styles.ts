import { Platform } from 'react-native'
import styled from 'styled-components/native'

export const root = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_800};
`

export const keyboardAvoidingView = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS === 'android' ? 'height' : 'position',
})``

export const content = styled.View`
  flex: 1;
  gap: 16px;
  padding: 32px;
  margin-top: 16px;
`
