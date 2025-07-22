import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Paperclip, Mic } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
      <div className="max-w-6xl mx-auto p-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <div className="flex-1 relative">
            <div className="flex items-center bg-[#1E1F20] rounded-[100px] px-6 h-12 transition-all duration-200 hover:bg-white/10">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="How are you feeling?"
                className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground/70 text-left text-base"
                disabled={disabled}
              />
              
              <div className="flex items-center gap-3 ml-4">
                <div className="p-2 rounded-full transition-all duration-200 hover:bg-white/10 cursor-pointer">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-muted-foreground hover:text-foreground transition-colors">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="9" cy="9" r="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="M21 15L16 10L5 21" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="p-2 rounded-full transition-all duration-200 hover:bg-white/10 cursor-pointer">
                  <Mic size={20} className="text-muted-foreground hover:text-foreground transition-colors" />
                </div>
              </div>
            </div>
          </div>
          <Button
            type="submit"
            size="sm"
            className={cn(
              "h-12 w-12 rounded-full p-0 bg-[#1E1F20] hover:!bg-white/10 transition-all duration-200",
              !message.trim() || disabled ? "cursor-not-allowed opacity-50" : ""
            )}
            disabled={!message.trim() || disabled}
          >
            <Send size={18} />
          </Button>
        </form>
      </div>
    </div>
  );
}