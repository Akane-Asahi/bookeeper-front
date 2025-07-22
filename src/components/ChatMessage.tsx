import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
}

export function ChatMessage({ message, isUser, timestamp }: ChatMessageProps) {
  return (
    <div className={cn("flex gap-3 max-w-6xl mx-auto p-4", isUser ? "flex-row-reverse" : "flex-row")}>
      <Avatar className="w-8 h-8 flex-shrink-0">
        <AvatarFallback className={cn("text-base", isUser ? "bg-primary text-primary-foreground" : "bg-muted")}>
          {isUser ? <User size={16} /> : <Bot size={16} />}
        </AvatarFallback>
      </Avatar>
      
      <div className={cn("flex flex-col", isUser ? "items-end" : "items-start")}>
        <div className={cn(
          "max-w-md w-fit min-w-0 rounded-2xl px-4 py-3 text-base font-montserrat font-light leading-relaxed overflow-wrap-break-word",
          isUser 
            ? "bg-primary text-primary-foreground rounded-br-md" 
            : "text-foreground"
        )}>
          {message}
        </div>
        <span className="text-xs text-muted-foreground mt-1 px-1">
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
}