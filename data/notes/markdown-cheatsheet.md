---
title: Markdown Cheatsheet
date: 2023-11-27
categories: ['Notes']
tags:
  - Markdown
  - Reference
draft: false
summary: A quick reference guide to Markdown syntax for Tailblaze users.
---

# Markdown Cheatsheet

This is a quick reference for the Markdown syntax supported in Tailblaze blog posts and notes.

## Headings

```markdown
# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6
```

## Emphasis

```markdown
_Italic text_ or _Italic text_
**Bold text** or **Bold text**
~~Strikethrough~~
```

## Lists

### Unordered Lists

```markdown
- Item 1
- Item 2
  - Nested item 1
  - Nested item 2
- Item 3
```

### Ordered Lists

```markdown
1. First item
2. Second item
3. Third item
```

## Links

```markdown
[Link text](https://www.example.com)
```

## Images

```markdown
![Alt text](/path/to/image.jpg)
```

## Code

Inline code: \`code\`

Code blocks:

````markdown
```javascript
function hello() {
  console.log('Hello, world!')
}
```
````

## Blockquotes

```markdown
> This is a blockquote
>
> It can span multiple lines
```

## Horizontal Rules

```markdown
---
```

## Tables

```markdown
| Header 1 | Header 2 |
| -------- | -------- |
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
```

## Task Lists

```markdown
- [x] Completed task
- [ ] Incomplete task
```

## Footnotes

```markdown
Here's a sentence with a footnote[^1].

[^1]: This is the footnote.
```

## MDX Extensions

Tailblaze also supports MDX, which allows you to include React components directly in your markdown:

```jsx
import { Alert } from 'components/Alert'

;<Alert type="info">This is an alert component rendered in markdown!</Alert>
```

For more detailed information, check out the [official Markdown guide](https://www.markdownguide.org/).
