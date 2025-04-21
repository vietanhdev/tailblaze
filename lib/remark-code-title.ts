import { visit } from 'unist-util-visit'
import type { Node, Parent } from 'unist'

interface CodeNode extends Node {
  lang?: string
  type: 'code'
}

interface MdxJsxAttribute {
  type: 'mdxJsxAttribute'
  name: string
  value: string
}

interface MdxJsxFlowElement extends Node {
  type: 'mdxJsxFlowElement'
  name: string
  attributes: MdxJsxAttribute[]
  children: Node[]
  data: { _xdmExplicitJsx: boolean }
}

interface TextNode extends Node {
  type: 'text'
  value: string
}

export default function remarkCodeTitles() {
  return (tree: Node) =>
    visit(tree, 'code', (node: CodeNode, index: number, parent: Parent) => {
      const nodeLang = node.lang || ''
      let language = ''
      let title = ''

      if (nodeLang.includes(':')) {
        language = nodeLang.slice(0, nodeLang.search(':'))
        title = nodeLang.slice(nodeLang.search(':') + 1, nodeLang.length)
      }

      if (!title) {
        return
      }

      const className = 'remark-code-title'

      const titleNode: MdxJsxFlowElement = {
        type: 'mdxJsxFlowElement',
        name: 'div',
        attributes: [{ type: 'mdxJsxAttribute', name: 'className', value: className }],
        children: [{ type: 'text', value: title } as TextNode],
        data: { _xdmExplicitJsx: true },
      }

      parent.children.splice(index, 0, titleNode)
      node.lang = language
    })
}
