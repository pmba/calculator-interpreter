export type TokenOperators = "PLUS" | "MINUS" | "MUL" | "DIV";

export type TokenType = TokenOperators | "NUMBER" | "LPAREN" | "RPAREN" | "DOT";

export interface Token {
  pattern: RegExp;
  type: TokenType;
}

export interface TokenMatch extends Token {
  match: string;
  col: number;
}
