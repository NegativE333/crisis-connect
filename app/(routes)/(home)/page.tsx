import { Separator } from "@/components/ui/separator";
import { getSharedInfo } from "@/db/queries";
import { ShareInfoCard } from "./share-info-card";
import { auth } from "@clerk/nextjs";

export default async function Home() {

  const getSharedInfoData = getSharedInfo();
 
  const [
    sharedInfo
  ] = await Promise.all([
    getSharedInfoData
  ]);

  const {userId} = auth();

  return (
    <div className="">
        <h1 className="text-lg sm:text-4xl font-bold leading-snug">
          Crowd-Sourced Insights on <span className="text-rose-500">Disasters</span>
        </h1>
        <Separator className="mt-4 h-0.5"/>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
          {sharedInfo?.map((info) => (
            <ShareInfoCard 
              key={info.id}
              userId={userId ? userId : ''}
              postId={info.id}
              title={info.title}
              description={info.description}
              type={info.type}
              imageSrc={info.imageUrl}
              location={info.location}
              isVerified={info.verified}
              verifiedBy={info.verifiedBy}
              createdAt={info.createdAt}
              updatedAt={info.updatedAt}
            />
          ))}
        </div>
    </div>
  );
}
