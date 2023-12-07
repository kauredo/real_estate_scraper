import Carousel from "nuka-carousel";

interface Props {
  items: any[];
  renderItem: (item: any) => JSX.Element;
  slideNumber: number;
}

export default function CarouselComponent(props: Props) {
  const { items, renderItem, slideNumber } = props;

  return (
    <Carousel
      autoplay={slideNumber === 1}
      adaptiveHeight={true}
      slidesToShow={slideNumber}
      defaultControlsConfig={{
        nextButtonText: "➤",
        prevButtonStyle: { transform: "rotate(180deg)" },
        prevButtonText: "➤",
        pagingDotsContainerClassName: "!top-0",
        pagingDotsClassName: "mx-1 hidden sm:block",
      }}
    >
      {items?.map(item => renderItem(item))}
    </Carousel>
  );
}
