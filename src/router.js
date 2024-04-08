
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Root from "./components/Root";

import CarComponent from './components/Car/CarComponent';
import UserComponent from './components/User/UserComponent';
import OfficeComponent from './components/Office/OfficeComponent';
import ReservationComponent from './components/Reservation/ReservationComponent';
import CentauroComponent from './components/Centauro/CentauroComponent'; 

export const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Root />}>
    <Route path="/cars" element={<CarComponent />} />
    <Route path="/users" element={<UserComponent />} />
    <Route path="/offices" element={<OfficeComponent />} />
    <Route path="/reservations" element={<ReservationComponent />} />
    <Route path="/centauro" element={<CentauroComponent />} />
  </Route >
));
