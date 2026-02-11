import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button, Container } from '@/components/ui';

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center">
      <Container size="sm">
        <div className="text-center">
          {/* 404 Number */}
          <p className="text-9xl font-bold text-primary-600">404</p>
          
          {/* Title */}
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Page not found
          </h1>
          
          {/* Description */}
          <p className="mt-4 text-lg text-slate-600">
            Sorry, we couldn't find the page you're looking for.
            It might have been moved or deleted.
          </p>
          
          {/* Actions */}
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/">
              <Button variant="primary" rightIcon={<ArrowRight className="h-4 w-4" />}>
                Go back home
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline">
                Contact support
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
