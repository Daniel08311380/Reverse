"use client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
import React, { useState, useRef } from "react";
import { Card, CardHeader, CardBody, CardFooter, Divider } from "@nextui-org/react";

import { Providers } from "./providers";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import { format } from "path";

// export const metadata: Metadata = {
//   title: {
//     default: siteConfig.name,
//     template: %s - ${siteConfig.name},
//   },
//   description: siteConfig.description,
//   icons: {
//     icon: "/favicon.ico",
//   },
// };

const reverseFunction = (word: string): string => {
  let newWord = "";
  for (let i = word.length - 1; i >= 0; i--) {
    newWord += word[i];
  }
  return newWord;
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [reverseEffect, setReverseEffect] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const listner = () => {
    if (inputRef.current) {
      const result = reverseFunction(inputRef.current.value);
      setReverseEffect(result);
    }
  };

  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen justify-center items-center">
            <Card className="w-96">
              <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                  <h2 className="text-md">Reverse Word</h2>
                </div>
              </CardHeader>
              <Divider />
              <CardBody className="flex justify-center items-center gap-y-5">
                <Input
                  ref={inputRef}
                  isRequired
                  type="text"
                  label="Enter your word:"
                  defaultValue=""
                  className="max-w-xs"
                />
                <div className="w-52 h-9 rounded-lg bg-slate-700 flex justify-center items-center" id="reverseEffect">
                  {reverseEffect}
                </div>
                <Button color="secondary" onClick={listner}>
                  Reverse
                </Button>
              </CardBody>
              <CardFooter></CardFooter>
            </Card>
          </div>
        </Providers>
      </body>
    </html>
  );
}