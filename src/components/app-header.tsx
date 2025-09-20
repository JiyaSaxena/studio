import { ShieldCheck } from "lucide-react";

export function AppHeader() {
  return (
    <header className="border-b bg-background sticky top-0 z-10">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-8">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-7 w-7 text-foreground" />
          <h1 className="text-xl font-bold tracking-tight text-foreground">MuleScanner</h1>
        </div>
      </div>
    </header>
  );
}
