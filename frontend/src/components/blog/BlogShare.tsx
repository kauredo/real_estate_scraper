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
import { Button } from "../ui/Button";

interface BlogShareProps {
  url: string;
  title: string;
}

const BlogShare: React.FC<BlogShareProps> = ({ url, title }) => {
  const { t } = useTranslation();

  return (
    <div className="blog-share">
      <h3>{t("share.title")}</h3>
      <div className="flex gap-2">
        <FacebookShareButton url={url}>
          <Button variant="ghost" size="icon">
            <FontAwesomeIcon icon={["fab", "facebook-f"]} />
          </Button>
        </FacebookShareButton>

        <LinkedinShareButton url={url} title={title}>
          <Button variant="ghost" size="icon">
            <FontAwesomeIcon icon={["fab", "linkedin-in"]} />
          </Button>
        </LinkedinShareButton>

        <TwitterShareButton url={url} title={title}>
          <Button variant="ghost" size="icon">
            <FontAwesomeIcon icon={["fab", "twitter"]} />
          </Button>
        </TwitterShareButton>

        <WhatsappShareButton url={url} title={title}>
          <Button variant="ghost" size="icon">
            <FontAwesomeIcon icon={["fab", "whatsapp"]} />
          </Button>
        </WhatsappShareButton>

        <EmailShareButton url={url} subject={title}>
          <Button variant="ghost" size="icon">
            <FontAwesomeIcon icon="envelope" />
          </Button>
        </EmailShareButton>
      </div>
    </div>
  );
};

export default BlogShare;
