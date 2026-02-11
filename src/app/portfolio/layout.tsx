import { Metadata } from 'next';
import PortfolioPage from './page';

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'Explore our portfolio of custom websites built for businesses across various industries. See real results and case studies.',
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
