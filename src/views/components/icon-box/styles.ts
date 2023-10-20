import styled, { css } from 'styled-components/native'

export type SizeOpts = 'SMALL' | 'NORMAL'

type Props = {
  size: SizeOpts
}

const variantSizeStyles = (size: SizeOpts) => {
  return {
    SMALL: css`
      width: 32px;
      height: 32px;
    `,
    NORMAL: css`
      width: 46px;
      height: 46px;
    `,
  }[size]
}

export const root = styled.View<Props>`
  border-radius: 6px;
  background-color: ${({ theme }) => theme.COLORS.GRAY_700};
  justify-content: center;
  align-items: center;
  margin-right: 12px;
  ${({ size }) => variantSizeStyles(size)};
`
