import React from "react";
import Image from "next/image";

interface PlantPhotoProps {
    url: string | null;
    timestamp: string;
}

export default function PlantPhoto({ url, timestamp }: PlantPhotoProps) {
    return (
        <div className="h-full flex flex-col">
            <div className="relative aspect-[4/3] bg-gray-900 rounded-lg overflow-hidden border border-gray-800 shadow-lg flex items-center justify-center group">
                {url ? (
                    <Image
                        src={url}
                        alt="Latest plant photo"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center text-gray-600 p-8 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mb-2 opacity-50">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                        </svg>
                        <span>No photo available</span>
                    </div>
                )}

                {/* Overlay gradient for text readability if needed, though we position text outside */}
            </div>
            <div className="mt-2 flex justify-between items-center px-1">
                <span className="text-xs text-gray-500 font-mono">
                    {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                <span className="text-xs text-blue-400 bg-blue-900/20 px-2 py-0.5 rounded border border-blue-900/30">
                    Latest Capture
                </span>
            </div>
        </div>
    );
}
