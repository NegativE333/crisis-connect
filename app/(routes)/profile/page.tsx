import { getSharedInfoByUser } from "@/db/queries";
import { ShareInfoCard } from "./share-info-card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const ProfilePage = async () => {

    const getSharedInfoByUserData = getSharedInfoByUser();

    const [
        sharedInfoByUser
    ] = await Promise.all([
        getSharedInfoByUserData
    ])

    if(!sharedInfoByUser) return null;

    return (
        <div className="h-full">
            <h1 className="text-lg sm:text-4xl font-bold leading-snug">
                {sharedInfoByUser.length} Shared info
            </h1>
            <Separator className="mt-4 h-0.5"/>
            {sharedInfoByUser.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                    {sharedInfoByUser.map((info) => (
                        <ShareInfoCard 
                            key={info.id}
                            userId={info.userId}
                            postId={info.id}
                            title={info.title}
                            type={info.type}
                            description={info.description}
                            imageSrc={info.imageUrl}
                            location={info.location}
                            isVerified={info.verified}
                            verifiedBy={info.verifiedBy}
                            createdAt={info.createdAt}
                            updatedAt={info.updatedAt}
                        />
                    ))}
                </div>
            ) : (
                <div className="h-full w-full flex flex-col gap-2 items-center justify-center text-center leading-9 text-xl">
                    <div className="bg-white bg-opacity-5 px-12 py-8 rounded-lg shadow-md">
                        <p>
                            Looks like you haven&apos;t shared any information about <span className="text-red-500 font-semibold">disasters</span> yet.
                        </p>
                        <p>
                            Why not be the first to <span className="font-semibold">contribute?</span>
                        </p>
                        <p>
                            Share your 
                            <span className="font-semibold"> insights</span>, 
                            <span className="font-semibold"> alerts</span> or 
                            <span className="font-semibold"> experiences </span>
                            to help others stay informed and prepared.
                        </p>
                        <Link href="/share-info" className="text-blue-400 font-semibold">
                            Click here to create your first post.
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
 
export default ProfilePage;