import { Ellipsis, ListTodo, MessageCircle } from "lucide-react";
import { Card } from "./Card";
import Badge from "./Badge";


const HorizontalTaskCard = () => {
    return (
        <Card className="hover:shadow-lg hover:bg-[#1d1d1d] cursor-pointer transition-shadow duration-300 ease-in-out">
            <div className="flex items-center justify-between px-10 w-full gap-12">

                {/* Task Title */}
                <div className="flex flex-col gap-1 grow w-1/3">
                    <h2 className="text-2xl">Description of the task goes here.</h2>
                    <p className="text">Description of the task goes here. It should be concise ...</p>
                </div>


                {/* Task Middle Part */}
                <div className="flex items-center gap-4 grow w-1/3">
                    {/* Comment Badge */}
                    <div className="flex items-center gap-3 rounded border border-gray-300 px-3 py-1">
                        <MessageCircle size={14} />
                        <span className="text-sm font-medium">
                            12
                        </span>
                    </div>


                    {/* Tasks Badge */}
                    <div className="flex items-center gap-3 rounded border border-gray-300 px-3 py-1">
                        <ListTodo size={14} />
                        <span className="text-sm font-medium">
                            8
                        </span>
                    </div>

                    {/* Task Badges */}
                    <div className="flex items-center gap-2">
                        <Badge>In Progress</Badge>
                        <Badge>Completed</Badge>
                    </div>


                    {/* Days left */}
                    <div className="flex items-center gap-3 rounded border border-gray-300 px-3 py-1">
                        <span className="text-sm font-medium text-nowrap">
                            5 days left
                        </span>
                    </div>
                </div>


                {/* Task Right Part */}
                <div className="grow w-1/3">
                    {/* Progress Bar */}
                    <div className="flex items-center gap-2">
                        <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                            <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '70%' }}></div>
                        </div>
                        <span>70%</span>
                        {/* menu button */}
                        <div className="flex items-center">
                            <button className="cursor-pointer">
                                <Ellipsis />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default HorizontalTaskCard;