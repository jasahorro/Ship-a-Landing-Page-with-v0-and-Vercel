import Image from 'next/image'
import { Minus, Plus, Star, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { product, formatCurrency, type ColorId } from '@/lib/product'

const MAX_QTY = 5

export function ProductPanel({
  color,
  onColorChange,
  quantity,
  onQuantityChange,
  onBuyNow,
}: {
  color: ColorId
  onColorChange: (c: ColorId) => void
  quantity: number
  onQuantityChange: (q: number) => void
  onBuyNow: () => void
}) {
  const colorLabel = product.colors.find((c) => c.id === color)?.label

  return (
    <section
      aria-labelledby="product-title"
      className="flex w-full flex-col gap-3 rounded-xl border bg-card p-4"
    >
      <div className="relative min-h-0 flex-1 overflow-hidden rounded-lg bg-muted">
        <Image
          src={product.image}
          alt={`${product.name} headphones in ${colorLabel}`}
          fill
          priority
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-contain p-2"
        />
        <span className="absolute top-2 left-2 rounded-md bg-card/90 px-2 py-0.5 text-[11px] font-medium text-accent-foreground backdrop-blur">
          In stock
        </span>
      </div>

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 id="product-title" className="text-lg leading-tight font-semibold tracking-tight">
            {product.name}
          </h2>
          <p className="truncate text-xs text-muted-foreground">{product.tagline}</p>
        </div>
        <div className="text-right">
          <p className="font-mono text-lg leading-tight font-semibold">
            {formatCurrency(product.price)}
          </p>
          <p className="flex items-center justify-end gap-1 text-xs text-muted-foreground">
            <Star className="size-3 fill-amber-400 text-amber-400" aria-hidden="true" />
            {product.rating} ({product.reviews.toLocaleString()})
          </p>
        </div>
      </div>

      <dl className="grid grid-cols-3 divide-x rounded-lg border text-center">
        {product.specs.map((s) => (
          <div key={s.label} className="flex flex-col py-1.5">
            <dt className="order-2 text-[11px] text-muted-foreground">{s.label}</dt>
            <dd className="font-mono text-sm font-medium">{s.value}</dd>
          </div>
        ))}
      </dl>

      <fieldset className="flex items-center justify-between gap-3">
        <legend className="sr-only">Color</legend>
        <p className="text-xs text-muted-foreground" aria-hidden="true">
          Color: <span className="font-medium text-foreground">{colorLabel}</span>
        </p>
        <div className="flex gap-2">
          {product.colors.map((c) => (
            <label key={c.id} className="cursor-pointer">
              <input
                type="radio"
                name="color"
                value={c.id}
                checked={color === c.id}
                onChange={() => onColorChange(c.id)}
                className="peer sr-only"
              />
              <span className="sr-only">{c.label}</span>
              <span
                aria-hidden="true"
                style={{ backgroundColor: c.swatch }}
                className={cn(
                  'block size-6 rounded-full border-2 border-card ring-1 ring-border transition peer-focus-visible:ring-3 peer-focus-visible:ring-ring/50',
                  color === c.id && 'ring-2 ring-primary',
                )}
              />
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex gap-2">
        <div className="flex h-9 items-center rounded-lg border" role="group" aria-label="Quantity">
          <button
            type="button"
            onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
            className="flex size-9 items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-40"
          >
            <Minus className="size-3.5" aria-hidden="true" />
            <span className="sr-only">Decrease quantity</span>
          </button>
          <output aria-live="polite" className="w-6 text-center font-mono text-sm">
            {quantity}
          </output>
          <button
            type="button"
            onClick={() => onQuantityChange(Math.min(MAX_QTY, quantity + 1))}
            disabled={quantity >= MAX_QTY}
            className="flex size-9 items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-40"
          >
            <Plus className="size-3.5" aria-hidden="true" />
            <span className="sr-only">Increase quantity</span>
          </button>
        </div>
        <Button size="lg" onClick={onBuyNow} className="flex-1">
          <Zap data-icon="inline-start" />
          Buy Now
        </Button>
      </div>
    </section>
  )
}
