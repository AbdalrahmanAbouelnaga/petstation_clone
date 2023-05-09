import Header from "./components/Header";
import { Routes,Route,Router } from "react-router-dom";
import Homepage from "./pages/Homepage";
import { Store } from "./pages/Store";
import Product from "./pages/Product";
import { Provider } from "react-redux";
import store from "./store/store";
import { Cart } from "./pages/Cart";
import { useState,useEffect } from "react";
import axios from "axios";
import { Footer } from "./components/Footer";

function App() {
  const [navData,setNavData] = useState({})

  useEffect(()=>{
    axios.get("/navbar")
         .then(res=>setNavData(res.data))
         .catch(error=>console.log(error.response.data))
  },[])
  return (
    <div className="App">
       <Provider store={store}>
      <Header navData={navData} />
        <Routes>
          <Route exact path="/" Component={Homepage} />
          <Route exact path="/cart" Component={Cart} />
          <Route exact path="/:animal_slug" element={<Store navData={navData}/>}  />
          <Route exact path="/:animal_slug/:category_slug" element={<Store navData={navData}/>} />
          <Route exact path="/:animal_slug/:category_slug/:sub_category_slug" element={<Store navData={navData}/>} />
          <Route exact path="/:animal_slug/:category_slug/:sub_category_slug/:product_slug" Component={Product} />
        </Routes>
        <Footer navData={navData} />
      </Provider>
    </div>
  );
}

export default App;
