import React, { useState } from "react";

export default function InsertModuleButton(props) {
  const { beforeOrAfter } = props;

  return (
    <div>
      <>
        <div>+</div>
        <div>^</div>
        <div>v</div>
        <div>x</div>
      </>
    </div>
  );
}
