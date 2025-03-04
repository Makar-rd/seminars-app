import { useState } from "react";
import axios from "axios";

const EditSeminarModal = ({ seminar, onClose, onUpdate }) => {
  const [title, setTitle] = useState(seminar.title);
  const [description, setDescription] = useState(seminar.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/seminars/${seminar.id}`, {
        ...seminar,
        title,
        description,
      })
      .then(() => {
        onUpdate();
        onClose();
      })
      .catch(() => alert("Ошибка при обновлении"));
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Редактировать семинар</h2>
        <form onSubmit={handleSubmit}>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type="submit">Сохранить</button>
          <button type="button" onClick={onClose}>
            Отмена
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditSeminarModal;
