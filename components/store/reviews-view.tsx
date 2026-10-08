import Link from 'next/link'
import { ArrowLeft, BadgeCheck, Star } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { reviewSummary, reviews } from '@/lib/reviews'

function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <div className={cn('flex items-center gap-0.5', className)} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={cn(
            'size-3.5',
            i < Math.round(rating) ? 'fill-primary text-primary' : 'text-muted-foreground/40',
          )}
        />
      ))}
    </div>
  )
}

export function ReviewsView() {
  return (
    <div className="flex h-dvh flex-col">
      <header className="flex h-13 shrink-0 items-center justify-between border-b bg-card px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span
            aria-hidden="true"
            className="flex size-7 items-center justify-center rounded-md bg-primary font-mono text-xs text-primary-foreground"
          >
            A
          </span>
          <span>Aura Audio</span>
        </Link>
        <Link href="/" className={buttonVariants({ variant: 'outline', size: 'sm' })}>
          <ArrowLeft data-icon="inline-start" />
          Back to store
        </Link>
      </header>

      <main className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-3 lg:grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2.2fr)] lg:overflow-hidden">
        <section
          aria-labelledby="reviews-title"
          className="relative flex flex-col justify-between gap-5 overflow-hidden rounded-xl border bg-card p-6"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -left-24 size-64 rounded-full bg-primary/20 blur-3xl"
          />
          <div className="relative flex flex-col gap-3">
            <p className="font-mono text-xs tracking-widest text-primary uppercase">Reviews</p>
            <h1 id="reviews-title" className="text-2xl font-semibold tracking-tight text-balance xl:text-3xl">
              Loved by people who live in their headphones
            </h1>
            <div className="flex items-end gap-3">
              <span className="font-mono text-5xl font-medium">{reviewSummary.average}</span>
              <div className="flex flex-col gap-1 pb-1.5">
                <Stars rating={reviewSummary.average} />
                <span className="text-xs text-muted-foreground">
                  {reviewSummary.total.toLocaleString()} verified reviews
                </span>
              </div>
            </div>
          </div>

          <ul className="relative flex flex-col gap-1.5" aria-label="Rating breakdown">
            {reviewSummary.distribution.map((d) => (
              <li key={d.stars} className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="w-3 font-mono">{d.stars}</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${d.percent}%` }} />
                </div>
                <span className="w-8 text-right font-mono">{d.percent}%</span>
              </li>
            ))}
          </ul>

          <Link href="/" className={cn(buttonVariants({ size: 'lg' }), 'relative')}>
            Shop Aura One — $349
          </Link>
        </section>

        <section aria-label="Customer testimonials" className="min-h-0">
          <ul className="grid h-full gap-3 sm:grid-cols-2 lg:grid-rows-3 xl:grid-cols-3 xl:grid-rows-2">
            {reviews.map((r) => (
              <li key={r.name} className="flex min-h-0 flex-col gap-1.5 overflow-hidden rounded-xl border bg-card p-3.5">
                <div className="flex items-center justify-between">
                  <Stars rating={r.rating} />
                  <span className="font-mono text-[11px] text-muted-foreground">{r.date}</span>
                </div>
                <h2 className="text-sm font-medium text-pretty">{r.title}</h2>
                <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">{r.body}</p>
                <div className="mt-auto flex items-center gap-2.5 border-t pt-2.5">
                  <span
                    aria-hidden="true"
                    className="flex size-7 items-center justify-center rounded-full bg-accent font-mono text-[11px] text-accent-foreground"
                  >
                    {r.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </span>
                  <div className="flex min-w-0 flex-col">
                    <span className="flex items-center gap-1 text-xs font-medium">
                      {r.name}
                      <BadgeCheck className="size-3.5 text-success" aria-label="Verified buyer" />
                    </span>
                    <span className="truncate text-[11px] text-muted-foreground">{r.role}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  )
}
