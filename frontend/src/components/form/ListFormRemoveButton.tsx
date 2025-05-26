export type ListFormRemoveButtonProps = {
  onClick: () => void;
};

export const ListFormRemoveButton = ({
  onClick,
}: ListFormRemoveButtonProps) => (
  <button
    onClick={onClick}
    className="flex justify-center rounded bg-red-600 p-3 font-medium text-gray hover:bg-opacity-90 transition duration-500"
  >
    Törlés
  </button>
);
