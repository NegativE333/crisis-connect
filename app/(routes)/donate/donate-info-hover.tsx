import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

type Props = {
    children: React.ReactNode;
}

export const DonateInfoHover = ({
    children
}: Props) => {
    return (
        <HoverCard>
            <HoverCardTrigger>
                {children}
            </HoverCardTrigger>
            <HoverCardContent className="min-w-96">
                <p className="text-center leading-7">
                    The donations available on this platform are for testing purposes only and do not involve real money transactions. These donations are supported by Stripe and are strictly for testing the functionality of our platform. No actual financial transactions will occur, ensuring that your contributions remain secure and confined to the testing environment. If you wish to explore this feature, consider using the test card number <span className="underline">4000003560000008</span> provided for testing purposes.
                </p>
            </HoverCardContent>
        </HoverCard>
    )
}