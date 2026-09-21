import React from 'react'

export default function Donut({ value, label, tone = 'blue' }: { value: number; label: string; tone?: string }) {
  return (
    <div className={`donut donut-${tone}`} style={{ '--donut-value': `${value * 3.6}deg` } as React.CSSProperties}>
      <div className="donut-center"><strong>{value}%</strong><span>{label}</span></div>
    </div>
  )
}