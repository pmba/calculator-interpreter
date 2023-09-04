import { TOKEN_PATTERNS } from "../shared/token/defs";
import { Token, TokenMatch } from "../shared/token/types";

export class Lexer {
  private input: string;

  constructor(input: string) {
    this.input = input;
  }

  private getToken(inputSlice: string): Token | undefined {
    for (const tokenPattern of TOKEN_PATTERNS) {
      if (tokenPattern.pattern.test(inputSlice)) {
        return tokenPattern;
      }
    }
  }

  private postProcess(tokens: TokenMatch[]): TokenMatch[] {
    if (this.input.length > 0 && tokens.length === 0) {
      throw new SyntaxError(`Invalid token at 0`);
    }

    // Sum adjacent NUMBER tokens
    const newTokens: TokenMatch[] = [];

    let i = 0;
    while (i < tokens.length) {
      const token = tokens[i];

      if (token.type === "NUMBER") {
        let j = i + 1;
        while (
          j < tokens.length &&
          (tokens[j].type === "NUMBER" || tokens[j].type === "DOT")
        ) {
          token.match += tokens[j].match;
          ++j;
        }
        i = j - 1;

        // Check if the number is a valid float number
        if (token.match.split(".").length > 2) {
          throw new Error(
            `Invalid float number: '${token.match}' at ${token.col}`
          );
        }
      }

      newTokens.push(token);
      ++i;
    }

    return newTokens;
  }

  /**
   * Tokenize the input string
   * @returns The token list
   */
  public tokenize(): TokenMatch[] {
    const tokens: TokenMatch[] = [];

    let start = 0;
    let count = 0;

    const fmtInput = this.input.replace(/\s+/g, "");

    while (count < fmtInput.length) {
      const slice = fmtInput.slice(start, count + 1);

      const token = this.getToken(slice);

      if (token) {
        tokens.push({
          ...token,
          match: slice,
          col: start,
        });
        start = count + 1;
      }

      ++count;
    }

    // Verify if all the input characters were tokenized
    if (start < fmtInput.length) {
      throw new SyntaxError(`Invalid token at ${start}`);
    }

    // Post-process the tokens
    const postProcessedTokens = this.postProcess(tokens);

    return postProcessedTokens;
  }
}
