"use client";

import { sendAlertEmails } from "@/actions/send-alert-email";
import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { MailCheck } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

const SendAlertPage = () => {
    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [sentStatus, setSentStatus] = useState(false);
    const [alertType, setAlertType] = useState("");
    const [alertLocation, setAlertLocation] = useState("");
    const [pending, startTransition] = useTransition();

    const handleSubmit = (event: any) => {
        event.preventDefault();

        if (pending) return;

        const formData = new FormData(event.target);
        const newTitle = formData.get("title") as string;
        const newType = formData.get("type") as string;
        const newDescription = formData.get("desc") as string;
        const newLocation = formData.get("location") as string;

        startTransition(() => {
            sendAlertEmails({
                title: newTitle,
                type: newType,
                description: newDescription,
                location: newLocation
            })
            .then((data) => {
                if(data.sentStatus === true){
                    toast.success("Emails sent successfully");
                    setAlertLocation(location);
                    setAlertType(type);
                    setTitle("");
                    setType("");
                    setDescription("");
                    setLocation("");
                    setSentStatus(true);
                }
                else{
                    toast.success("Failed to send emails");
                }
            })
            .catch((error) => toast.error("Something went wrong!"));
        });
    }

    return (  
        <div className="">
            <h1 className="text-lg sm:text-4xl font-bold leading-snug">
                Send Alert
            </h1>
            <Separator className="mt-4 h-0.5"/>
            <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
                <FormInput
                    id="title"
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <FormInput
                    label="Type"
                    id="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                />
                <FormInput
                    label="Description"
                    id="desc"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <FormInput
                    id="location"
                    label="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
                <FormSubmit
                    className="w-full"
                    isProcessing={pending}
                >
                    Send
                </FormSubmit>
            </form>
            {sentStatus && (
                <div className="mt-4">
                    <Alert className="bg-green-500/30 text-green-900">
                        {/* <div className="flex items-center gap-2"> */}
                            <MailCheck className="h-4 w-4 text-green-900"/>
                            <AlertTitle>
                                Alert Emails sent successfully
                            </AlertTitle>
                        {/* </div> */}
                        <AlertDescription className="">
                            Alert for <b>{alertType}</b> has been successfully sent to all users in the <b>{alertLocation}</b> location.
                        </AlertDescription>
                    </Alert>
                </div>
            )}
        </div>
    );
}
 
export default SendAlertPage;