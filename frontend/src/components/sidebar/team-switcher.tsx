"use client";

import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ChevronsUpDownIcon } from "lucide-react";
import { User } from "@/types/auth.type";
import { QuickAction } from "./sidebar.types";

export function TeamSwitcher({
  quickActions,
  user,
}: {
  quickActions: QuickAction[];
  user: User | null;
}) {
  const { isMobile } = useSidebar();

  // Zustand is used here to manage the active team state. In a real application, you might want to lift this state up to a context provider or use a global state management solution if multiple components need to access the active team information.
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size="lg"
                className="data-open:bg-sidebar-accent data-open:text-sidebar-accent-foreground"
              />
            }
          >
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              {/* {activeTeam.logo} */}
              <img
                src="/logo.svg"
                alt="Avatar"
                className="h-6 w-6 rounded-sm"
              />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">Loha Management</span>
              <span className="truncate text-xs">
                {user?.role || "Unknown Role"}
              </span>
            </div>
            <ChevronsUpDownIcon className="ml-auto" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Truy Cập Nhanh
              </DropdownMenuLabel>
              {quickActions.map((a, index) => (
                <DropdownMenuItem
                  key={index}
                  onClick={a.onClick}
                  className="gap-2 p-2"
                >
                  <div className="flex size-6 items-center justify-center rounded-md border">
                    <a.icon className="size-3.5 shrink-0" />
                  </div>
                  {a.name}
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
