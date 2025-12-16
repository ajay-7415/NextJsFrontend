'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableFieldProps {
    field: any;
    index: number;
    updateField: (id: string, updates: any) => void;
    removeField: (id: string) => void;
}

export default function SortableField({
    field,
    index,
    updateField,
    removeField,
}: SortableFieldProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: field.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const handleOptionChange = (idx: number, value: string) => {
        const newOptions = [...(field.options || [])];
        newOptions[idx] = value;
        updateField(field.id, { options: newOptions });
    };

    const addOption = () => {
        updateField(field.id, {
            options: [...(field.options || []), `Option ${(field.options?.length || 0) + 1}`],
        });
    };

    const removeOption = (idx: number) => {
        const newOptions = field.options?.filter((_: any, i: number) => i !== idx);
        updateField(field.id, { options: newOptions });
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`relative group backdrop-blur-sm border rounded-xl transition-all duration-200 ${isDragging
                ? 'bg-[#B026FF]/10 border-[#B026FF] shadow-[0_0_30px_-5px_rgba(176,38,255,0.3)] z-50 rotate-1 scale-102 ring-1 ring-[#B026FF]/50'
                : 'bg-[#FFFFFF03] border-[#FFFFFF1A] hover:border-[#FFFFFF33] hover:bg-[#FFFFFF05] hover:shadow-lg'
                }`}
        >
            {/* Drag Handle & Header */}
            <div className="absolute left-0 top-0 bottom-0 w-8 flex items-center justify-center cursor-move border-r border-[#FFFFFF1A] bg-[#FFFFFF05] rounded-l-xl hover:bg-[#FFFFFF0A] transition-colors" {...attributes} {...listeners}>
                <span className="text-white">⠿</span>
            </div>

            <div className="pl-12 pr-6 py-6">
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                    <div className="flex-1">
                        <label className="block text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2">
                            Field Label
                        </label>
                        <input
                            type="text"
                            value={field.label}
                            onChange={(e) => updateField(field.id, { label: e.target.value })}
                            className="w-full text-lg font-medium text-white bg-transparent border-b border-dashed border-slate-400 focus:border-[#B026FF] focus:ring-0 outline-none transition-colors placeholder:text-slate-400 pb-2"
                            placeholder="Enter your question here..."
                        />
                    </div>

                    <div className="flex items-center gap-4 sm:border-l sm:border-[#FFFFFF1A] sm:pl-4">
                        <div className="flex items-center gap-2 relative group/tooltip">
                            <label className="text-sm font-medium text-white cursor-pointer select-none">
                                Required
                            </label>
                            <div
                                onClick={() => updateField(field.id, { required: !field.required })}
                                className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${field.required ? 'bg-[#B026FF]' : 'bg-slate-600'
                                    }`}
                            >
                                <div
                                    className={`w-3.5 h-3.5 bg-white rounded-full absolute top-0.5 transition-all shadow-sm ${field.required ? 'left-6' : 'left-0.5'
                                        }`}
                                />
                            </div>
                        </div>

                        <button
                            onClick={() => removeField(field.id)}
                            className="p-2 text-white hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                            title="Delete Field"
                        >
                            🗑️
                        </button>
                    </div>
                </div>

                {/* Dynamic Options Area */}
                {['dropdown', 'checkbox', 'radio'].includes(field.type) && (
                    <div className="mt-4 pl-4 border-l-2 border-[#FFFFFF1A] space-y-3">
                        <label className="block text-xs font-semibold text-slate-200 uppercase tracking-wider mb-2">
                            Options
                        </label>
                        {field.options?.map((option: string, idx: number) => (
                            <div key={idx} className="flex items-center gap-2 group/option">
                                <div className="w-4 h-4 rounded-full border border-slate-400 flex items-center justify-center">
                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400 group-hover/option:bg-[#B026FF]"></div>
                                </div>
                                <input
                                    type="text"
                                    value={option}
                                    onChange={(e) => handleOptionChange(idx, e.target.value)}
                                    className="flex-1 text-sm text-white bg-[#FFFFFF05] border border-[#FFFFFF1A] rounded-md focus:border-[#B026FF] focus:ring-1 focus:ring-[#B026FF] py-2 px-3 outline-none"
                                    placeholder={`Option ${idx + 1}`}
                                />
                                <button
                                    onClick={() => removeOption(idx)}
                                    className="opacity-0 group-hover/option:opacity-100 p-1 text-slate-200 hover:text-red-400 transition-all"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                        <button
                            onClick={addOption}
                            className="text-sm text-[#B026FF] font-medium hover:text-[#D489FF] flex items-center gap-1 mt-2 pl-6"
                        >
                            + Add Option
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
