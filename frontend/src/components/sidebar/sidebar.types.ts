import * as React from "react";
import { User } from "@/types/auth.type";

export type QuickAction = {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick: () => void;
};

export type NavSubMenuItem = {
  title: string;
  url: string;
};

export type NavItem = {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  isSubMenu: boolean;
  subMenuItems?: NavSubMenuItem[];
};

export type NavGroup = {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  items: NavItem[];
};

export type AppSidebarData = {
  user: User;
  quickActions: QuickAction[];
  navGroups: NavGroup[];
};
