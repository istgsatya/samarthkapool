import { useEffect, useMemo, useRef, useState } from 'react'

const SLOW_EFFECTIVE_TYPES = new Set(['slow-2g', '2g', '3g'])

const getConnection = () => {
	if (typeof navigator === 'undefined') return null
	return navigator.connection || navigator.mozConnection || navigator.webkitConnection || null
}

const isSlowConnection = () => {
	const connection = getConnection()
	if (!connection) return false

	if (connection.saveData) return true
	return SLOW_EFFECTIVE_TYPES.has(connection.effectiveType)
}

const NetworkAwareHeroMedia = ({
	className,
	mp4Src,
	webmSrc,
	posterSrc,
	alt = 'Resort view',
	trackIntersection = false,
}) => {
	const containerRef = useRef(null)
	const videoRef = useRef(null)
	const [usePoster, setUsePoster] = useState(() => isSlowConnection())
	const [isInView, setIsInView] = useState(false)
	const [shouldLoadVideo, setShouldLoadVideo] = useState(false)
	const [isVideoReady, setIsVideoReady] = useState(false)

	useEffect(() => {
		const connection = getConnection()
		const updateMode = () => setUsePoster(isSlowConnection())

		updateMode()

		if (!connection?.addEventListener) return undefined
		connection.addEventListener('change', updateMode)

		return () => {
			connection.removeEventListener('change', updateMode)
		}
	}, [])

	useEffect(() => {
		if (!mp4Src || usePoster) return undefined

		const target = containerRef.current
		if (!target) return undefined

		if (typeof IntersectionObserver === 'undefined') {
			setIsInView(true)
			return undefined
		}

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						setIsInView(true)
						observer.disconnect()
						break
					}
				}
			},
			{ threshold: 0.15 },
		)

		observer.observe(target)

		return () => observer.disconnect()
	}, [mp4Src, usePoster])

	useEffect(() => {
		if (!isInView || !mp4Src || usePoster) return
		setShouldLoadVideo(true)
	}, [isInView, mp4Src, usePoster])

	useEffect(() => {
		if (!shouldLoadVideo) return
		videoRef.current?.load()
	}, [shouldLoadVideo])

	useEffect(() => {
		if (!isVideoReady) return

		const node = videoRef.current
		if (!node) return

		node.dataset.bufferReady = 'true'

		const playPromise = node.play()
		if (playPromise?.catch) {
			playPromise.catch(() => {
				// noop: browsers may still block playback in rare cases.
			})
		}
	}, [isVideoReady])

	const resolvedWebmSrc = useMemo(() => {
		if (webmSrc) return webmSrc
		if (!mp4Src) return ''
		return mp4Src.replace(/\.mp4(\?.*)?$/i, '.webm$1')
	}, [mp4Src, webmSrc])

	if (!mp4Src) {
		if (!posterSrc) return null

		return (
			<img
				src={posterSrc}
				alt={alt}
				className={className}
				loading="lazy"
				decoding="async"
				sizes="100vw"
			/>
		)
	}

	if (usePoster && posterSrc) {
		return (
			<img
				src={posterSrc}
				alt={alt}
				className={className}
				loading="lazy"
				decoding="async"
				sizes="100vw"
			/>
		)
	}

	return (
		<div className={className}>
			<div ref={containerRef} className="relative h-full w-full">
				{posterSrc ? (
					<img
						src={posterSrc}
						alt={alt}
						className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
							isVideoReady ? 'opacity-0 pointer-events-none' : 'opacity-100'
						}`}
						loading="lazy"
						decoding="async"
						sizes="100vw"
					/>
				) : null}

				<video
					ref={videoRef}
					data-intersection-video={trackIntersection ? 'true' : undefined}
					data-buffer-ready={isVideoReady ? 'true' : 'false'}
					className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
						isVideoReady ? 'opacity-100' : 'opacity-0'
					}`}
					loop
					muted
					defaultMuted
					playsInline
					webkit-playsinline="true"
					x5-playsinline="true"
					disablePictureInPicture
					controlsList="nodownload noplaybackrate noremoteplayback"
					preload={shouldLoadVideo ? 'auto' : 'none'}
					poster={posterSrc || undefined}
					onCanPlayThrough={() => setIsVideoReady(true)}
				>
					{shouldLoadVideo ? <source src={resolvedWebmSrc} type="video/webm" /> : null}
					{shouldLoadVideo ? <source src={mp4Src} type="video/mp4" /> : null}
				</video>
			</div>
		</div>
	)
}

export default NetworkAwareHeroMedia
