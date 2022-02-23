import { Plugin } from 'vite'

export default function mdPreprocess(): Plugin {
  const resolveRaw = (raw: string) => {
    const mdPattern = /(---\n([\s\S]*?\n)---)?\n?([\s\S]*)/

    if (mdPattern.exec(raw) !== null) {
      let frontmatter = mdPattern.exec(raw)![2] || ''
      let md = mdPattern.exec(raw)![3]

      const { title } = getMetaFromMarkdown(md)

      // 如果未注明title，则解析第一个heading语法的值
      if (!/^title/.test(frontmatter)) {
        frontmatter += `title: ${title}\n`
      }

      // 抛弃md文件中的的一级标题
      md = md.replace(/\n?# .*\n?/, '')

      return `---\n` + frontmatter + '---\n' + md
    } else {
      return raw
    }
  }

  const getMetaFromMarkdown = (md: string) => {
    // get the first healing syntax as title
    const headingPattern = /\n?#{1,7} (.*)\n?/
    const title = headingPattern.exec(md)?.[1] || '无题'

    return {
      title
    }
  }

  return {
    name: 'md-preprocess',
    enforce: 'pre',
    transform(raw, id) {
      if (!/\.md$/.test(id)) return
      try {
        return resolveRaw(raw)
      } catch (e: any) {
        this.error(e)
      }
    }
  }
}
