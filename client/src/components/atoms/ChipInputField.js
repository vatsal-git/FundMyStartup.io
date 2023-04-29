import React from "react";
import { TextField, Chip } from "@mui/material";
import { Autocomplete } from "@mui/material";

const ChipInputField = ({
  required,
  label,
  name,
  value,
  onChange,
  onDelete,
}) => {
  return (
    <Autocomplete
      multiple
      id={label}
      options={[]}
      freeSolo
      defaultValue={value.map((option) => option)}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            key={index}
            label={option}
            onDelete={() => onDelete(index)}
            {...getTagProps({ index })}
          />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          margin="dense"
          id={name}
          name={name}
          label={label}
          fullWidth
          required={required}
          value={value}
          onChange={onChange}
        />
      )}
    />
  );
};

export default ChipInputField;
