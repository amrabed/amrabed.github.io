"use client";

import { Suspense } from "react";

export const withSuspense = (Component: React.ComponentType<any>) => {
  const SuspendedComponent = (props: any) => (
    <Suspense>
      <Component {...props} />
    </Suspense>
  );
  SuspendedComponent.displayName = `withSuspense(${Component.displayName || Component.name || "Component"})`;
  return SuspendedComponent;
};
