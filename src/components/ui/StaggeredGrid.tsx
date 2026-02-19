'use client'
import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import imagesLoaded from 'imagesloaded'
import { cn } from '@/lib/utils'
import { Github, Slack, Twitter, Youtube, Linkedin, Mail } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export interface BentoItem {
  id: number | string
  title: string
  subtitle: string
  description: string
  icon: React.ReactNode
  content?: React.ReactNode
  image?: string
    color?: string
}

export interface StaggeredGridProps {
    images: string[]
    bentoItems: BentoItem[]
    centerText?: string
    credits?: {
            madeBy: { text: string; href: string }
            moreDemos: { text: string; href: string }
    }
    className?: string
    showFooter?: boolean
    gridIcons?: React.ReactNode[]
}

const DEFAULT_GRID_ICONS: React.ReactNode[] = [
    <Github size={20} key="gh" />,
    <Youtube size={20} key="yt" />,
    <Linkedin size={20} key="li" />,
    <Mail size={20} key="mail" />,
];

export function StaggeredGrid({
  images,
  bentoItems,
  centerText = "Anbu",
  className,
    gridIcons,
}: StaggeredGridProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const gridFullRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const [activeBento, setActiveBento] = useState<number>(0);

  const splitText = (text: string) => {
      return text.split('').map((char, i) => (
          <span key={i} className="char inline-block" style={{ willChange: 'transform' }}>
              {char === ' ' ? '\u00A0' : char}
          </span>
      ))
  }

  useEffect(() => {
      const handleLoad = () => {
          setIsLoaded(true)
      }
      const elements = document.querySelectorAll('.grid__item-img');
      if (elements.length > 0) {
        imagesLoaded(elements, { background: true }, handleLoad)
      } else {
        setIsLoaded(true)
      }
  }, [])

  useEffect(() => {
      if (!isLoaded) return

      if (textRef.current) {
          const chars = textRef.current.querySelectorAll('.char')
          gsap.timeline({
              scrollTrigger: {
                  trigger: textRef.current,
                  start: 'top bottom',
                  end: 'center center-=25%',
                  scrub: 1,
              }
          }).from(chars, {
              ease: 'sine.out',
              yPercent: 300,
              autoAlpha: 0,
              stagger: { each: 0.05, from: 'center' }
          })
      }

      if (gridFullRef.current) {
          const gridFullItems = gridFullRef.current.querySelectorAll('.grid__item')
          const numColumns = 7;
          const middleColumnIndex = 3;

          const columns: Element[][] = Array.from({ length: numColumns }, () => [])
          gridFullItems.forEach((item: any, index: number) => {
              columns[index % numColumns].push(item)
          })

          columns.forEach((columnItems, columnIndex) => {
              const delayFactor = Math.abs(columnIndex - middleColumnIndex) * 0.2
              gsap.timeline({
                  scrollTrigger: {
                      trigger: gridFullRef.current,
                      start: 'top bottom',
                      end: 'center center',
                      scrub: 1.5,
                  }
              })
              .from(columnItems, {
                  yPercent: 450,
                  autoAlpha: 0,
                  delay: delayFactor,
                  ease: 'sine.out',
              })
              .from(columnItems.map(item => item.querySelector('.grid__item-img')), {
                  transformOrigin: '50% 0%',
                  ease: 'sine.out',
              }, 0)
          })
      }
  }, [isLoaded])

  const mixedGridItems: (string | 'BENTO_GROUP')[] = Array(35).fill('').map((_, i) => i === 16 ? 'BENTO_GROUP' : 'ITEM');

  return (
      <div className={cn("relative overflow-hidden w-full bg-void py-20", className)}>
          <section className="grid place-items-center w-full relative mb-10">
              <div ref={textRef} className="font-serif-display font-bold uppercase flex content-center text-[clamp(4rem,15vw,12rem)] leading-[0.7] text-stark/10">
                  {splitText(centerText)}
              </div>
          </section>

          <section className="grid place-items-center w-full relative">
              <div ref={gridFullRef} className="grid--full relative w-full max-w-7xl mx-auto p-4 grid gap-4 grid-cols-7 grid-rows-5 aspect-[1.1]">
                  {mixedGridItems.map((item, i) => {
                      if (item === 'BENTO_GROUP') {
                          return (
                              <div key="bento-group" className="grid__item bento-container col-span-3 row-span-1 relative z-20 flex items-center justify-center gap-2 h-full w-full">
                                  {bentoItems.map((bentoItem, index) => {
                                      const isActive = activeBento === index;
                                      return (
                                          <div
                                              key={bentoItem.id}
                                              className={cn(
                                                  "relative cursor-pointer overflow-hidden rounded-2xl h-full transition-all duration-700 ease-in-out border border-white/5",
                                                  isActive ? "bg-neon/10 shadow-[0_0_30px_rgba(0,255,148,0.1)] border-neon/20" : "bg-white/[0.02]"
                                              )}
                                              style={{ width: isActive ? "60%" : "20%" }}
                                              onMouseEnter={() => setActiveBento(index)}
                                          >
                                              <div className="relative z-10 w-full h-full flex flex-col p-4">
                                                  <div className={cn(
                                                      "absolute inset-0 flex flex-col justify-end p-4 transition-all duration-500",
                                                      isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                                                  )}>
                                                      <h3 className="text-xs font-bold text-stark uppercase tracking-widest">{bentoItem.title}</h3>
                                                      <p className="text-[10px] text-stark-dim mt-1 line-clamp-2">{bentoItem.description}</p>
                                                  </div>
                                                  <div className={cn(
                                                      "absolute inset-0 flex items-center justify-center transition-all duration-500",
                                                      isActive ? "opacity-0 scale-90" : "opacity-100 scale-100"
                                                  )}>
                                                      <div className="text-neon/40">{bentoItem.icon}</div>
                                                  </div>
                                              </div>
                                          </div>
                                      )
                                  })}
                              </div>
                          )
                      }
                      if (i === 17 || i === 18) return null;
                      const iconPool = (gridIcons && gridIcons.length > 0) ? gridIcons : DEFAULT_GRID_ICONS;
                      const IconEl = iconPool[i % iconPool.length];
                      return (
                          <figure key={`img-${i}`} className="grid__item m-0 relative z-10 will-change-transform group">
                              <div className="grid__item-img w-full h-full rounded-xl overflow-hidden border border-white/5 bg-white/[0.02] flex items-center justify-center transition-all duration-500 group-hover:bg-neon/5 group-hover:border-neon/20">
                                  <span className="text-stark/10 group-hover:text-neon transition-colors duration-300">
                                    {IconEl}
                                  </span>
                              </div>
                          </figure>
                      )
                  })}
              </div>
          </section>
      </div>
  )
}
