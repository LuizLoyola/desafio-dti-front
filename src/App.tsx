import React, { ReactNode, useState } from "react";
import "./App.css";
import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import InputMask from "react-input-mask";
import axios from "axios";

type PersonType = "pf" | "pj";

function App() {
  const [type, setType] = useState("pf" as PersonType);
  const [document, setDocument] = useState("");
  const [name, setName] = useState("");
  const [currentDebt, setCurrentDebt] = useState("");
  const [requestedLoan, setRequestedLoan] = useState("");
  const [loading, setLoading] = useState(false);

  const handleType = (event: React.ChangeEvent<HTMLInputElement>) => {
    let t = event.target.value as PersonType;
    setType(t);
    setDocument("");
  };

  const handleDocument = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDocument(event.target.value.replace(/[^0-9]/g, ""));
  };

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleCurrentDebt = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentDebt(event.target.value);
  };

  const handleRequestedLoan = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRequestedLoan(event.target.value);
  };

  const triggerRequestLoan = () => {
    setLoading(true);
    axios
      .post("https://localhost:5001/api/loan", {
        type,
        document,
        name,
        currentDebt,
        requestedLoan,
      })
      .then((result) => {
        alert(result.data);
      })
      .catch(() => {
        alert("Erro ao enviar solicitação!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container>
      <h1>Desafio DTI</h1>
      <p>Digite os dados para a solicitação de empréstimo</p>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl>
            <FormLabel id="type-label">Tipo da pessoa</FormLabel>
            <RadioGroup
              row
              aria-labelledby="type-label"
              defaultValue="pf"
              name="type-group"
              value={type}
              onChange={handleType}
            >
              <FormControlLabel
                value="pf"
                control={<Radio />}
                label="Pessoa física"
              />
              <FormControlLabel
                value="pj"
                control={<Radio />}
                label="Pessoa jurídica"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth variant="standard">
            <InputLabel htmlFor="document">
              {type === "pf" ? "CPF" : "CNPJ"}
            </InputLabel>
            <InputMask
              id="document"
              mask={type === "pf" ? "999.999.999-99" : "99.999.999/9999-99"}
              value={document}
              onChange={handleDocument}
            >
              {
                ((inputProps: any) => {
                  return <Input {...inputProps} />;
                }) as unknown as ReactNode
              }
            </InputMask>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth variant="standard">
            <InputLabel htmlFor="name">
              {type === "pf" ? "Nome" : "Razão social"}
            </InputLabel>
            <Input id="name" value={name} onChange={handleName}></Input>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth variant="standard">
            <InputLabel htmlFor="current-debt">
              Valor do empréstimo solicitado
            </InputLabel>
            <Input
              id="current-debt"
              value={currentDebt}
              onChange={handleCurrentDebt}
              startAdornment={
                <InputAdornment position="start">R$</InputAdornment>
              }
            ></Input>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth variant="standard">
            <InputLabel htmlFor="requested-loan">
              Valor do empréstimo solicitado
            </InputLabel>
            <Input
              id="requested-loan"
              value={requestedLoan}
              onChange={handleRequestedLoan}
              startAdornment={
                <InputAdornment position="start">R$</InputAdornment>
              }
            ></Input>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth variant="contained" onClick={triggerRequestLoan}>
            Solicitar empréstimo
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
