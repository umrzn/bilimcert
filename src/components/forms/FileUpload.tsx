'use client'

import { useState, useRef, useCallback } from 'react'
import { Upload, FileText, X, CheckCircle, AlertCircle, RotateCcw } from 'lucide-react'
import { TranslatedText } from '@/components/ui/TranslatedText'

export interface UploadedFile {
  id: string
  file: File
  status: 'uploading' | 'success' | 'error'
  progress: number
  error?: string
}

interface FileUploadProps {
  onFilesChange: (files: UploadedFile[]) => void
  acceptedTypes?: string[]
  maxFileSize?: number // in MB
  maxFiles?: number
  multiple?: boolean
  required?: boolean
  error?: string
  className?: string
  dragAndDropText?: string
  supportedFormatsText?: string
  requiredDocuments?: Array<{
    name: string
    description?: string
  }>
}

export function FileUpload({
  onFilesChange,
  acceptedTypes = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'],
  maxFileSize = 10,
  maxFiles = 10,
  multiple = true,
  required = false,
  error,
  className = '',
  dragAndDropText,
  supportedFormatsText,
  requiredDocuments
}: FileUploadProps) {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const generateFileId = () => Math.random().toString(36).substr(2, 9)

  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > maxFileSize * 1024 * 1024) {
      return `File size must be less than ${maxFileSize}MB`
    }

    // Check file type
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()
    if (!acceptedTypes.includes(fileExtension)) {
      return `Invalid file type. Allowed types: ${acceptedTypes.join(', ')}`
    }

    return null
  }

  const simulateUpload = (fileId: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      let progress = 0
      const interval = setInterval(() => {
        progress += Math.random() * 30
        if (progress >= 100) {
          progress = 100
          clearInterval(interval)

          // Simulate random success/failure (90% success rate)
          if (Math.random() > 0.1) {
            setFiles(prev => prev.map(f =>
              f.id === fileId
                ? { ...f, status: 'success', progress: 100 }
                : f
            ))
            resolve()
          } else {
            setFiles(prev => prev.map(f =>
              f.id === fileId
                ? { ...f, status: 'error', progress: 0, error: 'Upload failed. Please try again.' }
                : f
            ))
            reject(new Error('Upload failed'))
          }
        } else {
          setFiles(prev => prev.map(f =>
            f.id === fileId
              ? { ...f, progress }
              : f
          ))
        }
      }, 200)
    })
  }

  const handleFiles = useCallback(async (fileList: FileList) => {
    const newFiles: UploadedFile[] = []

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i]
      const validationError = validateFile(file)

      if (validationError) {
        // Show error for invalid file
        const errorFile: UploadedFile = {
          id: generateFileId(),
          file,
          status: 'error',
          progress: 0,
          error: validationError
        }
        newFiles.push(errorFile)
      } else {
        // Add valid file for upload
        const uploadFile: UploadedFile = {
          id: generateFileId(),
          file,
          status: 'uploading',
          progress: 0
        }
        newFiles.push(uploadFile)
      }
    }

    // Check total file limit
    if (files.length + newFiles.length > maxFiles) {
      alert(`Maximum ${maxFiles} files allowed`)
      return
    }

    const updatedFiles = [...files, ...newFiles]
    setFiles(updatedFiles)
    onFilesChange(updatedFiles)

    // Start uploads for valid files
    for (const file of newFiles) {
      if (file.status === 'uploading') {
        try {
          await simulateUpload(file.id)
        } catch (error) {
          console.error('Upload failed:', error)
        }
      }
    }
  }, [files, maxFiles, onFilesChange])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)

    const droppedFiles = e.dataTransfer.files
    if (droppedFiles && droppedFiles.length > 0) {
      console.log('Files dropped:', droppedFiles.length)
      handleFiles(droppedFiles)
    }
  }, [handleFiles])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(true)
  }, [])

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()

    // Проверяем, что мышь действительно покинула область drop zone
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const x = e.clientX
    const y = e.clientY

    if (x < rect.left || x >= rect.right || y < rect.top || y >= rect.bottom) {
      setIsDragOver(false)
    }
  }, [])

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files
    if (selectedFiles && selectedFiles.length > 0) {
      handleFiles(selectedFiles)
    }
    // Reset input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [handleFiles])

  const removeFile = (fileId: string) => {
    const updatedFiles = files.filter(f => f.id !== fileId)
    setFiles(updatedFiles)
    onFilesChange(updatedFiles)
  }

  const retryUpload = async (fileId: string) => {
    setFiles(prev => prev.map(f =>
      f.id === fileId
        ? { ...f, status: 'uploading', progress: 0, error: undefined }
        : f
    ))

    try {
      await simulateUpload(fileId)
    } catch (error) {
      console.error('Retry upload failed:', error)
    }
  }

  const getStatusIcon = (file: UploadedFile) => {
    switch (file.status) {
      case 'uploading':
        return <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600" />
      default:
        return <FileText className="w-5 h-5 text-gray-400" />
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Required Documents List */}
      {requiredDocuments && requiredDocuments.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Required Documents
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {requiredDocuments.map((doc, index) => (
              <div key={index} className="flex items-center p-3 bg-blue-50 rounded-lg">
                <FileText className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <span className="text-sm text-blue-800 font-medium">{doc.name}</span>
                  {doc.description && (
                    <p className="text-xs text-blue-600 mt-1">{doc.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${isDragOver
          ? 'border-blue-400 bg-blue-50'
          : error
            ? 'border-red-300 bg-red-50'
            : 'border-gray-300 hover:border-gray-400'
          }`}
      >
        <Upload className={`mx-auto h-12 w-12 mb-4 ${isDragOver ? 'text-blue-500' : error ? 'text-red-400' : 'text-gray-400'
          }`} />

        <div className="space-y-2">
          <p className="text-lg font-medium text-gray-900">
            {dragAndDropText || 'Drag and drop files here, or click to select'}
          </p>
          <p className="text-sm text-gray-500">
            {supportedFormatsText || `Supported formats: ${acceptedTypes.join(', ')} (max ${maxFileSize}MB each)`}
          </p>

          <input
            ref={fileInputRef}
            type="file"
            multiple={multiple}
            accept={acceptedTypes.join(',')}
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
          />

          <label
            htmlFor="file-upload"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#003366] hover:bg-[#004080] cursor-pointer"
          >
            Select Files
          </label>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      {/* Uploaded Files List */}
      {files.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">
            Uploaded Files ({files.length}/{maxFiles})
          </h4>
          <div className="space-y-3">
            {files.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center flex-1 min-w-0">
                  {getStatusIcon(file)}
                  <div className="ml-3 flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.file.name}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-gray-500">
                        {formatFileSize(file.file.size)}
                      </span>
                      {file.status === 'uploading' && (
                        <span className="text-xs text-blue-600">
                          {Math.round(file.progress)}%
                        </span>
                      )}
                      {file.error && (
                        <span className="text-xs text-red-600">
                          {file.error}
                        </span>
                      )}
                    </div>
                    {file.status === 'uploading' && (
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                        <div
                          className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${file.progress}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  {file.status === 'error' && (
                    <button
                      onClick={() => retryUpload(file.id)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      title="Retry upload"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => removeFile(file.id)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                    title="Remove file"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
