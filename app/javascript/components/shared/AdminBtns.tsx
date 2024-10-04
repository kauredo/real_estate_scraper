import React, { useState } from "react";

interface Resource {
  path: string;
  name: string;
}

interface Props {
  admin?: boolean;
  resource?: Resource;
}

export default function AdminBtns(props: Props) {
  const { admin, resource } = props;

  if (!resource || !admin) return null;

  const resourceBtn = admin && resource && (
    <a href={resource.path} data-turbo={false}>
      <div className="whitespace-nowrap bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2">
        <p>Editar {resource.name} no Backoffice</p>
      </div>
    </a>
  );

  const adminBtns = admin && (
    <div className="container mx-auto flex gap-2 items-center">
      <p>Admin:</p>
      {resourceBtn}
    </div>
  );

  return <>{adminBtns}</>;
}
