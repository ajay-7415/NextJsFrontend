'use client';

import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { nanoid } from 'nanoid';
import SortableField from './SortableField';

const FIELD_TYPES = [
    { type: 'text', label: 'Short Text', icon: '📝' },
    { type: 'textarea', label: 'Long Text', icon: '📄' },
    { type: 'dropdown', label: 'Dropdown', icon: '▼' },
    { type: 'checkbox', label: 'Checkboxes', icon: '☑️' },
    { type: 'radio', label: 'Multiple Choice', icon: '○' },
    { type: 'date', label: 'Date Picker', icon: '📅' },
];

interface FormBuilderProps {
    fields: any[];
    setFields: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function FormBuilder({ fields, setFields }: FormBuilderProps) {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const addField = (type: string) => {
        setFields([
            ...fields,
            {
                id: nanoid(),
                type,
                label: 'Untitled Question',
                required: false,
                options: ['Option 1', 'Option 2'],
            },
        ]);
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setFields((items) => {
                const oldIndex = items.findIndex((i) => i.id === active.id);
                const newIndex = items.findIndex((i) => i.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const updateField = (id: string, updates: any) => {
        setFields(fields.map((f) => (f.id === id ? { ...f, ...updates } : f)));
    };

    const removeField = (id: string) => {
        setFields(fields.filter((f) => f.id !== id));
    };

    return (
        <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Tools Panel */}
            <div className="lg:w-80 w-full lg:sticky lg:top-24 space-y-6">
                <div className="bg-[#FFFFFF05] backdrop-blur-md p-6 rounded-2xl shadow-sm border border-[#FFFFFF1A]">
                    <h3 className="text-lg font-bold text-white mb-4">Add Elements</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {FIELD_TYPES.map((item) => (
                            <button
                                key={item.type}
                                onClick={() => addField(item.type)}
                                className="flex flex-col items-center justify-center p-4 bg-[#FFFFFF05] border border-[#FFFFFF1A] rounded-xl hover:bg-[#B026FF]/10 hover:border-[#B026FF] hover:text-[#B026FF] transition-all duration-200 group"
                            >
                                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                                    {item.icon}
                                </div>
                                <span className="text-xs font-medium text-slate-300 group-hover:text-white">
                                    {item.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="bg-gradient-to-br from-[#B026FF]/10 to-[#4D4DFF]/10 p-6 rounded-2xl border border-[#B026FF]/20 backdrop-blur-md">
                    <h4 className="font-semibold text-white mb-2">💡 Pro Tip</h4>
                    <p className="text-sm text-slate-300">
                        Drag items in the preview area to reorder your questions. Click on any field to edit its properties.
                    </p>
                </div>
            </div>

            {/* Form Canvas */}
            <div className="flex-1 w-full">
                <div className="bg-[#FFFFFF05] backdrop-blur-md rounded-2xl shadow-sm border border-[#FFFFFF1A] min-h-[600px] p-8">
                    {fields.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center py-20 border-2 border-dashed border-[#FFFFFF1A] rounded-xl bg-[#FFFFFF03]">
                            <div className="w-16 h-16 bg-[#FFFFFF0A] rounded-full flex items-center justify-center shadow-lg mb-4 text-3xl">
                                ✨
                            </div>
                            <h3 className="text-lg font-bold text-white">Your form is empty</h3>
                            <p className="text-slate-400 max-w-sm mt-2">
                                Click on the element types from the sidebar to start building your form structure.
                            </p>
                        </div>
                    ) : (
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext
                                items={fields.map((f) => f.id)}
                                strategy={verticalListSortingStrategy}
                            >
                                <div className="space-y-6">
                                    {fields.map((field, index) => (
                                        <SortableField
                                            key={field.id}
                                            field={field}
                                            index={index}
                                            updateField={updateField}
                                            removeField={removeField}
                                        />
                                    ))}
                                </div>
                            </SortableContext>
                        </DndContext>
                    )}
                </div>
            </div>
        </div>
    );
}
