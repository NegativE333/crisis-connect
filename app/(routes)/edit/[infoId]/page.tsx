import { getInfoById } from "@/actions/get-info-by-id";
import { EditForm } from "./edit-form";
import { Separator } from "@/components/ui/separator";


type Props = {
    params: {infoId: string}
}

const EditPage = async ({
    params
}: Props) => {
    
    const data = await getInfoById({postId: params.infoId});

    return (  
        <div>
            <h1 className="text-lg sm:text-4xl font-bold leading-snug">
                Edit Info
            </h1>
            <Separator className="mt-4 h-0.5" />
            <EditForm 
                infoData={data}
            />
        </div>
    );
}
 
export default EditPage;