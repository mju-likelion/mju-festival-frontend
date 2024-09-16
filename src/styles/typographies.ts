import { css } from 'styled-components';

const largeTitle = {
  largeTitle: () => css`
    font-size: 34px;
    font-weight: 700;
  `,
};

const title = {
  title1: () => css`
    font-size: 20px;
    font-weight: 600;
  `,
  title2: () => css`
    font-size: 20px;
    font-weight: 400;
  `,
};

const body = {
  body1: () => css`
    font-size: 17px;
    font-weight: 600;
  `,
  body2: () => css`
    font-size: 17px;
    font-weight: 400;
  `,
};

const subhead = {
  subhead1: () => css`
    font-size: 15px;
    font-weight: 600;
  `,
  subhead2: () => css`
    font-size: 15px;
    font-weight: 400;
  `,
};

const callout = {
  callout: () => css`
    font-size: 16px;
    font-weight: 400;
  `,
};

const foot = {
  footout: () => css`
    font-size: 13px;
    font-weight: 600;
  `,
  footnote: () => css`
    font-size: 13px;
    font-weight: 400;
  `,
};

const caption = {
  caption1: () => css`
    font-size: 11px;
    font-weight: 600;
  `,
  caption2: () => css`
    font-size: 11px;
    font-weight: 400;
  `,
};

export const typographies = {
  ...largeTitle,
  ...title,
  ...body,
  ...subhead,
  ...callout,
  ...foot,
  ...caption,
};
