'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, RefreshCw } from 'lucide-react';
import { Button, Container } from '@/components/ui';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center">
      <Container size="sm">
        <div className="text-center">
          {/* Error Icon */}
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-error-50">
            <svg
              className="h-12 w-12 text-error-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          {/* Title */}
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Something went wrong
          </h1>

          {/* Description */}
          <p className="mt-4 text-lg text-slate-600">
            We apologize for the inconvenience. An unexpected error occurred.
          </p>

          {/* Error Digest (for debugging) */}
          {error.digest && (
            <p className="mt-2 text-sm text-slate-400">
              Error ID: {error.digest}
            </p>
          )}

          {/* Actions */}
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              variant="primary"
              leftIcon={<RefreshCw className="h-4 w-4" />}
              onClick={() => reset()}
            >
              Try again
            </Button>
            <Link href="/">
              <Button variant="outline" rightIcon={<ArrowRight className="h-4 w-4" />}>
                Go back home
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
