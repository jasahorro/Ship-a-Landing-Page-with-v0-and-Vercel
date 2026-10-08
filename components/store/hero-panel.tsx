import { ArrowRight, ShieldCheck, Truck, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'

const stats = [
  { value: '-42dB', label: 'Adaptive ANC' },
  { value: '60h', label: 'Battery life' },
  { value: '4.9', label: 'Avg. rating' },
]

const perks = [
  { icon: Truck, label: 'Free 2-day shipping' },
  { icon: RotateCcw, label: '30-day returns' },
  { icon: ShieldCheck, label: '2-year warranty' },
]

export function HeroPanel({ onShop, onBuy }: { onShop: () => void; onBuy: () => void }) {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative flex w-full flex-col justify-between overflow-hidden rounded-xl bg-foreground p-6 text-background xl:p-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-primary/40 blur-3xl"
      />
      <div className="relative flex flex-col gap-4">
        <p className="inline-flex w-fit items-center gap-2 rounded-full border border-background/15 bg-background/5 px-3 py-1 text-xs text-background/80">
          <span className="size-1.5 rounded-full bg-success" aria-hidden="true" />
          New — Firmware 2.0 with spatial audio
        </p>
        <h2
          id="hero-title"
          className="text-3xl leading-[1.05] font-semibold tracking-tight text-balance xl:text-[2.6rem]"
        >
          Welcome to My Store
        </h2>
        <p className="max-w-sm text-sm leading-relaxed text-pretty text-background/65">
          Aura One adapts to your environment 50,000 times per second, delivering studio-grade
          sound wherever you work.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button size="lg" onClick={onBuy} className="px-4">
            Buy now — $349
          </Button>
          <Button
            size="lg"
            variant="ghost"
            onClick={onShop}
            className="px-3 text-background hover:bg-background/10 hover:text-background lg:hidden"
          >
            View product
            <ArrowRight data-icon="inline-end" />
          </Button>
        </div>
      </div>

      <div className="relative flex flex-col gap-4">
        <dl className="grid grid-cols-3 gap-3 border-t border-background/10 pt-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col gap-0.5">
              <dt className="order-2 text-xs text-background/55">{s.label}</dt>
              <dd className="font-mono text-xl font-medium">{s.value}</dd>
            </div>
          ))}
        </dl>
        <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-background/60">
          {perks.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-1.5">
              <Icon className="size-3.5" aria-hidden="true" />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
