import { useState } from "react";
import SeminarList from "./components/SeminarList";
import EditSeminarModal from "./components/EditSeminarModal";
import "./App.css";

const App = () => {
  const [selectedSeminar, setSelectedSeminar] = useState(null);

  return (
    <div>
      <h1>seminars</h1>
      <SeminarList onEdit={setSelectedSeminar} />
      
      {selectedSeminar && (
        <EditSeminarModal
          seminar={selectedSeminar}
          onClose={() => setSelectedSeminar(null)}
          onUpdate={() => window.location.reload()}
        />
      )}
    </div>
  );
};

export default App;