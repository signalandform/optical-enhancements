const COLORS: Record<string, string> = {
  new: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  read: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  replied: 'bg-green-500/20 text-green-300 border-green-500/30',
  archived: 'bg-white/10 text-white/50 border-white/10',
  pending: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  confirmed: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  completed: 'bg-green-500/20 text-green-300 border-green-500/30',
  cancelled: 'bg-red-500/20 text-red-300 border-red-500/30',
};

export function StatusBadge({ status }: { status: string }) {
  const color = COLORS[status] ?? 'bg-white/10 text-muted border-white/10';

  return (
    <span className={`inline-block rounded-full border px-3 py-0.5 text-xs font-medium capitalize ${color}`}>
      {status}
    </span>
  );
}
