interface JsonLdProps {
    data: Record<string, unknown>;
}

// Структурированные данные для поисковиков (schema.org). "<" экранируем, чтобы текст из API не закрыл тег script
export const JsonLd: React.FC<JsonLdProps> = ({ data }) => (
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
);
