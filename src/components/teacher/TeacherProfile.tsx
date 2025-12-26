import { useState, useEffect } from 'react';
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
import { teacherService } from '../../services';
import type { TeacherProfile as TeacherProfileType, UpdateTeacherProfileRequest } from '../../services/teacher.service';

export function TeacherProfile() {
  const [profile, setProfile] = useState<TeacherProfileType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [updateData, setUpdateData] = useState<UpdateTeacherProfileRequest>({});

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const response = await teacherService.getProfile();
      setProfile(response.data);
      setUpdateData({
        address: response.data.address,
        phone: response.data.phone,
        preferredLocale: response.data.preferredLocale,
        timezone: response.data.timezone,
        experienceYears: response.data.teacher?.experienceYears,
        specialization: response.data.teacher?.specialization,
        dateOfBirth: response.data.dateOfBirth,
      });
    } catch (error: any) {
      console.error('Failed to load profile:', error);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const response = await teacherService.updateProfile(updateData);
      setProfile(response.data);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      console.error('Failed to update profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (field: keyof UpdateTeacherProfileRequest, value: string | number | undefined) => {
    setUpdateData(prev => ({ ...prev, [field]: value }));
  };

  if (loading || !profile) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-96"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="lg:col-span-2 h-96 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  const fullName = `${profile.firstName} ${profile.lastName}`;
  const teachingStats = {
    totalClasses: 0,
    totalStudents: 0,
    avgAttendance: 0,
    avgGrade: 0,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-gray-900 dark:text-white mb-2">My Profile</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your personal information and preferences
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
                {profile.firstName.charAt(0)}
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white border-4 border-white dark:border-gray-800">
                  <Camera className="w-5 h-5" />
                </button>
              )}
            </div>
            <h2 className="text-2xl text-gray-900 dark:text-white mb-1">{fullName}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{profile.teacher?.qualification || 'Teacher'}</p>
            <Badge variant="outline" className="mb-4">
              {profile.teacher?.employeeId || 'N/A'}
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
                <span>Status: {profile.teacher?.employmentStatus || 'N/A'}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Teaching Stats */}
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
            <h3 className="text-lg text-gray-900 dark:text-white mb-4">Teaching Statistics</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Classes</p>
                <p className="text-2xl text-gray-900 dark:text-white">{teachingStats.totalClasses}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Students</p>
                <p className="text-2xl text-gray-900 dark:text-white">{teachingStats.totalStudents}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg Grade</p>
                <p className="text-2xl text-gray-900 dark:text-white">{teachingStats.avgGrade}%</p>
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
                  value="professional"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-0 pb-3"
                >
                  Professional Info
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
                          value={fullName}
                          disabled
                          className="pl-10 h-11 bg-gray-50 dark:bg-gray-900"
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
                          disabled
                          className="pl-10 h-11 bg-gray-50 dark:bg-gray-900"
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
                          value={updateData.phone || profile.phone || ''}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          disabled={!isEditing}
                          maxLength={15}
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
                          value={updateData.dateOfBirth || profile.dateOfBirth || ''}
                          onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                          disabled={!isEditing}
                          className="pl-10 h-11"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <Textarea
                        id="address"
                        value={updateData.address || profile.address || ''}
                        onChange={(e) => handleChange('address', e.target.value)}
                        disabled={!isEditing}
                        rows={3}
                        maxLength={200}
                        className="pl-10 resize-none"
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="professional" className="mt-0">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="employeeId">Employee ID</Label>
                      <div className="relative">
                        <Award className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="employeeId"
                          value={profile.employeeId}
                          disabled
                          className="pl-10 h-11 bg-gray-50 dark:bg-gray-900"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="joiningDate">Joining Date</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="joiningDate"
                          type="date"
                          value={profile.joiningDate}
                          disabled
                          className="pl-10 h-11 bg-gray-50 dark:bg-gray-900"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="qualification">Qualification</Label>
                      <div className="relative">
                        <Award className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="qualification"
                          value={profile.teacher?.qualification || ''}
                          disabled
                          className="pl-10 h-11 bg-gray-50 dark:bg-gray-900"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="specialization">Specialization</Label>
                      <div className="relative">
                        <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="specialization"
                          value={updateData.specialization || profile.teacher?.specialization || ''}
                          onChange={(e) => handleChange('specialization', e.target.value)}
                          disabled={!isEditing}
                          className="pl-10 h-11"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experience">Experience (Years)</Label>
                      <Input
                        id="experience"
                        type="number"
                        min="0"
                        value={updateData.experienceYears ?? profile.teacher?.experienceYears ?? 0}
                        onChange={(e) => handleChange('experienceYears', parseInt(e.target.value) || 0)}
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
