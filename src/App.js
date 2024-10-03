import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./components/HomePage";
import ClipboardPage from "./components/ClipboardPage"; // Edit Page
import ClipboardView from "./components/ClipboardView"; // View Page

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit/:clipboardId" element={<ClipboardPage />} />
        <Route path="/view/:clipboardId" element={<ClipboardView />} />
      </Routes>
    </Router>
  );
};

export default App;
