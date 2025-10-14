import { useId, useRef, useState, useEffect, DragEvent, ChangeEvent, HTMLAttributes } from 'react';
import { IoCloudUploadOutline, IoCloseOutline, IoDocumentOutline } from 'react-icons/io5';
import { designTokens } from '@/constants/design-tokens';

interface AppleFileUploadProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  label?: string;
  error?: string;
  helperText?: string;
  value?: File[];
  onChange?: (files: File[]) => void;
  disabled?: boolean;
  accept?: string;
  maxFiles?: number;
  maxSize?: number;
  showPreview?: boolean;
  name?: string;
}

export function AppleFileUpload({
  label,
  error,
  helperText,
  value = [],
  onChange,
  disabled = false,
  accept = '*',
  maxFiles = 1,
  maxSize = 5 * 1024 * 1024, // 5MB default
  showPreview = true,
  name,
  className = '',
  ...divProps
}: AppleFileUploadProps) {
  const id = useId();
  const inputId = divProps.id || id;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;
  
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>(value);
  const [previews, setPreviews] = useState<Map<string, string>>(new Map());
  const [validationError, setValidationError] = useState<string>('');

  // Cleanup object URLs on unmount or when files change
  useEffect(() => {
    return () => {
      previews.forEach(url => URL.revokeObjectURL(url));
    };
  }, []);

  // Sync with external value prop
  useEffect(() => {
    setFiles(value);
  }, [value]);

  // Format bytes to human readable format
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  // Validate file
  const validateFile = (file: File): { valid: boolean; error?: string } => {
    // Check file size
    if (file.size > maxSize) {
      return {
        valid: false,
        error: `Tệp quá lớn (tối đa ${formatBytes(maxSize)})`,
      };
    }

    // Check file type if accept is specified and not wildcard
    if (accept && accept !== '*') {
      const acceptedTypes = accept.split(',').map(t => t.trim());
      const fileType = file.type;
      const fileName = file.name.toLowerCase();
      
      const isAccepted = acceptedTypes.some(acceptedType => {
        // Handle MIME types like "image/*"
        if (acceptedType.includes('*')) {
          const baseType = acceptedType.split('/')[0];
          return fileType.startsWith(baseType + '/');
        }
        // Handle specific MIME types like "image/png"
        if (acceptedType.includes('/')) {
          return fileType === acceptedType;
        }
        // Handle extensions like ".pdf"
        if (acceptedType.startsWith('.')) {
          return fileName.endsWith(acceptedType.toLowerCase());
        }
        return false;
      });

      if (!isAccepted) {
        return {
          valid: false,
          error: 'Loại tệp không được hỗ trợ',
        };
      }
    }

    return { valid: true };
  };

  // Handle file selection
  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles || newFiles.length === 0) return;

    setValidationError('');
    const fileArray = Array.from(newFiles);
    
    // Check max files limit
    if (files.length + fileArray.length > maxFiles) {
      setValidationError(`Số lượng tệp vượt quá giới hạn (${maxFiles})`);
      return;
    }

    // Validate and filter files
    const validFiles: File[] = [];
    const errors: string[] = [];

    fileArray.forEach(file => {
      const validation = validateFile(file);
      if (validation.valid) {
        validFiles.push(file);
        
        // Create preview for images
        if (file.type.startsWith('image/') && showPreview) {
          const objectUrl = URL.createObjectURL(file);
          setPreviews(prev => new Map(prev).set(file.name, objectUrl));
        }
      } else if (validation.error) {
        errors.push(`${file.name}: ${validation.error}`);
      }
    });

    if (errors.length > 0) {
      setValidationError(errors[0]); // Show first error
    }

    if (validFiles.length > 0) {
      const updatedFiles = [...files, ...validFiles];
      setFiles(updatedFiles);
      onChange?.(updatedFiles);
    }
  };

  // Handle drag events
  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (!disabled) {
      handleFiles(e.dataTransfer.files);
    }
  };

  // Handle file input change
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  // Handle file removal
  const handleRemoveFile = (index: number) => {
    const fileToRemove = files[index];
    
    // Cleanup preview URL
    const previewUrl = previews.get(fileToRemove.name);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviews(prev => {
        const newPreviews = new Map(prev);
        newPreviews.delete(fileToRemove.name);
        return newPreviews;
      });
    }

    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onChange?.(updatedFiles);
    setValidationError('');
  };

  // Handle click to open file dialog
  const handleClick = () => {
    if (!disabled) {
      inputRef.current?.click();
    }
  };

  // Handle keyboard events
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
      e.preventDefault();
      handleClick();
    }
  };

  const displayError = error || validationError;

  return (
    <div className={`w-full ${className}`} {...divProps}>
      {label && (
        <label
          htmlFor={inputId}
          className={`block ${designTokens.typography.small} font-medium text-gray-700 mb-1.5`}
        >
          {label}
        </label>
      )}

      {/* Hidden file input */}
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        className="hidden"
        onChange={handleFileChange}
        accept={accept}
        multiple={maxFiles > 1}
        disabled={disabled}
        aria-invalid={displayError ? 'true' : 'false'}
        aria-describedby={displayError ? errorId : helperText ? helperId : undefined}
      />

      {/* Drop zone */}
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          min-h-32 
          border-2 border-dashed
          ${designTokens.borderRadius.md}
          ${designTokens.transitions.base}
          flex flex-col items-center justify-center
          cursor-pointer
          ${isDragging 
            ? 'border-[#ff0086] bg-pink-50' 
            : displayError
              ? 'border-red-500 bg-red-50'
              : 'border-gray-300 bg-gray-50'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-[#ff0086] hover:bg-pink-50'}
          focus:outline-none focus:ring-2 focus:ring-[#ff0086]
          p-6
        `}
        data-testid={name ? `fileupload-${name}` : 'fileupload'}
      >
        <IoCloudUploadOutline className={`w-8 h-8 mb-2 ${isDragging ? 'text-[#ff0086]' : 'text-gray-400'}`} />
        <p className="text-sm text-gray-600 text-center mb-2">
          Kéo thả tệp vào đây hoặc nhấp để chọn
        </p>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
          disabled={disabled}
          className={`
            px-4 py-2 text-sm font-medium
            ${designTokens.borderRadius.md}
            ${designTokens.transitions.base}
            bg-white border border-gray-300
            text-gray-700
            hover:bg-gray-50
            focus:outline-none focus:ring-2 focus:ring-[#ff0086]
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
          data-testid={name ? `button-select-${name}` : 'button-select'}
        >
          Chọn tệp
        </button>
      </div>

      {/* File previews/list */}
      {files.length > 0 && showPreview && (
        <div className={`mt-4 grid ${maxFiles > 1 ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1'} gap-4`}>
          {files.map((file, index) => {
            const isImage = file.type.startsWith('image/');
            const previewUrl = previews.get(file.name);

            return (
              <div
                key={`${file.name}-${index}`}
                className={`
                  relative group
                  ${designTokens.borderRadius.md}
                  border border-gray-200
                  p-2
                  bg-white
                  ${designTokens.transitions.base}
                  hover:shadow-md
                `}
                data-testid={`file-preview-${index}`}
              >
                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => handleRemoveFile(index)}
                  disabled={disabled}
                  className={`
                    absolute -top-2 -right-2
                    w-6 h-6 rounded-full
                    bg-red-500 text-white
                    flex items-center justify-center
                    ${designTokens.transitions.base}
                    hover:bg-red-600
                    focus:outline-none focus:ring-2 focus:ring-red-500
                    disabled:opacity-50 disabled:cursor-not-allowed
                    z-10
                  `}
                  data-testid={`button-remove-${index}`}
                >
                  <IoCloseOutline className="w-4 h-4" />
                </button>

                {/* Preview content */}
                {isImage && previewUrl ? (
                  <div className="w-full">
                    <img
                      src={previewUrl}
                      alt={file.name}
                      className={`w-full max-h-32 object-cover ${designTokens.borderRadius.md}`}
                    />
                    <p className="text-xs text-gray-600 mt-2 truncate" title={file.name}>
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-400">{formatBytes(file.size)}</p>
                  </div>
                ) : (
                  <div className="flex items-start gap-2">
                    <IoDocumentOutline className="w-8 h-8 text-gray-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-600 truncate" title={file.name}>
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-400">{formatBytes(file.size)}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Error message */}
      {displayError && (
        <p id={errorId} className="mt-1.5 text-sm text-red-600" data-testid={name ? `error-${name}` : 'error-fileupload'}>
          {displayError}
        </p>
      )}

      {/* Helper text */}
      {!displayError && helperText && (
        <p id={helperId} className="mt-1.5 text-sm text-gray-500" data-testid={name ? `helper-${name}` : 'helper-fileupload'}>
          {helperText}
        </p>
      )}
    </div>
  );
}
