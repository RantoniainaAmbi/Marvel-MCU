import { useState, useEffect } from "react";

export default function CharacterForm({ initialData, onCancel, onSubmit }) {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    realName: "",
    universe: ""
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({ id: "", name: "", realName: "", universe: "" });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ id: "", name: "", realName: "", universe: "" });
  };

  const handleCancelClick = () => {
    setFormData({ id: "", name: "", realName: "", universe: "" });
    onCancel();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-gray-100 p-6 rounded-lg shadow-md space-y-4"
    >
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        {initialData ? "Edit Character" : "Add Character"}
      </h1>

      <input
        name="id"
        type="text"
        placeholder="ID"
        value={formData.id}
        onChange={handleChange}
        disabled={!!initialData} 
        className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="name"
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="realName"
        type="text"
        placeholder="Real Name"
        value={formData.realName}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
      />
      <input
        name="universe"
        type="text"
        placeholder="Universe"
        value={formData.universe}
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleCancelClick}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {initialData ? "Save Changes" : "Add"}
        </button>
      </div>
    </form>
  );
}
