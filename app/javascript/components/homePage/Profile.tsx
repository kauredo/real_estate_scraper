import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";

export default function Profile() {
  return (
    <section className="container mx-auto flex flex-col md:flex-row items-center md:items-start justify-between h-2/3">
      <div className="grid w-1/ items-center">
        <div className="h-min py-8 md:pb-2">
          <h1 className="font-medium leading-tight text-5xl mt-0 mb-2">
            Sofia Galvão
          </h1>
          <h3 className="font-medium leading-tight text-xl">
            Juntos criamos Lares Felizes!
          </h3>
        </div>
      </div>
      <div className="mx-2 md:w-1/2 relative md:bottom-32">
        <div className="container mx-auto max-w-sm overflow-hidden drop-shadow-lg mt-2 bg-white">
          <div
            className="relative z-10"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 4vw))",
            }}
          >
            <img
              className="w-full object-contain object-top max-h-96"
              // src="https://repstaticneu.azureedge.net/images/2001/A/NWM/Medium/34672-45e231dc-f9d9-496b-81d6-2bec93045b4a.jpg"
              src="https://scontent.flis8-1.fna.fbcdn.net/v/t1.6435-9/78767140_10217256708782271_7687124950188032000_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=174925&_nc_ohc=atnum074oEoAX-oZt0C&_nc_ht=scontent.flis8-1.fna&oh=00_AT-GURf34LVDqlCX_oFOaISIJystsNYCk4ktkbw5BCqVkQ&oe=62443225"
              alt="Sofia Galvão"
            />
          </div>
          <div className="mx-6 mb-8 mt-4 md:mt-0">
            <div className="flex items-center mb-4 text-gray-600">
              <FontAwesomeIcon icon={faInstagram} />
              <h4 className="px-2 text-sm">@sofiagalvaokw</h4>
            </div>
            <div className="flex items-center mb-4 text-gray-600">
              <FontAwesomeIcon icon={faFacebook} />
              <h4 className="px-2 text-sm">/sofiagalvaokw</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
