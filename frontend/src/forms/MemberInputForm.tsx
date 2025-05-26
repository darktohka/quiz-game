import { ListFormRemoveButton } from '@/components/form/ListFormRemoveButton';
import {
  CreateProjectMemberDTO,
  ProjectMemberRole,
  projectMemberRoleToName,
  projectMembersWithURL,
} from 'shared/src/dto/projectmember';

export type MemberInputFormProps = {
  member: CreateProjectMemberDTO;
  setMember: (_member: CreateProjectMemberDTO) => void;
  removeMember: () => void;
};

export const MemberInputForm = ({
  member,
  setMember,
  removeMember,
}: MemberInputFormProps) => (
  <div className="flex flex-row gap-3">
    <input
      type="text"
      placeholder="Készíŧő neve"
      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      value={member.name}
      onChange={(e) => setMember({ ...member, name: e.currentTarget.value })}
    />
    <select
      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      value={member.role}
      onChange={(e) =>
        setMember({
          ...member,
          role: e.currentTarget.value as ProjectMemberRole,
        })
      }
    >
      {Object.entries(projectMemberRoleToName).map(([role, name]) => (
        <option key={role} value={role}>
          {name}
        </option>
      ))}
    </select>
    {projectMembersWithURL.includes(member.role) && (
      <input
        type="text"
        placeholder="Kapcsolódó URL (opcionális)"
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        value={member.url ?? ''}
        onChange={(e) => setMember({ ...member, url: e.currentTarget.value })}
      />
    )}
    <ListFormRemoveButton onClick={removeMember} />
  </div>
);
