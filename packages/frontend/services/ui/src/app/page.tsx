'use client';

import {
  BarChart3,
  BookOpen,
  Calendar,
  CreditCard,
  GraduationCap,
  Users,
} from 'lucide-react';
import { useState } from 'react';

import { SignInForm } from '@/components/forms/signin';
import { Header } from '@/components/header';
import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useSessionRedirection } from '@/hooks/useRedirectedSession';

export default function Page() {
  useSessionRedirection('/dashboard');

  const [showSignIn, setShowSignIn] = useState(false);

  const features = [
    {
      description:
        'Efficiently manage students, teachers, and staff with role-based access control.',
      icon: Users,
      title: 'User Management',
    },
    {
      description:
        'Create, organize, and track courses, schedules, and curriculum across all programs.',
      icon: BookOpen,
      title: 'Course Administration',
    },
    {
      description:
        'Seamlessly organize terms, semesters, and academic years with automatic rollover.',
      icon: Calendar,
      title: 'Academic Years',
    },
    {
      description:
        'Handle tuition, fees, and payments with integrated billing and financial tracking.',
      icon: CreditCard,
      title: 'Payment Processing',
    },
    {
      description:
        'Gain insights with comprehensive reports on enrollment, performance, and finances.',
      icon: BarChart3,
      title: 'Analytics & Reports',
    },
    {
      description:
        'Manage multiple academies from a single platform with customized settings.',
      icon: GraduationCap,
      title: 'Multi-Academy Support',
    },
  ];

  if (showSignIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
        <div className="absolute top-4 right-4">
          <ModeToggle />
        </div>
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-2">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-primary text-primary-foreground rounded-full p-3">
                <GraduationCap className="w-8 h-8" />
              </div>
            </div>
            <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">
              Sign in to access your academy dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <SignInForm />
            <div className="text-center space-y-2">
              <Button
                variant="ghost"
                onClick={() => {
                  setShowSignIn(false);
                }}
                className="text-sm"
              >
                ← Back to home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Header */}
      <Header
        onSignInClick={() => {
          setShowSignIn(true);
        }}
      />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block">
              <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                Complete Academy Management Solution
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Simplify Your
              <span className="text-primary"> Academy </span>
              Operations
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Streamline student enrollment, course management, payments, and
              administrative tasks all in one powerful platform. Built for
              modern educational institutions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="text-base"
                onClick={() => {
                  setShowSignIn(true);
                }}
              >
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="text-base">
                Watch Demo
              </Button>
            </div>
            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Academies</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">50K+</div>
                <div className="text-sm text-muted-foreground">Students</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <div className="text-center space-y-4 p-8">
                <GraduationCap className="w-32 h-32 mx-auto text-primary/40" />
                <p className="text-muted-foreground">Hero Image Placeholder</p>
                <p className="text-sm text-muted-foreground">
                  Dashboard preview or academy illustration
                </p>
              </div>
            </div>
            {/* Floating cards for visual interest */}
            <div className="absolute -top-4 -right-4 bg-background border rounded-lg p-4 shadow-lg hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="bg-secondary/20 rounded-full p-2">
                  <Calendar className="w-5 h-5 text-secondary-foreground" />
                </div>
                <div>
                  <div className="font-semibold text-sm">New Semester</div>
                  <div className="text-xs text-muted-foreground">
                    Starting Soon
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-background border rounded-lg p-4 shadow-lg hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="bg-primary/20 rounded-full p-2">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-sm">245 Active</div>
                  <div className="text-xs text-muted-foreground">
                    Students Online
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20 bg-background/50">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            Everything You Need to
            <span className="text-primary"> Manage Your Academy</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to make academy administration efficient,
            organized, and effortless.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow duration-300 border-2 hover:border-primary/50"
            >
              <CardHeader>
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border-0 shadow-2xl">
          <CardContent className="p-12 text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Transform Your Academy?
            </h2>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              Join hundreds of educational institutions using Academy Manager to
              streamline their operations and focus on what matters
              most—education.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button
                size="lg"
                variant="secondary"
                className="text-base border border-secondary-foreground/70"
                onClick={() => {
                  setShowSignIn(true);
                }}
              >
                Get Started Free
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base bg-background/10 hover:bg-background/20 text-primary-foreground border-primary-foreground/30"
              >
                Contact Sales
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background/80 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="bg-primary text-primary-foreground rounded-lg p-1.5">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-semibold">Academy Manager</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 Academy Manager. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
