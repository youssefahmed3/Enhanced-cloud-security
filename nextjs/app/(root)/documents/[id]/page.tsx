import React from "react";

export default function Page({ params }: { params: { id: string }} ) {
  return (
    <div className="side-container-flex gap-5">
      <p className="text-myColors-primary-text_white">{params.id}</p>
    </div>
  );
}

