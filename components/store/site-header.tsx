import { ShoppingBag } from 'lucide-react'
import { cn } from '@/lib/utils'

export type Step = 'home' | 'product' | 'checkout'

const steps: { id: Step; label: string }[] = [
  { id: 'home', label: 'Overview' },
  { id: 'product', label: 'Product' },
  { id: 'checkout', label: 'Checkout' },
]

export function SiteHeader({
  step,
  onStepChange,
  cartCount,
}: {
  step: Step
  onStepChange: (step: Step) => void
  cartCount: number
}) {
  return (
    <header className="flex h-13 shrink-0 items-center justify-between border-b bg-card px-4">
      <a href="#" className="flex items-center gap-2 font-semibold tracking-tight">
        <span
          aria-hidden="true"
          className="flex size-7 items-center justify-center rounded-md bg-primary font-mono text-xs text-primary-foreground"
        >
          A
        </span>
        <span>Aura Audio</span>
      </a>

      <nav aria-label="Store sections" className="lg:hidden">
        <ol className="flex items-center gap-1 rounded-lg bg-muted p-0.5">
          {steps.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => onStepChange(s.id)}
                aria-current={step === s.id ? 'step' : undefined}
                className={cn(
                  'rounded-md px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors',
                  step === s.id && 'bg-card text-foreground shadow-sm',
                )}
              >
                {s.label}
              </button>
            </li>
          ))}
        </ol>
      </nav>

      <div className="flex items-center gap-5">
        <ul className="hidden items-center gap-5 text-sm text-muted-foreground lg:flex">
          <li>
            <a href="#" className="hover:text-foreground">
              Technology
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-foreground">
              Specs
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-foreground">
              Support
            </a>
          </li>
        </ul>
        <button
          type="button"
          onClick={() => onStepChange('checkout')}
          className="relative flex size-8 items-center justify-center rounded-lg border bg-card hover:bg-muted"
        >
          <ShoppingBag className="size-4" aria-hidden="true" />
          <span className="sr-only">Cart, {cartCount} items</span>
          {cartCount > 0 && (
            <span
              aria-hidden="true"
              className="absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full bg-primary font-mono text-[10px] text-primary-foreground"
            >
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
