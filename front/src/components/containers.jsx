import React, { useState, useEffect } from "react";

export default function Containers() {
  const [characters, setCharacters] = useState([]);

  const fetchCharacters = () => {
    fetch("http://localhost:8080/characters")
      .then((response) => response.json())
      .then((data) => setCharacters(data))
      .catch((error) => console.error("Error fetching characters:", error));
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Do you want to delete this character ?"
    );
    if (!confirmDelete) return;

    fetch(`http://localhost:8080/characters/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          fetchCharacters();
        } else {
          console.error("Erreur suppression personnage");
        }
      })
      .catch((err) => console.error(err));
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
          {characters
            .filter((character) => character)
            .map((character) => (
              <tr key={character.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{character.id}</td>
                <td className="px-4 py-2 border">{character.name}</td>
                <td className="px-4 py-2 border">{character.realName}</td>
                <td className="px-4 py-2 border">{character.universe}</td>
                <td className="px-4 py-2 border">
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => handleDelete(character.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
