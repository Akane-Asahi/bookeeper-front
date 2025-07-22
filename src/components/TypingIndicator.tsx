import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot } from "lucide-react";

export function TypingIndicator() {
  return (
    <div className="flex gap-3 max-w-6xl mx-auto p-4">
      <Avatar className="w-8 h-8 flex-shrink-0">
        <AvatarFallback className="bg-muted">
          <Bot size={16} />
        </AvatarFallback>
      </Avatar>
      
      <div className="flex items-center">
        <div className="bg-muted/50 rounded-2xl rounded-bl-md px-4 py-3">
          <div className="flex items-center">
            <span className="font-medium text-foreground">Bookeeper Analyzing</span>
            <div className="flex ml-2">
              <span className="animate-bounce" style={{ animationDelay: '0ms' }}>.</span>
              <span className="animate-bounce" style={{ animationDelay: '150ms' }}>.</span>
              <span className="animate-bounce" style={{ animationDelay: '300ms' }}>.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}