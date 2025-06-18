import { AlertCircle } from "lucide-react";
import type { FormFieldProps, FormField } from "../types/form.types";
import { fieldComponents } from "./FieldComponents";

// Error message component
const ErrorMessage: React.FC<{ fieldName: string; error: string }> = ({
  fieldName,
  error,
}) => (
  <p
    id={`${fieldName}-error`}
    className="text-red-500 text-sm flex items-center gap-1 mt-1"
    role="alert">
    <AlertCircle size={16} />
    {error}
  </p>
);

// Field label component
const FieldLabel: React.FC<{ field: FormField }> = ({ field }) => (
  <label
    htmlFor={field.name}
    className="block text-sm font-medium text-gray-700">
    {field.label}
    {field.required && (
      <span className="text-red-500 ml-1" aria-hidden="true">
        *
      </span>
    )}
  </label>
);

const Field = ({ field, value, error, onChange, onBlur }: FormFieldProps) => {
  // Ensuring the FieldComponent type is correctly inferred
  const FieldComponent =
    fieldComponents[field.type as keyof typeof fieldComponents];

  if (!FieldComponent) {
    console.warn(`Unknown field type: ${field.type}`);
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-yellow-800">
          Ukjent felttype:{" "}
          <code className="bg-yellow-100 px-1 rounded">{field.type}</code>
        </p>
      </div>
    );
  }
  // Base input classes for styling
  const baseInputClasses = `
    w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
    transition-colors duration-200
    ${error ? "border-red-500" : "border-gray-300"}
    ${
      field.readOnly || field.disabled
        ? "bg-gray-100 cursor-not-allowed"
        : "bg-white"
    }
  `.trim();

  // Special handling for checkbox fields (different layout for label)
  if (field.type === "checkbox") {
    return (
      <div className="space-y-1">
        <FieldComponent
          field={field}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={baseInputClasses}
          error={error}
        />
        {field.helpText && (
          <p id={`${field.name}-help`} className="text-gray-500 text-xs mt-1">
            {field.helpText}
          </p>
        )}
        {error && <ErrorMessage fieldName={field.name} error={error} />}
      </div>
    );
  }

  // Standard layout for all other field types
  return (
    <div className="space-y-2">
      <FieldLabel field={field} />
      <FieldComponent
        field={field}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={baseInputClasses}
        error={error}
      />
      {field.helpText && (
        <p id={`${field.name}-help`} className="text-gray-500 text-xs mt-1">
          {field.helpText}
        </p>
      )}
      {error && <ErrorMessage fieldName={field.name} error={error} />}
    </div>
  );
};

export default Field;
