import { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Award, BookOpen, Save, Camera } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { toast } from 'sonner@2.0.3';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface StudentProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  studentId: string;
  class: string;
  section: string;
  rollNumber: string;
  admissionDate: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  emergencyContact: string;
  medicalInfo: string;
}

const mockProfile: StudentProfile = {
  name: 'Emily Rodriguez',
  email: 'emily.rodriguez@school.edu',
  phone: '+92 300-1234567',
  address: 'House 456, Street 78, G-9/1, Islamabad',
  dateOfBirth: '2008-03-15',
  gender: 'Female',
  bloodGroup: 'O+',
  studentId: 'STU-2024-001',
  class: 'Grade 10',
  section: 'A',
  rollNumber: '15',
  admissionDate: '2020-08-01',
  parentName: 'Maria Rodriguez',
  parentPhone: '+92 300-7654321',
  parentEmail: 'maria.rodriguez@email.com',
  emergencyContact: '+92 301-9876543',
  medicalInfo: 'No known allergies'
};

const academicStats = {
  currentGPA: 3.8,
  attendance: 95,
  rank: 5,
  totalStudents: 120,
  subjects: 10,
  completedAssignments: 45,
  totalAssignments: 50
};

export function StudentProfile() {
  const [profile, setProfile] = useState<StudentProfile>(mockProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    }, 1500);
  };

  const handleChange = (field: keyof StudentProfile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-gray-900 dark:text-white mb-2">My Profile</h1>
          <p className="text-gray-600 dark:text-gray-400">
            View and manage your profile information
          </p>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700 text-white">
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
            <Button onClick={() => setIsEditing(false)} variant="outline">
              Cancel
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="relative inline-block mb-4">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-4xl mx-auto">
                {profile.name.charAt(0)}
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white border-4 border-white dark:border-gray-800">
                  <Camera className="w-5 h-5" />
                </button>
              )}
            </div>
            <h2 className="text-2xl text-gray-900 dark:text-white mb-1">{profile.name}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{profile.class} - Section {profile.section}</p>
            <Badge variant="outline" className="mb-4">
              Roll No: {profile.rollNumber}
            </Badge>
            <Badge variant="outline">
              {profile.studentId}
            </Badge>

            <div className="space-y-3 text-sm text-left mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{profile.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>{profile.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>{profile.address}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                <Calendar className="w-4 h-4 flex-shrink-0" />
                <span>Joined: {new Date(profile.admissionDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Academic Stats */}
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
            <h3 className="text-lg text-gray-900 dark:text-white mb-4">Academic Statistics</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">GPA</p>
                <p className="text-2xl text-gray-900 dark:text-white">{academicStats.currentGPA}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Attendance</p>
                <p className="text-2xl text-gray-900 dark:text-white">{academicStats.attendance}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Class Rank</p>
                <p className="text-2xl text-gray-900 dark:text-white">#{academicStats.rank}</p>
              </div>
            </div>
          </Card>

          {/* Profile Information */}
          <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="w-full justify-start bg-transparent border-b border-gray-200 dark:border-gray-700 rounded-none h-auto p-0 space-x-8 mb-6">
                <TabsTrigger 
                  value="personal"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-0 pb-3"
                >
                  Personal Info
                </TabsTrigger>
                <TabsTrigger 
                  value="academic"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-0 pb-3"
                >
                  Academic Info
                </TabsTrigger>
                <TabsTrigger 
                  value="parent"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-0 pb-3"
                >
                  Parent Info
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="mt-0">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="name"
                          value={profile.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          disabled={!isEditing}
                          className="pl-10 h-11"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          value={profile.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          disabled={!isEditing}
                          className="pl-10 h-11"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="phone"
                          type="tel"
                          value={profile.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          disabled={!isEditing}
                          className="pl-10 h-11"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dob">Date of Birth</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="dob"
                          type="date"
                          value={profile.dateOfBirth}
                          onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                          disabled={!isEditing}
                          className="pl-10 h-11"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select value={profile.gender} onValueChange={(value) => handleChange('gender', value)} disabled={!isEditing}>
                        <SelectTrigger className="h-11">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="blood">Blood Group</Label>
                      <Select value={profile.bloodGroup} onValueChange={(value) => handleChange('bloodGroup', value)} disabled={!isEditing}>
                        <SelectTrigger className="h-11">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A+">A+</SelectItem>
                          <SelectItem value="A-">A-</SelectItem>
                          <SelectItem value="B+">B+</SelectItem>
                          <SelectItem value="B-">B-</SelectItem>
                          <SelectItem value="O+">O+</SelectItem>
                          <SelectItem value="O-">O-</SelectItem>
                          <SelectItem value="AB+">AB+</SelectItem>
                          <SelectItem value="AB-">AB-</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <Textarea
                        id="address"
                        value={profile.address}
                        onChange={(e) => handleChange('address', e.target.value)}
                        disabled={!isEditing}
                        rows={3}
                        className="pl-10 resize-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="medical">Medical Information</Label>
                    <Textarea
                      id="medical"
                      value={profile.medicalInfo}
                      onChange={(e) => handleChange('medicalInfo', e.target.value)}
                      disabled={!isEditing}
                      rows={2}
                      className="resize-none"
                      placeholder="Any allergies or medical conditions..."
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="academic" className="mt-0">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="studentId">Student ID</Label>
                      <Input
                        id="studentId"
                        value={profile.studentId}
                        disabled
                        className="h-11 bg-gray-50 dark:bg-gray-900"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="rollNumber">Roll Number</Label>
                      <Input
                        id="rollNumber"
                        value={profile.rollNumber}
                        disabled
                        className="h-11 bg-gray-50 dark:bg-gray-900"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="class">Class</Label>
                      <Input
                        id="class"
                        value={profile.class}
                        disabled
                        className="h-11 bg-gray-50 dark:bg-gray-900"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="section">Section</Label>
                      <Input
                        id="section"
                        value={profile.section}
                        disabled
                        className="h-11 bg-gray-50 dark:bg-gray-900"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="admission">Admission Date</Label>
                      <Input
                        id="admission"
                        type="date"
                        value={profile.admissionDate}
                        disabled
                        className="h-11 bg-gray-50 dark:bg-gray-900"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="parent" className="mt-0">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="parentName">Parent/Guardian Name</Label>
                      <Input
                        id="parentName"
                        value={profile.parentName}
                        onChange={(e) => handleChange('parentName', e.target.value)}
                        disabled={!isEditing}
                        className="h-11"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="parentPhone">Parent Phone</Label>
                      <Input
                        id="parentPhone"
                        type="tel"
                        value={profile.parentPhone}
                        onChange={(e) => handleChange('parentPhone', e.target.value)}
                        disabled={!isEditing}
                        className="h-11"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="parentEmail">Parent Email</Label>
                      <Input
                        id="parentEmail"
                        type="email"
                        value={profile.parentEmail}
                        onChange={(e) => handleChange('parentEmail', e.target.value)}
                        disabled={!isEditing}
                        className="h-11"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="emergency">Emergency Contact</Label>
                      <Input
                        id="emergency"
                        type="tel"
                        value={profile.emergencyContact}
                        onChange={(e) => handleChange('emergencyContact', e.target.value)}
                        disabled={!isEditing}
                        className="h-11"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
}
