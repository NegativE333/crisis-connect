import { create } from "zustand"

type LocationModalStore = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

export const useLocationModal = create<LocationModalStore>((set) => ({
    isOpen: false,
    open: () => set({isOpen: true}),
    close: () => set({isOpen: false}),
}));