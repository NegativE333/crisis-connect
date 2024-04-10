import { auth } from "@clerk/nextjs"

const allowedIds = [
    "user_2eXwaTbu7H9BrLqHquhsjUAioV4"
]

export const isAdmin = () => {
    const {userId} = auth();

    if(!userId) return false;

    return userId === process.env.ADMIN_ID;
}