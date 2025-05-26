import { ListFormRemoveButton } from '@/components/form/ListFormRemoveButton';
import { useTags } from '@/services/tag.service';
import { useMemo } from 'preact/hooks';
import BallTriangle from 'react-loading-icons/dist/esm/components/ball-triangle';

export type TagInputFormProps = {
  tagId: string;
  setTagId: (_tagId: string) => void;
  removeTag: () => void;
  usedTags: string[];
};

export const TagInputForm = ({
  tagId,
  setTagId,
  removeTag,
  usedTags,
}: TagInputFormProps) => {
  const { data: tags, isLoading: loadingTags } = useTags();

  if (loadingTags || !tags) {
    return <BallTriangle stroke="currentColor" />;
  }

  const filteredTags = useMemo(
    () =>
      tags
        .filter((tag) => tagId === tag.id || !usedTags.includes(tag.id))
        .sort((a, b) => a.name.localeCompare(b.name)),
    [tags, tagId, usedTags]
  );

  return (
    <div className="flex flex-row gap-3">
      <select
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        value={tagId}
        onChange={(e) => setTagId(e.currentTarget.value)}
      >
        {filteredTags.map((tag) => (
          <option key={tag.id} value={tag.id}>
            {tag.name}
          </option>
        ))}
      </select>
      <ListFormRemoveButton onClick={removeTag} />
    </div>
  );
};
