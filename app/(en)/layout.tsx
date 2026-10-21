import type { Metadata, Viewport } from "next";
import "../globals.css";
import { RootDocument } from "@/components/layout/RootDocument";
import { baseMetadata, baseViewport, pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = { ...baseMetadata, ...pageMetadata("home", "en") };
export const viewport: Viewport = baseViewport;

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
