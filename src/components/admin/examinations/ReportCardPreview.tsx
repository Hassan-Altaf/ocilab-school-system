import { ArrowLeft, Download, Printer, Mail } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import { Exam } from '../Examinations';

interface ReportCardPreviewProps {
  exam: Exam | null;
  onBack: () => void;
}

export function ReportCardPreview({ exam, onBack }: ReportCardPreviewProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-[32px] text-gray-900 dark:text-white tracking-tight">
            Report Card Preview
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
          <Button variant="outline" className="gap-2">
            <Printer className="w-4 h-4" />
            Print
          </Button>
          <Button className="bg-[#2563EB] hover:bg-[#1d4ed8] gap-2">
            <Mail className="w-4 h-4" />
            Send to Parent
          </Button>
        </div>
      </div>
      <Card className="p-12 bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 rounded-xl text-center">
        <p className="text-gray-500 dark:text-gray-400">Report card preview interface</p>
      </Card>
    </div>
  );
}
