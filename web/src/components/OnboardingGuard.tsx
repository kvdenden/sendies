"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useCallback, useEffect, useState } from "react";
import OnboardingScreen from "./screens/OnboardingScreen";

export default function OnboardingGuard({ children }: { children: React.ReactNode }) {
  const { user } = usePrivy();
  const [onboarded, setOnboarded] = useState(false);

  useEffect(() => {
    if (!user) return;

    const onboarded = localStorage.getItem(`onboard:${user.id}`);
    setOnboarded(!!onboarded);
  }, [user]);

  const handleOnboard = useCallback(() => {
    if (!user) return;

    localStorage.setItem(`onboard:${user.id}`, "t");
    setOnboarded(true);
  }, [user]);

  if (!onboarded) return <OnboardingScreen onComplete={handleOnboard} />;

  return <>{children}</>;
}
