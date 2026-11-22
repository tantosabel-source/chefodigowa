"use client";

export function ConfirmDelete({
  label = "Delete",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <button
      type="submit"
      onClick={(event) => {
        const confirmed =
          typeof window === "undefined"
            ? false
            : window.confirm("Delete this permanently? This cannot be undone.");
        if (!confirmed) event.preventDefault();
      }}
      className={className}
    >
      {label}
    </button>
  );
}
