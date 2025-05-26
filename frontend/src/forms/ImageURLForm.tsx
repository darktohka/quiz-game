import { FormInput } from '@/components/form/FormInput';
import { FormLabel } from '@/components/form/FormLabel';
import { uploadImage } from '@/services/upload.service';
import { showErrors } from '@/utils/error.util';
import { CircleArrowUp, CircleXIcon, UploadIcon } from 'lucide-preact';
import { ChangeEvent } from 'preact/compat';
import { useEffect, useState } from 'preact/hooks';
import BallTriangle from 'react-loading-icons/dist/esm/components/ball-triangle';

export type ImageURLFormProps = {
  label: string;
  placeholder: string;
  disabled: boolean;
  url: string;
  onChange: (_url: string) => void;
};

export const ImageURLForm = ({
  label,
  placeholder,
  disabled,
  url,
  onChange,
}: ImageURLFormProps) => {
  const [isShowingUpload, setIsShowingUpload] = useState<boolean>(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  useEffect(() => {
    if (url) {
      setIsShowingUpload(false);
    }
  }, [url]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];

    if (file) {
      setSelectedFile(file);
      handleSubmit(file);
    }
  };

  const handleSubmit = async (file: File) => {
    if (uploading) {
      return;
    }

    setUploading(true);

    try {
      const result = await uploadImage(file);
      onChange(result.url);
    } catch (error) {
      showErrors(error as Error);
      return;
    } finally {
      setUploading(false);
      setSelectedFile(null);
    }
  };

  let actualInput;

  if (isShowingUpload) {
    actualInput = (
      <div className="flex flex-col gap-[1rem]">
        <div className="flex items-center justify-center w-[100%] lg:w-[35rem]">
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer dark:text-white dark:bg-form-input">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <UploadIcon className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Kattints a feltöltéshez</span>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                JPG vagy PNG formátum (max. 5MB)
              </p>
              {selectedFile && (
                <p className="text-gray-500 mt-[1rem] text-[0.8rem]">
                  Állomány neve: {selectedFile.name}
                </p>
              )}
              {uploading && (
                <BallTriangle stroke="currentColor" className="mt-[1.5rem]" />
              )}
            </div>
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>
      </div>
    );
  } else {
    actualInput = (
      <input
        type="text"
        placeholder={placeholder}
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        onChange={(e) => onChange(e.currentTarget.value)}
        value={url}
        disabled={disabled}
      />
    );
  }

  return (
    <FormInput>
      <div className="flex flex-row gap-2 items-center">
        <FormLabel label={label} />
        {isShowingUpload ? (
          <CircleXIcon
            className="h-[0.9rem] w-auto mb-3 hover:cursor-pointer"
            onClick={() => setIsShowingUpload(false)}
          />
        ) : (
          <CircleArrowUp
            className="h-[0.9rem] w-auto mb-3 hover:cursor-pointer"
            onClick={() => setIsShowingUpload(true)}
          />
        )}
      </div>
      {actualInput}
    </FormInput>
  );
};
