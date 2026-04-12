import { useEffect, useMemo, useState } from 'react'

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
	const [usePoster, setUsePoster] = useState(() => isSlowConnection())

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
		<video
			data-intersection-video={trackIntersection ? 'true' : undefined}
			className={className}
			autoPlay
			loop
			muted
			defaultMuted
			playsInline
			webkit-playsinline="true"
			x5-playsinline="true"
			disablePictureInPicture
			controlsList="nodownload noplaybackrate noremoteplayback"
			preload="auto"
			poster={posterSrc || undefined}
		>
			<source src={resolvedWebmSrc} type="video/webm" />
			<source src={mp4Src} type="video/mp4" />
		</video>
	)
}

export default NetworkAwareHeroMedia
