import Carousel from "nuka-carousel";
import React, { useRef } from "react";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";
import { ResultNumbers } from "../utils/Interfaces";

interface Props {
  results: ResultNumbers;
}

export default function Results(props: Props) {
  const { variables, listingCount } = props.results;
  const volume = variables.filter(
    vari => vari.name.toLowerCase() === "volume de negócios"
  )[0];

  return (
    <section className="container mx-auto flex flex-col sm:flex-row justify-between items-center min-h-[30vh]">
      <div className="text-center w-full sm:w-[40%] mx-auto text-2xl flex flex-col sm:flex-row justify-around items-center flex-wrap">
        {variables.map(variable => {
          return (
            <div
              key={variable.name}
              className="variable mx-auto min-w-[140px] w-1/3 flex flex-col justify-center items-center"
            >
              <i
                className={`text-6xl tablet:text-8xl min-h-1/4 m-2 text-bordeaux ${variable.icon}`}
                aria-hidden="true"
              ></i>
              <h2>
                <div>{variable.name}</div>
                {variable === volume ? (
                  <CountUp
                    end={parseInt(variable.value)}
                    redraw={true}
                    suffix=" €"
                  >
                    {({ countUpRef, start }) => (
                      <VisibilitySensor onChange={start} delayedCall>
                        <span ref={countUpRef} />
                      </VisibilitySensor>
                    )}
                  </CountUp>
                ) : (
                  variable.value
                )}
              </h2>
            </div>
          );
        })}
      </div>
      <div className="p-6 text-center w-full sm:w-2/5 mx-auto flex justify-center items-center">
        <div className="w-full">
          <h3 className="text-2xl mb-4">Testemunhos</h3>
          <ul className="overflow-hidden w-full h-full flex lg:gap-8 md:gap-6 items-center justify-start transition ease-out duration-700 my-2">
            <Carousel
              autoplay
              vertical
              heightMode="max"
              defaultControlsConfig={{
                nextButtonText: "➤",
                prevButtonStyle: { transform: "rotate(180deg)" },
                prevButtonText: "➤",
                pagingDotsClassName: "mx-1 hidden sm:block",
              }}
            >
              <li className="p-4">
                “Sofia found me my home, she is a professional and made the
                experience so pleasant and safe. I will trust her with all of my
                future real estate projects!” - Nir
              </li>
              <li className="p-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed,
                fuga doloremque nihil tenetur doloribus, voluptatum cumque vitae
                eum commodi officiis quasi similique porro ipsum odio nemo?
                Exercitationem nisi odit voluptates ipsa quisquam, dignissimos
                esse soluta magnam eaque ex, autem labore delectus ut a expedita
                accusamus, nostrum atque possimus rerum quo.
              </li>
              <li className="p-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis,
                enim. Laboriosam amet quos nihil ratione animi, tempore illum
                facilis harum corrupti suscipit modi ad neque laborum
                perspiciatis quaerat tenetur maxime!
              </li>
            </Carousel>
          </ul>
        </div>
      </div>
    </section>
  );
}
