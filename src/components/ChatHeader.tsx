import { Button } from "@/components/ui/button";
import { Menu, RefreshCw, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatHeaderProps {
  onMenuClick?: () => void;
  onRefreshChat?: () => void;
}

export function ChatHeader({ onMenuClick, onRefreshChat }: ChatHeaderProps) {
  return (
    <header className="border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="h-9 w-9 p-0 hover:bg-muted/50"
            onClick={onMenuClick}
          >
            <Menu size={20} />
          </Button>
          <div className="flex items-center gap-3">
            <h1 className="text-base font-medium">Bookeeper</h1>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-muted-foreground">
                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-9 w-9 p-0 hover:bg-muted/50"
            onClick={onRefreshChat}
          >
            <RefreshCw size={18} />
          </Button>
          <Button
            variant="ghost" 
            size="sm"
            className="h-8 w-8 rounded-full p-0 hover:bg-muted/50"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
          </Button>
        </div>
      </div>
    </header>
  );
}