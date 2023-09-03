# Calculator Interpreter

This is a simple calculator interpreter written in Typescript.

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

## TODO

- [x] Lexer
- [x] Parser
- [x] Interpreter
- [x] Add support for floating point numbers
- [ ] Add support for unary operators
