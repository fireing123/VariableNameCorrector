import { abbreviationDictionary } from "./abbreviationDictionary";

export function divineWords(variableName: string, allAbbr: Set<string> = new Set([])) {
    const words: string[] = [];
    

    // 1. kebab → underscore
    let normalized = variableName.replace(/-/g, "_");

    // 2. 약어 먼저 분리 → XXX_HTTP_XXX
    for (const abbr of allAbbr) {
        // 전부 대문자로만 일치할 때
        const regex = new RegExp(abbr, "g");
        normalized = normalized.replace(regex, `_${abbr}_`);
    }

    // 3. 중복 언더스코어 제거
    normalized = normalized.replace(/__+/g, "_").replace(/^_|_$/g, "");

    // 4. underscore 기준으로 나눠서 각 조각 처리
    const parts = normalized.split("_");
    

    for (const part of parts) {
        if (allAbbr.has(part)) {
            words.push(part.toLowerCase());
            continue;
        }

        // camelCase / PascalCase / 대문자 연속 처리
        const subWords = part.match(/[A-Z]+(?=[A-Z][a-z])|[A-Z]?[a-z]+|[A-Z]+/g) || [];
        for (const w of subWords) {
            words.push(w.toLowerCase());
        }
    }

    return words;
}

export function toCamelCase(words: string[]) {
    const capitalizedWords = words.map((v, i) => {
        if (i === 0) {
            return v;
        }
        return wordCapitalize(v);
    });
    return capitalizedWords.join("");
}

export function toPascalCase(words: string[]) {
    const capitalizedWords = words.map((v) => {
        return wordCapitalize(v);
    });
    return capitalizedWords.join("");
}

export function toSnakeCase(words: string[]) {
    return words.join("_");
}

export function toScreamingSnakeCase(words: string[]) {
    const uppedCWords = words.map((v) => {
        return v.toUpperCase();
    });
    return uppedCWords.join("_");
}

export function toKebabCase(words: string[]) {
    return words.join("-");
}

export function toTrainCase(words: string[]) {
    const capitalizedWords = words.map((v) => {
        return wordCapitalize(v);
    });
    return capitalizedWords.join("-");
}

export function wordCapitalize(word: string) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}