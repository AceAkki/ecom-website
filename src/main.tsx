import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// intialize query client
const queryClient = new QueryClient();
createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    {/* wrapper with client provider */}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
