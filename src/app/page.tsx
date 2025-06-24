import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import ThemeButton from "@/components/ui/ThemeButton";


export default function Home() {

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main>
        <h1 className="text-4xl">Hello World!!!!</h1>
      </main>
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardAction>Card Action</CardAction>
        </CardHeader>
        <CardContent>
          <CardDescription>Card Description</CardDescription>
        </CardContent>
        <CardFooter>Card Footer</CardFooter>
      </Card>
      <ThemeButton/>
    </div>
  );
}
