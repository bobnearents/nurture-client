import { useLoaderData } from 'react-router-dom';
import { createPageContent } from '../utils/helpers';

export default function Confirmation({ changePageState, provider }) {
  const { services, paymentOptions, certifications } = useLoaderData();

  return (
    <>
      <ul>
        {Object.entries(provider.general).map((inputValue) => {
          const [label, userResponse] = inputValue;
          if (userResponse.length) {
            let value = userResponse;
            if (typeof userResponse !== 'string') value = userResponse[0].name;
            return (
              <li>
                {label}: {value}
              </li>
            );
          }
        })}
      </ul>
      <button
        onClick={() => {
          changePageState(2);
        }}>
        confirm
      </button>
      <button
        onClick={() => {
          changePageState(0, provider);
        }}>
        edit
      </button>
    </>
  );
}

const confirmationContent = createPageContent(
  'Confirm Your Details',
  'Thank you for submitting your details! Please check your information below and click to CONFIRM. Click EDIT to go back and make changes. After confirming, a copy of this form will be emailed to you at anna@example.com.',
  Confirmation
);

export { confirmationContent };
