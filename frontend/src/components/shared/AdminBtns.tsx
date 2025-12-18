import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  if (!resource || !admin) return null;

  const resourceBtn = admin && resource && (
    <a href={resource.path}>
      <div className="whitespace-nowrap bg-beige-default hover:bg-beige-medium text-white dark:text-dark font-bold py-2 px-4 rounded mb-2">
        <p>{t("admin.edit", { resource: resource.name })}</p>
      </div>
    </a>
  );

  const adminBtns = admin && (
    <div className="container mx-auto flex gap-2 items-center px-4 text-black dark:text-light">
      <p>{t("admin.title")}:</p>
      {resourceBtn}
    </div>
  );

  return <>{adminBtns}</>;
}
