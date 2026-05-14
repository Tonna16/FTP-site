import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClientInstance } from "@/lib/query-client"
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"
import Home from "./pages/Home"
import Features from "./pages/Features"
import Support from "./pages/Support"
import Layout from "./components/Layout"

function PageNotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold mb-4">Page not found</h1>
        <p className="text-muted-foreground mb-6">
          The page you're looking for does not exist.
        </p>
        <Link
          to="/"
          className="inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-primary-foreground font-medium"
        >
          Go home
        </Link>
      </div>
    </div>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/Features" element={<Features />} />
            <Route path="/Support" element={<Support />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </QueryClientProvider>
  )
}

export default App