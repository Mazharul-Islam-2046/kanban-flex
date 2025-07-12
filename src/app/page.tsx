import Column from "@/components/ui/Column";
import { SidebarTrigger } from "@/components/ui/sidebar";
import TaskCard from "@/components/ui/TaskCard";
import ThemeButton from "@/components/ui/ThemeButton";


export default function Home() {

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center w-full justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-8 font-[family-name:var(--font-geist-sans)]">
      <main>

      </main>
      <div className="p-2 flex gap-4 justify-between items-stretch w-full h-full">
        <Column>
          {/* Tasks Card */}
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

        <Column>
          {/* Tasks Card */}
          <TaskCard />
        </Column>
      </div>
      <ThemeButton />
      <SidebarTrigger />
    </div>
  );
}
