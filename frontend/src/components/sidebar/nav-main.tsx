"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavGroup } from "./sidebar.types";

export function NavMain({ navGroups }: { navGroups: NavGroup[] }) {
  const pathname = usePathname();
  const isActivePath = (url: string) =>
    url !== "#" && (pathname === url || pathname.startsWith(`${url}/`));

  return (
    <>
      {navGroups.map((g) => (
        <SidebarGroup key={g.title}>
          <SidebarGroupLabel>{g.title}</SidebarGroupLabel>
          <SidebarMenu>
            {g.items.map((item) => {
              // Gán icon vào biến viết hoa để render dạng component <Icon />
              const Icon = item.icon as React.ElementType;

              return item.isSubMenu ? (
                <Collapsible
                  key={item.title}
                  className="group/collapsible"
                  render={<SidebarMenuItem />}
                >
                  <CollapsibleTrigger
                    render={<SidebarMenuButton tooltip={item.title} />}
                  >
                    {Icon && <Icon className="size-4 shrink-0" />}
                    <span>{item.title}</span>
                    <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.subMenuItems?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            isActive={isActivePath(subItem.url)}
                            render={<Link href={subItem.url} />}
                          >
                            <span>{subItem.title}</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={isActivePath(item.url)}
                    tooltip={item.title}
                    render={<Link href={item.url} />}
                  >
                    {Icon && <Icon className="size-4 shrink-0" />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}
