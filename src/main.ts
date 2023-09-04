/*
Expression -> Expression '+' Term  
| Expression '-' Term
| Term

Term ->  Term '*' Factor
| Term '/' Factor
| Factor

Factor -> ( Expression )
| Number
*/

import { Interpreter } from "./steps/interpreter";
import { Lexer } from "./steps/lexer";
import { Parser } from "./steps/parser";

const exprInput = document.getElementById("expr-input") as HTMLInputElement;
const submitBtn = document.getElementById("submit-btn") as HTMLButtonElement;

submitBtn.onclick = () => {
  const input = exprInput.value;

  if (!input) return;
  const result = evalInput(input);

  exprInput.value = result.toString();
};

function evalInput(input: string) {
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
  const input = "(1 + 2) * (3 - 4) / 5";
  const result = evalInput(input);

  console.log(result);
}

main();
