import React from 'react';
import { StatusBar } from 'react-native';

import Routes from './src/routes';

export default function App() {
  return (
    <>
    <StatusBar varStyle="ligth-content" backgroundColor="#7D40E7"/>
    <Routes />
    </>
  );
}


// import React from 'react';

// import Routes from './src/routes';

// export default function App(){
//   return (
//         <Routes />

//   );
// }