/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import api from "../../service/api";

const userTypeToText = {
  ADMIN: "Administrador",
  COMMON_USER: "Usuário comum",
};

const Admin = () => {
  const navigate = useNavigate();

  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const [users, setUsers] = useState([]);

  const getUserTokenData = () => {
    const userTokenData = localStorage.getItem("userTokenData");

    if (userTokenData) {
      return JSON.parse(userTokenData);
    } else {
      return null;
    }
  };

  const getAllUsers = async () => {
    const userTokenData = getUserTokenData();

    try {
      const response = await api.get("/user", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userTokenData.accessToken,
        },
        // params: {
        // },
      });

      setUsers(response.data);
    } catch (error) {
      alert("Erro: Ocorreu um erro inesperado ao obter usuários, seu token pode ter expirado.");
    }
  };

  const logout = () => {
    localStorage.removeItem("userTokenData");

    navigate("/");
  };

  const handleDeleteButtonClick = async (user: any) => {
    if (!confirm("Tem certeza que deseja apagar esse usuário?")) {
      return;
    }

    const userTokenData = getUserTokenData();

    try {
      const response = await api.delete("/user", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userTokenData.accessToken,
        },
        params: {
          id: user.id,
        },
      });

      alert(response.data);

      getAllUsers();
    } catch (e: any) {
      alert(e.response.data);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    const userTokenData = getUserTokenData();

    const getUserRoles = async () => {
      const response = await api.get("/user/type", {
        headers: {
          Authorization: "Bearer " + userTokenData.accessToken,
        },
      });

      let isAdmin = false;

      for (const result of response.data) {
        if (result.authority && result.authority === "ADMIN") {
          isAdmin = true;
          
          break;
        }
      }

      if (isAdmin) {
        setIsUserAdmin(true);
      } else {
        navigate("/");
      }
    };

    getUserRoles();
  }, [navigate]);

  if (!isUserAdmin) {
    return (
      <></>
    );
  }

  return (
    <div className="flex flex-col p-8">
      <button
        className="flex items-center gap-2 bg-red-700 text-white absolute left-8 top-8 p-2"
        onClick={logout}
      >
        <MdLogout />
        
        Sair
      </button>

      <h1 className="font-semibold text-3xl self-center">Página de administrador</h1>

      <div className="mt-10 flex flex-col gap-2">
        {users.map((user: any) => (
          <div className="flex justify-between items-center p-4 bg-slate-200">
            <div>
              <p>Email: {user.email}</p>
              <p>Tipo: {userTypeToText[user.permissions[0].authority as keyof typeof userTypeToText]}</p>
            </div>

            <div>
              <button
                className="bg-red-600 text-white p-2"
                onClick={() => handleDeleteButtonClick(user)}
              >
                Apagar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;