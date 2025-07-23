
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
  options?: string[];
  onOptionClick?: (option: string) => void;
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

export function ChatMessage({ message, isUser, timestamp, options, onOptionClick }: ChatMessageProps) {
  // For user messages, just return the message as is
  if (isUser) {
    return (
      <div className={cn("flex gap-3 max-w-6xl mx-auto p-4", "flex-row-reverse")}>
        <Avatar className="w-8 h-8 flex-shrink-0">
          <AvatarFallback className={cn("text-base", "bg-primary text-primary-foreground")}>
            <User size={16} />
          </AvatarFallback>
        </Avatar>
        
        <div className={cn("flex flex-col", "items-end")}>
          <div className={cn(
            "w-fit min-w-0 rounded-2xl px-4 py-3 text-base font-montserrat font-light leading-relaxed overflow-wrap-break-word",
            "max-w-md bg-primary text-primary-foreground rounded-br-md"
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

  // For AI messages, render the message with proper formatting
  const renderFormattedMessage = () => {
    // Split message by line breaks and render with proper formatting
    const lines = message.split('\n');
    return lines.map((line, index) => {
      if (line.trim() === '') return <br key={index} />;
      
      // Handle bold text with **
      const parts = line.split(/(\*\*.*?\*\*)/);
      return (
        <div key={index} className={index > 0 ? "mt-2" : ""}>
          {parts.map((part, partIndex) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              const boldContent = part.slice(2, -2);
              const moodWords = ['angry', 'anxious', 'bored', 'confused', 'depressed', 'happy', 'heartbroken', 'lonely', 'romantic', 'sad', 'stressed', 'tired'];
              
              // Check if the bold content is a mood word
              if (moodWords.includes(boldContent.toLowerCase())) {
                return (
                  <EmotionTag
                    key={partIndex}
                    emotion={boldContent.toLowerCase()}
                    onClick={() => onOptionClick?.(boldContent.toLowerCase())}
                  />
                );
              }
              
              return <strong key={partIndex}>{boldContent}</strong>;
            }
            
            // Check if this part contains mood tags and render them as clickable buttons
            const moodWords = ['angry', 'anxious', 'bored', 'confused', 'depressed', 'happy', 'heartbroken', 'lonely', 'romantic', 'sad', 'stressed', 'tired'];
            
            // Create a regex pattern to find mood words
            const moodPattern = new RegExp(`\\b(${moodWords.join('|')})\\b`, 'gi');
            const hasMoods = moodPattern.test(part);
            
            if (hasMoods) {
              // Reset the regex to start from beginning
              moodPattern.lastIndex = 0;
              
              const elements: React.ReactNode[] = [];
              let lastIndex = 0;
              let match;
              
              // Find all mood word matches
              while ((match = moodPattern.exec(part)) !== null) {
                // Add text before the mood word
                if (match.index > lastIndex) {
                  elements.push(part.slice(lastIndex, match.index));
                }
                
                // Add the mood word as a clickable tag
                const moodWord = match[1].toLowerCase();
                elements.push(
                  <EmotionTag
                    key={`mood-${partIndex}-${match.index}`}
                    emotion={moodWord}
                    onClick={() => onOptionClick?.(moodWord)}
                  />
                );
                
                lastIndex = match.index + match[0].length;
              }
              
              // Add remaining text after the last mood word
              if (lastIndex < part.length) {
                elements.push(part.slice(lastIndex));
              }
              
              return <span key={partIndex}>{elements}</span>;
            }
            
            return <span key={partIndex}>{part}</span>;
          })}
        </div>
      );
    });
  };

  return (
    <div className={cn("flex gap-3 max-w-6xl mx-auto p-4", "flex-row")}>
      <Avatar className="w-8 h-8 flex-shrink-0">
        <AvatarFallback className={cn("text-base", "bg-muted")}>
          <Bot size={16} />
        </AvatarFallback>
      </Avatar>
      
      <div className={cn("flex flex-col", "items-start")}>
        <div className={cn(
          "w-fit min-w-0 rounded-2xl px-4 py-3 text-base font-montserrat font-light leading-relaxed overflow-wrap-break-word",
          "max-w-lg text-foreground"
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
