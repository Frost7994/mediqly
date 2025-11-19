import { format } from "date-fns";
import { toast as sonner } from "sonner";

type Props = {
  message: string;
};

const toast = ({ message }: Props) => {
  return sonner(message, {
    description: format(new Date(), "PPPP 'at' p"),
  });
};

export { toast };
