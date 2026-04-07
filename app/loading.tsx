import { GlobalLoader } from "@/components/shared/GlobalLoader";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export default function Loading() {
  return <GlobalLoader spinner={<LoadingSpinner size="lg" />} />;
}
