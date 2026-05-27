# WeChat Layout Studio / 公众号排版工坊

一个本地可运行的公众号排版工具原型。当前版本先解决写作到发布前的最后一公里；下一阶段会升级为“主题驱动的知识库写作 Agent”：

- Markdown 编辑与实时微信宽度预览
- 8 套公众号友好的内联样式主题
- 复制为公众号后台可粘贴的富文本 HTML
- 粘贴整篇文章后一键自动结构化排版
- 标题、摘要、封面、结构、图片、段落密度发布检查
- 富文本剪贴板清洗成 Markdown
- 本地草稿自动保存
- HTML 导出

## 对标参考

调研和参考了这些方向：

- `doocs/md`：成熟开源标杆，强在 Markdown、扩展语法、图床、AI 助手和草稿管理。
- `xiaobox/mdeditor`：强调现代 UI、多端预览、公众号复制、数学公式、Mermaid 和导出。
- `xiaolinbaba/paper`：单 HTML、本地优先、三栏布局、公众号等宽预览。
- `ksky521/mpeditor`：早期公众号 Markdown 编辑器，重点是实时预览、同步滚动、代码高亮和微信 UI 贴合。
- 用户给的微信文章案例：红色强调线、舒展段距、Mac 风代码块、图片阴影、发布功能说明和参与引导。

## 使用

### 方式一：直接打开

```bash
open wechat-layout-studio/index.html
```

### 方式二：启动本地静态服务

```bash
cd wechat-layout-studio
python3 -m http.server 8765
```

然后访问：

```text
http://127.0.0.1:8765/
```

## 在线部署

这是一个纯静态项目，可以直接部署到 GitHub Pages、Cloudflare Pages、Vercel、Netlify 或任何静态文件服务器。

GitHub Pages 推荐设置：

- Source: `Deploy from a branch`
- Branch: `main`
- Folder: `/ (root)`

## 下一步建议

- 查看 [主题驱动的知识库写作 Agent](./docs/topic-driven-writing-agent.md)，这是更准确的产品方向：用户给主题，系统调取 Obsidian、飞书和外部素材，重组知识并生成一篇新文章。
- 查看 [内容评分与校准系统](./docs/content-scoring-system.md)，参考 `cheat-on-content` 的“打分 -> 盲预测 -> 发布 -> 复盘 -> 升级 rubric”闭环，改造成公众号知识库文章评分。
- 查看 [自动化公众号内容生产线蓝图](./docs/automation-blueprint.md)，里面拆了 Obsidian、飞书、热点抓取、AI 写作、公众号草稿和手机确认发布流程。
- 接入图床上传，把本地图片和外链图片转成稳定 URL。
- 增加 AI 标题、摘要、结构和口吻优化。
- 增加公众号草稿接口发布，需要公众号 appID/appsecret 和素材上传流程。
- 增加 Mermaid、LaTeX、长图/PDF 导出。

## License

MIT
