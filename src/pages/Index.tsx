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
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("chats");

  const simulateAIResponse = async (userMessage: string) => {
    setIsTyping(true);
    
    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
    
    // Default emotional intelligence response matching the image
    const response = `Did you mean you're feeling Sad\nOr perhaps anxious bored\nRomantic ?\n\nClick on above tags or type YES to confirm or choose from: angry / anxious / bored / confused / depressed / happy / heartbroken / lonely / romantic / sad / stressed / tired`;
    
    setIsTyping(false);
    
    const aiMessage: Message = {
      id: Date.now().toString() + '_ai',
      text: response,
      isUser: false,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, aiMessage]);
  };

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate AI response
    await simulateAIResponse(text);
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
