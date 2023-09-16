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

import { buttonsDef, clearBtn, equalBtn } from "./buttons";
import { Interpreter } from "./steps/interpreter";
import { Lexer } from "./steps/lexer";
import { Parser } from "./steps/parser";

let inputValue = "0";

const operation = document.getElementById("operation");
const history = document.getElementById("history");

if (!operation) throw new Error("Operation element not found");
if (!history) throw new Error("History element not found");

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

buttonsDef.forEach(({ id, action }) => {
  const element = document.getElementById(id);

  if (!element) {
    throw new Error(`Element with id ${id} not found`);
  }

  element.addEventListener("click", () => {
    inputValue = action(inputValue);
    operation.innerHTML = inputValue;
  });
});

clearBtn.addEventListener("click", () => {
  inputValue = "0";
  operation.innerHTML = inputValue;
  history.innerHTML = "";
});

equalBtn.addEventListener("click", () => {
  const result = evalInput(inputValue).toString();
  history.innerHTML = inputValue;

  inputValue = result;
  operation.innerHTML = result;
});
