import { describe, expect, test } from "vitest";
import { evalInput } from "../main";

const getRandomNumber = (max: number = 100) => {
  const num = Math.random() * max;

  if (Math.random() < 0.5) {
    return num;
  }

  return Math.floor(num);
};

// describe("Test simple operations", () => {
//   test("Test simple addition", () => {
//     const result = evalInput("1 + 1");
//     expect(result).toBe(2);
//   });

//   test("Test simple subtraction", () => {
//     const result = evalInput("1 - 1");
//     expect(result).toBe(0);
//   });

//   test("Test simple multiplication", () => {
//     const result = evalInput("2 * 2");
//     expect(result).toBe(4);
//   });

//   test("Test simple division", () => {
//     const result = evalInput("4 / 2");
//     expect(result).toBe(2);
//   });
// });

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
  // Get an array of random numbers
  const numbersA = Array.from({ length: 100 }, getRandomNumber);
  const numbersB = Array.from({ length: 100 }, getRandomNumber);

  // Add the numbers together
  const results = numbersA.map((num, i) => num - numbersB[i]);

  // Test the results
  results.forEach((result, i) => {
    const a = numbersA[i];
    const b = numbersB[i];
    const expression = `${a} - ${b}`;
    expect(evalInput(expression)).toBe(result);
  });
});

test("Test multiplication", () => {
  // Get an array of random numbers
  const numbersA = Array.from({ length: 100 }, getRandomNumber);
  const numbersB = Array.from({ length: 100 }, getRandomNumber);

  // Add the numbers together
  const results = numbersA.map((num, i) => num * numbersB[i]);

  // Test the results
  results.forEach((result, i) => {
    const a = numbersA[i];
    const b = numbersB[i];
    const expression = `${a} * ${b}`;
    expect(evalInput(expression)).toBe(result);
  });
});

describe("Test division", () => {
  test("Test division", () => {
    // Get an array of random numbers
    const numbersA = Array.from({ length: 100 }, getRandomNumber);
    const numbersB = Array.from({ length: 100 }, getRandomNumber);

    // Add the numbers together
    const results = numbersA.map((num, i) => num / numbersB[i]);

    // Test the results
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
    expect(result).toBe(-1);
  });
});
