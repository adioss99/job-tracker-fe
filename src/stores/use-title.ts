import { create } from "zustand";

type TitleState = {
  title: string;
  setTitle: (title: string) => void;
  reset: () => void;
};

export const useTitle = create<TitleState>()((set, _get) => ({
  title: "",
  setTitle: (title) => set({ title }),
  reset: () => set({ title: "" }),
}));
