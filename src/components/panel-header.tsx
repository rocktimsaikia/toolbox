import type { ReactNode } from "react";

type Props = {
  label: string;
  // Shown muted after the label, such as the data format: "Input (JSON)"
  format?: string;
  // Set for input panels so the label names the field; output panels pass id and point
  // the field at it with aria-labelledby
  htmlFor?: string;
  id?: string;
  // Panel actions such as Copy, right-aligned
  children?: ReactNode;
};

// One header for every input and output panel, so labels and actions line up the same
// way on every tool
export default function PanelHeader({ label, format, htmlFor, id, children }: Props) {
  const text = (
    <>
      {label}
      {format && <span className="font-normal text-muted-foreground"> ({format})</span>}
    </>
  );
  const className = "text-base font-semibold lg:text-lg";

  return (
    <div className="mb-2 flex min-h-11 w-full flex-wrap items-end justify-between gap-2 lg:min-h-9">
      {htmlFor ? (
        <label htmlFor={htmlFor} id={id} className={className}>
          {text}
        </label>
      ) : (
        <p id={id} className={className}>
          {text}
        </p>
      )}
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}
