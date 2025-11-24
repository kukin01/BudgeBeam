import Sidebar, { NavLink } from "@/components/ui/sidebar";
import { HomeIcon } from "@radix-ui/react-icons";

const links: NavLink[] = [
    {id: "home", label: "Home", href: "/dashboard", icon: <HomeIcon />},
    {id: "Budgets", label: "Budgets", href: "/budgets"},
    {id: "Incomes", label: "Income", href: "/income"},
]

export default function Budget() {
  return(
    <div>
      <Sidebar links={links}/>
      <main>
        <div>
          
        </div>  
      </main>
    </div>
  )
}