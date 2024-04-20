import { create } from "zustand"

type UpdateEmailModalStore = {
    id?: string;
    isOpen: boolean;
    open: (id: string) => void;
    close: () => void;
}

export const useUpdateEmailModal = create<UpdateEmailModalStore>((set) => ({
    isOpen: false,
    open: (id: string) => set({isOpen: true, id}),
    close: () => set({isOpen: false}),
}));