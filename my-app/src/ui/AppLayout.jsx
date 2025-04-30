import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import { useState } from 'react';

export default function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
  <div className="min-h-screen bg-[var(--color-bg)]">
  {/* Mobile Sidebar Overlay */}
  <div
    className={`fixed inset-0 z-40 bg-black/50 transition-opacity md:hidden ${
      isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
    }`}
    onClick={() => setIsSidebarOpen(false)}
  />

  {/* Mobile Sidebar */}
  <div
    className={`fixed left-0 top-0 z-50 h-screen w-64 transform border-r border-[var(--color-border)] bg-[var(--color-bg)] transition-transform duration-300 md:hidden ${
      isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
    }`}
  >
    <Sidebar onClose={() => setIsSidebarOpen(false)} />
  </div>

  {/* Desktop Sidebar */}
  <div className="hidden border-r border-[var(--color-border)] md:fixed md:inset-y-0 md:left-0 md:block md:w-64">
    <Sidebar />
  </div>

  {/* Main Content */}
  <div className="md:pl-64">
    <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
    <main className="p-5">
      <div className="mx-auto max-w-7xl">
        <Outlet />
      </div>
    </main>
  </div>
</div>
);
}
