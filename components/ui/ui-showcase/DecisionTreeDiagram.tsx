import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { RotateCcw } from "lucide-react";

interface TreeNode {
  id: string;
  label: string;
  description?: string;
  href?: string;
  children?: { label: string; nodeId: string }[];
}

interface DecisionTreeDiagramProps {
  nodes: TreeNode[];
  rootId: string;
  className?: string;
}

const DecisionTreeDiagram = ({ nodes, rootId, className }: DecisionTreeDiagramProps) => {
  const [selectedPath, setSelectedPath] = useState<string[]>([rootId]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const nodeMap = useMemo(() => {
    const map = new Map<string, TreeNode>();
    nodes.forEach(node => map.set(node.id, node));
    return map;
  }, [nodes]);

  const getNodeDepth = (nodeId: string): number => {
    return selectedPath.indexOf(nodeId);
  };

  const isNodeInPath = (nodeId: string): boolean => {
    return selectedPath.includes(nodeId);
  };

  const isNodeSelectable = (nodeId: string, parentId: string): boolean => {
    const parentIndex = selectedPath.indexOf(parentId);
    return parentIndex !== -1 && parentIndex === selectedPath.length - 1;
  };

  const handleNodeClick = (nodeId: string, parentId?: string) => {
    const node = nodeMap.get(nodeId);
    
    if (parentId) {
      const parentIndex = selectedPath.indexOf(parentId);
      if (parentIndex !== -1) {
        // Extend or change path
        const newPath = [...selectedPath.slice(0, parentIndex + 1), nodeId];
        setSelectedPath(newPath);
      }
    } else if (nodeId === rootId) {
      setSelectedPath([rootId]);
    }

    if (node?.href) {
      window.location.href = node.href;
    }
  };

  const handleReset = () => {
    setSelectedPath([rootId]);
  };

  const renderNode = (nodeId: string, parentId?: string, depth: number = 0, siblingIndex: number = 0, totalSiblings: number = 1) => {
    const node = nodeMap.get(nodeId);
    if (!node) return null;

    const isInPath = isNodeInPath(nodeId);
    const isSelected = selectedPath[selectedPath.length - 1] === nodeId;
    const isHovered = hoveredNode === nodeId;
    const canSelect = parentId ? isNodeSelectable(nodeId, parentId) : true;
    const isRoot = nodeId === rootId;

    return (
      <div 
        key={nodeId}
        className={cn(
          "flex flex-col items-center",
          depth > 0 && "relative"
        )}
      >
        {/* Connector line from parent */}
        {depth > 0 && (
          <div className="relative h-8 w-full flex items-end justify-center">
            {/* Vertical line down */}
            <div 
              className={cn(
                "absolute top-0 left-1/2 w-px h-full -translate-x-1/2 transition-colors duration-300",
                isInPath ? "bg-foreground" : "bg-border"
              )}
            />
          </div>
        )}

        {/* Node */}
        <button
          onClick={() => handleNodeClick(nodeId, parentId)}
          onMouseEnter={() => setHoveredNode(nodeId)}
          onMouseLeave={() => setHoveredNode(null)}
          disabled={!canSelect && !isRoot && !isInPath}
          className={cn(
            "relative px-5 py-3 rounded-xl transition-all duration-300 min-w-[140px] max-w-[200px]",
            isRoot && "px-6 py-4",
            isSelected 
              ? "bg-foreground text-background shadow-lg"
              : isInPath
                ? "bg-card text-foreground border border-foreground/20"
                : canSelect
                  ? "bg-card text-foreground hover:bg-secondary cursor-pointer"
                  : "bg-muted text-muted-foreground cursor-default opacity-50",
            isHovered && canSelect && !isSelected && "shadow-md scale-105"
          )}
        >
          <span className={cn(
            "font-heading text-sm font-normal leading-tight block",
            isRoot && "text-base"
          )}>
            {node.label}
          </span>
          {node.description && isSelected && (
            <span className="text-xs mt-1 block opacity-80 leading-relaxed">
              {node.description}
            </span>
          )}
        </button>

        {/* Children */}
        {node.children && node.children.length > 0 && (
          <div className="flex flex-col items-center">
            {/* Vertical connector */}
            <div 
              className={cn(
                "w-px h-8 transition-colors duration-300",
                isInPath || isSelected ? "bg-foreground" : "bg-border"
              )}
            />
            
            {/* Horizontal connector bar */}
            {node.children.length > 1 && (
              <div className="relative w-full flex justify-center">
                <div 
                  className={cn(
                    "absolute top-0 h-px transition-colors duration-300",
                    isSelected ? "bg-foreground" : "bg-border"
                  )}
                  style={{
                    width: `calc(100% - 140px)`,
                    left: '70px'
                  }}
                />
              </div>
            )}
            
            {/* Children nodes */}
            <div className={cn(
              "flex gap-4",
              node.children.length > 2 && "gap-2"
            )}>
              {node.children.map((child, idx) => (
                <div key={child.nodeId} className="flex flex-col items-center">
                  {/* Individual vertical line to child */}
                  {node.children && node.children.length > 1 && (
                    <div 
                      className={cn(
                        "w-px h-4 transition-colors duration-300",
                        selectedPath.includes(child.nodeId) ? "bg-foreground" : "bg-border"
                      )}
                    />
                  )}
                  {renderNode(child.nodeId, nodeId, depth + 1, idx, node.children?.length || 1)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const selectedNode = nodeMap.get(selectedPath[selectedPath.length - 1]);

  return (
    <div className={cn("w-full", className)}>
      {/* Controls */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Path:</span>
          {selectedPath.map((nodeId, idx) => (
            <span key={nodeId} className="flex items-center gap-1">
              {idx > 0 && <span className="text-border">→</span>}
              <span className={cn(
                idx === selectedPath.length - 1 ? "text-foreground font-medium" : ""
              )}>
                {nodeMap.get(nodeId)?.label}
              </span>
            </span>
          ))}
        </div>
        {selectedPath.length > 1 && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 stroke-[1.5]" />
            Reset
          </button>
        )}
      </div>

      {/* Tree diagram */}
      <div className="overflow-x-auto pb-8">
        <div className="flex justify-center min-w-max">
          {renderNode(rootId)}
        </div>
      </div>

      {/* Selected node details */}
      {selectedNode && selectedNode.id !== rootId && (
        <div className="mt-8 p-6 bg-card rounded-2xl">
          <h4 className="font-heading text-lg font-normal text-foreground mb-2">
            {selectedNode.label}
          </h4>
          {selectedNode.description && (
            <p className="text-muted-foreground text-sm leading-relaxed">
              {selectedNode.description}
            </p>
          )}
          {selectedNode.href && (
            <button
              onClick={() => window.location.href = selectedNode.href!}
              className="mt-4 px-5 py-2.5 bg-foreground text-background rounded-full text-sm font-medium hover:bg-foreground/90 transition-colors"
            >
              Learn more
            </button>
          )}
          {!selectedNode.children?.length && (
            <p className="text-xs text-muted-foreground mt-4 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              End of this path
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default DecisionTreeDiagram;
