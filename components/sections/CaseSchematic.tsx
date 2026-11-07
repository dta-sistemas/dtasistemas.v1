/**
 * Esquema antes → después de un caso: nodos sueltos en gris a la izquierda; los mismos
 * nodos unidos por líneas azules a la derecha (azul = conectado). Sustituye a las capturas
 * de pantalla de terceros que había antes. Decorativo: el contenido real está en el texto.
 */
export function CaseSchematic({ nodes = 3, before, after, dark = false }: { nodes?: number; before: string; after: string; dark?: boolean }) {
  const gray = dark ? "fill-white/30" : "fill-dta-gray-300";
  const grayText = dark ? "fill-white/55" : "fill-dta-gray-600";
  const blueText = dark ? "fill-dta-blue-300" : "fill-dta-blue-600";
  const lineBlue = dark ? "stroke-dta-blue-300" : "stroke-dta-blue-600";
  const nodeBlue = dark ? "fill-dta-blue-300" : "fill-dta-blue-600";
  const hubFill = dark ? "fill-dta-navy-900 stroke-dta-blue-300" : "fill-white stroke-dta-blue-600";
  const left = [
    [22, 24],
    [58, 52],
    [30, 62],
    [74, 22],
  ].slice(0, nodes);
  const hub: [number, number] = [248, 40];
  const right = [
    [206, 18],
    [214, 64],
    [284, 24],
    [290, 60],
  ].slice(0, nodes);

  return (
    <svg viewBox="0 0 320 96" role="presentation" aria-hidden="true" className="h-24 w-full max-w-sm">
      {left.map(([x, y], i) => (
        <circle key={`l${i}`} cx={x} cy={y} r="6" className={gray} />
      ))}
      <text x="4" y="90" className={`${grayText} font-mono text-[11px]`}>
        {before}
      </text>
      <line x1="112" y1="40" x2="148" y2="40" className={dark ? "stroke-white/30" : "stroke-dta-gray-300"} strokeWidth="1" strokeDasharray="3 3" />
      {right.map(([x, y], i) => (
        <line key={`k${i}`} x1={hub[0]} y1={hub[1]} x2={x} y2={y} className={lineBlue} strokeWidth="1.5" />
      ))}
      {right.map(([x, y], i) => (
        <circle key={`r${i}`} cx={x} cy={y} r="6" className={nodeBlue} />
      ))}
      <circle cx={hub[0]} cy={hub[1]} r="9" className={hubFill} strokeWidth="2" />
      <text x="168" y="90" className={`${blueText} font-mono text-[11px]`}>
        {after}
      </text>
    </svg>
  );
}
