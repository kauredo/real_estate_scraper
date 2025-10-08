import { useState, ReactNode } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar onToggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />

      {/* Main content area with left margin for sidebar on desktop */}
      <main className="lg:ml-64 pt-16">
        <div className="container mx-auto px-4 py-6">
          {children}
        </div>
      </main>
    </div>
  );
}
