import React, { forwardRef } from 'react';
import MaterialTable from 'material-table';
import { Button } from '@material-ui/core';
import {
  Clear,
  ChevronRight,
  FirstPage,
  LastPage,
  ChevronLeft,
  Search,
  ArrowDownward,
  Refresh
} from '@material-ui/icons';
import { TransactionType } from '../types';

type TransactionsTable = {
  transactions: Array<TransactionType>;
  isBlockRepeat: boolean;
  onRepeat: (transaction: TransactionType) => void;
}

export function TransactionsTable({transactions, isBlockRepeat, onRepeat}: TransactionsTable) {
  const tableIcons = {
    Clear: forwardRef<SVGSVGElement>((props, ref) => <Clear {...props} ref={ref} />),
    DetailPanel: forwardRef<SVGSVGElement>((props, ref) => <ChevronRight {...props} ref={ref} />),
    FirstPage: forwardRef<SVGSVGElement>((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef<SVGSVGElement>((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef<SVGSVGElement>((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef<SVGSVGElement>((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef<SVGSVGElement>((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef<SVGSVGElement>((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef<SVGSVGElement>((props, ref) => <ArrowDownward {...props} ref={ref} />),
  };

  const columns = [
    {title: "Id", field: "id"},
    {title: "Date", field: "date"},
    {title: "Time", field: "time"},
    {title: "User", field: "username"},
    {title: "Amount", field: "amount"},
    {title: "Balance", field: "balance"},
    {title: "Repeat", render: (row: TransactionType) => 
    <Button 
      variant="contained"
      disabled={isBlockRepeat}
      onClick={() => onRepeat(row)}>
      <Refresh />
    </Button>
    }
  ]
  return (
    <MaterialTable
      title="User transactions"
      icons={tableIcons}
      columns={columns}
      data={transactions}
    />
  );
}
