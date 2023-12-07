import Carousel from "nuka-carousel";

interface Props {
  id: string;
  className: string;
  children: JSX.Element | JSX.Element[];
}

export default function SectionComponent(props: Props) {
  const { id, className, children } = props;

  return (
    <section id={id} className={className}>
      <div className="w-full relative flex items-center justify-center">
        <div className="w-full h-full mx-auto overflow-y-hidden">
          {children}
        </div>
      </div>
    </section>
  );
}
