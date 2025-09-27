import { toCamelCase, toKebabCase, toPascalCase, toScreamingSnakeCase, toSnakeCase } from "./variableCorrector";

export function formatVariableNameByLanguage(languageId: string, words: string[]) {
    switch (languageId) {
        case "python":
        case "c":
        case "cpp":
        case "rust":
        case "go":
            return toSnakeCase(words);
        case "javascript":
        case "typescript":
            return toCamelCase(words);
        case "java":
        case "csharp":
        case "dart":
        case "kotlin":
            return toCamelCase(words);
        default:
            return toCamelCase(words);
    }
}

export function formatConstantNameByLanguage(languageId: string, words: string[]) {
    switch (languageId) {
        // Vue / Svelte: kebab-case (HTML attribute 스타일)
        case "vue":
        case "svelte":
            return toKebabCase(words);
        default:
            return toScreamingSnakeCase(words); // 거의 모든 언어 동일
    }
}

export function formatFunctionNameByLanguage(languageId: string, words: string[]) {
    switch (languageId) {
        case "python":
        case "c":
        case "cpp":
        case "rust":
        case "go":
            return toSnakeCase(words);
        default:
            return toCamelCase(words); // JS, TS, Java 등
    }
}

export function formatClassNameByLanguage(languageId: string, words: string[]) {
    return toPascalCase(words); // 거의 모든 언어 공통
}