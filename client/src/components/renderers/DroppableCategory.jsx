import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { DraggableItem } from './DraggableItem';

export function DroppableCategory({ id, category, items }) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="font-semibold mb-4">{category}</h3>
      <div ref={setNodeRef} className="space-y-2 min-h-[100px]">
        {items.map((item) => (
          <DraggableItem key={item.id} id={item.id}>
            {item.content}
          </DraggableItem>
        ))}
      </div>
    </div>
  );
}