export default function Sparkline({ tone = 'blue', points = '0,42 16,35 32,38 48,22 64,28 80,14 96,18 112,6' }: { tone?: 'blue' | 'green' | 'red' | 'purple'; points?: string }) {
  return (
    <svg className={`sparkline sparkline-${tone}`} viewBox="0 0 112 48" role="img" aria-label="Tendência">
      <polyline points={points} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points={`0,47 ${points} 112,47`} fill="currentColor" opacity=".08" stroke="none" />
    </svg>
  )
}