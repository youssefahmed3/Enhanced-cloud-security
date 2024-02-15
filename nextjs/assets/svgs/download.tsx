import React from "react";

function DownloadIcon(props: { color: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill={`${props.color}`}
        d="M12 16l-.707.707.707.707.707-.707L12 16zm1-12a1 1 0 10-2 0h2zm-7.707 6.707l6 6 1.414-1.414-6-6-1.414 1.414zm7.414 6l6-6-1.414-1.414-6 6 1.414 1.414zM13 16V4h-2v12h2z"
      ></path>
      <path stroke={`${props.color}`} strokeWidth="2" d="M5 21h14"></path>
    </svg>
  );
}

export default DownloadIcon;
