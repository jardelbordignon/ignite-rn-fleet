import styled from 'styled-components/native'

export const root = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.COLORS.GRAY_800};
`

export const title = styled.Text`
  font-size: 32px;
`
