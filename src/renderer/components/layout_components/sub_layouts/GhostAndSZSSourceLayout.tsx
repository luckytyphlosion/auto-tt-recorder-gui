import React from "react";

import { MainGhostSourceInput } from "../../form_components/MainGhostSourceInput";
import { ComparisonGhostSourceInput } from "../../form_components/ComparisonGhostSourceInput";
import { SZSSourceInput } from "../../form_components/SZSSourceInput";
import { EmptyGridRow } from "../../EmptyGridRow";

import { FieldsetOr } from "../../FieldsetOr";

export function GhostAndSZSSourceLayout() {
  return (
    <div>
      <FieldsetOr>
        <legend>Ghosts and Track SZS</legend>
        <div className="like-input-group">
          <MainGhostSourceInput/>
          <ComparisonGhostSourceInput/>
          <EmptyGridRow/>
          <SZSSourceInput/>
        </div>
      </FieldsetOr>
    </div>
  );
}