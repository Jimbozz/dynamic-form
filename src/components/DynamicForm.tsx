import { useState, useEffect, useCallback } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useFormValidation } from "../hooks/useFormValidation";
import { useFormSubmission } from "../hooks/useFormSubmission";

import type {
  DynamicFormProps,
  FormField,
  FormHeaderProps,
  FormSection,
  SubmitButtonProps,
  FormFieldValue,
} from "../types/form.types";
import Field from "./Field";

const SuccessMessage = () => (
  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
    <div className="flex items-center text-green-800">
      <CheckCircle2 className="mr-2" size={20} />
      <span className="font-medium">Skjema sendt inn!</span>
    </div>
    <p className="text-green-700 text-sm mt-1">
      Tusen takk for din interesse. Vi kontakter deg snart.
    </p>
  </div>
);

const FormHeader = ({ title, description }: FormHeaderProps) => (
  <div className="text-center mb-8">
    <h1 id="form-main-title" className="text-3xl font-bold text-gray-900 mb-2">
      {title}
    </h1>
    {description && (
      <p id="form-main-description" className="text-gray-600">
        {description}
      </p>
    )}
  </div>
);

const SubmitButton = ({
  isSubmitting,
  submitText = "Send inn",
}: SubmitButtonProps) => (
  <div className="pt-6">
    <button
      disabled={isSubmitting}
      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
      {isSubmitting ? (
        <>
          <Loader2 className="animate-spin" size={20} />
          Sender inn...
        </>
      ) : (
        submitText
      )}
    </button>
  </div>
);

// Main DynamicForm component
const DynamicForm = ({
  config,
  onSubmit,
  className = "",
}: DynamicFormProps) => {
  const [formData, setFormData] = useState<Record<string, FormFieldValue>>({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Form validation hook
  const {
    errors,
    validateForm,
    validateSingleField,
    clearError,
    fields: allFields,
    clearAllErrors,
  } = useFormValidation(config);

  // Form submission hook
  const { handleSubmit, isSubmitting } = useFormSubmission({
    formData,
    validateForm,
    allFields,
    setFormData,
    setSubmitSuccess,
    clearAllErrors,
    onSubmitProp: onSubmit,
  });

  // Initialize form data with default values on mount or config change
  useEffect(() => {
    const initialData: Record<string, FormFieldValue> = {};
    allFields.forEach((field) => {
      if (field.defaultValue !== undefined) {
        initialData[field.name] = field.defaultValue;
      } else {
        // Explicitly set default based on field type
        switch (field.type) {
          case "text":
          case "email":
          case "tel":
          case "select":
          case "textarea":
            initialData[field.name] = "";
            break;
          case "number":
            initialData[field.name] = null;
            break;
          case "checkbox":
            initialData[field.name] = false;
            break;
          default:
            // Fallback for any unsupported or future types, keeps it a string
            initialData[field.name] = "";
            break;
        }
      }
    });
    setFormData(initialData);
  }, [allFields]);

  // Handle field value changes to remove error state and update form data when field is changed
  const handleFieldChange = useCallback(
    (name: string, value: FormFieldValue) => {
      setFormData((prev) => ({ ...prev, [name]: value }));
      clearError(name);
    },
    [clearError]
  );

  // Handle field blur
  const handleFieldBlur = useCallback(
    (field: FormField, value: FormFieldValue) => {
      validateSingleField(field, value);
    },
    [validateSingleField]
  );

  // Form submission handler that wraps the hook's logic
  const handleFormSubmit = useCallback(
    async (event: React.FormEvent) => {
      await handleSubmit(event);
      const firstErrorField = allFields.find((field) => errors[field.name]);

      // If there are errors, focus the first field with an error
      if (firstErrorField) {
        document.getElementById(firstErrorField.name)?.focus();
      }
    },
    [handleSubmit, allFields, errors]
  );

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 ${className}`}>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <FormHeader title={config.title} description={config.description} />
          <form
            onSubmit={handleFormSubmit}
            noValidate
            aria-labelledby="form-main-title"
            aria-describedby={
              config.description ? "form-main-description" : undefined
            }>
            <div className="space-y-6 w-full">
              {config.sections.map((section: FormSection) => (
                <fieldset
                  key={section.name}
                  className="border border-gray-200 p-6 rounded-lg shadow-sm bg-gray-50/50">
                  <legend className="text-xl font-semibold mb-3 px-2 text-gray-800">
                    {section.title}
                  </legend>
                  {section.description && (
                    <p
                      className="text-gray-600 text-sm mb-4"
                      id={`${section.name}-description`}>
                      {section.description}
                    </p>
                  )}
                  <div className="space-y-4">
                    {section.fields.map((field: FormField) => (
                      <Field
                        key={field.name}
                        field={field}
                        value={formData[field.name]}
                        error={errors[field.name]}
                        onChange={handleFieldChange}
                        onBlur={handleFieldBlur}
                      />
                    ))}
                  </div>
                </fieldset>
              ))}

              {submitSuccess && (
                <div role="status" aria-live="polite">
                  <SuccessMessage />
                </div>
              )}

              <SubmitButton
                isSubmitting={isSubmitting}
                submitText={config.submitText}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DynamicForm;
