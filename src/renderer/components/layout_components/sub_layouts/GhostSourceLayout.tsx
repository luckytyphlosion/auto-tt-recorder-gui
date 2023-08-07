import React from "react";

import { MainGhostSourceInput } from "../../form_components/MainGhostSourceInput";
import { ComparisonGhostSourceInput } from "../../form_components/ComparisonGhostSourceInput";

export function GhostSourceLayout() {
  return (
    <section>
      <h3>Ghost sources</h3>
      <MainGhostSourceInput/>
      <ComparisonGhostSourceInput/>
    </section>
  );
}