import { create } from "zustand";

interface AssistantState {
  isOpen: boolean;
  message?: string;
  setOpen: (message?: boolean) => void;
}

export const useAssistantStore = create<AssistantState>()((set) => ({
  isOpen: false,
  setOpen: (message) => set((state) => ({ isOpen: !state.isOpen })),
}));
