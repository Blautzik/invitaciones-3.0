"use client";

import React, { useEffect } from "react";

export function ClientBody({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Hydration fix - remove any extension-added classes
    document.body.classList.remove("vscode-light", "vscode-dark");
  }, []);

  // We return a div instead of body to avoid nesting body tags
  return <div className="app-container">{children}</div>;
}
