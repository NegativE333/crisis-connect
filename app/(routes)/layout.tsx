import { AlertBox } from "@/components/side-boxes/alert-box";
import { EmailBox } from "@/components/side-boxes/email-box";
import { FeedWrapper } from "@/components/wrapper/feed-wrapper";
import { StickyWrapper } from "@/components/wrapper/sticky-wrapper";
import { Suggestions } from "@/components/side-boxes/suggestions";
import { getAlertEmail } from "@/db/queries";
import { client } from "@/lib/sanity";
import { alertProps } from "@/lib/sanity-interface";
import { checkVerificationStatus } from "@/lib/verify-email";
import { auth } from "@clerk/nextjs";

type Props = {
    children: React.ReactNode;
}

async function getData() {
    const query = `
        *[_type == 'alert'] | order(_createdAt desc){
            title,
            type,
            location,
            level
        }
    `;

    const data = await client.fetch(query);

    return data;
}

const MapLayout = async ({
    children
}: Props) => {

    const data : alertProps [] = await getData();

    const getAlertEmailData = await getAlertEmail();

    const [
        AlertEmail
    ] = await Promise.all([
        getAlertEmailData
    ]);

    const {userId} = auth();

    let isVerified = false;

    if (AlertEmail?.email) {
        try {
            isVerified = await checkVerificationStatus(AlertEmail?.email);
        } catch (error) {
            console.error("Error checking verification status:", error);
        }
    }

    return (  
        <div className="flex gap-[48px] px-6">
            <FeedWrapper>
                {children}
            </FeedWrapper>
            <StickyWrapper>
                <AlertBox
                    userLocation={AlertEmail?.location}
                    userId={userId ?? undefined}
                    alert={data}
                />
                <EmailBox 
                    email={AlertEmail?.email}
                    location={AlertEmail?.location}
                    isVerified={isVerified}
                />
                <Suggestions 
                    disasterType={data.length !== 0 ? data[0].type : " "}
                />
            </StickyWrapper>
        </div>
    );
}
 
export default MapLayout;