import { create } from "zustand";
import { UserType } from "../types";

interface IUser {
  sessionUser: Partial<UserType>;
  setUser: (payload: Partial<UserType>) => void;
}

export const useUserStore = create<IUser>()((set) => ({
  sessionUser: {},
  setUser: (payload) => set((state) => ({ sessionUser: payload })),
}));
