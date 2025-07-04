type TitleProps = {
  title: string;
};

function Title({ title }: TitleProps) {
  return (
    <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl text-center font-bold">
      {title}
    </h1>
  );
}

export default Title;
