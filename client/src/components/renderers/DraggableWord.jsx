import React from "react";
import { useDraggable } from "@dnd-kit/core";

export function DraggableWord({ id, children }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    position: transform ? "fixed" : "relative", // Allow free movement
    zIndex: transform ? 1000 : "auto", // Ensure it appears on top while dragging
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full cursor-move hover:bg-blue-200 transition-colors inline-block"
    >
      {children}
    </div>
  );
}
