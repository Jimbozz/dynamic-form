import type { FormConfig } from "../types/form.types";

export const stromavtaleSchema: FormConfig = {
  title: "Finn en bedre og billigere strømavtale i ditt område",
  description: "Fyll ut skjemaet under for å få tilpassede strømtilbud",
  submitText: "Send inn",
  sections: [
    {
      title: "Bolig og adresse",
      name: "housing_address_section",
      description:
        "Informasjon om din bolig og adresse der strømmen skal leveres.",
      fields: [
        {
          label: "Velg boligtype",
          name: "property_type",
          type: "select",
          options: [
            { value: "apartment", label: "Leilighet" },
            { value: "house", label: "Enebolig" },
            { value: "townhouse", label: "Rekkehus" },
            { value: "cabin", label: "Hytte" },
          ],
          required: true,
          placeholder: "Velg din boligtype",
          validation: {
            required: "Boligtype er påkrevd",
          },
        },
        {
          label: "Adresse (der du bruker strøm)",
          name: "address_street_name",
          type: "text",
          required: true,
          placeholder: "F.eks. Karl Johans gate 1",
          validation: {
            required: "Adresse er påkrevd",
            minLength: { value: 5, message: "Adressen må være minst 5 tegn" },
          },
        },
        {
          label: "Postnummer",
          name: "postal_code",
          type: "text", // Keep as text for regex pattern validation
          required: true,
          placeholder: "0001",
          validation: {
            required: "Postnummer er påkrevd",
            pattern: {
              value: "^[0-9]{4}$",
              message: "Postnummer må være 4 siffer",
            },
          },
        },
      ],
    },
    {
      title: "Kontaktinformasjon",
      name: "contact_info_section",
      description: "Hvordan kan vi kontakte deg?",
      fields: [
        {
          label: "Navn",
          name: "name",
          type: "text",
          required: true,
          placeholder: "Ditt fulle navn",
          validation: {
            required: "Navn er påkrevd",
            minLength: { value: 2, message: "Navn må være minst 2 tegn" },
          },
        },
        {
          label: "E-post",
          name: "email",
          type: "email",
          required: true,
          placeholder: "din@epost.no",
          validation: {
            required: "E-post er påkrevd",
            pattern: {
              value: "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$",
              message: "Ugyldig e-postformat",
            },
          },
        },
        {
          label: "Telefonnummer",
          name: "phone",
          type: "tel",
          required: false,
          placeholder: "+47 123 45 678",
          helpText: "Valgfritt, men kan forenkle tilbudsprosessen.",
          validation: {
            pattern: {
              value: "^(\\+47)?[0-9]{8}$",
              message:
                "Ugyldig telefonnummer (8 siffer eller +47 følgt av 8 siffer)",
            },
          },
        },
      ],
    },
    {
      title: "Strømforbruk og preferanser",
      name: "consumption_prefs_section",
      description:
        "Gi oss litt informasjon om ditt strømforbruk og dine preferanser.",
      fields: [
        {
          label: "Årlig strømforbruk (kWh)",
          name: "annual_consumption",
          type: "number",
          required: false,
          placeholder: "20000",
          helpText:
            "Dette tallet finner du ofte på din siste strømregning. Et estimat er også OK.",
          validation: {
            min: { value: 0, message: "Forbruk kan ikke være negativt" },
            max: {
              value: 100000,
              message: "Forbruk kan ikke overstige 100,000 kWh",
            },
          },
        },
        {
          label: "Ønsker du å motta nyhetsbrev?",
          name: "newsletter",
          type: "checkbox",
          required: false,
          defaultValue: false,
          helpText:
            "Motta spennende nyheter og tilbud direkte i innboksen din.",
        },
      ],
    },
  ],
};
