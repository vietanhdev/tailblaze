import ExportedImage from 'next-image-export-optimizer'
import { ComponentProps } from 'react'
import { StaticImageData } from 'next/image'

type Props = ComponentProps<typeof ExportedImage>

// Enhanced Image component that ensures proper CLS handling
const Image = ({ src, ...rest }: Props) => {
  // Handle case where src is an object by converting to string
  let processedSrc = src

  if (typeof src === 'object' && src !== null) {
    // Handle imported images or other objects
    if ('src' in src) {
      processedSrc = (src as StaticImageData).src
    } else {
      // Fallback to string representation
      processedSrc = String(src)
    }
  }

  return (
    <ExportedImage
      placeholder="blur"
      blurDataURL="/images/SVG-placeholder.png"
      src={processedSrc}
      {...rest}
    />
  )
}

export default Image
