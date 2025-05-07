import React from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import dayjs from "dayjs";

export default function CustomIconDatePicker({ value, onChange, label }) {
  const tomorrow = dayjs().add(1, "day").startOf("day");
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={value}
        minDate={tomorrow}
        onChange={onChange}
        renderInput={(params) => (
          <TextField
            {...params}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <IconButton onClick={params.inputProps.onClick} edge="end">
                  <CalendarTodayIcon />
                </IconButton>
              ),
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
}
