
"use client"

// product data get ---> Admin page lo show it.
// component render page.js

"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

const ProductCollection = () => {
    const [collection, setCollection] = useState([]);

    const collectionHandler = async () => {
        const response = await fetch("/api/admin/add-product");
        const newData = await response.json();

        console.log("product Data", newData);
        setCollection(newData.data);
    };

    useEffect(() => {
        collectionHandler();
    }, []);

    return (
        <div className="productSection">
            <h1 align="center">Select your Stay</h1>

            {collection.length > 0 ? (
                collection.map((item) => (
                    <div key={item._id} className="proDetail">

                        <div className="left">
                            <div className="title">{item.title}</div>
                            <br />
                            <img
                                src={item.image}
                                alt={item.title}
                                className="roomImage"
                            />
                        </div>

                        <div className="center">
                            <div className="pamen">
                                <h2 className="price">Rs. {item.price}</h2>

                                <div>
                                    <h3>Amenities</h3>

                                    {item.amen?.map((serve, i) => (
                                        <div className="amenities" key={i}>
                                            <div>* {serve}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="right">
                                <Link href={`/detail/${item._id}`}>
                                    <button className="detail" style={{fontSize:'15px'}}>
                                        Details
                                    </button>
                                </Link>
                            </div>
                        </div>

                    </div>
                ))
            ) : (
                <h1 style={{
                    textAlign: 'center',
                    color: "#2563eb",
                    marginTop: '20px'
                }}>
                    Loading...
                </h1>
            )}
        </div>
    );
};

export default ProductCollection;