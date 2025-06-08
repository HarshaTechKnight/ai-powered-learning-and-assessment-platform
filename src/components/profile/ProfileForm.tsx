
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Save, Loader2, UploadCloud, Lock } from "lucide-react";
import { useState } from "react";

const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  bio: z.string().max(300, { message: "Bio cannot exceed 300 characters." }).optional(),
  // avatar: z.any().optional(), // For file uploads, handling is more complex
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface ProfileFormProps {
  currentUserData: {
    name: string;
    email: string;
    bio?: string;
    avatarUrl?: string;
  };
}

export function ProfileForm({ currentUserData }: ProfileFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: currentUserData.name || "",
      email: currentUserData.email || "",
      bio: currentUserData.bio || "",
    },
  });

  async function onSubmit(values: ProfileFormValues) {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Profile update values:", values);
    toast({
      title: "Profile Updated!",
      description: "Your profile information has been saved.",
    });
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little about yourself..."
                  className="resize-none"
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>Profile Picture</FormLabel>
           <div className="flex items-center gap-4">
            <Input id="avatar" type="file" className="flex-1" disabled/> 
            <Button type="button" variant="outline" disabled>
                <UploadCloud className="mr-2 h-4 w-4" />
                Upload (Soon)
            </Button>
           </div>
          <p className="text-xs text-muted-foreground mt-1">PNG, JPG, GIF up to 5MB. Avatar upload is not functional in this prototype.</p>
        </FormItem>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button type="submit" className="w-full sm:w-auto" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
           <Button type="button" variant="outline" className="w-full sm:w-auto" disabled>
            <Lock className="mr-2 h-4 w-4" />
            Change Password (Soon)
          </Button>
        </div>
      </form>
    </Form>
  );
}
