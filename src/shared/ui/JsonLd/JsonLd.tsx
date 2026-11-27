interface JsonLdProps {
    data: Record<string, unknown>;
}

export const JsonLd: React.FC<JsonLdProps> = ({ data }) => (
    <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
);
