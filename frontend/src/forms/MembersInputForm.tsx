import { ListForm } from '@/components/form/ListForm';
import {
  CreateProjectMemberDTO,
  ProjectMemberRole,
} from 'shared/src/dto/projectmember';
import { MemberInputForm } from './MemberInputForm';

export type MembersInputFormProps = {
  members: CreateProjectMemberDTO[];
  setMembers: (_members: CreateProjectMemberDTO[]) => void;
};

export const MembersInputForm = ({
  members,
  setMembers,
}: MembersInputFormProps) => (
  <ListForm
    items={members}
    setItems={setMembers}
    renderItem={(member, setMember, removeMember) => (
      <MemberInputForm
        member={member}
        setMember={setMember}
        removeMember={removeMember}
      />
    )}
    createNewItem={() => ({
      name: '',
      role: ProjectMemberRole.TRANSLATOR,
      url: '',
    })}
    canCreateNewItem={true}
    label="Készítők"
  />
);
