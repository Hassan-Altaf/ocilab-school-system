import { useState, useEffect } from 'react';
import { Plus, FileText, Calendar, Users, CheckCircle, Clock, Eye, Download } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Progress } from '../ui/progress';
import { toast } from 'sonner@2.0.3';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { teacherService } from '../../services';
import type { Assignment } from '../../services/teacher.service';
import { ApiException, getUserFriendlyError } from '../../utils/errors';

export function TeacherAssignments() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [statistics, setStatistics] = useState<any>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    classId: '',
    sectionId: '',
    subjectId: '',
    title: '',
    dueDate: '',
    totalMarks: '',
    description: ''
  });
  const [classes, setClasses] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [assignmentsRes, statsRes, classesRes] = await Promise.all([
        teacherService.getAssignments({ page: 1, limit: 50 }),
        teacherService.getAssignmentStatistics(),
        teacherService.getAssignedClasses()
      ]);
      setAssignments(assignmentsRes.data?.assignments || []);
      setStatistics(statsRes.data);
      setClasses(classesRes.data?.classes || []);
    } catch (error: any) {
      console.error('Failed to load assignments:', error);
      toast.error(error instanceof ApiException ? getUserFriendlyError(error) : 'Failed to load assignments');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAssignment = async () => {
    if (!newAssignment.title || !newAssignment.classId || !newAssignment.subjectId || !newAssignment.totalMarks) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      setIsCreating(true);
      const dueDate = newAssignment.dueDate ? new Date(newAssignment.dueDate).toISOString() : undefined;
      await teacherService.createAssignment({
        classId: newAssignment.classId,
        sectionId: newAssignment.sectionId || undefined,
        subjectId: newAssignment.subjectId,
        title: newAssignment.title,
        description: newAssignment.description || undefined,
        dueDate,
        totalMarks: parseFloat(newAssignment.totalMarks),
      });
      setIsCreateDialogOpen(false);
      setNewAssignment({ classId: '', sectionId: '', subjectId: '', title: '', dueDate: '', totalMarks: '', description: '' });
      toast.success('Assignment created successfully!');
      loadData();
    } catch (error: any) {
      console.error('Failed to create assignment:', error);
      toast.error(error instanceof ApiException ? getUserFriendlyError(error) : 'Failed to create assignment');
    } finally {
      setIsCreating(false);
    }
  };

  const stats = {
    total: statistics?.totalAssignments || assignments.length,
    active: assignments.filter(a => new Date(a.dueDate) >= new Date()).length,
    completed: assignments.filter(a => new Date(a.dueDate) < new Date()).length,
    pendingGrading: statistics?.pendingGrading || 0
  };

  const getStatusColor = (assignment: Assignment) => {
    const dueDate = new Date(assignment.dueDate);
    const now = new Date();
    if (dueDate < now) return 'bg-red-100 text-red-700 border-red-300 dark:bg-red-900/20 dark:text-red-400';
    return 'bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900/20 dark:text-blue-400';
  };

  const getStatus = (assignment: Assignment) => {
    const dueDate = new Date(assignment.dueDate);
    const now = new Date();
    if (dueDate < now) return 'overdue';
    return 'active';
  };

  const activeAssignments = assignments.filter(a => getStatus(a) === 'active');
  const completedAssignments = assignments.filter(a => getStatus(a) === 'overdue');

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-gray-900 dark:text-white mb-2">Assignments</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create and manage assignments for your classes
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create Assignment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Assignment</DialogTitle>
              <DialogDescription>
                Create a new assignment for your class. Fill in all required fields marked with *.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Assignment Title *</Label>
                <Input
                  id="title"
                  value={newAssignment.title}
                  onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })}
                  placeholder="e.g., Chapter 5 Practice Problems"
                  className="h-11"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="classId">Select Class *</Label>
                  <Select value={newAssignment.classId} onValueChange={(value) => {
                    const selectedClass = classes.find(c => c.classId === value);
                    setNewAssignment({ ...newAssignment, classId: value, subjectId: selectedClass?.subjects?.[0]?.subjectId || '' });
                  }}>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Choose a class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map(cls => (
                        <SelectItem key={cls.classId} value={cls.classId}>
                          {cls.className}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subjectId">Subject *</Label>
                  <Select value={newAssignment.subjectId} onValueChange={(value) => setNewAssignment({ ...newAssignment, subjectId: value })}>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Choose a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.find(c => c.classId === newAssignment.classId)?.subjects?.map((subj: any) => (
                        <SelectItem key={subj.subjectId} value={subj.subjectId}>
                          {subj.subjectName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date *</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newAssignment.dueDate}
                    onChange={(e) => setNewAssignment({ ...newAssignment, dueDate: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="totalMarks">Total Marks</Label>
                <Input
                  id="totalMarks"
                  type="number"
                  value={newAssignment.totalMarks}
                  onChange={(e) => setNewAssignment({ ...newAssignment, totalMarks: e.target.value })}
                  placeholder="20"
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newAssignment.description}
                  onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })}
                  placeholder="Provide instructions for students..."
                  rows={4}
                  className="resize-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={handleCreateAssignment} disabled={isCreating} className="flex-1 bg-blue-600 hover:bg-blue-700">
                  {isCreating ? 'Creating...' : 'Create Assignment'}
                </Button>
                <Button onClick={() => setIsCreateDialogOpen(false)} variant="outline" className="flex-1" disabled={isCreating}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Assignments</p>
              <p className="text-3xl text-gray-900 dark:text-white">{stats.total}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Active</p>
              <p className="text-3xl text-orange-600 dark:text-orange-400">{stats.active}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Completed</p>
              <p className="text-3xl text-green-600 dark:text-green-400">{stats.completed}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Pending Grading</p>
              <p className="text-3xl text-purple-600 dark:text-purple-400">{stats.pendingGrading}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
              <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Assignments Tabs */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <Tabs defaultValue="active" className="w-full">
          <div className="border-b border-gray-200 dark:border-gray-700 px-6 pt-6">
            <TabsList className="w-full justify-start bg-transparent border-b-0 h-auto p-0 space-x-8">
              <TabsTrigger 
                value="active"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-0 pb-3"
              >
                Active ({activeAssignments.length})
              </TabsTrigger>
              <TabsTrigger 
                value="completed"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-0 pb-3"
              >
                Completed ({completedAssignments.length})
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="p-6">
            <TabsContent value="active" className="mt-0">
              <div className="space-y-4">
                {activeAssignments.map((assignment) => (
                  <Card key={assignment.id} className="p-6 border-2 border-gray-200 dark:border-gray-700">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg text-gray-900 dark:text-white mb-1">{assignment.title}</h3>
                          <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {assignment.className || assignment.class} {assignment.sectionName ? `- ${assignment.sectionName}` : ''}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              Due: {new Date(assignment.dueDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline" className={getStatusColor(assignment)}>
                        {getStatus(assignment).charAt(0).toUpperCase() + getStatus(assignment).slice(1)}
                      </Badge>
                    </div>

                    {assignment.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{assignment.description}</p>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Submission Progress</p>
                        <div className="flex items-center gap-2">
                          <Progress value={assignment.totalStudents ? ((assignment.submittedCount || 0) / assignment.totalStudents) * 100 : 0} className="flex-1" />
                          <span className="text-sm text-gray-900 dark:text-white">
                            {assignment.submittedCount || 0}/{assignment.totalStudents || 0}
                          </span>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Grading Progress</p>
                        <div className="flex items-center gap-2">
                          <Progress value={assignment.submittedCount ? ((assignment.gradedCount || 0) / assignment.submittedCount) * 100 : 0} className="flex-1" />
                          <span className="text-sm text-gray-900 dark:text-white">
                            {assignment.gradedCount || 0}/{assignment.submittedCount || 0}
                          </span>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Total Marks</p>
                        <p className="text-2xl text-gray-900 dark:text-white">{assignment.totalMarks}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => {
                        // Navigate to assignment details
                        window.location.href = `/teacher/assignments/${assignment.id}`;
                      }}>
                        <Eye className="w-4 h-4 mr-2" />
                        View Submissions
                      </Button>
                      <Button size="sm" variant="outline" onClick={async () => {
                        try {
                          const blob = await teacherService.downloadAllSubmissions(assignment.id);
                          const url = window.URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = `assignments-${assignment.id}.zip`;
                          a.click();
                          window.URL.revokeObjectURL(url);
                          toast.success('Download started');
                        } catch (error: any) {
                          toast.error('Failed to download submissions');
                        }
                      }}>
                        <Download className="w-4 h-4 mr-2" />
                        Download All
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="completed" className="mt-0">
              <div className="space-y-4">
                {completedAssignments.map((assignment) => (
                  <Card key={assignment.id} className="p-6 border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <h3 className="text-lg text-gray-900 dark:text-white mb-1">{assignment.title}</h3>
                          <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                            <span>{assignment.class}</span>
                            <span>•</span>
                            <span>All submissions graded</span>
                            <span>•</span>
                            <span>Completed: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        View Report
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </Card>
    </div>
  );
}
