
import { HeartHandshake, LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-5">
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-7 flex h-24 w-24 items-center justify-center rounded-3xl bg-green-100 dark:bg-green-900/40">
          <HeartHandshake
            size={48}
            className="text-green-700 dark:text-green-400"
          />

          <span className="absolute -right-2 -top-2 flex h-9 w-9 items-center justify-center rounded-full border-4 border-background bg-green-600 text-white">
            <LoaderCircle size={19} className="animate-spin" />
          </span>
        </div>

        <h2 className="mb-2 text-2xl font-bold text-foreground">
          Loading Helping Hands
        </h2>

        <p className="mb-7 max-w-sm text-sm leading-6 text-muted-foreground">
          Please wait while we prepare everything for you.
          Together, we can make good happen!
        </p>

        <div className="h-2 w-48 overflow-hidden rounded-full bg-green-100 dark:bg-green-900/50">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-green-600" />
        </div>

        <p className="mt-5 text-xs font-medium tracking-wider text-green-700 dark:text-green-400">
          MAKING GOOD HAPPEN
        </p>
      </div>
    </main>
  );
}
