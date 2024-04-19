import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const HelpPage = async () => {

    return (  
      <div className="">
          <h1 className="text-lg sm:text-4xl font-bold leading-snug">
            Help
          </h1>
          <Separator className="mt-4 h-0.5"/>
          <dl className="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700 mt-4">
              <div className="flex flex-col pb-3">
                  <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">National Emergency Number</dt>
                  <dd className="text-lg font-semibold">112</dd>
              </div>
              <div className="flex flex-col py-3">
                  <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Air Ambulance</dt>
                  <dd className="text-lg font-semibold">9540161344</dd>
              </div>
              <div className="flex flex-col py-3">
                  <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Disaster Management (N.D.M.A)</dt>
                  <dd className="text-lg font-semibold">1078</dd>
              </div>
              <div className="flex flex-col py-3">
                  <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">NDRF Helpline</dt>
                  <dd className="text-lg font-semibold">9711077372, 011-24363260</dd>
              </div>
              <div className="flex flex-col py-3">
                  <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">NDMA Website</dt>
                  <dd className="text-lg font-semibold">
                    <Link href="https://ndma.gov.in/" className="text-blue-500">
                      https://ndma.gov.in/
                    </Link>
                  </dd>
              </div>
              <div className="flex flex-col py-3">
                  <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Sachet NDMA Website</dt>
                  <dd className="text-lg font-semibold">
                    <Link href="https://sachet.ndma.gov.in/" className="text-blue-500">
                      https://sachet.ndma.gov.in/
                    </Link>
                  </dd>
              </div>
          </dl>
      </div>
    );
}
 
export default HelpPage;