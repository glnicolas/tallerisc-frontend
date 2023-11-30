import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";

const CustomersTable = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_API_URL + "/api/clientes"
        );
        const data = await response.json();

        console.log(data);

        setCustomers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Container style={{ marginTop: 30}}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido Paterno</th>
            <th>Apellido Materno</th>
            <th>Numero Telefono</th>
          </tr>
        </thead>
        <tbody>
          {customers.rows.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.nombre}</td>
              <td>{customer.apellidoPaterno}</td>
              <td>{customer.apellidoMaterno}</td>
              <td>{customer.numeroTelefono}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default CustomersTable;
