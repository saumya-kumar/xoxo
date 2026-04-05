import { redirect } from "next/navigation";

// The full user journey is now implemented as the /signup wizard.
// Keep this route for backward compat and redirect.
export default function JourneyPage() {
  redirect("/signup");
}
