import { css } from 'styled-components';

const title = {
  title: () => css`
    font-size: 36px;
    font-weight: 700;
  `,
};

const subtitle = {
  title: () => css`
    font-size: 24px;
    font-weight: 700;
  `,
};

export const typographies = {
  ...title,
  ...subtitle,
};
