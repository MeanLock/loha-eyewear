import {
  AudioLinesIcon,
  BotIcon,
  ChartNoAxesColumn,
  ChartNoAxesCombined,
  FrameIcon,
  GalleryVerticalEndIcon,
  Glasses,
  Layers2,
  LayoutDashboard,
  PieChartIcon,
  Receipt,
  ScanEye,
  TerminalIcon,
  TerminalSquareIcon,
  Truck,
  UsersRound,
  Warehouse,
} from "lucide-react";
import { User } from "@/types/auth.type";
import { NavGroup, NavSubMenuItem } from "./sidebar.types";

type NavBuildOptions = {
  productSubMenuItems: NavSubMenuItem[];
};

const buildAdminNavGroups = ({
  productSubMenuItems,
}: NavBuildOptions): NavGroup[] => [
  {
    title: "Dashboard",
    icon: PieChartIcon,
    items: [
      {
        title: "Tổng quan",
        url: "/dashboard/overview",
        icon: LayoutDashboard,
        isSubMenu: false,
      },
      {
        title: "Doanh thu & lợi nhuận",
        url: "/dashboard/revenue",
        icon: ChartNoAxesCombined,
        isSubMenu: false,
      },
      {
        title: "Xuất nhập hàng hóa",
        url: "/dashboard/inventory",
        icon: Truck,
        isSubMenu: false,
      },
      {
        title: "Hiệu suất nhân viên",
        url: "/dashboard/performance",
        icon: UsersRound,
        isSubMenu: false,
      },
    ],
  },
  {
    title: "Tài Nguyên",
    icon: BotIcon,
    items: [
      {
        title: "Loại sản phẩm",
        url: "/product-types",
        icon: Layers2,
        isSubMenu: false,
      },
      {
        title: "Kho hàng",
        url: "/shipments",
        icon: Warehouse,
        isSubMenu: false,
      },
      {
        title: "Sản phẩm",
        url: "#",
        icon: Glasses,
        isSubMenu: true,
        subMenuItems: productSubMenuItems,
      },
      {
        title: "Đơn Hàng",
        url: "#",
        icon: ScanEye,
        isSubMenu: true,
        subMenuItems: [
          {
            title: "Đơn kính thuốc",
            url: "/orders?orderTypeId=1",
          },
          {
            title: "Đơn bán lẻ",
            url: "/orders?orderTypeId=2",
          },
        ],
      },
    ],
  },
];

const managerNavGroups: NavGroup[] = [];
const staffNavGroups: NavGroup[] = [];

export const getNavGroupsByRole = (
  role: User["role"] | undefined,
  options: NavBuildOptions,
): NavGroup[] => {
  switch (role) {
    case "admin":
      return buildAdminNavGroups(options);
    case "manager":
      return managerNavGroups;
    case "staff":
      return staffNavGroups;
    default:
      return [];
  }
};
