// pages/track-orders.js
import React from "react";
import TrackOrders from "../components/userComponents/TrackOrders";
import Navbar from "@/components/commonComponents/Navbar";

const TrackOrdersPage = () => {
  return (
    <div>
      <Navbar />
      <TrackOrders />
    </div>
  );
};

export default TrackOrdersPage;
