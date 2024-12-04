import React, { useState } from "react";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  DragOverlay,
} from "@dnd-kit/core";
import { useDraggable, useDroppable } from "@dnd-kit/core";

export default function ClozeRenderer({ question }) {
  const [answers, setAnswers] = useState(
    question.blanks.map(() => null) // Initialize blanks with null values
  );
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(useSensor(PointerSensor));

  // Handle Drag Start
  const handleDragStart = (event) => {
    setActiveId(event.active.id); // Set the dragged word's ID
  };

  // Handle Drag End
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      return;
    }

    const draggedWord = active.id;
    const blankIndex = parseInt(over.id); // Get the index of the blank space

    // Update answers if valid drop target
    if (!isNaN(blankIndex)) {
      const updatedAnswers = [...answers];
      updatedAnswers[blankIndex] = draggedWord;

      setAnswers(updatedAnswers);
    }

    setActiveId(null);
  };

  // Generate text with blanks
  const renderTextWithBlanks = () => {
    const parts = question.text.split(/(_+)/); // Split the text by underscores
    let blankCounter = 0;

    return parts.map((part, index) => {
      if (part.startsWith("_")) {
        const blankIndex = blankCounter++;
        return (
          <DroppableBlank
            key={index}
            id={blankIndex.toString()}
            value={answers[blankIndex]}
          />
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  // Get unused words (not already placed in blanks)
  const unusedWords = question.blanks.filter((word) => !answers.includes(word));

  return (
    <div className="space-y-8 px-6 py-4 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 ">
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {/* Render the Question Text with Blanks */}
        <div className="prose max-w-none text-xl leading-relaxed text-gray-800">
          <p>{renderTextWithBlanks()}</p>
        </div>

        {/* Render Draggable Words */}
        <div className="flex flex-wrap gap-3 p-4 bg-white shadow-lg rounded-lg">
          {unusedWords.map((word) => (
            <DraggableWord key={word} id={word}>
              {word}
            </DraggableWord>
          ))}
        </div>

        {/* Render Drag Overlay */}
        <DragOverlay>
          {activeId && (
            <div className="px-4 py-2 bg-blue-200 text-blue-800 rounded-xl shadow-lg">
              {activeId}
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

// Draggable Word Component
function DraggableWord({ id, children }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px)`
      : undefined,
    zIndex: transform ? 1000 : "auto",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="px-4 py-2 bg-teal-200 text-teal-800 rounded-full cursor-move hover:bg-teal-300 transition-colors inline-block shadow-md"
    >
      {children}
    </div>
  );
}

// Droppable Blank Component
function DroppableBlank({ id, value }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <span
      ref={setNodeRef}
      className={`inline-block min-w-[100px] px-4 py-2 mx-2 border-b-4 text-center text-xl font-semibold transition-all ${
        isOver
          ? "border-blue-400 bg-blue-50"
          : value
          ? "border-green-400 bg-green-50"
          : "border-gray-300 bg-gray-100"
      } rounded-md shadow-sm`}
    >
      {value || "_____"}
    </span>
  );
}
