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
      <div className="whitespace-nowrap bg-beige-default hover:bg-beige-medium text-dark dark:text-dark font-bold py-2 px-4 rounded mb-2">
        <p>Editar {resource.name} no Backoffice</p>
      </div>
    </a>
  );

  const adminBtns = admin && (
    <div className="container mx-auto flex gap-2 items-center px-4 text-black dark:text-light">
      <p>Admin:</p>
      {resourceBtn}
    </div>
  );

  return <>{adminBtns}</>;
}
