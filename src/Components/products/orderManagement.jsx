import MaterialTable from "material-table";
import axios from "axios";
import React, { useState, useEffect } from "react";

const OrderManagement = () => {
  const [prodList, setProdList] = useState([]);
  const [columns, setColumns] = useState([
    //{ title: "Product Image", field: "imageUrl" },
    { title: "Product Name", field: "productName" },
    { title: "Product code", field: "productCode" },
    { title: "RRP Price", field: "priceRrp" },
    { title: "Shopify Price", field: "priceShopify" },
    { title: "Agent Price", field: "agentPrice" },
    { title: "1212 Price", field: "price1212" },
    { title: "Special Price", field: "priceSpecial" },
    //{ title: "Description", field: "description" },
    { title: "Weight", field: "weight" },
    { title: "Package Qty", field: "packageQty" },
    // { title: "Product ID", field: "productId" },
  ]);

  useEffect(() => {
    axios
      .get("http://206.189.39.185:5031/api/Product")
      .then((response) => {
        setProdList(response.data.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleAdd = (newData) => {
    console.log(newData);
    axios
      .post(
        "http://206.189.39.185:5031/api/Product/ProductCreate",
        changeType(newData)
      )
      .then((response) => {
        setProdList([...prodList, newData]);
        alert("Add Successfully");
        return response;
      })
      .catch((error) => {
        console.log(error);
        alert("Unsuccessfully");
        return error;
      });
  };

  const handleUpdate = (newdata) => {
    let newnewData = changeType(newdata)
    let putpromise = axios.put('http://206.189.39.185:5031/api/Product/ProductUpdate',newnewData)
    console.log(putpromise)
    return putpromise
  }

  const handleDelete = (oldData) => {
    const filteredData = prodList.filter(
      (element) => element.productId !== oldData.productId
    );
    console.log(oldData);
    // const deletInfo = window.confirm(`Delete ${oldData.productName}?`);
    // if (deletInfo) {
      axios
        .delete("http://206.189.39.185:5031/api/Product/" + oldData.productId)
        .then((response) => {
          console.log(response);
          setProdList(filteredData);
        });
    // }
  };

  const changeType = (newdata) => {
    newdata.price = parseInt(newdata.price);
    newdata.priceRrp = parseInt(newdata.priceRrp);
    newdata.priceShopify = parseInt(newdata.priceShopify);
    newdata.priceAgent = parseInt(newdata.priceAgent);
    newdata.price1212 = parseInt(newdata.price1212);
    newdata.priceSpecial = parseInt(newdata.priceSpecial);
    newdata.weight = parseInt(newdata.weight);
    newdata.packageQty = parseInt(newdata.packageQty);
    return newdata;
  };

  /*const fileteredData = (olddata) => {
    olddata.price = parseInt(olddata.price);
    olddata.priceRrp = parseInt(olddata.priceRrp);
    olddata.priceShopify = parseInt(olddata.priceShopify);
    olddata.priceAgent = parseInt(olddata.priceAgent);
    olddata.price1212 = parseInt(olddata.price1212);
    olddata.priceSpecial = parseInt(olddata.priceSpecial);
    olddata.weight = parseInt(olddata.weight);
    olddata.packageQty = parseInt(olddata.packageQty);
    return olddata;
  }*/

  return (
    <MaterialTable
      title="Product Preview"
      columns={columns}
      data={prodList}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              handleAdd(newData);
              resolve();
            }, 1000);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              const dataUpdate = [...prodList];
              const index = oldData.tableData.id;
              dataUpdate[index] = newData;
              handleUpdate(newData);
              setProdList(dataUpdate);
              resolve(0);
            }, 3000);
          }),
        // onRowDelete: (oldData) =>
          // new Promise((resolve, reject) => {
          //   setTimeout(() => {
              // {handleDelete(oldData);}
              // resolve();
          //   }, 1000);
          // }),
      }}
      actions = {
        [
          {
            icon: 'delete',
            onClick: (event, rowData) => handleDelete(rowData)
          }
        ]
      }
    />
  );
};

export default OrderManagement;
