import { TokenMatch, TokenType } from "../shared/token/types";

export interface TreeNode {
  key: string;
  type: TokenType;
  left?: TreeNode;
  right?: TreeNode;
}

function throwUnexpectedToken(token: TokenMatch): never {
  if (!token) {
    throw new SyntaxError(`Unexpected EOF`);
  }

  throw new SyntaxError(`Unexpected token: '${token.match}' at ${token.col}`);
}

export class Parser {
  private tokens: TokenMatch[];
  private tokenIdx: number = 0;

  constructor(tokens: TokenMatch[]) {
    this.tokens = tokens;
  }

  private token(): TokenMatch {
    return this.tokens[this.tokenIdx];
  }

  public parse(): TreeNode {
    let ast = this.parseExpression();

    return ast;
  }

  private parseExpression(): TreeNode {
    let expression = this.parseTerm();

    while (
      this.token() &&
      (this.token().type === "PLUS" || this.token().type === "MINUS")
    ) {
      const key = this.token().match;
      const type = this.token().type;
      ++this.tokenIdx;

      expression = {
        key,
        type,
        left: expression,
        right: this.parseTerm(),
      };
    }

    if (this.token() && this.token().type !== "RPAREN") {
      throwUnexpectedToken(this.token());
    }

    return expression;
  }

  private parseTerm(): TreeNode {
    let term = this.parseFactor();

    while (
      this.token() &&
      (this.token().type === "MUL" || this.token().type === "DIV")
    ) {
      const key = this.token().match;
      const type = this.token().type;
      ++this.tokenIdx;

      term = {
        key,
        type,
        left: term,
        right: this.parseFactor(),
      };
    }

    return term;
  }

  private parseFactor(): TreeNode {
    if (!this.token()) throwUnexpectedToken(this.token());

    if (this.token().type === "NUMBER") {
      return this.parseNumber();
    } else if (this.token().type === "LPAREN") {
      const lparenIdx = this.tokenIdx;
      ++this.tokenIdx;

      const expression = this.parseExpression();

      if (!this.token() || this.token().type !== "RPAREN") {
        throw new SyntaxError(`Missing closing parenthesis at ${lparenIdx}`);
      }

      ++this.tokenIdx;

      return expression;
    } else {
      throwUnexpectedToken(this.token());
    }
  }

  private parseNumber(): TreeNode {
    const number: TreeNode = {
      key: this.token().match,
      type: this.token().type,
    };

    ++this.tokenIdx;

    return number;
  }
}
