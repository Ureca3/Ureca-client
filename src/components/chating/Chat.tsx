import React from 'react';

interface chatProps{
    type: "me"|"other"
    text: string,
    time: Date
}

export const Chat = ({type,text,time}:chatProps) => {
    const timeString = time.toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

    return (
        <div
        className={`
            p-3 rounded-lg max-w-xs break-words
            ${type === "me" ? "bg-purple-600 text-white self-end" : "bg-white text-black self-start"}
        `}>
            <div>{text}</div>
            <div>{timeString}</div>
        </div>
    );
};