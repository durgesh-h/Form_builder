import React from "react";
import { Routes, Route } from "react-router-dom";
import { FormEditor } from "./components/FormEditor";
import { FormList } from "./components/FormList";
import { FormRenderer } from "./components/FormRenderer";
import { FormSuccess } from "./components/FormSuccess";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      <Routes>
        <Route path="/" element={<FormList />} />
        <Route path="/create" element={<FormEditor />} />
        <Route path="/form/:id" element={<FormRenderer />} />
        <Route path="/success" element={<FormSuccess />} />
      </Routes>
    </div>
  );
}

export default App;
