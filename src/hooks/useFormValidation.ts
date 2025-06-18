import { useState, useMemo, useCallback } from "react";
import type {
  FormField,
  FormConfig,
  FormFieldValue,
} from "../types/form.types";

export const useFormValidation = (incomingConfig: FormConfig) => {
  const config = useMemo(
    () => incomingConfig || { sections: [] },
    [incomingConfig]
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const fields = useMemo(() => {
    let allFields: FormField[] = [];
    config.sections.forEach((section) => {
      allFields = allFields.concat(section.fields);
    });
    return allFields;
  }, [config.sections]);

  const validateField = useCallback(
    (field: FormField, value: FormFieldValue): string => {
      const validation = field.validation;
      if (!validation) return "";

      // Required validation
      if (validation.required) {
        if (field.type === "checkbox") {
          if (!value) {
            return typeof validation.required === "string"
              ? validation.required
              : "Feltet er påkrevd";
          }
        } else if (
          value === null ||
          value === undefined ||
          (typeof value === "string" && value.trim() === "")
        ) {
          return typeof validation.required === "string"
            ? validation.required
            : "Feltet er påkrevd";
        }
      }

      // Skip other validations if field is empty and not required (unless it's a checkbox which handles empty differently)
      if (!value && field.type !== "checkbox" && !validation.required) {
        return "";
      }

      // MinLength validation
      if (
        validation.minLength &&
        typeof value === "string" &&
        value.length < validation.minLength.value
      ) {
        return validation.minLength.message;
      }

      // MaxLength validation
      if (
        validation.maxLength &&
        typeof value === "string" &&
        value.length > validation.maxLength.value
      ) {
        return validation.maxLength.message;
      }

      // Pattern validation
      if (validation.pattern && typeof value === "string" && value) {
        const regex = new RegExp(validation.pattern.value);
        if (!regex.test(value)) {
          return validation.pattern.message;
        }
      }

      // Min/Max for numbers
      if (
        field.type === "number" &&
        value !== "" &&
        value !== null &&
        value !== undefined
      ) {
        const numValue = Number(value);
        if (isNaN(numValue)) {
          return "Må være et gyldig tall.";
        }
        if (validation.min && numValue < validation.min.value) {
          return validation.min.message;
        }
        if (validation.max && numValue > validation.max.value) {
          return validation.max.message;
        }
      }

      return "";
    },
    []
  );

  const validateForm = useCallback(
    (formData: Record<string, FormFieldValue>): boolean => {
      const newErrors: Record<string, string> = {};

      fields.forEach((field) => {
        const error = validateField(field, formData[field.name]);
        if (error) {
          newErrors[field.name] = error;
        }
      });

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    [fields, validateField]
  );

  const validateSingleField = useCallback(
    (field: FormField, value: FormFieldValue) => {
      const error = validateField(field, value);
      setErrors((prev) => ({
        ...prev,
        [field.name]: error,
      }));
    },
    [validateField]
  );

  const clearError = useCallback((fieldName: string) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  }, []);

  // Clear all errors
  const clearAllErrors = useCallback(() => {
    setErrors({});
  }, []);

  return {
    errors,
    validateForm,
    validateSingleField,
    clearError,
    fields,
    clearAllErrors,
  };
};
