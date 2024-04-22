import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { v4 as uuidv4 } from "uuid";
import { getServerClient } from "@/utils/ld-server";
import serverflag from "@/utils/ld-server/flaggetter";
import Home from "./page";
import { LDClient } from "launchdarkly-node-server-sdk";
import { unstable_noStore as noStore } from "next/cache";

const inter = Inter({ subsets: ["latin"] });

const AsyncLDProvider = dynamic(() => import("@/components/ldprovider"), {
  ssr: false,
});

const AsyncHome = dynamic(() => import("./page"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Testing LD + GA",
  description: "Testing out LD and Google Analytics Together in Next.js",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  noStore()
  const client: LDClient = await getServerClient(
    process.env.LAUNCHDARKLY_SDK_KEY || ""
  );
  const uuid = await uuidv4().split("-")[0];
  const context = {
    kind: "user",
    key: uuid,
    name: uuid,
  };

  const expTest = await serverflag(client, "buyPage", "slate", context);

  await client.track("pageview", context);
  await client.flush();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<div>Loading...</div>}>
          <AsyncLDProvider context={context}>
            <AsyncHome buyPage={expTest} uuid={uuid} />
          </AsyncLDProvider>
        </Suspense>
      </body>
      <GoogleTagManager gtmId={process.env.GTMID!} />
    </html>
  );
}
