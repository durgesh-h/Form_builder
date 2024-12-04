import React from "react";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { DraggableItem } from "./DraggableItem";
import { DroppableCategory } from "./DroppableCategory";

export function CategorizeRenderer({ question, answers, setAnswers }) {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const itemId = active.id;
    const categoryId = over.id;

    setAnswers({
      ...answers,
      categories: {
        ...(answers.categories || {}), // Ensure `categories` is initialized
        [itemId]: categoryId,
      },
    });
  };

  const getItemCategory = (itemId) => (answers.categories || {})[itemId] || "";

  return (
    <div className="space-y-4">
      <DndContext
        sensors={sensors}
        modifiers={[restrictToParentElement]}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-4">Items to Categorize</h3>
            <div className="space-y-2">
              {question.items
                .filter((item) => !getItemCategory(item.id))
                .map((item) => (
                  <DraggableItem key={item.id} id={item.id}>
                    {item.content}
                  </DraggableItem>
                ))}
            </div>
          </div>

          <div className="space-y-4">
            {question.categories.map((category) => (
              <DroppableCategory
                key={category}
                id={category}
                category={category}
                items={question.items.filter(
                  (item) => getItemCategory(item.id) === category
                )}
              />
            ))}
          </div>
        </div>
      </DndContext>
    </div>
  );
}
