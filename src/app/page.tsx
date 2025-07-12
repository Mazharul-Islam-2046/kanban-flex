import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/Card";
import Column from "@/components/ui/Column";
import { SidebarTrigger } from "@/components/ui/sidebar";
import ThemeButton from "@/components/ui/ThemeButton";
import { EllipsisVertical, ListChecks } from "lucide-react";


export default function Home() {

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center w-full justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-8 font-[family-name:var(--font-geist-sans)]">
      <main>

      </main>
      <div className="p-2 flex gap-4 justify-between items-stretch w-full h-full">
        <Column>
          {/* Tasks Card */}
          <div className="px-4 py-6 bg-dark-700 rounded-lg flex flex-col gap-5">

            {/* Card Top Section */}
            <div className="flex items-center justify-between">

              {/* Badges Container */}
              <div className="flex flex-wrap gap-2">
                {/* Badge */}
                <div>
                  <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded">
                    Tasks
                  </span>
                </div>
                <div>
                  <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded">
                    Tasks
                  </span>
                </div>
                <div>
                  <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded">
                    Tasks
                  </span>
                </div>
              </div>

              {/* Card Menu Button */}
              <div className="flex items-center">
                <button className="cursor-pointer">
                  <EllipsisVertical />
                </button>
              </div>
            </div>


            {/* Card Middle Section */}
            <div className="flex flex-col gap-4 py-4">
              <p className="text-2xl leading-7">Finalize Project Scope Document</p>
              <p className="leading-5">Complete the final draft of the scope document for client approval.</p>
            </div>


            {/* Card Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div className="bg-blue-600 h-2.5 rounded-full w-3/4"></div>
            </div>


            {/* Card Bottom Section */}
            <div className="flex items-center justify-between mt-4">
              {/* Members Images */}
              <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
                <Avatar className="flex items-center justify-center w-6 h-6">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar className="flex items-center justify-center w-6 h-6">
                  <AvatarImage src="https://github.com/leerob.png" alt="@leerob" />
                  <AvatarFallback>LR</AvatarFallback>
                </Avatar>
                <Avatar className="flex items-center justify-center w-6 h-6">
                  <AvatarImage
                    src="https://github.com/evilrabbit.png"
                    alt="@evilrabbit"
                  />
                  <AvatarFallback>ER</AvatarFallback>
                </Avatar>
              </div>


              {/* Number of Tasks */}
              <div className="flex items-center gap-2">
                <ListChecks className="inline-block mr-1" />
                <span>10 tasks</span>
              </div>
            </div>



          </div>


          <div className="px-4 py-6 bg-dark-700 rounded-lg flex flex-col gap-5">

            {/* Card Top Section */}
            <div className="flex items-center justify-between">

              {/* Badges Container */}
              <div className="flex flex-wrap gap-2">
                {/* Badge */}
                <div>
                  <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded">
                    Tasks
                  </span>
                </div>
                <div>
                  <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded">
                    Tasks
                  </span>
                </div>
                <div>
                  <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded">
                    Tasks
                  </span>
                </div>
              </div>

              {/* Card Menu Button */}
              <div className="flex items-center">
                <button className="cursor-pointer">
                  <EllipsisVertical />
                </button>
              </div>
            </div>


            {/* Card Middle Section */}
            <div className="flex flex-col gap-4 py-4">
              <p className="text-2xl leading-7">Finalize Project Scope Document</p>
              <p className="leading-5">Complete the final draft of the scope document for client approval.</p>
            </div>


            {/* Card Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div className="bg-purple-600 h-2.5 rounded-full w-3/4"></div>
            </div>


            {/* Card Bottom Section */}
            <div className="flex items-center justify-between mt-4">
              {/* Members Images */}
              <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
                <Avatar className="flex items-center justify-center w-6 h-6">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar className="flex items-center justify-center w-6 h-6">
                  <AvatarImage src="https://github.com/leerob.png" alt="@leerob" />
                  <AvatarFallback>LR</AvatarFallback>
                </Avatar>
                <Avatar className="flex items-center justify-center w-6 h-6">
                  <AvatarImage
                    src="https://github.com/evilrabbit.png"
                    alt="@evilrabbit"
                  />
                  <AvatarFallback>ER</AvatarFallback>
                </Avatar>
              </div>


              {/* Number of Tasks */}
              <div className="flex items-center gap-2">
                <ListChecks className="inline-block mr-1" />
                <span>10 tasks</span>
              </div>
            </div>



          </div>
        </Column>

        <Card className="w-full p-4 flex-grow-1">

        </Card>

        <Card className="w-full p-4 flex-grow-1">

        </Card>

        <Card className="w-full p-4 flex-grow-1">

        </Card>
      </div>
      <ThemeButton />
      <SidebarTrigger />
    </div>
  );
}
