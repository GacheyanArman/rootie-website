'use client'

import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'
import type { CatalogItem } from '@/lib/catalog'
import { LINKS } from '@/lib/links'
import { cn } from '@/lib/utils'

export function CatalogGrid({ items }: { items: CatalogItem[] }) {
  const { t } = useLanguage()

  if (items.length === 0) {
    return (
      <div className="mt-16 border-y border-border py-16 text-center md:mt-24">
        <p className="font-heading text-2xl font-black uppercase tracking-tight md:text-4xl">{t.catalog.fallback}</p>
        <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary underline underline-offset-4">
          Instagram <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
    )
  }

  return (
    <div className="mt-16 flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 md:mt-24 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {items.map((item, index) => {
        const isOut = item.stock === 'out'

        return (
          <a
            key={`${item.name}-${index}`}
            href={isOut ? undefined : LINKS.instagram}
            target={isOut ? undefined : '_blank'}
            rel={isOut ? undefined : 'noopener noreferrer'}
            aria-disabled={isOut || undefined}
            className={cn(
              'group relative flex shrink-0 flex-col snap-center w-[85vw] sm:w-[45vw] md:w-[400px]',
              isOut && 'pointer-events-none opacity-50',
            )}
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-card">
              <Image
                src={item.image}
                alt={item.name}
                fill
                unoptimized
                sizes="(min-width: 768px) 400px, 85vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <span className="absolute left-4 top-4 bg-background/85 px-3 py-2 text-xs font-bold uppercase tracking-widest backdrop-blur">{String(index + 1).padStart(2, '0')}</span>
              {!isOut && <span className="absolute bottom-4 right-4 flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 group-hover:rotate-45"><ArrowUpRight aria-hidden="true" /></span>}
            </div>
            <div className="flex flex-1 items-start justify-between gap-4 border-b border-border py-5">
              <div className="flex min-w-0 flex-col gap-2">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-heading text-2xl font-black uppercase tracking-tight md:text-3xl">{item.name}</h3>
                  {item.stock === 'low' && <span className="inline-flex items-center gap-2 text-xs text-muted-foreground"><span className="size-1.5 rounded-full bg-muted-foreground" />{t.catalog.stockLow}</span>}
                  {isOut && <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{t.catalog.stockOut}</span>}
                </div>
                {item.category && <p className="text-sm uppercase tracking-widest text-muted-foreground">{item.category}</p>}
                {item.sizes.length > 0 && <p className="text-sm text-muted-foreground">{item.sizes.join(' · ')}</p>}
              </div>
              <p className={cn('shrink-0 pt-2 text-sm font-bold', isOut && 'line-through')}>{item.price.toLocaleString('ru-RU')} ֏</p>
            </div>
          </a>
        )
      })}
    </div>
  )
}
