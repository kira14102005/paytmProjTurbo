"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RedirectWithDelay() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push("/api/auth/signin");
        }, 4000);

        return () => clearTimeout(timer); // Cleanup timer
    }, [router]);

    return null; // No visible UI for this component
}
