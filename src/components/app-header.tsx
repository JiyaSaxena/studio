import { ShieldCheck } from "lucide-react";

export function AppHeader() {
  return (
    <header className="border-b bg-card sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-8">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-7 w-7 text-primary" />
          <h1 className="text-xl font-bold tracking-tight text-foreground">MuleDetect</h1>
        </div>
      </div>
    </header>
  );
}
