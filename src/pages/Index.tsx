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
    
    // Generate a sample response based on the user's message
    let response = "I understand you're asking about: " + userMessage + ". ";
    
    if (userMessage.toLowerCase().includes('code')) {
      response = "I'd be happy to help you with coding! Here's a basic example that might be useful for your request. Would you like me to explain any specific part or help you customize it further?";
    } else if (userMessage.toLowerCase().includes('plan')) {
      response = "Great idea! Here's a step-by-step plan I'd recommend: 1) Start by setting clear goals, 2) Break down the tasks into manageable pieces, 3) Set a timeline, and 4) Execute while staying flexible. Would you like me to elaborate on any of these steps?";
    } else if (userMessage.toLowerCase().includes('email')) {
      response = "I can help you draft a professional email. Here's a template you can customize: Start with a clear subject line, use a professional greeting, state your purpose clearly in the first paragraph, provide necessary details, and end with a polite call to action. Would you like me to help with any specific part?";
    } else if (userMessage.toLowerCase().includes('explain')) {
      response = "I'd be happy to explain that concept! Let me break it down into simple, easy-to-understand parts with real-world examples. This will help you grasp the fundamentals before we dive into more complex aspects.";
    } else {
      response = "That's an interesting question! I'm here to help you with a wide range of topics including writing, coding, planning, explaining concepts, and much more. Feel free to ask me anything specific, and I'll do my best to provide you with helpful and accurate information.";
    }
    
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
