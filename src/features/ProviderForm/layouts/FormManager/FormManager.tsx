import { FormType } from '../../types';
import { useContextInitializer, useFormContext } from '../../utils/formContext';
import { FormPageSwitcher } from '../../components/FormPageSwitcher';
import { PageStateIndicatorList } from '../../components/PageStateIndicatorList';
import { Link } from 'react-router-dom';
import { Button } from '@/components';

export const FormManager = ({ formType }: { formType: FormType }) => {
  const [FormContext, value] = useContextInitializer(formType);

  return (
    <FormContext.Provider value={value}>
      <div className="content-wrapper">
        <div className="content-main form-container">
          {value.formData.submissionResponse.id ? (
            <SubmissionPage {...{ formType }} />
          ) : (
            <section>
              <>
                <PageStateIndicatorList />
                <FormPageSwitcher />
              </>
            </section>
          )}
        </div>
      </div>
    </FormContext.Provider>
  );
};

const SubmissionPage = ({ formType }: { formType: string }) => {
  const {
    formData: { submissionResponse },
    formState: { getFormValues }
  } = useFormContext();
  const formValues = getFormValues();
  return (
    <section className="submission-section">
      {!submissionResponse.id ? (
        'something went wrong. Probably the name you entered has already been taken'
      ) : (
        <>
          <h2>Thank You!</h2>
          <p>
            {submissionResponse.message}
            <Link
              to={`/${formType === 'individual' ? 'provider' : formType}/${
                submissionResponse.id
              }`}>
              Check out your new profile!
            </Link>
          </p>
          <h3>Your Submission</h3>
          <form>
            <ul className="confirmation-list">
              {formValues.map((entry: string[], i: number) => {
                if (!!entry[0])
                  return (
                    <li key={i}>
                      <span>{entry[0]}:</span> {entry[1]}
                    </li>
                  );
              })}
            </ul>
          </form>
          <Button to="/">Return home</Button>
        </>
      )}
    </section>
  );
};
