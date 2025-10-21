import { Ellipsis, ListTodo } from "lucide-react";
import { Card } from "./Card";
import Badge from "./Badge";


const HorizontalTaskCard = () => {
    return (
        <Card className="hover:shadow-lg hover:bg-[#1d1d1d] cursor-pointer transition-shadow duration-300 ease-in-out">
            <div className="flex flex-col items-start justify-between px-10 w-full gap-6">

                {/* Task Title */}
                <div className="flex flex-col gap-2 items-stretch w-full">
                    <div className="flex items-start justify-between w-full gap-8">
                        <div className="flex flex-col gap-1 w-full 2xl:grow">
                            <h2 className="text-2xl">Description of the task goes here.</h2>
                            <p className="text">Description of the task goes here. It should be concise ...</p>
                        </div>

                        {/* menu button */}
                        <div className="flex items-center">
                            <button className="cursor-pointer">
                                <Ellipsis />
                            </button>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full">
                        <div className="flex items-center gap-2 w-full">
                            <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                                <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '70%' }}></div>
                            </div>
                            <span>70%</span>

                        </div>
                    </div>
                </div>




                {/* Task Middle Part */}
                <div className="flex items-center gap-4 w-full">


                    {/* Task Badges */}
                    <div className="flex items-center gap-2">
                        <Badge>In Progress</Badge>
                    </div>

                    {/* Tasks Badge */}
                    <div className="flex items-center gap-3 rounded border border-gray-300 px-3 py-1">
                        <ListTodo size={14} />
                        <span className="text-sm font-medium">
                            8
                        </span>
                    </div>




                    {/* Days left */}
                    <div className="flex items-center gap-3 rounded border border-gray-300 px-3 py-1">
                        <span className="text-sm font-medium text-nowrap">
                            5 days left
                        </span>
                    </div>
                </div>



                {/* Task Right Part */}




            </div>
        </Card>
    );
};

export default HorizontalTaskCard;