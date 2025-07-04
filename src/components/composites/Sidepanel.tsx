"use client"

import * as React from "react"
import {
    AudioWaveform,
    Command,
    FolderKanban,
    Frame,
    GalleryVerticalEnd,
    Home,
    LayoutDashboardIcon,
    ListTodo,
    Map,
    PieChart,
    Settings2,
} from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"

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
}

console.log(data);

export default function Sidepanel({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <div></div>
            </SidebarHeader>
            <SidebarContent>
                <div>
                    <SidebarMenu>
                        <SidebarMenuItem className="flex items-center justify-center">
                            <SidebarMenuButton className="flex items-center">
                                <LayoutDashboardIcon />
                                <span className="text-2xl">KanbanFlex</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <div className="h-0.5 w-4/5 bg-[#ffffff20] mx-auto"></div>
                    </SidebarMenu>
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarMenu className="gap-3">
                                {data.navMain.map((item) => (
                                    <SidebarMenuItem
                                        key={item.title}
                                        title={item.title}
                                    >
                                        <SidebarMenuButton>
                                            <item.icon className="" />
                                            <span className="ml-2 text-xl">{item.title}</span>
                                        </SidebarMenuButton>

                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroup>
                    </SidebarContent>

                    <SidebarFooter>

                    </SidebarFooter>
                </div>
            </SidebarContent>
            <SidebarFooter>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}