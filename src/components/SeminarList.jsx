import { useEffect, useState } from "react";
import axios from "axios";

const SeminarList = ({ onEdit }) => {
  const [seminars, setSeminars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/seminars")
      .then((response) => {
        setSeminars(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Ошибка загрузки данных");
        setLoading(false);
      });
  }, []);

  const deleteSeminar = (id) => {
    if (window.confirm("Вы уверены, что хотите удалить семинар?")) {
      axios
        .delete(`http://localhost:5000/seminars/${id}`)
        .then(() => {
          setSeminars(seminars.filter((seminar) => seminar.id !== id));
        })
        .catch(() => alert("Ошибка удаления"));
    }
  };

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Список семинаров</h2>
      <ul>
        {seminars.map((seminar) => (
          <li key={seminar.id}>
            <h3>{seminar.title}</h3>
            <p>{seminar.description}</p>
            <p>
              {seminar.date} - {seminar.time}
            </p>
            <img src={seminar.photo} alt={seminar.title} width="200" />
            <button onClick={() => onEdit(seminar)}>Редактировать</button>
            <button onClick={() => deleteSeminar(seminar.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SeminarList;
