import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Autocomplete } from '@material-ui/lab';
import { 
  Card,
  CardContent,
  CardActions,
  CircularProgress,
  TextField,
  Typography,
  Button
} from '@material-ui/core';

const useStyles = makeStyles({
  input: {
    width: 400,
    marginTop: 20,
  },
  controllers: {
    justifyContent: 'center',
    height: '50px'
  },
  button: {
    width: '80%'
  }
});

type MoneyTransferFormType = {
  users: Array<{id: number, name: string}>;
  isLoading: boolean;
  isLoadingTransaction: boolean;
  amountValue: number;
  recipient: string;
  onRecipientChange: (value:string) => void;
  onChangeAmount: (value:number) => void;
  onSubmit: () => void;
}

export function MoneyTransferForm({
  users,
  isLoading,
  isLoadingTransaction,
  amountValue,
  recipient,
  onRecipientChange,
  onChangeAmount,
  onSubmit
}: MoneyTransferFormType) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5">
          Transfer money
        </Typography>
        <Autocomplete
          className={classes.input}
          open={open}
          onOpen={() => {setOpen(true)}}
          onClose={() => {setOpen(false)}}
          getOptionSelected={(option, value) => option.name === value.name}
          getOptionLabel={(option) => option.name}
          onInputChange={(event, value)=> onRecipientChange(value)}
          options={users}
          loading={isLoading}
          renderInput={(params) => (
            <TextField
              {...params}
              value={recipient}
              onChange={(event)=>onRecipientChange(event.target.value)}
              label="Recipient"
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
        <TextField
          className={classes.input}
          value={String(Number(amountValue))}
          onChange={(event) => onChangeAmount(Number.parseFloat(event.target.value))}
          label="Amount"
          type="number"
          variant="outlined"
        />
      </CardContent>
      <CardActions className={classes.controllers}>
        <Button
          className={classes.button}
          disabled={isLoadingTransaction}
          variant="contained"
          color="primary"
          onClick={onSubmit}
        >
          {isLoadingTransaction ? <CircularProgress size={25}/> : "Transfer"}
        </Button>
      </CardActions>
    </Card>);
}