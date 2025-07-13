import Column from "@/components/ui/Column";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import TaskCard from "@/components/ui/TaskCard";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";

const page = () => {
    return (
        <div className="w-full justify-items-center min-h-screen p-8 gap-16 sm:p-8 font-[family-name:var(--font-geist-sans)] h-full">
            <div className="p-2 flex gap-4 justify-between items-stretch w-full h-full">
                <Column>
                    {/* Tasks Card */}
                    <TaskCard />
                    <TaskCard />
                    <TaskCard />
                </Column>

                <Column>
                    {/* Tasks Card */}
                    <TaskCard />
                </Column>

                <Column>
                    {/* Tasks Card */}
                    <TaskCard />
                </Column>

                <div className="flex flex-col gap-4 w-full">
                    <Dialog>
                        <DialogTrigger>
                            <div className="flex items-center justify-center gap-2 text-2xl py-3 px-5 bg-card rounded-lg text-center cursor-pointer hover:bg-">
                                <span>Add New Column</span>
                                <Plus />
                            </div>
                        </DialogTrigger>

                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-semibold">New Column</DialogTitle>
                            </DialogHeader>
                            {/* Add form or input for new column here */}
                        </DialogContent>
                    </Dialog>
                </div>

            </div>


        </div>
    );
};

export default page;