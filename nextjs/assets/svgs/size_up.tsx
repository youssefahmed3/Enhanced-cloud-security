import React from "react";

interface Props{
  color: string;
}

export function SizeUp(props: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke={`${props.color}`}
        strokeLinecap="round"
        strokeWidth="2"
        d="M3 9V6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3h-3"
      ></path>
      <path
        fill={`${props.color}`}
        d="M16 8V7h1v1h-1zm-5.793 7.207a1 1 0 01-1.414-1.414l1.414 1.414zM15 14V8h2v6h-2zm1-5h-6V7h6v2zm.707-.293l-6.5 6.5-1.414-1.414 6.5-6.5 1.414 1.414z"
      ></path>
      <rect
        width="7"
        height="7"
        x="3"
        y="14"
        stroke={`${props.color}`}
        strokeLinecap="round"
        strokeWidth="2"
        rx="2"
      ></rect>
    </svg>
  );
}

