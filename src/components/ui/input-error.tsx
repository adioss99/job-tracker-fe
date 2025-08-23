type InputErrorProps = {
  message?: string;
};

const InputError: React.FC<InputErrorProps> = ({ message }) => {
  if (!message) return null;
  return <p className="ml-2 text-xs text-red-500">{message}</p>;
};

export { InputError };
