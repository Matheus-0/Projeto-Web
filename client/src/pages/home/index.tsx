/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { MdArrowBack } from "react-icons/md";

import api from "../../service/api";

const Home = () => {
  const [shownComponent, setShownComponent] = useState<"login" | "none" | "register">("none");

  const [userCredentials, setUserCredentials] = useState({ email: "", password: "" });

  const createAccount = async () => {
    try {
      await api.post("/user/register", JSON.stringify({
        email: userCredentials.email,
        password: userCredentials.password,
      }), {
        headers: {
          "Content-Type": "application/json",
        }
      });
    } catch (e: any) {
      alert(e.response.data);
    }
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      {shownComponent === "none" && (
        <>
          <h1 className="font-semibold text-3xl">Bem-vindo ao gerenciador de tarefas!</h1>

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
            onChange={(e) => setUserCredentials({ ...userCredentials, email: e.target.value })}
            value={userCredentials.email}
          />

          <input
            type="password"
            placeholder="Senha"
            className="outline-none px-3 py-2 w-full"
            onChange={(e) => setUserCredentials({ ...userCredentials, password: e.target.value })}
            value={userCredentials.password}
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

          <input type="text" placeholder="Email" className="outline-none px-3 py-2 w-full" />
          <input type="password" placeholder="Senha" className="outline-none px-3 py-2 w-full" />

          <button className="bg-green-600 text-white py-2 px-4 w-full hover:bg-green-500">Entrar</button>
        </div>
      )}
    </div>
  );
};

export default Home;