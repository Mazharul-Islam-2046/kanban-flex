import { Card } from "./Card";


const Column = ({ children }: {children: React.ReactNode}) => {
    return (
        <div className="flex flex-col flex-grow-1 gap-4 w-full">
            <p className="text-2xl py-3 px-5 bg-dark-500 rounded-lg">Column Title</p>


            <Card className="w-full p-4 flex flex-col flex-grow-1 gap-4">
                {children}
            </Card>
        </div>
    );
};

export default Column;