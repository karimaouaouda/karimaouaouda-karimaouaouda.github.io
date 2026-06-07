"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Code2, Contact, Menu, X } from "lucide-react";
import { useState } from "react";
import { IconButton } from "@/components/ui/IconButton";
import { navItems, profile } from "@/lib/portfolio-data";

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const MobileMenuIcon = isOpen ? X : Menu;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/12 bg-[#0b1018]/78 shadow-[0_18px_60px_rgba(0,0,0,0.22)] backdrop-blur-2xl">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3" onClick={() => setIsOpen(false)}>
          <span className="grid size-10 place-items-center rounded-md bg-[linear-gradient(135deg,#20c997,#facc6b)] font-mono text-sm font-black text-[#07130f] shadow-[0_0_38px_rgba(32,201,151,0.36)]">
            KA
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block text-sm font-semibold text-white">{profile.name}</span>
            <span className="block text-xs text-white/58">Laravel, mobile, secure systems</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 rounded-md border border-white/10 bg-white/7 p-1 shadow-inner shadow-white/5 md:flex">
          {navItems.map((item) => {
            const active = item.href === "/" ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded px-4 py-2 text-sm font-medium transition ${
                  active ? "bg-white text-[#111827] shadow-[0_10px_30px_rgba(255,255,255,0.12)]" : "text-white/72 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <IconButton
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            label="GitHub"
            icon={Code2}
          />
          <IconButton
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            label="LinkedIn"
            icon={Contact}
            accent="amber"
          />
        </div>

        <IconButton
          label="Toggle navigation"
          icon={MobileMenuIcon}
          variant="mobile"
          onClick={() => setIsOpen((value) => !value)}
        />
      </nav>

      {isOpen ? (
        <div className="border-t border-white/10 bg-[#0b1018] px-4 py-3 md:hidden">
          <div className="grid gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-3 text-sm font-medium text-white/82 hover:bg-white/8"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
