export interface Timezone {
  short: string;
  long: string;
  offset: string;
}

/**
 * DateTime Regular Expression
 */
const DATE_TIME_FORMAT_RE =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,6})?(?<timezone>(?:Z|(?:[-\+]\d{2}:\d{2})))?$/;

/**
 * Pads the current number with a given string (possibly repeated) so that the resulting string reaches a given length.
 * The padding is applied from the end (right) of the current string.
 *
 * @param maxLength The length of the resulting string once the current string has been padded.
 *        If this parameter is smaller than the current string's length, the current string will be returned as it is.
 *
 * @param fillString The string to pad the current string with.
 *        If this string is too long, it will be truncated and the left-most part will be applied.
 *        The default value for this parameter is " " (U+0020).
 */
function padEnd(maxLength: number = 2, fillString: string = "0"): string {
  // @ts-ignore
  const stringifiedNumber: string = this.toString();
  return stringifiedNumber.padEnd(maxLength, fillString);
}

/**
 * Pads the current number with a given string (possibly repeated) so that the resulting string reaches a given length.
 * The padding is applied from the start (left) of the current string.
 *
 * @param maxLength The length of the resulting string once the current string has been padded.
 *        If this parameter is smaller than the current string's length, the current string will be returned as it is.
 *
 * @param fillString The string to pad the current string with.
 *        If this string is too long, it will be truncated and the left-most part will be applied.
 *        The default value for this parameter is " " (U+0020).
 */
function padStart(maxLength: number = 2, fillString: string = "0"): string {
  // @ts-ignore
  const stringifiedNumber: string = this.toString();
  return stringifiedNumber.padStart(maxLength, fillString);
}

const TIMEZONES: Array<Timezone> = [
  {
    short: "ACDT",
    long: "Australian Central Daylight Savings Time",
    offset: "+10:30",
  },
  {
    short: "ACST",
    long: "Australian Central Standard Time",
    offset: "+09:30",
  },
  { short: "ACT", long: "Acre Time", offset: "-05" },
  {
    short: "ACT",
    long: "ASEAN Common Time",
    offset: "+06:30 - +09",
  },
  {
    short: "ADT",
    long: "Atlantic Daylight Time",
    offset: "-03",
  },
  {
    short: "AEDT",
    long: "Australian Eastern Daylight Savings Time",
    offset: "+11",
  },
  {
    short: "AEST",
    long: "Australian Eastern Standard Time",
    offset: "+10",
  },
  {
    short: "AFT",
    long: "Afghanistan Time",
    offset: "+04:30",
  },
  {
    short: "AKDT",
    long: "Alaska Daylight Time",
    offset: "-08",
  },
  {
    short: "AKST",
    long: "Alaska Standard Time",
    offset: "-09",
  },
  {
    short: "AMST",
    long: "Amazon Summer Time (Brazil)[1]",
    offset: "-03",
  },
  {
    short: "AMT",
    long: "Amazon Time (Brazil)[2]",
    offset: "-04",
  },
  {
    short: "AMT",
    long: "Armenia Time",
    offset: "+04",
  },
  {
    short: "ART",
    long: "Argentina Time",
    offset: "-03",
  },
  {
    short: "AST",
    long: "Arabia Standard Time",
    offset: "+03",
  },
  {
    short: "AST",
    long: "Atlantic Standard Time",
    offset: "-04",
  },
  {
    short: "AWST",
    long: "Australian Western Standard Time",
    offset: "+08",
  },
  {
    short: "AZOST",
    long: "Azores Summer Time",
    offset: "+00",
  },
  {
    short: "AZOT",
    long: "Azores Standard Time",
    offset: "-01",
  },
  {
    short: "AZT",
    long: "Azerbaijan Time",
    offset: "+04",
  },
  {
    short: "BDT",
    long: "Brunei Time",
    offset: "+08",
  },
  {
    short: "BIOT",
    long: "British Indian Ocean Time",
    offset: "+06",
  },
  {
    short: "BIT",
    long: "Baker Island Time",
    offset: "-12",
  },
  {
    short: "BOT",
    long: "Bolivia Time",
    offset: "-04",
  },
  {
    short: "BRST",
    long: "Brasilia Summer Time",
    offset: "-02",
  },
  {
    short: "BRT",
    long: "Brasilia Time",
    offset: "-03",
  },
  {
    short: "BST",
    long: "Bangladesh Standard Time",
    offset: "+06",
  },
  {
    short: "BST",
    long: "Bougainville Standard Time[3]",
    offset: "+11",
  },
  {
    short: "BST",
    long: "British Summer Time (British Standard Time from Feb 1968 to Oct 1971)",
    offset: "+01",
  },
  {
    short: "BTT",
    long: "Bhutan Time",
    offset: "+06",
  },
  {
    short: "CAT",
    long: "Central Africa Time",
    offset: "+02",
  },
  {
    short: "CCT",
    long: "Cocos Islands Time",
    offset: "+06:30",
  },
  {
    short: "CDT",
    long: "Central Daylight Time (North America)",
    offset: "-05",
  },
  {
    short: "CDT",
    long: "Cuba Daylight Time[4]",
    offset: "-04",
  },
  {
    short: "CEST",
    long: "Central European Summer Time (Cf. HAEC)",
    offset: "+02",
  },
  {
    short: "CET",
    long: "Central European Time",
    offset: "+01",
  },
  {
    short: "CHADT",
    long: "Chatham Daylight Time",
    offset: "+13:45",
  },
  {
    short: "CHAST",
    long: "Chatham Standard Time",
    offset: "+12:45",
  },
  {
    short: "CHOT",
    long: "Choibalsan Standard Time",
    offset: "+08",
  },
  {
    short: "CHOST",
    long: "Choibalsan Summer Time",
    offset: "+09",
  },
  {
    short: "CHST",
    long: "Chamorro Standard Time",
    offset: "+10",
  },
  {
    short: "CHUT",
    long: "Chuuk Time",
    offset: "+10",
  },
  {
    short: "CIST",
    long: "Clipperton Island Standard Time",
    offset: "-08",
  },
  {
    short: "CIT",
    long: "Central Indonesia Time",
    offset: "+08",
  },
  {
    short: "CKT",
    long: "Cook Island Time",
    offset: "-10",
  },
  {
    short: "CLST",
    long: "Chile Summer Time",
    offset: "-03",
  },
  {
    short: "CLT",
    long: "Chile Standard Time",
    offset: "-04",
  },
  {
    short: "COST",
    long: "Colombia Summer Time",
    offset: "-04",
  },
  {
    short: "COT",
    long: "Colombia Time",
    offset: "-05",
  },
  {
    short: "CST",
    long: "Central Standard Time (North America)",
    offset: "-06",
  },
  {
    short: "CST",
    long: "China Standard Time",
    offset: "+08",
  },
  {
    short: "ACST",
    long: "Central Standard Time (Australia)",
    offset: "+09:30",
  },
  {
    short: "ACDT",
    long: "Central Summer Time (Australia)",
    offset: "+10:30",
  },
  {
    short: "CST",
    long: "Cuba Standard Time",
    offset: "-05",
  },
  { short: "CT", long: "China time", offset: "+08" },
  {
    short: "CVT",
    long: "Cape Verde Time",
    offset: "-01",
  },
  {
    short: "CWST",
    long: "Central Western Standard Time (Australia) unofficial",
    offset: "+08:45",
  },
  {
    short: "CXT",
    long: "Christmas Island Time",
    offset: "+07",
  },
  {
    short: "DAVT",
    long: "Davis Time",
    offset: "+07",
  },
  {
    short: "DDUT",
    long: "Dumont d'Urville Time",
    offset: "+10",
  },
  {
    short: "DFT",
    long: "AIX specific equivalent of Central European Time[5]",
    offset: "+01",
  },
  {
    short: "EASST",
    long: "Easter Island Summer Time",
    offset: "-05",
  },
  {
    short: "EAST",
    long: "Easter Island Standard Time",
    offset: "-06",
  },
  {
    short: "EAT",
    long: "East Africa Time",
    offset: "+03",
  },
  {
    short: "ECT",
    long: "Eastern Caribbean Time (does not recognise DST)",
    offset: "-04",
  },
  {
    short: "ECT",
    long: "Ecuador Time",
    offset: "-05",
  },
  {
    short: "EDT",
    long: "Eastern Daylight Time (North America)",
    offset: "-04",
  },
  {
    short: "AEDT",
    long: "Eastern Summer Time (Australia)",
    offset: "+11",
  },
  {
    short: "EEST",
    long: "Eastern European Summer Time",
    offset: "+03",
  },
  {
    short: "EET",
    long: "Eastern European Time",
    offset: "+02",
  },
  {
    short: "EGST",
    long: "Eastern Greenland Summer Time",
    offset: "+00",
  },
  {
    short: "EGT",
    long: "Eastern Greenland Time",
    offset: "-01",
  },
  {
    short: "EIT",
    long: "Eastern Indonesian Time",
    offset: "+09",
  },
  {
    short: "EST",
    long: "Eastern Standard Time (North America)",
    offset: "-05",
  },
  {
    short: "AEST",
    long: "Eastern Standard Time (Australia)",
    offset: "+10",
  },
  {
    short: "FET",
    long: "Further-eastern European Time",
    offset: "+03",
  },
  { short: "FJT", long: "Fiji Time", offset: "+12" },
  {
    short: "FKST",
    long: "Falkland Islands Summer Time",
    offset: "-03",
  },
  {
    short: "FKT",
    long: "Falkland Islands Time",
    offset: "-04",
  },
  {
    short: "FNT",
    long: "Fernando de Noronha Time",
    offset: "-02",
  },
  {
    short: "GALT",
    long: "Galapagos Time",
    offset: "-06",
  },
  {
    short: "GAMT",
    long: "Gambier Islands",
    offset: "-09",
  },
  {
    short: "GET",
    long: "Georgia Standard Time",
    offset: "+04",
  },
  {
    short: "GFT",
    long: "French Guiana Time",
    offset: "-03",
  },
  {
    short: "GILT",
    long: "Gilbert Island Time",
    offset: "+12",
  },
  {
    short: "GIT",
    long: "Gambier Island Time",
    offset: "-09",
  },
  {
    short: "GMT",
    long: "Greenwich Mean Time",
    offset: "+00",
  },
  {
    short: "GST",
    long: "South Georgia and the South Sandwich Islands",
    offset: "-02",
  },
  {
    short: "GST",
    long: "Gulf Standard Time",
    offset: "+04",
  },
  {
    short: "GYT",
    long: "Guyana Time",
    offset: "-04",
  },
  {
    short: "HADT",
    long: "Hawaii-Aleutian Daylight Time",
    offset: "-09",
  },
  {
    short: "HAEC",
    long: "Heure Avancée d'Europe Centrale franchised name for CEST",
    offset: "+02",
  },
  {
    short: "HAST",
    long: "Hawaii-Aleutian Standard Time",
    offset: "-10",
  },
  {
    short: "HKT",
    long: "Hong Kong Time",
    offset: "+08",
  },
  {
    short: "HMT",
    long: "Heard and McDonald Islands Time",
    offset: "+05",
  },
  {
    short: "HOVST",
    long: "Khovd Summer Time",
    offset: "+08",
  },
  {
    short: "HOVT",
    long: "Khovd Standard Time",
    offset: "+07",
  },
  {
    short: "ICT",
    long: "Indochina Time",
    offset: "+07",
  },
  {
    short: "IDT",
    long: "Israel Daylight Time",
    offset: "+03",
  },
  {
    short: "IOT",
    long: "Indian Ocean Time",
    offset: "+03",
  },
  {
    short: "IRDT",
    long: "Iran Daylight Time",
    offset: "+04:30",
  },
  {
    short: "IRKT",
    long: "Irkutsk Time",
    offset: "+08",
  },
  {
    short: "IRST",
    long: "Iran Standard Time",
    offset: "+03:30",
  },
  {
    short: "IST",
    long: "Indian Standard Time",
    offset: "+05:30",
  },
  {
    short: "IST",
    long: "Irish Standard Time[6]",
    offset: "+01",
  },
  {
    short: "IST",
    long: "Israel Standard Time",
    offset: "+02",
  },
  {
    short: "JST",
    long: "Japan Standard Time",
    offset: "+09",
  },
  {
    short: "KGT",
    long: "Kyrgyzstan time",
    offset: "+06",
  },
  {
    short: "KOST",
    long: "Kosrae Time",
    offset: "+11",
  },
  {
    short: "KRAT",
    long: "Krasnoyarsk Time",
    offset: "+07",
  },
  {
    short: "KST",
    long: "Korea Standard Time",
    offset: "+09",
  },
  {
    short: "LHST",
    long: "Lord Howe Standard Time",
    offset: "+10:30",
  },
  {
    short: "LHST",
    long: "Lord Howe Summer Time",
    offset: "+11",
  },
  {
    short: "LINT",
    long: "Line Islands Time",
    offset: "+14",
  },
  {
    short: "MAGT",
    long: "Magadan Time",
    offset: "+12",
  },
  {
    short: "MART",
    long: "Marquesas Islands Time",
    offset: "-09:30",
  },
  {
    short: "MAWT",
    long: "Mawson Station Time",
    offset: "+05",
  },
  {
    short: "MDT",
    long: "Mountain Daylight Time (North America)",
    offset: "-06",
  },
  {
    short: "MET",
    long: "Middle European Time Same zone as CET",
    offset: "+01",
  },
  {
    short: "MEST",
    long: "Middle European Summer Time Same zone as CEST",
    offset: "+02",
  },
  {
    short: "MHT",
    long: "Marshall Islands",
    offset: "+12",
  },
  {
    short: "MIST",
    long: "Macquarie Island Station Time",
    offset: "+11",
  },
  {
    short: "MIT",
    long: "Marquesas Islands Time",
    offset: "-09:30",
  },
  {
    short: "MMT",
    long: "Myanmar Standard Time",
    offset: "+06:30",
  },
  {
    short: "MSK",
    long: "Moscow Time",
    offset: "+03",
  },
  {
    short: "MST",
    long: "Malaysia Standard Time",
    offset: "+08",
  },
  {
    short: "MST",
    long: "Mountain Standard Time (North America)",
    offset: "-07",
  },
  {
    short: "MUT",
    long: "Mauritius Time",
    offset: "+04",
  },
  {
    short: "MVT",
    long: "Maldives Time",
    offset: "+05",
  },
  {
    short: "MYT",
    long: "Malaysia Time",
    offset: "+08",
  },
  {
    short: "NCT",
    long: "New Caledonia Time",
    offset: "+11",
  },
  {
    short: "NDT",
    long: "Newfoundland Daylight Time",
    offset: "-02:30",
  },
  {
    short: "NFT",
    long: "Norfolk Time",
    offset: "+11",
  },
  {
    short: "NPT",
    long: "Nepal Time",
    offset: "+05:45",
  },
  {
    short: "NST",
    long: "Newfoundland Standard Time",
    offset: "-03:30",
  },
  {
    short: "NT",
    long: "Newfoundland Time",
    offset: "-03:30",
  },
  { short: "NUT", long: "Niue Time", offset: "-11" },
  {
    short: "NZDT",
    long: "New Zealand Daylight Time",
    offset: "+13",
  },
  {
    short: "NZST",
    long: "New Zealand Standard Time",
    offset: "+12",
  },
  {
    short: "OMST",
    long: "Omsk Time",
    offset: "+06",
  },
  {
    short: "ORAT",
    long: "Oral Time",
    offset: "+05",
  },
  {
    short: "PDT",
    long: "Pacific Daylight Time (North America)",
    offset: "-07",
  },
  { short: "PET", long: "Peru Time", offset: "-05" },
  {
    short: "PETT",
    long: "Kamchatka Time",
    offset: "+12",
  },
  {
    short: "PGT",
    long: "Papua New Guinea Time",
    offset: "+10",
  },
  {
    short: "PHOT",
    long: "Phoenix Island Time",
    offset: "+13",
  },
  {
    short: "PHT",
    long: "Philippine Time",
    offset: "+08",
  },
  {
    short: "PKT",
    long: "Pakistan Standard Time",
    offset: "+05",
  },
  {
    short: "PMDT",
    long: "Saint Pierre and Miquelon Daylight time",
    offset: "-02",
  },
  {
    short: "PMST",
    long: "Saint Pierre and Miquelon Standard Time",
    offset: "-03",
  },
  {
    short: "PONT",
    long: "Pohnpei Standard Time",
    offset: "+11",
  },
  {
    short: "PST",
    long: "Pacific Standard Time (North America)",
    offset: "-08",
  },
  {
    short: "PST",
    long: "Philippine Standard Time",
    offset: "+08",
  },
  {
    short: "PYST",
    long: "Paraguay Summer Time (South America)[7]",
    offset: "-03",
  },
  {
    short: "PYT",
    long: "Paraguay Time (South America)[8]",
    offset: "-04",
  },
  {
    short: "RET",
    long: "Réunion Time",
    offset: "+04",
  },
  {
    short: "ROTT",
    long: "Rothera Research Station Time",
    offset: "-03",
  },
  {
    short: "SAKT",
    long: "Sakhalin Island time",
    offset: "+11",
  },
  {
    short: "SAMT",
    long: "Samara Time",
    offset: "+04",
  },
  {
    short: "SAST",
    long: "South African Standard Time",
    offset: "+02",
  },
  {
    short: "SBT",
    long: "Solomon Islands Time",
    offset: "+11",
  },
  {
    short: "SCT",
    long: "Seychelles Time",
    offset: "+04",
  },
  {
    short: "SGT",
    long: "Singapore Time",
    offset: "+08",
  },
  {
    short: "SLST",
    long: "Sri Lanka Standard Time",
    offset: "+05:30",
  },
  {
    short: "SRET",
    long: "Srednekolymsk Time",
    offset: "+11",
  },
  {
    short: "SRT",
    long: "Suriname Time",
    offset: "-03",
  },
  {
    short: "SST",
    long: "Samoa Standard Time",
    offset: "-11",
  },
  {
    short: "SST",
    long: "Singapore Standard Time",
    offset: "+08",
  },
  {
    short: "SYOT",
    long: "Showa Station Time",
    offset: "+03",
  },
  {
    short: "TAHT",
    long: "Tahiti Time",
    offset: "-10",
  },
  {
    short: "THA",
    long: "Thailand Standard Time",
    offset: "+07",
  },
  {
    short: "TFT",
    long: "Indian/Kerguelen",
    offset: "+05",
  },
  {
    short: "TJT",
    long: "Tajikistan Time",
    offset: "+05",
  },
  {
    short: "TKT",
    long: "Tokelau Time",
    offset: "+13",
  },
  {
    short: "TLT",
    long: "Timor Leste Time",
    offset: "+09",
  },
  {
    short: "TMT",
    long: "Turkmenistan Time",
    offset: "+05",
  },
  {
    short: "TRT",
    long: "Turkey Time",
    offset: "+03",
  },
  {
    short: "TOT",
    long: "Tonga Time",
    offset: "+13",
  },
  {
    short: "TVT",
    long: "Tuvalu Time",
    offset: "+12",
  },
  {
    short: "ULAST",
    long: "Ulaanbaatar Summer Time",
    offset: "+09",
  },
  {
    short: "ULAT",
    long: "Ulaanbaatar Standard Time",
    offset: "+08",
  },
  {
    short: "USZ1",
    long: "Kaliningrad Time",
    offset: "+02",
  },
  {
    short: "",
    long: "Coordinated Universal Time",
    offset: "+00",
  },
  {
    short: "UYST",
    long: "Uruguay Summer Time",
    offset: "-02",
  },
  {
    short: "UYT",
    long: "Uruguay Standard Time",
    offset: "-03",
  },
  {
    short: "UZT",
    long: "Uzbekistan Time",
    offset: "+05",
  },
  {
    short: "VET",
    long: "Venezuelan Standard Time",
    offset: "-04",
  },
  {
    short: "VLAT",
    long: "Vladivostok Time",
    offset: "+10",
  },
  {
    short: "VOLT",
    long: "Volgograd Time",
    offset: "+04",
  },
  {
    short: "VOST",
    long: "Vostok Station Time",
    offset: "+06",
  },
  {
    short: "VUT",
    long: "Vanuatu Time",
    offset: "+11",
  },
  {
    short: "WAKT",
    long: "Wake Island Time",
    offset: "+12",
  },
  {
    short: "WAST",
    long: "West Africa Summer Time",
    offset: "+02",
  },
  {
    short: "WAT",
    long: "West Africa Time",
    offset: "+01",
  },
  {
    short: "WEST",
    long: "Western European Summer Time",
    offset: "+01",
  },
  {
    short: "WET",
    long: "Western European Time",
    offset: "+00",
  },
  {
    short: "WIT",
    long: "Western Indonesian Time",
    offset: "+07",
  },
  {
    short: "WST",
    long: "Western Standard Time",
    offset: "+08",
  },
  {
    short: "YAKT",
    long: "Yakutsk Time",
    offset: "+09",
  },
  {
    short: "YEKT",
    long: "Yekaterinburg Time",
    offset: "+05",
  },
];

export { DATE_TIME_FORMAT_RE, padEnd, padStart, TIMEZONES };
