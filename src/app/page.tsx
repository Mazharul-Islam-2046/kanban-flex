
import HorizontalTaskCard from "@/components/ui/HorizontalTaskCard";


export default function Home() {

  return (
    <div className="w-full justify-items-center min-h-screen p-8 gap-16 sm:p-8 font-[family-name:var(--font-geist-sans)] h-full">
        <div className="p-2 flex gap-4 justify-between items-stretch w-full h-full">
          <div className="flex flex-col gap-4 w-full">
            <HorizontalTaskCard/>
          </div>

        </div>


    </div>
  );
}
