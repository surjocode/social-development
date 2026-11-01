"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useTheme } from "@teispace/next-themes";

import {
  Home,
  CalendarDays,
  Info,
  Images,
  Newspaper,
  Sun,
  Moon,
  Menu,
  LogOut,
  User,
  PlusCircle,
  LayoutDashboard,
  LogIn,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const navLinks = [
  { name: "Home", href: "/", icon: Home },
  {
    name: "Upcoming Events",
    href: "/upcoming-events",
    icon: CalendarDays,
  },
  { name: "About", href: "/#about", icon: Info },
  { name: "Gallery", href: "/#gallery", icon: Images },
  { name: "Blog", href: "/blog", icon: Newspaper },
];

const dashboardLinks = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  {
    name: "Create Event",
    href: "/dashboard/create-event",
    icon: PlusCircle,
  },
  {
    name: "Manage Events",
    href: "/dashboard/manage-events",
    icon: CalendarDays,
  },
  {
    name: "Joined Events",
    href: "/dashboard/joined-events",
    icon: User,
  },
];

const ThemeToggle = ({
  theme,
  onToggle,
}: {
  theme?: string;
  onToggle: () => void;
}) => (
  <Button
    variant="ghost"
    size="icon"
    className="rounded-full"
    onClick={onToggle}
    aria-label="Toggle theme"
  >
    {theme === "dark" ? (
      <Sun className="h-5 w-5" />
    ) : (
      <Moon className="h-5 w-5" />
    )}
  </Button>
);

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const { theme, setTheme } = useTheme();

  const [open, setOpen] = useState(false);

  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          setOpen(false);
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false;
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 z-50 w-full px-3 pt-3">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-border/60 bg-background/90 px-5 py-3 shadow-lg backdrop-blur-xl">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-9 w-9 shrink-0 overflow-hidden">
            <Image
              src="/images/Logo.png"
              alt="Helping Hands logo"
              fill
              sizes="36px"
              className="object-contain"
            />
          </div>

          <div className="leading-tight">
            <h1 className="text-xl font-bold tracking-tight text-green-800 dark:text-green-400">
              Helping Hands
            </h1>
            <p className="text-[10px] font-medium text-muted-foreground">
              Make Good Happen
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  active
                    ? "bg-green-800 text-white"
                    : "text-foreground hover:bg-green-100 hover:text-green-900 dark:hover:bg-green-950"
                }`}
              >
                {active && <Icon size={16} />}
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Desktop Right Side */}
        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle theme={theme} onToggle={toggleTheme} />

          <div className="h-6 w-px bg-border" aria-hidden="true" />

          {!isPending && !user && (
            <Button
              variant="outline"
              className="rounded-full border-green-800 px-6 hover:bg-green-800 hover:text-white"
              onClick={() => router.push("/login")}
            >
              Login
            </Button>
          )}

          {!isPending && user && (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 rounded-full outline-none">
                <Avatar className="h-10 w-10 border-2 border-green-700">
                  <AvatarImage src={user.image || ""} />
                  <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>

                <span className="max-w-28 truncate text-sm font-medium">
                  {user.name}
                </span>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-xs font-normal text-muted-foreground">
                    {user.email}
                  </p>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                {dashboardLinks.map((item) => {
                  const Icon = item.icon;

                  return (
                    <DropdownMenuItem
                      key={item.href}
                      render={<Link href={item.href} />}
                      className="cursor-pointer"
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      {item.name}
                    </DropdownMenuItem>
                  );
                })}

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle theme={theme} onToggle={toggleTheme} />

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                />
              }
            >
              <Menu size={21} />
            </SheetTrigger>

            <SheetContent side="right" className="w-[300px]">
              <div className="mb-7 mt-8 flex items-center gap-2">
                <Image
                  src="/images/Logo.png"
                  alt="Helping Hands logo"
                  width={32}
                  height={32}
                  className="h-8 w-8 object-contain"
                />
                <span className="text-xl font-bold text-green-800 dark:text-green-400">
                  Helping Hands
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {navLinks.map((link) => {
                  const Icon = link.icon;

                  return (
                    <SheetClose
                      key={link.name}
                      render={<Link href={link.href} />}
                      className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium hover:bg-green-100 dark:hover:bg-green-950"
                    >
                      <Icon size={19} />
                      {link.name}
                    </SheetClose>
                  );
                })}

                <div className="my-2 border-t" />

                {!isPending && !user && (
                  <SheetClose
                    render={
                      <Button
                        className="w-full bg-green-800 hover:bg-green-900"
                        onClick={() => router.push("/login")}
                      />
                    }
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </SheetClose>
                )}

                {!isPending && user && (
                  <>
                    <div className="flex items-center gap-3 px-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.image || ""} />
                        <AvatarFallback>
                          {user.name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold">
                          {user.name}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    {dashboardLinks.map((item) => {
                      const Icon = item.icon;

                      return (
                        <SheetClose
                          key={item.href}
                          render={<Link href={item.href} />}
                          className="flex items-center gap-3 rounded-lg px-4 py-2 text-sm hover:bg-green-100 dark:hover:bg-green-950"
                        >
                          <Icon size={17} />
                          {item.name}
                        </SheetClose>
                      );
                    })}

                    <Button variant="destructive" onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
