export default function MiniBars({ values = [42, 58, 48, 76, 64, 82, 72, 91] }: { values?: number[] }) {
  return <div className="mini-bars" aria-label="Evolução semanal">{values.map((value, index) => <span key={index} style={{ height: `${value}%` }} />)}</div>
}