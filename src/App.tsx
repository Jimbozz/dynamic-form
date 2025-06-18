import DynamicForm from "./components/DynamicForm";
import { stromavtaleSchema } from "./schemas/stromavtale.schema";

function App() {
  return (
    <>
      <header className="py-4 bg-blue-700 text-white shadow-md">
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="text-2xl font-bold">
            <a href="/" className="text-white hover:text-blue-200 no-underline">
              Company
            </a>
          </h1>
        </div>
      </header>

      <main className="flex-grow">
        <DynamicForm config={stromavtaleSchema} />
      </main>

      <footer className="py-4 bg-gray-800 text-white text-center text-sm">
        <div className="max-w-2xl mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} Company. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
