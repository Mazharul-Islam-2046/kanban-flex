"use client";
import { usePathname } from "next/navigation";
import { SidebarTrigger } from "../ui/sidebar";
import ThemeButton from "../ui/ThemeButton";
import { Bell } from "lucide-react";
import AccountAvatarMenu from "../ui/AccountAvatarMenu";


const Navbar = () => {


    const pathname = usePathname();

    



    return (
        <div className="flex items-center justify-between gap-2 px-10 pt-8">

            {/* Top Bar Left Part */}
            <div className="flex items-center gap-2">
                <SidebarTrigger />
                <p className="text-3xl font-bold">{`Welcome to the ${pathname === "/" ? "Dashboard" : pathname}`}</p>
            </div>


            {/* Top Bar Right Part */}
            <div className="flex items-center gap-6">
                <Bell className="cursor-pointer"/>
                <ThemeButton />
                <AccountAvatarMenu />
            </div>
        </div>
    );
};

export default Navbar;