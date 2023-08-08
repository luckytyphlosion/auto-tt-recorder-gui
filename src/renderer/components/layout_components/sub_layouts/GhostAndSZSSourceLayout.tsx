import React from "react";

import { MainGhostSourceInput } from "../../form_components/MainGhostSourceInput";
import { ComparisonGhostSourceInput } from "../../form_components/ComparisonGhostSourceInput";
import { SZSSourceInput } from "../../form_components/SZSSourceInput";
import { FieldsetOr } from "../../FieldsetOr";

export function GhostAndSZSSourceLayout() {
  return (
    <>
      <FieldsetOr>
        <legend>Ghosts and Track SZS</legend>
        <MainGhostSourceInput/>
        <ComparisonGhostSourceInput/>
        <br/>
        <SZSSourceInput/>
      </FieldsetOr>
    </>
  );
}