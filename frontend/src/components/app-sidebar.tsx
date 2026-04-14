// "use client";
// import {
//   Home,
//   Package,
//   ShoppingCart,
//   Settings,
//   ChevronsUpDown,
//   LogOut,
//   Package2,
//   Printer,
// } from "lucide-react";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarHeader,
//   SidebarFooter,
// } from "@/components/ui/sidebar";
// import Link from "next/link";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useAuthStore } from "@/store/use-auth-store";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { title } from "process";

// type MenuItem = {
//   title: string;
//   url: string;
//   icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
//   isSubMenu?: boolean;
//   subItems?: MenuItem[];
// };

// const items: MenuItem[] = [
//   {
//     title: "Thống Kê",
//     url: "/",
//     icon: Home,
//   },
//   {
//     title: "Sản Phẩm",
//     url: "/products",
//     icon: Package,
//   },
//   {
//     title: "Loại Sản Phẩm",
//     url: "/product-types",
//     icon: Package2,
//   },
//   {
//     title: "Đơn Hàng",
//     url: "/orders",
//     icon: ShoppingCart,
//   },
//   {
//     title: "In Ấn",
//     url: "/printing",
//     icon: Printer,
//     isSubMenu: true,
//     subItems: [
//       {
//         title: "In Tem Giá",
//         url: "/printing/price-tags",
//         icon: Printer,
//       },
//     ],
//   },
// ];

// export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
//   const { user, logout } = useAuthStore();
//   const router = useRouter();

//   const handleLogout = () => {
//     logout();
//     router.push("/login");
//   };

//   const initials = user?.full_name?.substring(0, 2).toUpperCase() || "AD";

//   return (
//     <Sidebar variant="inset" {...props}>
//       <SidebarHeader className="p-4">
//         <Link href="/" className="flex items-center gap-2 font-semibold">
//           <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
//             <Image
//               src="/logo.svg"
//               alt="Logo"
//               width={20}
//               height={20}
//               className="rounded-lg"
//             />
//           </div>
//           <span className="text-md font-semibold text-black tracking-tight">
//             Loha Eyewear
//           </span>
//         </Link>
//       </SidebarHeader>
//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarGroupLabel>Menu</SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu className="space-y-1">
//               {items.map((item) =>
//                 item.isSubMenu ? (
//                   <SidebarMenuItem key={item.title}>
//                     <SidebarMenuButton
//                       tooltip={item.title}
//                       render={<Link href={item.url} />}
//                       className="hover:bg-accent hover:text-accent-foreground font-medium transition-colors"
//                     >
//                       <item.icon className="h-4 w-4" />
//                       <span>{item.title}</span>
//                     </SidebarMenuButton>
//                   </SidebarMenuItem>
//                 ) : (
//                   <SidebarMenuItem key={item.title}>
//                     <SidebarMenuButton
//                       tooltip={item.title}
//                       render={<Link href={item.url} />}
//                       className="hover:bg-accent hover:text-accent-foreground font-medium transition-colors"
//                     >
//                       <item.icon className="h-4 w-4" />
//                       <span>{item.title}</span>
//                     </SidebarMenuButton>
//                   </SidebarMenuItem>
//                 ),
//               )}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//       <SidebarFooter className="p-4">
//         <SidebarMenu>
//           <SidebarMenuItem>
//             {user ? (
//               <DropdownMenu>
//                 <DropdownMenuTrigger
//                   render={
//                     <SidebarMenuButton
//                       size="lg"
//                       className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
//                     />
//                   }
//                 >
//                   <Avatar className="h-8 w-8 rounded-lg">
//                     <AvatarImage src="" alt={user.full_name} />
//                     <AvatarFallback className="rounded-lg">
//                       {initials}
//                     </AvatarFallback>
//                   </Avatar>
//                   <div className="grid flex-1 text-left text-sm leading-tight">
//                     <span className="truncate font-semibold">
//                       {user.full_name}
//                     </span>
//                     <span className="truncate text-xs">{user.email}</span>
//                   </div>
//                   <ChevronsUpDown className="ml-auto size-4" />
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent
//                   className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
//                   side="bottom"
//                   align="end"
//                   sideOffset={4}
//                 >
//                   <DropdownMenuGroup>
//                     <DropdownMenuLabel className="p-0 font-normal">
//                       <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
//                         <Avatar className="h-8 w-8 rounded-lg">
//                           <AvatarImage src="" alt={user.full_name} />
//                           <AvatarFallback className="rounded-lg">
//                             {initials}
//                           </AvatarFallback>
//                         </Avatar>
//                         <div className="grid flex-1 text-left text-sm leading-tight">
//                           <span className="truncate font-semibold">
//                             {user.full_name}
//                           </span>
//                           <span className="truncate text-xs">{user.email}</span>
//                         </div>
//                       </div>
//                     </DropdownMenuLabel>
//                   </DropdownMenuGroup>
//                   <DropdownMenuSeparator />
//                   <DropdownMenuGroup>
//                     <DropdownMenuItem>
//                       <Settings className="mr-2 h-4 w-4" />
//                       <span>Cài Đặt</span>
//                     </DropdownMenuItem>
//                   </DropdownMenuGroup>
//                   <DropdownMenuSeparator />
//                   <DropdownMenuItem onClick={handleLogout}>
//                     <LogOut className="mr-2 h-4 w-4" />
//                     <span>Đăng xuất</span>
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             ) : (
//               <SidebarMenuButton tooltip="Cài Đặt" className="font-medium">
//                 <Settings className="h-4 w-4" />
//                 <span>Cài Đặt</span>
//               </SidebarMenuButton>
//             )}
//           </SidebarMenuItem>
//         </SidebarMenu>
//       </SidebarFooter>
//     </Sidebar>
//   );
// }

"use client";

import {
  Home,
  Package,
  ShoppingCart,
  Settings,
  ChevronsUpDown,
  LogOut,
  Package2,
  Printer,
  ChevronRight,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/use-auth-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

type MenuItem = {
  title: string;
  url: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  isSubMenu?: boolean;
  subItems?: MenuItem[];
};

const items: MenuItem[] = [
  { title: "Thống Kê", url: "/", icon: Home },
  { title: "Sản Phẩm", url: "/products", icon: Package },
  { title: "Loại Sản Phẩm", url: "/product-types", icon: Package2 },
  { title: "Đơn Hàng", url: "/orders", icon: ShoppingCart },
  {
    title: "In Ấn",
    url: "#",
    icon: Printer,
    isSubMenu: true,
    subItems: [
      { title: "In Tem Giá", url: "/printing/price-tags", icon: Printer },
    ],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const initials = user?.full_name?.substring(0, 2).toUpperCase() || "AD";

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader className="p-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={20}
              height={20}
              className="rounded-lg"
            />
          </div>
          <span className="text-md font-semibold text-black tracking-tight">
            Loha Eyewear
          </span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {items.map((item) => (
                /* Sử dụng div hoặc Fragment để tránh lỗi nesting ban đầu */
                <React.Fragment key={item.title}>
                  {item.isSubMenu ? (
                    /* 1. Collapsible bọc ngoài cùng, không bọc trong SidebarMenuItem nữa */
                    <Collapsible asChild className="group/collapsible">
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          {/* Lưu ý: Bỏ prop tooltip ở đây để tránh lỗi button lồng button */}
                          <SidebarMenuButton>
                            <item.icon className="h-4 w-4" />
                            <span>{item.title}</span>
                            <ChevronRight className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.subItems?.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <SidebarMenuSubButton
                                  render={<Link href={subItem.url} />}
                                >
                                  <span>{subItem.title}</span>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  ) : (
                    /* 2. Mục đơn lẻ thì giữ nguyên cấu trúc chuẩn */
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        tooltip={item.title}
                        render={<Link href={item.url} />}
                        className="hover:bg-accent hover:text-accent-foreground font-medium transition-colors"
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                </React.Fragment>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            {user ? (
              <DropdownMenu>
                {/* DropdownMenu của Radix vẫn dùng asChild bình thường */}
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton size="lg">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src="" alt={user.full_name} />
                      <AvatarFallback className="rounded-lg">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {user.full_name}
                      </span>
                      <span className="truncate text-xs">{user.email}</span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" side="bottom" align="end">
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Đăng xuất</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <SidebarMenuButton tooltip="Cài Đặt">
                <Settings className="h-4 w-4" />
                <span>Cài Đặt</span>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
