// src/components/ClipboardPage.jsx

import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebase/firebaseConfig"; // Import your db reference
import { ref, get, set } from "firebase/database"; // Import get and set from Firebase

const ClipboardPage = () => {
  const { clipboardId } = useParams();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [viewUrl, setViewUrl] = useState(""); // State to hold the view URL
  const navigate = useNavigate();

  useEffect(() => {
    const clipboardRef = ref(db, `clipboards/${clipboardId}`);

    // Fetch the data using 'get'
    get(clipboardRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setContent(data.content); // Set the content if data exists
        }
        setLoading(false); // Stop loading
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Stop loading even if there's an error
      });
  }, [clipboardId]);

  const handleSave = () => {
    const clipboardRef = ref(db, `clipboards/${clipboardId}`);

    // Save the new content (this will overwrite the previous content)
    set(clipboardRef, { content })
      .then(() => {
        console.log("Content saved successfully.");
        setViewUrl(`/view/${clipboardId}`); // Set the view URL
      })
      .catch((error) => {
        console.error("Error saving content:", error);
      });
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Clipboard: {clipboardId}</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <ReactQuill value={content} onChange={setContent} />
          <button
            onClick={handleSave}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg"
          >
            Save
          </button>
          {viewUrl && (
            <div className="mt-4">
              <p className="text-lg">
                View your Clipboard at:{" "}
                <a href={viewUrl} className="text-blue-600 underline">
                  {viewUrl}
                </a>
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ClipboardPage;
