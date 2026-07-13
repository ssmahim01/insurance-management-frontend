// 'use client'

// import Link from 'next/link'
// import { Menu } from 'lucide-react'
// import { usePathname, useRouter } from 'next/navigation'

// import { Button } from '@/components/ui/button'
// import {
//   Sheet,
//   SheetContent,
//   SheetTrigger,
// } from '@/components/ui/sheet'
// import Image from 'next/image'
// import ThemeToggle from '@/components/shared/ThemeToggle'
// import { useUser } from '@/context/UserContext'
// import { toast } from 'sonner'

// const navLinks = [
//   { title: 'about us', path: '/about' },
//   { title: 'products', path: '/products' },
//   { title: 'diagnastic', path: '/diagnastic' },
//   { title: 'pharmacy', path: '/pharmacy' },
//   { title: 'contact', path: '/contact' },
//   { title: 'faq', path: '/faqs' },
// ]

// export default function Navbar() {
//   const pathname = usePathname()
//   const { user, logout } = useUser();
//   const router = useRouter();

//   const handleLogout = async () => {
//     try {
//       logout();
//       toast.success("Logged out successfully");
//       router.push("/login");
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (err:any) {
//       toast.error("Failed to logout");
//     }
//   };

//   return (
//     <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur">
//       <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
//         {/* Logo */}
//         <Link href="/" className="text-xl font-bold tracking-wide">
//           <Image
//             className="cursor-pointer"
//             src="/assets/logo.svg"
//             alt="Logo"
//             width={60}
//             height={40}
//           />
//         </Link>

//         {/* Desktop Menu */}
//         <nav className="hidden items-center gap-8 lg:flex">
//           {navLinks.map((link) => {
//             const active = pathname === link.path;

//             return (
//               <Link
//                 key={link.path}
//                 href={link.path}
//                 className={`transition-colors hover:text-primary uppercase ${
//                   active
//                     ? "font-semibold text-primary"
//                     : "text-muted-foreground"
//                 }`}
//               >
//                 {link.title}
//               </Link>
//             );
//           })}
//         </nav>

//         {/* Desktop Button */}
//         <div className="lg:flex items-center gap-4 hidden">
//             <ThemeToggle />
//             <div className="">
//                 <Button className={"cursor-pointer btn-bg text-white"}>
//                   <Link href="/login">Login/Claim</Link>
//                 </Button>
//             </div>
//         </div>

//         {/* Mobile Menu */}
//         <div className='flex items-center gap-4 lg:hidden'>
//           <ThemeToggle />
//           <Sheet>
//           <SheetTrigger className="flex items-center gap-4 lg:hidden">
//             <Menu className="h-6 w-6" />
//           </SheetTrigger>

//           <SheetContent side="right" className="w-72 px-4">
//             <div className="mt-10 flex flex-col gap-4">
//               {navLinks.map((link) => {
//                 const active = pathname === link.path;

//                 return (
//                   <Link
//                     key={link.path}
//                     href={link.path}
//                     className={`rounded-md px-2 py-2 uppercase transition-colors hover:bg-muted ${
//                       active ? "bg-primary text-primary-foreground" : ""
//                     }`}
//                   >
//                     {link.title}
//                   </Link>
//                 );
//               })}

//               <Button className="mt-5 w-full btn-bg">
//                 <Link href="/login">Login/Claim</Link>
//               </Button>
//             </div>
//           </SheetContent>
//         </Sheet>
//         </div>
//       </div>
//     </header>
//   );
// }

'use client'

import Link from 'next/link'
import { Menu, User, LayoutDashboard, LogOut } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import Image from 'next/image'
import ThemeToggle from '@/components/shared/ThemeToggle'
import { useUser } from '@/context/UserContext'
import { toast } from 'sonner'
import { getDashboardPath } from '@/components/shared/DashboardPath'

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
  const { user, logout } = useUser();
  const router = useRouter();
  console.log(user)
  const dashboardPath = getDashboardPath(user?.role)

  const handleLogout = async () => {
    try {
      logout();
      toast.success("Logged out successfully");
      router.push("/login");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Failed to logout");
    }
  };

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
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <button
                    aria-label="Profile menu"
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full btn-bg text-white"
                  >
                    <User className="h-5 w-5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>
                    <Link href={dashboardPath} className="flex cursor-pointer items-center gap-2">
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex cursor-pointer items-center gap-2 text-red-500 focus:text-red-500"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="">
                  <Button className={"cursor-pointer btn-bg text-white"}>
                    <Link href="/login">Login/Claim</Link>
                  </Button>
              </div>
            )}
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

              {user ? (
                <>
                  <Link
                    href={dashboardPath}
                    className="flex items-center gap-2 rounded-md px-2 py-2 uppercase transition-colors hover:bg-muted"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>
                  <Button
                    onClick={handleLogout}
                    className="mt-2 w-full cursor-pointer bg-red-500 text-white hover:bg-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </>
              ) : (
                <Button className="mt-5 w-full btn-bg">
                  <Link href="/login">Login/Claim</Link>
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
        </div>
      </div>
    </header>
  );
}