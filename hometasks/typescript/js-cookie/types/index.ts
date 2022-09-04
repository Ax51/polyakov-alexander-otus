export interface Converter {
  read: (value: string, name?: string) => string;
  write: (value: string | number | boolean) => string;
}

export interface Attributes {
  path?: string;
  domain?: string;
  expires?: number | string | Date;
  sameSite?: "strict" | "Strict" | "lax" | "Lax" | "none" | "None";
  secure?: boolean;
  [property: string]: any;
}

export type setCookie = (
  name: string,
  value: string,
  attributes: Attributes
) => string | void;

export type getCookie = (name: string) => string | Attributes | void;

export interface Cookies {
  set: setCookie;
  get: getCookie;
  withAttributes: () => void;
  withConverter: () => void;
}
