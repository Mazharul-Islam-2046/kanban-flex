import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { EllipsisVertical, ListChecks } from "lucide-react";
import Badge from "./Badge";


const TaskCard = () => {
  return (
    <div className="px-4 py-6 bg-background rounded-lg flex flex-col gap-5 ring-2 ring-foreground/10 hover:ring-foreground/20 transition-all duration-200 ease-in-out">

      {/* Card Top Section */}
      <div className="flex items-center justify-between">

        {/* Badges Container */}
        <div className="flex flex-wrap gap-2">
          {/* Badge */}

          <Badge>
            <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded">
              Tasks
            </span>
          </Badge>
          <Badge>
            <span className="inline-flex items-center px-3 py-1 text-sm font-medium text-blue-800 bg-blue-100 rounded">
              Tasks
            </span>
          </Badge>
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
  );
};

export default TaskCard;