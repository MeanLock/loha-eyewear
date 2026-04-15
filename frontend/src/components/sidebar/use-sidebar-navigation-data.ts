"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { LogIn } from "lucide-react";
import { useAuthStore } from "@/store/use-auth-store";
import { ProductTypeService } from "@/services/product-types/product-type.service";
import { User } from "@/types/auth.type";
import { getNavGroupsByRole } from "./sidebar.config";
import { AppSidebarData, NavSubMenuItem } from "./sidebar.types";

const FALLBACK_USER: User = {
  id: "1",
  full_name: "Unknown User",
  email: "unknown@example.com",
  role: "customer",
};

export const useSidebarNavigationData = (): AppSidebarData => {
  const router = useRouter();
  const { user, hasHydrated } = useAuthStore();

  const { data: productTypes = [] } = useQuery({
    queryKey: ["product-types-basics", "sidebar"],
    queryFn: () => ProductTypeService.getAllProductTypesBasic(),
    enabled: hasHydrated && user?.role === "admin",
    staleTime: 5 * 60 * 1000,
  });

  const productSubMenuItems = React.useMemo<NavSubMenuItem[]>(() => {
    const fromApi = productTypes.map((productType) => ({
      title: productType.name,
      url: `/products?productTypeId=${encodeURIComponent(productType.id)}`,
    }));

    return [{ title: "Tất cả sản phẩm", url: "/products" }, ...fromApi];
  }, [productTypes]);

  const navGroups = React.useMemo(() => {
    if (!hasHydrated || !user) return [];

    return getNavGroupsByRole(user.role, { productSubMenuItems });
  }, [hasHydrated, productSubMenuItems, user]);

  return React.useMemo(
    () => ({
      user: user ?? FALLBACK_USER,
      quickActions: user
        ? []
        : [
            {
              name: "Login",
              icon: LogIn,
              onClick: () => router.push("/login"),
            },
          ],
      navGroups,
    }),
    [navGroups, router, user],
  );
};
