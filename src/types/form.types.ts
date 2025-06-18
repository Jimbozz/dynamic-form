export type FormFieldValue =
  | string
  | number
  | boolean
  | Date
  | File
  | null
  | undefined;

export interface ValidationRule {
  required?: string | boolean;
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  pattern?: { value: string; message: string };
  min?: { value: number; message: string };
  max?: { value: number; message: string };
}

export interface FormField {
  label: string;
  name: string;
  type:
    | "text"
    | "email"
    | "number"
    | "tel"
    | "select"
    | "checkbox"
    | "textarea";
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: ValidationRule;
  defaultValue?: FormFieldValue;
  helpText?: string;
  readOnly?: boolean;
  disabled?: boolean;
  describedBy?: string[];
}

export interface FormSection {
  title: string;
  name: string;
  description?: string;
  fields: FormField[];
}

export interface FormConfig {
  title: string;
  description?: string;
  submitText?: string;
  sections: FormSection[];
}

export interface FieldComponentProps {
  field: FormField;
  value: FormFieldValue;
  onChange: (name: string, value: FormFieldValue) => void;
  onBlur: (field: FormField, value: FormFieldValue) => void;
  className: string;
  error?: string;
}

export interface FormFieldProps {
  field: FormField;
  value: FormFieldValue;
  error?: string;
  onChange: (name: string, value: FormFieldValue) => void;
  onBlur: (field: FormField, value: FormFieldValue) => void;
}

export interface DynamicFormProps {
  config: FormConfig;
  onSubmit?: (data: Record<string, FormFieldValue>) => void | Promise<void>;
  className?: string;
}

export interface FormHeaderProps {
  title: string;
  description?: string;
}

export interface SubmitButtonProps {
  isSubmitting: boolean;
  submitText?: string;
}
