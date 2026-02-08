import React from "react";

interface InterventionAlertProps {
    message: string | null;
}

export default function InterventionAlert({ message }: InterventionAlertProps) {
    if (!message) return null;

    return (
        <div className="bg-red-900/90 border-b border-red-700 text-red-100 px-4 py-3 flex items-start gap-3 shadow-lg animate-pulse" role="alert">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 flex-shrink-0 mt-0.5"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
            </svg>
            <div>
                <h3 className="font-bold text-lg">Intervention Required</h3>
                <p className="text-sm opacity-90">{message}</p>
            </div>
        </div>
    );
}
