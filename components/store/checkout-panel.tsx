'use client'

import { useState, type FormEvent } from 'react'
import { CheckCircle2, CreditCard, Loader2, Lock, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { product, formatCurrency, TAX_RATE, type ColorId } from '@/lib/product'

type Fields = { email: string; card: string; expiry: string; cvc: string; name: string }
type Errors = Partial<Record<keyof Fields, string>>

const initialFields: Fields = { email: '', card: '', expiry: '', cvc: '', name: '' }

function formatCard(value: string) {
  return value
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(.{4})/g, '$1 ')
    .trim()
}

function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 4)
  return digits.length > 2 ? `${digits.slice(0, 2)} / ${digits.slice(2)}` : digits
}

function validate(f: Fields): Errors {
  const errors: Errors = {}
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) errors.email = 'Enter a valid email'
  if (f.card.replace(/\s/g, '').length !== 16) errors.card = 'Enter a 16-digit card number'
  const [mm, yy] = f.expiry.split(' / ').map(Number)
  if (!mm || !yy || mm < 1 || mm > 12) errors.expiry = 'Invalid date'
  if (!/^\d{3,4}$/.test(f.cvc)) errors.cvc = 'Invalid CVC'
  if (f.name.trim().length < 2) errors.name = 'Enter the cardholder name'
  return errors
}

export function CheckoutPanel({
  color,
  quantity,
  highlighted,
  onBack,
}: {
  color: ColorId
  quantity: number
  highlighted: boolean
  onBack: () => void
}) {
  const [fields, setFields] = useState<Fields>(initialFields)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle')
  const [orderId, setOrderId] = useState('')

  const subtotal = product.price * quantity
  const tax = Math.round(subtotal * TAX_RATE * 100) / 100
  const total = subtotal + tax
  const colorLabel = product.colors.find((c) => c.id === color)?.label

  function update<K extends keyof Fields>(key: K, value: string) {
    setFields((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const next = validate(fields)
    setErrors(next)
    const firstInvalid = Object.keys(next)[0]
    if (firstInvalid) {
      document.getElementById(firstInvalid)?.focus()
      return
    }
    setStatus('processing')
    setTimeout(() => {
      setOrderId(`AUR-${Math.floor(100000 + Math.random() * 900000)}`)
      setStatus('success')
    }, 1400)
  }

  function reset() {
    setFields(initialFields)
    setErrors({})
    setStatus('idle')
  }

  return (
    <section
      aria-labelledby="checkout-title"
      className={cn(
        'flex w-full flex-col rounded-xl border bg-card p-4 transition-shadow',
        highlighted && 'border-primary/40 ring-3 ring-primary/10',
      )}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            className="flex size-6 items-center justify-center rounded-md text-muted-foreground hover:bg-muted lg:hidden"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            <span className="sr-only">Back to product</span>
          </button>
          <h2 id="checkout-title" className="font-semibold tracking-tight">
            Checkout
          </h2>
        </div>
        <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
          <Lock className="size-3" aria-hidden="true" />
          Secure 256-bit SSL
        </p>
      </div>

      {status === 'success' ? (
        <div
          role="status"
          className="flex flex-1 flex-col items-center justify-center gap-3 text-center animate-in fade-in zoom-in-95"
        >
          <CheckCircle2 className="size-12 text-success" aria-hidden="true" />
          <div>
            <p className="text-lg font-semibold">Order confirmed</p>
            <p className="text-sm text-muted-foreground text-pretty">
              {quantity} × {product.name} ({colorLabel}) is on its way. Receipt sent to{' '}
              <span className="font-medium text-foreground">{fields.email}</span>.
            </p>
          </div>
          <p className="rounded-md bg-muted px-3 py-1 font-mono text-xs">{orderId}</p>
          <Button variant="outline" onClick={reset}>
            Place another order
          </Button>
        </div>
      ) : (
        <form noValidate onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col gap-2.5">
          <div className="flex items-center justify-between rounded-lg bg-muted px-3 py-2 text-sm">
            <span className="truncate">
              {quantity} × {product.name}{' '}
              <span className="text-muted-foreground">· {colorLabel}</span>
            </span>
            <span className="font-mono">{formatCurrency(subtotal)}</span>
          </div>

          <Field id="email" label="Email" error={errors.email}>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              value={fields.email}
              onChange={(e) => update('email', e.target.value)}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className={inputClass}
            />
          </Field>

          <Field id="card" label="Card number" error={errors.card}>
            <div className="relative">
              <input
                id="card"
                inputMode="numeric"
                autoComplete="cc-number"
                placeholder="4242 4242 4242 4242"
                value={fields.card}
                onChange={(e) => update('card', formatCard(e.target.value))}
                aria-invalid={!!errors.card}
                aria-describedby={errors.card ? 'card-error' : undefined}
                className={cn(inputClass, 'pr-9 font-mono')}
              />
              <CreditCard
                className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
            </div>
          </Field>

          <div className="grid grid-cols-2 gap-2.5">
            <Field id="expiry" label="Expiry" error={errors.expiry}>
              <input
                id="expiry"
                inputMode="numeric"
                autoComplete="cc-exp"
                placeholder="MM / YY"
                value={fields.expiry}
                onChange={(e) => update('expiry', formatExpiry(e.target.value))}
                aria-invalid={!!errors.expiry}
                aria-describedby={errors.expiry ? 'expiry-error' : undefined}
                className={cn(inputClass, 'font-mono')}
              />
            </Field>
            <Field id="cvc" label="CVC" error={errors.cvc}>
              <input
                id="cvc"
                inputMode="numeric"
                autoComplete="cc-csc"
                placeholder="123"
                value={fields.cvc}
                onChange={(e) => update('cvc', e.target.value.replace(/\D/g, '').slice(0, 4))}
                aria-invalid={!!errors.cvc}
                aria-describedby={errors.cvc ? 'cvc-error' : undefined}
                className={cn(inputClass, 'font-mono')}
              />
            </Field>
          </div>

          <Field id="name" label="Name on card" error={errors.name}>
            <input
              id="name"
              autoComplete="cc-name"
              placeholder="Jordan Lee"
              value={fields.name}
              onChange={(e) => update('name', e.target.value)}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
              className={inputClass}
            />
          </Field>

          <dl className="mt-auto flex flex-col gap-1 border-t pt-2.5 text-xs">
            <div className="flex justify-between text-muted-foreground">
              <dt>Shipping</dt>
              <dd className="text-success">Free</dd>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <dt>Tax (8%)</dt>
              <dd className="font-mono">{formatCurrency(tax)}</dd>
            </div>
            <div className="flex justify-between text-sm font-semibold">
              <dt>Total</dt>
              <dd className="font-mono">{formatCurrency(total)}</dd>
            </div>
          </dl>

          <Button type="submit" size="lg" disabled={status === 'processing'}>
            {status === 'processing' ? (
              <>
                <Loader2 className="animate-spin" data-icon="inline-start" aria-hidden="true" />
                Processing…
              </>
            ) : (
              <>Pay {formatCurrency(total)}</>
            )}
          </Button>
        </form>
      )}
    </section>
  )
}

const inputClass =
  'h-8 w-full rounded-md border border-input bg-card px-2.5 text-sm outline-none transition placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/20 aria-invalid:border-destructive aria-invalid:ring-destructive/15'

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="text-xs font-medium">
          {label}
        </label>
        {error && (
          <span id={`${id}-error`} className="text-[11px] text-destructive">
            {error}
          </span>
        )}
      </div>
      {children}
    </div>
  )
}
