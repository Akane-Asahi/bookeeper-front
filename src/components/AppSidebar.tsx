import { useState } from "react";
import { X, Clock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AppSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const chatItems = [
  { id: "01", title: "Chat number 01" },
  { id: "02", title: "Chat number 02" },
  { id: "03", title: "Chat number 03" },
  { id: "04", title: "Chat number 04" },
  { id: "05", title: "Chat number 05" },
];

export function AppSidebar({ isOpen, onClose, activeSection, onSectionChange }: AppSidebarProps) {

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 h-full w-80 bg-background border-r border-border z-40 transform transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={onClose}
          >
            <X size={20} />
          </Button>
          <div className="w-8" /> {/* Spacer for centering close button */}
          <div className="w-8" /> {/* Spacer for centering */}
        </div>

        {/* Navigation */}
        <div className="p-4 space-y-2">
          <Button
            variant={activeSection === "timelines" ? "secondary" : "ghost"}
            className="w-full justify-start h-10 text-left"
            onClick={() => onSectionChange("timelines")}
          >
            <Clock size={18} className="mr-3" />
            Timelines
          </Button>
          
          <Button
            variant={activeSection === "chats" ? "secondary" : "ghost"}
            className="w-full justify-start h-10 text-left"
            onClick={() => onSectionChange("chats")}
          >
            <MessageSquare size={18} className="mr-3" />
            Chats
          </Button>
        </div>

        {/* Chat List */}
        {activeSection === "chats" && (
          <div className="px-4 space-y-1">
            {chatItems.map((chat) => (
              <Button
                key={chat.id}
                variant="ghost"
                className="w-full justify-start h-10 text-left text-muted-foreground hover:text-foreground"
              >
                {chat.title}
              </Button>
            ))}
          </div>
        )}

        {/* User Profile at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
              <span className="text-white font-medium text-sm">T</span>
            </div>
            <div className="flex-1">
              <p className="font-medium">Telot</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}