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

import mermaid from "mermaid";
import { Interpreter } from "./steps/interpreter";
import { Lexer } from "./steps/lexer";
import { Parser } from "./steps/parser";
import { astToString, buildAST } from "./utils/ast";
import { buttonsDef, clearBtn, equalBtn } from "./utils/buttons";

mermaid.initialize({
  startOnLoad: false,
});

let inputValue = "";

const operation = document.getElementById("operation");
const history = document.getElementById("history");
const astElement = document.getElementById("ast-mermaid");

if (!operation) throw new Error("Operation element not found");
if (!history) throw new Error("History element not found");
if (!astElement) throw new Error("AST element not found");

async function evalInput(input: string) {
  const lexer = new Lexer(input);
  const tokens = lexer.tokenize();

  const parser = new Parser(tokens);
  const ast = parser.parse();

  const interpreter = new Interpreter(ast);
  const result = interpreter.interpret();

  const mermaidAST = buildAST(ast);

  if (astElement) {
    const { svg } = await mermaid.render(
      "astMermaid",
      astToString(mermaidAST),
      astElement
    );

    astElement.innerHTML = svg;
  }

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
    operation.focus();
    operation.scrollLeft = operation.scrollWidth;
  });
});

clearBtn.addEventListener("click", () => {
  inputValue = "";
  operation.innerHTML = inputValue;
  history.innerHTML = "";
});

equalBtn.addEventListener("click", async () => {
  try {
    const result = (await evalInput(inputValue)).toString();
    history.innerHTML = inputValue;

    inputValue = result;
    operation.innerHTML = result;
  } catch (err) {
    console.error(err);

    history.innerHTML = "";
    operation.innerHTML = "ERROR!";
  }
});
