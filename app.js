const STORAGE_KEY = "wechat-layout-studio-state-v1";

const DIMENSIONS = [
  ["TS", "主题势能"],
  ["KA", "知识适配"],
  ["IG", "信息增量"],
  ["UV", "读者可用"],
  ["SC", "传播冲动"],
  ["CV", "商业承接"],
  ["SN", "结构叙事"],
  ["CE", "可信证据"],
];

const themes = [
  {
    id: "redline",
    name: "红线科技",
    accent: "#d71a1b",
    accentSoft: "#fef2f2",
    text: "#333333",
    muted: "#666666",
    border: "#f0dede",
    codeBg: "#fafafa",
    quoteBg: "#fef7f7",
  },
  {
    id: "jade",
    name: "青玉增长",
    accent: "#0f766e",
    accentSoft: "#ecfdf5",
    text: "#24332f",
    muted: "#5d6f69",
    border: "#cde8dc",
    codeBg: "#f4fbf7",
    quoteBg: "#eef8f2",
  },
  {
    id: "blueprint",
    name: "蓝图研究",
    accent: "#2563eb",
    accentSoft: "#eff6ff",
    text: "#263247",
    muted: "#64748b",
    border: "#dbeafe",
    codeBg: "#f8fbff",
    quoteBg: "#edf5ff",
  },
  {
    id: "ink",
    name: "黑白专栏",
    accent: "#111827",
    accentSoft: "#f3f4f6",
    text: "#222222",
    muted: "#666666",
    border: "#dedede",
    codeBg: "#f6f6f6",
    quoteBg: "#f7f7f7",
  },
  {
    id: "violet",
    name: "紫晶观点",
    accent: "#7c3aed",
    accentSoft: "#f5f3ff",
    text: "#302a3f",
    muted: "#6d647c",
    border: "#e9d5ff",
    codeBg: "#fbfaff",
    quoteBg: "#f6f0ff",
  },
  {
    id: "amber",
    name: "金橙商业",
    accent: "#b45309",
    accentSoft: "#fff7ed",
    text: "#382f24",
    muted: "#7a6854",
    border: "#fed7aa",
    codeBg: "#fffaf2",
    quoteBg: "#fff7ed",
  },
  {
    id: "rose",
    name: "玫瑰叙事",
    accent: "#be123c",
    accentSoft: "#fff1f2",
    text: "#3c2830",
    muted: "#765866",
    border: "#fecdd3",
    codeBg: "#fff8fa",
    quoteBg: "#fff1f4",
  },
  {
    id: "slate",
    name: "灰阶报告",
    accent: "#475569",
    accentSoft: "#f1f5f9",
    text: "#26313f",
    muted: "#667085",
    border: "#d8dee8",
    codeBg: "#f8fafc",
    quoteBg: "#f1f5f9",
  },
];

const sampleMarkdown = `哈喽，大家好。

今天我们做一个真正能服务公众号发布流程的排版工具：左侧写 Markdown，中间看微信宽度预览，右侧直接做发布前检查。

![产品截图](https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80)

## 为什么要做？

以前写公众号，常见流程是飞书或 Notion 写完，再复制到某个排版工具里修格式。问题是：工具看起来很多，真正关心“发出去之前会不会翻车”的不多。

> 好的排版工具不应该只负责漂亮。它应该帮你减少发布前的不确定性。

## 顶级排版工具应该解决什么

- 标题、摘要、封面、正文不是割裂的，而是一篇文章的完整发布资产。
- 复制到公众号后台时，样式要尽可能内联，避免粘贴后丢格式。
- 主题不是换颜色，而是让标题、引用、代码、表格、重点句都有稳定的视觉秩序。
- 作者需要看到手机宽度下的真实节奏，而不是一个过宽的网页预览。

:::note 发布策略
这版先把本地写作、主题渲染、公众号复制、发布检查打磨好。图床、AI 改写和公众号接口直发可以作为下一层能力接入。
:::

### 代码高亮

\`\`\`js
const publish = {
  write: "Markdown",
  preview: "WeChat width",
  copy: "inline styled HTML",
  check: ["title", "summary", "cover", "rhythm"]
};
\`\`\`

### 表格支持

| 模块 | 价值 |
| --- | --- |
| 主题系统 | 让文章有稳定的品牌感 |
| 发布检查 | 发现标题过长、摘要不足、图片缺失等问题 |
| 富文本复制 | 粘贴到公众号后台时尽量保留样式 |

---

**提示：** 选择右侧的「红线科技」主题，可以看到和参考案例类似的标题左边线、红色重点、Mac 风代码块和浅色引用块。`;

const defaultState = {
  title: "用本地工具做一个顶级公众号排版工作台",
  author: "Garry",
  account: "AI Product Notes",
  summary: "一个面向公众号创作者的本地排版工作台：写作、预览、主题、复制和发布前检查合在一个界面里。",
  cover: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80",
  markdown: sampleMarkdown,
  themeId: "redline",
  fontSize: 16,
  lineHeight: 1.8,
  paragraphGap: 20,
  width: "phone",
  agentTopic: "AI 企业知识库为什么会成为中小企业刚需",
  agentReader: "中小企业老板、销售负责人、交付负责人",
  agentBusiness: "AI 企业知识库服务",
  agentObsidian: "",
  agentLark: "",
  agentTrends: "",
  sourceLinks: "",
  uploadedSources: [],
  sourceImages: [],
  pipeline: [],
  lastScore: null,
  predictionLog: "",
};

const els = {
  title: document.querySelector("#titleInput"),
  author: document.querySelector("#authorInput"),
  account: document.querySelector("#accountInput"),
  summary: document.querySelector("#summaryInput"),
  cover: document.querySelector("#coverInput"),
  markdown: document.querySelector("#markdownInput"),
  preview: document.querySelector("#wechatPreview"),
  template: document.querySelector("#wechatTemplate"),
  themeGrid: document.querySelector("#themeGrid"),
  checklist: document.querySelector("#checklist"),
  qualityScore: document.querySelector("#qualityScore"),
  statsLine: document.querySelector("#statsLine"),
  saveState: document.querySelector("#saveState"),
  copyState: document.querySelector("#copyState"),
  fontSize: document.querySelector("#fontSizeInput"),
  lineHeight: document.querySelector("#lineHeightInput"),
  paragraphGap: document.querySelector("#paragraphGapInput"),
  fontSizeValue: document.querySelector("#fontSizeValue"),
  lineHeightValue: document.querySelector("#lineHeightValue"),
  paragraphGapValue: document.querySelector("#paragraphGapValue"),
  topic: document.querySelector("#topicInput"),
  reader: document.querySelector("#readerInput"),
  business: document.querySelector("#businessInput"),
  obsidian: document.querySelector("#obsidianInput"),
  lark: document.querySelector("#larkInput"),
  trends: document.querySelector("#trendInput"),
  sourceLinks: document.querySelector("#sourceLinksInput"),
  sourceFile: document.querySelector("#sourceFileInput"),
  sourceStatus: document.querySelector("#sourceStatus"),
  imageGallery: document.querySelector("#imageGallery"),
  pipelinePanel: document.querySelector("#pipelinePanel"),
  scorePanel: document.querySelector("#scorePanel"),
};

let state = loadState();
let lastArticleHtml = "";
let saveTimer = null;

init();

function init() {
  hydrateInputs();
  renderThemeGrid();
  bindEvents();
  render();
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return { ...defaultState, ...saved };
  } catch {
    return { ...defaultState };
  }
}

function hydrateInputs() {
  els.title.value = state.title;
  els.author.value = state.author;
  els.account.value = state.account;
  els.summary.value = state.summary;
  els.cover.value = state.cover;
  els.markdown.value = state.markdown;
  els.fontSize.value = state.fontSize;
  els.lineHeight.value = state.lineHeight;
  els.paragraphGap.value = state.paragraphGap;
  els.topic.value = state.agentTopic;
  els.reader.value = state.agentReader;
  els.business.value = state.agentBusiness;
  els.obsidian.value = state.agentObsidian;
  els.lark.value = state.agentLark;
  els.trends.value = state.agentTrends;
  els.sourceLinks.value = state.sourceLinks;
}

function bindEvents() {
  [
    ["input", els.title, "title"],
    ["input", els.author, "author"],
    ["input", els.account, "account"],
    ["input", els.summary, "summary"],
    ["input", els.cover, "cover"],
    ["input", els.markdown, "markdown"],
    ["input", els.fontSize, "fontSize"],
    ["input", els.lineHeight, "lineHeight"],
    ["input", els.paragraphGap, "paragraphGap"],
    ["input", els.topic, "agentTopic"],
    ["input", els.reader, "agentReader"],
    ["input", els.business, "agentBusiness"],
    ["input", els.obsidian, "agentObsidian"],
    ["input", els.lark, "agentLark"],
    ["input", els.trends, "agentTrends"],
    ["input", els.sourceLinks, "sourceLinks"],
  ].forEach(([eventName, element, key]) => {
    element.addEventListener(eventName, () => {
      state[key] = element.type === "range" ? Number(element.value) : element.value;
      render();
    });
  });

  document.querySelectorAll("[data-width]").forEach((button) => {
    button.addEventListener("click", () => {
      state.width = button.dataset.width;
      render();
    });
  });

  document.querySelectorAll("[data-insert]").forEach((button) => {
    button.addEventListener("click", () => insertMarkdown(button.dataset.insert));
  });

  document.querySelector("#sampleBtn").addEventListener("click", () => {
    state = { ...defaultState };
    hydrateInputs();
    render();
  });

  document.querySelector("#copyHtmlBtn").addEventListener("click", copyRichHtml);
  document.querySelector("#copyMarkdownBtn").addEventListener("click", copyMarkdown);
  document.querySelector("#downloadBtn").addEventListener("click", downloadHtml);
  document.querySelector("#downloadCardBtn").addEventListener("click", downloadImageCard);
  document.querySelector("#copyCardBtn").addEventListener("click", copyImageCard);
  document.querySelector("#cleanPasteBtn").addEventListener("click", cleanClipboardPaste);
  document.querySelector("#autoFormatBtn").addEventListener("click", autoFormatDraft);
  document.querySelector("#formatInlineBtn").addEventListener("click", autoFormatDraft);
  document.querySelector("#generateAgentBtn").addEventListener("click", generateAgentArticle);
  document.querySelector("#generateAgentBtnTop").addEventListener("click", generateAgentArticle);
  document.querySelector("#sampleAgentBtn").addEventListener("click", fillAgentSample);
  document.querySelector("#sourceFileInput").addEventListener("change", handleSourceFiles);
  document.querySelector("#fetchLinksBtn").addEventListener("click", fetchSourceLinks);
  document.querySelector("#copyPredictionBtn").addEventListener("click", copyPredictionLog);
  document.querySelector("#downloadPredictionBtn").addEventListener("click", downloadPredictionLog);
  document.querySelector("#resetBtn").addEventListener("click", resetDraft);
  document.addEventListener("paste", handleImagePaste);
}

function renderThemeGrid() {
  els.themeGrid.innerHTML = themes
    .map((theme) => {
      const swatches = [theme.accent, theme.accentSoft, theme.text, theme.border]
        .map((color) => `<span class="swatch" style="background:${color}"></span>`)
        .join("");
      return `<button class="theme-card" data-theme="${theme.id}" type="button">
        <span class="theme-name">${theme.name}</span>
        <span class="swatches">${swatches}</span>
      </button>`;
    })
    .join("");

  els.themeGrid.querySelectorAll("[data-theme]").forEach((button) => {
    button.addEventListener("click", () => {
      state.themeId = button.dataset.theme;
      render();
    });
  });
}

function render() {
  const theme = currentTheme();
  const contentHtml = renderMarkdown(state.markdown, theme, state);
  const fragment = els.template.content.cloneNode(true);
  const cover = fragment.querySelector(".wx-cover");
  const title = fragment.querySelector(".wx-title");
  const author = fragment.querySelector(".wx-author");
  const account = fragment.querySelector(".wx-account");
  const date = fragment.querySelector(".wx-date");
  const summary = fragment.querySelector(".wx-summary");
  const content = fragment.querySelector(".wx-content");

  if (state.cover.trim()) {
    cover.classList.add("has-cover");
    cover.style.backgroundImage = `url("${escapeAttribute(state.cover.trim())}")`;
  }

  title.textContent = state.title || "未命名文章";
  author.textContent = state.author || "作者";
  account.textContent = state.account || "公众号";
  date.textContent = formatDate(new Date());
  summary.textContent = state.summary || "这里会显示公众号摘要。";
  content.innerHTML = contentHtml;

  els.preview.className = `wechat-preview ${state.width}`;
  els.preview.innerHTML = "";
  els.preview.appendChild(fragment);

  document.querySelectorAll("[data-width]").forEach((button) => {
    button.classList.toggle("active", button.dataset.width === state.width);
  });
  document.querySelectorAll("[data-theme]").forEach((button) => {
    button.classList.toggle("active", button.dataset.theme === state.themeId);
  });

  els.fontSizeValue.textContent = state.fontSize;
  els.lineHeightValue.textContent = state.lineHeight.toFixed(2).replace(/0$/, "");
  els.paragraphGapValue.textContent = state.paragraphGap;

  lastArticleHtml = buildCopyHtml(contentHtml, theme);
  renderStats();
  renderChecklist();
  renderSourceAssets();
  renderPipelinePanel();
  renderScorePanel();
  persistSoon();
}

function currentTheme() {
  return themes.find((theme) => theme.id === state.themeId) || themes[0];
}

function renderMarkdown(markdown, theme, settings) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) {
      i += 1;
      continue;
    }

    if (line.trim().startsWith("```")) {
      const lang = line.trim().slice(3).trim() || "text";
      const code = [];
      i += 1;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        code.push(lines[i]);
        i += 1;
      }
      i += 1;
      blocks.push(renderCodeBlock(code.join("\n"), lang, theme));
      continue;
    }

    const cardMatch = line.match(/^:::(\w+)\s*(.*)$/);
    if (cardMatch) {
      const cardLines = [];
      i += 1;
      while (i < lines.length && !lines[i].trim().startsWith(":::")) {
        cardLines.push(lines[i]);
        i += 1;
      }
      i += 1;
      blocks.push(renderCard(cardMatch[2] || "提示", cardLines.join("\n"), theme, settings));
      continue;
    }

    if (isTableStart(lines, i)) {
      const tableLines = [];
      while (i < lines.length && lines[i].includes("|")) {
        tableLines.push(lines[i]);
        i += 1;
      }
      blocks.push(renderTable(tableLines, theme, settings));
      continue;
    }

    const heading = line.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      blocks.push(renderHeading(heading[1].length, heading[2], theme));
      i += 1;
      continue;
    }

    if (/^(-{3,}|\*{3,})$/.test(line.trim())) {
      blocks.push(`<hr style="margin:36px auto;border:none;height:1px;width:100%;background-color:#eeeeee;">`);
      i += 1;
      continue;
    }

    if (/^\s*>\s?/.test(line)) {
      const quoteLines = [];
      while (i < lines.length && /^\s*>\s?/.test(lines[i])) {
        quoteLines.push(lines[i].replace(/^\s*>\s?/, ""));
        i += 1;
      }
      blocks.push(renderQuote(quoteLines.join("\n"), theme, settings));
      continue;
    }

    if (/^\s*[-*+]\s+/.test(line)) {
      const listLines = [];
      while (i < lines.length && /^\s*[-*+]\s+/.test(lines[i])) {
        listLines.push(lines[i].replace(/^\s*[-*+]\s+/, ""));
        i += 1;
      }
      blocks.push(renderList(listLines, false, theme, settings));
      continue;
    }

    if (/^\s*\d+\.\s+/.test(line)) {
      const listLines = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        listLines.push(lines[i].replace(/^\s*\d+\.\s+/, ""));
        i += 1;
      }
      blocks.push(renderList(listLines, true, theme, settings));
      continue;
    }

    const image = line.trim().match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (image) {
      blocks.push(renderImage(image[2], image[1], theme));
      i += 1;
      continue;
    }

    const paragraph = [];
    while (i < lines.length && lines[i].trim() && !isBlockStart(lines, i)) {
      paragraph.push(lines[i]);
      i += 1;
    }
    blocks.push(renderParagraph(paragraph.join(" "), theme, settings));
  }

  return `<section style="${rootStyle(theme, settings)}">${blocks.join("")}</section>`;
}

function rootStyle(theme, settings) {
  return [
    "max-width:100%",
    "margin:0 auto",
    "padding:0",
    "font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif",
    `font-size:${settings.fontSize}px`,
    "overflow-wrap:break-word",
    `line-height:${settings.lineHeight} !important`,
    `color:${theme.text} !important`,
    "background-color:#ffffff !important",
    "text-align:left",
  ].join(";");
}

function renderHeading(level, text, theme) {
  const clean = inline(text, theme);
  if (level === 1) {
    return `<h1 style="font-size:24px;font-weight:750;margin:34px 0 16px;color:${theme.text} !important;line-height:1.35 !important;">${clean}</h1>`;
  }
  if (level === 2) {
    return `<h2 style="font-size:22px;font-weight:700;margin:32px 0 14px;padding-left:12px;border-left:4px solid ${theme.accent};color:${theme.text} !important;line-height:1.35 !important;">${clean}</h2>`;
  }
  if (level === 3) {
    return `<h3 style="font-size:18px;font-weight:650;margin:28px 0 12px;color:${theme.text} !important;line-height:1.45 !important;">${clean}</h3>`;
  }
  return `<h4 style="font-size:16px;font-weight:700;margin:24px 0 10px;color:${theme.accent} !important;line-height:1.45 !important;">${clean}</h4>`;
}

function renderParagraph(text, theme, settings) {
  return `<p style="${paragraphStyle(theme, settings)}">${inline(text, theme)}</p>`;
}

function paragraphStyle(theme, settings) {
  return [
    `font-size:${settings.fontSize}px`,
    `margin:${settings.paragraphGap}px 0 !important`,
    `line-height:${settings.lineHeight} !important`,
    `color:${theme.text} !important`,
    "text-align:left",
  ].join(";");
}

function renderQuote(text, theme, settings) {
  const body = text
    .split("\n")
    .filter(Boolean)
    .map((line) => renderParagraph(line, theme, settings))
    .join("");
  return `<blockquote style="margin:24px 0;padding:16px 20px;border-left:4px solid ${theme.accent};border-radius:4px;background-color:${theme.quoteBg} !important;color:${theme.muted} !important;line-height:${settings.lineHeight} !important;">${body}</blockquote>`;
}

function renderCard(title, text, theme, settings) {
  const body = text
    .split("\n")
    .filter(Boolean)
    .map((line) => renderParagraph(line, theme, settings))
    .join("");
  return `<section style="margin:24px 0;padding:16px 18px;border:1px solid ${theme.border};border-radius:8px;background:${theme.accentSoft} !important;">
    <p style="margin:0 0 8px;font-size:14px;font-weight:750;color:${theme.accent} !important;">${escapeHtml(title)}</p>
    ${body}
  </section>`;
}

function renderList(items, ordered, theme, settings) {
  const tag = ordered ? "ol" : "ul";
  const listStyle = ordered ? "decimal" : "disc";
  const lis = items
    .map((item) => `<li style="margin:8px 0;font-size:${settings.fontSize}px;line-height:${settings.lineHeight} !important;color:${theme.text} !important;">${inline(item, theme)}</li>`)
    .join("");
  return `<${tag} style="margin:16px 0;padding-left:28px;list-style-position:outside;list-style-type:${listStyle} !important;">${lis}</${tag}>`;
}

function renderImage(src, alt, theme) {
  const safeSrc = escapeAttribute(src.trim());
  const safeAlt = escapeAttribute(alt || "图片");
  return `<section style="margin:24px 0;text-align:left;">
    <img src="${safeSrc}" data-src="${safeSrc}" alt="${safeAlt}" style="display:block;width:100%;max-width:100%;height:auto;box-sizing:border-box;box-shadow:rgba(15,23,42,0.18) 0 14px 30px,rgba(15,23,42,0.10) 0 4px 10px;border:1px solid rgba(15,23,42,0.12);margin:30px auto !important;padding:8px !important;border-radius:14px !important;">
  </section>`;
}

function renderCodeBlock(code, lang, theme) {
  const highlighted = highlightCode(code, lang);
  return `<pre style="margin:24px 0;padding:18px;border-radius:8px;overflow-x:auto;border:1px solid ${theme.border};background-color:${theme.codeBg} !important;font-size:13px !important;line-height:1.55 !important;text-align:left;"><section style="margin-bottom:12px;white-space:nowrap;text-align:left;"><span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:#ff5f56;margin-right:6px;"></span><span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:#ffbd2e;margin-right:6px;"></span><span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:#27c93f;"></span><span style="margin-left:10px;color:${theme.muted};font-size:12px;">${escapeHtml(lang)}</span></section><code>${highlighted}</code></pre>`;
}

function renderTable(lines, theme, settings) {
  const rows = lines
    .filter((line, index) => index !== 1)
    .map((line) => line.split("|").map((cell) => cell.trim()).filter(Boolean));
  const head = rows.shift() || [];
  const headHtml = head
    .map((cell) => `<th style="padding:12px 14px;font-weight:650;border:1px solid ${theme.border};background-color:${theme.accentSoft} !important;color:${theme.text} !important;">${inline(cell, theme)}</th>`)
    .join("");
  const bodyHtml = rows
    .map((row) => `<tr>${row.map((cell) => `<td style="padding:12px 14px;border:1px solid ${theme.border};color:${theme.text} !important;font-size:${Math.max(12, settings.fontSize - 2)}px;">${inline(cell, theme)}</td>`).join("")}</tr>`)
    .join("");
  return `<table style="width:100%;margin:24px 0;border-collapse:collapse;font-size:${Math.max(12, settings.fontSize - 1)}px;"><thead><tr>${headHtml}</tr></thead><tbody>${bodyHtml}</tbody></table>`;
}

function inline(text, theme) {
  let html = escapeHtml(text);
  html = html.replace(/`([^`]+)`/g, `<code style="padding:2px 5px;border-radius:4px;background:${theme.accentSoft};color:${theme.accent};font-size:0.92em;">$1</code>`);
  html = html.replace(/\*\*([^*]+)\*\*/g, `<strong style="font-weight:700;color:${theme.accent} !important;">$1</strong>`);
  html = html.replace(/\*([^*]+)\*/g, `<em style="font-style:italic;color:${theme.muted} !important;">$1</em>`);
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, `<a href="$2" style="color:#576b95;text-decoration:none;border-bottom:1px solid rgba(87,107,149,0.28);">$1</a>`);
  return html;
}

function highlightCode(code, lang) {
  const escaped = escapeHtml(code);
  const keywordPattern = /\b(const|let|var|function|return|await|async|if|else|for|while|class|new|import|from|export|true|false|null)\b/g;
  const stringPattern = /(["'`])(?:(?=(\\?))\2.)*?\1/g;
  const commentPattern = /(\/\/.*|#.*)$/gm;
  return escaped
    .replace(commentPattern, `<span style="color:#6a737d;font-style:italic;">$1</span>`)
    .replace(stringPattern, `<span style="color:#0f766e;">$&</span>`)
    .replace(keywordPattern, `<span style="color:#d73a49;font-weight:650;">$1</span>`);
}

function isTableStart(lines, index) {
  return lines[index]?.includes("|") && /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(lines[index + 1] || "");
}

function isBlockStart(lines, index) {
  const line = lines[index] || "";
  return Boolean(
    line.trim().startsWith("```") ||
      line.match(/^:::/) ||
      line.match(/^(#{1,4})\s+/) ||
      line.match(/^(-{3,}|\*{3,})$/) ||
      line.match(/^\s*>\s?/) ||
      line.match(/^\s*[-*+]\s+/) ||
      line.match(/^\s*\d+\.\s+/) ||
      line.trim().match(/^!\[([^\]]*)\]\(([^)]+)\)$/) ||
      isTableStart(lines, index)
  );
}

function renderStats() {
  const plain = state.markdown.replace(/```[\s\S]*?```/g, "").replace(/[#[\]()*_`>|-]/g, "");
  const chars = plain.replace(/\s/g, "").length;
  const minutes = Math.max(1, Math.ceil(chars / 500));
  const images = (state.markdown.match(/!\[[^\]]*]\([^)]+\)/g) || []).length + (state.cover.trim() ? 1 : 0);
  els.statsLine.textContent = `${chars} 字 · ${minutes} 分钟 · ${images} 图`;
}

function renderChecklist() {
  const titleLength = countCjkAware(state.title);
  const summaryLength = countCjkAware(state.summary);
  const bodyLength = countCjkAware(state.markdown);
  const headingCount = (state.markdown.match(/^#{2,3}\s+/gm) || []).length;
  const imageCount = (state.markdown.match(/!\[[^\]]*]\([^)]+\)/g) || []).length + (state.cover.trim() ? 1 : 0);
  const paragraphs = state.markdown.split(/\n{2,}/).filter((item) => item.trim() && !isBlockStart([item.trim()], 0));
  const avgParagraph = paragraphs.length ? Math.round(bodyLength / paragraphs.length) : 0;
  const hasCopyableHtml = lastArticleHtml.length > 500;

  const checks = [
    makeCheck(titleLength >= 12 && titleLength <= 32, "标题长度", `当前 ${titleLength} 字，建议 12-32 字，手机端更稳。`),
    makeCheck(summaryLength >= 35 && summaryLength <= 90, "摘要完整", `当前 ${summaryLength} 字，建议 35-90 字。`),
    makeCheck(Boolean(state.cover.trim()), "封面图", state.cover.trim() ? "已设置封面 URL。" : "缺封面会降低第一眼完成度。"),
    makeCheck(headingCount >= 2, "结构节奏", `检测到 ${headingCount} 个小标题，长文建议至少 2 个。`),
    makeCheck(imageCount >= 1, "视觉资产", `检测到 ${imageCount} 张图，公众号文章最好有明确视觉锚点。`),
    makeCheck(avgParagraph > 0 && avgParagraph <= 120, "段落密度", `平均段落约 ${avgParagraph} 字，建议单段少于 120 字。`),
    makeCheck(hasCopyableHtml, "复制管道", "已生成内联样式 HTML，可粘贴到公众号后台。"),
  ];

  const score = Math.round(checks.reduce((sum, item) => sum + item.score, 0) / checks.length);
  els.qualityScore.textContent = `${score} / 100`;
  els.checklist.innerHTML = checks
    .map((check) => `<div class="check-item ${check.kind}">
      <span class="check-dot">${check.kind === "good" ? "✓" : "!"}</span>
      <span class="check-copy"><strong>${check.title}</strong><span>${check.detail}</span></span>
    </div>`)
    .join("");
}

function makeCheck(pass, title, detail) {
  return { title, detail, kind: pass ? "good" : "warn", score: pass ? 100 : 45 };
}

function buildCopyHtml(contentHtml, theme) {
  const coverHtml = state.cover.trim()
    ? `<section style="margin:0 0 22px;"><img src="${escapeAttribute(state.cover.trim())}" data-src="${escapeAttribute(state.cover.trim())}" alt="封面" style="display:block;width:100%;max-width:100%;height:auto;border-radius:0;"></section>`
    : "";
  const titleHtml = `<h1 style="font-size:24px;line-height:1.32;font-weight:760;margin:0 0 14px;color:#111827;">${escapeHtml(state.title || "未命名文章")}</h1>`;
  const metaHtml = `<p style="margin:0 0 18px;color:#7a8597;font-size:13px;line-height:1.5;"><span style="display:inline-block;padding:1px 6px;border-radius:4px;color:#576b95;background:#f1f4f8;margin-right:8px;">原创</span>${escapeHtml(state.author || "作者")} · <span style="color:#576b95;">${escapeHtml(state.account || "公众号")}</span> · ${formatDate(new Date())}</p>`;
  const summaryHtml = `<p style="margin:0 0 22px;padding:12px 14px;border-radius:8px;background:#f7f8fa;color:#5b6472;font-size:14px;line-height:1.7;">${escapeHtml(state.summary || "这里会显示公众号摘要。")}</p>`;
  return `<section style="max-width:100%;margin:0 auto;padding:24px 20px 48px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;background:#ffffff;color:${theme.text};">${coverHtml}${titleHtml}${metaHtml}${summaryHtml}${contentHtml}</section>`;
}

async function copyRichHtml() {
  try {
    if (navigator.clipboard && window.ClipboardItem) {
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": new Blob([lastArticleHtml], { type: "text/html" }),
          "text/plain": new Blob([state.markdown], { type: "text/plain" }),
        }),
      ]);
    } else {
      fallbackCopyHtml(lastArticleHtml);
    }
    setCopyState("已复制富文本，可到公众号后台粘贴");
  } catch {
    fallbackCopyHtml(lastArticleHtml);
    setCopyState("已使用兼容模式复制");
  }
}

function fallbackCopyHtml(html) {
  const box = document.createElement("div");
  box.contentEditable = "true";
  box.style.position = "fixed";
  box.style.left = "-9999px";
  box.innerHTML = html;
  document.body.appendChild(box);
  const range = document.createRange();
  range.selectNodeContents(box);
  const selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
  document.execCommand("copy");
  selection.removeAllRanges();
  box.remove();
}

async function copyMarkdown() {
  await navigator.clipboard.writeText(state.markdown);
  setCopyState("Markdown 已复制");
}

function downloadHtml() {
  const doc = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(state.title)}</title></head><body>${lastArticleHtml}</body></html>`;
  const blob = new Blob([doc], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${safeFileName(state.title || "wechat-article")}.html`;
  link.click();
  URL.revokeObjectURL(url);
  setCopyState("HTML 已下载");
}

async function downloadImageCard() {
  const blob = await createImageCardBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${safeFileName(state.title || "content-card")}-card.png`;
  link.click();
  URL.revokeObjectURL(url);
  setCopyState("图片卡已下载");
}

async function copyImageCard() {
  try {
    if (!navigator.clipboard || !window.ClipboardItem) throw new Error("clipboard image unsupported");
    const blob = await createImageCardBlob();
    await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
    setCopyState("图片卡已复制");
  } catch {
    await downloadImageCard();
    setCopyState("浏览器不支持复制图片，已改为下载");
  }
}

async function createImageCardBlob() {
  const canvas = document.createElement("canvas");
  const width = 1080;
  const height = 1440;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  const theme = currentTheme();
  const accent = theme.accent || "#d92d20";

  ctx.fillStyle = "#f5f7fb";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "#ffffff";
  roundRect(ctx, 70, 70, width - 140, height - 140, 36);
  ctx.fill();

  ctx.fillStyle = accent;
  ctx.fillRect(70, 70, 12, height - 140);
  ctx.fillStyle = "#111827";
  ctx.font = "700 34px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  ctx.fillText(state.account || "知识内容 Agent", 120, 150);

  ctx.fillStyle = "#667085";
  ctx.font = "400 26px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  ctx.fillText("文章 / 视频 / 社交分发卡", 120, 196);

  let y = 300;
  ctx.fillStyle = "#111827";
  ctx.font = "800 66px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  y = drawWrappedText(ctx, state.title || "未命名内容", 120, y, 840, 82, 4);

  ctx.fillStyle = "#475467";
  ctx.font = "400 34px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  y = drawWrappedText(ctx, state.summary || inferSummary(state.markdown), 120, y + 42, 840, 52, 4);

  const bullets = extractCardBullets(state.markdown).slice(0, 4);
  y += 54;
  ctx.font = "500 32px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  bullets.forEach((item) => {
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.arc(136, y - 11, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#27364a";
    y = drawWrappedText(ctx, item, 164, y, 790, 48, 2) + 18;
  });

  const score = state.lastScore ? `传播 ${state.lastScore.virality.toFixed(1)} / 获客 ${state.lastScore.conversion.toFixed(1)}` : "主题驱动 · 私有知识 · 自动评分";
  ctx.fillStyle = "#f2f4f7";
  roundRect(ctx, 120, height - 245, 420, 72, 18);
  ctx.fill();
  ctx.fillStyle = "#344054";
  ctx.font = "700 28px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  ctx.fillText(score, 150, height - 199);

  ctx.fillStyle = "#111827";
  ctx.font = "700 30px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
  ctx.fillText("把私有知识变成可传播、可获客的内容", 120, height - 125);

  return await new Promise((resolve) => canvas.toBlob(resolve, "image/png", 0.96));
}

function extractCardBullets(markdown) {
  const listItems = (markdown.match(/^[-*]\s+(.+)$/gm) || []).map((line) => line.replace(/^[-*]\s+/, "").replace(/\*\*/g, ""));
  if (listItems.length) return listItems;
  return markdown
    .split(/\n{2,}/)
    .map((block) => block.replace(/^#+\s+/, "").replace(/[>*_`#-]/g, "").trim())
    .filter((block) => block.length >= 12 && block.length <= 80)
    .slice(0, 6);
}

function drawWrappedText(ctx, text, x, y, maxWidth, lineHeight, maxLines) {
  const clean = (text || "").replace(/\s+/g, " ").trim();
  const lines = [];
  let line = "";
  for (const char of clean) {
    const next = line + char;
    if (ctx.measureText(next).width > maxWidth && line) {
      lines.push(line);
      line = char;
      if (lines.length >= maxLines) break;
    } else {
      line = next;
    }
  }
  if (line && lines.length < maxLines) lines.push(line);
  lines.forEach((item, index) => {
    const suffix = index === maxLines - 1 && clean.length > lines.join("").length ? "..." : "";
    ctx.fillText(`${item}${suffix}`, x, y + index * lineHeight);
  });
  return y + lines.length * lineHeight;
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
}

async function cleanClipboardPaste() {
  try {
    const items = await navigator.clipboard.read();
    for (const item of items) {
      if (item.types.includes("text/html")) {
        const blob = await item.getType("text/html");
        const html = await blob.text();
        insertMarkdown(htmlToMarkdown(html));
        setCopyState("已清洗剪贴板富文本");
        return;
      }
    }
    const text = await navigator.clipboard.readText();
    insertMarkdown(text);
  } catch {
    setCopyState("浏览器未允许读取剪贴板");
  }
}

function autoFormatDraft() {
  const source = state.markdown.trim();
  if (!source) {
    setCopyState("先粘贴一篇文章或素材");
    return;
  }

  const formatted = formatArticle(source);
  state.markdown = formatted.markdown;
  if (formatted.title && shouldReplaceTitle(state.title)) state.title = formatted.title;
  if (formatted.summary && shouldReplaceSummary(state.summary)) state.summary = formatted.summary;
  hydrateInputs();
  render();
  setCopyState("已自动整理为公众号结构稿");
}

function formatArticle(raw) {
  const normalized = raw
    .replace(/\r\n/g, "\n")
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  const lines = normalized.split("\n").map((line) => line.trim()).filter(Boolean);
  const title = inferTitle(lines);
  const bodyLines = title && lines[0] === title ? lines.slice(1) : lines;
  const paragraphs = splitIntoParagraphs(bodyLines.join("\n"));
  const blocks = [];
  let hasOpening = false;
  let hasBusinessCta = false;

  paragraphs.forEach((paragraph, index) => {
    const clean = paragraph.trim();
    if (!clean) return;

    if (isMarkdownBlock(clean)) {
      blocks.push(clean);
      return;
    }

    if (looksLikeHeading(clean, index)) {
      blocks.push(`## ${clean.replace(/^#+\s*/, "").replace(/[：:]$/, "")}`);
      return;
    }

    if (looksLikeListItem(clean)) {
      blocks.push(clean.replace(/^(\d+[.、]|[-*+])\s*/, "- "));
      return;
    }

    if (looksLikeImportant(clean)) {
      blocks.push(`> ${clean}`);
      return;
    }

    if (looksLikeNote(clean)) {
      blocks.push(`:::note 提示\n${clean}\n:::`);
      return;
    }

    if (isUrlOnly(clean)) {
      blocks.push(`<${clean}>`);
      return;
    }

    if (!hasOpening && index < 2) {
      hasOpening = true;
      blocks.push(clean);
      return;
    }

    const enhanced = emphasizeBusinessTerms(clean);
    if (/企业知识库|知识库服务|AI知识库|AI 知识库/.test(clean)) hasBusinessCta = true;
    blocks.push(enhanced);
  });

  if (!blocks.some((block) => block.startsWith("## "))) {
    blocks.splice(Math.min(2, blocks.length), 0, "## 为什么值得关注？");
  }

  if (!hasBusinessCta) {
    blocks.push("## 对企业知识库服务的启发");
    blocks.push("如果你正在做 AI 企业知识库服务，这类内容可以沉淀成三类资产：客户问题库、行业案例库、销售话术库。真正有价值的不是把资料堆起来，而是让团队在业务现场更快找到可复用的判断。");
  }

  blocks.push("---");
  blocks.push("如果你也在把企业资料、销售素材、交付经验整理成可复用的 AI 知识库，可以把你的场景发给我，我会持续分享更具体的搭建方法和案例。");

  return {
    title: title || "",
    summary: inferSummary(blocks.join("\n\n")),
    markdown: blocks.join("\n\n"),
  };
}

function inferTitle(lines) {
  const first = lines[0] || "";
  if (first.startsWith("#")) return first.replace(/^#+\s*/, "").trim();
  if (first.length >= 8 && first.length <= 42 && !/[。！？.!?]$/.test(first)) return first;
  return "";
}

function inferSummary(markdown) {
  const plain = markdown
    .replace(/```[\s\S]*?```/g, "")
    .replace(/^#+\s+/gm, "")
    .replace(/!\[[^\]]*]\([^)]+\)/g, "")
    .replace(/[>*_`#|:-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return plain.slice(0, 88);
}

function splitIntoParagraphs(text) {
  const chunks = text
    .split(/\n{2,}/)
    .flatMap((chunk) => {
      if (chunk.length <= 220) return [chunk];
      return chunk
        .replace(/([。！？!?])\s*/g, "$1\n")
        .split("\n")
        .reduce((acc, sentence) => {
          const last = acc[acc.length - 1] || "";
          if (!last || `${last}${sentence}`.length > 150) acc.push(sentence);
          else acc[acc.length - 1] = `${last}${sentence}`;
          return acc;
        }, []);
    });
  return chunks.map((chunk) => chunk.trim()).filter(Boolean);
}

function looksLikeHeading(text, index) {
  if (/^(一|二|三|四|五|六|七|八|九|十)[、.]/.test(text)) return true;
  if (/^\d+[、.]\s*\S+/.test(text) && text.length <= 32) return true;
  if (/[：:]$/.test(text) && text.length <= 24) return true;
  if (index > 0 && text.length >= 6 && text.length <= 24 && !/[。！？!?，,；;]/.test(text)) return true;
  return false;
}

function looksLikeImportant(text) {
  return /^(结论|核心|关键|本质|重点|一句话|真正|最重要)/.test(text) || /这才是|不是.*而是|关键在于/.test(text);
}

function looksLikeNote(text) {
  return /^(提示|注意|建议|风险|坑|别忘了)/.test(text);
}

function looksLikeListItem(text) {
  return /^(\d+[.、]|[-*+])\s+/.test(text);
}

function isMarkdownBlock(text) {
  return /^(#{1,4}\s|>\s|!\[[^\]]*]\([^)]+\)|```|:::) /.test(`${text} `) || text.startsWith("|");
}

function isUrlOnly(text) {
  return /^https?:\/\/\S+$/.test(text);
}

function emphasizeBusinessTerms(text) {
  return text
    .replace(/(AI企业知识库服务|AI 企业知识库服务|企业知识库|知识库服务|获客|销售转化|交付效率|客户问题)/g, "**$1**")
    .replace(/(Claude Code|ChatGPT|Gemini|OpenAI|飞书|Obsidian)/g, "**$1**");
}

function generateAgentArticle() {
  const topic = state.agentTopic.trim();
  if (!topic) {
    setCopyState("先输入一个主题");
    return;
  }

  if (!hasAgentSources()) {
    fillAgentSample();
  }

  const result = composeKnowledgeArticle({
    topic: state.agentTopic,
    reader: state.agentReader,
    business: state.agentBusiness,
    obsidian: state.agentObsidian,
    lark: state.agentLark,
    trends: state.agentTrends,
    sourceLinks: state.sourceLinks,
    uploadedSources: state.uploadedSources,
    sourceImages: state.sourceImages,
  });

  state.title = result.title;
  state.summary = result.summary;
  state.markdown = result.markdown;
  state.lastScore = result.score;
  state.predictionLog = result.predictionLog;
  updatePipeline(result);
  hydrateInputs();
  render();
  setCopyState("已生成知识库文章和预测评分");
}

function hasAgentSources() {
  return (
    [state.agentObsidian, state.agentLark, state.agentTrends, state.sourceLinks].some((value) => value.trim().length > 20) ||
    (state.uploadedSources || []).length > 0 ||
    (state.sourceImages || []).length > 0
  );
}

function fillAgentSample() {
  state.agentTopic = state.agentTopic || "AI 企业知识库为什么会成为中小企业刚需";
  state.agentReader = state.agentReader || "中小企业老板、销售负责人、交付负责人";
  state.agentBusiness = state.agentBusiness || "AI 企业知识库服务";
  state.agentObsidian = `# 客户问题库
销售新人最常问的问题不是产品功能，而是客户追问时不知道怎么接。过去靠老销售口头带新人，经验无法复用。

# 交付复盘
每次交付都会重复解释同一批资料：权限边界、数据来源、知识更新责任人。真正浪费时间的是找不到上一轮已经验证过的答案。

# 方法论
企业知识库不是资料仓库，而是把高频问题、最佳回答、案例证据和交付动作做成可复用的业务系统。`;
  state.agentLark = `飞书会议纪要：某制造业客户销售团队有 18 人，新人上手周期 45 天。老板关心的不是 AI 多炫，而是客户问到价格、交付周期、售后边界时，团队回答是否一致。

方案草稿：第一阶段不做大而全知识库，先做客户问题库、销售话术库、交付 SOP 三个库。每个库都要有责任人和更新节奏。

销售话术：如果知识库不能缩短找答案时间，它就只是另一个文档系统。`;
  state.agentTrends = `外部趋势：越来越多 AI 产品开始强调企业内部知识连接、RAG、Agent 工作流和权限管理。单点工具正在变便宜，企业真正缺的是把经验接入业务流程。

产品观察：不少团队尝试直接上通用 Agent，但失败原因常常不是模型不够强，而是内部知识没有结构化、没有版本、没有责任人。

市场信号：中小企业对 AI 预算谨慎，更愿意先买能提升销售转化、客服效率、交付一致性的场景方案。`;
  hydrateInputs();
  render();
  setCopyState("已填充知识写作样例");
}

function composeKnowledgeArticle(input) {
  const topic = input.topic.trim();
  const reader = input.reader.trim() || "目标读者";
  const business = input.business.trim() || "主线业务";
  const sources = collectSourceBlocks(input);
  const keywords = extractKeywords(`${topic} ${reader} ${business}`);
  const ranked = sources.map((source) => scoreSourceBlock(source, keywords, business)).sort((a, b) => b.score - a.score);
  const selected = ranked.slice(0, 8);
  const obsidian = selected.filter((item) => item.source === "Obsidian");
  const lark = selected.filter((item) => item.source === "飞书");
  const trends = selected.filter((item) => item.source === "趋势");
  const coreClaim = buildCoreClaim(topic, business, selected);
  const title = buildAgentTitle(topic, business, selected);
  const actionList = buildActionList(business, selected);
  const score = scoreKnowledgeArticle({
    topic,
    reader,
    business,
    selected,
    title,
    coreClaim,
    actionList,
  });

  const markdown = [
    `> ${coreClaim}`,
    buildOpening(topic, reader, selected),
    "## 为什么现在值得写？",
    buildTrendSection(trends, topic),
    "## 你的知识库里真正有价值的部分",
    buildKnowledgeSection(obsidian, lark, business),
    "## 重新组合后的判断",
    buildSynthesisSection(topic, business, selected),
    "## 可以直接照着做的路径",
    actionList.map((item) => `- ${item}`).join("\n"),
    "## 这和业务有什么关系？",
    buildCommercialSection(business, reader),
    ":::note 发布前预测",
    `传播分：${score.virality.toFixed(1)} / 10；获客分：${score.conversion.toFixed(1)} / 10；综合分：${score.composite.toFixed(1)} / 10。`,
    ":::",
    "---",
    `如果你也在思考 ${business} 怎么落地，可以把你现在最头疼的资料、销售或交付场景发给我。我会用具体场景来拆，而不是泛泛聊 AI。`,
  ].join("\n\n");

  const summary = inferSummary(markdown);
  const predictionLog = buildPredictionLog({ topic, reader, business, title, score, selected, coreClaim });
  return { title, summary, markdown, score, predictionLog };
}

function collectSourceBlocks(input) {
  return [
    ...splitSourceText(input.obsidian, "Obsidian"),
    ...splitSourceText(input.lark, "飞书"),
    ...splitSourceText(input.trends, "趋势"),
    ...splitSourceText((input.uploadedSources || []).map((item) => `${item.name}\n${item.text}`).join("\n\n"), "上传文档"),
    ...splitSourceText(extractLinkReferenceText(input.sourceLinks), "素材链接"),
    ...(input.sourceImages || []).map((image, index) => ({
      id: `图片-${index + 1}`,
      source: "图片",
      title: image.name || `图片 ${index + 1}`,
      text: `${image.name || `图片 ${index + 1}`}：用户上传或粘贴的视觉素材，可作为封面、案例截图或正文配图。${image.note || ""}`,
    })),
  ];
}

function extractLinkReferenceText(text) {
  return text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      if (/feishu|larksuite|docs\.qq|yuque|notion|obsidian/i.test(line)) {
        return `${line}\n私有知识链接：需要后端授权连接器读取正文；当前先作为引用线索参与选题和素材规划。`;
      }
      return `${line}\n公开链接：如果浏览器允许跨域读取，会进入上传文档素材；否则作为引用线索。`;
    })
    .join("\n\n");
}

function splitSourceText(text, source) {
  return text
    .replace(/\r\n/g, "\n")
    .split(/\n{2,}|(?=^#{1,3}\s+)/gm)
    .map((block) => block.replace(/^#{1,3}\s*/, "").trim())
    .filter((block) => block.length > 12)
    .map((block, index) => ({
      id: `${source}-${index + 1}`,
      source,
      text: block,
      title: inferBlockTitle(block),
    }));
}

function inferBlockTitle(block) {
  const first = block.split("\n").map((line) => line.trim()).find(Boolean) || "";
  return first.replace(/[。！？!?].*$/, "").slice(0, 28) || "素材";
}

function extractKeywords(text) {
  const cleaned = text
    .replace(/[，。！？、；：,.!?;:()[\]{}"']/g, " ")
    .split(/\s+/)
    .flatMap((part) => part.split(/(?=[A-Z][a-z])|(?<=知识库)|(?<=AI)|(?<=企业)|(?<=销售)|(?<=交付)/))
    .map((part) => part.trim())
    .filter((part) => part.length >= 2);
  return [...new Set([...cleaned, "AI", "知识库", "企业", "销售", "交付", "客户", "效率", "获客"])];
}

function scoreSourceBlock(source, keywords, business) {
  const text = source.text;
  const keywordHits = keywords.filter((keyword) => text.includes(keyword)).length;
  const businessHits = ["知识库", "客户", "销售", "交付", "效率", "话术", "SOP", "Agent", "RAG", "获客"].filter((keyword) => text.includes(keyword)).length;
  const specificity = Math.min(5, (text.match(/\d+|阶段|问题|案例|客户|会议|复盘|方案/g) || []).length);
  const sourceWeight = source.source === "飞书" ? 2 : source.source === "Obsidian" ? 1.5 : 1.2;
  return {
    ...source,
    score: keywordHits * 1.1 + businessHits * 1.5 + specificity + sourceWeight + (text.includes(business) ? 3 : 0),
    keywordHits,
    businessHits,
  };
}

function buildCoreClaim(topic, business, selected) {
  const hasSales = selected.some((item) => /销售|客户|话术|转化/.test(item.text));
  const hasDelivery = selected.some((item) => /交付|SOP|复盘|一致/.test(item.text));
  if (hasSales && hasDelivery) {
    return `${topic}的关键，不是再买一个更炫的 AI 工具，而是把销售、交付和客户问题里的高频经验变成可复用的 ${business}。`;
  }
  return `${topic}的关键，不是资料越多越好，而是让组织在需要答案的时候，更快拿到已经被验证过的判断。`;
}

function buildAgentTitle(topic, business, selected) {
  const hasPain = selected.some((item) => /新人|重复|找不到|不一致|浪费/.test(item.text));
  if (hasPain) return `${topic}：不是缺工具，而是缺可复用经验`;
  if (topic.length <= 28) return `${topic}，真正的机会在哪里？`;
  return `${business} 的下一波机会：${topic.slice(0, 18)}`;
}

function buildOpening(topic, reader, selected) {
  const pain = selected.find((item) => /新人|重复|找不到|不一致|浪费|老板|客户/.test(item.text));
  const detail = pain ? summarizeText(pain.text, 86) : `如果你是${reader}，这个问题大概率已经不只是技术问题，而是业务效率问题。`;
  return `这篇先不泛泛聊 ${topic}。我更关心一个具体问题：${detail}`;
}

async function handleSourceFiles(event) {
  const files = [...event.target.files];
  if (!files.length) return;
  setSourceStatus(`正在读取 ${files.length} 个文件...`);
  const nextSources = [...(state.uploadedSources || [])];
  const nextImages = [...(state.sourceImages || [])];

  for (const file of files) {
    try {
      if (file.type.startsWith("image/")) {
        nextImages.push(await imageFileToSource(file));
        continue;
      }
      nextSources.push({
        name: file.name,
        type: file.type || file.name.split(".").pop(),
        text: await extractFileText(file),
      });
    } catch (error) {
      nextSources.push({
        name: file.name,
        type: "error",
        text: `文件 ${file.name} 暂时无法在浏览器内解析：${error.message || error}。建议先转成 Markdown/TXT，或后续接入后端文档解析服务。`,
      });
    }
  }

  state.uploadedSources = nextSources.slice(-20);
  state.sourceImages = nextImages.slice(-12);
  event.target.value = "";
  setSourceStatus(`已接入 ${state.uploadedSources.length} 个文档、${state.sourceImages.length} 张图片。`);
  render();
}

async function extractFileText(file) {
  const lower = file.name.toLowerCase();
  if (lower.endsWith(".txt") || lower.endsWith(".md") || lower.endsWith(".markdown")) return await file.text();
  if (lower.endsWith(".html") || lower.endsWith(".htm")) return htmlToMarkdown(await file.text());
  if (lower.endsWith(".docx")) {
    if (!window.mammoth) throw new Error("Word 解析库未加载");
    const result = await window.mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() });
    return result.value;
  }
  if (lower.endsWith(".pdf")) {
    if (!window.pdfjsLib) throw new Error("PDF 解析库未加载");
    window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
    const pdf = await window.pdfjsLib.getDocument({ data: await file.arrayBuffer() }).promise;
    const pages = [];
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum += 1) {
      const page = await pdf.getPage(pageNum);
      const content = await page.getTextContent();
      pages.push(content.items.map((item) => item.str).join(" "));
    }
    return pages.join("\n\n");
  }
  return await file.text();
}

async function imageFileToSource(file) {
  return {
    name: file.name,
    type: file.type,
    dataUrl: await fileToDataUrl(file),
    note: "浏览器版暂不做 OCR；图片会作为视觉素材进入排版，后端可接 OCR/多模态模型提取内容。",
  };
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function handleImagePaste(event) {
  const items = [...(event.clipboardData?.items || [])];
  const imageItems = items.filter((item) => item.type.startsWith("image/"));
  if (!imageItems.length) return;
  const images = [...(state.sourceImages || [])];
  for (const item of imageItems) {
    const file = item.getAsFile();
    if (file) images.push(await imageFileToSource(file));
  }
  state.sourceImages = images.slice(-12);
  setSourceStatus(`已从剪贴板接入 ${imageItems.length} 张图片。`);
  render();
}

async function fetchSourceLinks() {
  const links = parseLinks(state.sourceLinks);
  if (!links.length) {
    setSourceStatus("先粘贴素材链接，每行一个。");
    return;
  }
  setSourceStatus(`正在尝试读取 ${links.length} 个公开链接...`);
  const fetched = [];
  for (const url of links) {
    if (/feishu|larksuite|obsidian:/i.test(url)) {
      fetched.push({
        name: url,
        type: "private-link",
        text: `${url}\n这是私有知识源链接。浏览器静态版无法代替你完成授权读取；后端连接器需要用飞书/本地 Obsidian 权限读取正文。当前先登记为素材线索。`,
      });
      continue;
    }
    try {
      const response = await fetch(url, { mode: "cors" });
      const contentType = response.headers.get("content-type") || "";
      const raw = await response.text();
      const text = contentType.includes("html") ? htmlToMarkdown(raw) : raw;
      fetched.push({ name: url, type: contentType || "url", text: summarizeText(text, 3000) });
    } catch {
      fetched.push({
        name: url,
        type: "url-reference",
        text: `${url}\n浏览器因 CORS、登录或权限限制无法直接读取。后端 Source Agent 可用授权、代理或 API 抓取正文；当前先作为引用线索。`,
      });
    }
  }
  state.uploadedSources = [...(state.uploadedSources || []), ...fetched].slice(-20);
  setSourceStatus(`链接处理完成：新增 ${fetched.length} 条素材记录。`);
  render();
}

function parseLinks(text) {
  return text
    .split(/\s+/)
    .map((item) => item.trim())
    .filter((item) => /^(https?:\/\/|obsidian:\/\/)/i.test(item));
}

function setSourceStatus(message) {
  els.sourceStatus.textContent = message;
}

function renderSourceAssets() {
  const docCount = (state.uploadedSources || []).length;
  const imageCount = (state.sourceImages || []).length;
  if (!els.sourceStatus.textContent || els.sourceStatus.textContent.includes("支持粘贴")) {
    els.sourceStatus.textContent = `已接入 ${docCount} 个文档、${imageCount} 张图片。私有飞书/Obsidian 链接需要后端授权读取。`;
  }
  els.imageGallery.innerHTML = (state.sourceImages || [])
    .slice(-6)
    .map((image) => `<div class="image-tile"><img src="${image.dataUrl}" alt="${escapeAttribute(image.name)}"><span>${escapeHtml(image.name)}</span></div>`)
    .join("");
}

function renderPipelinePanel() {
  const steps = state.pipeline?.length
    ? state.pipeline
    : [
        "Source Agent：接入文档、图片、链接和私有知识源",
        "Knowledge Agent：从素材中召回业务经验和案例",
        "Trend Agent：补充最新 AI 产品和行业变化",
        "Writing Agent：重组观点并生成文章",
        "Scoring Agent：给传播分、获客分和预测日志",
        "Publish Agent：排版、草稿箱和手机确认",
      ];
  els.pipelinePanel.innerHTML = steps
    .map((step, index) => `<div class="pipeline-step"><i>${index + 1}</i><span>${escapeHtml(step)}</span></div>`)
    .join("");
}

function updatePipeline(result) {
  const sourceCount = (state.uploadedSources || []).length + parseLinks(state.sourceLinks).length;
  const imageCount = (state.sourceImages || []).length;
  state.pipeline = [
    `Source Agent：接入 ${sourceCount} 条链接/文档线索、${imageCount} 张图片`,
    `Knowledge Agent：筛选 ${result.score.selectedSources.length} 条高相关素材`,
    "Trend Agent：补充趋势、产品和竞品信号",
    `Writing Agent：围绕“${result.title}”生成新文章`,
    `Scoring Agent：传播分 ${result.score.virality.toFixed(1)}，获客分 ${result.score.conversion.toFixed(1)}`,
    "Publish Agent：已进入排版预览，可复制富文本或后续创建公众号草稿",
  ];
}

function buildTrendSection(trends, topic) {
  if (!trends.length) {
    return `外部趋势给了一个提醒：${topic} 不能只从工具角度理解。工具会越来越便宜，真正稀缺的是企业内部可复用的业务知识。`;
  }
  return trends
    .slice(0, 3)
    .map((item) => `- **${item.title}**：${summarizeText(item.text, 88)}`)
    .join("\n");
}

function buildKnowledgeSection(obsidian, lark, business) {
  const items = [...obsidian.slice(0, 3), ...lark.slice(0, 3)];
  if (!items.length) {
    return `要写好这类文章，必须从自己的 ${business} 经验里拿材料：客户问过什么、销售卡在哪里、交付重复解释什么。没有这些，文章就会变成普通趋势评论。`;
  }
  return items.map((item) => `- **${item.source} / ${item.title}**：${summarizeText(item.text, 92)}`).join("\n");
}

function buildSynthesisSection(topic, business, selected) {
  const fragments = [
    `第一，${topic} 不是一个“资料整理”问题，而是一个“业务答案复用”问题。`,
    `第二，${business} 的落点应该从高频业务场景开始，而不是从大而全平台开始。`,
    `第三，真正能获客的内容，要把外部趋势和自己的客户经验接起来，让读者看到“这就是我公司正在发生的事”。`,
  ];
  if (selected.some((item) => /责任人|更新|版本/.test(item.text))) {
    fragments.push("第四，知识库必须有责任人和更新节奏，否则它很快会退化成又一个没人看的文档库。");
  }
  return fragments.join("\n\n");
}

function buildActionList(business, selected) {
  const base = [
    "先列出最近 30 天客户问得最多的 20 个问题。",
    "把老销售、交付负责人、客服的最佳回答整理成标准答案。",
    "每个答案都补上案例、适用边界和下一步动作。",
    "指定责任人，每周更新一次过期答案。",
    `最后再接入 AI，让它基于这些已验证内容服务 ${business}。`,
  ];
  if (selected.some((item) => /SOP|交付/.test(item.text))) base.splice(3, 0, "把交付 SOP 拆成“触发条件、执行步骤、风险提醒、交付物模板”。");
  if (selected.some((item) => /话术|销售/.test(item.text))) base.splice(2, 0, "把销售话术按客户阶段分类：初次咨询、方案比较、价格异议、交付顾虑。");
  return base.slice(0, 6);
}

function buildCommercialSection(business, reader) {
  return `对 ${reader} 来说，${business} 最容易被低估的地方，是它不只是一个内部效率工具。它还能变成销售训练、交付一致性、客户成功和内容获客的共同底座。\n\n所以判断一家公司要不要做，不要先问“有没有 AI 预算”，先问三个问题：客户问题是否重复出现？团队回答是否不一致？优秀经验是否只存在少数人脑子里？如果答案都是是，这件事就已经值得启动。`;
}

function scoreKnowledgeArticle(input) {
  const text = `${input.topic} ${input.reader} ${input.business} ${input.selected.map((item) => item.text).join(" ")} ${input.coreClaim} ${input.actionList.join(" ")}`;
  const bySource = new Set(input.selected.map((item) => item.source));
  const dimensions = {
    TS: clampScore(1.5 + keywordCount(text, ["趋势", "现在", "AI", "企业", "刚需", "产品", "市场"]) / 2.5),
    KA: clampScore(1 + bySource.size * 0.8 + Math.min(1.4, input.selected.length / 5)),
    IG: clampScore(1.5 + keywordCount(text, ["不是", "而是", "真正", "底座", "复用", "判断", "框架"]) / 2.5),
    UV: clampScore(1.5 + input.actionList.length / 2.2),
    SC: clampScore(1.2 + keywordCount(`${input.title} ${input.coreClaim}`, ["不是", "而是", "刚需", "缺", "真正", "可复用"]) / 2.4),
    CV: clampScore(1.8 + keywordCount(text, ["获客", "咨询", "销售", "转化", "服务", "客户", input.business]) / 2.8),
    SN: clampScore(2.5 + (input.selected.length >= 4 ? 0.8 : 0) + (input.actionList.length >= 4 ? 0.8 : 0)),
    CE: clampScore(1 + bySource.size * 0.7 + Math.min(1.6, input.selected.filter((item) => /\d+|会议|客户|案例|趋势/.test(item.text)).length / 3)),
  };
  const virality = ((dimensions.TS + dimensions.IG + dimensions.SC + dimensions.SN + dimensions.CE) / 5) * 2;
  const conversion = ((dimensions.KA + dimensions.UV + dimensions.CV + dimensions.CE + dimensions.TS) / 5) * 2;
  const composite = Object.values(dimensions).reduce((sum, value) => sum + value, 0) / 8 * 2;
  return {
    dimensions,
    virality,
    conversion,
    composite,
    selectedSources: input.selected,
    prediction: predictOutcome(virality, conversion, composite),
  };
}

function keywordCount(text, keywords) {
  return keywords.filter((keyword) => keyword && text.includes(keyword)).length;
}

function clampScore(value) {
  return Math.max(0, Math.min(5, Math.round(value)));
}

function predictOutcome(virality, conversion, composite) {
  const bucket = composite >= 8.2 ? "小爆" : composite >= 7 ? "命中" : composite >= 5.6 ? "基础盘" : "待打磨";
  const share = virality >= 8 ? "高" : virality >= 6.5 ? "中" : "低";
  const leads = conversion >= 8 ? "2-5 个咨询线索" : conversion >= 6.5 ? "1-2 个咨询线索" : "更适合先做品牌铺垫";
  const focus = conversion > virality ? "获客优先" : virality > conversion ? "传播优先" : "传播与获客平衡";
  return { bucket, share, leads, focus };
}

function buildPredictionLog(input) {
  const score = input.score;
  const rows = DIMENSIONS.map(([key, name]) => `| ${key} ${name} | ${score.dimensions[key]} | ${dimensionReason(key, score)} |`).join("\n");
  const sourceRows = score.selectedSources
    .map((item) => `- ${item.source} / ${item.title}：${summarizeText(item.text, 80)}`)
    .join("\n");
  return `# ${input.title} — 内容预测

**Article ID**: ${hashText(input.title + input.topic)}
**Theme**: ${input.topic}
**Target Reader**: ${input.reader}
**Business Line**: ${input.business}
**Rubric Version**: article-v0
**Prediction Time**: ${formatDate(new Date())}
**Data Status**: blind

## 评分

| 维度 | 分 | 理由 |
|---|---:|---|
${rows}

传播分：${score.virality.toFixed(1)}
获客分：${score.conversion.toFixed(1)}
综合分：${score.composite.toFixed(1)}

## 预测

- 预期表现：${score.prediction.bucket}
- 分享冲动：${score.prediction.share}
- 获客判断：${score.prediction.leads}
- 内容定位：${score.prediction.focus}

## 核心判断

> ${input.coreClaim}

## 使用素材

${sourceRows || "- 暂无素材"}

## 关键校准假设

如果这篇阅读一般但咨询高，说明 CV/UV 比 SC 更能预测业务价值。
如果阅读高但咨询低，说明主题有传播性，但商业承接仍需重写。
发布后 T+7d 复盘阅读、分享、收藏、评论关键词和咨询线索。`;
}

function dimensionReason(key, score) {
  const sourceCount = score.selectedSources.length;
  const sourceTypes = new Set(score.selectedSources.map((item) => item.source)).size;
  const reasons = {
    TS: "主题连接 AI 趋势、企业痛点和业务主线",
    KA: `调用 ${sourceTypes} 类来源、${sourceCount} 条素材`,
    IG: "形成了“不是工具，而是经验复用”的新判断",
    UV: "给出可执行步骤和落地路径",
    SC: "标题和核心判断具备反常识表达",
    CV: "自然导向 AI 企业知识库服务咨询",
    SN: "按现象、知识、判断、行动、承接组织",
    CE: "组合内部经验与外部趋势作为证据",
  };
  return reasons[key] || "已评分";
}

function renderScorePanel() {
  if (!state.lastScore) {
    els.scorePanel.innerHTML = `<div class="score-panel-empty">生成文章后显示传播分、获客分和 8 维评分。</div>`;
    return;
  }
  const score = state.lastScore;
  const dimensions = DIMENSIONS.map(([key, name]) => {
    const value = score.dimensions[key] || 0;
    return `<div class="dimension-row">
      <span>${key}</span>
      <span class="dimension-bar"><i style="width:${value * 20}%"></i></span>
      <b>${value}</b>
    </div>`;
  }).join("");
  const sources = (score.selectedSources || [])
    .slice(0, 4)
    .map((item) => `<li><b>${escapeHtml(item.source)}</b> ${escapeHtml(item.title)}：${escapeHtml(summarizeText(item.text, 42))}</li>`)
    .join("");
  els.scorePanel.innerHTML = `<div class="score-summary">
    <div class="score-pill"><span>传播分</span><strong>${score.virality.toFixed(1)}</strong></div>
    <div class="score-pill"><span>获客分</span><strong>${score.conversion.toFixed(1)}</strong></div>
    <div class="score-pill"><span>综合</span><strong>${score.composite.toFixed(1)}</strong></div>
  </div>
  <div class="dimension-grid">${dimensions}</div>
  <ul class="source-list">${sources || "<li>暂无入选素材</li>"}</ul>`;
}

async function copyPredictionLog() {
  if (!state.predictionLog) {
    setCopyState("先生成文章预测");
    return;
  }
  await navigator.clipboard.writeText(state.predictionLog);
  setCopyState("预测日志已复制");
}

function downloadPredictionLog() {
  if (!state.predictionLog) {
    setCopyState("先生成文章预测");
    return;
  }
  const blob = new Blob([state.predictionLog], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${safeFileName(state.title || "prediction")}-prediction.md`;
  link.click();
  URL.revokeObjectURL(url);
  setCopyState("预测日志已下载");
}

function summarizeText(text, maxLength) {
  return text.replace(/\s+/g, " ").trim().slice(0, maxLength);
}

function hashText(text) {
  let hash = 0;
  for (let i = 0; i < text.length; i += 1) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(16).padStart(8, "0").slice(0, 12);
}

function shouldReplaceTitle(title) {
  return !title || title === defaultState.title || title === "未命名文章";
}

function shouldReplaceSummary(summary) {
  return !summary || summary === defaultState.summary || summary.length < 20;
}

function htmlToMarkdown(html) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const walk = (node) => {
    if (node.nodeType === Node.TEXT_NODE) return node.textContent.replace(/\s+/g, " ");
    if (node.nodeType !== Node.ELEMENT_NODE) return "";
    const tag = node.tagName.toLowerCase();
    const text = Array.from(node.childNodes).map(walk).join("").trim();
    if (!text && tag !== "img") return "";
    if (tag === "h1") return `# ${text}\n\n`;
    if (tag === "h2") return `## ${text}\n\n`;
    if (tag === "h3") return `### ${text}\n\n`;
    if (tag === "p" || tag === "div" || tag === "section") return `${text}\n\n`;
    if (tag === "strong" || tag === "b") return `**${text}**`;
    if (tag === "em" || tag === "i") return `*${text}*`;
    if (tag === "blockquote") return `> ${text}\n\n`;
    if (tag === "li") return `- ${text}\n`;
    if (tag === "br") return "\n";
    if (tag === "img") return `![图片](${node.getAttribute("src") || node.getAttribute("data-src") || ""})\n\n`;
    if (tag === "a") return `[${text}](${node.getAttribute("href") || ""})`;
    return text;
  };
  return Array.from(doc.body.childNodes).map(walk).join("").replace(/\n{3,}/g, "\n\n").trim();
}

function insertMarkdown(text) {
  const input = els.markdown;
  const start = input.selectionStart;
  const end = input.selectionEnd;
  const prefix = input.value.slice(0, start);
  const suffix = input.value.slice(end);
  const spacerBefore = prefix && !prefix.endsWith("\n") ? "\n\n" : "";
  const spacerAfter = suffix && !suffix.startsWith("\n") ? "\n\n" : "";
  input.value = `${prefix}${spacerBefore}${text}${spacerAfter}${suffix}`;
  input.focus();
  const cursor = prefix.length + spacerBefore.length + text.length;
  input.setSelectionRange(cursor, cursor);
  state.markdown = input.value;
  render();
}

function resetDraft() {
  if (!confirm("清空当前草稿并恢复默认样稿？")) return;
  localStorage.removeItem(STORAGE_KEY);
  state = { ...defaultState };
  hydrateInputs();
  render();
}

function persistSoon() {
  clearTimeout(saveTimer);
  els.saveState.textContent = "正在保存...";
  saveTimer = setTimeout(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    els.saveState.textContent = `已自动保存 ${new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })}`;
  }, 250);
}

function setCopyState(message) {
  els.copyState.textContent = message;
  setTimeout(() => {
    els.copyState.textContent = "等待复制";
  }, 3000);
}

function countCjkAware(text) {
  return (text || "").replace(/\s/g, "").length;
}

function formatDate(date) {
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

function safeFileName(name) {
  return name.replace(/[\\/:*?"<>|]/g, "-").slice(0, 40);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("\n", "");
}
