import { ListForm } from '@/components/form/ListForm';
import { TagInputForm } from './TagInputForm';
import { useTags } from '@/services/tag.service';
import { useMemo } from 'preact/hooks';
import { BallTriangle } from 'react-loading-icons';

export type TagsInputFormProps = {
  tagIds: string[];
  setTagIds: (_tagIds: string[]) => void;
};

export const TagsInputForm = ({ tagIds, setTagIds }: TagsInputFormProps) => {
  const { data: tags, isLoading: loadingTags } = useTags();

  if (loadingTags || !tags) {
    return <BallTriangle stroke="currentColor" />;
  }

  const nextTag = useMemo(
    () =>
      tags
        .filter((tag) => !tagIds.includes(tag.id))
        .sort((a, b) => a.name.localeCompare(b.name))[0],
    [tags, tagIds]
  );

  return (
    <ListForm
      items={tagIds}
      setItems={setTagIds}
      renderItem={(tagId, setTagId, removeTag) => (
        <TagInputForm
          tagId={tagId}
          setTagId={setTagId}
          removeTag={removeTag}
          usedTags={tagIds}
        />
      )}
      createNewItem={() => nextTag.id}
      canCreateNewItem={nextTag != null}
      label="Tagek"
    />
  );
};
