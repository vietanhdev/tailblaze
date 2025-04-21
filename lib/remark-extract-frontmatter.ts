import { visit } from 'unist-util-visit'
import { load } from 'js-yaml'

interface YamlNode {
  type: 'yaml'
  value: string
}

interface VFile {
  data: {
    frontmatter?: Record<string, any>
  }
}

export default function extractFrontmatter() {
  return (tree: any, file: VFile) => {
    visit(tree, 'yaml', (node: YamlNode) => {
      file.data.frontmatter = load(node.value) as Record<string, any>
    })
  }
}
