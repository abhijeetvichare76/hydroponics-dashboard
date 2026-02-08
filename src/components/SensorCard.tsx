import React from "react";

interface SensorCardProps {
    label: string;
    value: number | null;
    unit: string;
    min: number;
    max: number;
}

export default function SensorCard({ label, value, unit, min, max }: SensorCardProps) {
    let statusColor = "text-gray-400";
    let borderColor = "border-gray-800";

    if (value !== null) {
        if (value >= min && value <= max) {
            statusColor = "text-green-500";
            borderColor = "border-green-900/50";
        } else if (
            (value < min && value >= min - (max - min) * 0.1) ||
            (value > max && value <= max + (max - min) * 0.1)
        ) {
            statusColor = "text-yellow-500";
            borderColor = "border-yellow-900/50";
        } else {
            statusColor = "text-red-500";
            borderColor = "border-red-900/50";
        }
    }

    return (
        <div className={`bg-gray-900 border ${borderColor} rounded-lg p-4 flex flex-col items-center justify-center text-center shadow-lg transition-all`}>
            <span className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">{label}</span>
            <div className="flex items-baseline gap-1">
                <span className={`text-3xl font-mono font-bold ${statusColor}`}>
                    {value !== null ? value.toFixed(1) : "N/A"}
                </span>
                <span className="text-gray-500 text-sm">{unit}</span>
            </div>
            <div className="w-full bg-gray-800 h-1 mt-3 rounded-full overflow-hidden">
                {value !== null && (
                    <div
                        className={`h-full ${statusColor.replace('text-', 'bg-')}`}
                        style={{ width: '100%' }} // Simplified bar for now, could be proportional
                    />
                )}
            </div>
        </div>
    );
}
