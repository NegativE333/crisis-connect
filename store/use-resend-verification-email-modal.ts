import { create } from "zustand"

type ResendVerificationEmailModalStore = {
    email?: string; 
    isOpen: boolean;
    open: (email: string) => void;
    close: () => void;
}

export const useResendVerificationEmailModal = create<ResendVerificationEmailModalStore>((set) => ({
    id: undefined,
    isOpen: false,
    open: (email: string) => set({isOpen: true, email}),
    close: () => set({isOpen: false}),
}));