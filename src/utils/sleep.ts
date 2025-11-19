type Props = {
  ms: number;
};

const sleep = ({ ms }: Props) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export { sleep };
