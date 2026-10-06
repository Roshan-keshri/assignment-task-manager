const STATUS_LABELS = { pending: "Pending", in_progress: "In Progress", completed: "Completed" };
const PRIORITY_LABELS = { low: "Low", medium: "Medium", high: "High" };

export function StatusBadge({ status }) {
  return <span className={`badge badge-${status}`}>{STATUS_LABELS[status] ?? status}</span>;
}

export function PriorityBadge({ priority }) {
  return (
    <span className={`badge badge-priority-${priority}`}>
      {PRIORITY_LABELS[priority] ?? priority} priority
    </span>
  );
}
