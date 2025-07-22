import { Clock, BookOpen, Heart, Frown, Angry, Smile } from "lucide-react";
import { Card } from "@/components/ui/card";

interface TimelineEntry {
  id: string;
  date: string;
  time: string;
  type: "recommendation" | "books";
  title: string;
  subtitle?: string;
  books?: string[];
  icon: "happy" | "sad" | "angry" | "anxious";
}

const timelineData: TimelineEntry[] = [
  {
    id: "1",
    date: "22/7",
    time: "3:14",
    type: "recommendation",
    title: "Top Book Recommendations",
    subtitle: "for feeling anxious...",
    icon: "anxious"
  },
  {
    id: "2",
    date: "28/7",
    time: "2:14",
    type: "recommendation",
    title: "Top Book Recommendations",
    subtitle: "for feeling happy...",
    icon: "happy"
  },
  {
    id: "3",
    date: "30/7",
    time: "13:14",
    type: "books",
    title: "Top Book Recommendations",
    subtitle: "for feeling angry...",
    books: ["Whispers of Memories", "Chronicles of Truth", "Breaking Chaos"],
    icon: "angry"
  },
  {
    id: "4",
    date: "07/8",
    time: "23:14",
    type: "recommendation",
    title: "Top Book Recommendations",
    subtitle: "for feeling sad...",
    icon: "sad"
  },
  {
    id: "5",
    date: "07/8",
    time: "23:14",
    type: "recommendation",
    title: "Top Book Recommendations",
    subtitle: "for feeling sad...",
    icon: "sad"
  },
  {
    id: "6",
    date: "07/8",
    time: "23:14",
    type: "recommendation",
    title: "Top Book Recommendations",
    subtitle: "for feeling sad...",
    icon: "sad"
  },
  {
    id: "7",
    date: "07/8",
    time: "23:14",
    type: "recommendation",
    title: "Top Book Recommendations",
    subtitle: "for feeling sad...",
    icon: "sad"
  },
  {
    id: "8",
    date: "07/8",
    time: "23:14",
    type: "recommendation",
    title: "Top Book Recommendations",
    subtitle: "for feeling sad...",
    icon: "sad"
  }
];

const getIconForMood = (mood: string) => {
  switch (mood) {
    case "happy":
      return <Smile className="w-4 h-4 text-green-400" />;
    case "sad":
      return <Frown className="w-4 h-4 text-blue-400" />;
    case "angry":
      return <Angry className="w-4 h-4 text-red-400" />;
    case "anxious":
      return <Heart className="w-4 h-4 text-yellow-400" />;
    default:
      return <BookOpen className="w-4 h-4 text-primary" />;
  }
};

export function Timeline() {
  return (
    <div className="min-h-screen bg-background text-foreground p-6 flex flex-col items-center">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl font-bold mb-8 text-center">Your Journey</h1>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-border"></div>
          
          {timelineData.map((entry, index) => (
            <div key={entry.id} className="relative flex items-center mb-8">
              {/* Date and time - left side */}
              <div className="flex-1 text-right mr-8">
                <div className="text-sm text-muted-foreground">2020</div>
                <div className="text-lg font-medium">{entry.date}</div>
                <div className="text-sm text-muted-foreground">{entry.time}</div>
              </div>
              
              {/* Timeline marker - center */}
              <div className="relative z-10 w-4 h-4 bg-muted-foreground rounded-full border-4 border-background"></div>
              
              {/* Content card - right side */}
              <div className="flex-1 ml-8">
                <Card className="p-4 bg-card border border-border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    {getIconForMood(entry.icon)}
                    <span className="text-sm font-medium">{entry.title}</span>
                  </div>
                  
                  {entry.subtitle && (
                    <p className="text-muted-foreground mb-3">{entry.subtitle}</p>
                  )}
                  
                  {entry.books && (
                    <div className="space-y-2">
                      {entry.books.map((book, bookIndex) => (
                        <div key={bookIndex} className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-primary" />
                          <span className="text-sm">{book}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}