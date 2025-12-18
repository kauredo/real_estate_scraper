import React from "react";
import {
  EmailShareButton,
  FacebookMessengerShareButton,
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  faFacebook,
  faWhatsapp,
  faTelegram,
  faFacebookMessenger,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/Button";

interface Props {
  title: string;
}

export default function ShareIcons(props: Props) {
  const { t } = useTranslation();
  const { title } = props;
  const shareUrl = window.location.href;
  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    alert(t("share.copied"));
  };

  return (
    <div className="mx-auto mb-4 font-bold flex items-center gap-2 h-5 w-fit text-xl">
      <h5 className="uppercase">{t("share.title")}: </h5>
      <div
        className="hover:text-beige-default dark:hover:text-beige-medium"
        title={t("share.whatsapp")}
      >
        <WhatsappShareButton url={shareUrl} title={title} separator=":: ">
          <FontAwesomeIcon icon={faWhatsapp as IconProp} />
        </WhatsappShareButton>
      </div>
      <div
        className="hover:text-beige-default dark:hover:text-beige-medium"
        title={t("share.messenger")}
      >
        <FacebookMessengerShareButton url={shareUrl} appId="521270401588372">
          <FontAwesomeIcon icon={faFacebookMessenger as IconProp} />
        </FacebookMessengerShareButton>
      </div>
      <div
        className="hover:text-beige-default dark:hover:text-beige-medium"
        title={t("share.telegram")}
      >
        <TelegramShareButton url={shareUrl} title={title}>
          <FontAwesomeIcon icon={faTelegram as IconProp} />
        </TelegramShareButton>
      </div>
      <div
        className="hover:text-beige-default dark:hover:text-beige-medium"
        title={t("share.facebook")}
      >
        <FacebookShareButton url={shareUrl}>
          <FontAwesomeIcon icon={faFacebook as IconProp} />
        </FacebookShareButton>
      </div>
      <div
        className="hover:text-beige-default dark:hover:text-beige-medium"
        title={t("share.twitter")}
      >
        <TwitterShareButton url={shareUrl} title={title}>
          <FontAwesomeIcon icon={faTwitter as IconProp} />
        </TwitterShareButton>
      </div>
      <div
        className="hover:text-beige-default dark:hover:text-beige-medium"
        title={t("share.email")}
      >
        <EmailShareButton url={shareUrl} subject={title}>
          <FontAwesomeIcon icon={faEnvelope as IconProp} />
        </EmailShareButton>
      </div>
      <div className="hover:text-beige-default dark:hover:text-beige-medium">
        <Button onClick={handleCopy} title={t("share.copy")}>
          <FontAwesomeIcon icon={faLink as IconProp} />
        </Button>
      </div>
    </div>
  );
}
