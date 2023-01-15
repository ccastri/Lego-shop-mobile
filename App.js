import * as React from 'react';
import { useEffect, useState } from 'react';
// TODO:
// import useAuth, { AuthProvider } from './hooks/useAuth';
import axios from "axios";
import { Provider } from 'react-redux';
import AppWrapper from './AppWrapper';
import { ToggleProvider } from './hooks/useToggle';
import { store } from './store';






export default function App() {



  const [products, setProducts] = useState([])

  useEffect(() => {
    (async () => {

      try {
        const resp = await axios.get('https://my-json-server.typicode.com/ccastri/dummy-data/products');
        // console.log(resp.data);
        // TODO:Aquí puedo ver los items del basketScreen
        // !cuando hago la API call (Falta la reduce fn)

        const data = await resp.data
        setProducts(data)
        console.log(products);

        return data;
      }
      catch (err) {
        console.log(err)

      }
    }
    )
      ()


  }, [])

  return (
    <>
      <Provider store={store}>
        <ToggleProvider>
          <AppWrapper products={products} />
        </ToggleProvider>
      </Provider>
    </>
  );
}

