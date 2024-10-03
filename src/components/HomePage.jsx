// src/components/Home.jsx

import { useState } from "react";
import { db } from "../firebase/firebaseConfig"; // Import your db reference
import { ref, set } from "firebase/database"; // Import set from Firebase
import { v4 as uuidv4 } from "uuid"; // Import UUID to generate unique IDs
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [clipboardId, setClipboardId] = useState("");
  const navigate = useNavigate();

  const handleCreateClipboard = () => {
    // Generate a unique clipboard ID
    const newClipboardId = uuidv4();
    setClipboardId(newClipboardId);

    // Create a new clipboard entry in the database (optional)
    const clipboardRef = ref(db, `clipboards/${newClipboardId}`);
    set(clipboardRef, { content: "" }); // Initialize with empty content

    // Navigate to the new clipboard edit page
    navigate(`/edit/${newClipboardId}`);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Clipboard App</h1>
      <button
        onClick={handleCreateClipboard}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Create Clipboard
      </button>
      {clipboardId && (
        <div className="mt-4">
          <p className="text-lg">
            Your Clipboard URL:{" "}
            <a
              href={`/view/${clipboardId}`}
              className="text-blue-600 underline"
            >
              {`/view/${clipboardId}`}
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
