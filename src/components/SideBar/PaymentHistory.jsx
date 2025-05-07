import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import styled from "styled-components";
import {
  ColumnsText,
  PHBasicText,
  PHPaymentStatusText,
  StyledTableContainer,
  PHColumnsContainer,
  PHContentContainer,
} from "./style";
import { Base_URL } from "../../Client/apiURL";

const PaymentHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`${Base_URL}/app/users/user-transactions/`, {
          withCredentials: true,
        });
  
        if (response.data.responseCode === 200) {
          const transactionsData = response.data.response
          .filter(transaction => transaction?.SelfPaid === true) //#TODO: remove this filter after admins transactions data correction
            .map(transaction => {
              return {
                id: transaction.TransactionId,
                date: JSON.parse(transaction.ResponsePayload)?.TransactionDateTime || "N/A",
                items: transaction.SubscriptionName || "N/A",
                status: transaction.TransactionStatus || "N/A",
                amount: `${JSON.parse(transaction.Currency)  || ""} ${transaction.TransactionAmount || "N/A"}`,
              };
            })
            .sort((a, b) => new Date(b.date) - new Date(a.date));
  
          setTransactions(transactionsData);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchTransactions();
  }, []);
  
  return (
    <StyledTableContainer component={Paper}>
      <Table>
        <PHColumnsContainer>
          <TableRow>
            <TableCell>
              <ColumnsText>Transaction ID</ColumnsText>
            </TableCell>
            <TableCell>
              <ColumnsText>Transaction Date</ColumnsText>
            </TableCell>
            <TableCell>
              <ColumnsText>Items</ColumnsText>
            </TableCell>
            <TableCell>
              <ColumnsText>Payment Status</ColumnsText>
            </TableCell>
            <TableCell>
              <ColumnsText>Amount</ColumnsText>
            </TableCell>
          </TableRow>
        </PHColumnsContainer>

          {loading ? (
            <TableRow>
              <TableCell colSpan={5} align="center">
                <PHBasicText>Loading...</PHBasicText>
              </TableCell>
            </TableRow>
          ) : transactions.length > 0 ? (
            transactions.map((payment, index) => (
              <PHContentContainer key={index}>
                <TableCell>
                  <PHBasicText>{payment.id}</PHBasicText>
                </TableCell>
                <TableCell>
                  <PHBasicText>{payment.date}</PHBasicText>
                </TableCell>
                <TableCell>
                  <PHBasicText>{payment.items}</PHBasicText>
                </TableCell>
                <TableCell align="center">
                  <PHPaymentStatusText status={payment.status}>
                    {payment.status}
                  </PHPaymentStatusText>
                </TableCell>
                <TableCell align="center">
                  <PHBasicText>{payment.amount}</PHBasicText>
                </TableCell>
              </PHContentContainer>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                <PHBasicText>No transactions found</PHBasicText>
              </TableCell>
            </TableRow>
          )}
       
      </Table>
    </StyledTableContainer>
  );
};

export default PaymentHistory;