import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { DashboardBreadcrumb } from "@/components/dashboard-breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="min-w-0 overflow-x-hidden bg-card">
                <header className="flex h-16 shrink-0 items-center justify-between border-b px-6 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-16">
                    <div className="flex items-center gap-2">
                        <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-foreground" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <DashboardBreadcrumb />
                    </div>
                </header>

                <main className="min-w-0 w-full max-w-full overflow-x-hidden flex flex-1 flex-col gap-4 p-4 md:p-8 bg-card rounded-b-xl shadow-sm">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}
