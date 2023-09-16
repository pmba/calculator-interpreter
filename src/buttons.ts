interface ButtonDef {
  id: string;
  action: (current: string) => string;
}

export const buttonsDef: ButtonDef[] = [
  {
    id: "lpar",
    action: (current) => current + "(",
  },
  {
    id: "rpar",
    action: (current) => current + ")",
  },
  {
    id: "divide",
    action: (current) => current + "/",
  },
  {
    id: "times",
    action: (current) => current + "*",
  },
  {
    id: "minus",
    action: (current) => current + "-",
  },
  {
    id: "plus",
    action: (current) => current + "+",
  },
  {
    id: "dot",
    action: (current) => current + ".",
  },
  ...Array.from({ length: 10 }).reduce<ButtonDef[]>((acc, _, i) => {
    acc.push({
      id: `key-${i}`,
      action: (current) => current + i,
    });
    return acc;
  }, []),
];

export const clearBtn = document.getElementById("clear") as HTMLButtonElement;
export const equalBtn = document.getElementById("equal") as HTMLButtonElement;
