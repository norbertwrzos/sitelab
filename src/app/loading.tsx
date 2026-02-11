import { Spinner } from '@/components/ui';

export default function Loading() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center">
      <div className="text-center">
        <Spinner size="lg" />
        <p className="mt-4 text-sm text-slate-500">Loading...</p>
      </div>
    </div>
  );
}
