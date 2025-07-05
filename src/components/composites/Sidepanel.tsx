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
    LayoutDashboardIcon,
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
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "../ui/Button";

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
            title: "favorites",
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
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem className="flex items-center justify-center py-3">
                        <SidebarMenuButton className="flex items-center">
                            <LayoutDashboardIcon />
                            <span className="text-2xl">KanbanFlex</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <div className="p-2 mt-2">
                        <div className="h-0.5 w-full bg-[#ffffff20] mx-auto"></div>
                    </div>
                </SidebarMenu>
            </SidebarHeader>



            {/* Sidebar Content */}
            <div  className="grow">
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
                        <div className="flex flex-col gap-3">
                            {/* Sidebar Label */}
                            <div className="flex items-center justify-between">
                                <SidebarGroupLabel>Favorites</SidebarGroupLabel>
                                <span className="text-sm text-[#a9a9a9]">See More</span>
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
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <SidebarGroupLabel>Projects</SidebarGroupLabel>
                                <span className="text-sm text-[#a9a9a9]">See More</span>
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
                    <Button className="bg-dark-700 h-12 text-light-900 text-base hover:text-dark-500" variant={"default"}>
                        Add New Project
                        <Plus/>
                    </Button>
                </SidebarFooter>
            </div>



        </Sidebar>
    );
}
