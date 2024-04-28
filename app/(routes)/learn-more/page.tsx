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
                    <dd className="text-base font-semibold leading-7">
                        Posts submitted by users will undergo a verification process. If a post receives verification from more than 10 users, it will be marked as verified.
                    </dd>
                </div>
                <div className="flex flex-col py-3">
                    <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Email Verification</dt>
                    <dd className="text-base font-semibold leading-7">
                        To receive alert emails, users must verify their email addresses using Amazon SES. Only verified email addresses will be eligible to receive alert notifications.
                    </dd>
                </div>
                <div className="flex flex-col py-3">
                    <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Alert Email Authorization</dt>
                    <dd className="text-base font-semibold leading-7">
                        Only administrators have the authority to send alert emails to users. These emails will only be sent to individuals whose email addresses have been verified through Amazon SES.
                    </dd>
                </div>
                <div className="flex flex-col py-3">
                    <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Donations</dt>
                    <dd className="text-base font-semibold leading-7">
                        The donations available on this platform are for testing purposes only and do not involve real money transactions. These donations are supported by Stripe and are strictly for testing the functionality of our platform. No actual financial transactions will occur, ensuring that your contributions remain secure and confined to the testing environment. If you wish to explore this feature, consider using the test card number <span className="underline">4000003560000008</span> provided for testing purposes.
                    </dd>
                </div>
            </dl>
        </div>
    );
}
 
export default LearnMorePage;