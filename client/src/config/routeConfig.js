import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import App from "../App";
import PrivateRoute from "../components/PrivateRoute";
import PublicRoute from "../components/PublicRoute";
//unauth
import UnAuthScreen from "../screens/unauth";
//auth
import HomeScreen from "../screens/auth/Home";
import AddRoomsScreen from "../screens/auth/AddRooms";
import RoomDetailsScreen from "../screens/auth/RoomDetails";
import AddTenantScreen from "../screens/auth/AddTenant";
import TenantListingScreen from "../screens/auth/TenantList";
import EditTenantScreen from "../screens/auth/EditTenant";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* public routes */}
      <Route element={<PublicRoute />}>
        <Route path="/auth" element={<UnAuthScreen />} />
      </Route>
      {/* private routes */}
      <Route path="" element={<PrivateRoute />}>
        <Route index={true} path="/" element={<HomeScreen />} />
        <Route path="/addroom" element={<AddRoomsScreen />} />
        <Route
          path="/roomdetails/:roomType/:roomId"
          element={<RoomDetailsScreen />}
        />
        <Route path="/addtenant" element={<AddTenantScreen />} />
        <Route path="/tenantlist" element={<TenantListingScreen />} />
        <Route path="/edittenant" element={<EditTenantScreen />} />
      </Route>
      <Route path="*" element={<h1>404 Component</h1>} />
    </Route>
  )
);
