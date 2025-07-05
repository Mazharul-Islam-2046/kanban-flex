import { SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { LayoutDashboardIcon } from 'lucide-react';
import React from 'react';

const SidepanelHeader = () => {
    return (
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
    );
};

export default SidepanelHeader;