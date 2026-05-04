
"use client";

// productcollection lo <Link> lo unna id.      --> detalis button
// id dynamic ga get it
// individual product get it
// id dynamic get.

// BookingModel ki values in that component send it.

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import UserNavigation from "@/app/components/UserNavigation";
import CalenderComponent from "@/app/components/CalenderComponent";
import { bookingAction } from "@/app/serverActions/bookingAction";

const Page = () => {
  const [record, setRecord] = useState(null);
  const [selectedDates, setSelectedDates] = useState(null);

  // Dynamic ID from URL
  const { id } = useParams();

  // Fetch single product details
  const dynamicHandler = async () => {
    try {
      const response = await fetch(
        `https://sunset-valley-retreat.vercel.app/api/admin/product/${id}`
      );

      const newData = await response.json();
      setRecord(newData.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      dynamicHandler();
    }
  }, [id]);

  // dates coming from calendercomponent
  // onDatesSelect --> props pass it
  const handleDateSelect = (dates) => {
    setSelectedDates(dates);
    console.log("dates coming from calendercomponent",dates)
  };

  // Book Now
  const bookingHandler = async () => {
    if (!selectedDates) {
      alert("Please select booking dates");
      return;
    }

    // 1
    const bookingDetails = {
      record,
      selectedDates};
    // 1
    try {
      const response = await bookingAction(bookingDetails);
      if (response.success) {
        alert("Booking successful");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <UserNavigation />
      <CalenderComponent onDatesSelect={handleDateSelect} />
      <Link href="/">
        <p align="center">Go Back</p>
      </Link>

      {record ? (
        <div className="singleSection">
          {/* Left Side */}
          <div className="singleLeft">
            <h2>{record.title}</h2>

            <img
              src={record.image}
              alt={record.title}
              className="singleImage"
            />
          </div>

          {/* Center Side */}
          <div className="singleCenter">
            <div className="singlePice">Rs. {record.price}</div>

            <p className="singleDesc">{record.desc}</p>

            {/* Amenities */}
            <div>
              {record.amen?.map((item, index) => (
                <div className="singleAmen" key={index}>
                  <span>*</span> {item}
                </div>
              ))}
            </div>

            {/* Offer */}
            <div className="offer">
              <span>*</span>
              <button>Discount {record.offer}</button>
            </div>

            {/* Booking Button */}
            <div className="singleBtn">
              <button style={{backgroundColor: "rgb(59, 130, 246)"}} 
              onClick={bookingHandler}>Book Now</button>
            </div>
          </div>
        </div>
      ) : (
        <h1
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            color: "blue",
          }}
        >
          Loading...
        </h1>
      )}
    </div>
  );
};

export default Page;