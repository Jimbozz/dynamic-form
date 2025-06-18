# Dynamic Form (React + TypeScript + Vite)

This project is a dynamic, schema-driven form builder built with **React**, **TypeScript**, and **Vite**. It leverages Tailwind CSS for styling and includes a modular, extensible architecture for building complex forms with validation and accessibility in mind.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

Clone the repository and install dependencies:

```sh
git clone https://github.com/Jimbozz/dynamic-form.git
cd dynamic-form
npm install
```

### Running the Development Server

Start the Vite development server:

```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.

### Building for Production

To build the project for production:

```sh
npm run build
```

To preview the production build locally:

```sh
npm run preview
```

### Linting

To run ESLint and check for code issues:

```sh
npm run lint
```

---

## 🗂️ Project Structure

```
dynamic-form/
├── public/                # Static assets (e.g., vite.svg)
├── src/                   # Source code
│   ├── App.tsx            # App entry, renders the DynamicForm
│   ├── main.tsx           # React/Vite entry point
│   ├── index.css          # Tailwind CSS imports
│   ├── components/        # Reusable form components
│   │   ├── DynamicForm.tsx
│   │   ├── Field.tsx
│   │   └── FieldComponents.tsx
│   ├── hooks/             # Custom React hooks for form logic
│   │   ├── useFormSubmission.ts
│   │   └── useFormValidation.ts
│   ├── schemas/           # Form schemas (structure, validation, etc.)
│   │   └── stromavtale.schema.ts
│   ├── types/             # TypeScript type definitions
│   │   └── form.types.ts
│   └── vite-env.d.ts      # Vite environment types
├── package.json           # Project metadata and scripts
├── vite.config.ts         # Vite configuration
├── tsconfig*.json         # TypeScript configurations
├── eslint.config.js       # ESLint configuration
└── README.md              # Project documentation
```

---

## 📝 How It Works

- **Schema-Driven:** Forms are generated from a schema (see [`stromavtale.schema.ts`](src/schemas/stromavtale.schema.ts)), making it easy to add or modify fields and validation.
- **Validation:** Custom hooks ([`useFormValidation`](src/hooks/useFormValidation.ts)) handle field and form validation based on schema rules.
- **Submission:** Form submission logic is encapsulated in [`useFormSubmission`](src/hooks/useFormSubmission.ts), supporting async operations and reset on success.
- **Accessibility:** Fields are rendered with proper labels, ARIA attributes, and error messaging for accessibility.
- **Styling:** Uses [Tailwind CSS](https://tailwindcss.com/) for utility-first styling.

---

## 🧩 Customization

- **Add/Edit Fields:** Modify the schema in [`src/schemas/stromavtale.schema.ts`](src/schemas/stromavtale.schema.ts).
- **Add Field Types:** Extend [`FieldComponents.tsx`](src/components/FieldComponents.tsx) and update types in [`form.types.ts`](src/types/form.types.ts).
- **Validation Rules:** Add or adjust validation logic in [`useFormValidation.ts`](src/hooks/useFormValidation.ts).

---

## 📦 Dependencies

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/icons/) (for icons)

---

## 🚧 Future Improvements

- **Styling and Responsiveness:**  
  The current design uses Tailwind CSS for utility-first styling, but there is room for improvement in terms of visual polish and mobile responsiveness. Enhancing the layout, adding transitions, and ensuring the form looks great on all devices would be a priority.

- **Step-by-Step (Wizard) Form:**  
  If the form grows longer or more complex, converting it into a multi-step wizard would improve usability. This would guide users through sections one at a time, reduce cognitive load, and allow for progress indicators and validation at each step.

---
