/*
Expression -> Expression '+' Term  
| Expression '-' Term
| Term

Term ->  ( Expression )
| Term \* Factor
| Term / Factor
| Factor

Factor -> Number
| ( Expression )

Number -> Digit Number
| Digit

Digit -> '0-9'
*/

import { Interpreter } from "./steps/interpreter";
import { Lexer } from "./steps/lexer";
import { Parser } from "./steps/parser";

export function evalInput(input: string) {
  const lexer = new Lexer(input);
  const tokens = lexer.tokenize();

  const parser = new Parser(tokens);
  const ast = parser.parse();

  console.log(JSON.stringify(ast, null, 2));

  const interpreter = new Interpreter(ast);
  const result = interpreter.interpret();

  return result;
}

function main() {
  const input = "(10.5/2)*4/5";
  const result = evalInput(input);

  console.log(result);
}

main();
