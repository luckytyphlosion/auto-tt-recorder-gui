import React from "react";
import { TextInput } from "../TextInput";

export function Top10ChadsoftInput() {
  return (
    <TextInput name="top-10-chadsoft" startLabel="Chadsoft leaderboard link: " pattern={{
        value: /^https:\/\/(?:www\.)?chadsoft\.co\.uk\/time-trials\/leaderboard\/[0-1][0-9A-Fa-f]\/[0-9A-Fa-f]{40}\/(?:00|01|02|03|04|05|06)\.html(?:#.*)?$/,
        message: "Must be a valid chadsoft leaderboard link."
      }}
    />
  );
}
