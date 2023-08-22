import React, { useRef, useEffect } from "react";
import { useFormContextAutoTT, isValueOrFILLMEIsValueMaker } from "../use-form-context-auto-tt";
import { ErrorMessage } from "@hookform/error-message";
import { ErrorMessage2 } from "./ErrorMessage2";

import { AutoTTRecConfigFormFieldName, AutoTTRecConfigFormChoiceArgName, AutoTTRecConfigFormChoiceArgs, AutoTTRecConfigFormStringArgName } from "../auto-tt-rec-form-field-types";

const deepDiffMapper: any = function () {
  return {
    VALUE_CREATED: 'created',
    VALUE_UPDATED: 'updated',
    VALUE_DELETED: 'deleted',
    VALUE_UNCHANGED: 'unchanged',
    map: function(obj1: any, obj2: any) {
      if (this.isFunction(obj1) || this.isFunction(obj2)) {
        throw 'Invalid argument. Function given, object expected.';
      }
      if (this.isValue(obj1) || this.isValue(obj2)) {
        let diffType = this.compareValues(obj1, obj2);
        if (diffType !== this.VALUE_UNCHANGED) {
          return {
            type: diffType,
            data: obj1 === undefined ? obj2 : obj1
          };
        } else {
          return {};
        }
      }

      var diff: any = {};
      for (var key in obj1) {
        if (this.isFunction(obj1[key])) {
          continue;
        }

        var value2 = undefined;
        if (obj2[key] !== undefined) {
          value2 = obj2[key];
        }

        let mapResult = this.map(obj1[key], value2);
        if (Object.keys(mapResult).length !== 0) {          
          diff[key] = mapResult;
        }
      }
      for (var key in obj2) {
        if (this.isFunction(obj2[key]) || diff[key] !== undefined) {
          continue;
        }

        let mapResult = this.map(undefined, obj2[key]);
        if (Object.keys(mapResult).length !== 0) {          
          diff[key] = mapResult;
        }
      }

      return diff;

    },
    compareValues: function (value1: any, value2: any) {
      if (value1 === value2) {
        return this.VALUE_UNCHANGED;
      }
      if (this.isDate(value1) && this.isDate(value2) && value1.getTime() === value2.getTime()) {
        return this.VALUE_UNCHANGED;
      }
      if (value1 === undefined) {
        return this.VALUE_CREATED;
      }
      if (value2 === undefined) {
        return this.VALUE_DELETED;
      }
      return this.VALUE_UPDATED;
    },
    isFunction: function (x: any) {
      return Object.prototype.toString.call(x) === '[object Function]';
    },
    isArray: function (x: any) {
      return Object.prototype.toString.call(x) === '[object Array]';
    },
    isDate: function (x: any) {
      return Object.prototype.toString.call(x) === '[object Date]';
    },
    isObject: function (x: any) {
      return Object.prototype.toString.call(x) === '[object Object]';
    },
    isValue: function (x: any) {
      return !this.isObject(x) && !this.isArray(x);
    }
  }
}();

export function SimpleErrorMessage(props: {name: AutoTTRecConfigFormFieldName}) {
  const formContext = useFormContextAutoTT();
  const formState = formContext.formState;

  const simpleErrorMessageFormContextRef = useRef(formContext);
  const counterRef = useRef(0);
  counterRef.current = counterRef.current + 1;
  console.log(`SimpleErrorMessage ${props.name} ${counterRef.current}: `, formState.errors[props.name]?.message);

  /*useEffect(() => {
    console.log(`SimpleErrorMessage formContext diff ${counterRef.current}:`, deepDiffMapper.map(simpleErrorMessageFormContextRef.current, formState));
    simpleErrorMessageFormContextRef.current = formContext;
  }, [formContext]);*/

  return (<ErrorMessage2
    errors={formState.errors}
    name={props.name}
    render={({ message }) => <p style={{display: "inline", backgroundColor: "yellow"}}>{message}</p>}
  />);
}

// names first take higher priority
export function DoubleErrorMessage<K extends AutoTTRecConfigFormChoiceArgName, V extends AutoTTRecConfigFormChoiceArgs[K]>(props: {enablerName: K, enablerEnabledValue: V, textName: AutoTTRecConfigFormStringArgName}) {
  const {formState, getValues} = useFormContextAutoTT();
  let enablerValue = getValues(props.enablerName);
  console.log(`DoubleErrorMessage ${props.enablerName} value:`, enablerValue);
  if (enablerValue === "<FILLME>" || enablerValue !== props.enablerEnabledValue) {
    return <SimpleErrorMessage name={props.enablerName}/>;
  } else {
    return <SimpleErrorMessage name={props.textName}/>;
  }
}