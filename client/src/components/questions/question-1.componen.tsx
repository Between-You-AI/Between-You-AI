import React, {FC, useState} from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

interface QuestionTaskProps {
  onNext: (amount: number) => {};
}

const QuestionTask2: FC<QuestionTaskProps> = ({onNext}) => {
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState("");

  const handleNext = () => {
    if (amount < 1) {
      setError("The amount must be at least 1.");
    } else {
      setError("");
      onNext(amount);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h6" gutterBottom>
        Please enter the amount you are planning to invest in Apple.
      </Typography>
      <TextField
        fullWidth
        label="Investment Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(parseFloat(e.target.value))}
        error={!!error}
        helperText={error}
        required
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleNext}>
        Next
      </Button>
    </Container>
  );
};

export default QuestionTask2;
