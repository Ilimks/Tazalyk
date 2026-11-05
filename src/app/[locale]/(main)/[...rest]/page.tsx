import { notFound } from 'next/navigation';

// Любой несуществующий адрес внутри языка (/ru/abc) показывает not-found.tsx с шапкой и футером
export default function CatchAll() {
  notFound();
}
