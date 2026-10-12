"use client";
import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import { Preloader } from "@/components/sections/Preloader";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { ProofBar } from "@/components/sections/ProofBar";
import { Services } from "@/components/sections/Services";
import { Capabilities } from "@/components/sections/Capabilities";
import type { FaqData } from "@/lib/faq";

const Method = dynamic(() => import("@/components/sections/Method").then((m) => m.Method));
const Work = dynamic(() => import("@/components/sections/Work").then((m) => m.Work));
const Numbers = dynamic(() => import("@/components/sections/Numbers").then((m) => m.Numbers));
const Partners = dynamic(() => import("@/components/sections/Partners").then((m) => m.Partners));
const Faq = dynamic(() => import("@/components/sections/Faq").then((m) => m.Faq));
const FinalCta = dynamic(() => import("@/components/sections/FinalCta").then((m) => m.FinalCta));
const Footer = dynamic(() => import("@/components/sections/Footer").then((m) => m.Footer));

export function HomePage({ faq }: { faq: FaqData }) {
  const [ready, setReady] = useState(false);
  const onDone = useCallback(() => setReady(true), []);
  return (
    <>
      <Preloader onDone={onDone} />
      <Nav visible={ready} />
      <main id="contenu">
        <Hero ready={ready} />
        <ProofBar />
        <Services />
        <Capabilities />
        <Method />
        <Work />
        <Numbers />
        <Partners />
        <Faq items={faq.home} />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
