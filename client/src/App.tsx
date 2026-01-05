import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import Auth from "@/pages/Auth";
import Pricing from "@/pages/Pricing";
import FAQ from "@/pages/FAQ";
import History from "@/pages/History";
import AdminDashboard from "@/pages/AdminDashboard";
import Compatibility from "@/pages/Compatibility";
import DashboardSelector from "./pages/DashboardSelector";
import ForgotPassword from "./pages/ForgotPassword";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";

/**
 * App Component - Bússola Numerológica 2026
 * 
 * Design Philosophy: Modernismo Minimalista com Acentos Místicos
 * - Clean, professional interface
 * - Indigo (#4C1D95) and gold (#D4AF37) accents
 * - Smooth transitions and subtle feedback
 */
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/app" component={Home} />
      <Route path="/auth" component={Auth} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/dashboard-selector" component={DashboardSelector} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/faq" component={FAQ} />
      <Route path="/history" component={History} />
      <Route path="/compatibility" component={Compatibility} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
