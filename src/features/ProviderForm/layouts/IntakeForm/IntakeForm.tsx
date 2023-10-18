import { ButtonGroup, ButtonPropArray } from '@/components';
import { useState } from 'react';
import { FormManager } from '../..';
import { FormType, InputObject } from '../../types';

export type Initializer = () => InputObject[] | undefined;
export const IntakeForm = () => {
  const [formType, setFormType] = useState<FormType>();
  return (
    <div>
      <h2>Add your information to the Directory</h2>
      {formType ? (
        <FormManager formType={formType} />
      ) : (
        <Initializer setFormType={setFormType} />
      )}
    </div>
  );
};

const Initializer = ({
  setFormType
}: {
  setFormType: React.Dispatch<React.SetStateAction<FormType | undefined>>;
}) => {
  const buttonProps: ButtonPropArray = [
    {
      children: 'Individual Practitioner',
      onClick: () => {
        setFormType('individual');
      }
    },
    {
      children: 'Organization',
      onClick: () => {
        setFormType('organization');
      }
    }
  ];
  return (
    <>
      <p>
        Enter your information to be added to the Birth and Early Parenting
        Resource Directory. The information you enter will be used to create a
        searchable profile in the directory. You may enter information as an
        Individual Practitioner to create a profile page for your own practice.
        Administrators of organizations like hospitals, agencies, and other
        working groups can also create a profile for the organization. Note:
        individual practitioners who are affiliated with or employed by a group
        should click the Individual Practitioner button below.{' '}
      </p>
      <p>
        We also collect this data for our research. For more information, please
        see our Privacy Policy and read more about our research.{' '}
      </p>
      <p>
        This form is for practicing providers wanting to include their
        information in the directory project. If you want to view the current
        providers, click here.
      </p>
      <div className="bg-tan">
        <ButtonGroup buttonProps={{ ...buttonProps }} />
      </div>
    </>
  );
};