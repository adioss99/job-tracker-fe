import { useMutation } from "@tanstack/react-query";

export const useGetAi = () => {
  const token = import.meta.env.VITE_N8N_KEY;
  const URL = import.meta.env.VITE_N8N_URL;
  return useMutation({
    mutationKey: ["getAi"],
    mutationFn: async (link: string) => {
      const res = await fetch(URL, {
        method: "POST",
        headers: {
          n8n_key: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ link }),
      });
      return res;
    },
    retry: false,
  });
};
