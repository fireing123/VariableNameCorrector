import { toCamelCase, toKebabCase, toPascalCase, toScreamingSnakeCase, toSnakeCase } from "./variableCorrector";


export function RenameByLanguage(languageId: string, words: string[]) {
        switch (languageId) {
        // Python: snake_case
        case "python":
            return toSnakeCase(words);

        // JavaScript / TypeScript: camelCase
        case "javascript":
        case "typescript":
            return toCamelCase(words);

        // Java / C# / Dart / Kotlin: PascalCase
        case "java":
        case "csharp":
        case "dart":
        case "kotlin":
            return toPascalCase(words);

        // C / C++ / Rust / Go: snake_case
        case "c":
        case "cpp":
        case "rust":
        case "go":
            return toSnakeCase(words);

        // CSS / SCSS / Less: kebab-case
        case "css":
        case "scss":
        case "less":
            return toKebabCase(words);

        // Environment constants: SCREAMING_SNAKE_CASE
        case "yaml":
        case "json":
        case "jsonc":
        case "powershell":
        case "bash":
        case "shellscript":
            return toScreamingSnakeCase(words);

        // Vue / Svelte: kebab-case (HTML attribute style)
        case "vue":
        case "svelte":
            return toKebabCase(words);

        // Default: camelCase
        default:
            return toCamelCase(words);
    }
}

export function LiteralRenameByLanguage(languageId: string, words: string[]) {
    switch (languageId) {
        // Python: SCREAMING_SNAKE_CASE
        case "python":
            return toScreamingSnakeCase(words);

        // JavaScript / TypeScript: SCREAMING_SNAKE_CASE
        case "javascript":
        case "typescript":
            return toScreamingSnakeCase(words);

        // Java / C# / Dart / Kotlin: SCREAMING_SNAKE_CASE
        case "java":
        case "csharp":
        case "dart":
        case "kotlin":
            return toScreamingSnakeCase(words);

        // C / C++ / Rust / Go: SCREAMING_SNAKE_CASE
        case "c":
        case "cpp":
        case "rust":
        case "go":
            return toScreamingSnakeCase(words);

        // CSS / SCSS / Less: kebab-case는 일반적으로 상수 없음
        case "css":
        case "scss":
        case "less":
            return toScreamingSnakeCase(words); // 필요 시 조정 가능

        // JSON / YAML / 환경 변수
        case "yaml":
        case "json":
        case "jsonc":
        case "powershell":
        case "shellscript":
            return toScreamingSnakeCase(words);

        // Vue / Svelte: kebab-case (HTML attribute 스타일)
        case "vue":
        case "svelte":
            return toKebabCase(words);

        // Default: SCREAMING_SNAKE_CASE
        default:
            return toScreamingSnakeCase(words);
    }
}
