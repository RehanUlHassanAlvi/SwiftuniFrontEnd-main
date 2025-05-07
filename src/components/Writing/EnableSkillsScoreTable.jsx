import React from "react";
import styled from "styled-components";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  StyledTableHeaderText,
  StyledTableCellText,
  StyledTableCellText2,
  StyledTableCellText3,
} from "./style";
import InfoIcon from "../../assets/images/infoicon2.svg";
import { FlexDiv } from "../../assets/styles/style";

const StyledTableColumnsCell = styled(TableCell)({
  border: "1px solid rgba(0, 0, 0, 0.1)",
  "&.MuiTableCell-root": {
    textAlign: "left",
    borderLeft: "none",
    borderRight: "none",
  },
  "&:first-child": {
    borderLeft: "1px solid rgba(0, 0, 0, 0.1)",
  },
  "&:last-child": {
    borderRight: "1px solid rgba(0, 0, 0, 0.1)",
  },
});

const StyledTableRowsCell = styled(TableCell)({
  border: "1px solid rgba(0, 0, 0, 0.1)",
  "&.MuiTableCell-root": {
    textAlign: "left",
    padding: "16px",
  },
});

const StyledTableRow = styled(TableRow)`
  &:last-of-type ${StyledTableRowsCell} {
    // border-bottom: none;
  }
`;

const columns = [
  { name: "Component", width: "10%" },
  { name: "Score", width: "10%" },
  { name: "Suggestion", width: "80%" },
];

const renderSuggestion = (suggestion, isList) => {
  if (!isList) return suggestion;

  const lines = suggestion
    .split("\n")
    // .map((line, index) => <div key={index}>{line}</div>);
    // return <>{lines}</>;
    .map((line, index) => <li key={index}>{line}</li>);
  return (
    <ol style={{ margin: "0rem", padding: "0rem 0rem 0rem 1rem" }}>{lines}</ol>
  );
};

const CustomizedTable = ({ rows, column = columns, isList = false }) => {
  return (
    <TableContainer
      sx={{
        boxShadow: "none",
        width: "100%",
      }}
      component={Paper}
    >
      <Table
        aria-label="customized table"
        sx={
          {
            // width: "100%",
          }
        }
      >
        <TableHead>
          <TableRow>
            {column.map((column) => (
              <StyledTableColumnsCell
                key={column.name}
                sx={{
                  width: column.width,
                }}
              >
                <StyledTableHeaderText>{column.name}</StyledTableHeaderText>
              </StyledTableColumnsCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.component}>
              <StyledTableRowsCell>
                <FlexDiv
                  style={{
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                  }}
                >
                  <div style={{ marginRight: "5px" }}>
                    <StyledTableCellText>{row.component}</StyledTableCellText>
                  </div>
                  <div style={{ alignSelf: "right" }}>
                    <img
                      src={InfoIcon}
                      alt=""
                      style={{ width: "15px", height: "15px" }}
                    />
                  </div>
                </FlexDiv>
              </StyledTableRowsCell>
              <StyledTableRowsCell>
                <StyledTableCellText2>{row.score}</StyledTableCellText2>
              </StyledTableRowsCell>
              <StyledTableRowsCell>
                {/* <StyledTableCellText3>{row.suggestion}</StyledTableCellText3> */}
                <StyledTableCellText3>
                  {renderSuggestion(row.suggestion, isList)}
                </StyledTableCellText3>
              </StyledTableRowsCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomizedTable;
