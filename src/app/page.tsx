import { Button } from "@nextui-org/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-full flex items-center px-5">
      <section className="gap-y-8">
        <h1 className="font-extrabold text-[50px]">Life is trip</h1>

        <h3 className="font-semibold text-teal-700 text-[30px]">
          Discover Next Adventure
        </h3>

        <div>
          <Link href={"/create-plan"}>
            <Button className="font-bold text-[15px]">Start</Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
