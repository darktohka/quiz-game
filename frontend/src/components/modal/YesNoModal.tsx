import { JSX } from 'preact/jsx-runtime';
import Modal from 'react-responsive-modal';

export type YesNoModalProps = {
  title: string;
  content: JSX.Element;
  open: boolean;
  setOpen: (_open: boolean) => void;
  onAgree?: () => void;
  onDisagree?: () => void;
};

export const YesNoModal = ({
  title,
  content,
  open,
  setOpen,
  onAgree,
  onDisagree,
}: YesNoModalProps) => {
  const disagree = () => {
    if (onDisagree) {
      onDisagree();
    }

    setOpen(false);
  };

  const agree = () => {
    if (onAgree) {
      onAgree();
    }

    setOpen(false);
  };

  return (
    <Modal open={open} onClose={disagree} center>
      <div className="flex flex-col gap-[1rem]">
        <h2 className="text-xl font-medium">{title}</h2>
        {content}
        <div className="flex flex-row-reverse gap-[1rem]">
          <button
            className="px-4 py-2 text-white bg-red-500 rounded-md"
            onClick={disagree}
          >
            Nem
          </button>
          <button
            className="px-4 py-2 text-white bg-primary rounded-md"
            onClick={agree}
          >
            Igen
          </button>
        </div>
      </div>
    </Modal>
  );
};
