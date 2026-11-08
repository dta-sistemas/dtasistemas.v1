import { SectorTile } from "../cards/SectorTile";

type Row = { slug: string; name: string; tags: string[]; href: string };

/**
 * Mosaico de sectores. Con 5 fichas (Home: 4 sectores + "otros"): 3 arriba y 2 más anchas
 * abajo. Con 4 (página de sectores): cuadrícula de 2 × 2.
 */
export function SectorGrid({ rows }: { rows: Row[] }) {
  const span = (i: number) => (rows.length === 5 && i < 3 ? "md:col-span-4" : "md:col-span-6");

  return (
    <div className="grid gap-5 md:grid-cols-12">
      {rows.map((s, i) => (
        <div key={s.slug} className={span(i)}>
          <SectorTile slug={s.slug} name={s.name} tags={s.tags} href={s.href} />
        </div>
      ))}
    </div>
  );
}
