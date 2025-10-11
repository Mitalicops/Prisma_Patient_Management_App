import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Control } from "react-hook-form";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { E164Number } from "libphonenumber-js/core";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { FormFieldType } from "@/constants";
import { FaCalendarAlt } from "react-icons/fa";

interface CustomProps {
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: JSX.Element;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  switch (props.fieldType) {
    case FormFieldType.NUMBER:
      return (
        <div className="flex rounded-md border items-center border-dark-500 bg-dark-400">
          {props.iconSrc && <span className="ml-2 text-[23px]">{props.iconSrc}</span>}

          <FormControl>
            <Input
              placeholder={props.placeholder}
              {...field}
              type="number"
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );

    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border items-center border-dark-500 bg-dark-400">
          {props.iconSrc && <span className="ml-2 text-[23px]">{props.iconSrc}</span>}

          <FormControl>
            <Input
              placeholder={props.placeholder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );

    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={props.placeholder}
            {...field}
            className="shad-textArea"
            disabled={props.disabled}
          />
        </FormControl>
      );

    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="US"
            placeholder={props.placeholder}
            {...field}
            international
            withCountryCallingCode
            value={(field.value as E164Number) || undefined}
            className="input-phone"
            onChange={field.onChange}
          />
        </FormControl>
      );

    case FormFieldType.DATE_PICKER:
      return (
        <div className="flex rounded-md border items-center border-dark-500 bg-dark-400">
          <FaCalendarAlt className="ml-2 text-[23px]"/>
          <FormControl>
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              dateFormat={props.dateFormat ?? "MM/dd/yyyy"}
              showTimeSelect={props.showTimeSelect ?? false}
              timeInputLabel="Time:"
              wrapperClassName="date-picker"
            />
          </FormControl>
        </div>
      );

    case FormFieldType.SELECT:
      return (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger className="shad-select-trigger">
              <SelectValue placeholder={props.placeholder} />
            </SelectTrigger>
          </FormControl>
          <SelectContent className="shad-select-content">
            {props.children}
          </SelectContent>
        </Select>
      );

    case FormFieldType.CHECKBOX:
      return (
        <div className="flex items-center gap-4">
          <Checkbox
            id={props.name}
            checked={field.value}
            onCheckedChange={field.onChange}
          />
          <label htmlFor={props.name} className="checkbox-label">
            {props.label}
          </label>
        </div>
      );

    case FormFieldType.SKELETON:
      return props.renderSkeleton ? props.renderSkeleton(field) : null;

    case FormFieldType.PASSWORD:
      return (
        <div className="flex rounded-md border items-center border-dark-500 bg-dark-400">
          {props.iconSrc && <span className="ml-2 text-[23px]">{props.iconSrc}</span>}

          <FormControl>
            <Input
              type="password"
              placeholder={props.placeholder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );
    default:
      return null;
  }
};

const CustomForm = (props: CustomProps) => {
  const { control, name, label } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {props.fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel className="shad-input-label">{label}</FormLabel>
          )}

          <RenderField field={field} props={props} />

          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomForm;
