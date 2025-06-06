import sharp from 'sharp'
import imagemin from 'imagemin'
import imageminWebp from 'imagemin-webp'
import { promises as fs } from 'fs'
import path from 'path'

interface ImageOptimizationOptions {
  quality?: number
  width?: number
  height?: number
  format?: 'webp' | 'jpeg' | 'png'
  progressive?: boolean
}

interface OptimizedImage {
  originalPath: string
  optimizedPath: string
  originalSize: number
  optimizedSize: number
  compressionRatio: number
  format: string
}

/**
 * Optimize a single image file
 */
export async function optimizeImage(
  inputPath: string,
  outputPath: string,
  options: ImageOptimizationOptions = {}
): Promise<OptimizedImage> {
  const {
    quality = 80,
    width,
    height,
    format = 'webp',
    progressive = true
  } = options

  try {
    // Get original file size
    const originalStats = await fs.stat(inputPath)
    const originalSize = originalStats.size

    // Create output directory if it doesn't exist
    const outputDir = path.dirname(outputPath)
    await fs.mkdir(outputDir, { recursive: true })

    let sharpInstance = sharp(inputPath)

    // Resize if dimensions are provided
    if (width || height) {
      sharpInstance = sharpInstance.resize(width, height, {
        fit: 'inside',
        withoutEnlargement: true
      })
    }

    // Apply format-specific optimizations
    switch (format) {
      case 'webp':
        sharpInstance = sharpInstance.webp({
          quality,
          effort: 6 // Maximum compression effort
        })
        break
      case 'jpeg':
        sharpInstance = sharpInstance.jpeg({
          quality,
          progressive,
          mozjpeg: true
        })
        break
      case 'png':
        sharpInstance = sharpInstance.png({
          quality,
          progressive,
          compressionLevel: 9
        })
        break
    }

    // Save optimized image
    await sharpInstance.toFile(outputPath)

    // Get optimized file size
    const optimizedStats = await fs.stat(outputPath)
    const optimizedSize = optimizedStats.size

    const compressionRatio = ((originalSize - optimizedSize) / originalSize) * 100

    return {
      originalPath: inputPath,
      optimizedPath: outputPath,
      originalSize,
      optimizedSize,
      compressionRatio,
      format
    }
  } catch (error) {
    console.error(`Error optimizing image ${inputPath}:`, error)
    throw error
  }
}

/**
 * Generate multiple sizes for responsive images
 */
export async function generateResponsiveImages(
  inputPath: string,
  outputDir: string,
  sizes: number[] = [320, 640, 768, 1024, 1280, 1920]
): Promise<OptimizedImage[]> {
  const results: OptimizedImage[] = []
  const fileName = path.parse(inputPath).name

  for (const size of sizes) {
    const outputPath = path.join(outputDir, `${fileName}-${size}w.webp`)

    try {
      const result = await optimizeImage(inputPath, outputPath, {
        width: size,
        format: 'webp',
        quality: 80
      })
      results.push(result)
    } catch (error) {
      console.error(`Error generating ${size}w version of ${inputPath}:`, error)
    }
  }

  return results
}

/**
 * Batch optimize images in a directory
 */
export async function optimizeImagesInDirectory(
  inputDir: string,
  outputDir: string,
  options: ImageOptimizationOptions = {}
): Promise<OptimizedImage[]> {
  const results: OptimizedImage[] = []
  const supportedExtensions = ['.jpg', '.jpeg', '.png', '.webp']

  try {
    const files = await fs.readdir(inputDir, { withFileTypes: true })

    for (const file of files) {
      if (file.isFile()) {
        const ext = path.extname(file.name).toLowerCase()

        if (supportedExtensions.includes(ext)) {
          const inputPath = path.join(inputDir, file.name)
          const outputFileName = path.parse(file.name).name + '.webp'
          const outputPath = path.join(outputDir, outputFileName)

          try {
            const result = await optimizeImage(inputPath, outputPath, {
              ...options,
              format: 'webp'
            })
            results.push(result)
          } catch (error) {
            console.error(`Error optimizing ${file.name}:`, error)
          }
        }
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${inputDir}:`, error)
    throw error
  }

  return results
}

/**
 * Create WebP versions with JPEG fallbacks
 */
export async function createWebPWithFallback(
  inputPath: string,
  outputDir: string,
  options: ImageOptimizationOptions = {}
): Promise<{ webp: OptimizedImage; fallback: OptimizedImage }> {
  const fileName = path.parse(inputPath).name

  // Create WebP version
  const webpPath = path.join(outputDir, `${fileName}.webp`)
  const webpResult = await optimizeImage(inputPath, webpPath, {
    ...options,
    format: 'webp'
  })

  // Create JPEG fallback
  const fallbackPath = path.join(outputDir, `${fileName}.jpg`)
  const fallbackResult = await optimizeImage(inputPath, fallbackPath, {
    ...options,
    format: 'jpeg'
  })

  return {
    webp: webpResult,
    fallback: fallbackResult
  }
}

/**
 * Generate srcset string for responsive images
 */
export function generateSrcSet(images: OptimizedImage[]): string {
  return images
    .map(img => {
      const width = path.parse(img.optimizedPath).name.match(/-(\d+)w$/)?.[1]
      return width ? `${img.optimizedPath} ${width}w` : img.optimizedPath
    })
    .join(', ')
}

/**
 * Get image metadata
 */
export async function getImageMetadata(imagePath: string) {
  try {
    const metadata = await sharp(imagePath).metadata()
    return {
      width: metadata.width,
      height: metadata.height,
      format: metadata.format,
      size: metadata.size,
      density: metadata.density,
      hasAlpha: metadata.hasAlpha,
      orientation: metadata.orientation
    }
  } catch (error) {
    console.error(`Error getting metadata for ${imagePath}:`, error)
    throw error
  }
}

/**
 * Validate image file
 */
export async function validateImage(imagePath: string): Promise<boolean> {
  try {
    await sharp(imagePath).metadata()
    return true
  } catch (error) {
    return false
  }
}

/**
 * Calculate total savings from optimization
 */
export function calculateSavings(results: OptimizedImage[]) {
  const totalOriginalSize = results.reduce((sum, result) => sum + result.originalSize, 0)
  const totalOptimizedSize = results.reduce((sum, result) => sum + result.optimizedSize, 0)
  const totalSavings = totalOriginalSize - totalOptimizedSize
  const averageCompressionRatio = totalSavings / totalOriginalSize * 100

  return {
    totalOriginalSize,
    totalOptimizedSize,
    totalSavings,
    averageCompressionRatio,
    filesProcessed: results.length
  }
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB']
  let size = bytes
  let unitIndex = 0

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024
    unitIndex++
  }

  return `${size.toFixed(1)} ${units[unitIndex]}`
}
