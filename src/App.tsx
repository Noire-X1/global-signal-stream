import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import WorldCanvas from "@/components/three/WorldCanvas";
import StoryPanel from "@/components/three/StoryPanel";
import AuthGate from "@/components/auth/AuthGate";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import type { NewsStory } from "@/data/newsStories";

const queryClient = new QueryClient();

const App = () => {
  const [activeStory, setActiveStory] = useState<NewsStory | null>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WorldCanvas onMoteClick={setActiveStory} />
        <StoryPanel story={activeStory} onClose={() => setActiveStory(null)} />
        <AuthGate>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthGate>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
