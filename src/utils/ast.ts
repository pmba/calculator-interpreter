import { TreeNode } from "../steps/parser";

interface MermaidAST {
  header: string;
  defs: string[];
  graph: string[];
}

class ID {
  private static counter = 0;

  static new() {
    return (ID.counter++).toString();
  }
}

/**
 * Create a mermaid AST from a TreeNode
 * @param root The root of the tree
 */
export function buildAST(root: TreeNode) {
  const ast: MermaidAST = {
    header: "flowchart TB;",
    defs: [],
    graph: [],
  };

  const stack: { id: string; node: TreeNode }[] = [
    {
      id: ID.new(),
      node: root,
    },
  ];

  while (stack.length > 0) {
    const node = stack.pop();

    if (!node) {
      throw new Error("Node is undefined");
    }

    const {
      id,
      node: { key, type, left, right },
    } = node;

    ast.defs.push(`${id}([${key}]):::${type};`);

    if (left) {
      const leftId = ID.new();
      ast.graph.push(`${id} --> ${leftId};`);
      stack.push({ id: leftId, node: left });
    }

    if (right) {
      const rightId = ID.new();
      ast.graph.push(`${id} --> ${rightId};`);
      stack.push({ id: rightId, node: right });
    }
  }

  return ast;
}

export function astToString(ast: MermaidAST) {
  const { header, defs, graph } = ast;

  return `
  ${header}
  ${defs.join("\n")}
  ${graph.join("\n")}
  `;
}
