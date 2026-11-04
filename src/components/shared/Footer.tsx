
import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-green-100 bg-[#F0F7F1] text-gray-800 transition-colors duration-300 dark:border-green-900/50 dark:bg-[#14251B] dark:text-white">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8">

        {/* Main Footer */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand Section */}
          <div className="space-y-5">

            {/* Same Logo Design as Navbar */}
            <Link
              href="/"
              className="group inline-flex items-center gap-2.5"
            >
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-green-100 transition-all duration-300 group-hover:scale-105 dark:bg-white dark:ring-green-200">
                <Image
                  src="/images/Logo.png"
                  alt="Helping Hands Logo"
                  fill
                  sizes="44px"
                  className="object-contain p-0.5"
                />
              </div>

              <div className="leading-tight">
                <h2 className="text-lg font-extrabold tracking-tight text-green-800 dark:text-green-400 sm:text-xl">
                  Helping Hands
                </h2>

                <p className="text-[10px] font-medium tracking-wide text-muted-foreground">
                  Make Good Happen
                </p>
              </div>
            </Link>

            <p className="max-w-xs text-sm leading-7 text-gray-600 dark:text-gray-300">
              Together, we can build a better world through kindness,
              community service, environmental protection, and helping
              those in need.
            </p>

            {/* Social Media */}
            <div className="flex gap-3">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-800 transition hover:bg-green-700 hover:text-white dark:bg-white/10 dark:text-white dark:hover:bg-green-700"
              >
                <FaFacebookF size={18} />
              </Link>

              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-800 transition hover:bg-green-700 hover:text-white dark:bg-white/10 dark:text-white dark:hover:bg-green-700"
              >
                <FaInstagram size={18} />
              </Link>

              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-800 transition hover:bg-green-700 hover:text-white dark:bg-white/10 dark:text-white dark:hover:bg-green-700"
              >
                <FaLinkedinIn size={18} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-green-950 dark:text-white">
              Quick Links
            </h3>

            <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
              <li>
                <Link
                  href="/"
                  className="transition hover:text-green-700 dark:hover:text-green-400"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/upcoming-events"
                  className="transition hover:text-green-700 dark:hover:text-green-400"
                >
                  Upcoming Events
                </Link>
              </li>

              <li>
                <Link
                  href="/#about"
                  className="transition hover:text-green-700 dark:hover:text-green-400"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/#gallery"
                  className="transition hover:text-green-700 dark:hover:text-green-400"
                >
                  Gallery
                </Link>
              </li>

              <li>
                <Link
                  href="/login"
                  className="transition hover:text-green-700 dark:hover:text-green-400"
                >
                  Join Our Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Activities */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-green-950 dark:text-white">
              Our Activities
            </h3>

            <ul className="space-y-4 text-sm text-gray-600 dark:text-gray-300">
              <li>Tree Plantation</li>
              <li>Food Distribution</li>
              <li>Winter Clothes Donation</li>
              <li>Community Clean-up</li>
              <li>Social Development</li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-green-950 dark:text-white">
              Get In Touch
            </h3>

            <ul className="space-y-5 text-sm text-gray-600 dark:text-gray-300">
              <li className="flex items-start gap-3">
                <MapPin
                  className="mt-1 shrink-0 text-green-700 dark:text-green-400"
                  size={19}
                />

                <span>Bangladesh</span>
              </li>

              <li className="flex items-center gap-3">
                <Mail
                  className="shrink-0 text-green-700 dark:text-green-400"
                  size={19}
                />

                <a
                  href="mailto:hello@helpinghands.org"
                  className="transition hover:text-green-700 dark:hover:text-green-400"
                >
                  hello@helpinghands.org
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Phone
                  className="shrink-0 text-green-700 dark:text-green-400"
                  size={19}
                />

                <span>Contact us via email</span>
              </li>
            </ul>

            <Link
              href="/upcoming-events"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-green-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-green-800 dark:bg-green-700 dark:hover:bg-green-600"
            >
              Explore Events
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-14 border-t border-green-200 pt-7 dark:border-white/10">
          <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-gray-500 dark:text-gray-400 md:flex-row">

            <p>
              © 2026 Helping Hands. All rights reserved.
            </p>

            <p>
              Made with ❤️ for a better world.
            </p>

            <div className="flex gap-5">
              <Link
                href="/privacy"
                className="transition hover:text-green-700 dark:hover:text-green-400"
              >
                Privacy
              </Link>

              <Link
                href="/terms"
                className="transition hover:text-green-700 dark:hover:text-green-400"
              >
                Terms
              </Link>
            </div>

          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
