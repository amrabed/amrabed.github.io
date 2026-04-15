"use client";

import { Suspense } from "react";

export const withSuspense = <P extends object>(
  Component: React.ComponentType<P>,
) => {
  const SuspendedComponent = (props: P) => (
    <Suspense>
      <Component {...props} />
    </Suspense>
  );
  SuspendedComponent.displayName = `withSuspense(${Component.displayName || Component.name || "Component"})`;
  return SuspendedComponent;
};
