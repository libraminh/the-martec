import { create } from "zustand";

interface ModalState {
  showModal: boolean;
  setOpen: (payload: boolean) => void;
}

export const useModalStore = create<ModalState>()((set) => ({
  showModal: false,
  setOpen: (payload) => set((state) => ({ showModal: payload })),
}));
