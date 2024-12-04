import React, { useState } from "react";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  DragOverlay,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { DraggableWord } from "./DraggableWord";
import { DroppableBlank } from "./DroppableBlank";

export function ClozeRenderer({ question, answers, setAnswers }) {
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    // If there's no valid target to drop
    if (!over) {
      setActiveId(null);
      return;
    }

    const draggedWord = active.id; // Word being dragged
    const targetBlank = parseInt(over.id); // Target blank index

    // Update state to assign the dragged word to the correct blank
    if (!isNaN(targetBlank)) {
      const updatedBlanks = [...(answers.blanks || [])];

      // Check if this blank already contains a word
      const currentWordInBlank = updatedBlanks[targetBlank];
      if (currentWordInBlank) {
        // Remove the word from the blanks array (to allow reuse)
        const unusedWords = question.blanks.filter(
          (word) => !updatedBlanks.includes(word) || word === currentWordInBlank
        );

        // Assign the dragged word to this blank
        updatedBlanks[targetBlank] = draggedWord;

        // Update the state
        setAnswers({
          ...answers,
          blanks: updatedBlanks,
        });
      } else {
        // Assign the dragged word directly
        updatedBlanks[targetBlank] = draggedWord;
        setAnswers({
          ...answers,
          blanks: updatedBlanks,
        });
      }
    }

    setActiveId(null);
  };

  const renderTextWithBlanks = () => {
    const parts = question.text.split(/(_+)/);
    return parts.map((part, index) => {
      if (part.startsWith("_")) {
        const blankIndex = Math.floor(index / 2);
        return (
          <DroppableBlank
            key={blankIndex}
            id={blankIndex.toString()} // Each blank has a unique ID
            value={answers.blanks?.[blankIndex] || ""}
          />
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  const unusedWords = question.blanks.filter(
    (word) => !(answers.blanks || []).includes(word)
  );

  return (
    <div className="space-y-6">
      <DndContext
        sensors={sensors}
        modifiers={[restrictToWindowEdges]}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="prose max-w-none">
          <p className="text-lg leading-relaxed">{renderTextWithBlanks()}</p>
        </div>

        <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-lg">
          {unusedWords.map((word, index) => (
            <DraggableWord key={word} id={word}>
              {word}
            </DraggableWord>
          ))}
        </div>

        <DragOverlay>
          {activeId && (
            <div className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full cursor-move">
              {activeId}
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
