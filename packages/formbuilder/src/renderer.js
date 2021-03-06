// @flow
import React from "react";
import akRenderer from "../../atlaskit/src/renderer";
import FieldDefinitionField from "./FieldDefinitionField";
import type {
  FieldRenderer,
  FieldDef,
  OnFieldChange
} from "react-forms-processor";
import RepeatingFormField from "./Repeats";

const renderer: FieldRenderer = (field, onChange, onFieldFocus) => {
  const { defaultValue = [], id, label, type, misc = {} } = field;
  switch (type) {
    case "field":
      return <FieldDefinitionField key={id} {...field} />;

    case "repeating":
      const fields: FieldDef[] = misc.fields || [];
      const addButtonLabel: string = misc.addButtonLabel;
      const unidentifiedLabel: string = misc.unidentifiedLabel;
      const noItemsMessage: string = misc.noItemsMessage;
      const idAttribute: string = misc.idAttribute;
      return (
        <RepeatingFormField
          key={id}
          addButtonLabel={addButtonLabel}
          defaultValue={defaultValue}
          label={label}
          onChange={value => onChange(id, value)}
          fields={fields}
          unidentifiedLabel={unidentifiedLabel}
          noItemsMessage={noItemsMessage}
          idAttribute={idAttribute}
        />
      );

    default:
      return akRenderer(field, onChange, onFieldFocus);
  }
};

export default renderer;
