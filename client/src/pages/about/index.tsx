import { MdHome } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen p-8">
      <button
        className="flex items-center gap-2 bg-red-700 text-white absolute left-8 top-8 p-2"
        onClick={() => navigate("/")}
      >
        <MdHome />
        
        Página inicial
      </button>

      <h1 className="font-semibold text-3xl self-center">Quem somos</h1>

      <p className="mt-10 w-[576px]">
        Somos uma equipe dedicada que busca simplificar a gestão de tarefas. Nosso objetivo é fornecer uma experiência intuitiva e eficiente para que você possa focar no que realmente importa.
      </p>
    </div>
  );
};

export default About;