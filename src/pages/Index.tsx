import { useState } from "react";
import { ChatHeader } from "@/components/ChatHeader";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { TypingIndicator } from "@/components/TypingIndicator";
import { AppSidebar } from "@/components/AppSidebar";
import { Timeline } from "@/components/Timeline";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  options?: string[];
}

const allMoods = ["angry", "anxious", "bored", "confused", "depressed", "happy", "heartbroken", "lonely", "romantic", "sad", "stressed", "tired"];

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("chats");
  const [lastSuggestedMood, setLastSuggestedMood] = useState<string | null>(null);

  const simulateAIResponse = async (message: string, confirmedMood: string | null = null) => {
    setIsTyping(true);
    
    try {
      const response = await fetch('https://05933e055648.ngrok-free.app/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: message,
          confirmed_mood: confirmedMood,
        }),
      });

      if (!response.ok) {
        throw new Error('Server error');
      }

      const data = await response.json();
      
      setIsTyping(false);
      
      let aiMessage: Message;
      
      if (data.top_guesses) {
        // AI is asking the user to confirm a mood - extract the first suggested mood
        const firstSuggestedMood = data.top_guesses[0];
        setLastSuggestedMood(firstSuggestedMood);
        
        aiMessage = {
          id: Date.now().toString() + '_ai',
          text: data.response,
          isUser: false,
          timestamp: new Date(),
          options: data.mood_choices,
        };
      } else if (data.response) {
        // Final book recommendation
        aiMessage = {
          id: Date.now().toString() + '_ai',
          text: data.response,
          isUser: false,
          timestamp: new Date(),
        };
      } else {
        aiMessage = {
          id: Date.now().toString() + '_ai',
          text: "Sorry, I couldn't understand that.",
          isUser: false,
          timestamp: new Date(),
        };
      }
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      setIsTyping(false);
      
      const errorMessage: Message = {
        id: Date.now().toString() + '_ai',
        text: "Sorry, the server is offline. Please try again later.",
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
      toast.error("Unable to connect to the mood detection service");
    }
  };

  const handleUserResponse = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);

    // Check if it's a YES confirmation
    if (text.toLowerCase() === 'yes' && lastSuggestedMood) {
      await simulateAIResponse(text, lastSuggestedMood);
      setLastSuggestedMood(null); // Clear the suggested mood after confirmation
      return;
    }

    // Check if it's a direct mood selection
    const isMoodConfirmation = allMoods.includes(text.toLowerCase());
    if (isMoodConfirmation) {
      setLastSuggestedMood(null); // Clear any previous suggested mood
      await simulateAIResponse(text, text);
    } else {
      await simulateAIResponse(text, null);
    }
  };

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Check if it's a YES confirmation
    if (text.toLowerCase() === 'yes' && lastSuggestedMood) {
      await simulateAIResponse(text, lastSuggestedMood);
      setLastSuggestedMood(null); // Clear the suggested mood after confirmation
      return;
    }

    // Check if it's a direct mood selection
    const isMoodConfirmation = allMoods.includes(text.toLowerCase());
    if (isMoodConfirmation) {
      setLastSuggestedMood(null); // Clear any previous suggested mood
      await simulateAIResponse(text, text);
    } else {
      await simulateAIResponse(text, null);
    }
  };

  const handleSamplePrompt = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const handleRefreshChat = () => {
    setMessages([]);
    setIsTyping(false);
  };

  const handleMenuClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-montserrat">
      <AppSidebar 
        isOpen={isSidebarOpen} 
        onClose={handleCloseSidebar} 
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />
      <ChatHeader onRefreshChat={handleRefreshChat} onMenuClick={handleMenuClick} />
      
      {activeSection === "timelines" ? (
        <Timeline />
      ) : (
        <>
          <div className="flex-1 flex flex-col pb-24">
            {messages.length === 0 ? (
              <WelcomeScreen onSamplePrompt={handleSamplePrompt} />
            ) : (
              <ScrollArea className="flex-1">
                <div className="py-4">
                  {messages.map((message) => (
                    <ChatMessage
                      key={message.id}
                      message={message.text}
                      isUser={message.isUser}
                      timestamp={message.timestamp}
                      options={message.options}
                      onOptionClick={handleUserResponse}
                    />
                  ))}
                  {isTyping && <TypingIndicator />}
                </div>
              </ScrollArea>
            )}
          </div>
          
          <ChatInput 
            onSendMessage={handleSendMessage} 
            disabled={isTyping}
          />
        </>
      )}
    </div>
  );
};

export default Index;
