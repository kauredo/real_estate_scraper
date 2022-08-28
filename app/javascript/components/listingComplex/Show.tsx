import React, { useEffect } from "react";
import ContactForm from "../contactPage/ContactForm";
import { Listing, ListingComplex } from "../utils/Interfaces";

interface Props {
  complex: ListingComplex;
  listings: Listing[];
}

export default function Show(props: Props) {
  const { complex, listings } = props;

  const header = () => {
    if (complex.video_link) {
      return (
        <iframe
          id="iframe"
          style={{ height: "70vh", aspectRatio: "16/9" }}
          className="w-full mx-auto"
          src={`${complex.video_link}?autoplay=1&mute=1`}
          allow="autoplay"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      );
    } else {
      return (
        <img
          style={{ maxHeight: "70vh", objectFit: "contain" }}
          src={listings[0].photos[1]}
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
                    Natureza
                  </th>
                  <th className="border border-white p-2">Tipologia</th>
                  <th className="border border-white p-2">Área Bruta</th>
                  <th className="border border-white p-2">Área Útil</th>
                  <th className="border border-white p-2">Estacionamento</th>
                  <th className="border border-white p-2">Preço</th>
                  <th className="border border-white  border-r-slate-700"></th>
                </tr>
              </thead>
              <tbody>
                {listings.map(listing => {
                  return (
                    <tr
                      key={listing.id}
                      className={
                        "text-center border border-slate-700 relative " +
                        (["Reservado", "Vendido"].includes(listing.status) &&
                          "line-through")
                      }
                    >
                      <td className=" p-2">
                        {listing.status === "Reservado" && (
                          <span className="z-3 absolute top-0 bottom-0 left-0 right-0 bg-beige font-bold text-white opacity-50 flex items-center justify-center"></span>
                        )}
                        {listing.status === "Vendido" && (
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
                      <td className={" p-2 "}>{listing.price}€</td>
                      <td className=" p-2">
                        <a
                          href={window.Routes.listing_path(listing.id)}
                          target="_blank"
                          className="relative z-10 whitespace-nowrap bg-transparent hover:bg-beige text-beige  hover:text-white py-1 px-2 border border-beige hover:border-transparent rounded"
                        >
                          Ver mais
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {/* <ul
            className="tablet:ml-2 grid gap-4"
            style={{
              gridTemplateColumns: "repeat( auto-fit, minmax(250px, 1fr) )",
            }}
          >
            {listings.map(listing => {
              return <li className="mx-8 list-disc">{listing.title}</li>;
            })}
          </ul> */}
          </div>
        </div>

        <div className="col-start-3 p-1">
          <ContactForm complex={complex} />
        </div>
      </section>
    </div>
  );
}
