import React from 'react'
import Logo from './Logo';
import Menus from './Menus';
import { MdClose } from 'react-icons/md';






export default function Sidebar({ onClose }) {
  return (
    <aside className="flex h-full flex-col gap-8 bg-[var(--color-bg)] px-6 py-8 text-[var(--color-text)] transition-colors duration-300">
      <div className="flex items-center justify-between">
        <Logo />
        {/* Mobile button */}
        <button
          onClick={onClose}
          className="rounded-lg p-2 hover:bg-[var(--color-border)] md:hidden"
        >
          <MdClose className="h-6 w-6 text-[var(--color-text)]" />
        </button>
      </div>
      <Menus />
    </aside>






  );
}