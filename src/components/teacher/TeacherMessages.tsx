import { useState } from 'react';
import { Send, Search, Paperclip, MoreVertical, Users, User } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Avatar } from '../ui/avatar';
import { ScrollArea } from '../ui/scroll-area';

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  isMe: boolean;
}

interface Conversation {
  id: number;
  name: string;
  role: 'student' | 'parent' | 'teacher';
  lastMessage: string;
  timestamp: string;
  unread: number;
  avatar?: string;
}

const mockConversations: Conversation[] = [
  {
    id: 1,
    name: 'Mrs. Saima Khan (Parent)',
    role: 'parent',
    lastMessage: 'Thank you for the progress update on Ahmed...',
    timestamp: '10 min ago',
    unread: 2
  },
  {
    id: 2,
    name: 'Fatima Khan',
    role: 'student',
    lastMessage: 'I have a question about the assignment...',
    timestamp: '1 hour ago',
    unread: 1
  },
  {
    id: 3,
    name: 'Mr. Ali Raza (Parent)',
    role: 'parent',
    lastMessage: 'When is the next parent-teacher meeting?',
    timestamp: '3 hours ago',
    unread: 0
  },
  {
    id: 4,
    name: 'Dr. Sarah Ahmed',
    role: 'teacher',
    lastMessage: 'Can we discuss the exam schedule?',
    timestamp: 'Yesterday',
    unread: 0
  },
];

const mockMessages: Message[] = [
  {
    id: 1,
    sender: 'Mrs. Saima Khan',
    content: 'Hello! I wanted to ask about Ahmed\'s recent test results.',
    timestamp: '2:30 PM',
    isMe: false
  },
  {
    id: 2,
    sender: 'You',
    content: 'Hello Mrs. Khan! Ahmed did well on the recent test, scoring 78%. He showed improvement in algebra.',
    timestamp: '2:32 PM',
    isMe: true
  },
  {
    id: 3,
    sender: 'Mrs. Saima Khan',
    content: 'That\'s great to hear! Are there any areas where he needs more practice?',
    timestamp: '2:35 PM',
    isMe: false
  },
  {
    id: 4,
    sender: 'You',
    content: 'He could benefit from more practice in geometry, particularly word problems. I\'ve assigned some extra homework that will help.',
    timestamp: '2:38 PM',
    isMe: true
  },
  {
    id: 5,
    sender: 'Mrs. Saima Khan',
    content: 'Thank you for the progress update on Ahmed. We\'ll work on geometry at home.',
    timestamp: '2:40 PM',
    isMe: false
  },
];

export function TeacherMessages() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(mockConversations[0]);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = mockConversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // TODO: Integrate with actual messaging API
      setMessageText('');
    }
  };

  const getRoleColor = (role: Conversation['role']) => {
    switch (role) {
      case 'parent': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400';
      case 'student': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400';
      case 'teacher': return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl text-gray-900 dark:text-white mb-2">Messages</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Communicate with students, parents, and colleagues
        </p>
      </div>

      {/* Messages Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversations List */}
        <Card className="lg:col-span-1 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search conversations..."
                className="pl-10 h-11"
              />
            </div>
          </div>

          <ScrollArea className="h-[600px]">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  className={`p-4 cursor-pointer transition-colors ${
                    selectedConversation?.id === conversation.id
                      ? 'bg-blue-50 dark:bg-blue-900/20'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-900/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white flex-shrink-0">
                      {conversation.role === 'parent' ? (
                        <Users className="w-6 h-6" />
                      ) : (
                        <User className="w-6 h-6" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm text-gray-900 dark:text-white truncate">
                          {conversation.name}
                        </h4>
                        <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0 ml-2">
                          {conversation.timestamp}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className={`text-xs ${getRoleColor(conversation.role)}`}>
                          {conversation.role}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                          {conversation.lastMessage}
                        </p>
                        {conversation.unread > 0 && (
                          <Badge className="ml-2 bg-blue-600 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full p-0">
                            {conversation.unread}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white">
                    {selectedConversation.role === 'parent' ? (
                      <Users className="w-5 h-5" />
                    ) : (
                      <User className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-900 dark:text-white">
                      {selectedConversation.name}
                    </h3>
                    <Badge variant="outline" className={`text-xs ${getRoleColor(selectedConversation.role)}`}>
                      {selectedConversation.role}
                    </Badge>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-6 h-[450px]">
                <div className="space-y-4">
                  {mockMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[70%] ${message.isMe ? 'order-2' : 'order-1'}`}>
                        <div
                          className={`rounded-lg p-4 ${
                            message.isMe
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>
                        <p className={`text-xs text-gray-500 dark:text-gray-400 mt-1 ${message.isMe ? 'text-right' : 'text-left'}`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-end gap-3">
                  <Button variant="outline" size="sm" className="flex-shrink-0">
                    <Paperclip className="w-5 h-5" />
                  </Button>
                  <Textarea
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Type your message..."
                    rows={2}
                    className="resize-none flex-1"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button
                    onClick={handleSendMessage}
                    className="bg-blue-600 hover:bg-blue-700 text-white flex-shrink-0"
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Press Enter to send, Shift+Enter for new line
                </p>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg text-gray-900 dark:text-white mb-2">No conversation selected</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Choose a conversation from the list to start messaging
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
