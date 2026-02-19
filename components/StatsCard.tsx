interface StatsCardProps {
  emoji: string
  label: string
  count: number
  description: string
  color: 'blue' | 'green' | 'purple' | 'amber'
}

const colorMap = {
  blue: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-100',
  },
  green: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    border: 'border-green-100',
  },
  purple: {
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    border: 'border-purple-100',
  },
  amber: {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-100',
  },
}

export default function StatsCard({ emoji, label, count, description, color }: StatsCardProps) {
  const colors = colorMap[color]

  return (
    <div className={`bg-white rounded-xl border ${colors.border} p-6 hover:shadow-md transition-shadow`}>
      <div className="flex items-center justify-between mb-3">
        <span className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${colors.bg} text-xl`}>
          {emoji}
        </span>
        <span className={`text-3xl font-bold ${colors.text}`}>{count}</span>
      </div>
      <h3 className="text-sm font-semibold text-gray-900">{label}</h3>
      <p className="text-xs text-gray-500 mt-1">{description}</p>
    </div>
  )
}