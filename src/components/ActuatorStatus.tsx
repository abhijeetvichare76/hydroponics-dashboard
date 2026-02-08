import React from "react";

interface ActuatorStatusProps {
    light: "on" | "off";
    airPump: "on" | "off";
    humidifier: "on" | "off";
    phAdjustment: "none" | "ph_up" | "ph_down";
}

export default function ActuatorStatus({ light, airPump, humidifier, phAdjustment }: ActuatorStatusProps) {
    const getStatusDot = (isOn: boolean) => (
        <span className={`w-2.5 h-2.5 rounded-full ${isOn ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" : "bg-gray-600"}`} />
    );

    const getPhStatusDot = (status: string) => {
        switch (status) {
            case "ph_up": return <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />;
            case "ph_down": return <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]" />;
            default: return <span className="w-2.5 h-2.5 rounded-full bg-gray-600" />;
        }
    };

    return (
        <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1.5 rounded-full border border-gray-700/50">
                {getStatusDot(light === "on")}
                <span className="text-gray-300 text-sm">Light</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1.5 rounded-full border border-gray-700/50">
                {getStatusDot(airPump === "on")}
                <span className="text-gray-300 text-sm">Air Pump</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1.5 rounded-full border border-gray-700/50">
                {getStatusDot(humidifier === "on")}
                <span className="text-gray-300 text-sm">Humidifier</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1.5 rounded-full border border-gray-700/50">
                {getPhStatusDot(phAdjustment)}
                <span className="text-gray-300 text-sm uppercase">pH {phAdjustment === 'none' ? 'Stable' : phAdjustment.replace('_', ' ')}</span>
            </div>
        </div>
    );
}
