/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { MdLogout, MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import api from "../../service/api";

const Tasks = () => {
  const navigate = useNavigate();

  const [userTasks, setUserTasks] = useState([]);

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
                  <button><MdOutlineEdit className="h-5 w-5" /></button>
                  <button><MdOutlineDelete className="h-5 w-5" /></button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tasks;