import React from "react";

interface HealthScoreProps {
    score: number;
}

export default function HealthScore({ score }: HealthScoreProps) {
    let scoreColor = "text-gray-400";
    let ringColor = "border-gray-700";

    if (score >= 7) {
        scoreColor = "text-green-500";
        ringColor = "border-green-500";
    } else if (score >= 4) {
        scoreColor = "text-yellow-500";
        ringColor = "border-yellow-500";
    } else {
        scoreColor = "text-red-500";
        ringColor = "border-red-500";
    }

    return (
        <div className="flex flex-col items-center">
            <div className={`relative w-20 h-20 rounded-full border-4 ${ringColor} flex items-center justify-center bg-gray-900 shadow-[0_0_15px_rgba(0,0,0,0.5)]`}>
                <span className={`text-4xl font-bold ${scoreColor}`}>{score}</span>
            </div>
            <span className="text-gray-400 text-sm mt-2 font-medium uppercase tracking-wide">Health</span>
        </div>
    );
}
