'use client'

import Link from 'next/link'
import { Menu } from 'lucide-react'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import Image from 'next/image'
import ThemeToggle from '@/components/shared/ThemeToggle'

const navLinks = [
  { title: 'about us', path: '/about' },
  { title: 'products', path: '/products' },
  { title: 'diagnastic', path: '/diagnastic' },
  { title: 'pharmacy', path: '/pharmacy' },
  { title: 'contact', path: '/contact' },
  { title: 'faq', path: '/faqs' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-wide">
          <Image
            className="cursor-pointer"
            src="/assets/logo.svg"
            alt="Logo"
            width={60}
            height={40}
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const active = pathname === link.path;

            return (
              <Link
                key={link.path}
                href={link.path}
                className={`transition-colors hover:text-primary uppercase ${
                  active
                    ? "font-semibold text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {link.title}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Button */}
        <div className="lg:flex items-center gap-4 hidden">
            <ThemeToggle />
            <div className="">
                <Button className={"cursor-pointer btn-bg text-white"}>
                  <Link href="/login">Login/Claim</Link>
                </Button>
            </div>
        </div>

        {/* Mobile Menu */}
        <div className='flex items-center gap-4 lg:hidden'>
          <ThemeToggle />
          <Sheet>
          <SheetTrigger className="flex items-center gap-4 lg:hidden">
            <Menu className="h-6 w-6" />
          </SheetTrigger>

          <SheetContent side="right" className="w-72 px-4">
            <div className="mt-10 flex flex-col gap-4">
              {navLinks.map((link) => {
                const active = pathname === link.path;

                return (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`rounded-md px-2 py-2 uppercase transition-colors hover:bg-muted ${
                      active ? "bg-primary text-primary-foreground" : ""
                    }`}
                  >
                    {link.title}
                  </Link>
                );
              })}

              <Button className="mt-5 w-full btn-bg">
                <Link href="/login">Login/Claim</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
        </div>
      </div>
    </header>
  );
}