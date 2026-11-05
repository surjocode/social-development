
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

import {
  Home,
  CalendarDays,
  Info,
  Images,
  Menu,
  LogOut,
  User,
  PlusCircle,
  CheckCircle2,
  LogIn,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

import ThemeToggle from "@/components/shared/ThemeToggle";

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

// Main Navigation Links
const navLinks = [
  { name: "Home", href: "/", icon: Home },
  {
    name: "Upcoming Events",
    href: "/upcoming-events",
    icon: CalendarDays,
  },
  { name: "Gallery", href: "/#gallery", icon: Images },
  { name: "About", href: "/#about", icon: Info },
];

// Dashboard Navigation Links
const dashboardLinks = [
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
    icon: CheckCircle2,
  },
  {
    name: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
];

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [open, setOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");

  const user = session?.user;

  const userInitial = user?.name?.charAt(0)?.toUpperCase() || "U";

  // Update URL hash after navigation
  useEffect(() => {
    const updateHash = () => {
      setActiveHash(window.location.hash);
    };

    updateHash();

    window.addEventListener("hashchange", updateHash);

    return () => {
      window.removeEventListener("hashchange", updateHash);
    };
  }, [pathname]);

  // Handle Logout
  const handleLogout = async () => {
    try {
      await authClient.signOut();

      setOpen(false);

      toast.success("Logged out successfully!");

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout Error:", error);

      toast.error("Logout failed. Please try again.");
    }
  };

  // Handle navigation clicks
  const handleNavigation = (href: string) => {
    if (href === "/#gallery") {
      setActiveHash("#gallery");
    } else if (href === "/#about") {
      setActiveHash("#about");
    } else {
      setActiveHash("");
    }

    setOpen(false);
  };

  // Check active navigation link
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/" && activeHash === "";
    }

    if (href === "/#gallery") {
      return pathname === "/" && activeHash === "#gallery";
    }

    if (href === "/#about") {
      return pathname === "/" && activeHash === "#about";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  // Reusable Logo Component
  const Logo = () => (
    <div className="flex items-center gap-2.5">
      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-green-100 transition-all duration-300 group-hover:scale-105 dark:bg-white dark:ring-green-200">
        <Image
          src="/images/Logo.png"
          alt="Helping Hands Logo"
          fill
          sizes="44px"
          priority
          className="object-contain p-0.5"
        />
      </div>

      <div className="leading-tight">
        <h1 className="text-lg font-extrabold tracking-tight text-green-800 dark:text-green-400 sm:text-xl">
          Helping Hands
        </h1>

        <p className="text-[10px] font-medium tracking-wide text-muted-foreground">
          Make Good Happen
        </p>
      </div>
    </div>
  );

  // Active Navigation Style
  const activeClass =
    "bg-green-800 text-white shadow-md shadow-green-900/10 dark:bg-green-700 dark:text-white";

  // Inactive Navigation Style
  const inactiveClass =
    "text-foreground hover:bg-green-100 hover:text-green-900 dark:hover:bg-green-950 dark:hover:text-green-300";

  return (
    <header className="fixed top-0 z-50 w-full px-3 pt-3">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-border/60 bg-background/90 px-4 py-3 text-foreground shadow-lg backdrop-blur-xl transition-colors duration-300 sm:px-5">

        {/* Logo */}
        <Link
          href="/"
          onClick={() => {
            setActiveHash("");
            setOpen(false);
          }}
          className="group flex items-center"
        >
          <Logo />
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
                onClick={() => handleNavigation(link.href)}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  active ? activeClass : inactiveClass
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
          <ThemeToggle />

          <div
            className="h-6 w-px bg-border"
            aria-hidden="true"
          />

          {/* Login Button */}
          {!isPending && !user && (
            <Button
              variant="outline"
              className="rounded-full border-green-800 px-6 text-foreground transition-colors hover:bg-green-800 hover:text-white dark:border-green-600 dark:hover:bg-green-700"
              onClick={() => router.push("/login")}
            >
              Login
            </Button>
          )}

          {/* Logged In User */}
          {!isPending && user && (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 rounded-full outline-none">
                <Avatar className="h-10 w-10 border-2 border-green-700">
                  <AvatarImage
                    src={user.image || undefined}
                    alt={user.name || "User"}
                  />

                  <AvatarFallback className="bg-green-100 font-semibold text-green-800 dark:bg-green-950 dark:text-green-300">
                    {userInitial}
                  </AvatarFallback>
                </Avatar>

                <span className="max-w-28 truncate text-sm font-medium text-foreground">
                  {user.name}
                </span>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-56 border-border bg-popover text-popover-foreground"
              >
                <DropdownMenuLabel>
                  <p className="font-semibold">{user.name}</p>

                  <p className="text-xs font-normal text-muted-foreground">
                    {user.email}
                  </p>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                {dashboardLinks.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);

                  return (
                    <DropdownMenuItem
                      key={item.href}
                      render={<Link href={item.href} />}
                      className={`cursor-pointer ${
                        active
                          ? "bg-green-100 font-semibold text-green-900 dark:bg-green-950 dark:text-green-300"
                          : "text-popover-foreground focus:bg-accent focus:text-accent-foreground"
                      }`}
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      {item.name}
                    </DropdownMenuItem>
                  );
                })}

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-700 dark:focus:bg-red-950 dark:focus:text-red-300"
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
          <ThemeToggle />

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-border bg-background text-foreground hover:bg-accent"
                />
              }
            >
              <Menu size={21} />
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[300px] border-border bg-background text-foreground"
            >
              {/* Mobile Logo */}
              <div className="mb-7 mt-8">
                <Link
                  href="/"
                  onClick={() => {
                    setActiveHash("");
                    setOpen(false);
                  }}
                  className="group inline-flex"
                >
                  <Logo />
                </Link>
              </div>

              {/* Mobile Navigation Links */}
              <div className="flex flex-col gap-3">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const active = isActive(link.href);

                  return (
                    <SheetClose
                      key={link.name}
                      render={<Link href={link.href} />}
                      onClick={() => handleNavigation(link.href)}
                      className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${
                        active ? activeClass : inactiveClass
                      }`}
                    >
                      <Icon size={19} />
                      {link.name}
                    </SheetClose>
                  );
                })}

                <div className="my-2 border-t border-border" />

                {/* Mobile Login */}
                {!isPending && !user && (
                  <SheetClose
                    render={
                      <Button
                        className="w-full bg-green-800 text-white hover:bg-green-900 dark:bg-green-700 dark:hover:bg-green-600"
                        onClick={() => router.push("/login")}
                      />
                    }
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </SheetClose>
                )}

                {/* Mobile Logged In User */}
                {!isPending && user && (
                  <>
                    <div className="flex items-center gap-3 px-3">
                      <Avatar className="h-10 w-10 border-2 border-green-700">
                        <AvatarImage
                          src={user.image || undefined}
                          alt={user.name || "User"}
                        />

                        <AvatarFallback className="bg-green-100 font-semibold text-green-800 dark:bg-green-950 dark:text-green-300">
                          {userInitial}
                        </AvatarFallback>
                      </Avatar>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-foreground">
                          {user.name}
                        </p>

                        <p className="truncate text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    {/* Mobile Dashboard Links */}
                    {dashboardLinks.map((item) => {
                      const Icon = item.icon;
                      const active = isActive(item.href);

                      return (
                        <SheetClose
                          key={item.href}
                          render={<Link href={item.href} />}
                          onClick={() => handleNavigation(item.href)}
                          className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm transition-all duration-200 ${
                            active ? activeClass : inactiveClass
                          }`}
                        >
                          <Icon size={17} />
                          {item.name}
                        </SheetClose>
                      );
                    })}

                    {/* Mobile Logout */}
                    <Button
                      variant="destructive"
                      onClick={handleLogout}
                      className="mt-2"
                    >
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