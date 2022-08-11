import { Element, Node } from "./deps.ts";

function nodeTagName(node: unknown): string | null {
  if (node instanceof Element) {
    const element = node as Element;
    return element.localName.toLowerCase();
  } else {
    return null;
  }
}

export class NodeStepper {
  nodes: string[];
  i = 0;

  constructor(nodes: ArrayLike<Node>, removeEmpty = true) {
    this.nodes = Array.from(nodes).filter((node) =>
      (!removeEmpty || node.textContent.trim() !== "") ||
      nodeTagName(node) === "br"
    ).map((node) =>
      nodeTagName(node) === "br" ? "\n" : node.textContent.trim()
    );
  }

  get currentNode(): string {
    return this.nodes[this.i];
  }

  step(count = 1): string {
    const start = this.i;
    this.i += count;
    if (this.i >= this.nodes.length) {
      throw new Error(
        `Stepping out of bounds! (stepping from ${start} by ${count} to ${this.i} with a node count of ${this.nodes.length})`,
      );
    }
    return this.currentNode;
  }

  next(): string {
    return this.step(1);
  }

  stepToNextBR() {
    for (; this.currentNode && this.currentNode !== "\n"; this.step()) {
      // do nothing
    }
  }

  collectTextToNextBR(separator = " "): string {
    const nodes = [];
    for (; this.currentNode && this.currentNode !== "\n"; this.step()) {
      nodes.push(this.currentNode);
    }
    return nodes.join(separator);
  }

  collectTextToNextNodeContaining(containing: string, separator = ""): string {
    const nodes = [];
    for (
      ;
      this.currentNode && !this.currentNode.includes(containing);
      this.step()
    ) {
      nodes.push(this.currentNode);
    }
    return nodes.join(separator);
  }

  stepToNextNodeContaining(containing: string) {
    for (
      ;
      this.currentNode && !this.currentNode.includes(containing);
      this.step()
    ) {
      // do nothing
    }
  }
}
