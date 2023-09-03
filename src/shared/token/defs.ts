import { Token, TokenOperators } from "./types";

export const TOKEN_PATTERNS: Token[] = [
  { type: "NUMBER", pattern: /\d+/ },
  { type: "PLUS", pattern: /\+/ },
  { type: "MINUS", pattern: /-/ },
  { type: "MUL", pattern: /\*/ },
  { type: "DIV", pattern: /\// },
  { type: "LPAREN", pattern: /\(/ },
  { type: "RPAREN", pattern: /\)/ },
  { type: "DOT", pattern: /\./ },
];

type OperatorFunction = (a: number, b: number) => number;

export const TOKEN_OPERATORS: Record<TokenOperators, OperatorFunction> = {
  PLUS: (a: number, b: number) => a + b,
  MINUS: (a: number, b: number) => a - b,
  MUL: (a: number, b: number) => a * b,
  DIV: (a: number, b: number) => {
    if (b === 0) {
      throw new Error("Division by zero");
    }

    return a / b;
  },
};
