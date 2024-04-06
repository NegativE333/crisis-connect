import { auth } from "@clerk/nextjs"

const allowedIds = [
    "user_2eXwaTbu7H9BrLqHquhsjUAioV4"
]

export const isAdmin = () => {
    const {userId} = auth();

    if(!userId) return false;

    return allowedIds.indexOf(userId) !== -1;
}