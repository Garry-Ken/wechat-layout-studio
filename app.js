const STORAGE_KEY = "wechat-layout-studio-state-v1";

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
  document.querySelector("#cleanPasteBtn").addEventListener("click", cleanClipboardPaste);
  document.querySelector("#resetBtn").addEventListener("click", resetDraft);
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
