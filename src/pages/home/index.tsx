import { useEffect } from "react";
import { useNavigate } from "react-router";

import ReactIcon from "@/assets/react.svg?react";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login", { replace: true });
  }, [navigate]);
  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <a className="rounded-full" href="/login">
        Login
      </a>
      <ReactIcon />
    </div>
  );
};

export default HomePage;
