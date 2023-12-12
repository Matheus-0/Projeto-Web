/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

import api from "../../service/api";

const Home = () => {
  const navigate = useNavigate();

  const [shownComponent, setShownComponent] = useState<
    "login" | "none" | "register"
  >("none");

  const [userRegistrationCredentials, setUserRegistrationCredentials] =
    useState({ email: "", password: "" });
  const [userLoginCredentials, setUserLoginCredentials] = useState({
    email: "",
    password: "",
  });

  const createAccount = async () => {
    try {
      const response = await api.post(
        "/user/register",
        JSON.stringify({
          email: userRegistrationCredentials.email,
          password: userRegistrationCredentials.password,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      alert(response.data);

      setShownComponent("login");

      setUserLoginCredentials({
        ...userLoginCredentials,
        email: userRegistrationCredentials.email,
      });
    } catch (e: any) {
      alert(e.response.data);
    }
  };

  const getUserTokenData = () => {
    const userTokenData = localStorage.getItem("userTokenData");

    if (userTokenData) {
      return JSON.parse(userTokenData);
    } else {
      return null;
    }
  };

  const login = async () => {
    try {
      const response = await api.post(
        "/auth/login",
        JSON.stringify({
          email: userLoginCredentials.email,
          password: userLoginCredentials.password,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data) {
        localStorage.setItem("userTokenData", JSON.stringify(response.data));

        const userTokenData = getUserTokenData();
        console.log("userTokenData.accessToken", userTokenData.accessToken);

        const test = await api.get("/user/details", {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userTokenData.accessToken,
          },
        });
        console.log(test);

        navigate("/tasks");
      } else {
        alert("Erro: Algo deu errado no login.");
      }
    } catch (e: any) {
      alert(e.response.data);
    }
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      {shownComponent === "none" && (
        <>
          <h1 className="font-semibold text-3xl">
            Bem-vindo ao gerenciador de tarefas!
          </h1>

          <h2 className="text-2xl mt-8">Escolha uma opção:</h2>

          <div className="flex gap-4 mt-8">
            <button
              className="bg-blue-500 px-4 py-2 text-white hover:bg-blue-400"
              onClick={() => setShownComponent("register")}
            >
              Criar conta
            </button>

            <button
              className="bg-green-600 px-4 py-2 text-white hover:bg-green-500"
              onClick={() => setShownComponent("login")}
            >
              Entrar
            </button>
          </div>

          <Link
            className="bg-yellow-500 text-white py-2 px-4 hover:bg-yellow-400 mt-4"
            to="/contact"
          >
            Entre em contato conosco
          </Link>

          <Link
            className="bg-red-500 text-white py-2 px-4 hover:bg-red-400 mt-4"
            to="/about-us"
          >
            Quem somos
          </Link>
        </>
      )}

      {shownComponent === "register" && (
        <div className="bg-slate-100 flex flex-col gap-4 p-8 w-96">
          <button
            className="self-start"
            onClick={() => setShownComponent("none")}
          >
            <MdArrowBack className="h-5 w-5" />
          </button>

          <h2 className="font-semibold text-3xl">Criar conta</h2>

          <input
            type="text"
            placeholder="Email"
            className="outline-none px-3 py-2 w-full"
            onChange={(e) =>
              setUserRegistrationCredentials({
                ...userRegistrationCredentials,
                email: e.target.value,
              })
            }
            value={userRegistrationCredentials.email}
          />

          <input
            type="password"
            placeholder="Senha"
            className="outline-none px-3 py-2 w-full"
            onChange={(e) =>
              setUserRegistrationCredentials({
                ...userRegistrationCredentials,
                password: e.target.value,
              })
            }
            value={userRegistrationCredentials.password}
          />

          <button
            className="bg-blue-500 text-white py-2 px-4 w-full hover:bg-blue-400"
            onClick={createAccount}
          >
            Criar conta
          </button>
        </div>
      )}

      {shownComponent === "login" && (
        <div className="bg-slate-100 flex flex-col gap-4 p-8 w-96">
          <button
            className="self-start"
            onClick={() => setShownComponent("none")}
          >
            <MdArrowBack className="h-5 w-5" />
          </button>

          <h2 className="font-semibold text-3xl">Entrar</h2>

          <input
            type="text"
            placeholder="Email"
            className="outline-none px-3 py-2 w-full"
            onChange={(e) =>
              setUserLoginCredentials({
                ...userLoginCredentials,
                email: e.target.value,
              })
            }
            value={userLoginCredentials.email}
          />

          <input
            type="password"
            placeholder="Senha"
            className="outline-none px-3 py-2 w-full"
            onChange={(e) =>
              setUserLoginCredentials({
                ...userLoginCredentials,
                password: e.target.value,
              })
            }
            value={userLoginCredentials.password}
          />

          <button
            className="bg-green-600 text-white py-2 px-4 w-full hover:bg-green-500"
            onClick={login}
          >
            Entrar
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
