type Props = {
  prefix?: string;
};

const randomSegment = () => {
  return Math.random().toString(36).substring(2, 6);
};

const generateId = ({ prefix }: Props) => {
  const id = `${prefix ? prefix + "-" : ""}${randomSegment()}-${randomSegment()}-${randomSegment()}-${randomSegment()}`;
  return id;
};

export { generateId };
