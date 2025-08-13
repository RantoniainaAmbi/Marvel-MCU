import React, { useState, useEffect } from "react";
import CharacterForm from "./form.jsx";

export default function Containers() {
  const [characters, setCharacters] = useState([]);
  const [editingCharacter, setEditingCharacter] = useState(null);

  const fetchCharacters = () => {
    fetch("http://localhost:8080/characters")
      .then((res) => res.json())
      .then((data) => setCharacters(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce personnage ?")) return;
    fetch(`http://localhost:8080/characters/${id}`, { method: "DELETE" })
      .then((res) => {
        if (res.ok) fetchCharacters();
      })
      .catch((err) => console.error(err));
  };

  const handleEdit = (character) => {
    setEditingCharacter(character);
  };

  const handleFormSubmit = (formData) => {
    if (editingCharacter) {
      fetch(`http://localhost:8080/characters/${formData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((res) => {
          if (res.ok) {
            fetchCharacters();
            setEditingCharacter(null);
          }
        })
        .catch((err) => console.error(err));
    } else {
      fetch(`http://localhost:8080/characters`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
        .then((res) => {
          if (res.ok) fetchCharacters();
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-center bg-blue-600 py-4 text-red-600">
        Marvel Characters
      </h1>

      <table className="table-auto w-full border-collapse bg-gray-100 shadow-md overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Real Name</th>
            <th className="px-4 py-2 border">Universe</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {characters.map((character) => (
            <tr key={character.id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border">{character.id}</td>
              <td className="px-4 py-2 border">{character.name}</td>
              <td className="px-4 py-2 border">{character.realName}</td>
              <td className="px-4 py-2 border">{character.universe}</td>
              <td className="px-4 py-2 border">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(character)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(character.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6">
        <CharacterForm
          initialData={editingCharacter}
          onCancel={() => setEditingCharacter(null)}
          onSubmit={handleFormSubmit}
        />
      </div>
    </div>
  );
}
