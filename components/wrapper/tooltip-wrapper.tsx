import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type Props = {
    children: React.ReactNode;
    tip: string;
}

export const TooltipWrapper = ({
    children,
    tip
}: Props) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {tip}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
