
import { ProfileForm } from '@/components/profile/ProfileForm';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { UserCircle } from 'lucide-react';

// In a real app, this data would come from your auth state/API
const mockUserData = {
  name: "Alex Doe",
  email: "alex.doe@example.com",
  bio: "Lifelong learner and tech enthusiast. Currently diving deep into AI and Next.js. Always open to new challenges and collaborations.",
  avatarUrl: "https://placehold.co/200x200.png",
  initials: "AD",
};

export default function ProfilePage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <header className="mb-10">
        <h1 className="text-4xl font-bold font-headline text-primary mb-2 flex items-center">
          <UserCircle className="mr-3 h-10 w-10" />
          My Profile
        </h1>
        <p className="text-xl text-muted-foreground">View and manage your account details.</p>
      </header>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card className="shadow-lg">
            <CardHeader className="items-center text-center">
              <Avatar className="h-32 w-32 mb-4 border-4 border-primary shadow-md" data-ai-hint="person portrait">
                <AvatarImage src={mockUserData.avatarUrl} alt={mockUserData.name} />
                <AvatarFallback className="text-4xl">{mockUserData.initials}</AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl">{mockUserData.name}</CardTitle>
              <CardDescription>{mockUserData.email}</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground px-4">{mockUserData.bio}</p>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
              <CardDescription>Keep your personal information up to date.</CardDescription>
            </CardHeader>
            <CardContent>
              <ProfileForm currentUserData={mockUserData} />
            </CardContent>
          </Card>
          
          <Separator className="my-8" />

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Security</CardTitle>
              <CardDescription>Manage your account security settings.</CardDescription>
            </CardHeader>
            <CardContent>
                {/* Placeholder for security settings like change password */}
                <p className="text-muted-foreground">Password settings and other security options will appear here.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
