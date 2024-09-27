export const ERROR_CODES = {
  UNAUTHORIZED: 40104,
} as const;

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];
