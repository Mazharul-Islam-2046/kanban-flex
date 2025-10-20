"use client";

import * as React from "react";
import {
    AudioWaveform,
    Command,
    FileHeart,
    FolderKanban,
    Frame,
    GalleryVerticalEnd,
    Home,
    ListTodo,
    Map,
    PieChart,
    Plus,
    Settings2,

} from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import SidepanelHeader from "./SidepanelHeader";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// This is sample data.
const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    teams: [
        {
            name: "Acme Inc",
            logo: GalleryVerticalEnd,
            plan: "Enterprise",
        },
        {
            name: "Acme Corp.",
            logo: AudioWaveform,
            plan: "Startup",
        },
        {
            name: "Evil Corp.",
            logo: Command,
            plan: "Free",
        },
    ],
    navMain: [
        {
            title: "Home",
            url: "#",
            icon: Home,
            isActive: true,
            items: [
                {
                    title: "History",
                    url: "#",
                },
                {
                    title: "Starred",
                    url: "#",
                },
                {
                    title: "Settings",
                    url: "#",
                },
            ],
        },
        {
            title: "Projects",
            url: "#",
            icon: FolderKanban,
            items: [
                {
                    title: "Genesis",
                    url: "#",
                },
                {
                    title: "Explorer",
                    url: "#",
                },
                {
                    title: "Quantum",
                    url: "#",
                },
            ],
        },
        {
            title: "My Tasks",
            url: "#",
            icon: ListTodo,
            items: [
                {
                    title: "Introduction",
                    url: "#",
                },
                {
                    title: "Get Started",
                    url: "#",
                },
                {
                    title: "Tutorials",
                    url: "#",
                },
                {
                    title: "Changelog",
                    url: "#",
                },
            ],
        },
        {
            title: "Favorites",
            url: "#",
            icon: FileHeart,
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings2,
            items: [
                {
                    title: "General",
                    url: "#",
                },
                {
                    title: "Team",
                    url: "#",
                },
                {
                    title: "Billing",
                    url: "#",
                },
                {
                    title: "Limits",
                    url: "#",
                },
            ],
        },
    ],
    projects: [
        {
            name: "Design Engineering",
            url: "#",
            icon: Frame,
        },
        {
            name: "Sales & Marketing",
            url: "#",
            icon: PieChart,
        },
        {
            name: "Travel",
            url: "#",
            icon: Map,
        },
    ],
    favorites: [
        {
            name: "Design Engineering",
            url: "#",
            icon: Frame,
        },
        {
            name: "Sales & Marketing",
            url: "#",
            icon: PieChart,
        },
        {
            name: "Travel",
            url: "#",
            icon: Map,
        },
    ],
};

console.log(data);

export default function Sidepanel({
    ...props
}: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar {...props}>

            {/* Sidebar Header */}
            <SidepanelHeader />



            {/* Sidebar Content */}
            <div className="grow flex flex-col gap-4 overflow-auto group-data-[collapsible=icon]:overflow-hidden">

                <SidebarContent>
                    <SidebarGroup>

                        <SidebarMenu className="gap-3">
                            {data.navMain.map((item) => (
                                <SidebarMenuItem key={item.title} title={item.title}>
                                    <SidebarMenuButton>
                                        <item.icon />
                                        <span className="ml-2 text-xl">{item.title}</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroup>



                    {/* Favorites */}
                    <SidebarGroup>

                        <div className="p-2 mb-2 w-full">
                            <div className="h-0.5 w-full bg-[#ffffff20] mx-auto"></div>
                        </div>

                        <div className="flex flex-col gap-3">
                            {/* Sidebar Label */}
                            <div className="flex items-center justify-between">
                                <SidebarGroupLabel>Favorites</SidebarGroupLabel>
                                <span className="text-sm text-[#a9a9a9] px-2">See More</span>
                            </div>


                            {/* Sidebar Menu For Favorites */}
                            <SidebarMenu className="gap-3">
                                {data.favorites.map((favorite) => (
                                    <SidebarMenuItem key={favorite.name} title={favorite.name}>
                                        <SidebarMenuButton>
                                            <favorite.icon />
                                            <span className="ml-2 text-xl">{favorite.name}</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </div>
                    </SidebarGroup>

                    {/* Projects */}
                    <SidebarGroup>

                        <div className="p-2 mb-2 w-full">
                            <div className="h-0.5 w-full bg-[#ffffff20] mx-auto"></div>
                        </div>


                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <SidebarGroupLabel>Projects</SidebarGroupLabel>
                                <span className="text-sm text-[#a9a9a9]  pr-2">See More</span>
                            </div>
                            <SidebarMenu className="gap-3">
                                {data.projects.map((project) => (
                                    <SidebarMenuItem key={project.name} title={project.name}>
                                        <SidebarMenuButton>
                                            <project.icon />
                                            <span className="ml-2 text-xl">{project.name}</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </div>
                    </SidebarGroup>
                </SidebarContent>


            </div>
            {/* Sidebar Footer */}
            <div className="p-2">
                <SidebarFooter>
                    {/* <Button className="bg-dark-700 h-12 text-light-900 text-base hover:text-dark-500 group-data-[collapsible=icon]:h-6 group-data-[collapsible=icon]:w-6" variant={"default"}>
                        <span className="text-lg group-data-[collapsible=icon]:hidden">New Project</span>
                        <Plus />
                    </Button> */}

                    <Dialog>
                        <DialogTrigger className="cursor-pointer">
                            <div className="bg-dark-700 h-12 w-full text-light-900 text-base flex items-center justify-center gap-2 rounded-sm hover:bg-amber-50 hover:text-dark-500 group-data-[collapsible=icon]:h-6 group-data-[collapsible=icon]:w-6">
                                <span className="text-lg group-data-[collapsible=icon]:hidden">New Project</span>
                                <Plus size={16} />
                            </div>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>New Project</DialogTitle>
                                <DialogDescription>
                                    Create a new project from scratch.
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </SidebarFooter>
            </div>



        </Sidebar>
    );
}
