/* eslint-disable @typescript-eslint/no-explicit-any, no-console */
export const logger = (prefix: string) => (
  message?: any,
  ...optionalParams: any[]
) => console.log(`[${prefix}] ` + message, optionalParams)
