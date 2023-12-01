/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { MdLogout } from "react-icons/md";
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
            </tr>
        </thead>
        <tbody>
            <tr>
                <td className="py-2 px-4">Tarefa 1</td>
                <td className="py-2 px-4">120 minutos</td>
                <td className="py-2 px-4">05/12/2023</td>
                <td className="py-2 px-4">01/12/2023</td>
                <td className="py-2 px-4">Categoria A</td>
            </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Tasks;