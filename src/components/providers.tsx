"use client";

import { NextFont } from "next/dist/compiled/@next/font";
import { FC, ReactNode, memo } from "react";
import { MantineCustomThemeProvider } from "tp-kit/components";

type Props = {
  children: ReactNode,
  font: NextFont
}

const Providers: FC<Props> = memo(function({font, children}) {
  return <MantineCustomThemeProvider font={font}>
    {children}
  </MantineCustomThemeProvider>;
});

Providers.displayName = "Providers";
export {Providers};