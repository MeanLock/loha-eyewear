export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <p className="text-muted-foreground mt-2">Tổng quan về cửa hàng của bạn.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                        <h3 className="font-semibold text-sm tracking-tight text-muted-foreground">Chỉ số {i + 1}</h3>
                        <p className="text-2xl font-bold mt-2">---</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
