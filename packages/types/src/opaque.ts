declare const tag: unique symbol;

type Tagged<Token> = { readonly [tag]: Token };

export type Opaque<BaseType, Token> = BaseType & Tagged<Token>;
