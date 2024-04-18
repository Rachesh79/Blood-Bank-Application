import React, { useEffect, useState } from 'react'
import Layout from '../../components/shared/Layout/Layout'
import moment from 'moment';

import API from '../../services/API';

const Organization = () => {
  const [data, setData] = useState([]);
  // find Org records
  const getOrg = async () => {
    try {
      const { data } = await API.get("/inventory/get-organizations");
      // console.log(data);
      if (data?.success) {
        setData(data?.organizations);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrg();
  }, []);
  return (
    <Layout>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Address</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((record) => (
            <tr key={record._id}>
              <td>{record.organizationName}</td>
              <td>{record.email}</td>
              <td>{record.phone}</td>
              <td>{record.address}</td>
              <td>{moment(record.createdAt).format("DD/MM/YYYY")}</td>
              <td>{moment(record.createdAt).format("hh:mm:ss A")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}

export default Organization