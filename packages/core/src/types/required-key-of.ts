export type RequiredKeyOf<T> = keyof {
    [K in keyof T as {} extends Pick<T, K> ? never : K]: K;
};
