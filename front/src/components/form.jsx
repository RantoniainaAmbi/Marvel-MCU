export default function Form() {
  return (
    <form className="max-w-md mx-auto bg-gray-100 p-6 rounded-lg shadow-md space-y-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Add Character</h1>

      <input
        type="text"
        placeholder="ID"
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Name"
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Real Name"
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Universe"
        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex gap-2 pt-2">
        <button
          type="button"
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Add
        </button>
      </div>
    </form>
  );
}
