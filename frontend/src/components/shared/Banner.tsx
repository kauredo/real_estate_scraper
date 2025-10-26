interface Props {
  blurred?: boolean;
  height?: string;
  text?: string;
}

function Banner(props: Props) {
  const { height, blurred, text } = props;
  let classes = "hidden md:block w-full h-full bg-center bg-cover";
  blurred && (classes = classes + "opacity-20");

  return (
    <>
      <header
        id="banner"
        className="relative hidden md:block w-full h-[50vh] text-black dark:text-light"
        style={{
          height: `${height && height}`,
          maxHeight: `${height && "30vh"}`,
        }}
      >
        {text && (
          <span className="flex justify-center items-center mx-auto container z-4 absolute top-0 bottom-0 left-0 right-0 w-full h-full">
            <h1 id="main-title" className="relative px-4 text-5xl mt-0 mb-2">
              {text}
            </h1>
          </span>
        )}
      </header>
      <div className="pt-6 bg-white dark:bg-dark text-center md:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 center">
          <h1
            id="main-title"
            className="relative block md:hidden pt-2 text-3xl text-dark dark:text-light sm:text-4xl px-4"
          >
            {text}
          </h1>
        </div>
      </div>
    </>
  );
}

export default Banner;
