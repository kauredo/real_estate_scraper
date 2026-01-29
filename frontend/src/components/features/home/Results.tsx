import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconName } from "@fortawesome/fontawesome-svg-core";
import { ResultNumbers, Testimonial } from "@/utils/interfaces";
import Testimonials from "./Testimonials";

interface Props {
  results: ResultNumbers;
  testimonials: Testimonial[];
}

export default function Results({ results, testimonials }: Props) {
  const { variables } = results;
  const volume = variables.filter(
    (vari) =>
      vari.name.toLowerCase().includes("negócios") ||
      vari.name.toLowerCase().includes("business"),
  )[0];

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="results"
      className="container mx-auto flex flex-col justify-between items-center min-h-[30vh] md:py-8 text-dark dark:text-light"
    >
      {/* Using description list for proper name-value semantics */}
      <dl className="text-center w-full container mx-auto text-2xl flex flex-col sm:flex-row justify-center items-center flex-wrap pb-0 sm:pb-6 p-6 pt-6 sm:pt-2 gap-2">
        {variables?.map((variable) => {
          const iconName = variable.icon.replace("fas fa-", "") as IconName;
          return (
            <div
              key={variable.name}
              className="variable w-62 flex flex-col justify-center items-center p-4 md:py-0"
            >
              <FontAwesomeIcon
                icon={["fas", iconName]}
                className="text-8xl min-h-1/4 m-2 text-beige-default dark:text-beige-medium"
                aria-hidden="true"
              />
              {variable === volume ? (
                <>
                  <dd className="text-2xl font-semibold w-56" ref={ref}>
                    {inView && (
                      <CountUp start={0} end={parseInt(variable.value)} />
                    )}
                    {" €"}
                  </dd>
                  <dt className="text-sm">{variable.name}</dt>
                </>
              ) : (
                <>
                  <dt className="text-2xl font-semibold">{variable.name}</dt>
                  <dd className="text-sm">{variable.value}</dd>
                </>
              )}
            </div>
          );
        })}
      </dl>
      <Testimonials testimonials={testimonials} />
    </section>
  );
}
