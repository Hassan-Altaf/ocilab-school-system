import { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  Megaphone, 
  Users, 
  Mail, 
  Bell, 
  Search, 
  Filter, 
  Plus,
  Download,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  Phone,
  MessageCircle,
  FileText,
  Calendar,
  Clock,
  CheckCheck,
  User
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ScrollArea } from '../ui/scroll-area';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { toast } from 'sonner@2.0.3';

const messages = [
  {
    id: 1,
    from: 'Sarah Johnson',
    fromRole: 'Parent',
    subject: 'Question about homework assignment',
    preview: 'I wanted to ask about the mathematics homework...',
    date: '2024-11-05',
    time: '02:30 PM',
    status: 'unread',
    priority: 'normal',
    avatar: 'SJ'
  },
  {
    id: 2,
    from: 'Michael Chen',
    fromRole: 'Teacher',
    subject: 'Grade 10A Science Lab Schedule',
    preview: 'Requesting approval for additional lab session...',
    date: '2024-11-05',
    time: '11:15 AM',
    status: 'read',
    priority: 'high',
    avatar: 'MC'
  },
  {
    id: 3,
    from: 'Emma Wilson',
    fromRole: 'Student',
    subject: 'Leave Application',
    preview: 'I will be absent on November 10th due to...',
    date: '2024-11-04',
    time: '04:45 PM',
    status: 'read',
    priority: 'normal',
    avatar: 'EW'
  },
  {
    id: 4,
    from: 'David Brown',
    fromRole: 'Parent',
    subject: 'Parent-Teacher Meeting Request',
    preview: 'Would like to schedule a meeting to discuss...',
    date: '2024-11-04',
    time: '09:20 AM',
    status: 'unread',
    priority: 'high',
    avatar: 'DB'
  },
  {
    id: 5,
    from: 'Lisa Anderson',
    fromRole: 'Teacher',
    subject: 'Field Trip Permission Forms',
    preview: 'Attached are the permission forms for the upcoming...',
    date: '2024-11-03',
    time: '03:10 PM',
    status: 'read',
    priority: 'normal',
    avatar: 'LA'
  }
];

const announcements = [
  {
    id: 1,
    title: 'Winter Break Schedule 2024',
    content: 'School will remain closed from December 20th to January 5th for winter break.',
    category: 'Holiday',
    targetAudience: 'All',
    postedBy: 'Admin',
    date: '2024-11-05',
    time: '10:00 AM',
    status: 'Published',
    views: 342,
    priority: 'high'
  },
  {
    id: 2,
    title: 'Annual Sports Day - November 25th',
    content: 'All students are requested to participate in the annual sports day event.',
    category: 'Event',
    targetAudience: 'Students',
    postedBy: 'Sports Coordinator',
    date: '2024-11-04',
    time: '02:30 PM',
    status: 'Published',
    views: 567,
    priority: 'normal'
  },
  {
    id: 3,
    title: 'Parent-Teacher Meeting - November 15th',
    content: 'Quarterly parent-teacher meetings scheduled for all grades.',
    category: 'Meeting',
    targetAudience: 'Parents',
    postedBy: 'Admin',
    date: '2024-11-03',
    time: '09:15 AM',
    status: 'Published',
    views: 428,
    priority: 'high'
  },
  {
    id: 4,
    title: 'Mid-Term Examination Schedule',
    content: 'Mid-term exams will commence from November 20th. Detailed schedule attached.',
    category: 'Examination',
    targetAudience: 'Students',
    postedBy: 'Examination Controller',
    date: '2024-11-02',
    time: '11:45 AM',
    status: 'Published',
    views: 692,
    priority: 'high'
  },
  {
    id: 5,
    title: 'New Library Books Available',
    content: 'Latest collection of educational books now available in the school library.',
    category: 'Update',
    targetAudience: 'All',
    postedBy: 'Librarian',
    date: '2024-11-01',
    time: '01:20 PM',
    status: 'Draft',
    views: 0,
    priority: 'normal'
  }
];

const templates = [
  {
    id: 1,
    name: 'Fee Reminder',
    type: 'SMS',
    content: 'Dear Parent, this is a reminder that the school fee for [Month] is due. Please pay by [Date]. Thank you.',
    category: 'Finance',
    lastUsed: '2024-11-01',
    usageCount: 145
  },
  {
    id: 2,
    name: 'Absence Alert',
    type: 'Email',
    content: 'Dear Parent, your child [Student Name] was absent from school on [Date]. Please contact the school office if this was not authorized.',
    category: 'Attendance',
    lastUsed: '2024-11-04',
    usageCount: 89
  },
  {
    id: 3,
    name: 'Exam Notification',
    type: 'Email',
    content: 'Dear Student, your [Exam Name] is scheduled for [Date] at [Time]. Please prepare accordingly.',
    category: 'Examination',
    lastUsed: '2024-10-28',
    usageCount: 234
  },
  {
    id: 4,
    name: 'Event Invitation',
    type: 'SMS',
    content: 'You are invited to [Event Name] on [Date] at [Time]. We look forward to your participation.',
    category: 'Event',
    lastUsed: '2024-10-25',
    usageCount: 67
  }
];

const broadcasts = [
  {
    id: 1,
    title: 'Monthly Fee Reminder - November',
    recipients: 'All Parents (1,248)',
    channel: 'SMS',
    status: 'Sent',
    sentDate: '2024-11-01',
    sentTime: '09:00 AM',
    delivered: 1242,
    failed: 6,
    createdBy: 'Finance Manager'
  },
  {
    id: 2,
    title: 'Winter Break Announcement',
    recipients: 'All (Students, Parents, Teachers)',
    channel: 'Email + SMS',
    status: 'Scheduled',
    sentDate: '2024-11-10',
    sentTime: '08:00 AM',
    delivered: 0,
    failed: 0,
    createdBy: 'Admin'
  },
  {
    id: 3,
    title: 'Exam Schedule Notification',
    recipients: 'Grade 10-12 Students (620)',
    channel: 'Email',
    status: 'Sent',
    sentDate: '2024-11-02',
    sentTime: '03:30 PM',
    delivered: 618,
    failed: 2,
    createdBy: 'Exam Controller'
  }
];

export function Communication() {
  const [showComposeDialog, setShowComposeDialog] = useState(false);
  const [showAnnouncementDialog, setShowAnnouncementDialog] = useState(false);
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  const [showBroadcastDialog, setShowBroadcastDialog] = useState(false);

  const formatDateTime = (date: string, time: string) => {
    const dateStr = new Date(date).toLocaleDateString('en-PK', { 
      day: '2-digit',
      month: 'short', 
      year: 'numeric' 
    });
    return `${dateStr} at ${time}`;
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A66C2]/10 to-purple-500/10 rounded-3xl blur-3xl -z-10"></div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl text-gray-900 dark:text-white mb-2 tracking-tight">Communication Hub</h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">Manage messages, announcements, and notifications</p>
          </div>
          <Button 
            onClick={() => setShowComposeDialog(true)}
            className="bg-gradient-to-r from-[#0A66C2] to-blue-600 hover:from-[#0052A3] hover:to-blue-700 shadow-lg"
          >
            <Send className="w-4 h-4 mr-2" />
            Compose Message
          </Button>
        </div>
      </div>

      {/* Stats Grid - Compact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
          <div className="absolute inset-0 bg-white/5"></div>
          <div className="relative">
            <p className="text-white/90 text-sm mb-2 font-medium">Messages</p>
            <h3 className="text-white text-3xl mb-1 tracking-tight">{messages.length}</h3>
            <p className="text-white/80 text-sm font-medium">{messages.filter(m => m.status === 'unread').length} unread</p>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br from-purple-600 to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
          <div className="absolute inset-0 bg-white/5"></div>
          <div className="relative">
            <p className="text-white/90 text-sm mb-2 font-medium">Announcements</p>
            <h3 className="text-white text-3xl mb-1 tracking-tight">{announcements.filter(a => a.status === 'Published').length}</h3>
            <p className="text-white/80 text-sm font-medium">{announcements.filter(a => a.status === 'Draft').length} drafts</p>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br from-green-500 to-green-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
          <div className="absolute inset-0 bg-white/5"></div>
          <div className="relative">
            <p className="text-white/90 text-sm mb-2 font-medium">Broadcasts</p>
            <h3 className="text-white text-3xl mb-1 tracking-tight">{broadcasts.length}</h3>
            <p className="text-white/80 text-sm font-medium">{broadcasts.filter(b => b.status === 'Scheduled').length} scheduled</p>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br from-pink-500 to-pink-600 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
          <div className="absolute inset-0 bg-white/5"></div>
          <div className="relative">
            <p className="text-white/90 text-sm mb-2 font-medium">Templates</p>
            <h3 className="text-white text-3xl mb-1 tracking-tight">{templates.length}</h3>
            <p className="text-white/80 text-sm font-medium">Ready to use</p>
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="messages" className="space-y-6">
        <TabsList className="bg-white dark:bg-gray-900 p-1 shadow-lg rounded-xl border border-gray-100 dark:border-gray-800">
          <TabsTrigger value="messages" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#0A66C2] data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-lg">
            <MessageSquare className="w-4 h-4 mr-2" />
            Messages
          </TabsTrigger>
          <TabsTrigger value="announcements" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg">
            <Megaphone className="w-4 h-4 mr-2" />
            Announcements
          </TabsTrigger>
          <TabsTrigger value="broadcast" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white rounded-lg">
            <Users className="w-4 h-4 mr-2" />
            Broadcast
          </TabsTrigger>
          <TabsTrigger value="templates" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-amber-600 data-[state=active]:text-white rounded-lg">
            <FileText className="w-4 h-4 mr-2" />
            Templates
          </TabsTrigger>
        </TabsList>

        {/* Messages Tab */}
        <TabsContent value="messages" className="space-y-6">
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-3xl transform translate-y-1 opacity-30"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl transform translate-y-0.5 opacity-50"></div>
            
            <Card className="relative rounded-3xl p-8 border-0 shadow-xl bg-white dark:bg-gray-900">
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-white/5 rounded-3xl pointer-events-none"></div>
              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input placeholder="Search messages..." className="pl-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl" />
                  </div>
                  <Button variant="outline" className="gap-2 rounded-xl">
                    <Filter className="w-4 h-4" />
                    Filter
                  </Button>
                </div>

                <div className="space-y-3">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 border border-gray-100 dark:border-gray-800 cursor-pointer group/message"
                    >
                      <Avatar className="w-12 h-12 ring-2 ring-white dark:ring-gray-800 shadow-lg">
                        <AvatarFallback className="bg-gradient-to-br from-[#0A66C2] to-blue-600 text-white">
                          {message.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-sm text-gray-900 dark:text-white font-medium">
                                {message.from}
                              </h4>
                              <Badge variant="outline" className="text-xs">
                                {message.fromRole}
                              </Badge>
                              {message.status === 'unread' && (
                                <div className="w-2 h-2 rounded-full bg-[#0A66C2]"></div>
                              )}
                            </div>
                            <p className="text-sm text-gray-900 dark:text-white font-medium mb-1">
                              {message.subject}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1">
                              {message.preview}
                            </p>
                          </div>
                          {message.priority === 'high' && (
                            <Badge className="bg-red-100 text-red-700 border-red-200 text-xs">
                              High Priority
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDateTime(message.date, message.time)}
                          </div>
                          {message.status === 'read' && (
                            <div className="flex items-center gap-1 text-green-600">
                              <CheckCheck className="w-3 h-3" />
                              Read
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Announcements Tab */}
        <TabsContent value="announcements" className="space-y-6">
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-3xl transform translate-y-1 opacity-30"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl transform translate-y-0.5 opacity-50"></div>
            
            <Card className="relative rounded-3xl p-8 border-0 shadow-xl bg-white dark:bg-gray-900">
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-white/5 rounded-3xl pointer-events-none"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl text-gray-900 dark:text-white tracking-tight">All Announcements</h3>
                  <Button 
                    onClick={() => setShowAnnouncementDialog(true)}
                    className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 shadow-lg rounded-xl"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    New Announcement
                  </Button>
                </div>

                <div className="border rounded-2xl overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50 dark:bg-gray-800">
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Target Audience</TableHead>
                        <TableHead>Posted By</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Views</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {announcements.map((announcement) => (
                        <TableRow key={announcement.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                          <TableCell>
                            <div>
                              <p className="text-sm text-gray-900 dark:text-white font-medium mb-1">
                                {announcement.title}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                                {announcement.content}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              {announcement.category}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-700 dark:text-gray-300">
                            {announcement.targetAudience}
                          </TableCell>
                          <TableCell className="text-gray-700 dark:text-gray-300">
                            {announcement.postedBy}
                          </TableCell>
                          <TableCell>
                            <div className="text-sm text-gray-700 dark:text-gray-300">
                              {formatDateTime(announcement.date, announcement.time)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 text-gray-700 dark:text-gray-300">
                              <Eye className="w-4 h-4" />
                              {announcement.views}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline"
                              className={
                                announcement.status === 'Published' 
                                  ? 'bg-green-100 text-green-700 border-green-200' 
                                  : 'bg-yellow-100 text-yellow-700 border-yellow-200'
                              }
                            >
                              {announcement.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="w-4 h-4 mr-2" />
                                  View
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="w-4 h-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Broadcast Tab */}
        <TabsContent value="broadcast" className="space-y-6">
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-3xl transform translate-y-1 opacity-30"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl transform translate-y-0.5 opacity-50"></div>
            
            <Card className="relative rounded-3xl p-8 border-0 shadow-xl bg-white dark:bg-gray-900">
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-white/5 rounded-3xl pointer-events-none"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl text-gray-900 dark:text-white tracking-tight">Broadcast History</h3>
                  <Button 
                    onClick={() => setShowBroadcastDialog(true)}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg rounded-xl"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    New Broadcast
                  </Button>
                </div>

                <div className="border rounded-2xl overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50 dark:bg-gray-800">
                        <TableHead>Title</TableHead>
                        <TableHead>Recipients</TableHead>
                        <TableHead>Channel</TableHead>
                        <TableHead>Sent Date & Time</TableHead>
                        <TableHead>Delivered</TableHead>
                        <TableHead>Created By</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {broadcasts.map((broadcast) => (
                        <TableRow key={broadcast.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                          <TableCell className="text-gray-900 dark:text-white font-medium">
                            {broadcast.title}
                          </TableCell>
                          <TableCell className="text-gray-700 dark:text-gray-300">
                            {broadcast.recipients}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                              {broadcast.channel}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm text-gray-700 dark:text-gray-300">
                              {formatDateTime(broadcast.sentDate, broadcast.sentTime)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <p className="text-green-600 font-medium">{broadcast.delivered} delivered</p>
                              {broadcast.failed > 0 && (
                                <p className="text-red-600 text-xs">{broadcast.failed} failed</p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-700 dark:text-gray-300">
                            {broadcast.createdBy}
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline"
                              className={
                                broadcast.status === 'Sent' 
                                  ? 'bg-green-100 text-green-700 border-green-200' 
                                  : 'bg-blue-100 text-blue-700 border-blue-200'
                              }
                            >
                              {broadcast.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-6">
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-3xl transform translate-y-1 opacity-30"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl transform translate-y-0.5 opacity-50"></div>
            
            <Card className="relative rounded-3xl p-8 border-0 shadow-xl bg-white dark:bg-gray-900">
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent dark:from-white/5 rounded-3xl pointer-events-none"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl text-gray-900 dark:text-white tracking-tight">Message Templates</h3>
                  <Button 
                    onClick={() => setShowTemplateDialog(true)}
                    className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 shadow-lg rounded-xl"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Template
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 border border-gray-100 dark:border-gray-800"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-gray-900 dark:text-white font-medium mb-1">
                            {template.name}
                          </h4>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {template.type}
                            </Badge>
                            <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                              {template.category}
                            </Badge>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Send className="w-4 h-4 mr-2" />
                              Use Template
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                        {template.content}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>Used {template.usageCount} times</span>
                        <span>Last: {template.lastUsed}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Compose Message Dialog */}
      <Dialog open={showComposeDialog} onOpenChange={setShowComposeDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Compose Message</DialogTitle>
            <DialogDescription>Send a message to students, teachers, or parents</DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            <div className="space-y-4 py-4 pr-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="recipient-type">Recipient Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select recipient type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="teacher">Teacher</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="all">All Users</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="recipient">Select Recipient</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose recipient" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="r1">Emily Rodriguez</SelectItem>
                      <SelectItem value="r2">James Wilson</SelectItem>
                      <SelectItem value="r3">Sophia Lee</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Enter message subject" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Type your message here..." rows={6} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="channel">Channel</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select channel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="both">Email + SMS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </ScrollArea>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowComposeDialog(false)}>Cancel</Button>
            <Button 
              className="bg-gradient-to-r from-[#0A66C2] to-blue-600 hover:from-[#0052A3] hover:to-blue-700"
              onClick={() => {
                toast.success('Message sent successfully!');
                setShowComposeDialog(false);
              }}
            >
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Announcement Dialog */}
      <Dialog open={showAnnouncementDialog} onOpenChange={setShowAnnouncementDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Create Announcement</DialogTitle>
            <DialogDescription>Post a new announcement for the school community</DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            <div className="space-y-4 py-4 pr-4">
              <div className="space-y-2">
                <Label htmlFor="ann-title">Title</Label>
                <Input id="ann-title" placeholder="Enter announcement title" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ann-content">Content</Label>
                <Textarea id="ann-content" placeholder="Write your announcement..." rows={6} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ann-category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="holiday">Holiday</SelectItem>
                      <SelectItem value="event">Event</SelectItem>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="examination">Examination</SelectItem>
                      <SelectItem value="update">Update</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ann-audience">Target Audience</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select audience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="students">Students</SelectItem>
                      <SelectItem value="teachers">Teachers</SelectItem>
                      <SelectItem value="parents">Parents</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ann-priority">Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ann-status">Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Publish Now</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </ScrollArea>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAnnouncementDialog(false)}>Cancel</Button>
            <Button 
              className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
              onClick={() => {
                toast.success('Announcement created successfully!');
                setShowAnnouncementDialog(false);
              }}
            >
              <Megaphone className="w-4 h-4 mr-2" />
              Create Announcement
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* New Broadcast Dialog */}
      <Dialog open={showBroadcastDialog} onOpenChange={setShowBroadcastDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Create Broadcast</DialogTitle>
            <DialogDescription>Send mass messages to multiple recipients</DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            <div className="space-y-4 py-4 pr-4">
              <div className="space-y-2">
                <Label htmlFor="bc-title">Broadcast Title</Label>
                <Input id="bc-title" placeholder="Enter broadcast title" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bc-message">Message</Label>
                <Textarea id="bc-message" placeholder="Write your message..." rows={6} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bc-recipients">Recipients</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select recipients" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-parents">All Parents</SelectItem>
                      <SelectItem value="all-students">All Students</SelectItem>
                      <SelectItem value="all-teachers">All Teachers</SelectItem>
                      <SelectItem value="grade-10">Grade 10 Students</SelectItem>
                      <SelectItem value="grade-11">Grade 11 Students</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bc-channel">Channel</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select channel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="both">Email + SMS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bc-date">Schedule Date</Label>
                  <Input id="bc-date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bc-time">Schedule Time</Label>
                  <Input id="bc-time" type="time" />
                </div>
              </div>
            </div>
          </ScrollArea>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBroadcastDialog(false)}>Cancel</Button>
            <Button 
              variant="outline"
              onClick={() => {
                toast.success('Broadcast scheduled successfully!');
                setShowBroadcastDialog(false);
              }}
            >
              <Clock className="w-4 h-4 mr-2" />
              Schedule
            </Button>
            <Button 
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
              onClick={() => {
                toast.success('Broadcast sent successfully!');
                setShowBroadcastDialog(false);
              }}
            >
              <Send className="w-4 h-4 mr-2" />
              Send Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Template Dialog */}
      <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Create Template</DialogTitle>
            <DialogDescription>Create a reusable message template</DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh]">
            <div className="space-y-4 py-4 pr-4">
              <div className="space-y-2">
                <Label htmlFor="temp-name">Template Name</Label>
                <Input id="temp-name" placeholder="Enter template name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="temp-type">Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="temp-category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="attendance">Attendance</SelectItem>
                      <SelectItem value="examination">Examination</SelectItem>
                      <SelectItem value="event">Event</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="temp-content">Template Content</Label>
                <Textarea 
                  id="temp-content" 
                  placeholder="Write your template... Use [Name], [Date], [Amount] as placeholders" 
                  rows={8} 
                />
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-900 dark:text-blue-100 mb-2 font-medium">Available Placeholders:</p>
                <div className="grid grid-cols-3 gap-2 text-xs text-blue-700 dark:text-blue-300">
                  <span>[Name]</span>
                  <span>[Date]</span>
                  <span>[Time]</span>
                  <span>[Amount]</span>
                  <span>[Class]</span>
                  <span>[Subject]</span>
                </div>
              </div>
            </div>
          </ScrollArea>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTemplateDialog(false)}>Cancel</Button>
            <Button 
              className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700"
              onClick={() => {
                toast.success('Template created successfully!');
                setShowTemplateDialog(false);
              }}
            >
              <FileText className="w-4 h-4 mr-2" />
              Save Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
