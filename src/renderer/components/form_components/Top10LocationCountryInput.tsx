import React, { useState } from "react";
import { isValueOrFILLMEIsValueMaker } from "../../use-form-context-auto-tt";
import { Top10LocationRegion } from "./Top10LocationInput";
import { DeselectableDropdown } from "../generic_components/DeselectableDropdown";

import { makeReadonlyArraySet, ValidValues } from "../../../shared/array-set";

const COUNTRY_LOCATION_FLAG_IDS_BY_NAME_NO_FILLME = {
  "Abkhazia": "AK",
  "Afghanistan": "AF",
  "Åland": "AX",
  "Albania": "AL",
  "Algeria": "DZ",
  "American Samoa": "AS",
  "Andorra": "AD",
  "Angola": "AO",
  "Anguilla": "AI",
  "Antarctica": "AQ",
  "Antigua and Barbuda": "AG",
  "Argentina": "AR",
  "Armenia": "AM",
  "Artsakh": "AH",
  "Aruba": "AW",
  "Australia": "AU",
  "Austria": "AT",
  "Azerbaijan": "AZ",
  "Bahamas": "BS",
  "Bahrain": "BH",
  "Bangladesh": "BD",
  "Barbados": "BB",
  "Belarus": "BY",
  "Belgium": "BE",
  "Belize": "BZ",
  "Benin": "BJ",
  "Bermuda": "BM",
  "Bhutan": "BT",
  "Bolivia": "BO",
  "Bosnia and Herzegovina": "BA",
  "Botswana": "BW",
  "Brazil": "BR",
  "British Antarctic Territory": "GB",
  "British Indian Ocean Territory": "IO",
  "British Virgin Islands": "VG",
  "Brunei": "BN",
  "Bulgaria": "BG",
  "Burkina Faso": "BF",
  "Burundi": "BI",
  "Cambodia": "KH",
  "Cameroon": "CM",
  "Canada": "CA",
  "Cape Verde": "CV",
  "Caribbean Netherlands": "NL",
  "Cayman Islands": "KY",
  "Central African Republic": "CF",
  "Chad": "TD",
  "Chile": "CL",
  "China": "CN",
  "Christmas Island": "CX",
  "Cocos (Keeling) Islands": "CC",
  "Colombia": "CO",
  "Comoros": "KM",
  "Cook Islands": "CK",
  "Costa Rica": "CR",
  "Croatia": "HR",
  "Cuba": "CU",
  "Cyprus": "CY",
  "Czechia": "CZ",
  "Côte d'Ivoire": "CI",
  "Democratic Republic of the Congo": "CD",
  "Denmark": "DK",
  "Djibouti": "DJ",
  "Dominica": "DM",
  "Dominican Republic": "DO",
  "Ecuador": "EC",
  "Egypt": "EG",
  "El Salvador": "SV",
  "Equatorial Guinea": "GQ",
  "Eritrea": "ER",
  "Estonia": "EE",
  "Eswatini": "SZ",
  "Ethiopia": "ET",
  "FalkLand Islands": "FK",
  "Faroe Islands": "FO",
  "Federated States of Micronesia": "FM",
  "Fiji": "FJ",
  "Finland": "FI",
  "France": "FR",
  "French Guiana": "GF",
  "French Polynesia": "PF",
  "French Southern and Antarctic Lands": "FR",
  "Gabon": "GA",
  "Georgia": "GE",
  "Germany": "DE",
  "Ghana": "GH",
  "Gibraltar": "GI",
  "Greece": "GR",
  "Greenland": "GL",
  "Grenada": "GD",
  "Guadeloupe": "GP",
  "Guam": "GU",
  "Guatemala": "GT",
  "Guernsey": "GG",
  "Guinea": "GN",
  "Guinea-Bissau": "GW",
  "Guyana": "GY",
  "Haiti": "HT",
  "Honduras": "HN",
  "Hong Kong": "HK",
  "Hungary": "HU",
  "Iceland": "IS",
  "India": "IN",
  "Indonesia": "ID",
  "Iran": "IR",
  "Iraq": "IQ",
  "Ireland": "IE",
  "Isle of Man": "IM",
  "Israel": "IL",
  "Italy": "IT",
  "Jamaica": "JM",
  "Japan": "JP",
  "Jersey": "JE",
  "Jordan": "JO",
  "Kazakhstan": "KZ",
  "Kenya": "KE",
  "Kiribati": "KI",
  "Kosovo": "XK",
  "Kuwait": "KW",
  "Kyrgyzstan": "KG",
  "Laos": "",
  "Latvia": "LV",
  "Lebanon": "LB",
  "Lesotho": "LS",
  "Liberia": "LR",
  "Libya": "LY",
  "Liechtenstein": "LI",
  "Lithuania": "LT",
  "Luxembourg": "LU",
  "Macao": "MO",
  "Madagascar": "MG",
  "Malawi": "MW",
  "Malaysia": "MY",
  "Maldives": "MV",
  "Mali": "ML",
  "Malta": "MT",
  "Marshall Islands": "MH",
  "Martinique": "MQ",
  "Mauritania": "MR",
  "Mauritius": "MU",
  "Mayotte": "YT",
  "Mexico": "MX",
  "Moldova": "MD",
  "Monaco": "MC",
  "Mongolia": "MN",
  "Montenegro": "ME",
  "Montserrat": "MS",
  "Morocco": "MA",
  "Mozambique": "MZ",
  "Myanmar": "MM",
  "NO FLAG": "",
  "Namibia": "",
  "Nauru": "NR",
  "Nepal": "NP",
  "Netherlands": "NL",
  "Netherlands Antilles": "AN",
  "New Caledonia": "NC",
  "New Zealand": "NZ",
  "Nicaragua": "NI",
  "Niger": "NE",
  "Nigeria": "NG",
  "Niue": "NU",
  "Norfolk Island": "NF",
  "North Korea": "KP",
  "North Macedonia": "MK",
  "Northern Cyprus": "NY",
  "Northern Mariana Islands": "MP",
  "Norway": "NO",
  "Oman": "OM",
  "Pakistan": "PK",
  "Palau": "PW",
  "Palestine": "PS",
  "Panama": "PA",
  "Papua New Guinea": "PG",
  "Paraguay": "PY",
  "Peru": "PE",
  "Philippines": "PH",
  "Pitcairn Islands": "PN",
  "Poland": "PL",
  "Portugal": "PT",
  "Puerto Rico": "PR",
  "Qatar": "QA",
  "Republic of the Congo": "CG",
  "Romania": "RO",
  "Russia": "RU",
  "Rwanda": "RW",
  "Réunion": "RE",
  "Sahrawi Arab Democratic Republic": "EH",
  "Samoa": "WS",
  "San Marino": "SM",
  "Saudi Arabia": "SA",
  "Scotland": "GB",
  "Senegal": "SN",
  "Serbia": "RS",
  "Seychelles": "SC",
  "Sierra Leone": "SL",
  "Singapore": "SG",
  "Sint Maarten": "SX",
  "Slovakia": "SK",
  "Slovenia": "SI",
  "Solomon Islands": "SB",
  "Somalia": "SO",
  "South Africa": "ZA",
  "South Georgia and the South Sandwich Islands": "GS",
  "South Korea": "KR",
  "South Ossetia": "",
  "South Sudan": "SS",
  "Spain": "ES",
  "Sri Lanka": "LK",
  "St. Barthélemy": "BL",
  "St. Helena, Ascension and Tristan da Cunha": "SH",
  "St. Kitts and Nevis": "KN",
  "St. Lucia": "LC",
  "St. Martin": "MF",
  "St. Pierre and Miquelon": "PM",
  "St. Vincent and Grenadines": "VC",
  "Sudan": "SD",
  "Suriname": "SR",
  "Sweden": "SE",
  "Switzerland": "CH",
  "Syria": "SY",
  "São Tomé and Príncipe": "ST",
  "Taiwan": "TW",
  "Tajikistan": "TJ",
  "Tanzania": "TZ",
  "Thailand": "TH",
  "The Gambia": "GM",
  "Timor-Leste": "TL",
  "Togo": "TG",
  "Tokelau": "TK",
  "Tonga": "TO",
  "Transnistria": "",
  "Trinidad and Tobago": "TT",
  "Tunisia": "TN",
  "Turkey": "TR",
  "Turkmenistan": "TM",
  "Turks and Caicos Islands": "TC",
  "Tuvalu": "TV",
  "U.S. Virgin Islands": "VI",
  "USA": "US",
  "Uganda": "UG",
  "Ukraine": "UA",
  "United Arab Emirates": "AE",
  "United Kingdom": "GB",
  "Uruguay": "UY",
  "Uzbekistan": "UZ",
  "Vanuatu": "VU",
  "Vatican City": "VS",
  "Venezuela": "VE",
  "Vietnam": "VN",
  "Wales": "GB",
  "Wallis and Futuna": "WF",
  "Yemen": "YE",
  "Zambia": "ZM",
  "Zimbabwe": "ZW"
} as const;

const COUNTRY_LOCATION_FLAG_IDS_BY_NAME = {
  ...COUNTRY_LOCATION_FLAG_IDS_BY_NAME_NO_FILLME,
  "<FILLME>": "<FILLME>"
} as const;

type ReverseMap<T extends Record<keyof T, T[keyof T]>> = {
  [P in T[keyof T]]: {
    [K in keyof T]: T[K] extends P ? K : never
  }[keyof T]
}

export const COUNTRY_LOCATION_NAMES_BY_FLAG_ID: ReverseMap<typeof COUNTRY_LOCATION_FLAG_IDS_BY_NAME> = (
  Object.fromEntries(
    Object.entries(COUNTRY_LOCATION_FLAG_IDS_BY_NAME).map(
      ([countryName, flagId]) => ([flagId, countryName])
    )
  ) as ReverseMap<typeof COUNTRY_LOCATION_FLAG_IDS_BY_NAME>
);

export const COUNTRY_LOCATIONS = makeReadonlyArraySet(Object.keys(COUNTRY_LOCATION_FLAG_IDS_BY_NAME) as (keyof typeof COUNTRY_LOCATION_FLAG_IDS_BY_NAME)[]);
export const COUNTRY_FLAG_IDS = makeReadonlyArraySet(Object.keys(COUNTRY_LOCATION_NAMES_BY_FLAG_ID) as (keyof typeof COUNTRY_LOCATION_NAMES_BY_FLAG_ID)[]);

const COUNTRY_LOCATIONS_NO_FILLME = Object.keys(COUNTRY_LOCATION_FLAG_IDS_BY_NAME_NO_FILLME);

export type Top10LocationCountry = ValidValues<typeof COUNTRY_LOCATIONS>;
export type Top10LocationCountryFlagId = ValidValues<typeof COUNTRY_FLAG_IDS>;

export function Top10LocationCountryInput(props: {top10LocationRegion: Top10LocationRegion}) {
  const isValueOrFILLMEIsValue = isValueOrFILLMEIsValueMaker();

  return (
    <div className="grid-contents">
      <label className="start-label" htmlFor="top-10-location-country-location">Country Location: </label>
      <div className="start-label-contents">
        <DeselectableDropdown name="top-10-location-country-location" nameAsId={true} errorBelow={true}>
          {COUNTRY_LOCATIONS_NO_FILLME.map((countryLocation) => (
            <option value={countryLocation} key={countryLocation}>{countryLocation}</option>
          ))}
        </DeselectableDropdown>
      </div>
    </div>
  );
}
