import { useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    alert("Email enviado com sucesso!");

    navigate("/");
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <div className="bg-slate-100 flex flex-col gap-4 p-8 w-96">
        <Link to="/" className="self-start">
          <MdArrowBack className="h-5 w-5" />
        </Link>

        <form onSubmit={handleSubmit}>
          <h2 className="font-semibold text-3xl">Entre em contato</h2>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="outline-none px-3 py-2 w-full mt-4"
            placeholder="Email"
          />

          <br />

          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            className="outline-none px-3 py-2 w-full mt-4"
            placeholder="Assunto"
          />

          <br />

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="mt-4 w-full p-2"
          />

          <br />

          <button
            className="bg-green-600 px-4 py-2 text-white hover:bg-green-500 mt-4 w-full"
            type="submit"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
