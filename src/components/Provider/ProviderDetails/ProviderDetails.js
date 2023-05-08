// import {
//   CarFilled,
//   GlobalOutlined,
//   MailOutlined,
//   PhoneFilled
// } from '@ant-design/icons';
// import { Button } from 'antd';
// import { useEffect, useState } from 'react';
// import { v4 as uuidv4 } from 'uuid';

// export default function ProviderDetails(props) {
//   // const emptyState = {
//   //   name: '',
//   //   providerOverview: '',
//   //   services: { partial: [], other: [] },
//   //   certifications: { partial: [], other: [] },
//   //   paymentOptions: { partial: [], other: [] }
//   // };

//   // const [providerData, setProviderData] = useState(emptyState);

//   const resetState = () => {
//     setProviderData(emptyState);
//   };

//   useEffect(async () => {
//     await resetState();
//     let newProviderData = { ...providerData };
//     const propsToBeSorted = {
//       services: props.provider.services,
//       certifications: props.provider.certifications,
//       paymentOptions: props.provider.paymentOptions
//     };

//     const sortData = (providerData, type) => {
//       for (const key in providerData) {
//         if (
//           !newProviderData[type].partial.some(
//             (item) => item.name === providerData[key].name
//           )
//         ) {
//           if (providerData[key].name === 'Other') {
//             newProviderData[type].other.push(providerData[key]);
//           } else {
//             newProviderData[type].partial.push(providerData[key]);
//           }
//         }
//       }
//     };

//     for (const prop in propsToBeSorted) {
//       sortData(propsToBeSorted[prop], prop);
//     }
//     newProviderData.providerOverview = props.provider.overview;
//     newProviderData.name = props.provider.name;
//     setProviderData(newProviderData);
//   }, [props]);

//   const renderOverview = () => {
//     return <p className="provider-overview">{providerData.providerOverview}</p>;
//   };

//   const renderList = (categoryList, title, className) => {
//     const { partial, other } = categoryList;
//     const fullList = [...partial, ...other];

//     return (
//       <div>
//         <label>{title}:</label>
//         <ul className={className}>
//           {fullList.map((option) => {
//             return <li key={option.id}>{option.name}</li>;
//           })}
//         </ul>
//       </div>
//     );
//   };

//   const renderBackButton = () => {
//     return (
//       <div className="back">
//         <Button
//           onClick={() => {
//             window.history.back();
//           }}>
//           back
//         </Button>
//       </div>
//     );
//   };

//   const setEditHash = async () => {
//     const patchBody = {
//       edit_hash: uuidv4()
//     };
//     await fetch(
//       `${process.env.REACT_APP_BASE_URL}/providers${window.location.pathname}`,
//       {
//         method: 'PATCH',
//         mode: 'cors',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ patchBody })
//       }
//     );
//   };

//   const renderEditButton = () => {
//     return (
//       <div className="edit">
//         <Button onClick={setEditHash}>request edit</Button>
//       </div>
//     );
//   };

//   if (props.view === 'full') {
//     return (
//       <div className="details-view">
//         <span className="provider-header">
//           {renderBackButton()}
//           {renderEditButton()}
//           {renderLogo()}
//         </span>
//         {renderPhoto()}
//         <span className="provider-description">
//           {renderName()}
//           {renderOverview()}
//         </span>
//         <span className="provider-resources">
//           {renderContact(props.provider)}
//           {renderAddress(props.provider)}
//           {renderWesbite(props.provider)}
//         </span>
//         <span className="provider-info">
//           {renderList(providerData.services, 'Services', 'provider-services')}
//           {renderList(
//             providerData.paymentOptions,
//             'Accepted Payment',
//             'provider-payment'
//           )}
//           {renderList(
//             providerData.certifications,
//             'Certifications',
//             'provider-certifications'
//           )}
//         </span>
//       </div>
//     );
//   }
//   return (
//     <div className="list-view">
//       <span className="left">{renderPhoto()}</span>
//       <span className="middle">{renderName()}</span>

//       {renderContact(props.provider)}
//       {renderWesbite(props.provider)}
//     </div>
//   );
// }
