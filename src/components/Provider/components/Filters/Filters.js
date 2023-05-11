import { useEffect, useState } from 'react';

const Filters = ({ options, updateFilters }) => {
  const { services, paymentOptions, certifications } = options;
  const [serviceFilters, setServiceFilters] = useState([]);
  const [paymentFilters, setPaymentFilters] = useState([]);
  const clearFilters = () => {
    setPaymentFilters([]);
    setServiceFilters([]);
  };

  useEffect(() => {
    updateFilters({ services: serviceFilters, paymentOptions: paymentFilters });
  }, [serviceFilters, paymentFilters]);
  return (
    <div className="provider-filters">
      <h4>Filters</h4>
      <FilterList
        optionList={services}
        title={'Type of care'}
        setFilterGroup={setServiceFilters}
        filterGroup={serviceFilters}
      />
      <FilterList
        optionList={paymentOptions}
        title={'Payment accepted'}
        setFilterGroup={setPaymentFilters}
        filterGroup={paymentFilters}
      />
      <button onClick={clearFilters}>clear filters</button>
    </div>
  );
};

const FilterList = ({ optionList, title, filterGroup, setFilterGroup }) => {
  const updateFilterList = (value, checked) => {
    if (checked) setFilterGroup([...filterGroup, value]);
    else {
      const index = filterGroup.indexOf(value);
      const newFilters = [...filterGroup];
      newFilters.splice(index, 1);

      setFilterGroup(newFilters);
    }
  };
  return (
    <div>
      <label>{title}:</label>
      <ul>
        {optionList.map((choice) => {
          return (
            <li key={choice.id}>
              <label>
                <input
                  type="checkbox"
                  onChange={(e) => {
                    updateFilterList(e.target.value, e.target.checked);
                  }}
                  checked={filterGroup.includes(`${choice.id}`)}
                  value={choice.id}
                />
                {choice.name}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Filters;