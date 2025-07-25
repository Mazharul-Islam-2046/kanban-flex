
import HorizontalTaskCard from "@/components/ui/HorizontalTaskCard";


export default function Home() {

  return (
    <div className="w-full justify-items-center 2xl:max-h-[calc(100vh-100px)] p-8 gap-16 sm:p-8 font-[family-name:var(--font-geist-sans)] h-full">
      <div className="p-2 flex gap-4 justify-between items-stretch w-full h-full">
        <div className="flex flex-col gap-8 w-full h-full 2xl:pb-16">
          <h2 className="text-2xl font-semibold">All Your Projects</h2>
          <div className="flex flex-col 2xl:grid 2xl:grid-cols-2 gap-8 w-full h-full">


            {/* Upcoming Task Cards */}
            <div className="flex flex-col gap-6 py-6 px-8 bg-dark-700 rounded-xl shadow-md outline outline-gray-700 2xl:overflow-y-scroll custom-scrollbar">
              <h3 className="text-xl font-semibold">Upcoming</h3>
              <HorizontalTaskCard />
            </div>



            {/* Todo Task Cards */}
            <div className="flex flex-col gap-6 py-6 px-8 bg-dark-700 rounded-xl shadow-md outline outline-gray-700 overflow-y-scroll custom-scrollbar">
              <h3 className="text-xl font-semibold">Todo</h3>
              <HorizontalTaskCard />
              <HorizontalTaskCard />
              <HorizontalTaskCard />
            </div>



            {/* In Progress Task Cards */}
            <div className="flex flex-col gap-6 py-6 px-8 bg-dark-700 rounded-xl shadow-md outline outline-gray-700 overflow-y-scroll custom-scrollbar">
              <h3 className="text-xl font-semibold">In Progress</h3>
              <HorizontalTaskCard />
              <HorizontalTaskCard />
            </div>


            {/* Completed Task Cards */}
            <div className="flex flex-col gap-6 py-6 px-8 bg-dark-700 rounded-xl shadow-md outline outline-gray-700 overflow-y-scroll custom-scrollbar">
              <h3 className="text-xl font-semibold">Completed</h3>
              <HorizontalTaskCard />
              <HorizontalTaskCard />
              <HorizontalTaskCard />
            </div>
          </div>
        </div>

      </div>


    </div>
  );
}
