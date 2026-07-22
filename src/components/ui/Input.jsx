export function Input({ label, className = "", ...props }) {
  return (
    <div>
      {label && (
        <label className="mb-1 block text-sm text-amber-50">{label}</label>
      )}
      <input
        {...props}
        className={`w-full rounded border border-navy-600 bg-navy-800 px-3 py-2 text-amber-50 placeholder:text-amber-50/40 focus:border-amber-400 focus:outline-none ${className}`}
      />
    </div>
  );
}
