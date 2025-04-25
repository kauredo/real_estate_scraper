import React from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
} from "react-share";

interface BlogShareProps {
  url: string;
  title: string;
}

const BlogShare: React.FC<BlogShareProps> = ({ url, title }) => {
  const { t } = useTranslation();

  return (
    <div className="blog-share">
      <h3>{t("share")}</h3>
      <div className="flex gap-2">
        <FacebookShareButton url={url} quote={title}>
          <div className="rounded-full w-10 h-10 bg-beige-default text-white dark:text-dark flex items-center justify-center">
            <FontAwesomeIcon icon={["fab", "facebook-f"]} />
          </div>
        </FacebookShareButton>

        <LinkedinShareButton url={url} title={title}>
          <div className="rounded-full w-10 h-10 bg-beige-default text-white dark:text-dark flex items-center justify-center">
            <FontAwesomeIcon icon={["fab", "linkedin-in"]} />
          </div>
        </LinkedinShareButton>

        <TwitterShareButton url={url} title={title}>
          <div className="rounded-full w-10 h-10 bg-beige-default text-white dark:text-dark flex items-center justify-center">
            <FontAwesomeIcon icon={["fab", "twitter"]} />
          </div>
        </TwitterShareButton>

        <WhatsappShareButton url={url} title={title}>
          <div className="rounded-full w-10 h-10 bg-beige-default text-white dark:text-dark flex items-center justify-center">
            <FontAwesomeIcon icon={["fab", "whatsapp"]} />
          </div>
        </WhatsappShareButton>

        <EmailShareButton url={url} subject={title}>
          <div className="rounded-full w-10 h-10 bg-beige-default text-white dark:text-dark flex items-center justify-center">
            <FontAwesomeIcon icon="envelope" />
          </div>
        </EmailShareButton>
      </div>
    </div>
  );
};

export default BlogShare;
