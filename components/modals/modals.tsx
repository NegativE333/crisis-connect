import { DeleteInfoModal } from "./delete-info-modal"
import { SetEmailModal } from "./set-email-modal"
import { VerificationModal } from "./verification-modal"


export const Modals = () => {
    return(
        <>
            <SetEmailModal />
            <VerificationModal />
            <DeleteInfoModal />
        </>
    )
}