'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { 
  Plus, 
  Menu, 
  X,
  Layers,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import CreateBountyModal from './CreateBountyModal';

export default function Navbar() {
  const pathname = usePathname();
  const { role, setRole } = useApp();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'SAYEMBARA', href: '/' },
    { name: 'ARSIP KARYA', href: '/hall-of-fame' },
    { name: 'LEADERBOARD', href: '/leaderboard' },
  ];

  return (
    <>
      {/* Top Navbar: Full-Width Solid #0057FF with crisp 1px solid rgba(255,255,255,0.2) bottom border */}
      <header className="sticky top-0 z-40 w-full h-16 bg-[#0057FF] text-white shadow-md border-b border-white/20 select-none">
        <div className="max-w-7xl mx-auto h-full px-3 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Logo inside #060A13 box with thin white border + subtitle */}
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <Link href="/" className="flex items-center gap-2 group shrink-0">
              <div className="px-2.5 sm:px-3 py-1 sm:py-1.5 bg-[#060A13] border border-white text-white font-extrabold uppercase tracking-tight text-xs sm:text-base flex items-center gap-1.5 shadow-xs">
                <span className="w-2 h-2 bg-[#0057FF] inline-block shrink-0" />
                <span>KREASIHUB</span>
              </div>
            </Link>
            <span className="hidden md:inline-block text-[11px] font-bold uppercase tracking-wider text-white/90 border-l border-white/30 pl-3 truncate">
              SISTEM SAYEMBARA & INOVASI AGENSI
            </span>
          </div>

          {/* Right Navigation & Tools (Desktop) */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Desktop Navigation Links */}
            <nav className="flex items-center gap-1.5">
              {navLinks.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider transition-colors border ${
                      isActive
                        ? 'bg-white text-[#0057FF] border-white shadow-xs'
                        : 'bg-[#060A13] text-white border-white/80 hover:bg-white hover:text-[#0057FF]'
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Role Switcher (KARYAWAN | ADMIN) */}
            <div className="flex items-center bg-[#060A13] border border-white p-0.5 ml-2">
              <button
                onClick={() => setRole('employee')}
                className={`px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider transition-colors ${
                  role === 'employee'
                    ? 'bg-[#0057FF] text-white'
                    : 'text-[#8B95A5] hover:text-white'
                }`}
              >
                KARYAWAN
              </button>
              <button
                onClick={() => setRole('admin')}
                className={`px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider transition-colors ${
                  role === 'admin'
                    ? 'bg-[#0057FF] text-white'
                    : 'text-[#8B95A5] hover:text-white'
                }`}
              >
                ADMIN
              </button>
            </div>

            {/* + Buat Sayembara Button */}
            {role === 'admin' ? (
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="ml-2 inline-flex items-center gap-1 px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider bg-[#060A13] text-white border-2 border-white hover:bg-white hover:text-[#0057FF] transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ BUAT SAYEMBARA</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setRole('admin');
                  setIsCreateModalOpen(true);
                }}
                className="ml-2 inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider bg-[#060A13]/60 text-white/80 border border-white/40 hover:bg-[#060A13] hover:text-white transition-colors"
              >
                <span>+ SAYEMBARA (ADMIN)</span>
              </button>
            )}
          </div>

          {/* Mobile Navigation Controls */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Mobile Role Switcher (Optimized touch target) */}
            <div className="flex items-center bg-[#060A13] border border-white p-0.5">
              <button
                onClick={() => setRole('employee')}
                className={`px-2.5 py-1 text-[11px] font-bold uppercase transition-colors ${
                  role === 'employee' ? 'bg-[#0057FF] text-white' : 'text-[#8B95A5]'
                }`}
              >
                TALENT
              </button>
              <button
                onClick={() => setRole('admin')}
                className={`px-2.5 py-1 text-[11px] font-bold uppercase transition-colors ${
                  role === 'admin' ? 'bg-[#0057FF] text-white' : 'text-[#8B95A5]'
                }`}
              >
                ADMIN
              </button>
            </div>

            {/* Hamburger Button (44px touch target) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Buka menu navigasi"
              className="w-9 h-9 bg-[#060A13] border border-white flex items-center justify-center text-white active:bg-white active:text-[#0057FF] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b-2 border-white bg-[#060A13] p-4 space-y-2 shadow-2xl animate-in slide-in-from-top-2 duration-150">
            <div className="text-[10px] font-black uppercase tracking-wider text-[#8B95A5] mb-1">
              NAVIGASI UTAMA
            </div>
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider border transition-colors ${
                  pathname === item.href
                    ? 'bg-[#0057FF] text-white border-white'
                    : 'bg-[#0B0F17] text-white border-[#232D3F] active:border-[#0057FF]'
                }`}
              >
                <span>{item.name}</span>
                <span className="text-[10px] text-white/60">→</span>
              </Link>
            ))}

            {/* Admin Action in Mobile Menu */}
            {role === 'admin' && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsCreateModalOpen(true);
                }}
                className="w-full mt-3 py-3 px-3.5 text-xs font-black uppercase tracking-wider bg-[#0057FF] text-white border-2 border-white flex items-center justify-center gap-2 shadow-md active:bg-blue-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>+ BUAT SAYEMBARA BARU</span>
              </button>
            )}
          </div>
        )}
      </header>

      {/* Create Bounty Modal */}
      <CreateBountyModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </>
  );
}
