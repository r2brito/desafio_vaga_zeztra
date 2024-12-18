/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Pagination,
  Typography
} from "@mui/material";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import api from "../service/api";
import Layout from "@/components/layout";

export default function Transactions() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [nome, setNome] = useState<string>("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const fetchTransactions = async () => {
    try {
      const params: any = {
        page,
        limit: 10
      };

      if (nome) {
        params.nome = nome;
      }

      if (startDate) {
        params.startDate = dayjs(startDate).format("YYYY-MM-DD");
      }

      if (endDate) {
        params.endDate = dayjs(endDate).format("YYYY-MM-DD");
      }

      console.log("params: " + params);

      const res = await api.get("/transactions", { params });
      setTransactions(res.data.transactions);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [page, nome, startDate, endDate]);

  return (
    <Layout>
      <Box>
        <Box sx={{ p: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              mb: 3,
              flexWrap: "wrap"
            }}
          >
            <TextField
              label="Nome do Cliente"
              variant="outlined"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <DatePicker
              label="Data Inicial"
              value={startDate}
              // @ts-ignore
              onChange={(newValue) => setStartDate(newValue)}
              // @ts-ignore
              renderInput={(params) => <TextField {...params} />}
            />
            <DatePicker
              label="Data Final"
              value={endDate}
              // @ts-ignore
              onChange={(newValue) => setEndDate(newValue)}
              // @ts-ignore
              renderInput={(params) => <TextField {...params} />}
            />
            <Button
              variant="contained"
              onClick={() => setPage(1)}
            >
              Filtrar
            </Button>
            <Button
              variant="text"
              onClick={() => {
                setNome("");
                setStartDate(null);
                setEndDate(null);
                setPage(1);
              }}
            >
              Limpar Filtros
            </Button>
          </Box>
        </Box>

        <Box sx={{ p: 3 }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Nome</TableCell>
                  <TableCell>CPF/CNPJ</TableCell>
                  <TableCell>Data</TableCell>
                  <TableCell>Valor</TableCell>
                  <TableCell>ID Transação</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.length > 0 ? (
                  transactions?.map((transaction, index) => (
                    <TableRow key={transaction._id}>
                      <TableCell>{index + 1 + (page - 1) * 10}</TableCell>
                      <TableCell>{transaction.clientId.nome}</TableCell>
                      <TableCell>{transaction.clientId.cpfCnpj}</TableCell>
                      <TableCell>
                        {dayjs(transaction.data).format("DD/MM/YYYY")}
                      </TableCell>
                      <TableCell>{transaction.valor}</TableCell>
                      <TableCell>{transaction.transactionId}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      align="center"
                    >
                      <Typography
                        variant="body1"
                        color="textSecondary"
                      >
                        Nenhuma transação encontrada.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(event, value) => {
              setPage(value);
            }}
            color="primary"
          />
        </Box>
      </Box>
    </Layout>
  );
}
