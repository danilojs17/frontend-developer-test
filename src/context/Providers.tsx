"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AxiosInterceptor } from "./axios-interceptor";
import { ThemeRegistry } from "@/components/ThemeRegistry";

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <>
      <ThemeRegistry>
        <AxiosInterceptor>
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </AxiosInterceptor>
      </ThemeRegistry>
      <ToastContainer
        draggable
        closeOnClick
        pauseOnHover
        pauseOnFocusLoss
        rtl={false}
        limit={1}
        autoClose={5000}
        newestOnTop={false}
        hideProgressBar={false}
        position="top-right"
      />
    </>
  );
}
