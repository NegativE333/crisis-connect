import { isAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";

type Props = {
    children: React.ReactNode;
}

const AdminLayout = ({
    children
}: Props) => {

    if(!isAdmin()){
        redirect('/');
    }
    
    return (  
        <div>
            {children}
        </div>
    );
}
 
export default AdminLayout;