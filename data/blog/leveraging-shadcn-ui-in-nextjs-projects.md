---
title: Leveraging shadcn/ui in Next.js Projects - A Complete Guide
date: 2024-01-10 00:00:00 Z
categories: ['Web Development']
tags:
  - shadcn
  - UI Components
  - Next.js
  - React
  - Tailwind CSS
image: /static/images/shadcn-ui-components.jpg
math: false
draft: false
summary: Learn how to use the shadcn/ui component collection to build beautiful, accessible interfaces in your Next.js projects. This guide covers installation, customization, and best practices.
---

# Leveraging shadcn/ui in Next.js Projects

When building modern web applications with Next.js, having a reliable and customizable UI component library is essential. Enter **shadcn/ui** - not a traditional component library, but a collection of reusable components built with Radix UI and Tailwind CSS.

## What Makes shadcn/ui Different?

Unlike traditional component libraries that you install as dependencies, shadcn/ui provides components that you copy into your project. This approach offers several unique benefits:

- **Complete ownership** - You own the components and can modify them to fit your needs
- **No version conflicts** - No need to wait for library updates or worry about breaking changes
- **Optimized bundle size** - Only include the components you actually use
- **Consistent design language** - Built on Radix UI primitives for accessibility and customizability
- **Tailwind integration** - Seamless theming with your existing Tailwind setup

## Getting Started with shadcn/ui

First, let's set up shadcn/ui in a Next.js project:

```bash
# Create a new Next.js project if you don't have one
pnpm create next-app my-app

# Navigate to your project
cd my-app

# Initialize shadcn/ui
npx shadcn@latest init
```

During initialization, you'll be prompted to answer some questions about your project setup. Here's a recommended configuration:

```
Would you like to use TypeScript? Yes
Which style would you like to use? Default
Which color would you like to use as base color? Slate
Where is your global CSS file? app/globals.css
Do you want to use CSS variables for colors? Yes
Where is your tailwind.config.js located? tailwind.config.js
Configure the import alias for components? Yes: @/components
Configure the import alias for utils? Yes: @/lib/utils
```

## Adding Components

Once initialized, you can add components as needed:

```bash
# Add individual components
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add card
pnpm dlx shadcn@latest add dialog

# Or add multiple components at once
pnpm dlx shadcn@latest add button card dialog dropdown-menu
```

Each component will be added to your project's `components/ui` directory, where you can inspect and modify it as needed.

## Key Components and Usage Examples

Let's look at some of the most commonly used shadcn/ui components and how to implement them:

### Buttons

The Button component is versatile and customizable:

```tsx
import { Button } from "@/components/ui/button";

export function ButtonDemo() {
  return (
    <div className="flex gap-4">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  );
}
```

### Cards

Cards provide a flexible container for content:

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function CardWithForm() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Your form elements here */}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Submit</Button>
      </CardFooter>
    </Card>
  );
}
```

### Dialog (Modal)

For interactive dialogs and modals:

```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Dialog content here */}
        </div>
        <Button type="submit">Save changes</Button>
      </DialogContent>
    </Dialog>
  );
}
```

## Customization Strategies

One of shadcn/ui's strengths is its customizability. Here are some approaches:

### 1. Modifying the Component Code

Since you own the components, you can directly edit their source:

```tsx
// Before: components/ui/button.tsx
export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium...",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        // ...
      },
    },
  }
);

// After: Add your custom variant
export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium...",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        // ...
        custom: "bg-purple-600 text-white hover:bg-purple-700", // Your custom variant
      },
    },
  }
);
```

### 2. Extending with Tailwind Classes

You can add Tailwind classes when using the components:

```tsx
<Button className="bg-gradient-to-r from-cyan-500 to-blue-500 border-none">
  Gradient Button
</Button>
```

### 3. Theming with CSS Variables

shadcn/ui uses CSS variables for theming, which you can customize in your globals.css:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  
  /* ...customize other variables... */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  
  /* ...customize dark mode variables... */
}
```

## Advanced Usage Patterns

### 1. Composition

Combine multiple components to create more complex UIs:

```tsx
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export function TabsDemo() {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {/* Account form fields */}
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        {/* Password tab content */}
      </TabsContent>
    </Tabs>
  );
}
```

### 2. Creating Component Variants

For frequently used component combinations, create custom variants:

```tsx
// components/ui/custom-button.tsx
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CustomButtonProps extends ButtonProps {
  isProcessing?: boolean;
}

export function CustomButton({
  children,
  isProcessing,
  className,
  disabled,
  ...props
}: CustomButtonProps) {
  return (
    <Button
      className={cn(className)}
      disabled={isProcessing || disabled}
      {...props}
    >
      {isProcessing ? (
        <>
          <Spinner className="mr-2 h-4 w-4" />
          Processing...
        </>
      ) : (
        children
      )}
    </Button>
  );
}
```

## Performance Considerations

shadcn/ui components are designed with performance in mind, but here are some tips to ensure optimal performance:

1. **Only add components you need** - This keeps your bundle size small
2. **Use dynamic imports for large components** - For components only used on certain pages
3. **Implement proper memoization** - Use React.memo for components that render frequently
4. **Optimize event handlers** - Use useCallback for functions passed to components

## Conclusion

shadcn/ui represents a fresh approach to component libraries that aligns perfectly with the Next.js philosophy - providing powerful building blocks that you can own and customize. By leveraging shadcn/ui in your Next.js projects, you can build beautiful, accessible interfaces without sacrificing performance or flexibility.

Whether you're building a simple landing page or a complex web application, shadcn/ui provides the foundation you need to create polished user experiences with minimal effort. 