import { create } from "zustand"

type EmailVerificationModalStore = {
    isOpen: boolean;
    open: () => void;
    close: () => void;
}

export const useEmailVerificationModal = create<EmailVerificationModalStore>((set) => ({
    isOpen: false,
    open: () => set({isOpen: true}),
    close: () => set({isOpen: false}),
}));