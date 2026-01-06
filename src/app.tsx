import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RegistryProvider } from "@/contexts/registry-context";
import { RootLayout } from "@/components/layout/root-layout";
import { HomePage } from "@/pages/home-page";
import { ComponentPage } from "@/pages/component-page";
import { DocsPage } from "@/pages/docs-page";

function App() {
  return (
    <BrowserRouter>
      <RegistryProvider>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/docs" element={<Navigate to="/docs/introduction" replace />} />
            <Route path="/docs/:slug" element={<DocsPage />} />
            <Route path="/components/:componentName" element={<ComponentPage />} />
          </Route>
        </Routes>
      </RegistryProvider>
    </BrowserRouter>
  );
}

export default App;
