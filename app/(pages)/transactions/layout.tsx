import Sidebar from "@/app/components/(sidebar)/Sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full w-full flex">
      <Sidebar />
      <main className="h-full w-[90vw]">{children}</main>
    </div>
  );
}
