import { Card } from "./Card";


const Column = ({ children }: {children: React.ReactNode}) => {
    return (
        <div className="flex flex-col flex-grow-1 gap-4 w-full">
            <p className="text-2xl py-3 px-5 bg-card rounded-lg">Column Title</p>


            <Card className="w-full h-full p-4 flex flex-col flex-grow-1 gap-4 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
                {children}
            </Card>
        </div>
    );
};

export default Column;