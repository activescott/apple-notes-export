/* eslint-disable @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types,no-console */
export const logger = (prefix: string) => (
  message?: any,
  ...optionalParams: any[]
): void => console.log(`[${prefix}] ` + message, optionalParams)
