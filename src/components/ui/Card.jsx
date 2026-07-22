export function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-lg border border-navy-700 bg-navy-900 p-6 ${className}`}
    >
      {children}
    </div>
  );
}
