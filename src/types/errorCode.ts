export const ERROR_CODES = {
  INVALID: 40103,
  UNAUTHORIZED: 40104,
  EXPIRED: 40105,
} as const;
export const ERRORS = new Set(Object.values(ERROR_CODES));

export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];
