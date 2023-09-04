import { describe, expect, test } from "vitest";
import { Interpreter } from "../steps/interpreter";
import { Lexer } from "../steps/lexer";
import { Parser } from "../steps/parser";

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

const getRandomNumber = (max: number = 100) => {
  const num = Math.random() * max;

  if (Math.random() < 0.5) {
    return num;
  }

  return Math.floor(num);
};

test("Test addition", () => {
  // Get an array of random numbers
  const numbersA = Array.from({ length: 100 }, getRandomNumber);
  const numbersB = Array.from({ length: 100 }, getRandomNumber);

  // Add the numbers together
  const results = numbersA.map((num, i) => num + numbersB[i]);

  // Test the results
  results.forEach((result, i) => {
    const a = numbersA[i];
    const b = numbersB[i];
    const expression = `${a} + ${b}`;
    expect(evalInput(expression)).toBe(result);
  });
});

test("Test subtraction", () => {
  const numbersA = Array.from({ length: 100 }, getRandomNumber);
  const numbersB = Array.from({ length: 100 }, getRandomNumber);

  const results = numbersA.map((num, i) => num - numbersB[i]);

  results.forEach((result, i) => {
    const a = numbersA[i];
    const b = numbersB[i];
    const expression = `${a} - ${b}`;
    expect(evalInput(expression)).toBe(result);
  });
});

test("Test multiplication", () => {
  const numbersA = Array.from({ length: 100 }, getRandomNumber);
  const numbersB = Array.from({ length: 100 }, getRandomNumber);

  const results = numbersA.map((num, i) => num * numbersB[i]);

  results.forEach((result, i) => {
    const a = numbersA[i];
    const b = numbersB[i];
    const expression = `${a} * ${b}`;
    expect(evalInput(expression)).toBe(result);
  });
});

describe("Test division", () => {
  test("Test division", () => {
    const numbersA = Array.from({ length: 100 }, getRandomNumber);
    const numbersB = Array.from({ length: 100 }, getRandomNumber);

    const results = numbersA.map((num, i) => num / numbersB[i]);

    results.forEach((result, i) => {
      const a = numbersA[i];
      const b = numbersB[i];
      const expression = `${a} / ${b}`;

      if (b === 0) {
        expect(() => evalInput(expression)).toThrow();
        return;
      }

      expect(evalInput(expression)).toBe(result);
    });
  });

  test("Test division by zero", () => {
    expect(() => evalInput("404 / 0")).toThrow();
    expect(() => evalInput("123 / 0")).toThrow();
    expect(() => evalInput("50.5 / 0")).toThrow();
  });
});

describe("Test complex expressions", () => {
  test("Test complex addition", () => {
    const result = evalInput("1 + 1 + 1 + 1 + 1");
    expect(result).toBe(5);
  });

  test("Test complex subtraction", () => {
    const result = evalInput("10 - 5 - 2 - 1 - 1");
    expect(result).toBe(1);
  });

  test("Test complex multiplication", () => {
    const result = evalInput("2 * 2 * 2 * 2 * 2");
    expect(result).toBe(32);
  });

  test("Test complex division", () => {
    const result = evalInput("100 / 10 / 2 / 2 / 2");
    expect(result).toBe(1.25);
  });

  test("Test complex expressions", () => {
    const result = evalInput("1 + 2 * 3 - 4 / 5");
    expect(result).toBe(6.2);
  });

  test("Test complex expressions", () => {
    const result = evalInput("1 + 2 * 3 - 4 / 5");
    expect(result).toBe(6.2);
  });

  test("Test complex expressions with parenthesis", () => {
    const result = evalInput("(1 + 2) * (3 - 4) / 5");
    expect(result).toBe(-0.6);
  });
});
