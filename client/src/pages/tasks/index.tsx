/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { MdLogout, MdOutlineAdd, MdOutlineClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import api from "../../service/api";

const statusToText = {
  PENDING: "Pendente",
  IN_PROGRESS: "Em progresso",
  FINISHED: "Finalizado",
};

const statusToColor = {
  PENDING: "bg-[#F5F5F7]",
  IN_PROGRESS: "bg-[#4192BF4D]",
  FINISHED: "bg-[#40D67F4D]",
};

const Tasks = () => {
  const navigate = useNavigate();

  const [userTasks, setUserTasks] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [finishedTasks, setFinishedTasks] = useState([]);
  const [taskCreationData, setTaskCreationData] = useState({
    name: "",
    duration: 0,
    status: "PENDING",
    dueDate: "",
  });
  const [taskSearchData, setTaskSearchData] = useState({
    name: "",
    dueDate: "",
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

  const getUserTasks = async (taskName = "", taskDueDate = "") => {
    const userTokenData = getUserTokenData();

    try {
      const response = await api.get("/task", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userTokenData.accessToken,
        },
        params: {
          email: userTokenData.username,
          name: taskName,
          dueDate: taskDueDate,
        },
      });

      setUserTasks(response.data);
    } catch (e: any) {
      alert(
        "Erro: Ocorreu um erro inesperado ao obter tarefas, seu token pode ter expirado."
      );
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
      dueDate: task.dueDate,
      duration: task.duration,
      name: task.name,
      status: task.status,
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

  const handleSearch = () => {
    getUserTasks(taskSearchData.name, taskSearchData.dueDate);
  };

  const handleFilterCleanUp = () => {
    setTaskSearchData({
      dueDate: "",
      name: "",
    });
    getUserTasks();
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const userTokenData = getUserTokenData();

    try {
      let response;

      if (taskToEditId === -1) {
        response = await api.post(
          "/task",
          {
            ...taskCreationData,
            email: userTokenData.username,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + userTokenData.accessToken,
            },
          }
        );
      } else {
        response = await api.put(
          "/task",
          {
            ...taskCreationData,
            taskId: taskToEditId,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + userTokenData.accessToken,
            },
          }
        );
      }

      setModalOpen(false);
      setTaskToEditId(-1);

      setTaskCreationData({
        name: "",
        duration: 0,
        status: "PENDING",
        dueDate: "",
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

  useEffect(() => {
    setPendingTasks(userTasks.filter((task: any) => task.status === "PENDING"));
    setInProgressTasks(
      userTasks.filter((task: any) => task.status === "IN_PROGRESS")
    );
    setFinishedTasks(
      userTasks.filter((task: any) => task.status === "FINISHED")
    );
  }, [userTasks]);

  return (
    <div className="flex flex-col p-8">
      <button
        className="flex items-center gap-2 bg-red-700 text-white absolute left-8 top-8 p-2"
        onClick={logout}
      >
        <MdLogout />
        Sair
      </button>

      <button
        className="flex items-center gap-2 bg-green-700 text-white fixed right-8 bottom-8 p-2"
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

          <h2 className="mt-4 font-semibold text-2xl self-center">
            Criar nova tarefa
          </h2>

          <form className="mt-4 flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Nome da tarefa"
              className="p-2 outline-none"
              value={taskCreationData.name}
              onChange={(e) =>
                setTaskCreationData({
                  ...taskCreationData,
                  name: e.target.value,
                })
              }
            />

            <input
              type="number"
              name="duration"
              placeholder="Duração (em minutos)"
              min={1}
              className="p-2 outline-none"
              value={taskCreationData.duration}
              onChange={(e) =>
                setTaskCreationData({
                  ...taskCreationData,
                  duration: Number(e.target.value),
                })
              }
            />

            <select
              name="status"
              id=""
              className="p-2 outline-none border-r-transparent border-r-4"
              value={taskCreationData.status}
              onChange={(e) =>
                setTaskCreationData({
                  ...taskCreationData,
                  status: e.target.value,
                })
              }
            >
              <option value="PENDING">Pendente</option>
              <option value="IN_PROGRESS">Em progresso</option>
              <option value="FINISHED">Finalizado</option>
            </select>

            <input
              type="date"
              name="dueDate"
              placeholder="Prazo final"
              className="p-2 outline-none"
              value={taskCreationData.dueDate}
              onChange={(e) =>
                setTaskCreationData({
                  ...taskCreationData,
                  dueDate: e.target.value,
                })
              }
            />

            <button className="bg-green-700 text-white p-2" type="submit">
              {taskToEditId === -1 ? "Criar tarefa" : "Editar tarefa"}
            </button>
          </form>
        </div>
      )}

      <h1 className="font-semibold text-3xl self-center">
        Gerenciamento de tarefas
      </h1>

      <div className="mt-10 flex gap-4 justify-center">
        <input
          type="text"
          name="taskName"
          placeholder="Nome da tarefa"
          className="p-2 outline-none bg-slate-100"
          value={taskSearchData.name}
          onChange={(e) =>
            setTaskSearchData({ ...taskSearchData, name: e.target.value })
          }
        />

        <input
          type="date"
          name="taskDueDate"
          placeholder="Data"
          className="p-2 outline-none bg-slate-100"
          value={taskSearchData.dueDate}
          onChange={(e) =>
            setTaskSearchData({ ...taskSearchData, dueDate: e.target.value })
          }
        />

        <button className="bg-green-700 text-white p-2" onClick={handleSearch}>
          Buscar
        </button>

        <button
          className="bg-red-600 text-white p-2"
          onClick={handleFilterCleanUp}
        >
          Limpar filtros
        </button>
      </div>

      {pendingTasks.length > 0 && (
        <>
          <h1 className="mt-10 font-semibold text-3xl">Tarefas pendentes</h1>

          <div className="mt-10 grid grid-cols-4 gap-6">
            {pendingTasks.map((task: any) => (
              <div
                className={
                  "flex flex-col p-4 " +
                  statusToColor[task.status as keyof typeof statusToColor]
                }
              >
                <div>
                  <h1 className="text-xl font-semibold">{task.name}</h1>
                </div>
                <p className="mt-6">
                  <strong>Duração:</strong> {task.duration} minutos
                </p>
                <p className="mt-2">
                  <strong>Status:</strong>{" "}
                  {statusToText[task.status as keyof typeof statusToText]}
                </p>
                <p className="mt-2">
                  <strong>Prazo final:</strong> {task.dueDate}
                </p>
                <p className="mt-2">
                  <strong>Data de criação:</strong> {task.createdDate}
                </p>
                <div className="mt-6 flex gap-2">
                  <button
                    className="bg-green-700 text-white p-2"
                    onClick={() => handleEditButtonClick(task)}
                  >
                    Editar
                  </button>

                  <button
                    className="bg-red-600 text-white p-2"
                    onClick={() => handleDeleteButtonClick(task)}
                  >
                    Apagar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {inProgressTasks.length > 0 && (
        <>
          <h1 className="mt-10 font-semibold text-3xl">Tarefas em progresso</h1>

          <div className="mt-10 grid grid-cols-4 gap-6">
            {inProgressTasks.map((task: any) => (
              <div
                className={
                  "flex flex-col p-4 " +
                  statusToColor[task.status as keyof typeof statusToColor]
                }
              >
                <div>
                  <h1 className="text-xl font-semibold">{task.name}</h1>
                </div>
                <p className="mt-6">
                  <strong>Duração:</strong> {task.duration} minutos
                </p>
                <p className="mt-2">
                  <strong>Status:</strong>{" "}
                  {statusToText[task.status as keyof typeof statusToText]}
                </p>
                <p className="mt-2">
                  <strong>Prazo final:</strong> {task.dueDate}
                </p>
                <p className="mt-2">
                  <strong>Data de criação:</strong> {task.createdDate}
                </p>
                <div className="mt-6 flex gap-2">
                  <button
                    className="bg-green-700 text-white p-2"
                    onClick={() => handleEditButtonClick(task)}
                  >
                    Editar
                  </button>

                  <button
                    className="bg-red-600 text-white p-2"
                    onClick={() => handleDeleteButtonClick(task)}
                  >
                    Apagar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {finishedTasks.length > 0 && (
        <>
          <h1 className="mt-10 font-semibold text-3xl">Tarefas finalizadas</h1>

          <div className="mt-10 grid grid-cols-4 gap-6">
            {finishedTasks.map((task: any) => (
              <div
                className={
                  "flex flex-col p-4 " +
                  statusToColor[task.status as keyof typeof statusToColor]
                }
              >
                <div>
                  <h1 className="text-xl font-semibold">{task.name}</h1>
                </div>
                <p className="mt-6">
                  <strong>Duração:</strong> {task.duration} minutos
                </p>
                <p className="mt-2">
                  <strong>Status:</strong>{" "}
                  {statusToText[task.status as keyof typeof statusToText]}
                </p>
                <p className="mt-2">
                  <strong>Prazo final:</strong> {task.dueDate}
                </p>
                <p className="mt-2">
                  <strong>Data de criação:</strong> {task.createdDate}
                </p>
                <div className="mt-6 flex gap-2">
                  <button
                    className="bg-green-700 text-white p-2"
                    onClick={() => handleEditButtonClick(task)}
                  >
                    Editar
                  </button>

                  <button
                    className="bg-red-600 text-white p-2"
                    onClick={() => handleDeleteButtonClick(task)}
                  >
                    Apagar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Tasks;
