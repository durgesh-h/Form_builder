import React from 'react';
import { useDroppable } from '@dnd-kit/core';

export function DroppableBlank({ id, value }) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <span
      ref={setNodeRef}
      className={`inline-block min-w-[100px] px-3 py-1 mx-1 border-b-2 text-center ${
        value ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-50'
      }`}
    >
      {value || '_____'}
    </span>
  );
}