import { create } from "zustand";

type TitleState = {
  title: string;
  setTitle: (title: string) => void;
};

export const useTitle = create<TitleState>()((set, _get) => ({
  title: "",
  setTitle: (title) => set({ title }),
}));

type isModalOpen = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const useOpenModal = create<isModalOpen>()((set, _get) => ({
  open: false,
  setOpen: (open) => set({ open }),
}));
