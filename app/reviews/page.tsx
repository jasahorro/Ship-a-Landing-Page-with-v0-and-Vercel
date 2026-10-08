import type { Metadata } from 'next'
import { ReviewsView } from '@/components/store/reviews-view'

export const metadata: Metadata = {
  title: 'Customer Reviews — Aura One',
  description: 'See what 2,000+ customers say about Aura One adaptive noise-cancelling headphones.',
}

export default function ReviewsPage() {
  return <ReviewsView />
}
