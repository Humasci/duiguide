import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Pricing from "./pages/Pricing";
import LifeSciences from "./pages/LifeSciences";
import Components from "./pages/Components";
import EconomicFutures from "./pages/EconomicFutures";
import TrustResources from "./pages/TrustResources";
import TrustFAQ from "./pages/TrustFAQ";
import UseCaseEmailCleanup from "./pages/UseCaseEmailCleanup";
import DarkTheme from "./pages/DarkTheme";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/solutions/life-sciences" element={<LifeSciences />} />
          <Route path="/economic-futures" element={<EconomicFutures />} />
          <Route path="/components" element={<Components />} />
          <Route path="/dark-theme" element={<DarkTheme />} />
          <Route path="/learn/resources" element={<TrustResources />} />
          <Route path="/learn/faq" element={<TrustFAQ />} />
          <Route path="/learn/use-cases/email-cleanup" element={<UseCaseEmailCleanup />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
