import React from "react";

interface ReasoningCardProps {
    reasoning: {
        overall: string;
        light_reason: string;
        air_pump_reason: string;
        humidifier_reason: string;
        ph_reason: string;
    };
}

export default function ReasoningCard({ reasoning }: ReasoningCardProps) {
    return (
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-100 mb-4 flex items-center gap-2">
                <span className="text-2xl">🧠</span> AI Reasoning
            </h3>

            <div className="mb-6">
                <p className="text-gray-300 leading-relaxed text-lg italic border-l-4 border-blue-500 pl-4 py-1">
                    &quot;{reasoning.overall}&quot;
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-950/50 p-4 rounded border border-gray-800/50">
                    <span className="text-xs text-gray-500 uppercase tracking-wider font-bold block mb-1">Light Strategy</span>
                    <p className="text-sm text-gray-400">{reasoning.light_reason}</p>
                </div>
                <div className="bg-gray-950/50 p-4 rounded border border-gray-800/50">
                    <span className="text-xs text-gray-500 uppercase tracking-wider font-bold block mb-1">Air Pump Strategy</span>
                    <p className="text-sm text-gray-400">{reasoning.air_pump_reason}</p>
                </div>
                <div className="bg-gray-950/50 p-4 rounded border border-gray-800/50">
                    <span className="text-xs text-gray-500 uppercase tracking-wider font-bold block mb-1">Humidity Strategy</span>
                    <p className="text-sm text-gray-400">{reasoning.humidifier_reason}</p>
                </div>
                <div className="bg-gray-950/50 p-4 rounded border border-gray-800/50">
                    <span className="text-xs text-gray-500 uppercase tracking-wider font-bold block mb-1">pH Strategy</span>
                    <p className="text-sm text-gray-400">{reasoning.ph_reason}</p>
                </div>
            </div>
        </div>
    );
}
