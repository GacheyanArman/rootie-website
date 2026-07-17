'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { X, ArrowUpRight, ShoppingBag } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'
import type { CatalogItem } from '@/lib/catalog'
import { LINKS } from '@/lib/links'
import { cn } from '@/lib/utils'

type ProductModalProps = {
  item: CatalogItem | null
  onClose: () => void
}

export function ProductModal({ item, onClose }: ProductModalProps) {
  const { t } = useLanguage()
  const [isClosing, setIsClosing] = useState(false)

  const handleClose = useCallback(() => {
    setIsClosing(true)
    setTimeout(() => {
      setIsClosing(false)
      onClose()
    }, 250)
  }, [onClose])

  useEffect(() => {
    if (!item) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [item, handleClose])

  if (!item) return null

  const isOut = item.stock === 'out'
  const buyLink = item.link || LINKS.instagram

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-end justify-center md:items-center',
        isClosing ? 'modal-overlay-exit' : 'modal-overlay-enter',
      )}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.name}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal content */}
      <div
        className={cn(
          'relative flex max-h-[92vh] w-full flex-col overflow-hidden bg-background md:max-h-[85vh] md:max-w-[960px] md:flex-row md:rounded-lg',
          isClosing ? 'modal-content-exit' : 'modal-content-enter',
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-3 top-3 z-10 flex size-10 items-center justify-center rounded-full bg-background/80 backdrop-blur transition-colors hover:bg-foreground hover:text-background md:right-4 md:top-4"
          aria-label={t.productModal.close}
        >
          <X className="size-5" />
        </button>

        {/* Image */}
        <div className="relative aspect-[4/5] w-full shrink-0 bg-card md:aspect-auto md:w-[420px]">
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(min-width: 768px) 420px, 100vw"
            className="object-cover"
            priority
          />
          {/* Number badge */}
          <span className="absolute left-4 top-4 bg-background/85 px-3 py-2 text-xs font-bold uppercase tracking-widest backdrop-blur">
            ROOTIE
          </span>
        </div>

        {/* Info panel */}
        <div className="flex flex-1 flex-col overflow-y-auto p-6 md:p-8">
          {/* Category */}
          {item.category && (
            <p className="text-xs font-bold uppercase tracking-[.2em] text-muted-foreground">
              {item.category}
            </p>
          )}

          {/* Name */}
          <h2 className="mt-3 font-heading text-3xl font-black uppercase leading-[.9] tracking-tight md:text-4xl lg:text-5xl">
            {item.name}
          </h2>

          {/* Stock status */}
          <div className="mt-4 flex items-center gap-3">
            {item.stock === 'available' && (
              <span className="inline-flex items-center gap-2 text-sm">
                <span className="size-2 rounded-full bg-emerald-400" />
                In stock
              </span>
            )}
            {item.stock === 'low' && (
              <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                <span className="size-2 rounded-full bg-amber-400" />
                {t.catalog.stockLow}
              </span>
            )}
            {isOut && (
              <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                {t.catalog.stockOut}
              </span>
            )}
          </div>

          {/* Price */}
          <p className={cn(
            'mt-6 font-heading text-4xl font-black tracking-tight md:text-5xl',
            isOut && 'text-muted-foreground line-through',
          )}>
            {item.price.toLocaleString('ru-RU')} ֏
          </p>

          {/* Sizes */}
          {item.sizes.length > 0 && (
            <div className="mt-8">
              <p className="mb-3 text-xs font-bold uppercase tracking-[.2em] text-muted-foreground">
                {t.productModal.sizes}
              </p>
              <div className="flex flex-wrap gap-2">
                {item.sizes.map((size) => (
                  <span
                    key={size}
                    className="flex h-10 min-w-[44px] items-center justify-center border border-border px-3 text-sm font-bold"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Buy button */}
          {!isOut ? (
            <a
              href={buyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 flex items-center justify-center gap-3 bg-primary px-6 py-4 text-sm font-bold uppercase tracking-widest text-primary-foreground transition-all hover:gap-4 hover:opacity-90"
            >
              <ShoppingBag className="size-5" />
              {t.productModal.wantToBuy}
              <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
            </a>
          ) : (
            <div className="mt-8 flex items-center justify-center border border-border px-6 py-4 text-sm font-bold uppercase tracking-widest text-muted-foreground">
              {t.catalog.stockOut}
            </div>
          )}

          {/* Link hint */}
          {item.link && !isOut && (
            <p className="mt-3 text-center text-xs text-muted-foreground">
              {t.productModal.viewOn} →
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
