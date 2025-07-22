import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Code, MessageSquare, Search } from "lucide-react";

interface WelcomeScreenProps {
  onSamplePrompt: (prompt: string) => void;
}

const samplePrompts = [
  {
    icon: <Lightbulb size={20} />,
    title: "Suggest some psychological books",
    description: "to improve mental wellness",
    prompt: "Suggest some psychological books to improve mental wellness and provide brief explanations of why each book is valuable."
  },
  {
    icon: <Code size={20} />,
    title: "How can I be more confident",
    description: "and independent in my daily life",
    prompt: "How can I be more confident and independent in my daily life? Please provide practical tips and strategies."
  },
  {
    icon: <MessageSquare size={20} />,
    title: "Help me create a workout plan",
    description: "for building strength at home",
    prompt: "Help me create an effective workout plan for building strength at home with minimal equipment."
  },
  {
    icon: <Search size={20} />,
    title: "Explain productivity techniques",
    description: "that actually work",
    prompt: "Explain proven productivity techniques that actually work and how to implement them in daily life."
  }
];

export function WelcomeScreen({ onSamplePrompt }: WelcomeScreenProps) {
  return (
    <div className="flex-1 flex flex-col items-start justify-center p-6 md:p-12 max-w-6xl mx-auto">
      <div className="mb-12 max-w-4xl">
        <h1 className="text-5xl font-bold mb-4 leading-tight bg-gradient-primary bg-clip-text text-transparent">
          Hello, Telot
        </h1>
        <p className="text-muted-foreground text-3xl font-bold">
          How can I help you today?
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-4xl">
        {samplePrompts.map((sample, index) => (
          <Card 
            key={index}
            className="cursor-pointer hover:bg-muted/80 transition-all duration-200 border-border/50 group bg-muted/30 hover:border-border/80"
            onClick={() => onSamplePrompt(sample.prompt)}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1">
                  {sample.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium mb-2 text-foreground leading-snug">{sample.title}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">{sample.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-12 w-full max-w-4xl">
        <p className="text-base text-muted-foreground/70">
          Telot may display inaccurate info, including about people, so double-check its responses.
        </p>
      </div>
    </div>
  );
}