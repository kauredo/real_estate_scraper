import React, { useEffect } from "react";
import { i18n } from "../../languages/languages";
import ContactForm from "../contactPage/ContactForm";
import { sanitizeURLWithParams } from "../utils/Functions";
import { Listing, ListingComplex } from "../utils/Interfaces";

interface Props {
  complex: ListingComplex;
}

export default function Show(props: Props) {
  const { complex } = props;

  const header = () => {
    if (complex.video_link) {
      return (
        <iframe
          id="iframe"
          style={{ height: "70vh", aspectRatio: "16/9" }}
          className="w-full mx-auto"
          src={`${complex.video_link}?autoplay=1&mute=1`}
          allow="autoplay"
          allowFullScreen
        ></iframe>
      );
    } else {
      return (
        <img
          style={{ maxHeight: "70vh", objectFit: "contain" }}
          src={complex.listings[0].photos[1]}
        />
      );
    }
  };

  return (
    <div className="relative container mx-auto">
      <div className="mx-auto w-fit">{header()}</div>
      <div className="bottom-4 left-4 font-bold text-large z-50 bg-beige text-white px-4 py-2">
        <h1 className="standard">{complex.name}</h1>
      </div>
      <section className="tablet:grid overflow-hidden tablet:grid-cols-3 tablet:grid-rows-1 gap-2 py-8 mx-2 whitespace-pre-line">
        <div className="col-span-2">
          <div className=" p-4 description w-full bg-white m-2 tablet:mx-0">
            <div className="tablet:mr-2">{complex.description}</div>
          </div>
          <div className="overflow-x-scroll tablet:overflow-auto p-4 description w-full bg-white m-2 tablet:mx-0 h-fit">
            <table className="text-sm w-full border-collapse border border-slate-500">
              <thead>
                <tr className="bg-beige text-white">
                  <th className="border border-white border-l-slate-700 p-2">
                    {i18n.t("enterprises.show.type")}
                  </th>
                  <th className="border border-white p-2">
                    {i18n.t("enterprises.show.bedrooms")}
                  </th>
                  <th className="border border-white p-2">
                    {i18n.t("enterprises.show.built")}
                  </th>
                  <th className="border border-white p-2">
                    {i18n.t("enterprises.show.living")}
                  </th>
                  <th className="border border-white p-2">
                    {i18n.t("enterprises.show.parking")}
                  </th>
                  <th className="border border-white p-2">
                    {i18n.t("enterprises.show.price")}
                  </th>
                  <th className="border border-white  border-r-slate-700"></th>
                </tr>
              </thead>
              <tbody>
                {complex.listings.map(listing => {
                  return (
                    <tr
                      key={listing.slug}
                      className={"text-center border border-slate-700 relative"}
                    >
                      <td className=" p-2">
                        {["agreed"].includes(listing.status) && (
                          <span className="z-3 absolute top-0 bottom-0 left-0 right-0 bg-beige font-bold text-white opacity-50 flex items-center justify-center"></span>
                        )}
                        {["sold"].includes(listing.status) && (
                          <span className="z-3 absolute top-0 bottom-0 left-0 right-0 bg-black font-bold text-white opacity-50 flex items-center justify-center"></span>
                        )}
                        {listing.stats["Piso"] || "-"}
                      </td>
                      <td className=" p-2">
                        {listing.stats["Quartos"] || "-"}
                      </td>
                      <td className=" p-2">
                        {listing.stats["Área Bruta (CP)"] || "-"}
                      </td>
                      <td className=" p-2">
                        {listing.stats["Área Útil"] || "-"}
                      </td>
                      <td className=" p-2">
                        {listing.stats["Estacionamentos"] || "-"}
                      </td>
                      <td className={" p-2 "}>
                        {["sold", "agreed"].includes(listing.status)
                          ? listing.status == "agreed"
                            ? i18n.t("listing.status.agreed")
                            : i18n.t("listing.status.sold")
                          : `${listing.price} €`}
                      </td>
                      <td className=" p-2">
                        <a
                          href={sanitizeURLWithParams(
                            window.Routes.listing_path,
                            listing.slug
                          )}
                          target="_blank"
                          className="relative z-10 whitespace-nowrap bg-transparent hover:bg-beige text-beige  hover:text-white py-1 px-2 border border-beige hover:border-transparent rounded"
                        >
                          {i18n.t("enterprises.show.more")}
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-start-3 p-1">
          <ContactForm complex={complex} />
        </div>
      </section>
    </div>
  );
}
