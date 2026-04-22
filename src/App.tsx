import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import { HomePage } from "./pages/HomePage";
import { LandlordProfilePage } from "./pages/LandlordProfilePage";
import { ListingsPage } from "./pages/ListingsPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { PostListingPage } from "./pages/PostListingPage";
import { PropertyDetailPage } from "./pages/PropertyDetailPage";
import { SignInPage } from "./pages/SignInPage";
import { SignUpPage } from "./pages/SignUpPage";
import { SubmitReviewPage } from "./pages/SubmitReviewPage";

/**
 * App routing map (keep routes centralized for class readability).
 * Each route renders a page component under the shared chrome (`AppShell`).
 */
export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/listings" element={<ListingsPage />} />
        <Route path="/listings/new" element={<PostListingPage />} />
        <Route path="/listings/:listingId" element={<PropertyDetailPage />} />

        <Route path="/landlords/:landlordId" element={<LandlordProfilePage />} />

        <Route path="/reviews/new" element={<SubmitReviewPage />} />

        <Route path="/auth/sign-in" element={<SignInPage />} />
        <Route path="/auth/sign-up" element={<SignUpPage />} />

        {/* Convenience redirect if someone types /sign-in */}
        <Route path="/sign-in" element={<Navigate to="/auth/sign-in" replace />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppShell>
  );
}
