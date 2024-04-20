import { DeleteInfoModal } from "./delete-info-modal"
import { ResendVerificaionEmailModal } from "./resend-verification-email-modal"
import { SetEmailModal } from "./set-email-modal"
import { UpdateEmailModal } from "./update-email-modal"
import { VerificationModal } from "./verification-modal"


export const Modals = () => {
    return(
        <>
            <SetEmailModal />
            <UpdateEmailModal />
            <VerificationModal />
            <DeleteInfoModal />
            <ResendVerificaionEmailModal />
        </>
    )
}