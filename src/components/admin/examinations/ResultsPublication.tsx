import { ArrowLeft, Send, AlertTriangle } from 'lucide-react';
import { Button } from '../../ui/button';
import { Card } from '../../ui/card';
import { Checkbox } from '../../ui/checkbox';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';
import { toast } from 'sonner@2.0.3';
import { Exam } from '../Examinations';

interface ResultsPublicationProps {
  exam: Exam | null;
  onBack: () => void;
  onPublish: () => void;
}

export function ResultsPublication({ exam, onBack, onPublish }: ResultsPublicationProps) {
  const handlePublish = () => {
    toast.success('Results published successfully!');
    onPublish();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-[32px] text-gray-900 dark:text-white tracking-tight">
            Publish Examination Results
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {exam?.name}
          </p>
        </div>
      </div>

      <Card className="p-6 bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 rounded-xl">
        <h3 className="text-lg text-gray-900 dark:text-white mb-4">Verification Checklist</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="check1" defaultChecked />
            <Label htmlFor="check1" className="text-sm text-gray-700 dark:text-gray-300">
              All marks entered and verified
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="check2" defaultChecked />
            <Label htmlFor="check2" className="text-sm text-gray-700 dark:text-gray-300">
              Grades calculated correctly
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="check3" defaultChecked />
            <Label htmlFor="check3" className="text-sm text-gray-700 dark:text-gray-300">
              Report cards generated
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="check4" />
            <Label htmlFor="check4" className="text-sm text-gray-700 dark:text-gray-300">
              Parent notifications ready
            </Label>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-800 rounded-xl">
        <h3 className="text-lg text-gray-900 dark:text-white mb-4">Publication Options</h3>
        <RadioGroup defaultValue="both">
          <div className="flex items-center space-x-2 mb-2">
            <RadioGroupItem value="portal" id="portal" />
            <Label htmlFor="portal" className="text-sm text-gray-700 dark:text-gray-300">
              Publish to Student/Parent Portal
            </Label>
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <RadioGroupItem value="email" id="email" />
            <Label htmlFor="email" className="text-sm text-gray-700 dark:text-gray-300">
              Send via Email/SMS
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="both" id="both" />
            <Label htmlFor="both" className="text-sm text-gray-700 dark:text-gray-300">
              Both
            </Label>
          </div>
        </RadioGroup>

        <div className="mt-4">
          <Label htmlFor="message">Custom Message to Parents</Label>
          <Textarea 
            id="message" 
            placeholder="Enter a custom message..." 
            className="mt-2"
            rows={4}
          />
        </div>
      </Card>

      <Card className="p-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
        <div className="flex gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm text-amber-900 dark:text-amber-100 mb-1">Warning</h4>
            <p className="text-sm text-amber-700 dark:text-amber-200">
              Once published, results cannot be unpublished without admin approval. Please ensure all data is correct before proceeding.
            </p>
          </div>
        </div>
      </Card>

      <div className="flex items-center justify-end gap-3">
        <Button variant="outline" onClick={onBack}>
          Cancel
        </Button>
        <Button className="bg-[#10B981] hover:bg-[#059669]" onClick={handlePublish}>
          <Send className="w-4 h-4 mr-2" />
          Publish Results
        </Button>
      </div>
    </div>
  );
}
