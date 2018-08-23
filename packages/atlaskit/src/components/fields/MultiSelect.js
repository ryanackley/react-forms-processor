// // @flow
// import React from "react";
// import MultiSelect from "@atlaskit/multi-select";
// import { FieldWrapper } from "react-forms-processor";
// import type { Field, FieldDef } from "../../../../../types";
// import { Field as AkField } from "@atlaskit/form";

// class AtlaskitMultiSelect extends React.Component<Field> {
//   render() {
//     const {
//       description,
//       disabled,
//       id,
//       errorMessages,
//       isValid,
//       name,
//       options = [],
//       placeholder,
//       required,
//       value,
//       label,
//       onFieldChange
//     } = this.props;
//     const defaultSelectItems = [];
//     const stringValue: string | void = value ? value.toString() : undefined;
//     const items = options.map(option => ({
//       heading: option.heading,
//       items: option.items.map(item => {
//         if (typeof item === "string") {
//           let isSelected = false;
//           if (value && Array.isArray(value) && value.includes(item)) {
//             isSelected = true;
//           }
//           const _item = {
//             content: item,
//             value: item,
//             isSelected
//           };
//           if (_item.isSelected) {
//             defaultSelectItems.push(_item);
//           }
//           return _item;
//         } else {
//           let isSelected = false;
//           if (value && Array.isArray(value) && value.includes(item.value)) {
//             isSelected = true;
//           }
//           const _item = {
//             content: item.label || item.value,
//             value: item.value,
//             isSelected
//           };
//           if (_item.isSelected) {
//             defaultSelectItems.push(_item);
//           }
//           return _item;
//         }
//       })
//     }));

//     return (
//       <AkField
//         label={label}
//         helperText={description}
//         required={required}
//         isInvalid={!isValid}
//         invalidMessage={errorMessages}
//       >
//         <MultiSelect
//           name={name}
//           defaultSelected={defaultSelectItems}
//           placeholder={placeholder}
//           disabled={disabled}
//           value={stringValue}
//           items={items}
//           onSelectedChange={evt => {
//             onFieldChange(id, evt.items.map(item => item.value));
//           }}
//         />
//       </AkField>
//     );
//   }
// }

// export default (props: FieldDef) => (
//   <FieldWrapper {...props}>
//     {/* $FlowFixMe */}
//     <AtlaskitMultiSelect />
//   </FieldWrapper>
// );

// @flow
import React from "react";
import Select from "@atlaskit/select";
import { FieldWrapper } from "react-forms-processor";
import type { Field, FieldDef } from "../../../../../types";
import { Field as AkField } from "@atlaskit/form";

class AtlaskitSelect extends React.Component<Field> {
  render() {
    const {
      description,
      disabled,
      errorMessages,
      id,
      isValid,
      name,
      options = [],
      placeholder,
      required,
      value,
      label,
      onFieldChange
    } = this.props;
    const defaultValue = [];
    const stringValue: string | void = value ? value.toString() : undefined;
    const items = options.map(option => {
      const { heading, items = [] } = option;
      return {
        label: heading,
        options: items.map(item => {
          if (typeof item === "string") {
            let isSelected = false;
            if (value && Array.isArray(value) && value.includes(item)) {
              isSelected = true;
            }
            const _item = {
              label: item,
              value: item
            };
            if (isSelected) {
              defaultValue.push(_item);
            }
            return _item;
          } else {
            let isSelected = false;
            if (value && Array.isArray(value) && value.includes(item.value)) {
              isSelected = true;
            }
            const _item = {
              label: item.label || item.value,
              value: item.value
            };
            if (isSelected) {
              defaultValue.push(_item);
            }
            return _item;
          }
        })
      };
    });

    return (
      <AkField
        label={label}
        helperText={description}
        required={required}
        isInvalid={!isValid}
        invalidMessage={errorMessages}
      >
        <Select
          isMulti={true}
          isSearchable={false}
          name={name}
          defaultValue={defaultValue}
          placeholder={placeholder}
          disabled={disabled}
          options={items}
          onChange={value => {
            onFieldChange(id, value.map(item => item.value));
          }}
        />
      </AkField>
    );
  }
}

export default (props: FieldDef) => (
  <FieldWrapper {...props}>
    {/* $FlowFixMe */}
    <AtlaskitSelect />
  </FieldWrapper>
);
