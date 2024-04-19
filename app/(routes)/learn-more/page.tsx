import { Separator } from "@/components/ui/separator";


const LearnMorePage = () => {
    return (  
        <div>
            <h1 className="text-lg sm:text-4xl font-bold leading-snug">
                Learn More
            </h1>
            <Separator className="mt-4 h-0.5"/>
            <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700 mt-4">
                <div className="flex flex-col py-3">
                    <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Post Verification</dt>
                    <dd className="text-lg font-semibold">
                        Posts submitted by users will undergo a verification process. If a post receives verification from more than 10 users, it will be marked as verified.
                    </dd>
                </div>
                <div className="flex flex-col py-3">
                    <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Email Verification</dt>
                    <dd className="text-lg font-semibold">
                        To receive alert emails, users must verify their email addresses using Amazon SES. Only verified email addresses will be eligible to receive alert notifications.
                    </dd>
                </div>
                <div className="flex flex-col py-3">
                    <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Alert Email Authorization</dt>
                    <dd className="text-lg font-semibold">
                        Only administrators have the authority to send alert emails to users. These emails will only be sent to individuals whose email addresses have been verified through Amazon SES.
                    </dd>
                </div>
            </dl>
        </div>
    );
}
 
export default LearnMorePage;