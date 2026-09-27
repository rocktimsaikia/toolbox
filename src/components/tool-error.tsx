type Props = {
  // The field points at this with aria-describedby, so screen readers read it with the field
  id: string;
  message: string;
  // Parser output or other technical detail, shown smaller under the plain message
  detail?: string;
};

// The one error style for every tool: a plain sentence naming the problem and the fix,
// with the technical detail underneath
export default function ToolError({ id, message, detail }: Props) {
  return (
    // w-0 min-w-full: wrap long messages instead of widening the column
    <div id={id} role="alert" className="mt-2 w-0 min-w-full text-sm">
      <p className="text-destructive">{message}</p>
      {detail && (
        <p className="mt-1 break-words font-mono text-xs text-muted-foreground">
          {detail}
        </p>
      )}
    </div>
  );
}

// Spread onto the field the error describes
export const errorProps = (id: string, hasError: boolean) =>
  hasError ? { "aria-invalid": true, "aria-describedby": id } : {};
