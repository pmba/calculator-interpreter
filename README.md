# Calculator Interpreter

:construction_worker: Work In Progress

This is a simple calculator interpreter written in Typescript.

## Preview

Check the preview at https://calculator.pmba.dev/

## Grammar

```
Expression: Expression '+' Term
| Expression '-' Term
| Term

Term: ( Expression )
| Term \* Factor
| Term / Factor
| Factor

Factor: Number
| ( Expression )

Number: Digit Number
| Digit

Digit: '0-9'
```

## Installation & Setup

```bash
git clone https://github.com/pmba/calculator-interpreter
cd calculator-interpreter
yarn # or npm install
yarn dev # or npm run dev
```

## TODO

- [x] Lexer
- [x] Parser
- [x] Interpreter
- [x] Add support for floating point numbers
- [ ] Add support for unary operators
