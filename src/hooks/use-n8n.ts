import { useQuery } from "@tanstack/react-query";

import { usePersistStore } from "@/stores/use-persist";

export const useGetAi = () => {
  const token = usePersistStore.getState().auth.token;
  return useQuery({
    queryKey: ["getAi"],
    queryFn: async () =>
      await fetch(
        "http://localhost:5678/webhook-test/49312989-6463-465f-bf01-e893c1bc100c",
        {
          method: "POST",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
            "Content-Type": "application/json",
          },
        }
      ),
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};
