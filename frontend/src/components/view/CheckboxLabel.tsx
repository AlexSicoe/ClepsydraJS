import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import React from 'react';


function CheckboxLabel({ label, checked, onChange }: any) {
  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={() => onChange()}
            value="checked"
            color="secondary"
          />
        }
        label={label}
      />
    </FormGroup>
  );
}

export default CheckboxLabel;