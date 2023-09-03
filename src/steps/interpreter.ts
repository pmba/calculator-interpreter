import { TOKEN_OPERATORS } from "../shared/token/defs";
import { TreeNode } from "./parser";

export class Interpreter {
  private ast: TreeNode;

  constructor(ast: TreeNode) {
    this.ast = ast;
  }

  private visit(node: TreeNode): number {
    if (node.left && node.right) {
      const left = this.visit(node.left);
      const right = this.visit(node.right);

      const operator = node.type as keyof typeof TOKEN_OPERATORS;
      console.log(operator, left, right);

      return TOKEN_OPERATORS[operator](left, right);
    }

    return Number(node.key);
  }

  public interpret(): number {
    return this.visit(this.ast);
  }
}
