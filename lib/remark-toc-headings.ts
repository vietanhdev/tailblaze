import { visit } from 'unist-util-visit'
import { slug } from 'github-slugger'
import { toString } from 'mdast-util-to-string'

interface Heading {
  value: string
  url: string
  depth: number
}

interface HeadingNode {
  type: 'heading'
  depth: number
}

interface TocOptions {
  exportRef: Heading[]
}

export default function remarkTocHeadings(options: TocOptions) {
  return (tree: any) =>
    visit(tree, 'heading', (node: HeadingNode) => {
      const textContent = toString(node)
      options.exportRef.push({
        value: textContent,
        url: '#' + slug(textContent),
        depth: node.depth,
      })
    })
}
