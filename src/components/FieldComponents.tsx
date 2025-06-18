import type { FieldComponentProps, FormField } from "../types/form.types";

// Helper function to build aria-describedby string
const getFieldDescribedBy = (
  field: FormField,
  error?: string
): string | undefined => {
  const ids: string[] = [];
  if (field.helpText) {
    ids.push(`${field.name}-help`);
  }
  if (error) {
    ids.push(`${field.name}-error`);
  }
  if (field.describedBy) {
    ids.push(...field.describedBy);
  }
  return ids.length > 0 ? ids.join(" ") : undefined;
};

// Define the specific field Components
export const fieldComponents = {
  text: ({
    field,
    value,
    onChange,
    onBlur,
    className,
    error,
  }: FieldComponentProps) => (
    <input
      id={field.name}
      type="text"
      value={(value as string) ?? ""}
      onChange={(e) => onChange(field.name, e.target.value)}
      onBlur={(e) => onBlur(field, e.target.value)}
      placeholder={field.placeholder}
      className={className}
      required={field.required}
      readOnly={field.readOnly}
      disabled={field.disabled}
      aria-invalid={!!error}
      aria-describedby={getFieldDescribedBy(field, error)}
      aria-required={field.required}
    />
  ),

  email: ({
    field,
    value,
    onChange,
    onBlur,
    className,
    error,
  }: FieldComponentProps) => (
    <input
      id={field.name}
      type="email"
      value={(value as string) ?? ""}
      onChange={(e) => onChange(field.name, e.target.value)}
      onBlur={(e) => onBlur(field, e.target.value)}
      placeholder={field.placeholder}
      className={className}
      required={field.required}
      readOnly={field.readOnly}
      disabled={field.disabled}
      aria-invalid={!!error}
      aria-describedby={getFieldDescribedBy(field, error)}
      aria-required={field.required}
    />
  ),

  tel: ({
    field,
    value,
    onChange,
    onBlur,
    className,
    error,
  }: FieldComponentProps) => (
    <input
      id={field.name}
      type="tel"
      value={(value as string) ?? ""}
      onChange={(e) => onChange(field.name, e.target.value)}
      onBlur={(e) => onBlur(field, e.target.value)}
      placeholder={field.placeholder}
      className={className}
      required={field.required}
      readOnly={field.readOnly}
      disabled={field.disabled}
      aria-invalid={!!error}
      aria-describedby={getFieldDescribedBy(field, error)}
      aria-required={field.required}
    />
  ),

  number: ({
    field,
    value,
    onChange,
    onBlur,
    className,
    error,
  }: FieldComponentProps) => (
    <input
      id={field.name}
      type="number"
      value={
        typeof value === "string" || typeof value === "number" ? value : ""
      }
      onChange={(e) =>
        onChange(
          field.name,
          e.target.value === "" ? null : Number(e.target.value)
        )
      }
      onBlur={(e) =>
        onBlur(field, e.target.value === "" ? null : Number(e.target.value))
      }
      placeholder={field.placeholder}
      className={className}
      required={field.required}
      readOnly={field.readOnly}
      disabled={field.disabled}
      aria-invalid={!!error}
      aria-describedby={getFieldDescribedBy(field, error)}
      aria-required={field.required}
    />
  ),

  select: ({
    field,
    value,
    onChange,
    onBlur,
    className,
    error,
  }: FieldComponentProps) => (
    <select
      id={field.name}
      value={(value as string) ?? ""}
      onChange={(e) => onChange(field.name, e.target.value)}
      onBlur={(e) => onBlur(field, e.target.value)}
      className={className}
      required={field.required}
      disabled={field.disabled}
      aria-invalid={!!error}
      aria-describedby={getFieldDescribedBy(field, error)}
      aria-required={field.required}>
      <option value="">{field.placeholder || "Velg..."}</option>
      {field.options?.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  ),

  textarea: ({
    field,
    value,
    onChange,
    onBlur,
    className,
    error,
  }: FieldComponentProps) => (
    <textarea
      id={field.name}
      value={(value as string) ?? ""}
      onChange={(e) => onChange(field.name, e.target.value)}
      onBlur={(e) => onBlur(field, e.target.value)}
      placeholder={field.placeholder}
      className={`${className} min-h-[100px] resize-y`}
      required={field.required}
      readOnly={field.readOnly}
      disabled={field.disabled}
      aria-invalid={!!error}
      aria-describedby={getFieldDescribedBy(field, error)}
      aria-required={field.required}
    />
  ),

  checkbox: ({
    field,
    value,
    onChange,
    onBlur,
    error,
  }: FieldComponentProps) => (
    <div className="flex items-center justify-start gap-x-2">
      <input
        id={field.name}
        type="checkbox"
        checked={(value as boolean) || false}
        onChange={(e) => onChange(field.name, e.target.checked)}
        onBlur={(e) => onBlur(field, e.target.checked)}
        className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${
          error ? "border-red-500 ring-red-500" : ""
        }`}
        disabled={field.disabled}
        aria-invalid={!!error}
        aria-describedby={getFieldDescribedBy(field, error)}
        aria-required={field.required}
      />
      <label
        htmlFor={field.name}
        className="text-sm text-gray-700 cursor-pointer">
        {field.label}
        {field.required && (
          <span className="text-red-500 ml-1" aria-hidden="true">
            *
          </span>
        )}
      </label>
    </div>
  ),
};
