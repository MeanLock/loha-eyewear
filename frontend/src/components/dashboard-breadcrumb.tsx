"use client"

import { usePathname, useParams } from "next/navigation"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import React from "react"

export const routeMap: Record<string, string> = {
    "/": "Tổng quan",
    "/products": "Sản phẩm",
    "/products/create": "Thêm mới",
    "/product-types": "Loại sản phẩm",
    "/product-types/create": "Thêm mới",
};

export function DashboardBreadcrumb() {
    const pathname = usePathname()
    const params = useParams()
    const paths = pathname === "/" ? [] : pathname.split("/").filter(Boolean);

    // Thu thập tất cả các giá trị của dynamic route (params)
    const paramValues = Object.values(params || {});

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                    {paths.length === 0 ? (
                        <BreadcrumbPage className="font-medium">Dashboard</BreadcrumbPage>
                    ) : (
                        <BreadcrumbLink href="/" className="text-muted-foreground hover:text-foreground">
                            Dashboard
                        </BreadcrumbLink>
                    )}
                </BreadcrumbItem>

                {paths.length > 0 && <BreadcrumbSeparator className="hidden md:block" />}

                {paths.map((path, index) => {
                    const href = `/${paths.slice(0, index + 1).join("/")}`;
                    const isLast = index === paths.length - 1;

                    let title = routeMap[href];

                    if (!title) {
                        // Nếu segment hiện tại là một ID dạng params nhận từ URL (như chi tiết một sản phẩm)
                        if (paramValues.includes(path)) {
                            // Rút gọn ID nếu nó quá dài (VD: UUID)
                            title = path.length > 10 ? `${path.slice(0, 8)}...` : path;
                            // Hoặc bạn có thể gán cứng nó là: title = "Chi tiết"
                        } else {
                            title = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
                        }
                    }

                    return (
                        <React.Fragment key={href}>
                            {index > 0 && <BreadcrumbSeparator className="hidden md:block" />}
                            <BreadcrumbItem>
                                {isLast ? (
                                    <BreadcrumbPage className="font-medium">{title}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink href={href} className="hidden md:block text-muted-foreground hover:text-foreground">
                                        {title}
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                        </React.Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}
