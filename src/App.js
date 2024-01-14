//ctrl+k+c for comment out multiple lines
import './App.css';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'  //npm i bootstrap-dark-5 boostrap


import Home from './screens/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
// import Navbar from './components/Navbar';
import Login from './screens/Login';
import Signup from './screens/Signup';
import { CartProvider } from './components/ContextReducer';
import MyOrder from './screens/MyOrder';
import Category from './screens/Category';
import CategoryExplore from './screens/CategoryExplore';
import Cart from './screens/Cart';
import Admin from './screens/Admin';
import Items from './screens/Items';
import Categories from './screens/Categories';
import CategoryExploreClient from './screens/CategoryExploreClient';
import ViewUsers from './screens/ViewUsers';
import ViewOrders from './screens/ViewOrders';
import FetchOrder from './screens/FetchOrder';
import ProductDetails from './screens/ProductDetails';
import ProductDetailsAdmin from './screens/ProductDetailsAdmin';
import AddCategory from './screens/AddCategory';
import AddItem from './screens/AddItem';
import UpdateCategory from './screens/UpdateCategory';

function App() {
  return (
    <>
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/admin" element={<Admin />} />
            <Route exact path="/myorder" element={<MyOrder />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/category" element={<Category />} />
            <Route exact path="/categoryexplore" element={<CategoryExplore />} />
            <Route exact path="/categoryexploreclient" element={<CategoryExploreClient />} />
            <Route exact path="/productdetails" element={<ProductDetails />} />
            <Route exact path="/productdetailsadmin" element={<ProductDetailsAdmin />} />
            <Route exact path="/viewcategories" element={<Categories />} />
            <Route exact path="/items" element={<Items />} />
            <Route exact path="/viewusers" element={<ViewUsers />} />
            <Route exact path="/vieworders" element={<ViewOrders />} />
            <Route exact path="/fetchorders" element={<FetchOrder />} />
            <Route exact path="/addcategory" element={<AddCategory />} />
            <Route exact path="/additem" element={<AddItem />} />
            <Route exact path="/updatecategory" element={<UpdateCategory />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
    </>
  );
}

export default App;
