export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}) {
  const variants = {
    primary: "bg-amber-500 hover:bg-amber-400 text-navy-950",
    outline:
      "border border-navy-600 text-amber-50 hover:border-amber-400 hover:text-amber-400",
  };

  return (
    <button
      {...props}
      className={`rounded-md px-5 py-2.5 font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
