import { useContext, useEffect, useState } from 'react'
import classes from './Orders.module.css'
import LayOut from '../../Components/LayOut/LayOut'
import { db } from '../../Utility/firebase'
import { DataContext } from '../../Components/DataProvider/DataProvider'
import ProductCard from '../../Components/Product/ProductCard'
import {getFirestore, collection, doc, onSnapshot, orderBy } from "firebase/firestore";
 


const Orders = () => {
  const [{ user }] = useContext(DataContext)
  const [orders, setOrders] = useState([])
  
  // useEffect(() => {
  //   if (user) {
  //     // console.log(user)
  //      db.collection("users").doc(user.uid).collection("orders").orderBy("created", "desc").onSnapshot((snapshot) => {
  //         // console.log(snapshot)
  //       setOrders(
  //         snapshot.docs.map((doc) => ({
  //           id: doc.id,
  //           data: doc.data()
  //         })
  //         )
  //        )
  //      });

  //   //   await setDoc(
  //   // doc(db, "users", user.uid, "orders", paymentIntent.id),
  //   // {
  //   //   basket: basket,
  //   //   amount: paymentIntent.amount,
  //   //   created: paymentIntent.created,
  //   // })
      
  //   } else {
  //     setOrders([])
  //   }
    
  // }, [user]);


  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(
        collection(db, "users", user.uid, "orders"),
        { orderBy: ["created", "desc"] },
        (snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        }
      );

      return unsubscribe;
    } else {
      setOrders([]);
    }
  }, [user]);
  
  

    return (
      <LayOut>
        <section className={classes.container}>
          <div className={classes.orders__container}>
                    <h2>Your Orders</h2>
                    {
                        orders?.length == 0 && <div style={{padding: "20px"}}>You don't have orders yet.</div>
            }
            {/* ordered items  */}
            <div>
              {
                orders?.map((eachOrder, i) => 
                  (
                    <div key={i}>
                      <hr />
                      <p> Order ID: {eachOrder?.id}</p>

                      {eachOrder?.data?.basket?.map((order) =>
                        (<ProductCard
                          flex={true}
                          product={order}
                          key={order.id}
                        />)
                      )
                      }
                    </div>
                  )
                )
              }
            </div>
          </div>
        </section>
      </LayOut>
    );
}

export default Orders

