import Link from "next/link";
import Sidebar, { navLinks } from "@/components/ui/sidebar";
import { HomeIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

export default function Budget() {
  return (
    <div className="h-screen flex ">
      <Sidebar links={navLinks} />
      <main className="flex-1 overflow-auto">
        <section className="flex flex-row items-center justify-between p-4 border-b">
          <div>
            <h1 className="text-2xl font-bold">Budgets</h1>
            <span>Plan for tomorrow</span>
          </div>
          <div>
            <Link href="/budgets/new" >
              <Button className="text-white cursor-pointer">+ New Budget</Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
