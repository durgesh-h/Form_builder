import React from "react";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { DraggableWord } from "./DraggableWord";
import { DroppableBlank } from "./DroppableBlank";

export function ClozeRenderer({ question, answers, setAnswers }) {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const wordIndex = active.id;
    const blankIndex = over.id;

    const newBlanks = [...(answers.blanks || [])];
    newBlanks[blankIndex] = question.blanks[wordIndex];

    setAnswers({
      ...answers,
      blanks: newBlanks,
    });
  };

  const renderTextWithBlanks = () => {
    const parts = question.text.split(/(_+)/);
    return parts.map((part, index) => {
      if (part.startsWith("_")) {
        const blankIndex = Math.floor(index / 2);
        return (
          <DroppableBlank
            key={index}
            id={blankIndex}
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
        modifiers={[restrictToParentElement]}
        onDragEnd={handleDragEnd}
      >
        <div className="prose max-w-none">
          <p className="text-lg leading-relaxed">{renderTextWithBlanks()}</p>
        </div>

        <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-lg">
          {unusedWords.map((word, index) => (
            <DraggableWord key={index} id={index}>
              {word}
            </DraggableWord>
          ))}
        </div>
      </DndContext>
    </div>
  );
}
