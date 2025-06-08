
import { LoginForm } from '@/components/auth/LoginForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <Card className="shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-headline">Welcome Back!</CardTitle>
        <CardDescription>Sign in to continue your learning journey.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <LoginForm />
        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="font-medium text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
