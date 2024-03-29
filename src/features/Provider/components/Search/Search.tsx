import { ScriptHTMLAttributes, useState } from 'react';
import { Input, Button } from '@/components';
import { useNavigate } from 'react-router-dom';
import { isMobile, useMobileViewportChecker } from '@/utils/helpers';

export const Search = ({
  updateSearch,
  initialTerms,
  type = 'standard'
}: {
  updateSearch?: Function;
  initialTerms?: { keyword?: string; distance: string };
  type?: 'fancy' | 'standard' | 'compressed';
}) => {
  const isMobileViewport = useMobileViewportChecker();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState(initialTerms?.keyword || '');
  const [distance, setDistance] = useState(initialTerms?.distance || '');
  const searchFunction = (keyword: string, distance: string) => {
    if (location.pathname !== '/results') {
      navigate('/results', { state: { search: { keyword, distance } } });
    }
    if (updateSearch) {
      updateSearch(keyword, distance);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      searchFunction(keyword, distance);
    }
  };

  if (isMobileViewport) type = 'standard';
  return (
    <div className={`provider-search ${isMobileViewport ? 'mobile' : type}`}>
      <Input
        icon="search"
        label={
          type === 'fancy'
            ? undefined
            : 'Keyword, type of care, practitioner name'
        }
        // onFocus={() => {
        //   setKeyword('');
        //   searchFunction('', distance);
        // }}  ******* this needs to be moved to an 'x' clear button
        placeholder="keyword"
        value={keyword}
        onKeyDown={handleKeyPress}
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
      />
      {type === 'standard' && !isMobileViewport ? <p>near</p> : ''}
      <Input
        icon="map"
        label={type === 'fancy' ? undefined : 'Zip code'}
        placeholder="zip code"
        onChange={(e) => {
          setDistance(e.target.value);
        }}
      />
      <Button
        type="primary"
        icon="search"
        onClick={() => {
          searchFunction(keyword, distance);
        }}>
        {type !== 'compressed' && !isMobileViewport
          ? 'Find care providers'
          : ''}
      </Button>
    </div>
  );
};

//search either navigates to results page with an optional history object, or updates
