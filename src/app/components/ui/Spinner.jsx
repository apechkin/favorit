export const Spinner = ({ size = "md" }) => {
  const sizes = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-[3px]",
    lg: "h-8 w-8 border-[3px]",
  };

  return (
    <div
      className={`animate-spin rounded-full border-gray-200 border-t-purple-600 ${sizes[size]}`}
      role="status"
      aria-label="Загрузка"
    />
  );
};
