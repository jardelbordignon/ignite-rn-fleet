import styled from 'styled-components/native'

import theme from 'src/theme'

export const root = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${theme.COLORS.GRAY_800};
`

export const loadingIndicator = styled.ActivityIndicator.attrs({
  color: theme.COLORS.BRAND_LIGHT
})``
