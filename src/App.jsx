import { Children, useEffect, useRef, useState } from 'react'

// ═══════════════════════════════════════════════════════════════════════════
// SITE CONFIG — Edit business links, copy, and media here
// ═══════════════════════════════════════════════════════════════════════════
const SITE_CONFIG = {
  brandName: 'Ý Nhi',
  tagline: 'Mâm Lễ Cưới - Hỏi hiện đại - Hoa tươi - Giỏ trái cây',
  slogan: 'MÂM NGÕ — bước đầu tiên cho một cái kết thật đẹp 🌸',
  intro:
    'Hãy để Ý Nhi đồng hành cùng bạn trong ngày trọng đại, biến lễ ăn hỏi trở nên hoàn hảo và đầy ý nghĩa.',
  highlights: [
    '🚚 Miễn phí giao hàng nội thành',
    '🎉 Mâm lễ cưới hỏi hiện đại — hoa tươi — trái cây cao cấp',
    '🌿 Inbox ngay để được tư vấn chi tiết hơn nhé!',
  ],
  address: 'Phạm Phú Thứ, Vĩnh Điện, Điện Bàn, Đà Nẵng',
  heroBanner: '/hero-banner.png',
  logo: '/gallery/ynhi-05.png',
  phone: 'tel:+84762585628',
  phone2: 'tel:+84934584639',
  phoneDisplay: '0762.585.628',
  phoneDisplay2: '0934.584.639',
  facebook: 'https://www.facebook.com/',
  tiktok: 'https://www.tiktok.com/@ynhi.mamquacuoihoi',
  zalo: 'https://zalo.me/0762585628',
  tiktokPosts: [
    'https://www.tiktok.com/@ynhi.mamquacuoihoi/photo/7557607805788769554',
    'https://www.tiktok.com/@ynhi.mamquacuoihoi/photo/7623025623258254612',
    'https://www.tiktok.com/@ynhi.mamquacuoihoi/photo/7553190523800980744',
    'https://www.tiktok.com/@ynhi.mamquacuoihoi/photo/7641161283001126165',
    'https://www.tiktok.com/@ynhi.mamquacuoihoi/photo/7639312532905200916',
    'https://www.tiktok.com/@ynhi.mamquacuoihoi/photo/7558450721838976263',
    'https://www.tiktok.com/@ynhi.mamquacuoihoi/photo/7556822710416936199',
  ],
}

/** Ảnh thực tế sản phẩm — thư mục public/gallery */
const GALLERY_IMAGES = Array.from({ length: 11 }, (_, i) => ({
  src: `/gallery/ynhi-${String(i + 1).padStart(2, '0')}.png`,
  alt: `Ý Nhi mâm lễ cưới hỏi ${i + 1}`,
}))

const SERVICES = [
  {
    title: 'Mâm Long Phụng',
    description: 'Mâm quả long phụng tinh xảo — biểu tượng hòa hợp, sung túc trong lễ cưới.',
    price: 'Liên hệ',
    image: '/gallery/ynhi-06.png',
  },
  {
    title: 'Mâm Trầu Cau',
    description: 'Mâm trầu cau truyền thống, trang trí hoa tươi cho lễ ăn hỏi, dạm ngõ.',
    price: 'Liên hệ',
    image: '/gallery/ynhi-07.png',
  },
  {
    title: 'Mâm Lễ Dạm Ngõ',
    description: 'Mâm quả đầy đủ, dưa hấu khắc tên cô dâu chú rể — lễ dạm ngõ trọn vẹn.',
    price: 'Liên hệ',
    image: '/gallery/ynhi-01.png',
  },
  {
    title: 'Mâm Quả Nghệ Thuật',
    description: 'Tỉa trái cây, hoa tươi cao cấp — phong cách hiện đại, sang trọng.',
    price: 'Liên hệ',
    image: '/gallery/ynhi-11.png',
  },
  {
    title: 'Mâm Rượu & Trà',
    description: 'Mâm rượu, trà, hộp quà cao cấp — phù hợp lễ vu quy, ăn hỏi.',
    price: 'Liên hệ',
    image: '/gallery/ynhi-09.png',
  },
  {
    title: 'Mâm Quà Cưới Hỏi',
    description: 'Giỏ quà, bánh kẹo, trái cây — bày biện tinh tế, giao tận nơi.',
    price: 'Liên hệ',
    image: '/gallery/ynhi-08.png',
  },
  {
    title: 'Bộ Mâm Lễ Đầy Đủ',
    description: 'Bộ mâm long phụng, trầu cau, quà — trọn bộ cho đám cưới.',
    price: 'Liên hệ',
    image: '/gallery/ynhi-05.png',
  },
  {
    title: 'Mâm Hoa Tươi Hiện Đại',
    description: 'Mâm hoa hồng, tone pastel hoặc trắng xanh — phong cách trẻ trung.',
    price: 'Liên hệ',
    image: '/gallery/ynhi-02.png',
  },
]

/** Ảnh dự phòng khi ảnh dịch vụ lỗi */
const SERVICE_IMAGE_FALLBACK = '/gallery/ynhi-01.png'

function prefersReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function extractTikTokVideoId(url) {
  const match = url.match(/video\/(\d+)/)
  return match ? match[1] : null
}

function extractTikTokPhotoId(url) {
  const match = url.match(/photo\/(\d+)/)
  return match ? match[1] : null
}

/** Tải TikTok embed.js một lần cho các bài photo */
function useTikTokEmbedScript() {
  useEffect(() => {
    if (document.querySelector('script[data-tiktok-embed]')) {
      window.tiktokEmbed?.lib?.render?.()
      return
    }
    const script = document.createElement('script')
    script.src = 'https://www.tiktok.com/embed.js'
    script.async = true
    script.dataset.tiktokEmbed = 'true'
    script.onload = () => window.tiktokEmbed?.lib?.render?.()
    document.body.appendChild(script)
  }, [])
}

// ─── Intersection-based section reveal (opacity + translateY) ──────────────
function useScrollReveal(options = {}) {
  const { threshold = 0.08, rootMargin = '0px 0px -32px 0px' } = options
  const ref = useRef(null)
  const [visible, setVisible] = useState(prefersReducedMotion())

  useEffect(() => {
    if (prefersReducedMotion()) {
      setVisible(true)
      return
    }
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return { ref, visible }
}

function RevealSection({ children, className = '', delay = 0, id }) {
  const { ref, visible } = useScrollReveal()
  const content = typeof children === 'function' ? children(visible) : children
  return (
    <section
      id={id}
      ref={ref}
      className={`will-change-transform motion-reduce:transform-none motion-reduce:opacity-100 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      } transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${className}`}
      style={prefersReducedMotion() ? undefined : { transitionDelay: `${delay}ms` }}
    >
      {content}
    </section>
  )
}

// ─── Staggered children when section becomes visible ───────────────────────
function RevealStagger({ visible, children, className = '', staggerMs = 70 }) {
  return (
    <div className={className}>
      {Children.map(children, (child, i) => (
        <div
          key={child?.key ?? i}
          className={`will-change-transform motion-reduce:transform-none motion-reduce:opacity-100 ${
            visible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
          } transition-all duration-500 ease-out motion-reduce:transition-none`}
          style={
            prefersReducedMotion() ? undefined : { transitionDelay: `${i * staggerMs}ms` }
          }
        >
          {child}
        </div>
      ))}
    </div>
  )
}

function SectionTitle({ children, subtitle }) {
  return (
    <div className="mb-5 text-center md:mb-6">
      <div className="glass-panel-strong mx-auto inline-block max-w-full px-5 py-3 shadow-md md:px-8 md:py-3.5">
        <h2 className="font-display text-2xl font-bold tracking-tight text-crimson md:text-3xl lg:text-4xl">
          {children}
        </h2>
        <div className="mx-auto mt-2.5 h-px w-20 bg-gradient-to-r from-transparent via-gold to-transparent md:mt-3 md:w-24" />
        {subtitle && (
          <p className="mt-2 text-xs text-stone-600 md:text-sm">{subtitle}</p>
        )}
      </div>
    </div>
  )
}

function IconMapPin() {
  return (
    <svg
      className="mt-0.5 h-4 w-4 shrink-0 text-gold md:h-5 md:w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  )
}

function IconPhone() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  )
}

function IconFacebook() {
  return (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

function IconTikTok() {
  return (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.77 1.52V6.76a4.85 4.85 0 01-1.01-.07z" />
    </svg>
  )
}

function IconZalo() {
  return (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M12 2C6.48 2 2 5.58 2 10c0 2.39 1.19 4.53 3.07 6.06L4 22l6.19-2.45C10.77 19.82 11.37 20 12 20c5.52 0 10-3.58 10-8s-4.48-8-10-8zm-1 11H8v-2h3V9h2v2h3v2h-3v2h-2v-2z" />
    </svg>
  )
}

// ─── Loading screen — lightweight CSS spin + brand ─────────────────────────
function LoadingOverlay({ show }) {
  if (!show) return null
  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-crimson-dark via-crimson to-crimson-dark transition-opacity duration-500"
      aria-hidden={!show}
      aria-busy="true"
    >
      <div className="relative flex h-24 w-24 items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-gold/20 animate-loader-spin motion-reduce:animate-none" />
        <div className="absolute inset-2 rounded-full border border-transparent border-t-gold/80 motion-reduce:animate-none" />
        <span className="font-display text-2xl font-bold text-gold md:text-3xl">YN</span>
      </div>
      <p className="mt-5 font-display text-base tracking-[0.2em] text-gold-light md:text-lg">
        Đang tải…
      </p>
    </div>
  )
}

// ─── TikTok photo embed (@ynhi.mamquacuoihoi) ─────────────────────────────
function TikTokPhotoEmbed({ url }) {
  const photoId = extractTikTokPhotoId(url)
  const videoId = extractTikTokVideoId(url)
  const containerRef = useRef(null)

  useTikTokEmbedScript()

  useEffect(() => {
    const t = setTimeout(() => window.tiktokEmbed?.lib?.render?.(containerRef.current), 400)
    return () => clearTimeout(t)
  }, [url])

  if (videoId) {
    return (
      <div className="group relative overflow-hidden rounded-2xl border border-gold/25 bg-black/90 shadow-lg transition duration-500 hover:scale-[1.02] hover:border-gold/60 motion-reduce:hover:scale-100">
        <iframe
          src={`https://www.tiktok.com/embed/v2/${videoId}`}
          title="TikTok"
          className="aspect-[9/16] w-full min-h-[280px] max-h-[min(72vh,520px)] border-0"
          allowFullScreen
          loading="lazy"
        />
      </div>
    )
  }

  if (!photoId) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-[200px] flex-col items-center justify-center gap-2 rounded-2xl border border-gold/30 bg-gradient-to-br from-crimson/10 to-gold/10 p-6 text-center transition hover:border-gold hover:shadow-lg"
      >
        <span className="text-2xl">♪</span>
        <span className="text-sm font-semibold text-crimson">Xem trên TikTok</span>
      </a>
    )
  }

  return (
    <div
      ref={containerRef}
      className="group flex min-h-[320px] items-center justify-center overflow-hidden rounded-2xl border border-gold/25 bg-stone-900/5 p-2 shadow-lg transition duration-500 hover:border-gold/50 hover:shadow-xl hover:shadow-gold/10 motion-reduce:hover:scale-100 sm:min-h-[360px]"
    >
      <blockquote className="tiktok-embed mx-auto w-full max-w-[325px]" cite={url} data-video-id={photoId}>
        <section>
          <a href={url} target="_blank" rel="noopener noreferrer">
            @ynhi.mamquacuoihoi
          </a>
        </section>
      </blockquote>
    </div>
  )
}

function GallerySection({ images }) {
  const [lightbox, setLightbox] = useState(null)

  return (
    <>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:gap-4 lg:grid-cols-4">
        {images.map((img, index) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setLightbox(index)}
            className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-gold/20 bg-stone-900 shadow-md transition duration-300 hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-xl motion-reduce:hover:translate-y-0 sm:rounded-2xl"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105 motion-reduce:group-hover:scale-100"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-crimson-dark/50 via-transparent to-transparent opacity-60 transition group-hover:opacity-80" />
            <span className="absolute bottom-2 right-2 rounded-full bg-black/40 px-2 py-0.5 text-[10px] text-white backdrop-blur-sm">
              {index + 1}/{images.length}
            </span>
          </button>
        ))}
      </div>

      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Xem ảnh phóng to"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            onClick={() => setLightbox(null)}
            aria-label="Đóng"
          >
            ✕
          </button>
          <button
            type="button"
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 sm:left-4"
            onClick={(e) => {
              e.stopPropagation()
              setLightbox((i) => (i > 0 ? i - 1 : images.length - 1))
            }}
            aria-label="Ảnh trước"
          >
            ‹
          </button>
          <img
            src={images[lightbox].src}
            alt={images[lightbox].alt}
            className="max-h-[85vh] max-w-full rounded-lg object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 sm:right-4"
            onClick={(e) => {
              e.stopPropagation()
              setLightbox((i) => (i < images.length - 1 ? i + 1 : 0))
            }}
            aria-label="Ảnh sau"
          >
            ›
          </button>
        </div>
      )}
    </>
  )
}

// ─── Service card: shine border, lift, image zoom ───────────────────────────
function ServiceCard({ service, onContact }) {
  const fallback = service.fallbackImage ?? SERVICE_IMAGE_FALLBACK
  const [imgSrc, setImgSrc] = useState(service.image)

  const handleImageError = () => {
    if (imgSrc !== fallback) setImgSrc(fallback)
  }

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-gold/20 bg-white/90 shadow-lg shadow-red-900/8 backdrop-blur-sm transition duration-500 ease-out will-change-transform hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-2xl hover:shadow-red-900/12 motion-reduce:hover:translate-y-0">
      <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-r from-transparent via-gold/40 to-transparent bg-[length:200%_100%] opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-safe:group-hover:animate-border-shine" />
      <div className="relative h-40 overflow-hidden bg-gradient-to-br from-crimson/15 via-stone-200 to-gold/20 sm:h-44 md:h-48">
        <img
          src={imgSrc}
          alt={service.title}
          onError={handleImageError}
          className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.08] motion-reduce:group-hover:scale-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-crimson-dark/70 via-crimson-dark/15 to-transparent" />
        <span className="absolute bottom-2.5 left-2.5 rounded-full border border-gold/40 bg-gold/95 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-crimson-dark shadow-sm backdrop-blur-sm sm:text-xs">
          {service.price}
        </span>
      </div>
      <div className="relative p-4 sm:p-5">
        <h3 className="font-display text-lg font-semibold leading-snug text-crimson sm:text-xl">
          {service.title}
        </h3>
        <p className="mt-1.5 text-xs leading-relaxed text-stone-600 sm:text-sm">
          {service.description}
        </p>
        <button
          type="button"
          onClick={onContact}
          className="group/btn relative mt-3 w-full overflow-hidden rounded-xl bg-gradient-to-r from-crimson via-crimson-light to-crimson bg-[length:200%_100%] py-2.5 text-sm font-semibold text-gold-light shadow-md transition duration-300 hover:bg-[position:100%_0] hover:shadow-lg active:scale-[0.98] motion-reduce:hover:bg-gradient-to-r sm:mt-4 sm:py-3"
        >
          <span className="relative z-10">Liên hệ ngay</span>
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition duration-500 group-hover/btn:translate-x-full motion-reduce:hidden" />
        </button>
      </div>
    </article>
  )
}

function ContactButton({ href, label, icon, external = true }) {
  const props = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}

  return (
    <a
      href={href}
      {...props}
      className="group relative flex flex-col items-center justify-center gap-1.5 overflow-hidden rounded-2xl border border-gold/25 bg-white/75 p-4 shadow-md backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-gold/50 hover:bg-white/95 hover:shadow-xl hover:shadow-gold/10 active:scale-[0.98] motion-reduce:hover:translate-y-0 sm:gap-2 sm:p-5"
    >
      <span className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-crimson/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-cream to-stone-100 shadow-inner transition duration-300 group-hover:scale-110 group-hover:shadow-md motion-reduce:group-hover:scale-100 sm:h-12 sm:w-12">
        {icon}
      </span>
      <span className="relative text-xs font-semibold text-crimson sm:text-sm">{label}</span>
    </a>
  )
}

function scrollToContact() {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
}

function scrollToServices() {
  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
}

function scrollToGallery() {
  document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })
}

function scrollToTiktok() {
  document.getElementById('tiktok')?.scrollIntoView({ behavior: 'smooth' })
}

// ─── Hero parallax: rAF-throttled, disabled if reduced motion ───────────────
function useHeroParallax(heroRef) {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion()) return

    let raf = 0
    const update = () => {
      const el = heroRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight || 1
      const progress = Math.max(0, Math.min(1, 1 - rect.bottom / (rect.height + vh * 0.5)))
      setOffset(progress * 48)
    }

    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    update()
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [heroRef])

  return prefersReducedMotion() ? 0 : offset
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const year = new Date().getFullYear()
  const heroRef = useRef(null)
  const parallaxY = useHeroParallax(heroRef)

  useEffect(() => {
    const hide = () => setLoading(false)
    const onLoad = () => setTimeout(hide, 900)
    if (document.readyState === 'complete') {
      const t = setTimeout(hide, 900)
      return () => clearTimeout(t)
    }
    window.addEventListener('load', onLoad)
    const fallback = setTimeout(hide, 2200)
    return () => {
      window.removeEventListener('load', onLoad)
      clearTimeout(fallback)
    }
  }, [])

  return (
    <>
      <div className="ambient-bg" aria-hidden />

      <LoadingOverlay show={loading} />

      <div
        className={`relative min-h-screen transition-opacity duration-500 motion-reduce:opacity-100 ${
          loading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {/* ─── HERO: parallax banner + glass intro + CTA ───────────────────── */}
        <header ref={heroRef} className="relative overflow-hidden">
          <div className="relative min-h-[min(88vh,640px)] sm:min-h-[min(85vh,680px)] md:min-h-[min(82vh,720px)] lg:min-h-[560px] lg:max-h-[min(90vh,820px)]">
            <div
              className="absolute inset-0 scale-110 bg-cover bg-center will-change-transform motion-reduce:scale-100 motion-reduce:transform-none"
              style={{
                backgroundImage: `url(${SITE_CONFIG.heroBanner})`,
                transform: `translate3d(0, ${parallaxY * 0.35}px, 0) scale(1.08)`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-crimson-dark/95" />
            <div
              className="absolute inset-0 opacity-40 motion-reduce:animate-none md:opacity-50"
              style={{
                background:
                  'linear-gradient(120deg, rgba(212,175,55,0.15) 0%, transparent 40%, rgba(127,29,29,0.25) 70%, transparent 100%)',
                backgroundSize: '200% 200%',
                animation: prefersReducedMotion() ? undefined : 'gradient-shift 12s ease infinite',
              }}
            />

            <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 pb-8 pt-8 text-center sm:px-6 sm:pb-10 sm:pt-10 md:px-8 md:pb-12 md:pt-14 lg:pt-16">
              <div className="relative mb-4 animate-float-gentle motion-reduce:animate-none sm:mb-5">
                <div className="absolute -inset-2 rounded-full bg-gold/30 blur-xl motion-reduce:blur-none" />
                <div className="absolute -inset-1 animate-pulse-soft rounded-full bg-gold/35 blur-md motion-reduce:animate-none" />
                <img
                  src={SITE_CONFIG.logo}
                  alt={`${SITE_CONFIG.brandName} logo`}
                  className="relative h-24 w-24 rounded-full border-[3px] border-gold object-cover shadow-2xl ring-2 ring-gold/30 sm:h-28 sm:w-28 md:h-32 md:w-32 lg:h-36 lg:w-36"
                />
              </div>

              <div className="glass-panel max-w-xl rounded-3xl px-5 py-5 sm:max-w-2xl sm:px-8 sm:py-6 md:max-w-3xl lg:max-w-4xl">
                <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-gold md:text-xs">
                  {SITE_CONFIG.tagline}
                </p>
                <h1 className="mt-2 font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                  {SITE_CONFIG.brandName}
                </h1>
                <p className="mx-auto mt-2 max-w-2xl font-display text-base italic leading-snug text-gold-light sm:text-lg md:text-xl">
                  {SITE_CONFIG.slogan}
                </p>
                <p className="mx-auto mt-3 max-w-2xl text-xs leading-relaxed text-stone-200/95 sm:text-sm md:text-base">
                  {SITE_CONFIG.intro}
                </p>
                <ul className="mx-auto mt-4 max-w-xl space-y-1.5 text-left text-xs text-stone-200/90 sm:text-sm">
                  {SITE_CONFIG.highlights.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
                <div className="mx-auto mt-4 flex max-w-xl flex-col items-center gap-1 text-xs text-stone-300 sm:text-sm">
                  <div className="flex items-start justify-center gap-2">
                    <IconMapPin />
                    <span>{SITE_CONFIG.address}</span>
                  </div>
                  <p>
                    <a href={SITE_CONFIG.phone} className="font-semibold text-gold-light hover:text-gold">
                      📞 {SITE_CONFIG.phoneDisplay}
                    </a>
                    {' · '}
                    <a href={SITE_CONFIG.phone2} className="font-semibold text-gold-light hover:text-gold">
                      {SITE_CONFIG.phoneDisplay2}
                    </a>
                  </p>
                </div>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={scrollToServices}
                    className="rounded-full border border-gold/50 bg-gold/15 px-4 py-2.5 text-xs font-semibold text-gold-light backdrop-blur-sm transition hover:bg-gold/25 hover:shadow-lg hover:shadow-gold/20 sm:px-5 sm:text-sm"
                  >
                    Dịch vụ
                  </button>
                  <button
                    type="button"
                    onClick={scrollToGallery}
                    className="rounded-full border border-gold/50 bg-gold/15 px-4 py-2.5 text-xs font-semibold text-gold-light backdrop-blur-sm transition hover:bg-gold/25 sm:px-5 sm:text-sm"
                  >
                    Hình ảnh
                  </button>
                  <button
                    type="button"
                    onClick={scrollToContact}
                    className="rounded-full bg-gradient-to-r from-gold to-gold-dark px-4 py-2.5 text-xs font-semibold text-crimson-dark shadow-lg transition hover:brightness-110 hover:shadow-xl active:scale-[0.98] sm:px-5 sm:text-sm"
                  >
                    Liên hệ
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center pb-1 pt-0">
            <button
              type="button"
              onClick={scrollToServices}
              className="rounded-full p-2 text-gold/80 transition hover:text-gold motion-reduce:animate-none"
              aria-label="Scroll to services"
            >
              <div className="flex h-8 w-5 items-start justify-center rounded-full border-2 border-gold/50 p-1.5">
                <div className="h-1.5 w-1 animate-bounce rounded-full bg-gold motion-reduce:animate-none" />
              </div>
            </button>
          </div>
        </header>

        {/* ─── MAIN: capped width on large screens, responsive grids ───────── */}
        <main className="mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-8 lg:px-10">
          {/* Services — staggered card reveal tied to section visibility */}
          <RevealSection id="services" className="scroll-mt-6 py-7 md:py-9 lg:py-10">
            {(visible) => (
              <>
                <SectionTitle subtitle="Mâm lễ cưới hỏi — hoa tươi — trái cây cao cấp">
                  Dịch Vụ Mâm Cưới
                </SectionTitle>
                <RevealStagger
                  visible={visible}
                  staggerMs={60}
                  className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4 md:gap-5 lg:grid-cols-3 lg:gap-6"
                >
                  {SERVICES.map((service) => (
                    <ServiceCard
                      key={service.title}
                      service={service}
                      onContact={scrollToContact}
                    />
                  ))}
                </RevealStagger>
              </>
            )}
          </RevealSection>

          {/* Gallery — ảnh sản phẩm thực tế */}
          <RevealSection id="gallery" className="scroll-mt-6 py-7 md:py-9 lg:py-10" delay={60}>
            <SectionTitle subtitle="Mâm lễ cưới hỏi do Ý Nhi thực hiện">
              Hình Ảnh Sản Phẩm
            </SectionTitle>
            <GallerySection images={GALLERY_IMAGES} />
          </RevealSection>

          {/* TikTok — bài đăng @ynhi.mamquacuoihoi */}
          <RevealSection id="tiktok" className="scroll-mt-6 py-7 md:py-9 lg:py-10" delay={80}>
            <SectionTitle subtitle="@ynhi.mamquacuoihoi trên TikTok">
              TikTok Ý Nhi
            </SectionTitle>

            <div className="scrollbar-hide -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3 lg:gap-5">
              {SITE_CONFIG.tiktokPosts.map((url) => (
                <div
                  key={url}
                  className="w-[min(88vw,340px)] shrink-0 snap-center sm:w-auto"
                >
                  <TikTokPhotoEmbed url={url} />
                </div>
              ))}
            </div>

            <p className="mt-4 text-center">
              <a
                href={SITE_CONFIG.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-crimson underline decoration-gold/50 underline-offset-2 hover:text-crimson-light"
              >
                Theo dõi @ynhi.mamquacuoihoi trên TikTok →
              </a>
            </p>
          </RevealSection>

          {/* Contact */}
          <RevealSection id="contact" className="scroll-mt-6 py-7 md:py-9 lg:py-10" delay={120}>
            <SectionTitle subtitle="Inbox hoặc gọi để được tư vấn miễn phí">
              Liên Hệ
            </SectionTitle>

            <div className="mx-auto grid max-w-3xl grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-4 md:gap-4">
              <ContactButton
                href={SITE_CONFIG.facebook}
                label="Facebook"
                icon={<span className="text-[#1877F2]"><IconFacebook /></span>}
              />
              <ContactButton
                href={SITE_CONFIG.tiktok}
                label="TikTok"
                icon={<span className="text-stone-900"><IconTikTok /></span>}
              />
              <ContactButton
                href={SITE_CONFIG.phone}
                label="Call Now"
                icon={<span className="text-crimson"><IconPhone /></span>}
                external={false}
              />
              <ContactButton
                href={SITE_CONFIG.zalo}
                label="Zalo"
                icon={<span className="text-[#0068FF]"><IconZalo /></span>}
              />
            </div>

            <p className="mt-4 text-center text-xs text-stone-600 sm:text-sm">
              ☎️{' '}
              <a
                href={SITE_CONFIG.phone}
                className="font-semibold text-crimson underline decoration-gold/60 underline-offset-2 transition hover:text-crimson-light"
              >
                {SITE_CONFIG.phoneDisplay}
              </a>
              {' · '}
              <a
                href={SITE_CONFIG.phone2}
                className="font-semibold text-crimson underline decoration-gold/60 underline-offset-2 transition hover:text-crimson-light"
              >
                {SITE_CONFIG.phoneDisplay2}
              </a>
            </p>
            <p className="mt-2 text-center text-xs text-stone-500">{SITE_CONFIG.address}</p>
          </RevealSection>
        </main>

        {/* ─── FOOTER ──────────────────────────────────────────────────────── */}
        <footer className="mt-2 border-t border-gold/25 bg-gradient-to-b from-crimson-dark to-black px-4 py-7 text-center text-stone-300 sm:py-8 md:py-9">
          <div className="mx-auto max-w-4xl">
            <p className="font-display text-lg font-semibold text-gold-light sm:text-xl">
              {SITE_CONFIG.brandName}
            </p>
            <p className="mt-1.5 text-xs sm:text-sm">{SITE_CONFIG.address}</p>
            <p className="mt-1 text-xs sm:text-sm">
              <a href={SITE_CONFIG.phone} className="transition hover:text-gold">
                {SITE_CONFIG.phoneDisplay}
              </a>
              {' · '}
              <a href={SITE_CONFIG.phone2} className="transition hover:text-gold">
                {SITE_CONFIG.phoneDisplay2}
              </a>
            </p>

            <div className="mt-5 flex justify-center gap-3 sm:gap-4">
              {[
                [SITE_CONFIG.facebook, 'Facebook', <IconFacebook key="f" />],
                [SITE_CONFIG.tiktok, 'TikTok', <IconTikTok key="t" />],
                [SITE_CONFIG.zalo, 'Zalo', <IconZalo key="z" />],
              ].map(([href, label, icon]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/10 bg-white/5 p-2.5 text-gold transition hover:-translate-y-0.5 hover:border-gold/40 hover:bg-gold/15 hover:text-gold-light motion-reduce:hover:translate-y-0 sm:p-3"
                  aria-label={label}
                >
                  {icon}
                </a>
              ))}
            </div>

            <p className="mt-6 text-[11px] text-stone-500 sm:text-xs">
              © {year} {SITE_CONFIG.brandName}. All rights reserved.
            </p>
          </div>
        </footer>

        {/* ─── Floating contact FAB: pulse rings + safe area ─────────────────── */}
        <button
          type="button"
          onClick={scrollToContact}
          className="fixed bottom-5 right-5 z-50 flex h-14 w-14 animate-fab-enter items-center justify-center rounded-full bg-gradient-to-br from-gold via-gold-light to-gold-dark text-crimson-dark shadow-lg shadow-gold/35 transition hover:scale-110 hover:shadow-2xl hover:shadow-gold/30 active:scale-95 motion-reduce:hover:scale-100 sm:bottom-6 sm:right-6 md:h-16 md:w-16"
          style={{ marginBottom: 'max(0px, env(safe-area-inset-bottom))' }}
          aria-label="Contact us"
        >
          <span className="absolute inset-0 rounded-full border-2 border-gold-light/40 motion-reduce:animate-none" />
          <span
            className="absolute inset-0 rounded-full border border-gold-light/60 motion-safe:animate-fab-ring"
            aria-hidden
          />
          <span className="relative drop-shadow-sm">
            <IconPhone />
          </span>
        </button>
      </div>
    </>
  )
}
