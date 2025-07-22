import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
}

const EmotionTag = ({ emotion, variant = "default", onClick }: { emotion: string; variant?: "default" | "highlight"; onClick?: () => void }) => {
  const heightClass = "h-8"; // 32px height
  const baseClasses = `inline-flex items-center px-3 ${heightClass} rounded-full text-sm cursor-pointer transition-colors`;
  
  if (variant === "highlight") {
    return (
      <button onClick={onClick} className={cn(baseClasses, "bg-white text-black border border-white hover:bg-white hover:text-black")}>
        {emotion}
      </button>
    );
  }

  // For non-highlighted tags - white border only
  return (
    <button 
      onClick={onClick}
      className={cn(baseClasses, "border border-white text-white hover:bg-white hover:text-black")}
    >
      {emotion}
    </button>
  );
};

export function ChatMessage({ message, isUser, timestamp }: ChatMessageProps) {
  // Parse message for emotion tags to render them with styled borders
  const renderFormattedMessage = () => {
    if (isUser) return message;

    // Check if this is the emotional response message
    if (message.includes("Did you mean you're feeling")) {
      const lines = message.split('\n');
      const firstPart = lines.slice(0, 3);
      const remainingPart = lines.slice(3).join('\n');
      
      // Extract emotion tags to style
      const emotions = {
        sad: { text: "Sad", highlighted: true },
        anxious: { text: "anxious", highlighted: false },
        bored: { text: "bored", highlighted: false },
        romantic: { text: "Romantic", highlighted: false }
      };

      return (
        <>
          <div className="mb-3">
            Did you mean you're feeling{" "}
            <EmotionTag 
              emotion="Sad" 
              variant="highlight" 
              onClick={() => console.log("Sad clicked")}
            />
          </div>
          <div className="mb-4">
            Or perhaps{" "}
            <EmotionTag 
              emotion="anxious" 
              variant="default" 
              onClick={() => console.log("anxious clicked")}
            />{" "}
            <EmotionTag 
              emotion="bored" 
              variant="default" 
              onClick={() => console.log("bored clicked")}
            />{" "}
            <EmotionTag 
              emotion="Romantic" 
              variant="default" 
              onClick={() => console.log("Romantic clicked")}
            />{" "}?
          </div>
          <div>
            Click on above tags or type YES to confirm or choose from: {' '}
            {['angry', 'anxious', 'bored', 'confused', 'depressed', 'happy', 'heartbroken', 'lonely', 'romantic', 'sad', 'stressed', 'tired'].map((emotion, index) => (
              <React.Fragment key={index}>
                <span className="text-[#449AE0] cursor-pointer hover:underline">{emotion}</span>
                {index < 11 && <span className="text-foreground"> / </span>}
              </React.Fragment>
            ))}
          </div>
        </>
      );
    }
    
    return message;
  };

  return (
    <div className={cn("flex gap-3 max-w-6xl mx-auto p-4", isUser ? "flex-row-reverse" : "flex-row")}>
      <Avatar className="w-8 h-8 flex-shrink-0">
        <AvatarFallback className={cn("text-base", isUser ? "bg-primary text-primary-foreground" : "bg-muted")}>
          {isUser ? <User size={16} /> : <Bot size={16} />}
        </AvatarFallback>
      </Avatar>
      
      <div className={cn("flex flex-col", isUser ? "items-end" : "items-start")}>
        <div className={cn(
          "w-fit min-w-0 rounded-2xl px-4 py-3 text-base font-montserrat font-light leading-relaxed overflow-wrap-break-word",
          isUser 
            ? "max-w-md bg-primary text-primary-foreground rounded-br-md" 
            : "max-w-lg text-foreground"
        )}>
          {renderFormattedMessage()}
        </div>
        <span className="text-xs text-muted-foreground mt-1 px-1">
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
}