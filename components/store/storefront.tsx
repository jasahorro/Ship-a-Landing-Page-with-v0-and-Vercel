'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import type { ColorId } from '@/lib/product'
import { SiteHeader, type Step } from './site-header'
import { HeroPanel } from './hero-panel'
import { ProductPanel } from './product-panel'
import { CheckoutPanel } from './checkout-panel'

export function Storefront() {
  const [step, setStep] = useState<Step>('home')
  const [color, setColor] = useState<ColorId>('graphite')
  const [quantity, setQuantity] = useState(1)
  const [checkoutActive, setCheckoutActive] = useState(false)

  function handleBuyNow() {
    setStep('checkout')
    setCheckoutActive(true)
    requestAnimationFrame(() => document.getElementById('email')?.focus())
  }

  const panelClass = (target: Step) =>
    cn('min-h-0 flex-1 lg:flex', step === target ? 'flex' : 'hidden')

  return (
    <div className="flex h-dvh flex-col">
      <SiteHeader step={step} onStepChange={setStep} cartCount={checkoutActive ? quantity : 0} />
      <main className="flex min-h-0 flex-1 gap-3 p-3 lg:grid lg:grid-cols-[1.15fr_1fr_1fr]">
        <h1 className="sr-only">Aura One storefront</h1>
        <div className={panelClass('home')}>
          <HeroPanel onShop={() => setStep('product')} onBuy={handleBuyNow} />
        </div>
        <div className={panelClass('product')}>
          <ProductPanel
            color={color}
            onColorChange={setColor}
            quantity={quantity}
            onQuantityChange={setQuantity}
            onBuyNow={handleBuyNow}
          />
        </div>
        <div className={panelClass('checkout')}>
          <CheckoutPanel
            color={color}
            quantity={quantity}
            highlighted={checkoutActive}
            onBack={() => setStep('product')}
          />
        </div>
      </main>
    </div>
  )
}
