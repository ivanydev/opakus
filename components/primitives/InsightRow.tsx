export default function InsightRow({ label, value, detail, tone = 'blue' }: { label: string; value: string; detail: string; tone?: string }) {
  return <div className="insight-row"><span className={`insight-dot ${tone}`} /><div><strong>{label}</strong><small>{detail}</small></div><b>{value}</b></div>
}