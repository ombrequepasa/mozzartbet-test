interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Spinner = ({ size = "md", className = "" }: SpinnerProps) => {
  const sizes = {
    sm: "w-3 h-3 border",
    md: "w-6 h-6 border-2",
    lg: "w-8 h-8 border-2",
  };

  return (
    <div
      className={`${sizes[size]} border-blue-400 border-t-transparent rounded-full animate-spin ${className}`}
      role="status"
      aria-label="Učitavanje...">
      <span className="sr-only">Učitavanje...</span>
    </div>
  );
};

export default Spinner;
