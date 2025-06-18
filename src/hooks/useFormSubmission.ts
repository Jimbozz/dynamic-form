import { useState, useCallback } from "react";
import type {
  DynamicFormProps,
  FormField,
  FormFieldValue,
} from "../types/form.types";

interface UseFormSubmissionProps {
  formData: Record<string, FormFieldValue>;
  validateForm: (data: Record<string, FormFieldValue>) => boolean;
  allFields: FormField[];
  setFormData: React.Dispatch<
    React.SetStateAction<Record<string, FormFieldValue>>
  >;
  setSubmitSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  clearAllErrors: () => void;
  onSubmitProp?: DynamicFormProps["onSubmit"];
}

export const useFormSubmission = ({
  formData,
  validateForm,
  allFields,
  setFormData,
  setSubmitSuccess,
  clearAllErrors,
  onSubmitProp,
}: UseFormSubmissionProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      if (!validateForm(formData)) {
        console.log("Form validation failed before submission.");
        return;
      }

      setIsSubmitting(true);
      try {
        if (onSubmitProp) {
          await onSubmitProp(formData);
        } else {
          // Default behavior: simulate an API call
          await new Promise((resolve) => setTimeout(resolve, 1500));
          console.log("Form submitted with data:", formData);
          console.log("Form validation passed ✅ (from useFormSubmission)");
        }

        setSubmitSuccess(true);

        // Reset form after successful submission
        const initialData: Record<string, FormFieldValue> = {};
        allFields.forEach((field) => {
          if (field.defaultValue !== undefined) {
            initialData[field.name] = field.defaultValue;
          } else if (field.type === "checkbox") {
            initialData[field.name] = false;
          } else {
            initialData[field.name] = "";
          }
        });
        setFormData(initialData);
        clearAllErrors(); // Clear all validation errors on successful submission

        // Hide success message after a delay
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 3000);
      } catch (error) {
        console.error("Submission error:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      formData,
      validateForm,
      allFields,
      setFormData,
      setSubmitSuccess,
      clearAllErrors,
      onSubmitProp,
    ]
  );

  return { handleSubmit, isSubmitting };
};
