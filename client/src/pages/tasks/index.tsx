/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { MdLogout, MdOutlineAdd, MdOutlineClose, MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import api from "../../service/api";

const Tasks = () => {
  const navigate = useNavigate();

  const [userTasks, setUserTasks] = useState([]);
  const [taskCreationData, setTaskCreationData] = useState({
    name: "",
    duration: 0,
    dueDate: "",
    category: "",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [taskToEditId, setTaskToEditId] = useState(-1);

  const getUserTokenData = () => {
    const userTokenData = localStorage.getItem("userTokenData");

    if (userTokenData) {
      return JSON.parse(userTokenData);
    } else {
      return null;
    }
  };

  const getUserTasks = async () => {
    const userTokenData = getUserTokenData();

    try {
      const response = await api.get("/task", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userTokenData.accessToken,
        },
        params: {
          email: userTokenData.username,
        },
      });

      setUserTasks(response.data);
    } catch (e: any) {
      alert("Erro: Ocorreu um erro inesperado ao obter tarefas, seu token pode ter expirado.");
    }
  };

  const logout = () => {
    localStorage.removeItem("userTokenData");

    navigate("/");
  };

  const handleEditButtonClick = (task: any) => {
    setTaskToEditId(task.id);
    setModalOpen(true);
    setTaskCreationData({
      category: task.category,
      dueDate: task.dueDate,
      duration: task.duration,
      name: task.name,
    });
  };

  const handleDeleteButtonClick = async (task: any) => {
    if (!confirm("Tem certeza que deseja apagar essa tarefa?")) {
      return;
    }

    const userTokenData = getUserTokenData();

    try {
      const response = await api.delete("/task", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userTokenData.accessToken,
        },
        params: {
          id: task.id,
        },
      });

      alert(response.data);

      getUserTasks();
    } catch (e: any) {
      alert(e.response.data);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const userTokenData = getUserTokenData();

    try {
      let response;

      if (taskToEditId === -1) {
        response = await api.post("/task", {
          ...taskCreationData,
          email: userTokenData.username,
        }, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userTokenData.accessToken,
          },
        });
      } else {
        response = await api.put("/task", {
          ...taskCreationData,
          taskId: taskToEditId,
        }, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userTokenData.accessToken,
          },
        })
      }

      setModalOpen(false);
      setTaskToEditId(-1);

      setTaskCreationData({
        name: "",
        duration: 0,
        dueDate: "",
        category: "",
      });

      alert(response.data);

      getUserTasks();
    } catch (e: any) {
      alert(e.response.data);
    }
  };

  useEffect(() => {
    getUserTasks();
  }, []);

  return (
    <div className="flex flex-col items-center py-8">
      <button
        className="flex items-center gap-2 bg-red-700 text-white absolute left-8 top-8 p-2"
        onClick={logout}
      >
        <MdLogout />
        
        Sair
      </button>

      <button
        className="flex items-center gap-2 bg-green-700 text-white absolute right-8 bottom-8 p-2"
        onClick={() => {
          setModalOpen(true);
          setTaskToEditId(-1);
        }}
        disabled={modalOpen}
      >
        <MdOutlineAdd />
        
        Adicionar tarefa
      </button>

      {modalOpen && (
        <div className="flex flex-col fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-300 p-8 border-4 shadow-lg">
          <button
            className="p-2 bg-red-700 self-start text-white"
            onClick={() => {
              setModalOpen(false);
              setTaskToEditId(-1);
            }}
          >
            <MdOutlineClose />
          </button>
          
          <h2 className="mt-4 font-semibold text-2xl self-center">Criar nova tarefa</h2>
          
          <form className="mt-4 flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Nome da tarefa"
              className="p-2 outline-none"
              value={taskCreationData.name}
              onChange={(e) => setTaskCreationData({ ...taskCreationData, name: e.target.value })}
            />

            <input
              type="number"
              name="duration"
              placeholder="Duração (em minutos)"
              min={1}
              className="p-2 outline-none"
              value={taskCreationData.duration}
              onChange={(e) => setTaskCreationData({ ...taskCreationData, duration: Number(e.target.value) })}
            />
            
            <input
              type="date"
              name="dueDate"
              placeholder="Data de conclusão"
              className="p-2 outline-none"
              value={taskCreationData.dueDate}
              onChange={(e) => setTaskCreationData({ ...taskCreationData, dueDate: e.target.value })}
            />

            <input
              type="text"
              name="category"
              placeholder="Categoria"
              className="p-2 outline-none"
              value={taskCreationData.category}
              onChange={(e) => setTaskCreationData({ ...taskCreationData, category: e.target.value })}
            />

            <button className="bg-green-700 text-white p-2" type="submit">
              {taskToEditId === -1 ? "Criar tarefa" : "Editar tarefa"}
            </button>
          </form>
        </div>
      )}

      <h1 className="font-semibold text-3xl">Gerenciamento de tarefas</h1>

      <table className="mt-8 border-collapse">
        <thead>
            <tr>
                <th className="py-2 px-4 bg-gray-200 text-left">Nome</th>
                <th className="py-2 px-4 bg-gray-200 text-left">Duração</th>
                <th className="py-2 px-4 bg-gray-200 text-left">Data para conclusão</th>
                <th className="py-2 px-4 bg-gray-200 text-left">Data de criação</th>
                <th className="py-2 px-4 bg-gray-200 text-left">Categoria</th>
                <th className="py-2 px-4 bg-gray-200 text-left">Ações</th>
            </tr>
        </thead>
        <tbody>
            {userTasks.map((task: any) => (
              <tr>
                <td className="py-3 px-4">{task.name}</td>
                <td className="py-3 px-4">{task.duration}</td>
                <td className="py-3 px-4">{task.dueDate}</td>
                <td className="py-3 px-4">{task.createdDate}</td>
                <td className="py-3 px-4">{task.category}</td>
                <td className="py-3 px-4 flex gap-2 items-center">
                  <button
                    onClick={() => handleEditButtonClick(task)}
                    disabled={modalOpen}
                  >
                    <MdOutlineEdit className="h-5 w-5" />
                  </button>

                  <button
                    onClick={() => handleDeleteButtonClick(task)}
                    disabled={modalOpen}
                  >
                    <MdOutlineDelete className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tasks;