"use client";
import { useState, useEffect } from "react";
import { Providers } from "@/store/provider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/styles/style.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ChatBotComponent from "@/components/widget/ChatbotComponent";

const RootLayout = ({ children }) => {
  useEffect(() => {
    window.bootstrap = require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/css/font-awesome.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning={true}>
          <QueryClientProvider client={queryClient}>
            <Providers>{children}</Providers>
          </QueryClientProvider>
          <ChatBotComponent />
      </body>
    </html>
  );
};

export default RootLayout;
