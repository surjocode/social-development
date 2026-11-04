
import Link from "next/link";
import { ArrowLeft, Home, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center px-5 py-16">
      <div className="w-full max-w-xl text-center">
        <div className="mx-auto mb-7 flex h-24 w-24 items-center justify-center rounded-3xl bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400">
          <SearchX size={48} strokeWidth={1.5} />
        </div>

        <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-green-700 dark:text-green-400">
          Page Not Found
        </p>

        <h1 className="mb-4 text-7xl font-extrabold text-foreground sm:text-8xl">
          404
        </h1>

        <h2 className="mb-4 text-2xl font-bold text-foreground sm:text-3xl">
          Oops! This Page Is Missing
        </h2>

        <p className="mx-auto mb-9 max-w-md text-base leading-7 text-muted-foreground">
          The page you are looking for may have been removed, renamed,
          or temporarily unavailable. Let’s get you back to making a difference!
        </p>

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-700 px-7 py-3.5 font-semibold text-white transition hover:bg-green-800"
          >
            <Home size={18} />
            Back to Home
          </Link>

          <Link
            href="/upcoming-events"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-7 py-3.5 font-semibold text-foreground transition hover:bg-muted"
          >
            <ArrowLeft size={18} />
            Explore Events
          </Link>
        </div>

        <p className="mt-12 text-sm text-muted-foreground">
          Helping Hands — Make Good Happen 💚
        </p>
      </div>
    </main>
  );
}
