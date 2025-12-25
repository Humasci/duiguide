import { useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, RotateCcw, Check } from "lucide-react";

interface TreeNode {
  id: string;
  question?: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  href?: string;
  options?: {
    label: string;
    nextId: string;
  }[];
  isEndpoint?: boolean;
}

interface DecisionTreeProps {
  nodes: TreeNode[];
  startNodeId: string;
  className?: string;
}

const DecisionTree = ({ nodes, startNodeId, className }: DecisionTreeProps) => {
  const [currentNodeId, setCurrentNodeId] = useState(startNodeId);
  const [history, setHistory] = useState<string[]>([]);
  const [animating, setAnimating] = useState(false);

  const currentNode = nodes.find(n => n.id === currentNodeId);
  const historyNodes = history.map(id => nodes.find(n => n.id === id)).filter(Boolean) as TreeNode[];

  const handleOptionClick = (nextId: string) => {
    setAnimating(true);
    setHistory([...history, currentNodeId]);
    
    setTimeout(() => {
      setCurrentNodeId(nextId);
      setAnimating(false);
    }, 150);
  };

  const handleReset = () => {
    setAnimating(true);
    setTimeout(() => {
      setCurrentNodeId(startNodeId);
      setHistory([]);
      setAnimating(false);
    }, 150);
  };

  const handleGoBack = (index: number) => {
    setAnimating(true);
    const targetId = history[index];
    
    setTimeout(() => {
      setCurrentNodeId(targetId);
      setHistory(history.slice(0, index));
      setAnimating(false);
    }, 150);
  };

  const handleEndpointClick = () => {
    if (currentNode?.href) {
      window.location.href = currentNode.href;
    }
  };

  if (!currentNode) return null;

  return (
    <div className={cn("w-full max-w-2xl mx-auto", className)}>
      {/* Breadcrumb trail */}
      {history.length > 0 && (
        <div className="flex items-center gap-2 mb-8 flex-wrap">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 stroke-[1.5]" />
            Start over
          </button>
          <span className="text-border">|</span>
          {historyNodes.map((node, index) => (
            <div key={node.id} className="flex items-center gap-2">
              <button
                onClick={() => handleGoBack(index)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
              >
                {node.title}
              </button>
              <ArrowRight className="w-3 h-3 text-border stroke-[1.5]" />
            </div>
          ))}
          <span className="text-sm font-medium text-foreground">{currentNode.title}</span>
        </div>
      )}

      {/* Current node card */}
      <div
        className={cn(
          "transition-all duration-200",
          animating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
        )}
      >
        <div className="bg-background rounded-2xl p-8 shadow-sm border border-border">
          {/* Icon */}
          {currentNode.icon && (
            <div className="w-14 h-14 rounded-2xl bg-card flex items-center justify-center mb-6">
              <span className="[&>svg]:w-7 [&>svg]:h-7 [&>svg]:stroke-[1.5] [&>svg]:text-foreground">{currentNode.icon}</span>
            </div>
          )}

          {/* Question/Title */}
          {currentNode.question && (
            <p className="text-sm text-muted-foreground mb-2">{currentNode.question}</p>
          )}
          <h3 className="font-heading text-2xl font-normal text-foreground mb-3">
            {currentNode.title}
          </h3>
          {currentNode.description && (
            <p className="text-muted-foreground leading-relaxed mb-8">{currentNode.description}</p>
          )}

          {/* Options or Endpoint */}
          {currentNode.isEndpoint ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 stroke-[2]" />
                </div>
                <span className="text-sm font-medium">Recommendation ready</span>
              </div>
              {currentNode.href && (
                <button
                  onClick={handleEndpointClick}
                  className="w-full px-6 py-4 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-colors flex items-center justify-center gap-2"
                >
                  Learn more
                  <ArrowRight className="w-4 h-4 stroke-[1.5]" />
                </button>
              )}
              <button
                onClick={handleReset}
                className="w-full px-6 py-4 bg-card text-foreground rounded-full font-medium hover:bg-secondary transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4 stroke-[1.5]" />
                Start over
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {currentNode.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(option.nextId)}
                  className="w-full p-4 text-left rounded-xl bg-card hover:bg-secondary transition-all duration-200 group flex items-center justify-between"
                >
                  <span className="font-medium text-foreground">
                    {option.label}
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all stroke-[1.5]" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex justify-center mt-8 gap-2">
        {Array.from({ length: history.length + 1 }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              index === history.length ? "bg-foreground w-6" : "bg-border w-1.5"
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default DecisionTree;
