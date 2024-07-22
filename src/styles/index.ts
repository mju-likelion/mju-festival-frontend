import { colors } from './colors';
import { typographies } from './typographies';

export const theme = {
  colors,
  typographies,
};

export type Theme = typeof theme;

export * from './colors';
export * from './typographies';
