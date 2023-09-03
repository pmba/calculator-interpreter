import { TokenMatch, TokenOperators, TokenType } from "../shared/token/types";

export interface TreeNode {
  key: string;
  type: TokenType;
  left?: TreeNode;
  right?: TreeNode;
}

function throwUnexpectedToken(token: TokenMatch): never {
  console.log(token);
  throw new Error(`Unexpected token: '${token.match}' at ${token.col}`);
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

    const operations: TokenOperators[] = ["PLUS", "MINUS", "MUL", "DIV"];

    while (this.token()) {
      if (!operations.includes(this.token().type as TokenOperators)) {
        throwUnexpectedToken(this.token());
      }

      const key = this.token().match;
      const type = this.token().type;
      ++this.tokenIdx;

      const operator: TreeNode = {
        key,
        type,
        left: ast,
        right: this.parseExpression(),
      };

      ast = operator;
    }

    return ast;
  }

  private parseExpression(): TreeNode {
    const expression = this.parseTerm();

    if (
      !this.token() ||
      (this.token().type !== "PLUS" && this.token().type !== "MINUS")
    ) {
      return expression;
    }

    const key = this.token().match;
    const type = this.token().type;
    ++this.tokenIdx;

    const operator: TreeNode = {
      key,
      type,
      left: expression,
      right: this.parseTerm(),
    };

    return operator;
  }

  private parseTerm(): TreeNode {
    const term = this.parseFactor();

    if (
      !this.token() ||
      (this.token().type !== "MUL" && this.token().type !== "DIV")
    ) {
      return term;
    }

    const key = this.token().match;
    const type = this.token().type;
    ++this.tokenIdx;

    const operator: TreeNode = {
      key,
      type,
      left: term,
      right: this.parseFactor(),
    };

    return operator;
  }

  private parseFactor(): TreeNode {
    if (this.token().type === "NUMBER") {
      return this.parseNumber();
    } else if (this.token().type === "LPAREN") {
      const lparenIdx = this.tokenIdx;
      ++this.tokenIdx;

      const expression = this.parseExpression();

      if (!this.token() || this.token().type !== "RPAREN") {
        throw new Error(`Missing closing parenthesis at ${lparenIdx}`);
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
