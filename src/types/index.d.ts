// global types
declare global {
  export interface ObjectConstructor {
    keys<T extends object = object> (o: T): Array<Extract<keyof T, string>>;
  }
}

export type PartialExcept<T, K extends keyof T> = Pick<T, K> & Partial<Omit<T, K>>
