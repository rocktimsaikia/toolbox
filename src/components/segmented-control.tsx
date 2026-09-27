import clsx from "clsx";

// Two-state choice as a real radio group: each option selects itself, and screen
// readers announce the chosen option (a checkbox between two labels did neither).
export default function SegmentedControl<T extends string>({
  label,
  name,
  value,
  options,
  onChange,
}: {
  label: string;
  name: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <fieldset className="flex flex-wrap items-center gap-3">
      <legend className="sr-only">{label}</legend>
      <div className="inline-flex rounded border border-input p-0.5">
        {options.map((option) => (
          <label
            key={option.value}
            className={clsx(
              "inline-flex h-11 cursor-pointer items-center rounded-sm px-4 text-sm font-medium transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand lg:h-8",
              value === option.value
                ? "bg-brand text-brand-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
