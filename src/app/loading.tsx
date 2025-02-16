import { LoadingCircle } from "@/components/loading-circle";

export default function Loading() {
  return (
    <div className="flex h-[100vh] w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-2">
        <LoadingCircle />
      </div>
    </div>
  );
}
