
"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

export default function AuthToast() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const toastShown = useRef(false);

  useEffect(() => {
    const authStatus = searchParams.get("auth");

    if (authStatus !== "google-success" || toastShown.current) {
      return;
    }

    toastShown.current = true;

    toast.success("Google login successful! Welcome to Helping Hands.");

    router.replace("/");
  }, [searchParams, router]);

  return null;
}