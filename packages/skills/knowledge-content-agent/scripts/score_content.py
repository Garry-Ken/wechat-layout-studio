#!/usr/bin/env python3
import json
import re
import sys
from pathlib import Path


def clamp(value, low=1.0, high=10.0):
    return max(low, min(high, value))


def count(pattern, text):
    return len(re.findall(pattern, text, flags=re.I))


def score(text):
    headings = count(r"^##\s+", text)
    bullets = count(r"^\s*[-*]\s+", text)
    numbers = count(r"\d+", text)
    cta = count(r"(私信|联系|咨询|发给我|预约|加我|留言|下载|试用)", text)
    proof = count(r"(案例|客户|复盘|数据|会议|截图|对比|实验|验证)", text)
    useful = count(r"(步骤|清单|方法|路径|建议|怎么做|可以直接)", text)
    spread = count(r"(不是.*而是|真正|关键|反常识|误区|机会|判断)", text)
    private = count(r"(Obsidian|飞书|Lark|会议纪要|客户问题|知识库|SOP)", text)
    length = len(re.sub(r"\s+", "", text))

    topic_sharpness = clamp(4 + min(2, headings / 2) + min(2, spread / 3) + (1 if length > 1200 else 0))
    knowledge_activation = clamp(3 + min(3, private / 3) + min(2, proof / 4) + (1 if "客户" in text else 0))
    information_gain = clamp(4 + min(2, numbers / 4) + min(2, proof / 5) + min(1.5, spread / 5))
    proof_value = clamp(3 + min(4, proof / 3) + min(1.5, numbers / 3))
    usefulness = clamp(4 + min(3, useful / 3) + min(1.5, bullets / 5))
    spreadability = clamp(4 + min(3, spread / 3) + min(1, headings / 5))
    conversion_fit = clamp(3 + min(3, cta * 1.5) + min(2, private / 4) + (1 if "服务" in text else 0))
    narrative_energy = clamp(4 + min(2, headings / 3) + min(2, spread / 4) + (1 if 1000 <= length <= 3500 else 0))

    virality = topic_sharpness * 0.2 + information_gain * 0.25 + spreadability * 0.35 + narrative_energy * 0.2
    conversion = knowledge_activation * 0.25 + proof_value * 0.2 + usefulness * 0.25 + conversion_fit * 0.3
    composite = virality * 0.45 + conversion * 0.55

    return {
        "length": length,
        "dimensions": {
            "topic_sharpness": round(topic_sharpness, 1),
            "knowledge_activation": round(knowledge_activation, 1),
            "information_gain": round(information_gain, 1),
            "proof_value": round(proof_value, 1),
            "usefulness": round(usefulness, 1),
            "spreadability": round(spreadability, 1),
            "conversion_fit": round(conversion_fit, 1),
            "narrative_energy": round(narrative_energy, 1),
        },
        "virality": round(virality, 1),
        "conversion": round(conversion, 1),
        "composite": round(composite, 1),
    }


def main():
    if len(sys.argv) != 2:
        print("Usage: score_content.py <markdown-file>", file=sys.stderr)
        return 2
    text = Path(sys.argv[1]).read_text(encoding="utf-8")
    print(json.dumps(score(text), ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
