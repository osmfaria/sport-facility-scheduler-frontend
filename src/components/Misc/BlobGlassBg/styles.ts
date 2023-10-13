import { Properties } from 'csstype'

export const boxStyles = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(250, 250, 250, 0.2)',
  WebkitBackdropFilter: 'blur(50px)',
  backdropFilter: 'blur(50px)',
  zIndex: '-10',
}

export const blobStyles: CustomCSSProperties = {
  zIndex: '-20',
  opacity: '0.7',
  position: 'absolute',
  top: '-20%',
  right: '-20%',
}

type CustomCSSProperties = {
  zIndex: number | string
  opacity: number | string
  position: Properties['position']
  top: number | string
  right: number | string
}
