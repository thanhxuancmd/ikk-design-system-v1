import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Download, FileSpreadsheet, FileJson, FileText, Check, Calendar } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { designTokens } from '@/constants/design-tokens';
import { AppleButton } from './AppleButton';
import { AppleRadioGroup } from './AppleRadio';
import { AppleCheckbox } from './AppleCheckbox';
import { AppleDatePicker } from './AppleDatePicker';

export type ExportFormat = 'csv' | 'excel' | 'json';

export interface ExportField {
  id: string;
  label: string;
  checked: boolean;
}

export interface ExportConfig {
  format: ExportFormat;
  dateRange?: {
    from: string;
    to: string;
  };
  fields: string[];
}

export interface DataExportDialogLabels {
  // Dialog
  title: string;
  description: string;
  closeButton: string;
  
  // Format section
  formatLabel: string;
  csvFormat: string;
  csvFormatDescription: string;
  excelFormat: string;
  excelFormatDescription: string;
  jsonFormat: string;
  jsonFormatDescription: string;
  
  // Date range section
  dateRangeLabel: string;
  startDateLabel: string;
  endDateLabel: string;
  
  // Fields section
  fieldsLabel: string;
  selectAllFields: string;
  
  // Actions
  exportButton: string;
  cancelButton: string;
  
  // Progress/Status
  exportingMessage: string;
  exportingButton: string;
  successMessage: string;
  completeButton: string;
  
  // Error messages
  noFieldsSelectedError: string;
  exportError: string;
}

const defaultLabels: DataExportDialogLabels = {
  // Dialog
  title: "Xuất dữ liệu",
  description: "Chọn định dạng và các trường dữ liệu bạn muốn xuất",
  closeButton: "Đóng",
  
  // Format section
  formatLabel: "Định dạng file",
  csvFormat: "CSV (Comma-separated)",
  csvFormatDescription: "File văn bản với dấu phân cách",
  excelFormat: "Excel (XLSX)",
  excelFormatDescription: "Microsoft Excel workbook",
  jsonFormat: "JSON (JavaScript)",
  jsonFormatDescription: "JavaScript Object Notation",
  
  // Date range section
  dateRangeLabel: "Lọc theo khoảng thời gian",
  startDateLabel: "Từ ngày",
  endDateLabel: "Đến ngày",
  
  // Fields section
  fieldsLabel: "Chọn trường dữ liệu",
  selectAllFields: "Chọn tất cả",
  
  // Actions
  exportButton: "Xuất dữ liệu",
  cancelButton: "Hủy",
  
  // Progress/Status
  exportingMessage: "Đang xuất dữ liệu...",
  exportingButton: "Đang xuất...",
  successMessage: "Hoàn tất!",
  completeButton: "Hoàn tất",
  
  // Error messages
  noFieldsSelectedError: "Vui lòng chọn ít nhất 1 trường dữ liệu",
  exportError: "Có lỗi xảy ra khi xuất dữ liệu",
};

export interface DataExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  availableFields: ExportField[];
  onExport: (config: ExportConfig) => Promise<{ url: string; filename: string }>;
  labels?: Partial<DataExportDialogLabels>;
}

const formatIcons: Record<ExportFormat, JSX.Element> = {
  csv: <FileText className="w-5 h-5" />,
  excel: <FileSpreadsheet className="w-5 h-5" />,
  json: <FileJson className="w-5 h-5" />,
};

export function DataExportDialog({
  open,
  onOpenChange,
  availableFields,
  onExport,
  labels: customLabels,
}: DataExportDialogProps) {
  const labels = { ...defaultLabels, ...customLabels };
  
  const [format, setFormat] = useState<ExportFormat>('csv');
  const [enableDateRange, setEnableDateRange] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);
  const [error, setError] = useState('');

  const formatOptions = [
    {
      value: 'csv',
      label: labels.csvFormat,
      description: labels.csvFormatDescription,
    },
    {
      value: 'excel',
      label: labels.excelFormat,
      description: labels.excelFormatDescription,
    },
    {
      value: 'json',
      label: labels.jsonFormat,
      description: labels.jsonFormatDescription,
    },
  ];

  useEffect(() => {
    if (open) {
      setSelectedFields(availableFields.filter((f) => f.checked).map((f) => f.id));
      setFormat('csv');
      setEnableDateRange(false);
      setDateRange(undefined);
      setError('');
      setExportComplete(false);
      setIsExporting(false);
    }
  }, [open, availableFields]);

  const handleFieldToggle = (fieldId: string) => {
    setSelectedFields((prev) =>
      prev.includes(fieldId) ? prev.filter((id) => id !== fieldId) : [...prev, fieldId]
    );
  };

  const handleSelectAll = () => {
    if (selectedFields.length === availableFields.length) {
      setSelectedFields([]);
    } else {
      setSelectedFields(availableFields.map((f) => f.id));
    }
  };

  const triggerDownload = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExport = async () => {
    if (selectedFields.length === 0) {
      setError(labels.noFieldsSelectedError);
      return;
    }

    setError('');
    setIsExporting(true);

    try {
      const config: ExportConfig = {
        format,
        fields: selectedFields,
      };

      if (enableDateRange && dateRange?.from && dateRange?.to) {
        config.dateRange = {
          from: dateRange.from.toISOString(),
          to: dateRange.to.toISOString(),
        };
      }

      const result = await onExport(config);

      setExportComplete(true);

      setTimeout(() => {
        triggerDownload(result.url, result.filename);
        setTimeout(() => {
          onOpenChange(false);
        }, 500);
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : labels.exportError);
      setIsExporting(false);
    }
  };

  const allFieldsSelected = selectedFields.length === availableFields.length && availableFields.length > 0;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 bg-black/50 data-[state=open]:animate-fade-in"
          style={{ zIndex: designTokens.zIndex.modal }}
        />
        <Dialog.Content
          className={`
            fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            w-full max-w-2xl max-h-[90vh] overflow-y-auto
            bg-white ${designTokens.borderRadius.lg} ${designTokens.shadows.xl}
            p-6
            data-[state=open]:animate-scale-in
          `}
          style={{ zIndex: designTokens.zIndex.modal + 1 }}
          data-testid="data-export-dialog"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <Dialog.Title className={`${designTokens.typography.h2} text-gray-900 mb-1`}>
                {labels.title}
              </Dialog.Title>
              <Dialog.Description className="text-sm text-gray-600">
                {labels.description}
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button
                className={`
                  p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100
                  ${designTokens.borderRadius.md} ${designTokens.transitions.base}
                `}
                aria-label={labels.closeButton}
              >
                <X className="w-5 h-5" />
              </button>
            </Dialog.Close>
          </div>

          <div className="space-y-6">
            {/* Format Selection */}
            <div>
              <label className={`block ${designTokens.typography.small} font-semibold text-gray-700 mb-3`}>
                {labels.formatLabel}
              </label>
              <AppleRadioGroup
                name="format"
                value={format}
                onChange={(value) => setFormat(value as ExportFormat)}
                options={formatOptions.map((opt) => ({
                  value: opt.value,
                  label: opt.label,
                  description: opt.description,
                }))}
              />
            </div>

            {/* Date Range */}
            <div>
              <AppleCheckbox
                label={labels.dateRangeLabel}
                checked={enableDateRange}
                onChange={(e) => setEnableDateRange(e.target.checked)}
                name="enable-date-range"
                data-testid="checkbox-enable-date-range"
              />

              {enableDateRange && (
                <div className="mt-3 grid grid-cols-2 gap-4">
                  <AppleDatePicker
                    label={labels.startDateLabel}
                    mode="single"
                    selected={dateRange?.from}
                    onSelect={(date) => {
                      if (date instanceof Date) {
                        setDateRange((prev) => ({ ...prev, from: date, to: prev?.to }));
                      }
                    }}
                    name="from"
                    data-testid="datepicker-from"
                  />
                  <AppleDatePicker
                    label={labels.endDateLabel}
                    mode="single"
                    selected={dateRange?.to}
                    onSelect={(date) => {
                      if (date instanceof Date) {
                        setDateRange((prev) => ({ from: prev?.from, to: date }));
                      }
                    }}
                    minDate={dateRange?.from}
                    name="to"
                    data-testid="datepicker-to"
                  />
                </div>
              )}
            </div>

            {/* Field Selection */}
            <div>
              <label className={`block ${designTokens.typography.small} font-semibold text-gray-700 mb-3`}>
                {labels.fieldsLabel}
              </label>

              <div className="space-y-2">
                <AppleCheckbox
                  label={labels.selectAllFields}
                  checked={allFieldsSelected}
                  onChange={handleSelectAll}
                  name="select-all"
                  data-testid="checkbox-select-all-fields"
                  className="font-semibold"
                />

                <div className={`pl-4 space-y-2 border-l-2 border-gray-200`}>
                  {availableFields.map((field) => (
                    <AppleCheckbox
                      key={field.id}
                      label={field.label}
                      checked={selectedFields.includes(field.id)}
                      onChange={() => handleFieldToggle(field.id)}
                      name={`field-${field.id}`}
                      data-testid={`checkbox-field-${field.id}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Export Progress */}
            {(isExporting || exportComplete) && (
              <div
                className={`
                  p-4 ${designTokens.borderRadius.lg}
                  ${exportComplete ? 'bg-green-50 border border-green-200' : 'bg-blue-50 border border-blue-200'}
                  flex items-center gap-3
                `}
                data-testid="export-progress"
              >
                {exportComplete ? (
                  <>
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-green-700">{labels.successMessage}</span>
                  </>
                ) : (
                  <>
                    <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm font-medium text-blue-700">{labels.exportingMessage}</span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
            <AppleButton
              variant="secondary"
              size="md"
              onClick={() => onOpenChange(false)}
              disabled={isExporting}
              data-testid="button-cancel"
            >
              {labels.cancelButton}
            </AppleButton>
            <AppleButton
              variant="primary"
              size="md"
              onClick={handleExport}
              disabled={isExporting || exportComplete || selectedFields.length === 0}
              data-testid="button-export"
              className="inline-flex items-center gap-2"
            >
              {isExporting || exportComplete ? (
                exportComplete ? (
                  <>
                    <Check className="w-5 h-5" />
                    {labels.completeButton}
                  </>
                ) : (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {labels.exportingButton}
                  </>
                )
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  {labels.exportButton}
                </>
              )}
            </AppleButton>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
