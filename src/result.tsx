// --- generert kode ---
import { Fragment, useEffect, useRef, useState } from "react";
import { Button, Link, Badge, Search, Selectfield } from "@bi-digital/react";
import { CheckThickIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, CrossThickIcon, RedoIcon } from "@bi-digital/icons";
import { AreaIcon, AreaIconInSvg } from "./areaIcons";
import { placementReasons } from "./placementReasons";

type Status =
  | "Uendret"
  | "Endret navn på fagområde"
  | "1 fagområde prioritert"
  | "Manglet fagområde"
  | "Lagt til ekstra fagområde"
  | "Flyttet til nytt fagområde"
  | "Fagområde fjernet";
type Row = [
  area: string,
  statuses: Status[],
  title: string,
  level: string,
  previous: string,
  alternatives: string,
  subcategories: string,
  reason: string,
  recent: boolean,
  industry: string,
  online: boolean,
];

const rawRows: Row[] = [
  ["Finans, økonomi og regnskap", ["Manglet fagområde"], "Høyskolekandidat i økonomi og administrasjon", "–", "–", "–", "Finans, økonomi og regnskap › Bedriftsøkonomi", "Handler om bedriftsøkonomi, budsjett og beslutningsstøtte, eller er en bred økonomiutdanning.", false, "–", false],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Regnskap for nyutdannede jurister", "–", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Regnskap og revisjon", "Handler om regnskap, bokføring eller revisjon.", false, "–", false],
  ["Finans, økonomi og regnskap", ["1 fagområde prioritert", "Fagområde fjernet"], "Business Administration", "Bachelor", "Finans, økonomi og styring; Ledelse; Internasjonal Business", "–", "Finans, økonomi og regnskap › Bedriftsøkonomi", "Handler om bedriftsøkonomi, budsjett og beslutningsstøtte, eller er en bred økonomiutdanning.", false, "–", false],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Finans", "Bachelor", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Finans og investering", "Handler om finans, investering, bank eller finansnæringen.", false, "–", false],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Vil du bli statsautorisert regnskapsfører?", "Bachelor", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Regnskap og revisjon", "Handler om regnskap, bokføring eller revisjon.", false, "–", false],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Økonomi og administrasjon", "Bachelor", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Bedriftsøkonomi", "Handler om bedriftsøkonomi, budsjett og beslutningsstøtte, eller er en bred økonomiutdanning.", false, "–", true],
  ["Finans, økonomi og regnskap", ["1 fagområde prioritert", "Fagområde fjernet"], "Siviløkonom", "Bachelor/Master", "Finans, økonomi og styring; Ledelse", "–", "Finans, økonomi og regnskap › Bedriftsøkonomi", "Handler om bedriftsøkonomi, budsjett og beslutningsstøtte, eller er en bred økonomiutdanning.", false, "–", false],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Bedriftsøkonomi", "Bachelor/Årsenhet", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Bedriftsøkonomi", "Handler om bedriftsøkonomi, budsjett og beslutningsstøtte, eller er en bred økonomiutdanning.", false, "–", true],
  ["Finans, økonomi og regnskap", ["Manglet fagområde"], "Anvendt mikroøkonomi", "Bachelorkurs", "–", "–", "Finans, økonomi og regnskap › Samfunnsøkonomi, økonomisk teori og matematikk", "Handler om økonomisk teori og samfunnsøkonomi.", false, "–", true],
  ["KI, digitalisering og analytics", ["Manglet fagområde"], "Bachelor fintech", "Bachelorkurs", "–", "Finans, økonomi og regnskap", "KI, digitalisering og analytics › Digital transformasjon; Finans, økonomi og regnskap › Fintech", "Handler om teknologi og digital transformasjon i finansnæringen.", false, "Finansnæringen", true],
  ["Finans, økonomi og regnskap", ["Manglet fagområde"], "Bærekraft i kreditt og utlån for bedriftsrådgivere", "Bachelorkurs", "–", "Strategi, innovasjon og bærekraft", "Finans, økonomi og regnskap › Bærekraftig finans; Strategi, innovasjon og bærekraft › Bærekraft", "Handler om finans og investering, med bærekraft som tema.", true, "Finansnæringen", false],
  ["Finans, økonomi og regnskap", ["1 fagområde prioritert"], "Bærekraft og finans", "Bachelorkurs", "Finans, økonomi og styring; Strategi, innovasjon og bærekraft", "Strategi, innovasjon og bærekraft", "Finans, økonomi og regnskap › Bærekraftig finans; Strategi, innovasjon og bærekraft › Bærekraft", "Handler om finans og investering, med bærekraft som tema.", true, "Finansnæringen", true],
  ["Finans, økonomi og regnskap", ["Manglet fagområde"], "Bærekraftig finans", "Bachelorkurs", "–", "Strategi, innovasjon og bærekraft", "Finans, økonomi og regnskap › Bærekraftig finans; Strategi, innovasjon og bærekraft › Bærekraft", "Handler om finans og investering, med bærekraft som tema.", true, "Finansnæringen", false],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Digital økonomistyring", "Bachelorkurs", "Finans, økonomi og styring", "KI, digitalisering og analytics", "Finans, økonomi og regnskap › Økonomistyring; KI, digitalisering og analytics › Digital transformasjon", "Handler om bedriftsøkonomi, budsjett og beslutningsstøtte, eller er en bred økonomiutdanning.", false, "–", true],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Finans", "Bachelorkurs", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Finans og investering", "Handler om finans, investering, bank eller finansnæringen.", false, "–", true],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Finans og økonomi", "Bachelorkurs", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Finans og investering", "Handler om finans, investering, bank eller finansnæringen.", false, "–", true],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Finansiell analyse og verdsettelse", "Bachelorkurs", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Finans og investering", "Handler om finans, investering, bank eller finansnæringen.", false, "–", true],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Finansiell styring", "Bachelorkurs", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Finans og investering", "Kapitalstruktur, obligasjoner og verdsettelse, derfor Finans og investering.", false, "–", true],
  ["Finans, økonomi og regnskap", ["1 fagområde prioritert"], "Finansiering, prising og risikostyring av bærekraft", "Bachelorkurs", "Finans, økonomi og styring; Strategi, innovasjon og bærekraft", "Strategi, innovasjon og bærekraft", "Finans, økonomi og regnskap › Bærekraftig finans; Strategi, innovasjon og bærekraft › Bærekraft", "Handler om finans og investering, med bærekraft som tema.", true, "Finansnæringen", true],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Finansregnskap og bokføring", "Bachelorkurs", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Regnskap og revisjon", "Handler om regnskap, bokføring eller revisjon.", false, "–", true],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Finansregnskap og regnskapsanalyse", "Bachelorkurs", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Regnskap og revisjon", "Handler om regnskap, bokføring eller revisjon.", false, "–", true],
  ["Finans, økonomi og regnskap", ["Manglet fagområde"], "Innføring i bedriftsøkonomi og finans", "Bachelorkurs", "–", "–", "Finans, økonomi og regnskap › Bedriftsøkonomi", "Handler om bedriftsøkonomi, budsjett og beslutningsstøtte, eller er en bred økonomiutdanning.", false, "–", true],
  ["Finans, økonomi og regnskap", ["Flyttet til nytt fagområde", "Fagområde fjernet"], "Innføring i bedriftsøkonomi og finans", "Bachelorkurs", "Ledelse; Organisasjonsutvikling og Human Resource Management", "–", "Finans, økonomi og regnskap › Bedriftsøkonomi", "Handler om bedriftsøkonomi, budsjett og beslutningsstøtte, eller er en bred økonomiutdanning.", false, "–", false],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Matematikk for økonomer", "Bachelorkurs", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Samfunnsøkonomi, økonomisk teori og matematikk", "Handler om økonomisk teori og samfunnsøkonomi.", false, "–", true],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Matematisk analyse", "Bachelorkurs", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Samfunnsøkonomi, økonomisk teori og matematikk", "Handler om økonomisk teori og samfunnsøkonomi.", false, "–", true],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Personlig økonomi", "Bachelorkurs", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Finans og investering", "Handler om finans, investering, bank eller finansnæringen.", false, "–", true],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Prestasjonsstyring", "Bachelorkurs", "Finans, økonomi og styring", "Ledelse", "Finans, økonomi og regnskap › Økonomistyring; Ledelse › Strategisk ledelse", "Handler om budsjett, nøkkeltall og oppfølging av økonomisk resultat, derfor Økonomistyring. Styring av enheter og resultater er også et lederansvar, så Ledelse er ekstra fagområde.", false, "–", true],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Regnskapsføring i næring", "Bachelorkurs", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Regnskap og revisjon", "Handler om regnskap, bokføring eller revisjon.", false, "–", true],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Samfunnsøkonomi I", "Bachelorkurs", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Samfunnsøkonomi, økonomisk teori og matematikk", "Handler om økonomisk teori og samfunnsøkonomi.", false, "–", true],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Samfunnsøkonomi II", "Bachelorkurs", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Samfunnsøkonomi, økonomisk teori og matematikk", "Handler om økonomisk teori og samfunnsøkonomi.", false, "–", true],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Strategisk økonomistyring", "Bachelorkurs", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Økonomistyring", "Handler om bedriftsøkonomi, budsjett og beslutningsstøtte, eller er en bred økonomiutdanning.", false, "–", true],
  ["Finans, økonomi og regnskap", ["1 fagområde prioritert", "Fagområde fjernet"], "Styrekompetanse", "Bachelorkurs", "Finans, økonomi og styring; Organisasjonsutvikling og Human Resource Management", "Ledelse; Strategi, innovasjon og bærekraft; Juss, skatt og eiendom", "Finans, økonomi og regnskap › Bedriftsøkonomi; Ledelse › Strategisk ledelse; Strategi, innovasjon og bærekraft › Strategi; Juss, skatt og eiendom › Forretningsjus og rettsvitenskap", "Handler om styrearbeid, eierstyring og governance.", false, "–", false],
  ["Finans, økonomi og regnskap", ["1 fagområde prioritert", "Fagområde fjernet"], "Business", "Master", "Finans, økonomi og styring; Ledelse; Markedsføring, kommunikasjon og kultur; Organisasjonsutvikling og Human Resource Management; Eiendom, varehandel og forretningsjus; Strategi, innovasjon og bærekraft", "Ledelse", "Finans, økonomi og regnskap › Bedriftsøkonomi; Ledelse › Generell ledelse og lederutdanning", "Handler om bedriftsøkonomi, budsjett og beslutningsstøtte, eller er en bred økonomiutdanning. Fagområder som markedsføring og HR kommer i tillegg gjennom hvilken major man velger.", false, "–", false],
  ["Finans, økonomi og regnskap", ["1 fagområde prioritert"], "Bærekraft og finans", "Master", "Finans, økonomi og styring; Strategi, innovasjon og bærekraft", "Strategi, innovasjon og bærekraft", "Finans, økonomi og regnskap › Bærekraftig finans; Strategi, innovasjon og bærekraft › Bærekraft", "Handler om finans og investering, med bærekraft som tema.", true, "–", false],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Finans", "Master", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Finans og investering", "Handler om finans, investering, bank eller finansnæringen.", false, "–", false],
  ["Finans, økonomi og regnskap", ["1 fagområde prioritert", "Fagområde fjernet"], "Major in Accounting and Business Control", "Master", "Finans, økonomi og styring; Strategi, innovasjon og bærekraft", "–", "Finans, økonomi og regnskap › Regnskap og revisjon", "Handler om regnskap, bokføring eller revisjon.", false, "–", false],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Major in Economics", "Master", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Samfunnsøkonomi, økonomisk teori og matematikk", "Handler om økonomisk teori og samfunnsøkonomi.", false, "–", false],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Major in Finance", "Master", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Finans og investering", "Handler om finans, investering, bank eller finansnæringen.", false, "–", false],
  ["Finans, økonomi og regnskap", ["1 fagområde prioritert", "Fagområde fjernet"], "Quantitative Finance", "Master", "Finans, økonomi og styring; Digitalisering og Analytics", "KI, digitalisering og analytics", "Finans, økonomi og regnskap › Finans og investering; KI, digitalisering og analytics › Data science og analytics", "Handler om finans, investering, bank eller finansnæringen.", false, "–", false],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Regnskap og revisjon", "Master", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Regnskap og revisjon", "Handler om regnskap, bokføring eller revisjon.", false, "–", false],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Regnskap og revisjon +1-modellen", "Master", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Regnskap og revisjon", "Handler om regnskap, bokføring eller revisjon.", false, "–", false],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Anvendt økonomi", "Masterkurs", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Samfunnsøkonomi, økonomisk teori og matematikk", "Handler om økonomisk teori og samfunnsøkonomi.", false, "–", false],
  ["Finans, økonomi og regnskap", ["1 fagområde prioritert", "Fagområde fjernet"], "Det verdiskapende styret", "Masterkurs", "Finans, økonomi og styring; Strategi, innovasjon og bærekraft", "Ledelse; Strategi, innovasjon og bærekraft; Juss, skatt og eiendom", "Finans, økonomi og regnskap › Bedriftsøkonomi; Ledelse › Strategisk ledelse; Strategi, innovasjon og bærekraft › Strategi; Juss, skatt og eiendom › Forretningsjus og rettsvitenskap", "Handler om styrearbeid, eierstyring og governance.", false, "–", false],
  ["Finans, økonomi og regnskap", ["1 fagområde prioritert"], "Finansiell strategi", "Masterkurs", "Finans, økonomi og styring; Strategi, innovasjon og bærekraft", "Strategi, innovasjon og bærekraft", "Finans, økonomi og regnskap › Finans og investering; Strategi, innovasjon og bærekraft › Strategi", "Handler om finans, investering, bank eller finansnæringen.", false, "–", false],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Global økonomi", "Masterkurs", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Samfunnsøkonomi, økonomisk teori og matematikk", "Handler om økonomisk teori og samfunnsøkonomi.", false, "–", false],
  ["Juss, skatt og eiendom", ["1 fagområde prioritert", "Fagområde fjernet"], "Governance: Risikostyring, compliance og internrevisjon", "Masterkurs", "Eiendom, varehandel og forretningsjus; Finans, økonomi og styring; Strategi, innovasjon og bærekraft", "Finans, økonomi og regnskap", "Juss, skatt og eiendom › Compliance; Finans, økonomi og regnskap › Regnskap og revisjon", "Handler om risikostyring, compliance og internrevisjon.", false, "–", false],
  ["KI, digitalisering og analytics", ["Manglet fagområde"], "Master fintech", "Masterkurs", "–", "Finans, økonomi og regnskap", "KI, digitalisering og analytics › Digital transformasjon; Finans, økonomi og regnskap › Fintech", "Handler om teknologi og digital transformasjon i finansnæringen.", false, "Finansnæringen", true],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Økonomi for beslutningstakere", "Masterkurs", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Økonomistyring", "Budsjettering, kostnads- og lønnsomhetsanalyse, derfor Økonomistyring og bedriftsøkonomi.", false, "–", false],
  ["Finans, økonomi og regnskap", ["Manglet fagområde"], "Rådgivning og risiko", "Kurs uten studiepoeng", "–", "Strategi, innovasjon og bærekraft", "Finans, økonomi og regnskap › Finans og investering; Strategi, innovasjon og bærekraft › Bærekraft", "Handler om finans og investering, med bærekraft som tema.", true, "Finansnæringen", true],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Finans", "PhD", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Finans og investering", "Handler om finans, investering, bank eller finansnæringen.", false, "–", false],
  ["Finans, økonomi og regnskap", ["Manglet fagområde"], "Regnskap", "PhD", "–", "–", "Finans, økonomi og regnskap › Regnskap og revisjon", "Handler om regnskap, bokføring eller revisjon.", false, "–", false],
  ["Finans, økonomi og regnskap", ["Manglet fagområde"], "Samfunnsøkonomi", "PhD", "–", "–", "Finans, økonomi og regnskap › Samfunnsøkonomi, økonomisk teori og matematikk", "Handler om økonomisk teori og samfunnsøkonomi.", false, "–", false],
  ["Finans, økonomi og regnskap", ["Manglet fagområde"], "Qualifying Year at American College of Norway", "–", "–", "–", "Finans, økonomi og regnskap › Bedriftsøkonomi", "Handler om bedriftsøkonomi, budsjett og beslutningsstøtte, eller er en bred økonomiutdanning.", false, "–", false],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Bærekraftig økonomisk utvikling", "Bachelorkurs", "Finans, økonomi og styring", "Strategi, innovasjon og bærekraft", "Finans, økonomi og regnskap › Samfunnsøkonomi, økonomisk teori og matematikk; Strategi, innovasjon og bærekraft › Bærekraft", "Makroøkonomi (vekst, statsfinanser) med bærekraft som perspektiv.", false, "–", true],
  ["Finans, økonomi og regnskap", ["Lagt til ekstra fagområde"], "Marked, kriser og bærekraft", "Bachelorkurs", "Strategi, innovasjon og bærekraft", "Strategi, innovasjon og bærekraft", "Finans, økonomi og regnskap › Samfunnsøkonomi, økonomisk teori og matematikk; Strategi, innovasjon og bærekraft › Bærekraft", "Innsikt i markedsøkonomi som økonomisk system.", false, "–", true],
  ["Helse, skole og barnehage", ["Flyttet til nytt fagområde", "Fagområde fjernet"], "Grunnkurs i ledelse og kvalitet i helse- og omsorgstjenesten", "Bachelor", "Offentlig sektor; Organisasjonsutvikling og Human Resource Management", "Ledelse", "Helse, skole og barnehage › Helse; Ledelse › Helse-, skole- og barnehageledelse", "Rettet mot ledere og fagfolk i helsetjenesten.", false, "Helse og omsorg", false],
  ["Helse, skole og barnehage", ["Flyttet til nytt fagområde"], "Helseledelse, kvalitet og utvikling", "Bachelorkurs", "Offentlig sektor", "Ledelse", "Helse, skole og barnehage › Helse; Ledelse › Helse-, skole- og barnehageledelse", "Rettet mot ledere og fagfolk i helsetjenesten.", false, "Helse og omsorg", false],
  ["Helse, skole og barnehage", ["Lagt til ekstra fagområde"], "Ledelse av tjenesteutvikling og innovasjonsprosesser i helsetjenesten", "Bachelorkurs", "Strategi, innovasjon og bærekraft", "Strategi, innovasjon og bærekraft; Ledelse", "Helse, skole og barnehage › Helse; Strategi, innovasjon og bærekraft › Innovasjon og entreprenørskap; Ledelse › Helse-, skole- og barnehageledelse", "Rettet mot ledere og fagfolk i helsetjenesten.", false, "Helse og omsorg", false],
  ["Helse, skole og barnehage", ["Flyttet til nytt fagområde"], "Helseledelse", "Masterkurs", "Offentlig sektor", "Ledelse", "Helse, skole og barnehage › Helse; Ledelse › Helse-, skole- og barnehageledelse", "Rettet mot ledere og fagfolk i helsetjenesten.", false, "Helse og omsorg", false],
  ["Helse, skole og barnehage", ["Flyttet til nytt fagområde"], "Ledelse av profesjonsfellesskap og læreplanarbeid", "Masterkurs", "Offentlig sektor", "Ledelse", "Helse, skole og barnehage › Skole og barnehage; Ledelse › Helse-, skole- og barnehageledelse", "Rettet mot ledere i skole og barnehage.", false, "Skole og barnehage", false],
  ["Helse, skole og barnehage", ["Flyttet til nytt fagområde"], "Ledelse av utviklings- og endringsarbeid", "Masterkurs", "Offentlig sektor", "HR og organisasjonsutvikling; Ledelse", "Helse, skole og barnehage › Skole og barnehage; HR og organisasjonsutvikling › Endringsledelse; Ledelse › Helse-, skole- og barnehageledelse", "Rettet mot skole- og barnehageledere (kursbeskrivelsen).", false, "Skole og barnehage", false],
  ["Helse, skole og barnehage", ["Flyttet til nytt fagområde"], "Lederkurs for allmennleger", "Masterkurs", "Offentlig sektor", "Ledelse", "Helse, skole og barnehage › Helse; Ledelse › Helse-, skole- og barnehageledelse", "Rettet mot ledere og fagfolk i helsetjenesten.", false, "Helse og omsorg", false],
  ["Helse, skole og barnehage", ["Flyttet til nytt fagområde"], "Lederkurs for kommunehelsetjenesten", "Masterkurs", "Offentlig sektor", "Ledelse", "Helse, skole og barnehage › Helse; Ledelse › Helse-, skole- og barnehageledelse", "Rettet mot ledere og fagfolk i helsetjenesten.", false, "Helse og omsorg", false],
  ["Helse, skole og barnehage", ["Flyttet til nytt fagområde"], "Lederkurs for tannleger i offentlig og privat sektor", "Masterkurs", "Offentlig sektor", "Ledelse", "Helse, skole og barnehage › Helse; Ledelse › Helse-, skole- og barnehageledelse", "Rettet mot ledere og fagfolk i helsetjenesten.", false, "Helse og omsorg", false],
  ["Helse, skole og barnehage", ["Flyttet til nytt fagområde"], "Nasjonal rektorutdanning", "Masterkurs", "Offentlig sektor", "Ledelse", "Helse, skole og barnehage › Skole og barnehage; Ledelse › Helse-, skole- og barnehageledelse", "Rettet mot ledere i skole og barnehage.", false, "Skole og barnehage", false],
  ["Helse, skole og barnehage", ["Flyttet til nytt fagområde"], "Nasjonal styrerutdanning", "Masterkurs", "Offentlig sektor", "Ledelse", "Helse, skole og barnehage › Skole og barnehage; Ledelse › Helse-, skole- og barnehageledelse", "Rettet mot ledere i skole og barnehage.", false, "Skole og barnehage", false],
  ["Helse, skole og barnehage", ["Flyttet til nytt fagområde"], "Pedagogisk ledelse og læringsmiljø i barnehagen", "Masterkurs", "Offentlig sektor", "Ledelse", "Helse, skole og barnehage › Skole og barnehage; Ledelse › Helse-, skole- og barnehageledelse", "Rettet mot ledere i skole og barnehage.", false, "Skole og barnehage", false],
  ["Helse, skole og barnehage", ["Flyttet til nytt fagområde"], "Utdanningsledelse og strategisk utvikling", "Masterkurs", "Offentlig sektor", "Ledelse; Strategi, innovasjon og bærekraft", "Helse, skole og barnehage › Skole og barnehage; Ledelse › Helse-, skole- og barnehageledelse; Strategi, innovasjon og bærekraft › Strategi", "Rettet mot ledere i skole og barnehage.", false, "Skole og barnehage", false],
  ["HR og organisasjonsutvikling", ["1 fagområde prioritert"], "Motivasjon og selvledelse", "Bachelor", "Ledelse; Organisasjonsutvikling og Human Resource Management", "Ledelse", "HR og organisasjonsutvikling › Arbeidsmiljø; Ledelse › Lederferdigheter og kommunikasjon", "Handler om arbeidsmiljø, trivsel og arbeidsglede.", false, "–", false],
  ["HR og organisasjonsutvikling", ["1 fagområde prioritert"], "Organisasjonspsykologi, HR og ledelse", "Bachelor", "Ledelse; Organisasjonsutvikling og Human Resource Management", "Ledelse", "HR og organisasjonsutvikling › Organisasjonspsykologi; Ledelse › Teamledelse og prestasjon", "Handler om organisasjonspsykologi og atferd i organisasjoner.", false, "–", false],
  ["HR og organisasjonsutvikling", ["1 fagområde prioritert"], "Arbeidsglede i praksis", "Bachelorkurs", "Ledelse; Organisasjonsutvikling og Human Resource Management", "Ledelse", "HR og organisasjonsutvikling › Arbeidsmiljø; Ledelse › Medarbeiderledelse og arbeidsmiljø", "Handler om arbeidsmiljø, trivsel og arbeidsglede.", false, "–", false],
  ["Strategi, innovasjon og bærekraft", ["Flyttet til nytt fagområde"], "Consulting - Verktøy og teknikker", "Bachelorkurs", "Finans, økonomi og styring", "–", "Strategi, innovasjon og bærekraft › Strategi", "Konsulentverktøy og problemløsning, nær strategi- og analysefaget.", false, "–", true],
  ["HR og organisasjonsutvikling", ["1 fagområde prioritert"], "Endringsledelse i praksis", "Bachelorkurs", "Ledelse; Organisasjonsutvikling og Human Resource Management", "Ledelse", "HR og organisasjonsutvikling › Endringsledelse; Ledelse › Endringsledelse", "Handler om endring i organisasjoner og rådgivning.", false, "–", false],
  ["HR og organisasjonsutvikling", ["Manglet fagområde"], "HR og personalledelse", "Bachelorkurs", "–", "Ledelse", "HR og organisasjonsutvikling › HR og personalledelse; Ledelse › Generell ledelse og lederutdanning", "Handler om HR og personalarbeid.", false, "–", false],
  ["HR og organisasjonsutvikling", ["1 fagområde prioritert"], "HRM og arbeidsrett", "Bachelorkurs", "Ledelse; Organisasjonsutvikling og Human Resource Management", "Juss, skatt og eiendom; Ledelse", "HR og organisasjonsutvikling › HR og personalledelse; Juss, skatt og eiendom › Arbeidsrett; Ledelse › Medarbeiderledelse og arbeidsmiljø", "Handler om HR og personalarbeid.", false, "–", false],
  ["HR og organisasjonsutvikling", ["1 fagområde prioritert"], "HRM", "Bachelorkurs", "Ledelse; Organisasjonsutvikling og Human Resource Management", "Ledelse", "HR og organisasjonsutvikling › HR og personalledelse; Ledelse › Medarbeiderledelse og arbeidsmiljø", "Handler om HR og personalarbeid.", false, "–", false],
  ["HR og organisasjonsutvikling", ["Lagt til ekstra fagområde"], "Ledelse og endring", "Bachelorkurs", "Ledelse", "Ledelse", "HR og organisasjonsutvikling › Endringsledelse; Ledelse › Endringsledelse", "Handler om endring i organisasjoner og rådgivning.", false, "–", false],
  ["HR og organisasjonsutvikling", ["Flyttet til nytt fagområde"], "Organisasjonsatferd og ledelse", "Bachelorkurs", "Markedsføring, kommunikasjon og kultur", "Ledelse", "HR og organisasjonsutvikling › Organisasjonspsykologi; Ledelse › Teamledelse og prestasjon", "Handler om organisasjonspsykologi og atferd i organisasjoner.", false, "–", true],
  ["HR og organisasjonsutvikling", ["Endret navn på fagområde"], "Praktisk HR og ledelse", "Bachelorkurs", "Organisasjonsutvikling og Human Resource Management", "Ledelse", "HR og organisasjonsutvikling › HR og personalledelse; Ledelse › Medarbeiderledelse og arbeidsmiljø", "Handler om HR og personalarbeid.", false, "–", false],
  ["HR og organisasjonsutvikling", ["Endret navn på fagområde"], "Prestasjoner og arbeidsglede", "Bachelorkurs", "Organisasjonsutvikling og Human Resource Management", "Ledelse", "HR og organisasjonsutvikling › Arbeidsmiljø; Ledelse › Teamledelse og prestasjon", "Handler om arbeidsmiljø, trivsel og arbeidsglede.", false, "–", false],
  ["HR og organisasjonsutvikling", ["Lagt til ekstra fagområde"], "Rekruttering og onboarding", "Bachelorkurs", "Ledelse", "Ledelse", "HR og organisasjonsutvikling › HR og personalledelse; Ledelse › Medarbeiderledelse og arbeidsmiljø", "Handler om HR og personalarbeid.", false, "–", false],
  ["HR og organisasjonsutvikling", ["Endret navn på fagområde"], "Kunstig intelligent organisasjonspsykologi", "Master", "Organisasjonsutvikling og Human Resource Management", "KI, digitalisering og analytics", "HR og organisasjonsutvikling › Organisasjonspsykologi; KI, digitalisering og analytics › KI", "Handler om organisasjonspsykologi og atferd i organisasjoner.", false, "–", false],
  ["HR og organisasjonsutvikling", ["1 fagområde prioritert"], "Leadership and Organisational Psychology", "Master", "Ledelse; Organisasjonsutvikling og Human Resource Management", "Ledelse", "HR og organisasjonsutvikling › Organisasjonspsykologi; Ledelse › Teamledelse og prestasjon", "Handler om organisasjonspsykologi og atferd i organisasjoner.", true, "–", false],
  ["HR og organisasjonsutvikling", ["Endret navn på fagområde"], "Arbeidsglede og livskvalitet", "Masterkurs", "Organisasjonsutvikling og Human Resource Management", "Ledelse", "HR og organisasjonsutvikling › Arbeidsmiljø; Ledelse › Medarbeiderledelse og arbeidsmiljø", "Handler om arbeidsmiljø, trivsel og arbeidsglede.", false, "–", false],
  ["HR og organisasjonsutvikling", ["1 fagområde prioritert", "Fagområde fjernet"], "Consulting", "Masterkurs", "Ledelse; Prosjektledelse; Organisasjonsutvikling og Human Resource Management", "Ledelse", "HR og organisasjonsutvikling › Endringsledelse; Ledelse › Endringsledelse", "Rådgivning og endring i organisasjoner, med ledelsesteori.", false, "–", false],
  ["HR og organisasjonsutvikling", ["1 fagområde prioritert"], "Endringsledelse", "Masterkurs", "Ledelse; Organisasjonsutvikling og Human Resource Management", "Ledelse", "HR og organisasjonsutvikling › Endringsledelse; Ledelse › Endringsledelse", "Handler om endring i organisasjoner og rådgivning.", false, "–", false],
  ["HR og organisasjonsutvikling", ["Endret navn på fagområde"], "HMS i et ledelsesperspektiv", "Masterkurs", "Organisasjonsutvikling og Human Resource Management", "Ledelse", "HR og organisasjonsutvikling › Arbeidsmiljø; Ledelse › Medarbeiderledelse og arbeidsmiljø", "Handler om arbeidsmiljø, trivsel og arbeidsglede.", false, "–", false],
  ["HR og organisasjonsutvikling", ["1 fagområde prioritert"], "HRM", "Masterkurs", "Ledelse; Organisasjonsutvikling og Human Resource Management", "Ledelse", "HR og organisasjonsutvikling › HR og personalledelse; Ledelse › Medarbeiderledelse og arbeidsmiljø", "Handler om HR og personalarbeid.", false, "–", false],
  ["HR og organisasjonsutvikling", ["1 fagområde prioritert"], "Helsefremmende ledelse", "Bachelorkurs", "Ledelse; Organisasjonsutvikling og Human Resource Management", "Ledelse", "HR og organisasjonsutvikling › Arbeidsmiljø; Ledelse › Medarbeiderledelse og arbeidsmiljø", "Handler om helsefremmende arbeidsmiljø og sykefravær generelt, ikke ledelse i helsesektoren (kursbeskrivelsen).", false, "–", false],
  ["HR og organisasjonsutvikling", ["1 fagområde prioritert"], "Samspill og ledelse", "Masterkurs", "Ledelse; Organisasjonsutvikling og Human Resource Management", "Ledelse", "HR og organisasjonsutvikling › Organisasjonspsykologi; Ledelse › Teamledelse og prestasjon", "Bygger på organisasjonspsykologi og gruppedynamikk.", false, "–", false],
  ["HR og organisasjonsutvikling", ["1 fagområde prioritert"], "Ytringsklima og ledelse", "Masterkurs", "Ledelse; Organisasjonsutvikling og Human Resource Management", "Ledelse", "HR og organisasjonsutvikling › Arbeidsmiljø; Ledelse › Medarbeiderledelse og arbeidsmiljø", "Handler om psykologisk trygghet og ytringsklima i organisasjoner. Flyttet fra Ledelse, siden temaet er arbeidsmiljøet mer enn lederrollen.", true, "–", false],
  ["Juss, skatt og eiendom", ["Endret navn på fagområde"], "Eiendomsmegling, jus og økonomi", "Bachelor", "Eiendom, varehandel og forretningsjus", "Finans, økonomi og regnskap", "Juss, skatt og eiendom › Eiendomsmegling; Finans, økonomi og regnskap › Bedriftsøkonomi", "Handler om eiendomsmegling og eiendomsjus.", false, "Eiendom", false],
  ["Juss, skatt og eiendom", ["Lagt til ekstra fagområde"], "Forretningsjus og økonomi", "Bachelor", "Finans, økonomi og styring", "Finans, økonomi og regnskap", "Juss, skatt og eiendom › Forretningsjus og rettsvitenskap; Finans, økonomi og regnskap › Bedriftsøkonomi", "Jus er hovedtemaet.", false, "–", false],
  ["Juss, skatt og eiendom", ["Flyttet til nytt fagområde"], "Personvern og GDPR", "Bachelor", "Finans, økonomi og styring", "KI, digitalisering og analytics", "Juss, skatt og eiendom › Compliance; KI, digitalisering og analytics › Ansvarlig KI og personvern", "Handler om etterlevelse av regelverk som hvitvasking, personvern og digital regulering.", false, "–", false],
  ["Juss, skatt og eiendom", ["Endret navn på fagområde"], "Rettsvitenskap", "Bachelor", "Eiendom, varehandel og forretningsjus", "–", "Juss, skatt og eiendom › Forretningsjus og rettsvitenskap", "Jus er hovedtemaet.", false, "–", false],
  ["Juss, skatt og eiendom", ["Manglet fagområde"], "Arbeidsrett: Lover og regulering", "Bachelorkurs", "–", "–", "Juss, skatt og eiendom › Arbeidsrett", "Handler om arbeidsrettslige regler.", false, "–", false],
  ["Juss, skatt og eiendom", ["1 fagområde prioritert"], "Arbeidsrett: Omstilling og nedbemanning", "Bachelorkurs", "Eiendom, varehandel og forretningsjus; Organisasjonsutvikling og Human Resource Management", "HR og organisasjonsutvikling", "Juss, skatt og eiendom › Arbeidsrett; HR og organisasjonsutvikling › HR og personalledelse", "Handler om arbeidsrettslige regler.", false, "–", false],
  ["Juss, skatt og eiendom", ["1 fagområde prioritert", "Fagområde fjernet"], "Foretaksrett", "Bachelorkurs", "Eiendom, varehandel og forretningsjus; Finans, økonomi og styring", "–", "Juss, skatt og eiendom › Forretningsjus og rettsvitenskap", "Jus er hovedtemaet.", false, "–", true],
  ["Juss, skatt og eiendom", ["1 fagområde prioritert", "Fagområde fjernet"], "Forretningsjus", "Bachelorkurs", "Eiendom, varehandel og forretningsjus; Finans, økonomi og styring", "–", "Juss, skatt og eiendom › Forretningsjus og rettsvitenskap", "Jus er hovedtemaet.", false, "–", true],
  ["Juss, skatt og eiendom", ["Endret navn på fagområde"], "Jus og eiendomsmegling", "Bachelorkurs", "Eiendom, varehandel og forretningsjus", "–", "Juss, skatt og eiendom › Eiendomsmegling", "Handler om eiendomsmegling og eiendomsjus.", false, "Eiendom", false],
  ["Juss, skatt og eiendom", ["Manglet fagområde"], "Økonomisk kriminalitet i finansnæringen", "Bachelorkurs", "–", "Finans, økonomi og regnskap", "Juss, skatt og eiendom › Compliance; Finans, økonomi og regnskap › Finansiell kriminalitet og compliance", "Handler om etterlevelse av regelverk som hvitvasking, personvern og digital regulering.", false, "Finansnæringen", false],
  ["Juss, skatt og eiendom", ["1 fagområde prioritert", "Fagområde fjernet"], "Forretningsjus og økonomi", "Master", "Eiendom, varehandel og forretningsjus; Finans, økonomi og styring", "Finans, økonomi og regnskap", "Juss, skatt og eiendom › Forretningsjus og rettsvitenskap; Finans, økonomi og regnskap › Bedriftsøkonomi", "Jus er hovedtemaet.", false, "–", false],
  ["Juss, skatt og eiendom", ["Endret navn på fagområde"], "Rettsvitenskap", "Master", "Eiendom, varehandel og forretningsjus", "–", "Juss, skatt og eiendom › Forretningsjus og rettsvitenskap", "Jus er hovedtemaet.", false, "–", false],
  ["Juss, skatt og eiendom", ["1 fagområde prioritert"], "Arbeidsrett og arbeidsliv", "Masterkurs", "Eiendom, varehandel og forretningsjus; Organisasjonsutvikling og Human Resource Management", "HR og organisasjonsutvikling", "Juss, skatt og eiendom › Arbeidsrett; HR og organisasjonsutvikling › HR og personalledelse", "Handler om arbeidsrettslige regler.", false, "–", false],
  ["Helse, skole og barnehage", ["Flyttet til nytt fagområde"], "Juss for ledere", "Masterkurs", "Offentlig sektor", "Juss, skatt og eiendom; Ledelse", "Helse, skole og barnehage › Skole og barnehage; Juss, skatt og eiendom › Arbeidsrett; Ledelse › Helse-, skole- og barnehageledelse", "Rettet mot ledere i skole og barnehage, med arbeidsrettslig vekt.", false, "Skole og barnehage", false],
  ["Juss, skatt og eiendom", ["Manglet fagområde"], "Regelverk og risikoer", "Kurs uten studiepoeng", "–", "Finans, økonomi og regnskap", "Juss, skatt og eiendom › Compliance; Finans, økonomi og regnskap › Finansiell kriminalitet og compliance", "Handler om etterlevelse av regelverk som hvitvasking, personvern og digital regulering.", false, "Finansnæringen", true],
  ["Juss, skatt og eiendom", ["Manglet fagområde"], "Rettslige rammebetingelser", "Kurs uten studiepoeng", "–", "Strategi, innovasjon og bærekraft", "Juss, skatt og eiendom › Compliance; Strategi, innovasjon og bærekraft › Bærekraft", "Handler om etterlevelse av regelverk som hvitvasking, personvern og digital regulering.", false, "Finansnæringen", true],
  ["Juss, skatt og eiendom", ["Lagt til ekstra fagområde"], "Skatt og avgift", "Bachelorkurs", "Finans, økonomi og styring", "Finans, økonomi og regnskap", "Juss, skatt og eiendom › Skatt og avgift; Finans, økonomi og regnskap › Regnskap og revisjon", "Handler om skatte- og avgiftsregler.", false, "–", true],
  ["Juss, skatt og eiendom", ["Flyttet til nytt fagområde"], "Master of Management med spesialisering i skatte- og avgiftsrett", "Master", "Finans, økonomi og styring", "Ledelse", "Juss, skatt og eiendom › Skatt og avgift; Ledelse › Generell ledelse og lederutdanning", "Handler om skatte- og avgiftsregler.", false, "–", false],
  ["Juss, skatt og eiendom", ["Lagt til ekstra fagområde"], "Merverdiavgift II", "Master", "Finans, økonomi og styring; Offentlig sektor", "Finans, økonomi og regnskap", "Juss, skatt og eiendom › Skatt og avgift; Finans, økonomi og regnskap › Regnskap og revisjon", "Handler om skatte- og avgiftsregler.", false, "–", false],
  ["Juss, skatt og eiendom", ["Lagt til ekstra fagområde"], "Internasjonal skatterett", "Masterkurs", "Finans, økonomi og styring; Offentlig sektor", "Finans, økonomi og regnskap", "Juss, skatt og eiendom › Skatt og avgift; Finans, økonomi og regnskap › Regnskap og revisjon", "Handler om skatte- og avgiftsregler.", false, "–", false],
  ["Juss, skatt og eiendom", ["Lagt til ekstra fagområde"], "Internprising", "Masterkurs", "Finans, økonomi og styring; Offentlig sektor", "Finans, økonomi og regnskap", "Juss, skatt og eiendom › Skatt og avgift; Finans, økonomi og regnskap › Regnskap og revisjon", "Handler om skatte- og avgiftsregler.", false, "–", false],
  ["Juss, skatt og eiendom", ["Lagt til ekstra fagområde"], "Merverdiavgift", "Masterkurs", "Finans, økonomi og styring; Offentlig sektor", "Finans, økonomi og regnskap", "Juss, skatt og eiendom › Skatt og avgift; Finans, økonomi og regnskap › Regnskap og revisjon", "Handler om skatte- og avgiftsregler.", false, "–", false],
  ["Juss, skatt og eiendom", ["Lagt til ekstra fagområde"], "Selskaps- og næringsbeskatning I", "Masterkurs", "Finans, økonomi og styring; Offentlig sektor", "Finans, økonomi og regnskap", "Juss, skatt og eiendom › Skatt og avgift; Finans, økonomi og regnskap › Regnskap og revisjon", "Handler om skatte- og avgiftsregler.", false, "–", false],
  ["Juss, skatt og eiendom", ["Lagt til ekstra fagområde"], "Skatteprosess", "Masterkurs", "Finans, økonomi og styring; Offentlig sektor", "Finans, økonomi og regnskap", "Juss, skatt og eiendom › Skatt og avgift; Finans, økonomi og regnskap › Regnskap og revisjon", "Handler om skatte- og avgiftsregler.", false, "–", false],
  ["Juss, skatt og eiendom", ["Lagt til ekstra fagområde"], "Digital Compliance", "Bachelorkurs", "Finans, økonomi og styring; Digitalisering og Analytics", "KI, digitalisering og analytics", "Juss, skatt og eiendom › Compliance; KI, digitalisering og analytics › Digital transformasjon", "Handler om lover og forskrifter (GDPR, IT-kontrakter, opphavsrett), ikke finansiell styring.", false, "–", false],
  ["Juss, skatt og eiendom", ["Manglet fagområde"], "Risikobasert tilnærming", "Kurs uten studiepoeng", "–", "Finans, økonomi og regnskap", "Juss, skatt og eiendom › Compliance; Finans, økonomi og regnskap › Finansiell kriminalitet og compliance", "Handler om hvitvaskingsloven og compliance. Flyttet fra Finans, og søsterkurs ligger i Juss.", false, "Finansnæringen", false],
  ["Juss, skatt og eiendom", ["Manglet fagområde"], "Utvalgte praktiske problemstillinger", "Årsenhet", "–", "Finans, økonomi og regnskap", "Juss, skatt og eiendom › Compliance; Finans, økonomi og regnskap › Finansiell kriminalitet og compliance", "Handler om hvitvaskingsloven, taushetsplikt og tilsyn.", false, "Finansnæringen", false],
  ["Juss, skatt og eiendom", ["Lagt til ekstra fagområde"], "Markedsrett og etikk", "Bachelorkurs", "Finans, økonomi og styring; Markedsføring, kommunikasjon og kultur", "Markedsføring, kommunikasjon og kultur", "Juss, skatt og eiendom › Forretningsjus og rettsvitenskap; Markedsføring, kommunikasjon og kultur › Markedsføring", "Juridisk rammeverk (avtalerett, kjøpsrett, markedsføringsloven).", false, "–", true],
  ["KI, digitalisering og analytics", ["Endret navn på fagområde"], "Bachelor of Data Science for Business", "Bachelor", "Digitalisering og Analytics", "–", "KI, digitalisering og analytics › Data science og analytics", "Handler om dataanalyse, data science og maskinlæring.", false, "–", false],
  ["KI, digitalisering og analytics", ["1 fagområde prioritert", "Fagområde fjernet"], "Digital Business", "Bachelor", "Finans, økonomi og styring; Digitalisering og Analytics; Internasjonal Business", "–", "KI, digitalisering og analytics › Digital transformasjon", "Handler om digitalisering og digital transformasjon.", false, "–", false],
  ["KI, digitalisering og analytics", ["Manglet fagområde"], "AI i finansnæringen", "Bachelorkurs", "–", "Finans, økonomi og regnskap", "KI, digitalisering og analytics › KI; Finans, økonomi og regnskap › Fintech", "Handler om kunstig intelligens, maskinlæring og bruken av dem.", true, "Finansnæringen", false],
  ["KI, digitalisering og analytics", ["Manglet fagområde"], "Bachelor digital transformasjon", "Bachelorkurs", "–", "Finans, økonomi og regnskap", "KI, digitalisering og analytics › Digital transformasjon; Finans, økonomi og regnskap › Fintech", "Handler om digitalisering og digital transformasjon.", false, "Finansnæringen", false],
  ["KI, digitalisering og analytics", ["Flyttet til nytt fagområde"], "Kunstig intelligens for økt produktivitet", "Bachelorkurs", "Ledelse", "–", "KI, digitalisering og analytics › KI", "Handler om kunstig intelligens, maskinlæring og bruken av dem.", false, "–", false],
  ["KI, digitalisering og analytics", ["Endret navn på fagområde"], "Kunstig intelligens i praksis", "Bachelorkurs", "Digitalisering og Analytics", "–", "KI, digitalisering og analytics › KI", "Handler om kunstig intelligens, maskinlæring og bruken av dem.", false, "–", false],
  ["Markedsføring, kommunikasjon og kultur", ["Lagt til ekstra fagområde"], "Kvalitativ metode: Dypere innsikt", "Bachelorkurs", "Digitalisering og Analytics", "KI, digitalisering og analytics", "Markedsføring, kommunikasjon og kultur › Kunde- og markedsinnsikt; KI, digitalisering og analytics › Statistikk og metode", "Metodekurs for innsikt i kunder og marked.", false, "–", true],
  ["KI, digitalisering og analytics", ["Manglet fagområde"], "Maskinlæring og anvendelser i finansnæringen", "Bachelorkurs", "–", "Finans, økonomi og regnskap", "KI, digitalisering og analytics › KI; Finans, økonomi og regnskap › Fintech", "Handler om kunstig intelligens, maskinlæring og bruken av dem.", true, "Finansnæringen", false],
  ["Markedsføring, kommunikasjon og kultur", ["Lagt til ekstra fagområde"], "Metode og innsikt", "Bachelorkurs", "Digitalisering og Analytics", "KI, digitalisering og analytics", "Markedsføring, kommunikasjon og kultur › Kunde- og markedsinnsikt; KI, digitalisering og analytics › Statistikk og metode", "Metodekurs for innsikt i kunder og marked.", false, "–", true],
  ["KI, digitalisering og analytics", ["1 fagområde prioritert", "Fagområde fjernet"], "Metode og statistisk dataanalyse", "Bachelorkurs", "Finans, økonomi og styring; Digitalisering og Analytics", "–", "KI, digitalisering og analytics › Statistikk og metode", "Handler om statistikk og forskningsmetode.", false, "–", true],
  ["KI, digitalisering og analytics", ["1 fagområde prioritert", "Fagområde fjernet"], "Statistikk", "Bachelorkurs", "Finans, økonomi og styring; Digitalisering og Analytics", "–", "KI, digitalisering og analytics › Statistikk og metode", "Handler om statistikk og forskningsmetode.", false, "–", true],
  ["KI, digitalisering og analytics", ["1 fagområde prioritert"], "Statistikk for økonomer", "Bachelorkurs", "Finans, økonomi og styring; Digitalisering og Analytics", "Finans, økonomi og regnskap", "KI, digitalisering og analytics › Statistikk og metode; Finans, økonomi og regnskap › Samfunnsøkonomi, økonomisk teori og matematikk", "Handler om statistikk og forskningsmetode.", false, "–", true],
  ["KI, digitalisering og analytics", ["Endret navn på fagområde"], "Verdiskaping med KI", "Bachelorkurs", "Digitalisering og Analytics", "–", "KI, digitalisering og analytics › KI", "Handler om kunstig intelligens, maskinlæring og bruken av dem.", false, "–", false],
  ["KI, digitalisering og analytics", ["Endret navn på fagområde"], "Business Analytics", "Master", "Digitalisering og Analytics", "–", "KI, digitalisering og analytics › Data science og analytics", "Handler om dataanalyse, data science og maskinlæring.", false, "–", false],
  ["KI, digitalisering og analytics", ["Endret navn på fagområde"], "Data Science for Business", "Master", "Digitalisering og Analytics", "–", "KI, digitalisering og analytics › Data science og analytics", "Handler om dataanalyse, data science og maskinlæring.", false, "–", false],
  ["KI, digitalisering og analytics", ["1 fagområde prioritert", "Fagområde fjernet"], "AI for Strategic Marketing Leadership", "Masterkurs", "Strategi, innovasjon og bærekraft; Digitalisering og Analytics", "Ledelse; Markedsføring, kommunikasjon og kultur", "KI, digitalisering og analytics › KI; Ledelse › Generell ledelse og lederutdanning; Markedsføring, kommunikasjon og kultur › Markedsføring", "Handler om kunstig intelligens, maskinlæring og bruken av dem.", false, "–", false],
  ["KI, digitalisering og analytics", ["1 fagområde prioritert"], "Analytics and AI for Strategic Management", "Masterkurs", "Strategi, innovasjon og bærekraft; Digitalisering og Analytics", "Strategi, innovasjon og bærekraft; Ledelse", "KI, digitalisering og analytics › Data science og analytics; Strategi, innovasjon og bærekraft › Strategi; Ledelse › Strategisk ledelse", "Handler om dataanalyse, data science og maskinlæring.", true, "–", false],
  ["KI, digitalisering og analytics", ["1 fagområde prioritert", "Fagområde fjernet"], "Corporate Business Analytics", "Masterkurs", "Finans, økonomi og styring; Digitalisering og Analytics", "–", "KI, digitalisering og analytics › Data science og analytics", "Handler om dataanalyse, data science og maskinlæring.", false, "–", false],
  ["KI, digitalisering og analytics", ["Endret navn på fagområde"], "Digitalisering, personvern og kunstig intelligens", "Masterkurs", "Digitalisering og Analytics", "Juss, skatt og eiendom", "KI, digitalisering og analytics › Ansvarlig KI og personvern; Juss, skatt og eiendom › Compliance", "Handler om etikk, regulering og personvern i KI.", true, "–", false],
  ["KI, digitalisering og analytics", ["1 fagområde prioritert", "Fagområde fjernet"], "Generative AI for Business", "Masterkurs", "Strategi, innovasjon og bærekraft; Digitalisering og Analytics", "–", "KI, digitalisering og analytics › KI", "Handler om kunstig intelligens, maskinlæring og bruken av dem.", false, "–", false],
  ["KI, digitalisering og analytics", ["Manglet fagområde"], "Master digital transformasjon", "Masterkurs", "–", "–", "KI, digitalisering og analytics › Digital transformasjon", "Handler om digitalisering og digital transformasjon.", false, "Finansnæringen", false],
  ["KI, digitalisering og analytics", ["1 fagområde prioritert", "Fagområde fjernet"], "Responsible AI Leadership", "Masterkurs", "Eiendom, varehandel og forretningsjus; Finans, økonomi og styring; Digitalisering og Analytics", "Ledelse; Juss, skatt og eiendom", "KI, digitalisering og analytics › Ansvarlig KI og personvern; Ledelse › Generell ledelse og lederutdanning; Juss, skatt og eiendom › Compliance", "Handler om etikk, regulering og personvern i KI.", true, "–", false],
  ["KI, digitalisering og analytics", ["Manglet fagområde"], "Digital transformasjon i finansnæringen", "Kurs uten studiepoeng", "–", "Finans, økonomi og regnskap", "KI, digitalisering og analytics › Digital transformasjon; Finans, økonomi og regnskap › Fintech", "Handler om digitalisering og digital transformasjon.", false, "Finansnæringen", true],
  ["KI, digitalisering og analytics", ["Manglet fagområde"], "Grunnleggende teknologiforståelse", "Kurs uten studiepoeng", "–", "Finans, økonomi og regnskap", "KI, digitalisering og analytics › KI; Finans, økonomi og regnskap › Fintech", "Innholdet er maskinlæring og AI, anvendt i finansnæringen.", true, "Finansnæringen", false],
  ["KI, digitalisering og analytics", ["Manglet fagområde"], "Etikk og regulering i AI", "Årsenhet", "–", "Juss, skatt og eiendom", "KI, digitalisering og analytics › Ansvarlig KI og personvern; Juss, skatt og eiendom › Compliance", "Handler om etikk, regulering og personvern i KI.", true, "Finansnæringen", false],
  ["KI, digitalisering og analytics", ["Endret navn på fagområde"], "Prototyping med KI", "Årsenhet", "Digitalisering og Analytics", "–", "KI, digitalisering og analytics › KI", "Handler om kunstig intelligens, maskinlæring og bruken av dem.", false, "–", false],
  ["KI, digitalisering og analytics", ["Manglet fagområde"], "Data and Decision Science", "PhD", "–", "–", "KI, digitalisering og analytics › Data science og analytics", "Handler om dataanalyse, data science og maskinlæring.", false, "–", false],
  ["Ledelse", ["1 fagområde prioritert"], "Effektive team", "Bachelorkurs", "Ledelse; Organisasjonsutvikling og Human Resource Management", "HR og organisasjonsutvikling", "Ledelse › Teamledelse og prestasjon; HR og organisasjonsutvikling › Organisasjonspsykologi", "Handler om team, tillit og konflikthåndtering på arbeidsplassen. Flyttet fra HR og organisasjonsutvikling, siden team og prestasjon nå eies av Ledelse.", true, "–", false],
  ["Ledelse", ["1 fagområde prioritert", "Fagområde fjernet"], "Forhandling og forhandlingsteknikk", "Bachelorkurs", "Ledelse; Organisasjonsutvikling og Human Resource Management", "–", "Ledelse › Lederferdigheter og kommunikasjon", "Handler om forhandling som lederferdighet. Flyttet fra HR og organisasjonsutvikling, siden påvirkning og forhandling nå eies av Ledelse.", true, "–", false],
  ["Ledelse", ["1 fagområde prioritert"], "Prestasjonsledelse", "Bachelorkurs", "Ledelse; Organisasjonsutvikling og Human Resource Management", "HR og organisasjonsutvikling", "Ledelse › Teamledelse og prestasjon; HR og organisasjonsutvikling › HR og personalledelse", "Handler om å motivere og utvikle medarbeidere med styrkebasert ledelse. Flyttet fra HR og organisasjonsutvikling, siden team og prestasjon nå eies av Ledelse.", true, "–", false],
  ["Ledelse", ["Uendret"], "Bachelor in Management", "Bachelor", "Ledelse", "–", "Ledelse › Generell ledelse og lederutdanning", "Handler om lederskap og lederrollen.", false, "–", false],
  ["Ledelse", ["Flyttet til nytt fagområde"], "Effektiv og bærekraftig prosjektpraksis", "Bachelorkurs", "Prosjektledelse", "Strategi, innovasjon og bærekraft", "Ledelse › Prosjektledelse; Strategi, innovasjon og bærekraft › Bærekraft", "Handler om prosjektpraksis.", false, "–", false],
  ["Ledelse", ["Uendret"], "Grunnutdanning i ledelse", "Bachelorkurs", "Ledelse", "–", "Ledelse › Generell ledelse og lederutdanning", "Handler om lederskap og lederrollen.", true, "–", false],
  ["Ledelse", ["Uendret"], "Grunnutdanning i ledelse – nettstudium", "Bachelorkurs", "Ledelse", "–", "Ledelse › Generell ledelse og lederutdanning", "Handler om lederskap og lederrollen.", true, "–", true],
  ["Ledelse", ["Uendret"], "Leadership in Action", "Bachelorkurs", "Ledelse", "–", "Ledelse › Lederferdigheter og kommunikasjon", "Handler om lederskap og lederrollen.", true, "–", false],
  ["Ledelse", ["Uendret"], "Ledelse i teori og praksis", "Bachelorkurs", "Ledelse", "–", "Ledelse › Generell ledelse og lederutdanning", "Handler om lederskap og lederrollen.", true, "–", false],
  ["Ledelse", ["Uendret"], "Ledertrening, personlig utvikling og coaching", "Bachelorkurs", "Ledelse", "–", "Ledelse › Lederferdigheter og kommunikasjon", "Handler om lederskap og lederrollen.", false, "–", false],
  ["Ledelse", ["Uendret"], "Nye forventninger til ledelse", "Bachelorkurs", "Ledelse", "–", "Ledelse › Generell ledelse og lederutdanning", "Handler om lederskap og lederrollen.", false, "–", false],
  ["Ledelse", ["1 fagområde prioritert"], "Prosjektledelse", "Bachelorkurs", "Ledelse; Prosjektledelse", "–", "Ledelse › Prosjektledelse", "Handler om å lede prosjekter.", false, "–", false],
  ["Ledelse", ["Manglet fagområde"], "Prosjektledelse", "Bachelorkurs", "–", "–", "Ledelse › Prosjektledelse", "Handler om å lede prosjekter.", false, "–", true],
  ["Ledelse", ["1 fagområde prioritert"], "Prosjektlederskap, prosjektteam og smidighet", "Bachelorkurs", "Ledelse; Prosjektledelse", "–", "Ledelse › Prosjektledelse", "Handler om å lede prosjekter.", false, "–", false],
  ["Ledelse", ["1 fagområde prioritert"], "Verdiskapende prosjektledelse", "Bachelorkurs", "Ledelse; Prosjektledelse", "–", "Ledelse › Prosjektledelse", "Handler om å lede prosjekter.", false, "–", false],
  ["Ledelse", ["1 fagområde prioritert", "Fagområde fjernet"], "Executive MBA", "Master", "Ledelse; Strategi, innovasjon og bærekraft; Internasjonal Business", "Strategi, innovasjon og bærekraft; Finans, økonomi og regnskap", "Ledelse › Generell ledelse og lederutdanning; Strategi, innovasjon og bærekraft › Strategi; Finans, økonomi og regnskap › Bedriftsøkonomi", "Handler om lederskap og lederrollen.", false, "–", false],
  ["Finans, økonomi og regnskap", ["Lagt til ekstra fagområde"], "Major in Leadership, Change and Analytics", "Master", "Ledelse; Organisasjonsutvikling og Human Resource Management", "Ledelse; HR og organisasjonsutvikling; KI, digitalisering og analytics", "Finans, økonomi og regnskap › Bedriftsøkonomi; Ledelse › Endringsledelse; HR og organisasjonsutvikling › Endringsledelse; KI, digitalisering og analytics › Data science og analytics", "Major i Master in Business, plassert sammen med selve graden og Siviløkonom.", true, "–", false],
  ["Ledelse", ["Uendret"], "Master of Management", "Master", "Ledelse", "Strategi, innovasjon og bærekraft; Finans, økonomi og regnskap", "Ledelse › Generell ledelse og lederutdanning; Strategi, innovasjon og bærekraft › Strategi; Finans, økonomi og regnskap › Bedriftsøkonomi", "Handler om lederskap og lederrollen.", false, "–", false],
  ["Ledelse", ["1 fagområde prioritert", "Fagområde fjernet"], "Effektiv ledelse, påvirkning og innflytelse", "Masterkurs", "Ledelse; Organisasjonsutvikling og Human Resource Management", "–", "Ledelse › Lederferdigheter og kommunikasjon", "Handler om lederens kommunikasjon, påvirkning og forhandling.", false, "–", false],
  ["Ledelse", ["1 fagområde prioritert", "Fagområde fjernet"], "Ledelse; makt og mening", "Masterkurs", "Ledelse; Prosjektledelse", "–", "Ledelse › Lederferdigheter og kommunikasjon", "Handler om lederskap og lederrollen.", false, "–", false],
  ["Ledelse", ["1 fagområde prioritert"], "Lederskap i uforutsigbare omgivelser", "Masterkurs", "Ledelse; Organisasjonsutvikling og Human Resource Management", "HR og organisasjonsutvikling", "Ledelse › Lederferdigheter og kommunikasjon; HR og organisasjonsutvikling › Endringsledelse", "Handler om lederskap og lederrollen.", false, "–", false],
  ["Ledelse", ["Uendret"], "Prestasjoner og utviklingsledelse", "Masterkurs", "Ledelse", "HR og organisasjonsutvikling", "Ledelse › Teamledelse og prestasjon; HR og organisasjonsutvikling › HR og personalledelse", "Handler om å lede team og prestasjoner.", false, "–", false],
  ["Ledelse", ["Manglet fagområde"], "Prosjektledelse", "Masterkurs", "–", "–", "Ledelse › Prosjektledelse", "Handler om å lede prosjekter.", false, "–", false],
  ["Ledelse", ["Uendret"], "Teamledelse", "Masterkurs", "Ledelse", "HR og organisasjonsutvikling", "Ledelse › Teamledelse og prestasjon; HR og organisasjonsutvikling › Organisasjonspsykologi", "Handler om å lede team og prestasjoner.", false, "–", false],
  ["Ledelse", ["1 fagområde prioritert"], "Tilstedeværende ledelse", "Masterkurs", "Ledelse; Organisasjonsutvikling og Human Resource Management", "HR og organisasjonsutvikling", "Ledelse › Lederferdigheter og kommunikasjon; HR og organisasjonsutvikling › Organisasjonspsykologi", "Handler om lederskap og lederrollen.", false, "–", false],
  ["Ledelse", ["Uendret"], "Årsenhet i ledelse", "Årsenhet", "Ledelse", "–", "Ledelse › Generell ledelse og lederutdanning", "Handler om lederskap og lederrollen.", false, "–", false],
  ["Ledelse", ["1 fagområde prioritert"], "Ledelse og organisasjon", "PhD", "Ledelse; Organisasjonsutvikling og Human Resource Management", "HR og organisasjonsutvikling", "Ledelse › Generell ledelse og lederutdanning; HR og organisasjonsutvikling › Organisasjonspsykologi", "Handler om lederskap og lederrollen.", false, "–", false],
  ["Ledelse", ["1 fagområde prioritert", "Fagområde fjernet"], "Multicultural Leadership", "Masterkurs", "Ledelse; Strategi, innovasjon og bærekraft; Internasjonal Business", "Markedsføring, kommunikasjon og kultur", "Ledelse › Lederferdigheter og kommunikasjon; Markedsføring, kommunikasjon og kultur › Kultur og internasjonal business", "Handler om lederskap og lederrollen.", false, "–", false],
  ["Ledelse", ["1 fagområde prioritert", "Fagområde fjernet"], "Ledelse i vår tid for finansnæringen", "Masterkurs", "Finans, økonomi og styring; Ledelse", "–", "Ledelse › Generell ledelse og lederutdanning", "Handler om lederrollen og selvinnsikt, ikke finans.", false, "Finansnæringen", false],
  ["Ledelse", ["1 fagområde prioritert", "Fagområde fjernet"], "Leading in the Age of AI", "Masterkurs", "Ledelse; Strategi, innovasjon og bærekraft; Organisasjonsutvikling og Human Resource Management; Digitalisering og Analytics", "KI, digitalisering og analytics", "Ledelse › Generell ledelse og lederutdanning; KI, digitalisering og analytics › KI", "Lederrollen i møte med KI er hovedtemaet.", true, "–", false],
  ["Helse, skole og barnehage", ["Flyttet til nytt fagområde"], "Ledelse av tjenesteutvikling", "Masterkurs", "Offentlig sektor", "Ledelse", "Helse, skole og barnehage › Helse; Ledelse › Helse-, skole- og barnehageledelse", "Ledelse av tjenesteutvikling i helsesektoren.", false, "Helse og omsorg", false],
  ["Ledelse", ["1 fagområde prioritert", "Fagområde fjernet"], "Kommunikasjon for ledere og organisasjoner", "Bachelorkurs", "Ledelse; Markedsføring, kommunikasjon og kultur; Organisasjonsutvikling og Human Resource Management", "Markedsføring, kommunikasjon og kultur", "Ledelse › Lederferdigheter og kommunikasjon; Markedsføring, kommunikasjon og kultur › Kommunikasjon", "Handler om kommunikasjon for ledere og organisasjoner. Flyttet fra Markedsføring, kommunikasjon og kultur, siden Ledelse eier kommunikasjon for ledere.", true, "–", true],
  ["Ledelse", ["1 fagområde prioritert", "Fagområde fjernet"], "Muntlig gjennomslag for ledere", "Bachelorkurs", "Ledelse; Markedsføring, kommunikasjon og kultur; Organisasjonsutvikling og Human Resource Management", "Markedsføring, kommunikasjon og kultur", "Ledelse › Lederferdigheter og kommunikasjon; Markedsføring, kommunikasjon og kultur › Kommunikasjon", "Handler om muntlig gjennomslag og kommunikasjon for ledere. Flyttet fra Markedsføring, kommunikasjon og kultur, siden Ledelse eier kommunikasjon for ledere.", true, "–", false],
  ["Ledelse", ["Lagt til ekstra fagområde"], "Retorikk, kommunikasjon og ledelse", "Bachelorkurs", "Markedsføring, kommunikasjon og kultur", "Markedsføring, kommunikasjon og kultur", "Ledelse › Lederferdigheter og kommunikasjon; Markedsføring, kommunikasjon og kultur › Kommunikasjon", "Handler om retorikk og kommunikasjon i lederrollen. Flyttet fra Markedsføring, kommunikasjon og kultur, siden Ledelse eier kommunikasjon for ledere.", true, "–", false],
  ["Markedsføring, kommunikasjon og kultur", ["Manglet fagområde"], "Bachelor i markedsføringsledelse, 3. studieår", "–", "–", "Ledelse", "Markedsføring, kommunikasjon og kultur › Markedsføring; Ledelse › Generell ledelse og lederutdanning", "Handler om markedsføring, fra merkevare og strategi til digitale kanaler.", true, "–", false],
  ["Markedsføring, kommunikasjon og kultur", ["Manglet fagområde"], "Markedskandidat", "–", "–", "–", "Markedsføring, kommunikasjon og kultur › Markedsføring", "Handler om markedsføring, fra merkevare og strategi til digitale kanaler.", true, "–", false],
  ["Markedsføring, kommunikasjon og kultur", ["Uendret"], "Digital kommunikasjon og markedsføring", "Bachelor", "Markedsføring, kommunikasjon og kultur", "KI, digitalisering og analytics", "Markedsføring, kommunikasjon og kultur › Markedsføring; KI, digitalisering og analytics › Digital transformasjon", "Handler om markedsføring, fra merkevare og strategi til digitale kanaler.", true, "–", false],
  ["Markedsføring, kommunikasjon og kultur", ["Uendret"], "Markedsføringsledelse", "Bachelor", "Markedsføring, kommunikasjon og kultur", "Ledelse", "Markedsføring, kommunikasjon og kultur › Markedsføring; Ledelse › Generell ledelse og lederutdanning", "Handler om markedsføring, fra merkevare og strategi til digitale kanaler.", true, "–", false],
  ["Markedsføring, kommunikasjon og kultur", ["Lagt til ekstra fagområde"], "Markedsøkonomi", "Bachelor/Årsenhet", "Finans, økonomi og styring", "Finans, økonomi og regnskap", "Markedsføring, kommunikasjon og kultur › Markedsføring; Finans, økonomi og regnskap › Samfunnsøkonomi, økonomisk teori og matematikk", "Handler om markedsføring, fra merkevare og strategi til digitale kanaler.", true, "–", true],
  ["Markedsføring, kommunikasjon og kultur", ["1 fagområde prioritert", "Fagområde fjernet"], "Business Communication: Culture and Ethics", "Bachelorkurs", "Markedsføring, kommunikasjon og kultur; Internasjonal Business", "–", "Markedsføring, kommunikasjon og kultur › Kultur og internasjonal business", "Handler om kultur eller har internasjonal vinkling.", false, "–", true],
  ["Markedsføring, kommunikasjon og kultur", ["Uendret"], "Digital Marketing Management", "Bachelorkurs", "Markedsføring, kommunikasjon og kultur", "KI, digitalisering og analytics; Ledelse", "Markedsføring, kommunikasjon og kultur › Markedsføring; KI, digitalisering og analytics › Digital transformasjon; Ledelse › Generell ledelse og lederutdanning", "Handler om markedsføring, fra merkevare og strategi til digitale kanaler.", false, "–", false],
  ["Markedsføring, kommunikasjon og kultur", ["Uendret"], "Digital Marketing Tools and AI", "Bachelorkurs", "Markedsføring, kommunikasjon og kultur", "KI, digitalisering og analytics", "Markedsføring, kommunikasjon og kultur › Markedsføring; KI, digitalisering og analytics › KI", "Handler om markedsføring, fra merkevare og strategi til digitale kanaler.", false, "–", true],
  ["Markedsføring, kommunikasjon og kultur", ["Uendret"], "Forbrukerpsykologi", "Bachelorkurs", "Markedsføring, kommunikasjon og kultur", "–", "Markedsføring, kommunikasjon og kultur › Kunde- og markedsinnsikt", "Handler om markedsinnsikt: kunder, forbrukeratferd og markedsanalyse.", false, "–", true],
  ["Markedsføring, kommunikasjon og kultur", ["Uendret"], "KI i markedsføring", "Bachelorkurs", "Markedsføring, kommunikasjon og kultur", "KI, digitalisering og analytics", "Markedsføring, kommunikasjon og kultur › Markedsføring; KI, digitalisering og analytics › KI", "Handler om markedsføring, fra merkevare og strategi til digitale kanaler.", false, "–", true],
  ["Markedsføring, kommunikasjon og kultur", ["Uendret"], "Kunderelasjoner på bedriftsmarkedet", "Bachelorkurs", "Markedsføring, kommunikasjon og kultur", "–", "Markedsføring, kommunikasjon og kultur › Kunde- og markedsinnsikt", "Handler om markedsinnsikt: kunder, forbrukeratferd og markedsanalyse.", false, "–", true],
  ["Markedsføring, kommunikasjon og kultur", ["Uendret"], "Markedsføring", "Bachelorkurs", "Markedsføring, kommunikasjon og kultur", "–", "Markedsføring, kommunikasjon og kultur › Markedsføring", "Handler om markedsføring, fra merkevare og strategi til digitale kanaler.", false, "–", true],
  ["Markedsføring, kommunikasjon og kultur", ["Uendret"], "Markedsføring og kunderelasjoner", "Bachelorkurs", "Markedsføring, kommunikasjon og kultur", "–", "Markedsføring, kommunikasjon og kultur › Kunde- og markedsinnsikt", "Handler om markedsinnsikt: kunder, forbrukeratferd og markedsanalyse.", false, "–", true],
  ["Markedsføring, kommunikasjon og kultur", ["1 fagområde prioritert", "Fagområde fjernet"], "Markedsføringsledelse og strategi", "Bachelorkurs", "Finans, økonomi og styring; Markedsføring, kommunikasjon og kultur; Strategi, innovasjon og bærekraft", "Strategi, innovasjon og bærekraft; Ledelse", "Markedsføring, kommunikasjon og kultur › Markedsføring; Strategi, innovasjon og bærekraft › Strategi; Ledelse › Strategisk ledelse", "Handler om markedsføring, fra merkevare og strategi til digitale kanaler.", true, "–", false],
  ["Markedsføring, kommunikasjon og kultur", ["Uendret"], "Markedsføringsledelse og strategi", "Bachelorkurs", "Markedsføring, kommunikasjon og kultur", "Strategi, innovasjon og bærekraft; Ledelse", "Markedsføring, kommunikasjon og kultur › Markedsføring; Strategi, innovasjon og bærekraft › Strategi; Ledelse › Strategisk ledelse", "Handler om markedsføring, fra merkevare og strategi til digitale kanaler.", true, "–", true],
  ["Markedsføring, kommunikasjon og kultur", ["1 fagområde prioritert"], "Marketing Analytics", "Bachelorkurs", "Markedsføring, kommunikasjon og kultur; Digitalisering og Analytics", "KI, digitalisering og analytics", "Markedsføring, kommunikasjon og kultur › Kunde- og markedsinnsikt; KI, digitalisering og analytics › Data science og analytics", "Handler om markedsinnsikt: kunder, forbrukeratferd og markedsanalyse.", true, "–", true],
  ["Markedsføring, kommunikasjon og kultur", ["1 fagområde prioritert", "Fagområde fjernet"], "Marketing Communication", "Bachelorkurs", "Markedsføring, kommunikasjon og kultur; Strategi, innovasjon og bærekraft", "–", "Markedsføring, kommunikasjon og kultur › Kommunikasjon", "Handler om kommunikasjon, retorikk og presentasjon.", false, "–", true],
  ["Markedsføring, kommunikasjon og kultur", ["1 fagområde prioritert", "Fagområde fjernet"], "Merkevareledelse", "Bachelorkurs", "Markedsføring, kommunikasjon og kultur; Strategi, innovasjon og bærekraft", "Ledelse", "Markedsføring, kommunikasjon og kultur › Markedsføring; Ledelse › Generell ledelse og lederutdanning", "Handler om markedsføring, fra merkevare og strategi til digitale kanaler.", false, "–", true],
  ["Markedsføring, kommunikasjon og kultur", ["Uendret"], "BI–Luiss Joint Master in Marketing", "Master", "Markedsføring, kommunikasjon og kultur", "–", "Markedsføring, kommunikasjon og kultur › Markedsføring", "Handler om markedsføring, fra merkevare og strategi til digitale kanaler.", true, "–", false],
  ["Markedsføring, kommunikasjon og kultur", ["1 fagområde prioritert", "Fagområde fjernet"], "Business Communication", "Master", "Ledelse; Markedsføring, kommunikasjon og kultur; Digitalisering og Analytics", "–", "Markedsføring, kommunikasjon og kultur › Kommunikasjon", "Handler om kommunikasjon, retorikk og presentasjon.", false, "–", false],
  ["Finans, økonomi og regnskap", ["Lagt til ekstra fagområde"], "Major in Marketing", "Master", "Markedsføring, kommunikasjon og kultur", "Markedsføring, kommunikasjon og kultur", "Finans, økonomi og regnskap › Bedriftsøkonomi; Markedsføring, kommunikasjon og kultur › Markedsføring", "Major i Master in Business, plassert sammen med selve graden og Siviløkonom.", true, "–", false],
  ["Markedsføring, kommunikasjon og kultur", ["Uendret"], "Strategic Marketing Management", "Master", "Markedsføring, kommunikasjon og kultur", "Strategi, innovasjon og bærekraft; Ledelse", "Markedsføring, kommunikasjon og kultur › Markedsføring; Strategi, innovasjon og bærekraft › Strategi; Ledelse › Strategisk ledelse", "Handler om markedsføring, fra merkevare og strategi til digitale kanaler.", true, "–", false],
  ["Markedsføring, kommunikasjon og kultur", ["Lagt til ekstra fagområde"], "Customer and Market analytics", "Masterkurs", "Digitalisering og Analytics", "KI, digitalisering og analytics", "Markedsføring, kommunikasjon og kultur › Kunde- og markedsinnsikt; KI, digitalisering og analytics › Data science og analytics", "Handler om markedsinnsikt: kunder, forbrukeratferd og markedsanalyse.", true, "–", false],
  ["Markedsføring, kommunikasjon og kultur", ["1 fagområde prioritert", "Fagområde fjernet"], "Markedsstrategi - innsikt, posisjonering og vekst", "Masterkurs", "Markedsføring, kommunikasjon og kultur; Strategi, innovasjon og bærekraft; Digitalisering og Analytics", "Strategi, innovasjon og bærekraft", "Markedsføring, kommunikasjon og kultur › Markedsføring; Strategi, innovasjon og bærekraft › Strategi", "Handler om markedsføring, fra merkevare og strategi til digitale kanaler.", true, "–", false],
  ["Markedsføring, kommunikasjon og kultur", ["Uendret"], "Strategisk historiefortelling", "Masterkurs", "Markedsføring, kommunikasjon og kultur", "–", "Markedsføring, kommunikasjon og kultur › Kommunikasjon", "Handler om kommunikasjon, retorikk og presentasjon.", false, "–", false],
  ["Markedsføring, kommunikasjon og kultur", ["1 fagområde prioritert", "Fagområde fjernet"], "Strategisk kommunikasjon", "Masterkurs", "Markedsføring, kommunikasjon og kultur; Strategi, innovasjon og bærekraft", "–", "Markedsføring, kommunikasjon og kultur › Kommunikasjon", "Handler om kommunikasjon, retorikk og presentasjon.", false, "–", false],
  ["Markedsføring, kommunikasjon og kultur", ["Uendret"], "Kommunikasjon", "PhD", "Markedsføring, kommunikasjon og kultur", "–", "Markedsføring, kommunikasjon og kultur › Kommunikasjon", "Handler om kommunikasjon, retorikk og presentasjon.", false, "–", false],
  ["Markedsføring, kommunikasjon og kultur", ["Uendret"], "Markedsføring", "PhD", "Markedsføring, kommunikasjon og kultur", "–", "Markedsføring, kommunikasjon og kultur › Markedsføring", "Handler om markedsføring, fra merkevare og strategi til digitale kanaler.", true, "–", false],
  ["Markedsføring, kommunikasjon og kultur", ["Uendret"], "International Management", "Bachelor", "Markedsføring, kommunikasjon og kultur", "Ledelse", "Markedsføring, kommunikasjon og kultur › Kultur og internasjonal business; Ledelse › Generell ledelse og lederutdanning", "Handler om kultur eller har internasjonal vinkling.", false, "–", false],
  ["Markedsføring, kommunikasjon og kultur", ["Uendret"], "Summer School at BI", "Bachelor", "Markedsføring, kommunikasjon og kultur", "–", "Markedsføring, kommunikasjon og kultur › Kultur og internasjonal business", "Handler om kultur eller har internasjonal vinkling.", false, "–", false],
  ["Markedsføring, kommunikasjon og kultur", ["Manglet fagområde"], "Kulturforståelse, forhandlinger og etisk refleksjon", "Masterkurs", "–", "Sikkerhet og beredskap", "Markedsføring, kommunikasjon og kultur › Kultur og internasjonal business; Sikkerhet og beredskap › Sikkerhetsledelse og cybersikkerhet", "Handler om kultur eller har internasjonal vinkling.", false, "–", false],
  ["Sikkerhet og beredskap", ["Manglet fagområde"], "Topplederkurs i geopolitisk risikohåndtering", "–", "–", "Ledelse", "Sikkerhet og beredskap › Beredskap og krisehåndtering; Ledelse › Sikkerhets- og beredskapsledelse", "Handler om beredskap, krisehåndtering og risiko.", false, "–", false],
  ["Sikkerhet og beredskap", ["Lagt til ekstra fagområde"], "Sikkerhetsledelse", "Bachelorkurs", "Ledelse; Offentlig sektor", "Ledelse", "Sikkerhet og beredskap › Sikkerhetsledelse og cybersikkerhet; Ledelse › Sikkerhets- og beredskapsledelse", "Handler om sikkerhetsledelse og digital sikkerhet.", false, "–", false],
  ["Sikkerhet og beredskap", ["Lagt til ekstra fagområde", "Fagområde fjernet"], "Sikkerhetsledelse", "Master", "Ledelse; Offentlig sektor; Strategi, innovasjon og bærekraft", "Ledelse", "Sikkerhet og beredskap › Sikkerhetsledelse og cybersikkerhet; Ledelse › Sikkerhets- og beredskapsledelse", "Handler om sikkerhetsledelse og digital sikkerhet.", false, "–", false],
  ["Sikkerhet og beredskap", ["Lagt til ekstra fagområde"], "Digital sikkerhet for ledere", "Masterkurs", "Offentlig sektor; Digitalisering og Analytics", "KI, digitalisering og analytics; Ledelse", "Sikkerhet og beredskap › Sikkerhetsledelse og cybersikkerhet; KI, digitalisering og analytics › Digital transformasjon; Ledelse › Sikkerhets- og beredskapsledelse", "Handler om sikkerhetsledelse og digital sikkerhet.", true, "–", false],
  ["Sikkerhet og beredskap", ["Flyttet til nytt fagområde", "Fagområde fjernet"], "Organisering for det uventede", "Masterkurs", "Offentlig sektor; Organisasjonsutvikling og Human Resource Management", "–", "Sikkerhet og beredskap › Beredskap og krisehåndtering", "Handler om beredskap og krisehåndtering.", false, "–", false],
  ["Sikkerhet og beredskap", ["Flyttet til nytt fagområde", "Fagområde fjernet"], "Sikkerhetsledelse og konflikthåndtering", "Masterkurs", "Offentlig sektor; Organisasjonsutvikling og Human Resource Management", "Ledelse", "Sikkerhet og beredskap › Beredskap og krisehåndtering; Ledelse › Sikkerhets- og beredskapsledelse", "Handler om beredskap, krisehåndtering og risiko.", true, "–", false],
  ["Sikkerhet og beredskap", ["Manglet fagområde"], "Terrorisme og terrorbekjempelse", "Masterkurs", "–", "–", "Sikkerhet og beredskap › Beredskap og krisehåndtering", "Handler om beredskap, krisehåndtering og risiko.", false, "–", false],
  ["Strategi, innovasjon og bærekraft", ["Uendret"], "D-box kurs i systemorientert innovasjon", "–", "Strategi, innovasjon og bærekraft", "Ledelse", "Strategi, innovasjon og bærekraft › Innovasjon og entreprenørskap; Ledelse › Generell ledelse og lederutdanning", "Handler om innovasjon, entreprenørskap eller forretningsutvikling.", false, "–", false],
  ["Ledelse", ["Manglet fagområde"], "Ocean Industry Leadership 2025", "–", "–", "Strategi, innovasjon og bærekraft", "Ledelse › Strategisk ledelse; Strategi, innovasjon og bærekraft › Strategi", "Bransjekurs for ledere i havnæringen, med strategisk fokus.", false, "Maritim næring", false],
  ["Strategi, innovasjon og bærekraft", ["Uendret"], "Forretningsutvikling og entreprenørskap", "Bachelor", "Strategi, innovasjon og bærekraft", "Finans, økonomi og regnskap", "Strategi, innovasjon og bærekraft › Innovasjon og entreprenørskap; Finans, økonomi og regnskap › Bedriftsøkonomi", "Handler om innovasjon, entreprenørskap eller forretningsutvikling.", false, "–", false],
  ["Strategi, innovasjon og bærekraft", ["1 fagområde prioritert", "Fagområde fjernet"], "Bærekraftig risikostyring", "Bachelorkurs", "Ledelse; Strategi, innovasjon og bærekraft; Organisasjonsutvikling og Human Resource Management", "Finans, økonomi og regnskap", "Strategi, innovasjon og bærekraft › Bærekraft; Finans, økonomi og regnskap › Bærekraftig finans", "Handler om bærekraft, ESG og rapportering i virksomheter.", false, "–", false],
  ["Strategi, innovasjon og bærekraft", ["1 fagområde prioritert", "Fagområde fjernet"], "Designdrevet innovasjon", "Bachelorkurs", "Markedsføring, kommunikasjon og kultur; Strategi, innovasjon og bærekraft", "–", "Strategi, innovasjon og bærekraft › Innovasjon og entreprenørskap", "Handler om innovasjon, entreprenørskap eller forretningsutvikling.", false, "–", true],
  ["Strategi, innovasjon og bærekraft", ["1 fagområde prioritert"], "Forretningsmodeller og ESG-risiko", "Bachelorkurs", "Finans, økonomi og styring; Strategi, innovasjon og bærekraft", "Finans, økonomi og regnskap", "Strategi, innovasjon og bærekraft › Bærekraft; Finans, økonomi og regnskap › Bærekraftig finans", "Handler om bærekraft, ESG og rapportering i virksomheter.", false, "Finansnæringen", true],
  ["Ledelse", ["Lagt til ekstra fagområde"], "Executive Master of Management in Energy", "Master", "Strategi, innovasjon og bærekraft; Internasjonal Business", "Strategi, innovasjon og bærekraft", "Ledelse › Strategisk ledelse; Strategi, innovasjon og bærekraft › Strategi", "Lederstudium i energibransjen.", false, "Energi", false],
  ["Strategi, innovasjon og bærekraft", ["Uendret"], "Innovation and Entrepreneurship", "Master", "Strategi, innovasjon og bærekraft", "Finans, økonomi og regnskap", "Strategi, innovasjon og bærekraft › Innovasjon og entreprenørskap; Finans, økonomi og regnskap › Bedriftsøkonomi", "Handler om innovasjon, entreprenørskap eller forretningsutvikling.", false, "–", false],
  ["Strategi, innovasjon og bærekraft", ["Flyttet til nytt fagområde"], "Major in Strategy", "Master", "Strategi, innovasjon og bærekraft", "Finans, økonomi og regnskap", "Strategi, innovasjon og bærekraft › Strategi; Finans, økonomi og regnskap › Bedriftsøkonomi", "Major i Master in Business, plassert sammen med selve graden og Siviløkonom.", true, "–", false],
  ["Strategi, innovasjon og bærekraft", ["Uendret"], "Bærekraft 2.0: Globale trender, strategiske valg og lederatferd", "Masterkurs", "Strategi, innovasjon og bærekraft", "Ledelse", "Strategi, innovasjon og bærekraft › Bærekraft; Ledelse › Strategisk ledelse", "Handler om bærekraft, ESG og rapportering i virksomheter.", false, "–", false],
  ["Strategi, innovasjon og bærekraft", ["Uendret"], "Grønn vekst og konkurransekraft", "Masterkurs", "Strategi, innovasjon og bærekraft", "–", "Strategi, innovasjon og bærekraft › Bærekraft", "Handler om bærekraft, ESG og rapportering i virksomheter.", false, "–", false],
  ["Strategi, innovasjon og bærekraft", ["1 fagområde prioritert"], "KI, innovasjon og forretningsmodeller", "Masterkurs", "Strategi, innovasjon og bærekraft; Digitalisering og Analytics", "KI, digitalisering og analytics", "Strategi, innovasjon og bærekraft › Innovasjon og entreprenørskap; KI, digitalisering og analytics › KI", "Handler om innovasjon, entreprenørskap eller forretningsutvikling.", false, "–", false],
  ["Strategi, innovasjon og bærekraft", ["1 fagområde prioritert"], "Strategisk forretningsutvikling med KI", "Masterkurs", "Strategi, innovasjon og bærekraft; Digitalisering og Analytics", "KI, digitalisering og analytics", "Strategi, innovasjon og bærekraft › Innovasjon og entreprenørskap; KI, digitalisering og analytics › KI", "Handler om innovasjon, entreprenørskap eller forretningsutvikling.", false, "–", false],
  ["Ledelse", ["Lagt til ekstra fagområde"], "Strategisk ledelse", "Masterkurs", "Strategi, innovasjon og bærekraft", "Strategi, innovasjon og bærekraft", "Ledelse › Strategisk ledelse; Strategi, innovasjon og bærekraft › Strategi", "Handler om strategi og strategisk ledelse av virksomheter.", false, "–", false],
  ["Strategi, innovasjon og bærekraft", ["Manglet fagområde"], "Vesentlighetsanalyse", "Årsenhet", "–", "Finans, økonomi og regnskap", "Strategi, innovasjon og bærekraft › Bærekraft; Finans, økonomi og regnskap › Regnskap og revisjon", "Handler om bærekraft, ESG og rapportering i virksomheter.", false, "Finansnæringen", false],
  ["Strategi, innovasjon og bærekraft", ["Uendret"], "Strategi, entreprenørskap og innovasjon", "PhD", "Strategi, innovasjon og bærekraft", "–", "Strategi, innovasjon og bærekraft › Innovasjon og entreprenørskap", "Handler om innovasjon, entreprenørskap eller forretningsutvikling.", false, "–", false],
  ["Finans, økonomi og regnskap", ["1 fagområde prioritert", "Fagområde fjernet"], "Logistikk og bærekraftige forsyningskjeder", "Bachelorkurs", "Finans, økonomi og styring; Markedsføring, kommunikasjon og kultur", "Strategi, innovasjon og bærekraft", "Finans, økonomi og regnskap › Logistikk og forsyningskjeder; Strategi, innovasjon og bærekraft › Bærekraft", "Handler om logistikk og forsyningskjeder.", false, "–", true],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Logistikkledelse - Supply Chain Management", "Bachelorkurs", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Logistikk og forsyningskjeder", "Handler om logistikk og forsyningskjeder.", false, "–", true],
  ["Finans, økonomi og regnskap", ["Flyttet til nytt fagområde", "Fagområde fjernet"], "Major in Logistics, Operations, and Supply Chain Management", "Master", "Eiendom, varehandel og forretningsjus; Strategi, innovasjon og bærekraft; Organisasjonsutvikling og Human Resource Management", "–", "Finans, økonomi og regnskap › Logistikk og forsyningskjeder", "Major i Master in Business, plassert sammen med selve graden og Siviløkonom.", true, "–", false],
];

/**
 * Strategi er flyttet inn i Ledelse, som nå heter Ledelse og strategi, og resten av det gamle fagområdet heter
 * Innovasjon, bærekraft og logistikk. Radene over er skrevet med de gamle navnene og oversettes her. Kolonnen for gamle
 * fagområder (bi.no i dag) beholder de gamle navnene.
 */
const strategyArea = "Strategi, innovasjon og bærekraft";
const leadershipArea = "Ledelse";
const renamedAreas: Record<string, string> = {
  [leadershipArea]: "Ledelse og strategi",
  [strategyArea]: "Innovasjon, bærekraft og logistikk",
};
/** Strategikurs som er for fagspesifikke til å ligge i Strategisk ledelse. De blir i fagområdene de allerede har. */
const keepOutOfStrategicLeadership = new Set(["Finansiell strategi", "Markedsstrategi - innsikt, posisjonering og vekst"]);
const strategyEntry = `${strategyArea} › Strategi`;
/** Underkategorier som er tatt bort. Kursene beholder de andre plasseringene sine. */
const droppedEntries = new Set(["Finans, økonomi og regnskap › Finansiell kriminalitet og compliance"]);
const strategicLeadershipEntry = `${renamedAreas[leadershipArea]} › Strategisk ledelse`;
const renamedEntries: Record<string, string> = {
  // Logistikk flyttes fra Finans, økonomi og regnskap til Innovasjon, bærekraft og logistikk
  "Finans, økonomi og regnskap › Logistikk og forsyningskjeder": `${renamedAreas[strategyArea]} › Logistikk og forsyningskjeder`,
  "Finans, økonomi og regnskap › Samfunnsøkonomi, økonomisk teori og matematikk": "Finans, økonomi og regnskap › Samfunnsøkonomi og matematikk",
  // Bedriftsøkonomi og økonomistyring er slått sammen
  "Finans, økonomi og regnskap › Bedriftsøkonomi": "Finans, økonomi og regnskap › Bedriftsøkonomi og økonomistyring",
  "Finans, økonomi og regnskap › Økonomistyring": "Finans, økonomi og regnskap › Bedriftsøkonomi og økonomistyring",
  "KI, digitalisering og analytics › Ansvarlig KI og personvern": "KI, digitalisering og analytics › KI-etikk, regulering og personvern",
  // Team-, medarbeider- og endringsledelse er slått sammen
  [`${leadershipArea} › Teamledelse og prestasjon`]: `${renamedAreas[leadershipArea]} › HR-ledelse og endringsledelse`,
  [`${leadershipArea} › Medarbeiderledelse og arbeidsmiljø`]: `${renamedAreas[leadershipArea]} › HR-ledelse og endringsledelse`,
  [`${leadershipArea} › Endringsledelse`]: `${renamedAreas[leadershipArea]} › HR-ledelse og endringsledelse`,
  // Generell ledelse og lederferdigheter er slått sammen
  [`${leadershipArea} › Generell ledelse og lederutdanning`]: `${renamedAreas[leadershipArea]} › Generell ledelse og lederutvikling`,
  [`${leadershipArea} › Lederferdigheter og kommunikasjon`]: `${renamedAreas[leadershipArea]} › Generell ledelse og lederutvikling`,
};

const renameEntry = (entry: string) => {
  if (renamedEntries[entry]) return renamedEntries[entry];
  const [area, sub] = entry.split(" › ");
  return `${renamedAreas[area] ?? area} › ${sub}`;
};

/** Hvilket nytt fagområde et tidligere fagområde tilsvarer (samme innhold, evt. nytt navn). */
const nameEquivalents: Record<string, string> = {
  "Finans, økonomi og styring": "Finans, økonomi og regnskap",
  [leadershipArea]: renamedAreas[leadershipArea],
  "Markedsføring, kommunikasjon og kultur": "Markedsføring, kommunikasjon og kultur",
  "Organisasjonsutvikling og Human Resource Management": "HR og organisasjonsutvikling",
  "Eiendom, varehandel og forretningsjus": "Juss, skatt og eiendom",
  [strategyArea]: renamedAreas[strategyArea],
  "Digitalisering og Analytics": "KI, digitalisering og analytics",
};
/** Tidligere fagområder som nå lever videre som underkategori i et annet fagområde. */
const mergedIntoAreas: Record<string, string> = {
  [strategyArea]: renamedAreas[leadershipArea],
  Prosjektledelse: renamedAreas[leadershipArea],
};

const rows: Row[] = rawRows.map((row): Row => {
  const entries = row[6].split("; ");
  const hasLeadership = entries.some((entry) => entry.startsWith(`${leadershipArea} › `));
  const migrated = entries
    .flatMap((entry) => {
      if (droppedEntries.has(entry)) return [];
      if (entry !== strategyEntry) return [renameEntry(entry)];
      // Strategi blir Strategisk ledelse, men ikke en ekstra gang når kurset allerede ligger i Ledelse og strategi
      return hasLeadership || keepOutOfStrategicLeadership.has(row[2]) ? [] : [strategicLeadershipEntry];
    })
    // Et kurs har bare én plassering i hvert fagområde, så den første beholdes når to underkategorier havner i samme fagområde
    .filter((entry, index, all) => all.findIndex((other) => other.split(" › ")[0] === entry.split(" › ")[0]) === index);
  const main = migrated[0].split(" › ")[0];
  const alternatives = [...new Set(migrated.slice(1).map((entry) => entry.split(" › ")[0]))].filter((area) => area !== main);
  // Statusene gjelder uavhengig av hverandre, så et studie eller kurs har alle som passer
  const previous = row[4].split("; ").filter((area) => area !== "–");
  const keepsMain = previous.some((area) => nameEquivalents[area] === main);
  const newAreas = [main, ...alternatives];
  const carriedOver = (area: string) => newAreas.includes(nameEquivalents[area]) || newAreas.includes(mergedIntoAreas[area]);
  const statuses: Status[] = [];
  if (previous.length === 0) statuses.push("Manglet fagområde");
  else if (!keepsMain) statuses.push("Flyttet til nytt fagområde");
  if (keepsMain && previous.length > 1) statuses.push("1 fagområde prioritert");
  if (keepsMain) statuses.push(previous.includes(main) ? "Uendret" : "Endret navn på fagområde");
  // «Lagt til» gjelder bare ekstra fagområder kurset ikke hadde fra før (selv med nytt navn). Et kurs som manglet fagområde har naturlig nok fått ekstra fagområder, så det teller ikke
  const hadBefore = (area: string) => previous.some((old) => nameEquivalents[old] === area || mergedIntoAreas[old] === area);
  if (previous.length > 0 && alternatives.some((area) => !hadBefore(area))) statuses.push("Lagt til ekstra fagområde");
  // Fagområde fjernet: kurset hadde et fagområde som fortsatt finnes, men har det ikke lenger. Områder som er borte som helhet (Offentlig sektor osv.) gir bare «Flyttet»
  if (previous.some((area) => area in nameEquivalents && !carriedOver(area))) statuses.push("Fagområde fjernet");
  return [main, statuses, row[2], row[3], row[4], alternatives.join("; ") || "–", migrated.join("; "), row[7], row[8], row[9], row[10]];
});

const migratedReasons: Record<string, string> = {};
const reasonEntries = Object.entries(placementReasons).map(([key, reason]) => {
  const split = key.indexOf("|");
  return { title: key.slice(0, split), entry: key.slice(split + 1), reason };
});
for (const { title, entry, reason } of reasonEntries.filter((item) => item.entry !== strategyEntry)) {
  // Begrunnelsene nevner underkategorien ved navn, så et nytt navn følger med i teksten
  const renamed = renameEntry(entry);
  const [oldSub, newSub] = [entry.split(" › ")[1], renamed.split(" › ")[1]];
  migratedReasons[`${title}|${renamed}`] = renamed === entry || !oldSub ? reason : reason.split(oldSub).join(newSub);
}
for (const { title, reason } of reasonEntries.filter((item) => item.entry === strategyEntry)) migratedReasons[`${title}|${strategicLeadershipEntry}`] ??= reason;

const statusStyle: Record<Status, { background: string; text: string }> = {
  Uendret: { background: "var(--bi-neutral-10)", text: "var(--bi-neutral-70)" },
  "Endret navn på fagområde": { background: "var(--bi-neutral-10)", text: "var(--bi-neutral-70)" },
  "1 fagområde prioritert": { background: "var(--bi-primary-5)", text: "var(--bi-primary-80)" },
  "Manglet fagområde": { background: "var(--bi-info-5)", text: "var(--bi-info-80)" },
  "Lagt til ekstra fagområde": { background: "var(--bi-success-5)", text: "var(--bi-success-80)" },
  "Flyttet til nytt fagområde": { background: "var(--bi-secondary-10)", text: "var(--bi-secondary-90)" },
  "Fagområde fjernet": { background: "var(--bi-alert-5)", text: "var(--bi-alert-80)" },
};

const statusLines: Record<Status, string[]> = {
  Uendret: ["Uendret"],
  "Endret navn på fagområde": ["Endret navn på", "fagområde"],
  "1 fagområde prioritert": ["Valgt hovedfagområde"],
  "Manglet fagområde": ["Manglet fagområde"],
  "Lagt til ekstra fagområde": ["Lagt til ekstra", "fagområde"],
  "Flyttet til nytt fagområde": ["Flyttet til nytt", "fagområde"],
  "Fagområde fjernet": ["Fagområde fjernet"],
};

const statusLabel = (status: Status) => (status === "1 fagområde prioritert" ? "Valgt hovedfagområde" : status);

function StatusBadge({ status, wide = false, card = false }: { status: Status; wide?: boolean; card?: boolean }) {
  const { background, text } = (card && statusCardStyle[status]) || statusStyle[status];
  const lines = wide ? [statusLabel(status)] : statusLines[status];
  return (
    <Badge
      data-color="neutral"
      size="small"
      style={{
        display: "block",
        width: "fit-content",
        whiteSpace: "nowrap",
        fontWeight: 400,
        padding: "2px 6px",
        lineHeight: 1.3,
        borderRadius: 4,
        border: `1px solid color-mix(in srgb, ${text} 45%, var(--bi-basic-white))`,
        background,
        color: text,
      }}
    >
      {lines.map((line, index) => (
        <span key={line}>
          {index > 0 && <br />}
          {line}
        </span>
      ))}
    </Badge>
  );
}

function AreaWithSubcategory({ area, subcategory, muted = false, lineColor = treeLine, wrap = false }: { area: string; subcategory: string; muted?: boolean; lineColor?: string; wrap?: boolean }) {
  const whiteSpace = wrap ? "normal" : "nowrap";
  return (
    <>
      <div style={{ position: "relative", whiteSpace, fontSize: muted ? "0.875rem" : undefined, color: muted ? "var(--bi-color-neutral-text-secondary)" : undefined }}>
        {!muted && (
          <span aria-label="Hovedfagområde" title="Hovedfagområde" style={{ position: "absolute", left: -12, color: "var(--bi-primary-50)", fontWeight: 700 }}>
            *
          </span>
        )}
        {area}
      </div>
      <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 8, margin: "2px 0 0 10px", padding: "3px 0" }}>
        <span style={{ position: "absolute", left: 0, top: 0, bottom: "50%", width: 1, background: lineColor }} />
        <span style={{ flex: "0 0 14px", height: 1, background: lineColor }} />
        <span style={{ fontSize: muted ? "0.8125rem" : "0.875rem", color: muted ? "var(--bi-neutral-40)" : undefined, whiteSpace }}>{subcategory}</span>
      </div>
    </>
  );
}

type PillKind = "old" | "removed" | "new" | "same" | "added";

const pillStyles: Record<PillKind, { background: string; border: string; color: string; textDecoration?: string }> = {
  old: { background: "var(--bi-basic-white)", border: "1px dashed var(--bi-neutral-40)", color: "var(--bi-color-neutral-text-secondary)" },
  removed: { background: "var(--bi-alert-5)", border: "1px solid var(--bi-alert-20)", color: "var(--bi-alert-60)", textDecoration: "line-through" },
  new: { background: "var(--bi-primary-5)", border: "1px solid var(--bi-primary-20)", color: "var(--bi-color-primary-text-accent)" },
  same: { background: "var(--bi-color-neutral-surface)", border: "1px solid var(--bi-color-neutral-stroke)", color: "var(--bi-color-neutral-text)" },
  added: { background: "var(--bi-success-5)", border: "1px solid var(--bi-success-20)", color: "var(--bi-success-80)" },
};

function AreaPill({ label, kind, count, bold = false, strike = false }: { label: string; kind: PillKind; count?: number; bold?: boolean; strike?: boolean }) {
  const style = pillStyles[kind];
  return (
    <span
      style={{
        display: "inline-block",
        padding: "4px 10px",
        borderRadius: 4,
        background: style.background,
        border: style.border,
        color: style.color,
        textDecoration: strike ? "line-through" : style.textDecoration,
        lineHeight: 1.35,
        whiteSpace: "pre-line",
        fontWeight: bold ? 700 : undefined,
      }}
    >
      {label}
      {count !== undefined && <span style={{ marginLeft: 8, opacity: 0.75 }}>({count})</span>}
    </span>
  );
}

function ChangeArrow({ equal = false, color = "#475e75" }: { equal?: boolean; color?: string }) {
  if (equal) {
    return <span style={{ display: "block", textAlign: "center", color, fontSize: "1.25rem", lineHeight: 1 }}>=</span>;
  }
  return (
    <svg width="44" height="14" viewBox="0 0 44 14" aria-hidden="true" style={{ display: "block" }}>
      <line x1="0" y1="7" x2="40" y2="7" stroke={color} strokeWidth="1.5" />
      <polyline points="34,1.5 41,7 34,12.5" fill="none" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

function SplitRow({
  from,
  to,
  color,
}: {
  from: { label: string; kind: PillKind }[];
  to: { label: string; count: number; note: string }[];
  color: string;
}) {
  return (
    <div
      style={{
        gridColumn: "1 / -1",
        display: "grid",
        gridTemplateColumns: "subgrid",
        gridTemplateRows: `repeat(${to.length}, auto)`,
        borderTop: "1px solid var(--bi-color-neutral-stroke-subtle)",
        padding: "6px 0",
      }}
    >
      <div
        style={{
          gridColumn: 1,
          // Står på samme rad som den midterste pilen, slik at streken treffer den nøyaktig
          gridRow: Math.floor(to.length / 2) + 1,
          alignSelf: "start",
          padding: "6px 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 12,
        }}
      >
        {from.map(({ label, kind }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", alignSelf: "stretch" }}>
            <AreaPill label={label} kind={kind} />
            <span style={{ flex: 1, height: 1.5, background: color, marginRight: -16 }} />
          </div>
        ))}
      </div>
      {to.map(({ label, count, note }, index) => (
        <Fragment key={label}>
          <div style={{ gridColumn: 2, gridRow: index + 1, position: "relative", paddingTop: 14 }}>
            <span
              style={{
                position: "absolute",
                left: 0,
                width: 1.5,
                background: color,
                top: index === 0 ? 21 : 0,
                bottom: index === to.length - 1 ? "calc(100% - 21px)" : 0,
              }}
            />
            <ChangeArrow color={color} />
          </div>
          <div style={{ gridColumn: 3, gridRow: index + 1, padding: "6px 0" }}>
            <AreaPill label={label} kind="new" count={count} />
            <p style={{ margin: "6px 0 0", color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.9375rem" }}>{note}</p>
          </div>
        </Fragment>
      ))}
    </div>
  );
}

function ChangeGroup({ children, compact = false }: { children: React.ReactNode; compact?: boolean }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: compact ? "210px 44px minmax(0, 1fr)" : "max-content 44px minmax(0, 1fr)",
        columnGap: compact ? 8 : 16,
        margin: "0 0 8px",
      }}
    >
      {children}
    </div>
  );
}

type ChangeRowProps = {
  from: string | null;
  fromKind: PillKind;
  fromLabel?: string;
  to: { label: string; count?: number }[];
  toKind?: PillKind;
  equal?: boolean;
  arrowColor?: string;
  note?: string;
  compact?: boolean;
  bold?: boolean;
};

function ChangeRow({ from, fromKind, fromLabel, to, toKind = "new", equal = false, arrowColor, note, compact = false, bold = false }: ChangeRowProps) {
  return (
    <div
      style={{
        gridColumn: "1 / -1",
        display: "grid",
        gridTemplateColumns: "subgrid",
        alignItems: "start",
        padding: compact ? "6px 0" : "12px 0",
        borderTop: compact ? undefined : "1px solid var(--bi-color-neutral-stroke-subtle)",
      }}
    >
      <div>{from === null ? <AreaPill label={fromLabel ?? "Nytt"} kind="added" /> : <AreaPill label={from} kind={fromKind} bold={bold} />}</div>
      <div style={{ paddingTop: compact ? 6 : 10 }}>
        <ChangeArrow equal={equal} color={arrowColor} />
      </div>
      <div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {to.map(({ label, count }) => (
            <AreaPill key={label} label={label} kind={toKind} count={count} bold={bold} />
          ))}
        </div>
        {note && <p style={{ margin: compact ? "3px 0 0" : "6px 0 0", color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.9375rem" }}>{note}</p>}
      </div>
    </div>
  );
}

function TreeNumbers({ main, extra, bold = false }: { main: number; extra: number; bold?: boolean }) {
  return (
    <span style={{ flex: "0 0 70px", display: "flex", gap: 6, fontWeight: bold ? 700 : 400 }}>
      <span style={{ flex: "0 0 24px", textAlign: "right" }}>{main}</span>
      <span style={{ flex: "0 0 40px", color: treeColors.extraText }}>{extra > 0 ? `+${extra}` : ""}</span>
    </span>
  );
}

function TreeBar({
  main,
  extra,
  height,
  mainColor,
  extraColor,
}: {
  main: number;
  extra: number;
  height: number;
  mainColor: string;
  extraColor: string;
}) {
  const segment = (value: number, color: string, first: boolean, last: boolean) =>
    value > 0 && (
      <div
        style={{
          width: `${(value / largestArea) * 100}%`,
          minWidth: 4,
          height,
          background: color,
          boxShadow: hairline(color),
          boxSizing: "border-box",
          borderRight: !last ? "2px solid var(--bi-basic-white)" : undefined,
          borderRadius: `${first ? height / 2 : 0}px ${last ? height / 2 : 0}px ${last ? height / 2 : 0}px ${first ? height / 2 : 0}px`,
        }}
      />
    );
  return (
    <div style={{ flex: 1, maxWidth: 260, display: "flex" }}>
      {segment(main, mainColor, true, extra === 0)}
      {segment(extra, extraColor, main === 0, true)}
    </div>
  );
}

const statusOrder: Status[] = [
  "Flyttet til nytt fagområde",
  "Manglet fagområde",
  "1 fagområde prioritert",
  "Endret navn på fagområde",
  "Uendret",
  "Lagt til ekstra fagområde",
  "Fagområde fjernet",
];

// Kun statuskortet: Uendret og Endret navn får hver sin gråtone, og diagrammet bruker sterkere farger
const statusCardStyle: Partial<Record<Status, { background: string; text: string }>> = {
  Uendret: { background: "#f1f4f7", text: "#6b7f95" },
  "Endret navn på fagområde": { background: "#d5dde4", text: "#2c3e50" },
};

const statusPieStrong: Record<Status, string> = {
  "Lagt til ekstra fagområde": "#3f9b5a",
  "Flyttet til nytt fagområde": "#e3ad1c",
  "Manglet fagområde": "#8a5cd0",
  "1 fagområde prioritert": "#2f6fd6",
  "Endret navn på fagområde": "#5f7490",
  Uendret: "#c3ccd6",
  "Fagområde fjernet": "#d8493d",
};

function StatusOverview({ rows: list }: { rows: Row[] }) {
  const total = list.length;
  // Statuser som hører sammen vises i samme søyle, med en boks per status til venstre. Statusene i en søyle overlapper ikke,
  // så søylen og resten til høyre utgjør alle studiene og kursene
  const groups: { statuses: Status[]; rest: string }[] = [
    { statuses: ["Uendret", "Endret navn på fagområde"], rest: "har ikke beholdt hovedfagområdet" },
    { statuses: ["1 fagområde prioritert"], rest: "har ikke valgt hovedfagområde blant flere" },
    { statuses: ["Manglet fagområde", "Lagt til ekstra fagområde"], rest: "hadde fagområde før og har ikke fått ekstra fagområde" },
    { statuses: ["Flyttet til nytt fagområde"], rest: "er ikke flyttet til nytt fagområde" },
    { statuses: ["Fagområde fjernet"], rest: "har ikke fått fjernet fagområde" },
  ];
  const countOf = (status: Status) => list.filter((row) => row[1].includes(status)).length;
  // Avrunder så prosentene alltid summerer til 100
  const percentages = (values: number[]) => {
    const exact = values.map((value) => (value / total) * 100);
    const result = exact.map(Math.floor);
    const order = exact.map((value, index) => ({ index, remainder: value - Math.floor(value) })).sort((a, b) => b.remainder - a.remainder);
    const missing = 100 - result.reduce((sum, value) => sum + value, 0);
    for (let i = 0; i < missing; i++) result[order[i].index] += 1;
    return result;
  };
  const used = new Set<Row>();
  const usedCombinations = new Set<string>();
  const exampleFor = (status: Status) => {
    const candidates = list.filter((row) => row[1].includes(status) && !used.has(row));
    // Foretrekker en kombinasjon av statuser som ikke allerede er vist, så eksemplene ikke blir like
    const fresh = candidates.filter((row) => !usedCombinations.has(row[1].join()));
    const byPattern = new Map<string, { row: Row; count: number }>();
    (fresh.length ? fresh : candidates).forEach((row) => {
      const key = `${row[4]}|${row[0]}|${row[1].join()}`;
      byPattern.set(key, { row: byPattern.get(key)?.row ?? row, count: (byPattern.get(key)?.count ?? 0) + 1 });
    });
    const row = [...byPattern.values()].sort((a, b) => b.count - a.count)[0]?.row;
    if (row) {
      used.add(row);
      usedCombinations.add(row[1].join());
    }
    return row;
  };
  const examples: BeforeAfterExample[] = groups.flatMap((group) => group.statuses).flatMap((status) => {
    const row = exampleFor(status);
    return row ? [{ title: row[2].replace(/\u00ad|\(-\)/g, ""), level: row[3], statuses: row[1] }] : [];
  });
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <p style={{ margin: 0, maxWidth: 820, color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.9375rem" }}>
        Statusene gjelder hver for seg, og et studie eller kurs har alle statusene som passer. Hver søyle viser alle studiene og kursene: statusene i søylen, og resten til høyre.
      </p>
      <div style={{ display: "grid", gap: 14 }}>
        {groups.map(({ statuses, rest }) => {
          const counts = statuses.map(countOf);
          const restCount = total - counts.reduce((sum, value) => sum + value, 0);
          const shares = percentages([...counts, restCount]);
          return (
            <div key={statuses.join()} style={{ display: "grid", gridTemplateColumns: "440px minmax(0, 1fr) 300px", gap: 16, alignItems: "center" }}>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px 16px" }}>
                {statuses.map((status, index) => (
                  <span key={status} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <StatusBadge status={status} wide card />
                    <strong>{shares[index]} %</strong>
                  </span>
                ))}
              </div>
              <div
                style={{ display: "flex", height: 28, borderRadius: 14, overflow: "hidden", background: "var(--bi-color-neutral-stroke-subtle)" }}
                role="img"
                aria-label={statuses.map((status, index) => `${statusLabel(status)}: ${shares[index]} %`).join(", ")}
              >
                {statuses.map((status, index) => (
                  <div
                    key={status}
                    title={`${statusLabel(status)}: ${shares[index]} %`}
                    style={{
                      width: `${(counts[index] / total) * 100}%`,
                      minWidth: 4,
                      background: statusPieStrong[status],
                      boxShadow: hairline(statusPieStrong[status]),
                      borderRight: "2px solid var(--bi-basic-white)",
                    }}
                  />
                ))}
              </div>
              <div style={{ color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.9375rem" }}>
                <strong style={{ color: "var(--bi-color-neutral-text)" }}>{shares[statuses.length]} %</strong> {rest}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ fontWeight: 700 }}>Eksempel på hver status</div>
      <BeforeAfterExamples examples={examples} showLocations />
    </div>
  );
}

const cell = { padding: "8px 12px", textAlign: "left", verticalAlign: "top" } as const;

const headCell = {
  ...cell,
  position: "sticky",
  top: 0,
  zIndex: 1,
  background: "var(--bi-basic-white)",
  boxShadow: "inset 0 -2px 0 var(--bi-color-primary-stroke-accent)",
} as const;

/** De sju majorene i Master in Business er ikke med i tallene i oppsummeringen; selve graden («Business») er med. */
const masterInBusinessMajors = new Set([
  "Major in Accounting and Business Control",
  "Major in Economics",
  "Major in Finance",
  "Major in Leadership, Change and Analytics",
  "Major in Logistics, Operations, and Supply Chain Management",
  "Major in Marketing",
  "Major in Strategy",
]);

const summaryRows = rows.filter((row) => !(row[3] === "Master" && masterInBusinessMajors.has(row[2])));

const areaCount = (area: string) => summaryRows.filter(([a]) => a === area).length;

const subcategoryCount = new Set(summaryRows.flatMap((row) => row[6].split("; "))).size;

type TreeCount = { main: number; extra: number };

const buildTree = (list: Row[]) =>
  [...new Set(rows.map(([area]) => area))]
    .map((area) => {
      const subs = new Map<string, TreeCount>();
      const bump = (name: string, kind: keyof TreeCount) => {
        const current = subs.get(name) ?? { main: 0, extra: 0 };
        current[kind] += 1;
        subs.set(name, current);
      };
      let main = 0;
      let extra = 0;
      for (const row of list) {
        const entries = row[6].split("; ").map((entry) => entry.split(" › "));
        if (row[0] === area) {
          main += 1;
          bump(entries[0][1], "main");
        } else if (row[5].split("; ").includes(area)) {
          extra += 1;
        }
        for (const [entryArea, entrySub] of entries.slice(1)) {
          if (entryArea === area) bump(entrySub, "extra");
        }
      }
      return { area, main, extra, subs: [...subs].sort((x, y) => x[0].localeCompare(y[0], "nb")) };
    })
    .sort((a, b) => a.area.localeCompare(b.area, "nb"));

const areaTree = buildTree(summaryRows);

function originNote(area: string): string {
  const fromPublic = summaryRows.filter((row) => row[0] === area && row[4].split("; ").includes("Offentlig sektor")).length;
  return `${fromPublic} av ${areaCount(area)} studier og kurs kom fra Offentlig sektor.`;
}

/** Antall studier og kurs som tidligere lå i et fagområde som nå er fjernet. */
const wasIn = (oldArea: string) => summaryRows.filter((row) => row[4].split("; ").includes(oldArea)).length;

// Tre fargeroller: fagområde (kategorisk, areaColors), før/nå/ekstra (sammenligning) og relaterte kategorier i ett diagram (blå rampe, pieColors).
const areaColors: Record<string, string> = {
  "Finans, økonomi og regnskap": "#042f5b",
  "Ledelse og strategi": "#6929c4",
  "Innovasjon, bærekraft og logistikk": "#198038",
  "KI, digitalisering og analytics": "#1192e8",
  "Markedsføring, kommunikasjon og kultur": "#ee538b",
  "HR og organisasjonsutvikling": "#ff832b",
  "Helse, skole og barnehage": "#08bdba",
  "Sikkerhet og beredskap": "#a2191f",
  "Juss, skatt og eiendom": "#90a3b7",
};

const areaColor = (area: string) => areaColors[area] ?? "#c8d1db";

const lightFills = new Set(["#d5dde4", "#e4e8ed", "#c8d1db", "#c5d9f7", "var(--bi-primary-10)", "var(--bi-neutral-15)"]);
const hairline = (fill: string) => (lightFills.has(fill) ? "inset 0 0 0 1px rgba(0,0,0,0.06)" : undefined);

const industryGroups = [...new Set(summaryRows.map((row) => row[9]).filter((industry) => industry !== "–"))]
  .map((industry) => ({ industry, list: summaryRows.filter((row) => row[9] === industry) }))
  .sort((a, b) => b.list.length - a.list.length);

/** Studier der bi.no oppgir heltid som eneste studieform (studieform mangler for noen studier). */
const fullTimeStudies = new Set([
  "Bachelor|Bachelor of Data Science for Business",
  "Bachelor|Business Administration",
  "Bachelor|Digital Business",
  "Bachelor|Digital kommunikasjon og markedsføring",
  "Bachelor|Eiendomsmegling, jus og økonomi",
  "Bachelor|Finans",
  "Bachelor|Forretningsjus og økonomi",
  "Bachelor|Forretningsutvikling og entreprenørskap",
  "Bachelor|International Management",
  "Bachelor|Markedsføringsledelse",
  "Bachelor|Organisasjonspsykologi, HR og ledelse",
  "Bachelor|Rettsvitenskap",
  "Bachelor|Økonomi og administrasjon",
  "Master|BI–Luiss Joint Master in Marketing",
  "Master|Business",
  "Master|Business Analytics",
  "Master|Business Communication",
  "Master|Bærekraft og finans",
  "Master|Data Science for Business",
  "Master|Finans",
  "Master|Forretningsjus og økonomi",
  "Master|Innovation and Entrepreneurship",
  "Master|Leadership and Organisational Psychology",
  "Master|Major in Accounting and Business Control",
  "Master|Major in Economics",
  "Master|Major in Finance",
  "Master|Major in Leadership, Change and Analytics",
  "Master|Major in Logistics, Operations, and Supply Chain Management",
  "Master|Major in Marketing",
  "Master|Major in Strategy",
  "Master|Quantitative Finance",
  "Master|Regnskap og revisjon",
  "Master|Regnskap og revisjon +1-modellen",
  "Master|Rettsvitenskap",
  "Master|Strategic Marketing Management",

]);

const isFullTime = ([, , title, level]: Row) => fullTimeStudies.has(`${level}|${title}`);

/** Studier som bi.no oppgir som deltid (eller som siden beskriver som deltid når studieform mangler i søket). */
const partTimeStudies = new Set([
  "Bachelor|Bachelor in Management",
  "Bachelor|Grunnkurs i ledelse og kvalitet i helse- og omsorgstjenesten",
  "Bachelor|Motivasjon og selvledelse",
  "Bachelor|Personvern og GDPR",
  "Master|Executive MBA",
  "Master|Executive Master of Management in Energy",
  "Master|Kunstig intelligent organisasjonspsykologi",
  "Master|Master of Management",
  "Master|Master of Management med spesialisering i skatte- og avgiftsrett",
  "Master|Merverdiavgift II",
  "Master|Sikkerhetsledelse",
]);

const isPartTime = ([, , title, level]: Row) => partTimeStudies.has(`${level}|${title}`);

/** Foreslåtte nye titler for studier og kurs der tittelen ikke viser hvorfor de ligger i fagområdet. Nøkkel: «nivå|tittel». */
const suggestedTitles: Record<string, string> = {
  "Masterkurs|Juss for ledere": "Juss for ledere i skole og barnehage",
  "Masterkurs|Ledelse av utviklings- og endringsarbeid": "Ledelse av utviklings- og endringsarbeid i skole og barnehage",
  "Masterkurs|Ledelse av tjenesteutvikling": "Ledelse av tjenesteutvikling i helse og omsorg",
  "Bachelorkurs|Consulting - Verktøy og teknikker": "Strategi og consulting: verktøy og teknikker",
  "Masterkurs|Consulting": "Consulting: endring og organisasjonsutvikling",
  "Kurs uten studiepoeng|Rådgivning og risiko": "Finansiell rådgivning og risiko",
  "Kurs uten studiepoeng|Regelverk og risikoer": "Regelverk og compliance-risiko",
  "Kurs uten studiepoeng|Rettslige rammebetingelser": "Rettslige rammebetingelser: compliance og bærekraft",
  "Kurs uten studiepoeng|Risikobasert tilnærming": "Risikobasert tilnærming til compliance",
  "Årsenhet|Utvalgte praktiske problemstillinger": "Compliance: utvalgte praktiske problemstillinger",
  "Bachelorkurs|Matematisk analyse": "Matematisk analyse for økonomer",
  "Bachelorkurs|Kvalitativ metode: Dypere innsikt": "Kvalitativ metode for markedsinnsikt",
  "Bachelorkurs|Metode og innsikt": "Metode og kundeinnsikt",
  "Bachelorkurs|Forhandling og forhandlingsteknikk": "Forhandling og forhandlingsteknikk for ledere",
  "Bachelorkurs|Prestasjonsstyring": "Prestasjonsstyring: budsjett og økonomisk oppfølging",
  "Bachelor|International Management": "International Management: kultur og internasjonal business",
  "Bachelor|Summer School at BI": "Summer School at BI: internasjonal business og kultur",
  "Masterkurs|Organisering for det uventede": "Organisering for det uventede: beredskap og krisehåndtering",
  "Årsenhet|Vesentlighetsanalyse": "Vesentlighetsanalyse for bærekraftsrapportering",
  "–|Qualifying Year at American College of Norway": "Qualifying Year at American College of Norway: Business Administration",
};

const suggestedTitle = ([, , title, level]: Row) => suggestedTitles[`${level}|${title.replace(/\u00ad|\(-\)/g, "")}`];

function SuggestedTitle({ row }: { row: Row }) {
  const suggestion = suggestedTitle(row);
  if (!suggestion) return null;
  return (
    <div style={{ marginTop: 6, fontSize: "0.8125rem", color: "var(--bi-color-neutral-text-secondary)" }}>
      Foreslått ny tittel: <strong style={{ color: "var(--bi-color-primary-text-accent)" }}>{suggestion}</strong>
    </div>
  );
}

type LevelSplit = { key: string; label: string; color: string; match: (row: Row) => boolean };

const levelSplits: Record<string, LevelSplit[]> = {
  Bachelorkurs: [
    { key: "Kurs", label: "Bachelorkurs", color: "#0b4db4", match: (row) => row[3] === "Bachelorkurs" },
    { key: "Deltid", label: "Bachelorstudier, deltid", color: "#9ec0f1", match: (row) => row[3] === "Bachelor" },
  ],
  Masterkurs: [
    { key: "Kurs", label: "Masterkurs", color: "#0b4db4", match: (row) => row[3] === "Masterkurs" },
    { key: "Deltid", label: "Masterstudier, deltid", color: "#9ec0f1", match: (row) => row[3] === "Master" },
  ],
  Heltid: [
    { key: "Bachelor", label: "Bachelorstudier", color: "#0b4db4", match: (row) => row[3] === "Bachelor" },
    { key: "Master", label: "Masterstudier", color: "#9ec0f1", match: (row) => row[3] === "Master" },
  ],
  Deltid: [
    { key: "Bachelorkurs", label: "Bachelorkurs", color: "#0b4db4", match: (row) => row[3] === "Bachelorkurs" },
    { key: "Masterkurs", label: "Masterkurs", color: "#9ec0f1", match: (row) => row[3] === "Masterkurs" },
  ],
  NettAlle: [
    { key: "Bachelor", label: "Bachelorstudier", color: "#042f5b", match: (row) => row[3] === "Bachelor" },
    { key: "Arsenhet", label: "Årsenhet", color: "#0a64ff", match: (row) => /årsenhet/i.test(row[3]) },
    { key: "Bachelorkurs", label: "Bachelorkurs", color: "#6196f4", match: (row) => row[3] === "Bachelorkurs" },
    {
      key: "Andre",
      label: "Masterkurs og kurs uten studiepoeng",
      color: "#c8d1db",
      match: (row) => row[3] === "Masterkurs" || row[3] === "Kurs uten studiepoeng",
    },
  ],
};

const levelGroups = [
  { key: "Bachelor", label: "Bachelorstudier, heltid", filter: (row: Row) => row[3] === "Bachelor" && isFullTime(row) },
  { key: "Master", label: "Masterstudier, heltid", filter: (row: Row) => row[3] === "Master" && isFullTime(row) },
  {
    key: "Bachelorkurs",
    label: "Bachelorkurs og bachelorstudier, deltid",
    filter: (row: Row) => row[3] === "Bachelorkurs" || (row[3] === "Bachelor" && isPartTime(row)),
  },
  {
    key: "Masterkurs",
    label: "Masterkurs og masterstudier, deltid",
    filter: (row: Row) => row[3] === "Masterkurs" || (row[3] === "Master" && isPartTime(row)),
  },
  { key: "Heltid", label: "Heltid", filter: (row: Row) => (row[3] === "Bachelor" || row[3] === "Master") && isFullTime(row) },
  { key: "Deltid", label: "Deltid", filter: (row: Row) => row[3] === "Bachelorkurs" || row[3] === "Masterkurs" },
  { key: "NettAlle", label: "Alle nettstudier", filter: (row: Row) => row[10] },
];

const levelTrees = levelGroups.map(({ key, label, filter }) => {
  const list = summaryRows.filter(filter);
  return { key, label, list, count: list.length, tree: buildTree(list) };
});


/** Fordeler fagområdeblokkene på to kolonner slik at kolonnene blir omtrent like høye, og beholder rekkefølgen innenfor hver kolonne. */
const treeColumns = (() => {
  const weights = areaTree.map(({ subs }) => subs.length + 1);
  const total = weights.reduce((sum, weight) => sum + weight, 0);
  let bestMask = 0;
  let bestDifference = Infinity;
  for (let mask = 0; mask < 1 << areaTree.length; mask++) {
    const left = weights.reduce((sum, weight, index) => sum + (mask & (1 << index) ? weight : 0), 0);
    const difference = Math.abs(total - 2 * left);
    if (difference < bestDifference) {
      bestDifference = difference;
      bestMask = mask;
    }
  }
  return [areaTree.filter((_, index) => bestMask & (1 << index)), areaTree.filter((_, index) => !(bestMask & (1 << index)))];
})();

const overlapOrder = [
  "Helse, skole og barnehage",
  "Ledelse og strategi",
  "HR og organisasjonsutvikling",
  "Sikkerhet og beredskap",
  "Markedsføring, kommunikasjon og kultur",
  "KI, digitalisering og analytics",
  "Juss, skatt og eiendom",
  "Finans, økonomi og regnskap",
  "Innovasjon, bærekraft og logistikk",
];

const areaShortName: Record<string, string> = {
  "Helse, skole og barnehage": "Helse, skole og barnehage",
  "Ledelse og strategi": "Ledelse og strategi",
  "HR og organisasjonsutvikling": "HR og organisasjonsutvikling",
  "Sikkerhet og beredskap": "Sikkerhet og beredskap",
  "Markedsføring, kommunikasjon og kultur": "Markedsføring, kommunikasjon og kultur",
  "KI, digitalisering og analytics": "KI, digitalisering og analytics",
  "Juss, skatt og eiendom": "Juss, skatt og eiendom",
  "Finans, økonomi og regnskap": "Finans, økonomi og regnskap",
  "Innovasjon, bærekraft og logistikk": "Innovasjon, bærekraft og logistikk",
};

/** Deler et langt navn i linjer til SVG-tekst, helst ved komma eller «og». */
const wrapLabel = (text: string, max = 24): string[] => {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    if (line && `${line} ${word}`.length > max) {
      lines.push(line);
      line = word;
    } else line = line ? `${line} ${word}` : word;
  }
  if (line) lines.push(line);
  return lines;
};

/** Koblinger der et studie eller kurs har ett fagområde som hoved og et annet som ekstra. */
const overlap = (() => {
  const areaCounts = new Map<string, number>();
  const subCounts = new Map<string, number>();
  const mainSubCounts = new Map<string, number>();
  for (const row of summaryRows) {
    const entries = row[6].split("; ");
    const main = entries[0];
    mainSubCounts.set(main, (mainSubCounts.get(main) ?? 0) + 1);
    for (const extra of entries.slice(1)) {
      const areaKey = `${main.split(" › ")[0]}|${extra.split(" › ")[0]}`;
      const subKey = `${main}|${extra}`;
      areaCounts.set(areaKey, (areaCounts.get(areaKey) ?? 0) + 1);
      subCounts.set(subKey, (subCounts.get(subKey) ?? 0) + 1);
    }
  }
  const areaLinks = [...areaCounts].map(([key, count]) => {
    const [from, to] = key.split("|");
    return { from, to, count };
  });
  const subLinks = [...subCounts]
    .map(([key, count]) => {
      const [from, to] = key.split("|");
      return { from, to, count, share: count / (mainSubCounts.get(from) ?? count) };
    })
    .sort((a, b) => b.count - a.count || b.share - a.share);
  return { areaLinks, subLinks };
})();

const oldAreaCatalog: Record<string, { kind: PillKind; to?: string; note: string }> = {
  "Finans, økonomi og styring": { kind: "old", to: "Finans, økonomi og regnskap", note: "Nytt navn" },
  Ledelse: { kind: "old", to: "Ledelse og strategi", note: "Nytt navn" },
  "Organisasjonsutvikling og Human Resource Management": { kind: "old", to: "HR og organisasjonsutvikling", note: "Nytt navn" },
  "Strategi, innovasjon og bærekraft": { kind: "old", to: "Innovasjon, bærekraft og logistikk", note: "Nytt navn, Strategi er flyttet til Ledelse og strategi" },
  "Markedsføring, kommunikasjon og kultur": { kind: "same", to: "Markedsføring, kommunikasjon og kultur", note: "Beholdt" },
  "Digitalisering og Analytics": { kind: "old", to: "KI, digitalisering og analytics", note: "Nytt navn" },
  "Offentlig sektor": { kind: "removed", note: "Delt opp" },
  "Eiendom, varehandel og forretningsjus": { kind: "old", to: "Juss, skatt og eiendom", note: "Nytt navn" },
  "Internasjonal Business": { kind: "removed", note: "Fjernet" },
  Prosjektledelse: { kind: "removed", note: "Nå underkategori i Ledelse og strategi" },
};
const noOldArea = "Manglet fagområde";

/** Gammel fordeling (bi.no i dag) mot ny fordeling, basert på studiene og kursene i oppsummeringen. */
const beforeAfter = (() => {
  const before = new Map<string, { count: number; multi: number; destinations: Map<string, number> }>();
  const after = new Map<string, { count: number; origins: Map<string, { count: number; weight: number }> }>();
  const extras = new Map<string, Map<string, number>>();
  const subs = new Map<string, Map<string, { main: number; extra: number }>>();
  let withSeveral = 0;
  let withoutArea = 0;
  for (const row of summaryRows) {
    const area = row[0];
    const previous = row[4].split("; ").filter((p) => p !== "–");
    const keys = previous.length ? previous : [noOldArea];
    if (previous.length > 1) withSeveral++;
    if (!previous.length) withoutArea++;
    const target = after.get(area) ?? { count: 0, origins: new Map<string, { count: number; weight: number }>() };
    target.count++;
    for (const key of keys) {
      const origin = target.origins.get(key) ?? { count: 0, weight: 0 };
      origin.count++;
      origin.weight += 1 / keys.length;
      target.origins.set(key, origin);
      const entry = before.get(key) ?? { count: 0, multi: 0, destinations: new Map<string, number>() };
      entry.count++;
      if (previous.length > 1) entry.multi++;
      entry.destinations.set(area, (entry.destinations.get(area) ?? 0) + 1);
      before.set(key, entry);
    }
    after.set(area, target);
    row[6].split("; ").forEach((entry, entryIndex) => {
      const [entryArea, entrySub] = entry.split(" › ");
      const areaSubs = subs.get(entryArea) ?? new Map<string, { main: number; extra: number }>();
      const subEntry = areaSubs.get(entrySub) ?? { main: 0, extra: 0 };
      if (entryIndex === 0) subEntry.main++;
      else subEntry.extra++;
      areaSubs.set(entrySub, subEntry);
      subs.set(entryArea, areaSubs);
    });
    for (const entry of row[6].split("; ").slice(1)) {
      const extraArea = entry.split(" › ")[0];
      if (extraArea === area) continue;
      const fromMain = extras.get(extraArea) ?? new Map<string, number>();
      fromMain.set(area, (fromMain.get(area) ?? 0) + 1);
      extras.set(extraArea, fromMain);
    }
  }
  const pairCount = (oldArea: string, newArea: string) => before.get(oldArea)?.destinations.get(newArea) ?? 0;
  return { before, after, extras, subs, withSeveral, withoutArea, pairCount };
})();

const largestArea = Math.max(...areaTree.map(({ main, extra }) => main + extra));

const treeColors = {
  mainArea: "#0b4db4",
  extraArea: "#9ec0f1",
  mainSub: "#6196f4",
  extraSub: "#c5d9f7",
  extraText: "#0b49a1",
};

const treeLine = "#d5dde4";

type TocItem = { id: string; label: string; gap?: boolean; section?: string; area?: string };

const tocAreas = [...new Set(rows.map(([area]) => area))].sort((a, b) => a.localeCompare(b, "nb"));
const areaAnchor = (area: string) => `fagomrade-${area.toLowerCase().replace(/[^a-z0-9æøå]+/g, "-")}`;

const summaryToc: TocItem[] = [
  { id: "soketest", label: "Fagområdequiz" },
  { id: "tilbakemelding", label: "Tilbakemelding" },
  { id: "hva-gjores", label: "Hva gjøres?", section: "Forklaring" },
  { id: "hvorfor", label: "Hvorfor gjøres dette?" },
  { id: "oversikt-endringer", label: "Hvordan ser dette ut?" },
  ...tocAreas.map((area, index) => ({ id: areaAnchor(area), label: area, area, section: index === 0 ? "Forslag til nye fagområder" : undefined })),
];

function SummaryToc() {
  const [active, setActive] = useState(summaryToc[0].id);
  useEffect(() => {
    const update = () => {
      let current = summaryToc[0].id;
      for (const { id } of summaryToc) {
        const top = document.getElementById(id)?.getBoundingClientRect().top;
        if (top !== undefined && top <= 120) current = id;
      }
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <nav
      aria-label="Innhold"
      style={{ position: "sticky", top: 16, flex: "0 0 200px", maxHeight: "calc(100vh - 32px)", overflowY: "auto", paddingTop: 24 }}
    >
      {summaryToc.map(({ id, label, gap, section, area }) => (
        <Fragment key={id}>
          {section && (
            <div style={{ margin: "16px 0 8px 13px", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--bi-color-neutral-text-secondary)" }}>
              {section}
            </div>
          )}
        <a
          href={`#${id}`}
          aria-current={active === id ? "true" : undefined}
          onClick={(event) => {
            event.preventDefault();
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
            history.replaceState(null, "", `#${id}`);
          }}
          style={{
            display: area ? "flex" : "block",
            alignItems: "flex-start",
            gap: 8,
            marginTop: gap ? 16 : 0,
            padding: "5px 10px",
            borderLeft: `3px solid ${active === id ? "var(--bi-color-primary-stroke-accent)" : "var(--bi-color-neutral-stroke-subtle)"}`,
            color: active === id ? "var(--bi-primary-50)" : "var(--bi-color-neutral-text-secondary)",
            fontWeight: active === id ? 700 : 400,
            textDecoration: "none",
            fontSize: "0.875rem",
            lineHeight: 1.35,
          }}
        >
          {area && (
            <span style={{ display: "flex", marginTop: "0.275em" }}>
              <AreaIcon area={area} />
            </span>
          )}
          <span>{label}</span>
        </a>
        </Fragment>
      ))}
    </nav>
  );
}

const summaryHeading = {
  scrollMarginTop: 16,
  margin: "40px 0 12px",
  padding: "2px 0 2px 12px",
  borderLeft: "4px solid var(--bi-color-primary-stroke-accent)",
  fontFamily: "var(--bi-font-family-brand)",
  fontSize: "1.25rem",
  lineHeight: 1.3,
  color: "var(--bi-color-neutral-text)",
} as const;
const summaryBox = { background: "var(--bi-color-neutral-surface)", borderRadius: "var(--bi-radius-xl)", padding: 24, margin: "24px 0 0" } as const;
const summaryPartHeading = {
  scrollMarginTop: 16,
  margin: "0 0 12px",
  fontFamily: "var(--bi-font-family-brand)",
  fontSize: "1.875rem",
  lineHeight: 1.2,
  color: "var(--bi-color-primary-text)",
} as const;
type Slide = { title: string; content: React.ReactNode };

const roundButtonStyle = (disabled: boolean) =>
  ({
    borderRadius: "50%",
    "--bic-button-background": "var(--bi-basic-white)",
    "--bic-button-box-shadow": "0 0 0 1px var(--bi-color-neutral-stroke) inset",
    opacity: disabled ? 0.45 : 1,
  }) as React.CSSProperties;

function Carousel({ slides, heading }: { slides: Slide[]; heading: React.ReactNode }) {
  const [rawIndex, setIndex] = useState(0);
  const [heights, setHeights] = useState<number[]>([]);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const count = slides.length;
  const index = Math.min(rawIndex, count - 1);
  useEffect(() => {
    const observer = new ResizeObserver(() => setHeights(slideRefs.current.slice(0, count).map((element) => element?.offsetHeight ?? 0)));
    slideRefs.current.slice(0, count).forEach((element) => element && observer.observe(element));
    return () => observer.disconnect();
  }, [count]);
  const height = heights[index] || undefined;
  const go = (next: number) => setIndex(Math.min(slides.length - 1, Math.max(0, next)));
  const roundButton = roundButtonStyle;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        {heading}
        <div style={{ display: "flex", alignItems: "center", gap: "var(--bi-scale-3x)" }}>
          <span style={{ color: "var(--bi-color-neutral-text-secondary)", fontSize: "1.25rem" }}>
            {index + 1} / {slides.length}
          </span>
          <Button icon size="large" variant="outlined" aria-label="Forrige" disabled={index === 0} onClick={() => go(index - 1)} style={roundButton(index === 0)}>
            <ChevronLeftIcon aria-hidden="true" />
          </Button>
          <Button icon size="large" variant="outlined" aria-label="Neste" disabled={index === slides.length - 1} onClick={() => go(index + 1)} style={roundButton(index === slides.length - 1)}>
            <ChevronRightIcon aria-hidden="true" />
          </Button>
        </div>
      </div>
      <div style={{ overflow: "clip", minWidth: 0, height, transition: "height 300ms ease" }}>
        <div style={{ display: "flex", alignItems: "flex-start", transform: `translateX(-${index * 100}%)`, transition: "transform 300ms ease" }}>
          {slides.map(({ title, content }, slideIndex) => (
            <div
              key={title}
              ref={(element) => {
                slideRefs.current[slideIndex] = element;
              }}
              inert={slideIndex !== index}
              aria-hidden={slideIndex !== index}
              style={{
                flex: "0 0 100%",
                minWidth: 0,
                boxSizing: "border-box",
                overflowX: "auto",
                background: "var(--bi-color-neutral-surface-subtle)",
                border: "1px solid var(--bi-color-neutral-stroke-subtle)",
                borderRadius: "var(--bi-radius-large)",
                padding: 24,
              }}
            >
              <h4 style={{ ...summaryHeading, margin: "0 0 16px", minHeight: 32, display: "flex", alignItems: "center" }}>{title}</h4>
              {content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

type EnglishName = { no: string; en: string; terms: string };

/** Engelske forslag til fagområder og underkategorier, basert på begreper fra tittelene til studiene og kursene. */
const englishNames: { area: EnglishName; subcategories: EnglishName[] }[] = [
  {
    area: { no: "Finans, økonomi og regnskap", en: "Finance, Economics and Accounting", terms: "Major in Finance, Major in Economics, Major in Accounting and Business Control" },
    subcategories: [
      { no: "Bedriftsøkonomi og økonomistyring", en: "Business Administration and Management Accounting", terms: "Business Administration, Business, Accounting and Business Control" },
      { no: "Finans og investering", en: "Finance and Investment", terms: "Major in Finance, Quantitative Finance" },
      { no: "Bærekraftig finans", en: "Sustainable Finance", terms: "Sustainable Finance, ESG" },
      { no: "Fintech", en: "Fintech", terms: "Fintech, AI in Financial Services" },
      { no: "Regnskap og revisjon", en: "Accounting and Auditing", terms: "Accounting, Auditing" },
      { no: "Samfunnsøkonomi og matematikk", en: "Economics and Mathematics", terms: "Major in Economics, Applied Microeconomics, Mathematics for Economists" },
    ],
  },
  {
    area: { no: "KI, digitalisering og analytics", en: "AI, Digitalisation and Analytics", terms: "Digital Business, Business Analytics, Generative AI for Business" },
    subcategories: [
      { no: "Digital transformasjon", en: "Digital Transformation", terms: "Digital Transformation, Digital Business" },
      { no: "Data science og analytics", en: "Data Science and Analytics", terms: "Data Science for Business, Business Analytics" },
      { no: "KI", en: "AI", terms: "Generative AI for Business, AI for Strategic Management" },
      { no: "Statistikk og metode", en: "Statistics and Quantitative Methods", terms: "Statistics, Data Analysis" },
      { no: "KI-etikk, regulering og personvern", en: "AI Ethics, Regulation and Data Privacy", terms: "Responsible AI Leadership, AI Act, GDPR" },
    ],
  },
  {
    area: { no: "Juss, skatt og eiendom", en: "Law, Tax and Real Estate", terms: "Business Law, Tax Law, Real Estate" },
    subcategories: [
      { no: "Compliance", en: "Compliance", terms: "Compliance, Governance, Risk Management" },
      { no: "Eiendomsmegling", en: "Real Estate Brokerage", terms: "Real Estate Brokerage" },
      { no: "Forretningsjus og rettsvitenskap", en: "Business Law and Legal Studies", terms: "Business Law, Corporate Law" },
      { no: "Arbeidsrett", en: "Employment Law", terms: "Employment Law" },
      { no: "Skatt og avgift", en: "Taxation and VAT", terms: "Taxation, VAT, Transfer Pricing, International Tax Law" },
    ],
  },
  {
    area: { no: "Helse, skole og barnehage", en: "Health, Schools and Early Childhood", terms: "Healthcare Management, Educational Leadership" },
    subcategories: [
      { no: "Helse", en: "Healthcare", terms: "Healthcare Management, Quality in Healthcare" },
      { no: "Skole og barnehage", en: "School and Early Childhood Education", terms: "Educational Leadership, Principal Programme" },
    ],
  },
  {
    area: { no: "HR og organisasjonsutvikling", en: "HR and Organisational Development", terms: "HRM, Organisational Psychology, Change Management" },
    subcategories: [
      { no: "Arbeidsmiljø", en: "Work Environment and Wellbeing", terms: "Work Environment, Motivation, Occupational Health and Safety" },
      { no: "Organisasjonspsykologi", en: "Organisational Psychology", terms: "Leadership and Organisational Psychology" },
      { no: "Endringsledelse", en: "Change Management", terms: "Change Management, Leadership, Change and Analytics" },
      { no: "HR og personalledelse", en: "Human Resource Management", terms: "HRM, Recruitment and Onboarding" },
    ],
  },
  {
    area: { no: "Innovasjon, bærekraft og logistikk", en: "Innovation, Sustainability and Logistics", terms: "Major in Innovation and Entrepreneurship, Major in Logistics, Operations, and Supply Chain Management" },
    subcategories: [
      { no: "Innovasjon og entreprenørskap", en: "Innovation and Entrepreneurship", terms: "Innovation and Entrepreneurship" },
      { no: "Bærekraft", en: "Sustainability", terms: "Sustainability, ESG, Green Growth" },
      { no: "Logistikk og forsyningskjeder", en: "Logistics and Supply Chain Management", terms: "Supply Chain Management, Major in Logistics, Operations, and Supply Chain Management" },
    ],
  },
  {
    area: { no: "Markedsføring, kommunikasjon og kultur", en: "Marketing, Communication and Culture", terms: "Strategic Marketing Management, Business Communication, International Management" },
    subcategories: [
      { no: "Kunde- og markedsinnsikt", en: "Customer and Market Insight", terms: "Customer and Market Analytics, Marketing Analytics, Consumer Psychology" },
      { no: "Markedsføring", en: "Marketing", terms: "Strategic Marketing Management, Digital Marketing" },
      { no: "Kultur og internasjonal business", en: "Culture and International Business", terms: "International Management, Culture and Ethics" },
      { no: "Kommunikasjon", en: "Strategic Communication", terms: "Business Communication, Marketing Communication" },
    ],
  },
  {
    area: { no: "Ledelse og strategi", en: "Leadership and Strategy", terms: "Bachelor in Management, Master of Management, Leadership in Action, Major in Strategy" },
    subcategories: [
      { no: "Generell ledelse og lederutvikling", en: "General Management and Leadership Development", terms: "Bachelor in Management, Executive MBA, Master of Management, Leadership in Action, Coaching, Negotiation, Leadership Communication" },
      { no: "Prosjektledelse", en: "Project Management", terms: "Project Management, Agile" },
      { no: "Sikkerhets- og beredskapsledelse", en: "Security and Emergency Leadership", terms: "Security Management, Crisis Management" },
      { no: "HR-ledelse og endringsledelse", en: "HR Leadership and Change Management", terms: "Team Leadership, Organisational Psychology, HRM, Work Environment, Change Management, Leadership, Change and Analytics" },
      { no: "Strategisk ledelse", en: "Strategy and Strategic Management", terms: "Major in Strategy, Strategic Management, Ocean Industry Leadership" },
      { no: "Helse-, skole- og barnehageledelse", en: "Healthcare, School and Early Childhood Leadership", terms: "Healthcare Management, Educational Leadership" },
    ],
  },
  {
    area: { no: "Sikkerhet og beredskap", en: "Security and Emergency Preparedness", terms: "Security Management, Crisis Management" },
    subcategories: [
      { no: "Beredskap og krisehåndtering", en: "Emergency Preparedness and Crisis Management", terms: "Crisis Management, Counter-Terrorism" },
      { no: "Sikkerhetsledelse og cybersikkerhet", en: "Security Management and Cybersecurity", terms: "Security Management, Cybersecurity" },
    ],
  },
];

const blueShades = [
  "var(--bi-primary-90)",
  "var(--bi-primary-40)",
  "var(--bi-primary-60)",
  "var(--bi-primary-20)",
  "var(--bi-primary-80)",
  "var(--bi-primary-30)",
  "var(--bi-primary-50)",
  "var(--bi-primary-10)",
  "var(--bi-primary-70)",
];

type OverlapFocus = { from: string; to?: string } | null;
const entryArea = (entry: string) => entry.split(" › ")[0];
const entrySub = (entry: string) => entry.split(" › ")[1];
const isSubEntry = (entry: string) => entry.includes(" › ");

/** Om en kobling mellom to underkategorier passer med valget, enten valget er et fagområde eller en underkategori. */
const linkMatchesFocus = (link: { from: string; to: string }, focus: OverlapFocus) => {
  if (!focus) return true;
  if (isSubEntry(focus.from)) {
    return focus.to ? link.from === focus.from && link.to === focus.to : link.from === focus.from || link.to === focus.from;
  }
  const fromArea = entryArea(focus.from);
  if (focus.to) return entryArea(link.from) === fromArea && entryArea(link.to) === entryArea(focus.to);
  return entryArea(link.from) === fromArea || entryArea(link.to) === fromArea;
};

const chordPoint = (angle: number, r: number) => `${(Math.cos(angle) * r).toFixed(2)} ${(Math.sin(angle) * r).toFixed(2)}`;

function AreaChord({ focus, setFocus }: { focus: OverlapFocus; setFocus: (focus: OverlapFocus) => void }) {
  const radius = 170;
  const ring = 14;
  const gap = 0.06;
  const order = overlapOrder.filter((area) => areaTree.some((node) => node.area === area));
  const links = overlap.areaLinks;
  const point = chordPoint;
  const focusArea = focus ? entryArea(focus.from) : null;
  const focusOther = focus?.to ? entryArea(focus.to) : null;

  const incident = (area: string) =>
    links
      .map((link, index) => ({ link, index }))
      .filter(({ link }) => link.from === area || link.to === area)
      .map(({ link, index }) => ({ index, partner: link.from === area ? link.to : link.from, weight: link.count }));
  const weights = order.map((area) => incident(area).reduce((sum, { weight }) => sum + weight, 0));
  const scale = (2 * Math.PI - gap * order.length) / weights.reduce((sum, weight) => sum + weight, 0);

  const arcs = new Map<string, { start: number; end: number }>();
  const segments = new Map<string, { start: number; end: number }>();
  let cursor = -Math.PI / 2;
  order.forEach((area, areaIndex) => {
    const start = cursor;
    let position = start;
    const ordered = incident(area).sort(
      (a, b) => ((order.indexOf(b.partner) - areaIndex + order.length) % order.length) - ((order.indexOf(a.partner) - areaIndex + order.length) % order.length),
    );
    for (const { index, weight } of ordered) {
      segments.set(`${index}|${area}`, { start: position, end: position + weight * scale });
      position += weight * scale;
    }
    arcs.set(area, { start, end: position });
    cursor = position + gap;
  });

  const isActive = (link: { from: string; to: string }) =>
    !focusArea || (focusOther ? link.from === focusArea && link.to === focusOther : link.from === focusArea || link.to === focusArea);
  const isConnected = (area: string) => !focusArea || area === focusArea || links.some((link) => isActive(link) && (link.from === area || link.to === area));
  const outgoing = (area: string) => links.filter((link) => link.from === area).reduce((sum, link) => sum + link.count, 0);
  const incoming = (area: string) => links.filter((link) => link.to === area).reduce((sum, link) => sum + link.count, 0);

  return (
    <svg viewBox="-400 -270 800 540" role="img" aria-label="Koblinger mellom fagområder" style={{ width: "100%", height: "auto" }} onMouseLeave={() => setFocus(null)}>
      {links.map((link, index) => {
        const from = segments.get(`${index}|${link.from}`);
        const to = segments.get(`${index}|${link.to}`);
        if (!from || !to) return null;
        const path = `M ${point(from.start, radius)} A ${radius} ${radius} 0 0 1 ${point(from.end, radius)} Q 0 0 ${point(to.start, radius)} A ${radius} ${radius} 0 0 1 ${point(to.end, radius)} Q 0 0 ${point(from.start, radius)} Z`;
        return (
          <path
            key={index}
            d={path}
            fill={areaColor(link.from)}
            fillOpacity={isActive(link) ? (focus ? 0.85 : 0.55) : 0.06}
            stroke="#fff"
            strokeWidth={0.5}
            onMouseEnter={() => setFocus({ from: link.from, to: link.to })}
          >
            <title>{`${areaShortName[link.from]} (hovedfagområde) → ${areaShortName[link.to]} (ekstra fagområde): ${link.count}`}</title>
          </path>
        );
      })}
      {order.map((area) => {
        const arc = arcs.get(area);
        if (!arc) return null;
        const middle = (arc.start + arc.end) / 2;
        const cos = Math.cos(middle);
        const anchor = cos > 0.15 ? "start" : cos < -0.15 ? "end" : "middle";
        const [labelX, labelY] = point(middle, radius + ring + 16).split(" ").map(Number);
        const countOffset = Math.sin(middle) < -0.3 ? -15 : 15;
        return (
          <g key={area} onMouseEnter={() => setFocus({ from: area })} style={{ cursor: "default" }} opacity={isConnected(area) ? 1 : 0.3}>
            <path
              d={`M ${point(arc.start, radius + ring / 2 + 1)} A ${radius + ring / 2 + 1} ${radius + ring / 2 + 1} 0 ${arc.end - arc.start > Math.PI ? 1 : 0} 1 ${point(arc.end, radius + ring / 2 + 1)}`}
              fill="none"
              stroke={areaColor(area)}
              strokeWidth={ring}
            />
            {(() => {
              const lines = wrapLabel(areaShortName[area], 22);
              const top = labelY + (countOffset < 0 ? -(lines.length - 1) * 15 : 0);
              return (
                <>
                  <text x={labelX} y={top} textAnchor={anchor} dominantBaseline="middle" fontSize="13" fontWeight={focusArea === area ? 700 : 600} fill="#222d38">
                    {lines.map((line, lineIndex) => (
                      <tspan key={line} x={labelX} dy={lineIndex === 0 ? 0 : 15}>
                        {line}
                      </tspan>
                    ))}
                  </text>
                  <text x={labelX} y={top + (lines.length - 1) * 15 + 15} textAnchor={anchor} dominantBaseline="middle" fontSize="11" fill="#475e75">
                    {`${outgoing(area)} ut, ${incoming(area)} inn`}
                  </text>
                </>
              );
            })()}
          </g>
        );
      })}
    </svg>
  );
}

function SubChord({ focus, setFocus }: { focus: OverlapFocus; setFocus: (focus: OverlapFocus) => void }) {
  const radius = 215;
  const ring = 12;
  const links = overlap.subLinks;
  const point = chordPoint;
  const areaOf = entryArea;
  const subOf = entrySub;

  const nodes = [...new Set(links.flatMap(({ from, to }) => [from, to]))].sort(
    (a, b) => overlapOrder.indexOf(areaOf(a)) - overlapOrder.indexOf(areaOf(b)) || subOf(a).localeCompare(subOf(b), "nb"),
  );
  const incident = (node: string) =>
    links
      .map((link, index) => ({ link, index }))
      .filter(({ link }) => link.from === node || link.to === node)
      .map(({ link, index }) => ({ index, partner: link.from === node ? link.to : link.from, weight: link.count }));
  const weights = nodes.map((node) => incident(node).reduce((sum, { weight }) => sum + weight, 0));
  const nodeGap = 0.008;
  const areaGap = 0.05;
  const gapTotal = nodes.reduce((sum, node, index) => sum + (areaOf(node) !== areaOf(nodes[(index + 1) % nodes.length]) ? areaGap : nodeGap), 0);
  const scale = (2 * Math.PI - gapTotal) / weights.reduce((sum, weight) => sum + weight, 0);

  const arcs = new Map<string, { start: number; end: number }>();
  const segments = new Map<string, { start: number; end: number }>();
  let cursor = -Math.PI / 2;
  nodes.forEach((node, nodeIndex) => {
    const start = cursor;
    let position = start;
    const ordered = incident(node).sort(
      (a, b) =>
        ((nodes.indexOf(b.partner) - nodeIndex + nodes.length) % nodes.length) - ((nodes.indexOf(a.partner) - nodeIndex + nodes.length) % nodes.length),
    );
    for (const { index, weight } of ordered) {
      segments.set(`${index}|${node}`, { start: position, end: position + weight * scale });
      position += weight * scale;
    }
    arcs.set(node, { start, end: position });
    cursor = position + (areaOf(node) !== areaOf(nodes[(nodeIndex + 1) % nodes.length]) ? areaGap : nodeGap);
  });

  const isActive = (link: { from: string; to: string }) => linkMatchesFocus(link, focus);
  const isConnected = (node: string) => !focus || links.some((link) => isActive(link) && (link.from === node || link.to === node));
  const label = (node: string) => `${areaShortName[areaOf(node)] ?? areaOf(node)} › ${subOf(node)}`;

  return (
    <svg viewBox="-520 -450 1040 900" role="img" aria-label="Koblinger mellom underkategorier" style={{ width: "100%", height: "auto" }} onMouseLeave={() => setFocus(null)}>
      {links.map((link, index) => {
        const from = segments.get(`${index}|${link.from}`);
        const to = segments.get(`${index}|${link.to}`);
        if (!from || !to) return null;
        const path = `M ${point(from.start, radius)} A ${radius} ${radius} 0 0 1 ${point(from.end, radius)} Q 0 0 ${point(to.start, radius)} A ${radius} ${radius} 0 0 1 ${point(to.end, radius)} Q 0 0 ${point(from.start, radius)} Z`;
        return (
          <path
            key={index}
            d={path}
            fill={areaColor(areaOf(link.from))}
            fillOpacity={isActive(link) ? (focus ? 0.85 : 0.5) : 0.05}
            stroke="#fff"
            strokeWidth={0.4}
            onMouseEnter={() => setFocus({ from: link.from, to: link.to })}
          >
            <title>{`${label(link.from)} (hovedfagområde) → ${label(link.to)} (ekstra fagområde): ${link.count}`}</title>
          </path>
        );
      })}
      {nodes.map((node) => {
        const arc = arcs.get(node);
        if (!arc) return null;
        const middle = (arc.start + arc.end) / 2;
        const flip = Math.cos(middle) < 0;
        const degrees = (middle * 180) / Math.PI;
        const r = radius + ring / 2 + 1;
        const focused = focus && (focus.from === node || focus.to === node);
        return (
          <g key={node} onMouseEnter={() => setFocus({ from: node })} opacity={isConnected(node) ? 1 : 0.3} style={{ cursor: "default" }}>
            <path
              d={`M ${point(arc.start, r)} A ${r} ${r} 0 ${arc.end - arc.start > Math.PI ? 1 : 0} 1 ${point(arc.end, r)}`}
              fill="none"
              stroke={areaColor(areaOf(node))}
              strokeWidth={ring}
            />
            <g transform={`rotate(${degrees.toFixed(2)}) translate(${radius + ring + 8} 0)`}>
              <text transform={flip ? "rotate(180)" : undefined} textAnchor={flip ? "end" : "start"} dominantBaseline="middle" fontSize="13" fontWeight={focused ? 700 : 400} fill="#222d38">
                {subOf(node)}
              </text>
            </g>
          </g>
        );
      })}
    </svg>
  );
}

function OverlapSection() {
  const [areaFocus, setAreaFocus] = useState<OverlapFocus>(null);
  const [subFocus, setSubFocus] = useState<OverlapFocus>(null);
  const label = (entry: string) => `${areaShortName[entryArea(entry)] ?? entryArea(entry)} › ${entrySub(entry)}`;
  const strongest = overlap.subLinks.slice(0, 10);
  const name = (entry: string) => (isSubEntry(entry) ? label(entry) : (areaShortName[entry] ?? entry));
  const areaTotal = (area: string) => summaryRows.filter((row) => row[0] === area).length;
  const rowsWithExtra = (area: string) => summaryRows.filter((row) => row[0] === area && row[6].split("; ").some((entry) => entryArea(entry) !== area)).length;
  const mainCount = (entry: string) => summaryRows.filter((row) => row[6].split("; ")[0] === entry).length;
  const percent = (part: number, total: number) => `${Math.round((part / Math.max(total, 1)) * 100)} %`;
  const describe = (focus: OverlapFocus, hint: string) => {
    if (!focus) return hint;
    if (focus.to) {
      const count = overlap.subLinks.filter((link) => linkMatchesFocus(link, focus)).reduce((sum, link) => sum + link.count, 0);
      const total = isSubEntry(focus.from) ? mainCount(focus.from) : areaTotal(focus.from);
      return `${name(focus.from)} → ${name(focus.to)}: ${count} av ${total} studier og kurs (${percent(count, total)}) med ${name(focus.from)} som hovedplassering har ${name(focus.to)} som ekstra.`;
    }
    if (isSubEntry(focus.from)) {
      const main = mainCount(focus.from);
      const out = overlap.subLinks.filter((link) => link.from === focus.from).reduce((sum, link) => sum + link.count, 0);
      const inn = overlap.subLinks.filter((link) => link.to === focus.from).reduce((sum, link) => sum + link.count, 0);
      return `${name(focus.from)}: ${main} studier og kurs har denne som hovedplassering${main > 0 ? `, og ${out} av dem (${percent(out, main)}) har også en annen underkategori som ekstra` : ""}. ${inn} studier og kurs fra andre underkategorier har den som ekstra.`;
    }
    const total = areaTotal(focus.from);
    const withExtra = rowsWithExtra(focus.from);
    const inn = overlap.areaLinks.filter((link) => link.to === focus.from).reduce((sum, link) => sum + link.count, 0);
    return `${name(focus.from)}: ${withExtra} av ${total} studier og kurs (${percent(withExtra, total)}) har et ekstra fagområde et annet sted. ${inn} studier og kurs fra andre fagområder har ${name(focus.from)} som ekstra.`;
  };

  return (
    <div>
      <div style={{ fontWeight: 700, color: "var(--bi-color-primary-text-accent)" }}>Sterkeste koblinger mellom underkategorier</div>
      <div style={{ display: "grid", gridTemplateColumns: "24px max-content 72px max-content max-content", columnGap: 12, rowGap: 8, alignItems: "center", margin: "8px 0 20px", fontSize: "0.875rem" }}>
        {strongest.map(({ from, to, count, share }) => (
          <Fragment key={`${from}|${to}`}>
            <span style={{ textAlign: "right", fontWeight: 700 }}>{count}</span>
            <span style={{ justifySelf: "start", padding: "2px 8px", borderRadius: 4, background: "var(--bi-basic-white)", borderLeft: `4px solid ${areaColor(entryArea(from))}` }}>{label(from)}</span>
            <span style={{ justifySelf: "center", width: 44 }}>
              <ChangeArrow />
            </span>
            <span style={{ justifySelf: "start", padding: "2px 8px", borderRadius: 4, background: "var(--bi-basic-white)", borderLeft: `4px solid ${areaColor(entryArea(to))}` }}>{label(to)}</span>
            <span style={{ color: share === 1 ? "var(--bi-success-80)" : "var(--bi-color-neutral-text-secondary)", fontSize: "0.8125rem" }}>
              {share === 1 ? "alle hovedkursene" : `${Math.round(share * 100)} % av hovedkursene`}
            </span>
          </Fragment>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "0 24px", alignItems: "center" }}>
        <div style={{ alignSelf: "start", height: 100 }}>
          <div style={{ fontWeight: 700, color: "var(--bi-color-neutral-text-secondary)" }}>Fagområder</div>
          <p style={{ margin: "2px 0 0", color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.8125rem" }}>
            {describe(areaFocus, "Hold musepekeren over et fagområde eller en strek.")}
          </p>
        </div>
        <div style={{ alignSelf: "start", height: 100 }}>
          <div style={{ fontWeight: 700, color: "var(--bi-color-neutral-text-secondary)" }}>Underkategorier</div>
          <p style={{ margin: "2px 0 0", color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.8125rem" }}>
            {describe(subFocus, "Hold musepekeren over en underkategori eller en strek.")}
          </p>
        </div>
        <AreaChord focus={areaFocus} setFocus={setAreaFocus} />
        <SubChord focus={subFocus} setFocus={setSubFocus} />
      </div>
    </div>
  );
}

const shortOldName = (name: string) => name;

const sankeyLeft = [
  "Finans, økonomi og styring",
  "Ledelse",
  "Organisasjonsutvikling og Human Resource Management",
  "Strategi, innovasjon og bærekraft",
  "Markedsføring, kommunikasjon og kultur",
  "Digitalisering og Analytics",
  "Eiendom, varehandel og forretningsjus",
  "Offentlig sektor",
  "Internasjonal Business",
  "Prosjektledelse",
  noOldArea,
];
const sankeyRight = [
  "Finans, økonomi og regnskap",
  "Ledelse og strategi",
  "HR og organisasjonsutvikling",
  "Innovasjon, bærekraft og logistikk",
  "Markedsføring, kommunikasjon og kultur",
  "KI, digitalisering og analytics",
  "Juss, skatt og eiendom",
  "Helse, skole og barnehage",
  "Sikkerhet og beredskap",
];

function BeforeAfterSankey() {
  const [focus, setFocus] = useState<{ side: "old" | "new"; name: string } | null>(null);
  const width = 640;
  const nodeWidth = 14;
  const gap = 9;
  const flows = new Map<string, number>();
  const leftCounts = new Map<string, number>();
  const rightCounts = new Map<string, number>();
  let totalFlow = 0;
  for (const row of summaryRows) {
    const previous = row[4].split("; ").filter((p) => p !== "–");
    const keys = previous.length ? previous : [noOldArea];
    const extraTargets = row[6].split("; ").slice(1).map((entry) => entry.split(" › ")[0]).filter((area) => area !== row[0]);
    for (const target of [row[0], ...extraTargets]) {
      for (const key of keys) flows.set(`${key}|${target}`, (flows.get(`${key}|${target}`) ?? 0) + 1 / keys.length);
      rightCounts.set(target, (rightCounts.get(target) ?? 0) + 1);
      totalFlow++;
    }
    for (const key of keys) leftCounts.set(key, (leftCounts.get(key) ?? 0) + 1);
  }
  // Skalaen gir et høyere diagram enn før, og høyden vokser med antall ekstra plasseringer
  const gaps = gap * (sankeyLeft.length - 1);
  const scale = (720 - gaps) / summaryRows.length;
  const height = totalFlow * scale + gaps;
  const leftTotals = new Map(sankeyLeft.map((name) => [name, sankeyRight.reduce((sum, to) => sum + (flows.get(`${name}|${to}`) ?? 0), 0)]));
  const rightTotals = new Map(sankeyRight.map((name) => [name, sankeyLeft.reduce((sum, from) => sum + (flows.get(`${from}|${name}`) ?? 0), 0)]));
  const rightHeight = totalFlow * scale + gap * (sankeyRight.length - 1);
  const rightOffset = (height - rightHeight) / 2;

  const leftY = new Map<string, number>();
  let cursor = 0;
  for (const name of sankeyLeft) {
    leftY.set(name, cursor);
    cursor += (leftTotals.get(name) ?? 0) * scale + gap;
  }
  const rightY = new Map<string, number>();
  cursor = rightOffset;
  for (const name of sankeyRight) {
    rightY.set(name, cursor);
    cursor += (rightTotals.get(name) ?? 0) * scale + gap;
  }
  const leftCursor = new Map(leftY);
  const rightCursor = new Map(rightY);
  const bands: { from: string; to: string; value: number; y0: number; y1: number }[] = [];
  for (const from of sankeyLeft) {
    for (const to of sankeyRight) {
      const value = flows.get(`${from}|${to}`) ?? 0;
      if (value <= 0) continue;
      bands.push({ from, to, value, y0: leftCursor.get(from) ?? 0, y1: 0 });
      leftCursor.set(from, (leftCursor.get(from) ?? 0) + value * scale);
    }
  }
  for (const to of sankeyRight) {
    for (const band of bands.filter((candidate) => candidate.to === to).sort((a, b) => sankeyLeft.indexOf(a.from) - sankeyLeft.indexOf(b.from))) {
      band.y1 = rightCursor.get(to) ?? 0;
      rightCursor.set(to, (rightCursor.get(to) ?? 0) + band.value * scale);
    }
  }
  const isActive = (band: { from: string; to: string }) => !focus || (focus.side === "old" ? band.from === focus.name : band.to === focus.name);
  const leftColor = (name: string) => {
    const target = oldAreaCatalog[name]?.to;
    return target ? areaColor(target) : name === noOldArea ? "#d5dde4" : "#c8d1db";
  };
  const count = (name: string) => leftCounts.get(name) ?? 0;
  const newCount = (name: string) => rightCounts.get(name) ?? 0;

  // Tredje nivå (kun hoved og ekstra samlet): fra totalen i hvert nye fagområde videre til bare dem som har det som hovedfagområde
  const kindGap = 380;
  const kindX = width + kindGap;
  const viewWidth = 330 + kindX + nodeWidth + 520;
  const fontSize = (12 * viewWidth) / (width + 640);
  const mainCount = (name: string) => beforeAfter.after.get(name)?.count ?? 0;
  // Båndet starter like høyt som hele fagområdet og smalner gradvis inn til de som har det som hovedfagområde. Hovedfagområdet står midt for fagområdet.
  const kindBands = sankeyRight
    .filter((area) => mainCount(area) > 0)
    .map((area) => {
      const fullHeight = (rightTotals.get(area) ?? 0) * scale;
      const mainHeight = mainCount(area) * scale;
      const top = rightY.get(area) ?? 0;
      return { area, value: mainCount(area), top, fullHeight, mainHeight, y: top + (fullHeight - mainHeight) / 2 };
    });
  const isKindActive = (area: string) =>
    !focus || (focus.side === "new" ? area === focus.name : (flows.get(`${focus.name}|${area}`) ?? 0) > 0);
  const bandPath = (x0: number, x1: number, y0: number, y1: number, h: number, endHeight = h) => {
    const c = (x1 - x0) / 2;
    return `M ${x0} ${y0} C ${x0 + c} ${y0} ${x1 - c} ${y1} ${x1} ${y1} L ${x1} ${y1 + endHeight} C ${x1 - c} ${y1 + endHeight} ${x0 + c} ${y0 + h} ${x0} ${y0 + h} Z`;
  };
  const halo = { stroke: "#fff", strokeWidth: 4, paintOrder: "stroke" as const };
  // Kolonnetitlene står midt over teksten til fagområdene i hver kolonne, med en strek under som viser kolonnebredden
  const textWidth = (lines: string[]) => Math.max(...lines.map((line) => line.length)) * fontSize * 0.55;
  const columnWidth = (lines: string[][]) => Math.max(...lines.map(textWidth));
  const leftWidth = columnWidth(sankeyLeft.map((name) => [...wrapLabel(shortOldName(name), 34).slice(0, -1), `${wrapLabel(shortOldName(name), 34).slice(-1)[0]} ${count(name)}`]));
  const rightWidth = columnWidth(kindBands.map(({ area, value }) => [`${wrapLabel(`Hovedfagområde: ${areaShortName[area] ?? area}`, 42).slice(-1)[0]} ${value}`, ...wrapLabel(`Hovedfagområde: ${areaShortName[area] ?? area}`, 42)]));
  const headers = [
    { label: "BI.no nå", center: -8 - leftWidth / 2 },
    { label: "Migrering", center: (nodeWidth + width - nodeWidth) / 2 },
    { label: "Hovedfagområde + Ekstra fagområder", center: (width - nodeWidth + kindX) / 2 },
    { label: "Kun hovedfagområde", center: kindX + nodeWidth + 8 + rightWidth / 2 },
  ];
  // Tittelraden er en tabellrad: skillelinjene ligger der kolonnene i diagrammet starter og slutter
  const headerDividers = [nodeWidth, width - nodeWidth, kindX];
  const headerLeft = -330;
  const headerRight = viewWidth - 330;

  return (
    <svg viewBox={`-330 -60 ${viewWidth} ${height + 70}`} role="img" aria-label="Fra gamle fagområder til nye fagområder, både hoved og ekstra, og videre til bare hovedfagområdene" style={{ width: "100%", height: "auto", margin: "0 0 20px" }} onMouseLeave={() => setFocus(null)}>
      <g stroke="#90a3b7" strokeWidth={2}>
        <line x1={headerLeft} x2={headerRight} y1={-56} y2={-56} />
        <line x1={headerLeft} x2={headerRight} y1={-6} y2={-6} />
        {headerDividers.map((x) => (
          <line key={x} x1={x} x2={x} y1={-56} y2={-6} />
        ))}
      </g>
      <g fontSize={fontSize * 1.1} fontWeight={700} fill="#222d38" textAnchor="middle" dominantBaseline="middle">
        {headers.map(({ label, center }) => (
          <text key={label} x={center} y={-31}>
            {label}
          </text>
        ))}
      </g>
      {bands.map((band) => {
        const h = band.value * scale;
        const path = bandPath(nodeWidth, width - nodeWidth, band.y0, band.y1, h);
        return (
          <path key={`${band.from}|${band.to}`} d={path} fill={areaColor(band.to)} fillOpacity={isActive(band) ? (focus ? 0.8 : 0.5) : 0.06}>
            <title>{`${band.from} → ${band.to}: ${Math.round(band.value * 10) / 10}`}</title>
          </path>
        );
      })}
      {kindBands.map((band) => (
        <path key={band.area} d={bandPath(width, kindX, band.top, band.y, band.fullHeight, band.mainHeight)} fill={areaColor(band.area)} fillOpacity={isKindActive(band.area) ? (focus ? 0.8 : 0.5) : 0.06}>
          <title>{`${band.area} → Hovedfagområde for ${areaShortName[band.area] ?? band.area}: ${band.value} av ${newCount(band.area)}`}</title>
        </path>
      ))}
      {sankeyLeft.map((name) => {
        const y = leftY.get(name) ?? 0;
        const h = Math.max((leftTotals.get(name) ?? 0) * scale, 2);
        return (
          <g key={name} onMouseEnter={() => setFocus({ side: "old", name })} opacity={!focus || (focus.side === "old" && focus.name === name) || bands.some((b) => b.from === name && isActive(b)) ? 1 : 0.35}>
            <rect x={0} y={y} width={nodeWidth} height={h} fill={leftColor(name)} />
            <text x={-8} y={y + h / 2} textAnchor="end" dominantBaseline="middle" fontSize={fontSize} fill="#222d38" textDecoration={oldAreaCatalog[name]?.kind === "removed" ? "line-through" : undefined}>
              {wrapLabel(shortOldName(name), 34).map((line, lineIndex, all) => (
                <tspan key={line} x={-8} dy={lineIndex === 0 ? `${-(all.length - 1) * 0.6}em` : "1.2em"}>
                  {line}
                  {lineIndex === all.length - 1 && <tspan fontWeight="700"> {count(name)}</tspan>}
                </tspan>
              ))}
            </text>
          </g>
        );
      })}
      {sankeyRight.map((name) => {
        const y = rightY.get(name) ?? 0;
        const h = Math.max((rightTotals.get(name) ?? 0) * scale, 2);
        return (
          <g key={name} onMouseEnter={() => setFocus({ side: "new", name })} opacity={!focus || (focus.side === "new" && focus.name === name) || bands.some((b) => b.to === name && isActive(b)) ? 1 : 0.35}>
            <rect x={width - nodeWidth} y={y} width={nodeWidth} height={h} fill={areaColor(name)} />
            <text x={width + 8} y={y + h / 2} textAnchor="start" dominantBaseline="middle" fontSize={fontSize} fill="#222d38" {...halo}>
              {wrapLabel(areaShortName[name] ?? name, 28).map((line, lineIndex, all) => (
                <tspan key={line} x={width + 8} dy={lineIndex === 0 ? `${-(all.length - 1) * 0.6}em` : "1.2em"}>
                  {line}
                  {lineIndex === all.length - 1 && <tspan fontWeight="700"> {newCount(name)}</tspan>}
                </tspan>
              ))}
            </text>
          </g>
        );
      })}
      {kindBands.map(({ area, value, y }) => (
        <g key={area} onMouseEnter={() => setFocus({ side: "new", name: area })} opacity={isKindActive(area) ? 1 : 0.35}>
          <rect x={kindX} y={y} width={nodeWidth} height={Math.max(value * scale, 2)} fill={areaColor(area)} />
          <text x={kindX + nodeWidth + 8} y={y + (value * scale) / 2} dominantBaseline="middle" fontSize={fontSize} fill="#222d38">
            {wrapLabel(`Hovedfagområde: ${areaShortName[area] ?? area}`, 42).map((line, lineIndex, all) => (
              <tspan key={line} x={kindX + nodeWidth + 8} dy={lineIndex === 0 ? `${-(all.length - 1) * 0.6}em` : "1.2em"}>
                {line}
                {lineIndex === all.length - 1 && <tspan fontWeight="700"> {value}</tspan>}
              </tspan>
            ))}
          </text>
        </g>
      ))}
    </svg>
  );
}

/** Som BeforeAfterSankey, men fra gamle fagområder til de nye underkategoriene (hoved + ekstra) og videre til bare hovedplasseringene. */
function SubcategoryMigrationSankey() {
  const [focus, setFocus] = useState<{ side: "old" | "new"; name: string } | null>(null);
  const width = 640;
  const nodeWidth = 14;
  const gap = 5;
  const areaGap = 14;
  const scale = 3;
  const kindGap = 380;
  const kindX = width + kindGap;
  const viewWidth = 330 + kindX + nodeWidth + 520;
  const fontSize = (12 * viewWidth) / (width + 640);
  const minNode = fontSize * 1.25;

  const flows = new Map<string, number>();
  const leftCounts = new Map<string, number>();
  const placements = new Map<string, { total: number; main: number }>();
  for (const row of summaryRows) {
    const previous = row[4].split("; ").filter((p) => p !== "–");
    const keys = previous.length ? previous : [noOldArea];
    row[6].split("; ").forEach((entry, index) => {
      const current = placements.get(entry) ?? { total: 0, main: 0 };
      current.total += 1;
      if (index === 0) current.main += 1;
      placements.set(entry, current);
      for (const key of keys) flows.set(`${key}|${entry}`, (flows.get(`${key}|${entry}`) ?? 0) + 1 / keys.length);
    });
    for (const key of keys) leftCounts.set(key, (leftCounts.get(key) ?? 0) + 1);
  }
  const rightList = sankeyRight.flatMap((area) =>
    [...placements.keys()]
      .filter((entry) => entry.startsWith(`${area} › `))
      .sort((a, b) => (placements.get(b)?.total ?? 0) - (placements.get(a)?.total ?? 0) || a.localeCompare(b, "nb")),
  );
  const subName = (entry: string) => entry.split(" › ")[1];
  const areaOf = (entry: string) => entry.split(" › ")[0];
  const leftTotals = new Map(sankeyLeft.map((name) => [name, rightList.reduce((sum, to) => sum + (flows.get(`${name}|${to}`) ?? 0), 0)]));
  const rightSize = (entry: string) => Math.max((placements.get(entry)?.total ?? 0) * scale, minNode);

  const leftY = new Map<string, number>();
  let cursor = 0;
  for (const name of sankeyLeft) {
    leftY.set(name, cursor);
    cursor += (leftTotals.get(name) ?? 0) * scale + 9;
  }
  const leftHeight = cursor - 9;
  const rightY = new Map<string, number>();
  cursor = 0;
  rightList.forEach((entry, index) => {
    if (index > 0) cursor += areaOf(entry) === areaOf(rightList[index - 1]) ? gap : areaGap;
    rightY.set(entry, cursor);
    cursor += rightSize(entry);
  });
  const rightHeight = cursor;
  const height = Math.max(leftHeight, rightHeight);
  const leftShift = (height - leftHeight) / 2;
  const rightShift = (height - rightHeight) / 2;
  const leftTop = (name: string) => (leftY.get(name) ?? 0) + leftShift;
  const rightTop = (entry: string) => (rightY.get(entry) ?? 0) + rightShift;

  const leftCursor = new Map(sankeyLeft.map((name) => [name, leftTop(name)]));
  const rightCursor = new Map(rightList.map((entry) => [entry, rightTop(entry) + (rightSize(entry) - (placements.get(entry)?.total ?? 0) * scale) / 2]));
  const bands: { from: string; to: string; value: number; y0: number; y1: number }[] = [];
  for (const from of sankeyLeft) {
    for (const to of rightList) {
      const value = flows.get(`${from}|${to}`) ?? 0;
      if (value <= 0) continue;
      bands.push({ from, to, value, y0: leftCursor.get(from) ?? 0, y1: 0 });
      leftCursor.set(from, (leftCursor.get(from) ?? 0) + value * scale);
    }
  }
  for (const to of rightList) {
    for (const band of bands.filter((candidate) => candidate.to === to).sort((a, b) => sankeyLeft.indexOf(a.from) - sankeyLeft.indexOf(b.from))) {
      band.y1 = rightCursor.get(to) ?? 0;
      rightCursor.set(to, (rightCursor.get(to) ?? 0) + band.value * scale);
    }
  }
  const isActive = (band: { from: string; to: string }) => !focus || (focus.side === "old" ? band.from === focus.name : band.to === focus.name);
  const isKindActive = (entry: string) => !focus || (focus.side === "new" ? entry === focus.name : (flows.get(`${focus.name}|${entry}`) ?? 0) > 0);
  const leftColor = (name: string) => {
    const target = oldAreaCatalog[name]?.to;
    return target ? areaColor(target) : name === noOldArea ? "#d5dde4" : "#c8d1db";
  };
  const bandPath = (x0: number, x1: number, y0: number, y1: number, h: number, endHeight = h) => {
    const c = (x1 - x0) / 2;
    return `M ${x0} ${y0} C ${x0 + c} ${y0} ${x1 - c} ${y1} ${x1} ${y1} L ${x1} ${y1 + endHeight} C ${x1 - c} ${y1 + endHeight} ${x0 + c} ${y0 + h} ${x0} ${y0 + h} Z`;
  };
  const kindNodes = rightList
    .filter((entry) => (placements.get(entry)?.main ?? 0) > 0)
    .map((entry) => {
      const fullHeight = (placements.get(entry)?.total ?? 0) * scale;
      const mainHeight = (placements.get(entry)?.main ?? 0) * scale;
      const center = rightTop(entry) + rightSize(entry) / 2;
      return { entry, fullHeight, mainHeight, top: center - fullHeight / 2, y: center - mainHeight / 2, main: placements.get(entry)?.main ?? 0 };
    });
  const halo = { stroke: "#fff", strokeWidth: 4, paintOrder: "stroke" as const };

  const textWidth = (text: string) => text.length * fontSize * 0.55;
  const leftWidth = Math.max(...sankeyLeft.map((name) => textWidth(`${shortOldName(name)} ${leftCounts.get(name) ?? 0}`)));
  const kindWidth = Math.max(...kindNodes.map(({ entry, main }) => textWidth(`${subName(entry)} ${main}`)));
  const headers = [
    { label: "BI.no nå", center: -8 - Math.min(leftWidth, 300) / 2 },
    { label: "Migrering", center: width / 2 },
    { label: "Underkategorier (hoved + ekstra)", center: (width - nodeWidth + kindX) / 2 },
    { label: "Kun hovedplassering", center: kindX + nodeWidth + 8 + kindWidth / 2 },
  ];
  const headerDividers = [nodeWidth, width - nodeWidth, kindX];
  const headerLeft = -330;
  const headerRight = viewWidth - 330;

  return (
    <svg viewBox={`-330 -60 ${viewWidth} ${height + 70}`} role="img" aria-label="Fra gamle fagområder til nye underkategorier, både hoved og ekstra, og videre til bare hovedplasseringene" style={{ width: "100%", height: "auto", margin: "0 0 20px" }} onMouseLeave={() => setFocus(null)}>
      <g stroke="#90a3b7" strokeWidth={2}>
        <line x1={headerLeft} x2={headerRight} y1={-56} y2={-56} />
        <line x1={headerLeft} x2={headerRight} y1={-6} y2={-6} />
        {headerDividers.map((x) => (
          <line key={x} x1={x} x2={x} y1={-56} y2={-6} />
        ))}
      </g>
      <g fontSize={fontSize * 1.1} fontWeight={700} fill="#222d38" textAnchor="middle" dominantBaseline="middle">
        {headers.map(({ label, center }) => (
          <text key={label} x={center} y={-31}>
            {label}
          </text>
        ))}
      </g>
      {bands.map((band) => (
        <path key={`${band.from}|${band.to}`} d={bandPath(nodeWidth, width - nodeWidth, band.y0, band.y1, band.value * scale)} fill={areaColor(areaOf(band.to))} fillOpacity={isActive(band) ? (focus ? 0.8 : 0.5) : 0.06}>
          <title>{`${band.from} → ${band.to}: ${Math.round(band.value * 10) / 10}`}</title>
        </path>
      ))}
      {kindNodes.map(({ entry, top, y, fullHeight, mainHeight }) => (
        <path key={entry} d={bandPath(width, kindX, top, y, fullHeight, mainHeight)} fill={areaColor(areaOf(entry))} fillOpacity={isKindActive(entry) ? (focus ? 0.8 : 0.5) : 0.06}>
          <title>{`${entry}: ${placements.get(entry)?.main} av ${placements.get(entry)?.total} har den som hovedplassering`}</title>
        </path>
      ))}
      {sankeyLeft.map((name) => {
        const y = leftTop(name);
        const h = Math.max((leftTotals.get(name) ?? 0) * scale, 2);
        return (
          <g key={name} onMouseEnter={() => setFocus({ side: "old", name })} opacity={!focus || (focus.side === "old" && focus.name === name) || bands.some((b) => b.from === name && isActive(b)) ? 1 : 0.35}>
            <rect x={0} y={y} width={nodeWidth} height={h} fill={leftColor(name)} />
            <text x={-8} y={y + h / 2} textAnchor="end" dominantBaseline="middle" fontSize={fontSize} fill="#222d38" textDecoration={oldAreaCatalog[name]?.kind === "removed" ? "line-through" : undefined}>
              {wrapLabel(shortOldName(name), 34).map((line, lineIndex, all) => (
                <tspan key={line} x={-8} dy={lineIndex === 0 ? `${-(all.length - 1) * 0.6}em` : "1.2em"}>
                  {line}
                  {lineIndex === all.length - 1 && <tspan fontWeight="700"> {leftCounts.get(name) ?? 0}</tspan>}
                </tspan>
              ))}
            </text>
          </g>
        );
      })}
      {rightList.map((entry) => (
        <g key={entry} onMouseEnter={() => setFocus({ side: "new", name: entry })} opacity={!focus || (focus.side === "new" && focus.name === entry) || bands.some((b) => b.to === entry && isActive(b)) ? 1 : 0.35}>
          <rect x={width - nodeWidth} y={rightTop(entry)} width={nodeWidth} height={rightSize(entry)} fill={areaColor(areaOf(entry))} />
          <text x={width + 8} y={rightTop(entry) + rightSize(entry) / 2} dominantBaseline="middle" fontSize={fontSize} fill="#222d38" {...halo}>
            {subName(entry)}
            <tspan fontWeight="700"> {placements.get(entry)?.total}</tspan>
          </text>
        </g>
      ))}
      {kindNodes.map(({ entry, y, mainHeight, main }) => (
        <g key={entry} onMouseEnter={() => setFocus({ side: "new", name: entry })} opacity={isKindActive(entry) ? 1 : 0.35}>
          <rect x={kindX} y={y} width={nodeWidth} height={Math.max(mainHeight, 2)} fill={areaColor(areaOf(entry))} />
          <text x={kindX + nodeWidth + 8} y={y + mainHeight / 2} dominantBaseline="middle" fontSize={fontSize} fill="#222d38">
            {subName(entry)}
            <tspan fontWeight="700"> {main}</tspan>
          </text>
        </g>
      ))}
    </svg>
  );
}

function PublicSectorSankey() {
  const targets = ["Helse, skole og barnehage", "Sikkerhet og beredskap", "Juss, skatt og eiendom"];
  const publicSector = "Offentlig sektor";
  const width = 400;
  const nodeWidth = 14;
  const gap = 9;
  const scale = 5;
  const originsOf = (row: Row) => {
    const previous = row[4].split("; ").filter((p) => p !== "–");
    if (!previous.length) return [noOldArea];
    return [previous.includes(publicSector) ? publicSector : previous[0]];
  };
  const targetRows = summaryRows.filter((row) => targets.includes(row[0]));
  const nodeOf = (key: string) => key;
  const flows = new Map<string, number>();
  const counts = new Map<string, number>();
  for (const row of targetRows) {
    const keys = originsOf(row);
    for (const key of keys) {
      const node = nodeOf(key);
      flows.set(`${node}|${row[0]}`, (flows.get(`${node}|${row[0]}`) ?? 0) + 1 / keys.length);
      counts.set(node, (counts.get(node) ?? 0) + 1);
    }
  }
  const targetCenter = (name: string) => {
    const total = targets.reduce((sum, to) => sum + (flows.get(`${name}|${to}`) ?? 0), 0);
    return targets.reduce((sum, to, index) => sum + index * (flows.get(`${name}|${to}`) ?? 0), 0) / (total || 1);
  };
  const left = [...counts.keys()].sort((a, b) => targetCenter(a) - targetCenter(b) || (counts.get(b) ?? 0) - (counts.get(a) ?? 0));
  const sumOf = (list: string[], other: (name: string) => string) => (name: string) => list.reduce((sum, item) => sum + (flows.get(other(item) + "|" + name) ?? 0), 0);
  const leftTotals = new Map(left.map((name) => [name, targets.reduce((sum, to) => sum + (flows.get(`${name}|${to}`) ?? 0), 0)]));
  const rightTotals = new Map(targets.map((name) => [name, sumOf(left, (item) => item)(name)]));
  const minNode = 30;
  const leftSize = (name: string) => Math.max((leftTotals.get(name) ?? 0) * scale, minNode);
  const rightSize = (name: string) => Math.max((rightTotals.get(name) ?? 0) * scale, minNode);
  const leftHeight = left.reduce((sum, name) => sum + leftSize(name), 0) + gap * (left.length - 1);
  const rightHeight = targets.reduce((sum, name) => sum + rightSize(name), 0) + gap * (targets.length - 1);
  const height = Math.max(leftHeight, rightHeight);

  const place = (names: string[], size: (name: string) => number, offset: number) => {
    const positions = new Map<string, number>();
    let cursor = offset;
    for (const name of names) {
      positions.set(name, cursor);
      cursor += size(name) + gap;
    }
    return positions;
  };
  const leftY = place(left, leftSize, (height - leftHeight) / 2);
  const rightY = place(targets, rightSize, (height - rightHeight) / 2);
  const leftCursor = new Map(left.map((name) => [name, (leftY.get(name) ?? 0) + (leftSize(name) - (leftTotals.get(name) ?? 0) * scale) / 2]));
  const rightCursor = new Map(targets.map((name) => [name, (rightY.get(name) ?? 0) + (rightSize(name) - (rightTotals.get(name) ?? 0) * scale) / 2]));
  const bands: { from: string; to: string; value: number; y0: number; y1: number }[] = [];
  for (const from of left) {
    for (const to of targets) {
      const value = flows.get(`${from}|${to}`) ?? 0;
      if (value <= 0) continue;
      bands.push({ from, to, value, y0: leftCursor.get(from) ?? 0, y1: 0 });
      leftCursor.set(from, (leftCursor.get(from) ?? 0) + value * scale);
    }
  }
  for (const to of targets) {
    for (const band of bands.filter((candidate) => candidate.to === to)) {
      band.y1 = rightCursor.get(to) ?? 0;
      rightCursor.set(to, (rightCursor.get(to) ?? 0) + band.value * scale);
    }
  }
  const targetColor: Record<string, string> = {
    "Helse, skole og barnehage": "var(--bi-primary-60)",
    "Sikkerhet og beredskap": "var(--bi-primary-40)",
    "Juss, skatt og eiendom": "var(--bi-neutral-40)",
  };
  const leftColor = (name: string) => {
    if (name === publicSector || name.startsWith("Strategi")) return "var(--bi-primary-60)";
    if (name === noOldArea) return "var(--bi-primary-40)";
    if (/Finans|Eiendom|Juss/.test(name)) return "var(--bi-neutral-40)";
    return ["var(--bi-primary-60)", "var(--bi-primary-40)", "var(--bi-primary-50)"][left.indexOf(name) % 3];
  };

  return (
    <svg viewBox={`-240 -10 ${width + 480} ${height + 20}`} role="img" aria-label="Fra Offentlig sektor og andre fagområder til helse, sikkerhet og juss" style={{ width: "100%", height: "auto" }}>
      {bands.map((band) => {
        const h = band.value * scale;
        const x0 = nodeWidth;
        const x1 = width - nodeWidth;
        const c = (x1 - x0) / 2;
        const path = `M ${x0} ${band.y0} C ${x0 + c} ${band.y0} ${x1 - c} ${band.y1} ${x1} ${band.y1} L ${x1} ${band.y1 + h} C ${x1 - c} ${band.y1 + h} ${x0 + c} ${band.y0 + h} ${x0} ${band.y0 + h} Z`;
        return (
          <path key={`${band.from}|${band.to}`} d={path} fill={targetColor[band.to]} fillOpacity={0.5}>
            <title>{`${band.from} → ${band.to}: ${Math.round(band.value * 10) / 10}`}</title>
          </path>
        );
      })}
      {left.map((name) => {
        const y = leftY.get(name) ?? 0;
        const h = leftSize(name);
        return (
          <g key={name}>
            <rect x={0} y={y} width={nodeWidth} height={h} fill={leftColor(name)} />
            <text x={-8} y={y + h / 2} textAnchor="end" dominantBaseline="middle" fontSize="12" fill="#222d38" textDecoration={name === publicSector ? "line-through" : undefined}>
              {wrapLabel(shortOldName(name), 30).map((line, lineIndex, all) => (
                <tspan key={line} x={-8} dy={lineIndex === 0 ? `${-(all.length - 1) * 0.6}em` : "1.2em"}>
                  {line}
                  {lineIndex === all.length - 1 && <tspan fontWeight="700"> {counts.get(name) ?? 0}</tspan>}
                </tspan>
              ))}
            </text>
          </g>
        );
      })}
      {targets.map((name) => {
        const y = rightY.get(name) ?? 0;
        const h = rightSize(name);
        return (
          <g key={name}>
            <rect x={width - nodeWidth} y={y} width={nodeWidth} height={h} fill={targetColor[name]} />
            <text x={width + 8} y={y + h / 2} textAnchor="start" dominantBaseline="middle" fontSize="12" fill="#222d38">
              {wrapLabel(areaShortName[name] ?? name, 30).map((line, lineIndex, all) => (
                <tspan key={line} x={width + 8} dy={lineIndex === 0 ? `${-(all.length - 1) * 0.6}em` : "1.2em"}>
                  {line}
                  {lineIndex === all.length - 1 && <tspan fontWeight="700"> {beforeAfter.after.get(name)?.count ?? 0}</tspan>}
                </tspan>
              ))}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function LedelseSankey() {
  const { after, extras } = beforeAfter;
  const width = 400;
  const nodeWidth = 14;
  const gap = 9;
  const scale = 4;
  const minNode = 28;
  const main = after.get("Ledelse og strategi")?.count ?? 0;
  const sources = [
    { key: "Ledelse og strategi", label: "Ledelse og strategi som hovedfagområde", value: main },
    ...[...(extras.get("Ledelse og strategi") ?? [])].sort((x, y) => y[1] - x[1]).map(([area, value]) => ({ key: area, label: `Ekstra fra ${areaShortName[area] ?? area}`, value })),
  ];
  const total = sources.reduce((sum, source) => sum + source.value, 0);
  const sizeOf = (value: number) => Math.max(value * scale, minNode);
  const leftHeight = sources.reduce((sum, source) => sum + sizeOf(source.value), 0) + gap * (sources.length - 1);
  const rightHeight = total * scale;
  const height = Math.max(leftHeight, rightHeight);
  const colors = blueShades;
  const rightY = (height - rightHeight) / 2;
  let leftCursor = (height - leftHeight) / 2;
  let rightCursor = rightY;
  const nodes = sources.map((source, index) => {
    const size = sizeOf(source.value);
    const bandHeight = source.value * scale;
    const node = { ...source, color: colors[index % colors.length], y: leftCursor, size, y0: leftCursor + (size - bandHeight) / 2, y1: rightCursor, bandHeight };
    leftCursor += size + gap;
    rightCursor += bandHeight;
    return node;
  });

  return (
    <svg viewBox={`-240 -10 ${width + 400} ${height + 20}`} role="img" aria-label="Studier og kurs i Ledelse og strategi, fordelt på hovedfagområde" style={{ width: "100%", height: "auto" }}>
      {nodes.map((node) => {
        const x0 = nodeWidth;
        const x1 = width - nodeWidth;
        const c = (x1 - x0) / 2;
        const path = `M ${x0} ${node.y0} C ${x0 + c} ${node.y0} ${x1 - c} ${node.y1} ${x1} ${node.y1} L ${x1} ${node.y1 + node.bandHeight} C ${x1 - c} ${node.y1 + node.bandHeight} ${x0 + c} ${node.y0 + node.bandHeight} ${x0} ${node.y0 + node.bandHeight} Z`;
        return (
          <path key={node.key} d={path} fill={node.color} fillOpacity={0.5}>
            <title>{`${node.label}: ${node.value}`}</title>
          </path>
        );
      })}
      {nodes.map((node) => (
        <g key={node.key}>
          <rect x={0} y={node.y} width={nodeWidth} height={node.size} fill={node.color} />
          <text x={-8} y={node.y + node.size / 2} textAnchor="end" dominantBaseline="middle" fontSize="12" fill="#222d38">
            {wrapLabel(node.label, 30).map((line, lineIndex, all) => (
              <tspan key={line} x={-8} dy={lineIndex === 0 ? `${-(all.length - 1) * 0.6}em` : "1.2em"}>
                {line}
                {lineIndex === all.length - 1 && <tspan fontWeight="700"> {node.value}</tspan>}
              </tspan>
            ))}
          </text>
        </g>
      ))}
      <rect x={width - nodeWidth} y={rightY} width={nodeWidth} height={rightHeight} fill="var(--bi-primary-90)" />
      <text x={width + 8} y={rightY + rightHeight / 2} dominantBaseline="middle" fontSize="12" fill="#222d38">
        Ledelse og strategi <tspan fontWeight="700">{total}</tspan>
      </text>
    </svg>
  );
}

type BeforeAfterExample = { title: string; level: string; statuses?: Status[] };

const beforeAfterExamples: BeforeAfterExample[] = [
  { title: "Juss for ledere", level: "Masterkurs" },
  { title: "Effektive team", level: "Bachelorkurs" },
  { title: "Helseledelse", level: "Masterkurs" },
];

function BeforeAfterExamples({ examples = beforeAfterExamples, showLocations = false }: { examples?: BeforeAfterExample[]; showLocations?: boolean }) {
  const normalizeTitle = (text: string) => text.replace(/\u00ad|\(-\)/g, "");
  const locationBadge = (primary: boolean) => (
    <span
      style={{
        flex: "0 0 auto",
        padding: "2px 8px",
        borderRadius: 10,
        fontSize: "0.75rem",
        fontWeight: 600,
        whiteSpace: "nowrap",
        background: primary ? "var(--bi-primary-60)" : "var(--bi-basic-white)",
        color: primary ? "var(--bi-basic-white)" : "var(--bi-color-neutral-text-secondary)",
        border: primary ? "1px solid var(--bi-primary-60)" : "1px dashed var(--bi-neutral-40)",
      }}
    >
      {primary ? "Hovedfagområde" : "Vises også her"}
    </span>
  );
  return (
    <>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(auto-fit, minmax(${showLocations ? 270 : 300}px, 1fr))`, gap: 16, margin: "0 0 20px" }}>
        {examples.map(({ title, level, statuses }) => {
          const row = summaryRows.find((candidate) => normalizeTitle(candidate[2]) === title && candidate[3] === level);
          if (!row) return null;
          const previous = row[4].split("; ").filter((p) => p !== "–");
          const entries = row[6].split("; ");
          return (
            <div key={`${title}|${level}`} style={{ background: "var(--bi-basic-white)", border: "1px solid var(--bi-color-neutral-stroke-subtle)", borderRadius: 8, padding: 16 }}>
              {statuses && (
                <div style={{ marginBottom: 10, display: "flex", flexWrap: "wrap", gap: 4 }}>
                  {statuses.map((status) => (
                    <StatusBadge key={status} status={status} wide card />
                  ))}
                </div>
              )}
              <div style={{ fontWeight: 700 }}>{title}</div>
              <div style={{ color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.8125rem", marginBottom: 10 }}>{level}</div>
              <div style={{ color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.8125rem", marginBottom: 4 }}>
                Før: {previous.length > 1 ? `${previous.length} fagområder uten prioritet` : previous.length === 1 ? "1 fagområde" : "manglet fagområde"}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
                {previous.length ? previous.map((name) => <AreaPill key={name} label={shortOldName(name)} kind={oldAreaCatalog[name]?.kind === "removed" ? "removed" : "old"} />) : <AreaPill label="Manglet fagområde" kind="added" />}
              </div>
              <div style={{ color: "var(--bi-color-primary-text-accent)", fontSize: "0.8125rem", fontWeight: 600, marginBottom: showLocations ? 8 : 4 }}>
                {showLocations
                  ? `Nå: finnes i ${entries.length} lister`
                  : `Nå: 1 hovedfagområde${entries.length > 1 ? ` + ${new Set(entries.slice(1).map((entry) => entry.split(" › ")[0])).size} ekstra` : ""}`}
              </div>
              {showLocations ? (
                <div style={{ display: "grid", gap: 8 }}>
                  {entries.map((entry, index) => {
                    const [entryAreaName, entrySub] = entry.split(" › ");
                    return (
                      <div
                        key={entry}
                        style={{
                          display: "grid",
                          gap: 6,
                          justifyItems: "start",
                          padding: "8px 10px 8px 22px",
                          borderRadius: 6,
                          background: index === 0 ? "var(--bi-primary-5)" : "var(--bi-color-neutral-surface)",
                          border: index === 0 ? "1px solid var(--bi-primary-20)" : "1px dashed var(--bi-neutral-40)",
                        }}
                      >
                        {locationBadge(index === 0)}
                        <div style={{ paddingLeft: index === 0 ? 12 : 0 }}>
                          <AreaWithSubcategory area={entryAreaName} subcategory={entrySub} muted={index > 0} wrap lineColor={index === 0 ? "var(--bi-primary-50)" : "#9fb0c2"} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                entries.map((entry, index) => {
                  const [entryAreaName, entrySub] = entry.split(" › ");
                  return (
                    <div key={entry} style={{ position: "relative", marginBottom: 8, paddingLeft: 0 }}>
                      <AreaWithSubcategory area={entryAreaName} subcategory={entrySub} muted={index > 0} />
                    </div>
                  );
                })
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

function beforeAfterScale() {
  const { before, after, extras } = beforeAfter;
  const total = summaryRows.length;
  const extraTotal = (area: string) => [...(extras.get(area)?.values() ?? [])].reduce((sum, value) => sum + value, 0);
  const maxCount = Math.max(...[...before.values()].map((v) => v.count), ...[...after.values()].map((v) => v.count), ...[...after.entries()].map(([area, value]) => value.count + extraTotal(area)));
  const percent = (value: number) => `${Math.round((value / total) * 100)} %`;
  return { total, extraTotal, maxCount, percent };
}

/** Fagområdene som liggende søyler etter størrelse, delt opp i underkategorier. Navnet på underkategorien vises når man holder musepekeren over segmentet. */
function AreaSizeBars() {
  const areas = areaTree
    .map(({ area, subs }) => {
      const items = subs
        .map(([name, { main, extra }]) => ({ name, value: main + extra }))
        .filter((item) => item.value > 0)
        .sort((x, y) => y.value - x.value || x.name.localeCompare(y.name, "nb"));
      return { area, items, total: items.reduce((sum, item) => sum + item.value, 0) };
    })
    .sort((x, y) => y.total - x.total);
  const nameWidth = 300;
  const barHeight = 34;
  const tooltipSpace = 34;
  const blockGap = 22;
  const scale = 10;
  const charWidth = 6.8;
  const [hovered, setHovered] = useState<string | null>(null);
  const largest = areas[0]?.total ?? 1;
  const chartWidth = nameWidth + largest * scale + 40;
  let blockTop = tooltipSpace;
  const blocks = areas.map(({ area, items, total }) => {
    const barY = blockTop;
    blockTop = barY + barHeight + blockGap;
    const segments = items.map((item, index) => ({
      ...item,
      index,
      key: `${area}|${item.name}`,
      x: nameWidth + items.slice(0, index).reduce((sum, previous) => sum + previous.value * scale, 0),
      width: item.value * scale,
      label: `${item.name} (${item.value})`,
    }));
    return { area, total, barY, segments };
  });
  const height = blockTop - blockGap;
  return (
    <svg viewBox={`0 -4 ${chartWidth} ${height + 8}`} role="img" aria-label="Fagområdene etter størrelse, delt opp i underkategorier. Hold musepekeren over et segment for å se navnet" style={{ width: "100%", height: "auto" }}>
      {blocks.map(({ area, total, barY, segments }) => {
        const nameLines = wrapWords(area, 26);
        const active = segments.find((segment) => segment.key === hovered);
        const tooltipWidth = active ? active.label.length * charWidth + 18 : 0;
        return (
          <g key={area}>
            <AreaIconInSvg area={area} centerX={20} top={barY + (barHeight - 26) / 2} height={26} color="#597694" />
            <text x={48} y={barY + barHeight / 2 - ((nameLines.length - 1) * 17) / 2 + 5} fontSize="15" fontWeight="700" fill="#0b49a1">
              {nameLines.map((line, lineIndex) => (
                <tspan key={line} x={48} dy={lineIndex === 0 ? 0 : 17}>
                  {line}
                  {lineIndex === nameLines.length - 1 && <tspan fontWeight="400" fill="#475e75">{` (${total})`}</tspan>}
                </tspan>
              ))}
            </text>
            {segments.map((segment) => (
              <rect
                key={segment.name}
                x={segment.x}
                y={barY}
                width={segment.width}
                height={barHeight}
                fill={blueShades[segment.index % blueShades.length]}
                fillOpacity={active && active.key !== segment.key ? 0.55 : 1}
                stroke="var(--bi-basic-white)"
                strokeWidth={1.5}
                onMouseEnter={() => setHovered(segment.key)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: "default" }}
              >
                <title>{segment.label}</title>
              </rect>
            ))}
            {active && (
              <g pointerEvents="none">
                <rect x={Math.min(active.x, chartWidth - tooltipWidth - 4)} y={barY - 29} width={tooltipWidth} height={24} rx={4} fill="var(--bi-basic-white)" stroke="#9fb0c2" />
                <text x={Math.min(active.x, chartWidth - tooltipWidth - 4) + 9} y={barY - 12.5} fontSize="12.5" fontWeight="600" fill="#222d38">
                  {active.label}
                </text>
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/** Fagområdene som liggende søyler etter størrelse, delt i studier og kurs som har fagområdet som hovedplassering og som ekstra. */
function AreaMainExtraBars() {
  const areas = [...areaTree].map(({ area, main, extra }) => ({ area, main, extra, total: main + extra })).sort((x, y) => y.total - x.total);
  const nameWidth = 300;
  const barHeight = 34;
  const blockGap = 22;
  const scale = 10;
  const largest = areas[0]?.total ?? 1;
  const chartWidth = nameWidth + largest * scale + 220;
  const rowStep = barHeight + blockGap;
  return (
    <svg viewBox={`0 -4 ${chartWidth} ${areas.length * rowStep - blockGap + 8}`} role="img" aria-label="Fagområdene etter størrelse, delt i hovedplassering og ekstra" style={{ width: "100%", height: "auto" }}>
      {areas.map(({ area, main, extra, total }, index) => {
        const barY = index * rowStep;
        const nameLines = wrapWords(area, 26);
        const mainWidth = main * scale;
        const extraWidth = extra * scale;
        return (
          <g key={area}>
            <AreaIconInSvg area={area} centerX={20} top={barY + (barHeight - 26) / 2} height={26} color="#597694" />
            <text x={48} y={barY + barHeight / 2 - ((nameLines.length - 1) * 17) / 2 + 5} fontSize="15" fontWeight="700" fill="#0b49a1">
              {nameLines.map((line, lineIndex) => (
                <tspan key={line} x={48} dy={lineIndex === 0 ? 0 : 17}>
                  {line}
                  {lineIndex === nameLines.length - 1 && <tspan fontWeight="400" fill="#475e75">{` (${total})`}</tspan>}
                </tspan>
              ))}
            </text>
            <rect x={nameWidth} y={barY} width={mainWidth} height={barHeight} fill={treeColors.mainArea} stroke="var(--bi-basic-white)" strokeWidth={1.5}>
              <title>{`${main} med ${area} som hovedfagområde`}</title>
            </rect>
            <rect x={nameWidth + mainWidth} y={barY} width={extraWidth} height={barHeight} fill={treeColors.extraArea} stroke="var(--bi-basic-white)" strokeWidth={1.5}>
              <title>{`${extra} med ${area} som ekstra fagområde`}</title>
            </rect>
            {mainWidth >= 28 && (
              <text x={nameWidth + mainWidth / 2} y={barY + barHeight / 2 + 5} textAnchor="middle" fontSize="13" fontWeight="700" fill="#ffffff">
                {main}
              </text>
            )}
            {extraWidth >= 28 && (
              <text x={nameWidth + mainWidth + extraWidth / 2} y={barY + barHeight / 2 + 5} textAnchor="middle" fontSize="13" fontWeight="700" fill={treeColors.extraText}>
                {extra}
              </text>
            )}
            <text x={nameWidth + total * scale + 12} y={barY + barHeight / 2 + 5} fontSize="13" fill="#475e75">
              <tspan fontWeight="700" fill={treeColors.mainArea}>{`${main} hoved`}</tspan>
              {" + "}
              <tspan fontWeight="700" fill={treeColors.extraText}>{`${extra} ekstra`}</tspan>
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function BeforeAfterOverview() {
  const { before, after, subs, withSeveral, withoutArea } = beforeAfter;
  const { total, extraTotal, maxCount, percent } = beforeAfterScale();
  const bar = (segments: { key: string; value: number; color: string }[], count: number) => (
    <div style={{ display: "flex", width: `${(count / maxCount) * 100}%`, height: 14, borderRadius: 7, overflow: "hidden", background: "var(--bi-color-neutral-stroke-subtle)" }}>
      {segments
        .filter(({ value }) => value > 0)
        .map(({ key, value, color }, index, visible) => (
          <div key={key} style={{ flex: value, background: color, boxShadow: hairline(color), borderRight: index < visible.length - 1 ? "2px solid var(--bi-basic-white)" : undefined }} />
        ))}
    </div>
  );
  const breakdown = (items: { name: string; value: number; color: string }[], prefix: string) => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 16px", color: "var(--bi-color-neutral-text)", fontSize: "0.8125rem" }}>
      <span style={{ color: "var(--bi-color-neutral-text-secondary)" }}>{prefix}</span>
      {items
        .filter(({ value }) => value > 0)
        .sort((a, b) => b.value - a.value)
        .map(({ name, value, color }) => (
          <span key={name} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
            <span style={{ width: 9, height: 9, borderRadius: 2, background: color, boxShadow: hairline(color) }} />
            {name} <strong>{value}</strong>
          </span>
        ))}
    </div>
  );
  const shortOld = shortOldName;
  const shortNew = (name: string) => areaShortName[name] ?? name;

  const lineage: { olds: string[]; news: string[] }[] = [
    { olds: ["Finans, økonomi og styring"], news: ["Finans, økonomi og regnskap"] },
    { olds: ["Ledelse"], news: ["Ledelse og strategi"] },
    { olds: ["Organisasjonsutvikling og Human Resource Management"], news: ["HR og organisasjonsutvikling"] },
    { olds: ["Strategi, innovasjon og bærekraft"], news: ["Innovasjon, bærekraft og logistikk"] },
    { olds: ["Markedsføring, kommunikasjon og kultur"], news: ["Markedsføring, kommunikasjon og kultur"] },
    { olds: ["Digitalisering og Analytics"], news: ["KI, digitalisering og analytics"] },
    { olds: ["Eiendom, varehandel og forretningsjus"], news: ["Juss, skatt og eiendom"] },
    { olds: ["Offentlig sektor"], news: ["Helse, skole og barnehage", "Sikkerhet og beredskap"] },
    { olds: ["Internasjonal Business", "Prosjektledelse"], news: [] },
    { olds: [noOldArea], news: [] },
  ];

  const oldCell = (name: string) => {
    const entry = before.get(name);
    if (!entry) return null;
    const info = oldAreaCatalog[name];
    const destinations = [...entry.destinations].map(([area, value]) => ({ name: shortNew(area), value, color: areaColor(area) }));
    return (
      <div key={name} style={{ display: "grid", gap: 4 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <AreaPill label={name} kind={info?.kind ?? "added"} />
          <strong>{entry.count}</strong>
          <span style={{ color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.8125rem" }}>studier og kurs{info?.note ? ` · ${info.note}` : ""}</span>
        </div>
        {bar(destinations.map((d) => ({ key: d.name, value: d.value, color: d.color })), entry.count)}
        {breakdown(destinations, "Nå i:")}
      </div>
    );
  };
  const newCell = (area: string) => {
    const entry = after.get(area);
    if (!entry) return null;
    const origins = [...entry.origins]
      .sort((x, y) => y[1].count - x[1].count)
      .slice(0, 4)
      .map(([name, { count }]) => `${shortOld(name)} ${count}`)
      .join(", ");
    const extraCount = extraTotal(area);
    const color = areaColor(area);
    const subEntries = [...(subs.get(area) ?? [])].sort((x, y) => y[1].main + y[1].extra - (x[1].main + x[1].extra) || x[0].localeCompare(y[0], "nb"));
    const twoToneBar = (main: number, extra: number, height: number) => (
      <div style={{ display: "flex", width: `${((main + extra) / maxCount) * 100}%`, height, borderRadius: height / 2, overflow: "hidden", background: "var(--bi-color-neutral-stroke-subtle)" }}>
        {main > 0 && <div title={`Hovedfagområde: ${main}`} style={{ flex: main, background: color, boxShadow: hairline(color), borderRight: extra > 0 ? "2px solid var(--bi-basic-white)" : undefined }} />}
        {extra > 0 && <div title={`Ekstra fagområde: ${extra}`} style={{ flex: extra, background: color, boxShadow: hairline(color), opacity: 0.45 }} />}
      </div>
    );
    const rowGrid = { display: "grid", gridTemplateColumns: "minmax(120px, 210px) minmax(0, 1fr) 118px", gap: 8, alignItems: "center", fontSize: "0.8125rem" } as const;
    return (
      <div key={area} style={{ display: "grid", gap: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span style={{ padding: "4px 10px", border: "1px solid var(--bi-primary-20)", borderRadius: 4, background: "var(--bi-primary-5)", color: "var(--bi-color-primary-text-accent)" }}>{area}</span>
          <span style={{ color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.8125rem" }}>Hovedkursene kom fra: {origins}</span>
        </div>
        <div style={{ display: "grid", gap: 3 }}>
          <div style={rowGrid}>
            <strong>Hele fagområdet</strong>
            <div style={{ display: "flex" }}>{twoToneBar(entry.count, extraCount, 14)}</div>
            <span style={{ whiteSpace: "nowrap" }}>
              <strong>{entry.count}</strong>
              {extraCount > 0 && ` + ${extraCount}`}
              {extraCount > 0 && <strong> = {entry.count + extraCount}</strong>}
            </span>
          </div>
          {subEntries.map(([name, { main, extra }]) => (
            <div key={name} style={rowGrid}>
              <span style={{ color: "var(--bi-color-neutral-text)" }}>{name}</span>
              <div style={{ display: "flex" }}>{twoToneBar(main, extra, 8)}</div>
              <span style={{ color: "var(--bi-color-neutral-text-secondary)", whiteSpace: "nowrap" }}>
                {main > 0 && <strong style={{ color: "var(--bi-color-neutral-text)" }}>{main}</strong>}
                {extra > 0 && ` ${main > 0 ? "+ " : ""}${extra}`}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };


  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 40px minmax(0, 1fr)", gap: "0 16px", margin: "0 0 4px" }}>
        <div>
          <div style={{ fontWeight: 700, color: "var(--bi-color-neutral-text-secondary)" }}>Før (bi.no i dag)</div>
          <p style={{ margin: "2px 0 8px", color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.8125rem" }}>
            Stolpen viser hvor de ble av. Fargene er det nye hovedfagområdet. {withSeveral} av {total} ({percent(withSeveral)}) hadde flere fagområder, og {withoutArea}{" "}
            ({percent(withoutArea)}) manglet fagområde.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 16px", color: "var(--bi-color-neutral-text)", fontSize: "0.8125rem" }}>
            {overlapOrder.map((area) => (
              <span key={area} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                <span style={{ width: 9, height: 9, borderRadius: 2, background: areaColor(area), boxShadow: hairline(areaColor(area)) }} />
                {areaShortName[area]}
              </span>
            ))}
          </div>
        </div>
        <span />
        <div>
          <div style={{ fontWeight: 700, color: "var(--bi-color-primary-text-accent)" }}>Nå (forslaget)</div>
          <p style={{ margin: "2px 0 8px", color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.8125rem" }}>
            Én stolpe per fagområde: solid farge er studier og kurs med fagområdet som hovedfagområde, og lys farge er de som har det som ekstra.
            De mindre stolpene under er underkategoriene, i samme skala. Tallene viser antall studier og kurs som hovedfagområde + ekstra fagområde, og totalt for hele fagområdet.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 16px", color: "var(--bi-color-neutral-text)", fontSize: "0.8125rem" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
              <span style={{ width: 9, height: 9, borderRadius: 2, background: "#0b4db4" }} />
              Hovedfagområde (*)
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
              <span style={{ width: 9, height: 9, borderRadius: 2, background: "#0b4db4", opacity: 0.45 }} />
              Ekstra fagområde
            </span>
          </div>
        </div>
      </div>
      {lineage.map(({ olds, news }) => (
        <div
          key={olds.join("|")}
          style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 40px minmax(0, 1fr)", gap: "0 16px", alignItems: "start", padding: "12px 0", borderTop: "1px solid var(--bi-color-neutral-stroke-subtle)" }}
        >
          <div style={{ display: "grid", gap: 12 }}>{olds.map((name) => oldCell(name))}</div>
          <div style={{ paddingTop: 6 }}>
            <ChangeArrow />
          </div>
          {news.length > 0 ? (
            <div style={{ display: "grid", gap: 12 }}>{news.map((area) => newCell(area))}</div>
          ) : (
            <div style={{ color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.875rem", paddingTop: 4 }}>
              {olds[0] === noOldArea
                ? "Har nå fått hovedfagområde (se stolpen til venstre)."
                : "Ikke lenger fagområder. Studiene og kursene er plassert i andre fagområder, og Prosjektledelse er en underkategori i Ledelse og strategi."}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

const labelled = (label: string, content: React.ReactNode) => (
  <div style={{ display: "grid", gridTemplateColumns: "34px minmax(0, 1fr)", gap: 8, alignItems: "start", fontSize: "0.8125rem" }}>
    <span style={{ color: "var(--bi-color-neutral-text-secondary)", lineHeight: "14px" }}>{label}</span>
    {content}
  </div>
);

type BarSegment = { key: string; value: number; color: string; label: string; legend?: string };

const segmentBar = (segments: BarSegment[], widthPercent = 100) => (
  <div style={{ display: "flex", width: `${widthPercent}%`, height: 14, borderRadius: 7, overflow: "hidden", background: "var(--bi-color-neutral-stroke-subtle)" }}>
    {segments
      .filter((segment) => segment.value > 0)
      .map((segment, index, visible) => (
        <div
          key={segment.key}
          title={`${segment.label}: ${segment.value}`}
          style={{ flex: segment.value, background: segment.color, boxShadow: hairline(segment.color), borderRight: index < visible.length - 1 ? "2px solid var(--bi-basic-white)" : undefined }}
        />
      ))}
  </div>
);

const legendList = (items: { label: string; value: number; color: string }[]) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 16px", fontSize: "0.8125rem" }}>
    {items.map((item, index) => (
      <span key={index} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
        <span style={{ width: 9, height: 9, borderRadius: 2, background: item.color, boxShadow: hairline(item.color) }} />
        <span style={{ color: "var(--bi-color-neutral-text)" }}>{item.label.charAt(0).toUpperCase() + item.label.slice(1)}</span>
        <span style={{ fontWeight: 700, color: "var(--bi-color-neutral-text)" }}>{item.value}</span>
      </span>
    ))}
  </div>
);

const barWithLegend = (segments: BarSegment[], widthPercent = 100) => (
  <div style={{ display: "grid", gap: 6 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ width: `calc((100% - 40px) * ${widthPercent / 100})` }}>{segmentBar(segments)}</div>
      <span style={{ flex: "0 0 32px", fontWeight: 700, lineHeight: "14px" }}>{segments.reduce((sum, segment) => sum + segment.value, 0)}</span>
    </div>
    {legendList(segments.map((segment) => ({ label: segment.legend ?? segment.label, value: segment.value, color: segment.color })))}
  </div>
);

const barWithNumber = (segment: BarSegment, widthPercent: number) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <div style={{ width: `calc((100% - 40px) * ${widthPercent / 100})` }}>{segmentBar([segment])}</div>
    <span style={{ flex: "0 0 32px", fontWeight: 700, lineHeight: "14px" }}>{segment.value}</span>
  </div>
);

/** Før ble fagområder delt ut ujevnt (ingen for noen, mange for andre). Her vises hvordan hovedfagområde og ekstra fagområder gir både presisjon og bredde. */
function ConsistentCategorisationSlide() {
  const previousCount = (row: Row) => row[4].split("; ").filter((area) => area !== "–").length;
  const countBy = (counter: (row: Row) => number) => {
    const counts = new Map<number, number>();
    summaryRows.forEach((row) => counts.set(counter(row), (counts.get(counter(row)) ?? 0) + 1));
    return [...counts].sort((a, b) => a[0] - b[0]);
  };
  const beforeCounts = countBy(previousCount);
  const afterCounts = countBy((row) => row[6].split("; ").length - 1);
  const numberWords = ["ingen", "ett", "to", "tre", "fire", "fem", "seks", "sju", "åtte", "ni", "ti"];
  const numberWord = (n: number) => numberWords[n] ?? String(n);
  const beforeColors = ["#c8d1db", "#0b4db4", "#6196f4", "#9ec0f1", "#f2b84b", "#e07b39", "#b5472f", "#7a2e5f"];
  const afterColors = ["#0b4db4", "#6196f4", "#9ec0f1", "#c5d9f7", "#f2b84b", "#e07b39", "#b5472f", "#7a2e5f"];
  const mostBefore = Math.max(...summaryRows.map(previousCount));
  const missingExample = summaryRows.find((row) => row[2] === "Personvern og GDPR" && row[3] === "Bachelor");
  const manyExample = summaryRows.find((row) => row[2] === "Business" && row[3] === "Master");
  const exampleCard = (heading: string, why: string, row: Row | undefined) => {
    if (!row) return null;
    const olds = row[4].split("; ").filter((area) => area !== "–");
    return (
      <div style={{ display: "grid", gap: 12, padding: 16, background: "var(--bi-basic-white)", border: "1px solid var(--bi-color-neutral-stroke-subtle)", borderRadius: "var(--bi-radius-large)", alignContent: "start" }}>
        <div>
          <div style={{ fontWeight: 700 }}>{heading}</div>
          <div style={{ marginTop: 2, color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.875rem" }}>«{row[2]}», {row[3].toLowerCase()}</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 44px minmax(0, 1.4fr)", columnGap: 8, alignItems: "start" }}>
          <div style={{ display: "grid", gap: 6, justifyItems: "start" }}>
            <div style={{ color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.8125rem" }}>Før</div>
            {olds.length === 0 ? <AreaPill label="Ingen fagområde" kind="old" /> : olds.map((area) => <AreaPill key={area} label={shortOldName(area)} kind="old" />)}
          </div>
          <div style={{ paddingTop: 24 }}>
            <ChangeArrow />
          </div>
          <div style={{ display: "grid", gap: 4 }}>
            <div style={{ color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.8125rem" }}>Nå</div>
            {row[6].split("; ").map((entry, index) => {
              const [area, sub] = entry.split(" › ");
              return (
                <div key={entry} style={{ paddingLeft: index === 0 ? 12 : 0 }}>
                  <AreaWithSubcategory area={area} subcategory={sub} muted={index > 0} />
                </div>
              );
            })}
          </div>
        </div>
        <p style={{ margin: 0, color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.9375rem" }}>{why}</p>
      </div>
    );
  };
  return (
    <div style={{ display: "grid", gap: 16, maxWidth: 820 }}>
      <p style={{ margin: 0, color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.9375rem" }}>
        Før fantes det ingen felles regel for hvor mange fagområder et studie eller kurs skulle ha. Noen fikk ingen eller bare ett som ikke passet, for å holde fagområdene spisse. Andre fikk mange (opptil {mostBefore}), for å
        finnes overalt. Det ga inkonsekvent kategorisering. Nå har alle ett hovedfagområde med underkategori, så de blir spisse, og ekstra fagområder kan legges til for bredden.
      </p>
      {labelled(
        "Før",
        barWithLegend(
          beforeCounts.map(([n, value]) => ({
            key: String(n),
            value,
            color: beforeColors[n] ?? beforeColors[beforeColors.length - 1],
            label: n === 0 ? "Ingen fagområde" : n === 1 ? "Ett fagområde" : `${numberWord(n)[0].toUpperCase()}${numberWord(n).slice(1)} fagområder`,
            legend: n === 0 ? "ingen fagområde" : n === 1 ? "ett fagområde" : `${numberWord(n)} fagområder`,
          })),
        ),
      )}
      {labelled(
        "Nå",
        barWithLegend(
          afterCounts.map(([n, value]) => ({
            key: String(n),
            value,
            color: afterColors[n] ?? afterColors[afterColors.length - 1],
            label: n === 0 ? "Bare hovedfagområde" : `Hoved + ${numberWord(n)} ekstra`,
            legend: n === 0 ? "bare hovedfagområde" : `hoved + ${numberWord(n)} ekstra`,
          })),
        ),
      )}
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: 16, marginTop: 4 }}>
        {exampleCard("For få: ett fagområde som ikke passet", "Hadde bare Finans, økonomi og styring, selv om temaet er juss og personvern. Nå får det riktig hovedfagområde, og KI som ekstra, begge med underkategori.", missingExample)}
        {exampleCard("For mange: delt ut overalt", "Ble delt ut til alle fagområder så det skulle finnes overalt. Nå er det Finans som hovedfagområde og Ledelse som ekstra. Resten kommer som tillegg gjennom hvilken major man velger.", manyExample)}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
        <div style={{ padding: "10px 14px", background: "var(--bi-primary-5)", border: "1px solid var(--bi-primary-20)", borderRadius: "var(--bi-radius-large)" }}>
          <strong>Spiss:</strong> ett hovedfagområde og én underkategori sier hva studiet eller kurset først og fremst handler om.
        </div>
        <div style={{ padding: "10px 14px", background: "var(--bi-primary-5)", border: "1px solid var(--bi-primary-20)", borderRadius: "var(--bi-radius-large)" }}>
          <strong>Bredt:</strong> ekstra fagområder med egne underkategorier gjør at det kan finnes der det også er relevant.
        </div>
      </div>
    </div>
  );
}

/** Siste kort i hver forklaringsseksjon: kort oppsummering av argumentet i hvert av kortene foran. */
function SectionSummary({ items }: { items: { title: string; text: string }[] }) {
  return (
    <div style={{ display: "grid", gap: 14, maxWidth: 820 }}>
      {items.map(({ title, text }, index) => (
        <div key={title} style={{ display: "grid", gridTemplateColumns: "28px minmax(0, 1fr)", gap: 12, alignItems: "start" }}>
          <span
            aria-hidden="true"
            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: "50%", background: "var(--bi-primary-5)", color: "var(--bi-color-primary-text-accent)", fontWeight: 700, fontSize: "0.875rem" }}
          >
            {index + 1}
          </span>
          <div>
            <div style={{ fontWeight: 700 }}>{title}</div>
            <div style={{ color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.9375rem" }}>{text}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/** Første kort i «Hva gjøres?»: de fem stegene som er gjort for å stramme opp strukturen, med skisser uten navn. */
function StepsSlide() {
  type Variant = "old" | "merged" | "removed" | "new" | "main" | "extraBefore" | "extraNow" | "sub";
  const labelStyles = {
    main: { background: "var(--bi-primary-5)", border: "1px solid var(--bi-primary-20)", color: "var(--bi-color-primary-text-accent)" },
    neutral: { background: "var(--bi-basic-white)", border: "1px solid var(--bi-neutral-40)", color: "var(--bi-color-neutral-text-secondary)" },
  };
  const tagStyles = {
    removed: { background: "var(--bi-alert-5)", border: "1px solid var(--bi-alert-20)", color: "var(--bi-alert-80)" },
    extraNow: { background: "var(--bi-success-5)", border: "1px solid var(--bi-success-20)", color: "var(--bi-success-80)" },
    merged: { background: "var(--bi-warning-5)", border: "1px solid var(--bi-warning-40)", color: "var(--bi-warning-80)" },
  };
  /** En skisse av en boks. Med etikett ligger etiketten halvveis over øvre kant. */
  const sketch = (variant: Variant, options: { width?: number | string; label?: string; tag?: string; text?: string } = {}) => {
    const { width = "100%", label, tag, text } = options;
    const hasLabel = Boolean(label || tag);
    const styles = {
      old: { background: "var(--bi-basic-white)", border: "1.5px dashed var(--bi-neutral-40)" },
      merged: { background: "var(--bi-warning-5)", border: "1.5px solid var(--bi-warning-40)" },
      removed: { background: "var(--bi-alert-5)", border: "1.5px solid var(--bi-alert-20)" },
      new: { background: "var(--bi-primary-5)", border: "1.5px solid var(--bi-primary-20)" },
      main: { background: "#0b4db4", border: "1.5px solid #0b4db4" },
      extraBefore: { background: "var(--bi-basic-white)", border: "1.5px solid var(--bi-primary-40)" },
      extraNow: { background: "var(--bi-success-5)", border: "1.5px solid var(--bi-success-20)" },
      sub: { background: "var(--bi-basic-white)", border: "1.5px solid var(--bi-primary-20)" },
    }[variant];
    return (
      <div style={{ position: "relative", width, marginTop: hasLabel ? 8 : 0 }}>
        {label && (
          <span style={{ position: "absolute", top: -8, left: 8, zIndex: 1, padding: "1px 6px", borderRadius: 4, ...(variant === "main" ? labelStyles.main : labelStyles.neutral), fontWeight: 700, fontSize: "0.6875rem", lineHeight: 1.3 }}>{label}</span>
        )}
        {tag && (variant === "removed" || variant === "extraNow" || variant === "merged") && (
          <span style={{ position: "absolute", top: -8, ...(label ? { right: 8 } : { left: 8 }), zIndex: 1, padding: "1px 6px", borderRadius: 4, ...tagStyles[variant], fontWeight: 700, fontSize: "0.6875rem", lineHeight: 1.3 }}>{tag}</span>
        )}
        <div style={{ position: "relative", boxSizing: "border-box", width: "100%", height: hasLabel && text ? 34 : 26, borderRadius: 5, ...styles }}>
          {variant === "removed" && <span style={{ position: "absolute", left: 6, right: 6, top: hasLabel ? "calc(50% + 4px)" : "50%", height: 2, background: "var(--bi-alert-60)" }} />}
          {text && (
            <span style={{ position: "absolute", left: 8, right: 6, top: hasLabel ? "calc(50% + 4px)" : "50%", transform: "translateY(-50%)", fontSize: "0.75rem", lineHeight: 1.35, color: variant === "removed" ? "var(--bi-alert-80)" : variant === "main" ? "var(--bi-basic-white)" : "var(--bi-color-neutral-text-secondary)", whiteSpace: "nowrap", overflow: "hidden" }}>{text}</span>
          )}
        </div>
      </div>
    );
  };
  const caption = (text: string, twoLines = false) => <div style={{ minHeight: twoLines ? 36 : undefined, fontSize: "0.8125rem", lineHeight: 1.3, fontWeight: 700, color: "var(--bi-color-neutral-text-secondary)" }}>{text}</div>;
  const stack = (title: string, children: React.ReactNode, width = 150, twoLines = false) => (
    <div style={{ display: "grid", gap: 6, width, alignContent: "start" }}>
      {title && caption(title, twoLines)}
      {children}
    </div>
  );
  const arrow = (twoLines = false, extra = 0) => (
    <div style={{ paddingTop: (twoLines ? 46 : 30) + extra }}>
      <ChangeArrow />
    </div>
  );
  /** Ramme rundt alle fagområdene til ett studie. */
  const studyBox = (title: string, children: React.ReactNode) => (
    <div style={{ display: "grid", gap: 6, padding: 10, boxSizing: "border-box", background: "var(--bi-basic-white)", border: "1.5px solid var(--bi-neutral-40)", borderRadius: 8 }}>
      <div style={{ fontSize: "0.75rem", fontWeight: 700, lineHeight: 1.3, color: "var(--bi-color-neutral-text-secondary)" }}>{title}</div>
      {children}
    </div>
  );
  const subBoxes = (count: number) => (
    <div style={{ position: "relative", display: "grid", gap: 10, paddingLeft: 26 }}>
      <span style={{ position: "absolute", left: 9, top: -6, bottom: 13, width: 1, background: "#9fb0c2" }} />
      {Array.from({ length: count }, (_, index) => (
        <div key={index} style={{ position: "relative" }}>
          <span style={{ position: "absolute", left: -17, top: 13, width: 17, height: 1, background: "#9fb0c2" }} />
          {sketch("sub", { text: `Underkategori ${index + 1}` })}
        </div>
      ))}
    </div>
  );
  const step = (number: number, title: string, text: string, visual: React.ReactNode, options: { first?: boolean; last?: boolean } = {}) => (
    <div style={{ display: "grid", gridTemplateColumns: "40px minmax(0, 1fr)", columnGap: 16, alignItems: "stretch" }}>
      <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ position: "absolute", left: "calc(50% - 1px)", width: 2, top: options.first ? "50%" : 0, bottom: options.last ? "50%" : 0, background: "var(--bi-primary-20)" }} />
        <span
          aria-hidden="true"
          style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, borderRadius: "50%", background: "var(--bi-primary-10)", color: "#0b4db4", fontWeight: 700 }}
        >
          {number}
        </span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px 32px", padding: "16px 0", minWidth: 0 }}>
        <div style={{ flex: "1 1 340px", maxWidth: 520, display: "grid", gap: 8 }}>
          <div style={{ fontWeight: 700, fontSize: "1.0625rem" }}>{title}</div>
          <p style={{ margin: 0, color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.9375rem" }}>{text}</p>
        </div>
        <div style={{ flex: "0 0 402px", display: "grid", gap: 8, padding: 16, maxWidth: "100%", boxSizing: "border-box", background: "var(--bi-color-neutral-surface)", border: "1px solid var(--bi-color-neutral-stroke-subtle)", borderRadius: "var(--bi-radius-large)" }}>{visual}</div>
      </div>
    </div>
  );
  return (
    <div style={{ display: "grid" }}>
      {step(
        1,
        "Færre og tydeligere fagområder",
        "Fagområdene har fått nye navn, og enkelte er byttet ut eller slått sammen. Det gir en tydeligere og mer konsekvent struktur. Offentlig sektor, Prosjektledelse og Internasjonal Business er ikke lenger egne fagområder, og studiene og kursene er fordelt på fagområder som passer bedre.",
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
          {stack(
            "Fagområder nå",
            <>
              {sketch("old", { text: "Fagområde 1" })}
              {sketch("merged", { tag: "Utydelig", text: "Fagområde 2 og 3" })}
              {sketch("removed", { tag: "Fjernet", text: "Fagområde 3" })}
            </>,
          )}
          {arrow()}
          {stack(
            "Nytt forslag",
            <>
              {sketch("new", { text: "Fagområde 1" })}
              {sketch("new", { text: "Fagområde 2" })}
            </>,
          )}
        </div>,
        { first: true },
      )}
      {step(
        2,
        "Ett hovedfagområde for alle",
        "Alle studier og kurs har fått ett valgt hovedfagområde. Det er spesielt viktig for de som hadde flere fagområder, siden det gir et hierarki mellom hovedfagområdet og de ekstra. Studier og kurs som manglet fagområde, har også fått et hovedfagområde.",
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
          {stack(
            "",
            studyBox(
              "Studie 1 nå",
              <>
                {sketch("old", { text: "Fagområde 1" })}
                {sketch("old", { text: "Fagområde 2" })}
              </>,
            ),
          )}
          {arrow(false, 8)}
          {stack(
            "",
            studyBox(
              "Studie 1 nytt forslag",
              <>
                {sketch("main", { label: "Hoved", text: "Fagområde 1" })}
                {sketch("extraBefore", { text: "Fagområde 2" })}
              </>,
            ),
          )}
        </div>,
      )}
      {step(
        3,
        "Fagområder lagt til, fjernet eller flyttet",
        "Studier og kurs kan ha ekstra fagområder i tillegg til hovedfagområdet. Noen hadde ekstra fra før, og andre har fått det nå. Fagområder er lagt til der de passer, fjernet der de ikke lenger passet, og flyttet fra et annet sted når de hørte bedre hjemme i et annet fagområde. Studier og kurs som manglet fagområde, har fått fagområder lagt til.",
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
          {stack(
            "",
            studyBox(
              "Studie 1 nå",
              <>
                {sketch("old", { text: "Fagområde 1" })}
                {sketch("removed", { tag: "Fjernet", text: "Fagområde 3" })}
              </>,
            ),
          )}
          {arrow(false, 8)}
          {stack(
            "",
            studyBox(
              "Studie 1 nytt forslag",
              <>
                {sketch("main", { label: "Hoved", text: "Fagområde 1" })}
                {sketch("extraNow", { tag: "Nytt", text: "Fagområde 4" })}
              </>,
            ),
          )}
        </div>,
      )}
      {step(
        4,
        "Underkategorier i alle fagområder",
        "Hvert fagområde er delt inn i underkategorier som gir en finere inndeling av fagfeltet. Underkategoriene er laget for alle fagområdene, slik at det blir lettere å se hva som ligger innenfor hvert av dem.",
        <div style={{ display: "flex", alignItems: "flex-start", gap: 16, width: "100%" }}>
          <div style={{ display: "grid", gap: 8, flex: 1, alignContent: "start" }}>
            {sketch("new", { text: "Fagområde 1" })}
            {subBoxes(3)}
          </div>
          <div style={{ display: "grid", gap: 8, flex: 1, alignContent: "start" }}>
            {sketch("new", { text: "Fagområde 2" })}
            {subBoxes(2)}
          </div>
        </div>,
      )}
      {step(
        5,
        "Én underkategori per fagområde",
        "Alle studier og kurs er plassert i et fagområde og har fått en underkategori i det fagområdet. Det gjelder både hovedfagområdet og hvert ekstra fagområde de er plassert i.",
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
          {stack(
            "",
            studyBox(
              "Studie 1 nå",
              <>
                {sketch("old", { text: "Fagområde 1" })}
                {sketch("old", { text: "Fagområde 2" })}
              </>,
            ),
          )}
          {arrow(false, 8)}
          {stack(
            "",
            studyBox(
              "Studie 1 nytt forslag",
              <>
                {sketch("main", { label: "Hoved", text: "Fagområde 1" })}
                {subBoxes(1)}
                <div style={{ height: 4 }} />
                {sketch("extraBefore", { text: "Fagområde 2" })}
                {subBoxes(1)}
              </>,
            ),
          )}
        </div>,
        { last: true },
      )}
    </div>
  );
}

function KeepAreaSlide() {
  const total = summaryRows.length;
  const count = (test: (statuses: Status[]) => boolean) => summaryRows.filter((row) => test(row[1])).length;
  const prioritisedCount = count((statuses) => statuses.includes("1 fagområde prioritert"));
  const keptCount = count((statuses) => !statuses.includes("1 fagområde prioritert") && (statuses.includes("Uendret") || statuses.includes("Endret navn på fagområde")));
  const movedCount = count((statuses) => statuses.includes("Flyttet til nytt fagområde"));
  const missingCount = count((statuses) => statuses.includes("Manglet fagområde"));
  const extraCount = count((statuses) => statuses.includes("Lagt til ekstra fagområde"));
  const percent = (value: number) => Math.round((value / total) * 100);
  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 820 }}>
      <p style={{ margin: 0, color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.9375rem" }}>{`Bare ${percent(movedCount)} % har fått et annet hovedfagområde enn før. ${percent(keptCount + prioritisedCount)} % har beholdt ett av fagområdene sine som hovedfagområde, og ${percent(missingCount)} % har fått et fagområde for første gang. I tillegg har ${extraCount} av dem som hadde fagområder fra før fått ett eller flere ekstra.`}</p>
      {barWithLegend([
        { key: "kept", value: keptCount, color: statusPieStrong.Uendret, label: "Beholdt fagområdet (uendret eller nytt navn)", legend: "beholdt" },
        { key: "prio", value: prioritisedCount, color: statusPieStrong["1 fagområde prioritert"], label: "Valgt hovedfagområde", legend: "valgt hovedfagområde" },
        { key: "moved", value: movedCount, color: statusPieStrong["Flyttet til nytt fagområde"], label: "Flyttet til nytt fagområde", legend: "flyttet" },
        { key: "missing", value: missingCount, color: statusPieStrong["Manglet fagområde"], label: "Manglet fagområde", legend: "manglet" },
      ])}
    </div>
  );
}

const subcategoryReasons: Record<string, string> = {
  "Finans, økonomi og regnskap › Bedriftsøkonomi og økonomistyring": "Bedriftsøkonomi og økonomistyring er store og vanlige begreper. Her ligger brede økonomi- og administrasjonsstudier som gir en grunnleggende forståelse av hvordan virksomheter drives økonomisk, og kurs i budsjettering, prestasjonsstyring og beslutningsstøtte som ledere søker etter.",
  "Finans, økonomi og regnskap › Bærekraftig finans": "Skilt ut fra Finans og investering fordi bærekraft og finans er et eget, voksende tema med egne kurs, og et begrep mange søker på.",
  "Finans, økonomi og regnskap › Finans og investering": "Kjernen i finansfaget: verdsettelse, investering og finansiell analyse. Finans og investering er store og vanlige begreper.",
  "Finans, økonomi og regnskap › Fintech": "Fintech er et vanlig begrep mellom finans og teknologi. Studiene og kursene har KI, digitalisering og analytics som hovedfagområde, men skal også være lette å finne under Finans.",
  "Innovasjon, bærekraft og logistikk › Logistikk og forsyningskjeder": "Logistikk og supply chain er vanlige begreper, og var tidligere gjemt inne i Finans. Handler om hvordan varer og tjenester flyttes og styres gjennom verdikjeden, fra innkjøp og lager til transport og drift. Bærekraftige forsyningskjeder og innovasjon i verdikjeden hører naturlig sammen med resten av fagområdet.",
  "Finans, økonomi og regnskap › Regnskap og revisjon": "Regnskap er et stort og vanlig søkeord og et eget yrkesløp med revisor og regnskapsfører, og skal være synlig i både navn og underkategori.",
  "Finans, økonomi og regnskap › Samfunnsøkonomi og matematikk": "Samfunnsøkonomi er et eget og kjent fagbegrep. Teoretisk og analytisk økonomi, som mikroøkonomi og matematikk for økonomer, skiller seg fra de bedriftsrettede temaene.",
  "HR og organisasjonsutvikling › Arbeidsmiljø": "Arbeidsmiljø er et vanlig begrep. Handler om hvordan folk har det på jobb: motivasjon, arbeidsglede, HMS og helsefremmende ledelse. Gjelder den enkelte medarbeideren og trivsel, ikke organisasjonen som helhet.",
  "HR og organisasjonsutvikling › Endringsledelse": "Endringsledelse er et stort og vanlig søkeord. Egen inngang for endringsarbeid og omstilling, et tema mange leter etter.",
  "HR og organisasjonsutvikling › HR og personalledelse": "HR er et stort og vanlig begrep, og kjernen i fagområdet: rekruttering, onboarding og oppfølging av ansatte.",
  "HR og organisasjonsutvikling › Organisasjonspsykologi": "Hvordan grupper og organisasjoner fungerer: atferd, samspill, team og kultur. Handler om organisasjonen som helhet, ikke om den enkelte medarbeiderens trivsel.",
  "Helse, skole og barnehage › Helse": "Helse er et stort og vanlig begrep. Ledelse i helse- og omsorgstjenesten er en egen bransje med egne behov og målgruppe.",
  "Helse, skole og barnehage › Skole og barnehage": "Skole og barnehage er vanlige begreper. Rektor- og styrerutdanning og pedagogisk ledelse har en annen målgruppe enn helse.",
  "Juss, skatt og eiendom › Arbeidsrett": "Arbeidsrett er et eget og kjent rettsområde som er viktig for både HR og ledere.",
  "Juss, skatt og eiendom › Compliance": "Compliance er et vanlig begrep. Regelverk, personvern og risikostyring er et tema som trenger en egen oversikt.",
  "Juss, skatt og eiendom › Eiendomsmegling": "Eiendomsmegling er en egen yrkesutdanning for eiendomsmeglere, og et begrep de fleste kjenner igjen.",
  "Juss, skatt og eiendom › Forretningsjus og rettsvitenskap": "Juss er et stort og vanlig begrep. Generell juss for næringslivet, fra rettsvitenskap til foretaksrett.",
  "Juss, skatt og eiendom › Skatt og avgift": "Skatt og avgift er store og vanlige søkeord. Temaet var gjemt rundt på flere fagområder, og er nå samlet og synlig.",
  "KI, digitalisering og analytics › KI-etikk, regulering og personvern": "Etikk, regulering og personvern i bruk av KI er et eget tema med vanlige søkeord som personvern og regulering, og skiller seg fra de tekniske kursene.",
  "KI, digitalisering og analytics › Data science og analytics": "Data science og analytics er vanlige begreper. Dataanalyse og maskinlæring i forretning, med egne metoder og verktøy.",
  "KI, digitalisering og analytics › Digital transformasjon": "Digital transformasjon er et vanlig begrep. Handler om hvordan virksomheter omstiller seg digitalt, med mer vekt på organisasjon og strategi enn teknikk.",
  "KI, digitalisering og analytics › KI": "KI er et stort og vanlig begrep, og hovedtema for flest studier og kurs i fagområdet. Fortjener en egen inngang.",
  "KI, digitalisering og analytics › Statistikk og metode": "Statistikk og metode er grunnleggende fag som brukes på tvers av fagområdene.",
  "Ledelse og strategi › Generell ledelse og lederutvikling": "Ledelse og lederutvikling er de største og mest vanlige begrepene. Brede lederutdanninger og personlig lederutvikling som coaching, påvirkning og kommunikasjon, og inngangen for de fleste ledere.",
  "Ledelse og strategi › Helse-, skole- og barnehageledelse": "Tverrgående tema: ledelse i helse og skole har Helse, skole og barnehage som hovedfagområde, men skal også kunne finnes under Ledelse og strategi.",
  "Ledelse og strategi › HR-ledelse og endringsledelse": "Tverrgående tema: å lede team og medarbeidere gjennom prestasjon, arbeidsmiljø og endring har HR og organisasjonsutvikling som hovedfagområde, men er også ledelse.",
  "Ledelse og strategi › Prosjektledelse": "Prosjektledelse er et vanlig begrep. Var tidligere et eget fagområde, men var for lite og overlapper mye med ledelse, så det hører hjemme i Ledelse og strategi.",
  "Ledelse og strategi › Sikkerhets- og beredskapsledelse": "Tverrgående tema: sikkerhetsledelse har Sikkerhet og beredskap som hovedfagområde, men er også ledelse.",
  "Ledelse og strategi › Strategisk ledelse": "Strategi er et vanlig søkeord, men har mye overlapp med ledelse, noe som gjør det vanskelig å skille dem. Strategi og ledelse på toppnivå, som styrearbeid, strategiarbeid og prestasjonsstyring. Få har det som hovedtema, men mange berører det.",
  "Markedsføring, kommunikasjon og kultur › Kommunikasjon": "Kommunikasjon er et stort og vanlig begrep, og et eget fag, ikke bare en del av markedsføring.",
  "Markedsføring, kommunikasjon og kultur › Kultur og internasjonal business": "Internasjonal profil er en egenskap ved studiene og kursene, ikke et fagområde. Det som handler om kultur og internasjonal forståelse samles her.",
  "Markedsføring, kommunikasjon og kultur › Kunde- og markedsinnsikt": "Forbrukerpsykologi, kunderelasjoner og metode for å forstå kunder og marked. Kundeinnsikt er et vanlig begrep.",
  "Markedsføring, kommunikasjon og kultur › Markedsføring": "Markedsføring er et stort og vanlig begrep, og kjernen i fagområdet.",
  "Sikkerhet og beredskap › Beredskap og krisehåndtering": "Beredskap og krisehåndtering er vanlige begreper. Handler om å forberede seg på og håndtere kriser, terror og det uventede.",
  "Sikkerhet og beredskap › Sikkerhetsledelse og cybersikkerhet": "Cybersikkerhet er et stort og vanlig begrep. Sikkerhetsledelse og digital sikkerhet for ledere.",
  "Innovasjon, bærekraft og logistikk › Bærekraft": "Bærekraft er et stort og vanlig begrep som går på tvers av alle fagområder, og mange studier og kurs har det som ekstra fagområde.",
  "Innovasjon, bærekraft og logistikk › Innovasjon og entreprenørskap": "Innovasjon og entreprenørskap er vanlige begreper. Nyskaping, forretningsutvikling og entreprenørskap er et eget tema med egne kurs.",
};

type SplitItem = { name: string; main: number; extra: number; total: number; color: string };

const wrapWords = (text: string, max: number): string[] => {
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(" ")) {
    if (line && (line + " " + word).length > max) {
      lines.push(line);
      line = word;
    } else {
      line = line ? `${line} ${word}` : word;
    }
  }
  if (line) lines.push(line);
  return lines;
};

function AreaSplitSankey({ area, items }: { area: string; items: SplitItem[] }) {
  const width = 300;
  const nodeWidth = 14;
  const gap = 12;
  const lineHeight = 20;
  const nameHeight = 26;
  const labelLines = wrapLabel(area, 20);
  const areaGray = "var(--bi-neutral-50)";
  const iconHeight = 34;
  const lineStep = 22;
  const boxContentHeight = 20 + iconHeight + 12 + labelLines.length * lineStep + 14;
  const total = items.reduce((sum, item) => sum + item.total, 0);
  const gradientPrefix = `split-${area.replace(/\W/g, "")}`;
  // Boksen har samme høyde som firkanten alt går ut fra, så skalaen økes til firkanten er stor nok til ikon og navn
  const scale = Math.max(3, boxContentHeight / total);
  const prepared = items.map((item) => {
    const reasonLines = wrapWords(subcategoryReasons[`${area} › ${item.name}`] ?? "", 80);
    const textHeight = nameHeight + reasonLines.length * lineHeight;
    return { ...item, reasonLines, textHeight, size: Math.max(item.total * scale, textHeight + 6) };
  });
  const rightHeight = prepared.reduce((sum, item) => sum + item.size, 0) + gap * (prepared.length - 1);
  const leftHeight = total * scale;
  const height = Math.max(leftHeight, rightHeight);
  const leftY = (height - leftHeight) / 2;
  let rightCursor = (height - rightHeight) / 2;
  let leftCursor = leftY;
  const nodes = prepared.map((item) => {
    const bandHeight = item.total * scale;
    const node = { ...item, y: rightCursor, y0: leftCursor, y1: rightCursor + (item.size - bandHeight) / 2, bandHeight };
    rightCursor += item.size + gap;
    leftCursor += bandHeight;
    return node;
  });
  return (
    <svg viewBox={`-290 -10 ${290 + width + 700} ${height + 20}`} role="img" aria-label={`${area} delt opp i underkategorier`} style={{ width: "100%", height: "auto" }}>
      {nodes.map((node) => {
        const x0 = nodeWidth;
        const x1 = width - nodeWidth;
        const c = (x1 - x0) / 2;
        const path = `M ${x0} ${node.y0} C ${x0 + c} ${node.y0} ${x1 - c} ${node.y1} ${x1} ${node.y1} L ${x1} ${node.y1 + node.bandHeight} C ${x1 - c} ${node.y1 + node.bandHeight} ${x0 + c} ${node.y0 + node.bandHeight} ${x0} ${node.y0 + node.bandHeight} Z`;
        return (
          <g key={node.name}>
            <defs>
              <linearGradient id={`${gradientPrefix}-${node.name.replace(/\W/g, "")}`} gradientUnits="userSpaceOnUse" x1={x0} y1={0} x2={x1} y2={0}>
                <stop offset="0%" stopColor="#597694" />
                <stop offset="100%" stopColor={node.color} />
              </linearGradient>
            </defs>
            <path d={path} fill={`url(#${gradientPrefix}-${node.name.replace(/\W/g, "")})`} fillOpacity={0.5}>
              <title>{`${node.name}: ${node.total}`}</title>
            </path>
          </g>
        );
      })}
      <rect x={0} y={leftY} width={nodeWidth} height={leftHeight} fill={areaGray} />
      {(() => {
        // Tittelen står tett inntil firkanten i stedet for langt ut til venstre
        const textWidth = Math.max(...labelLines.map((line, index) => (index === labelLines.length - 1 ? `${line} (${total})` : line).length)) * 9.6;
        const lineStart = -(textWidth + 32);
        const centerX = lineStart / 2 - 8;
        const textHeight = iconHeight + 12 + labelLines.length * lineStep;
        const contentTop = leftY + (leftHeight - textHeight) / 2;
        return (
          <g>
            <AreaIconInSvg area={area} centerX={centerX} top={contentTop} height={iconHeight} color={areaGray} />
            <text x={centerX} y={contentTop + iconHeight + 12 + 16} textAnchor="middle" fontSize="17" fontWeight="700" fill="#222d38">
              {labelLines.map((line, lineIndex) => (
                <tspan key={line} x={centerX} dy={lineIndex === 0 ? 0 : lineStep}>
                  {line}
                  {lineIndex === labelLines.length - 1 && ` (${total})`}
                </tspan>
              ))}
            </text>
          </g>
        );
      })()}
      {nodes.map((node) => (
        <g key={node.name}>
          <rect x={width - nodeWidth} y={node.y} width={nodeWidth} height={node.size} fill={node.color} />
          <text x={width + 8} y={node.y + (node.size - node.textHeight) / 2 + 17} fontSize="15" fill="#222d38">
            <tspan fontSize="17" fontWeight="700">
              {node.name} ({node.total})
            </tspan>
            {node.reasonLines.map((line, lineIndex) => (
              <tspan key={line} x={width + 8} dy={lineIndex === 0 ? nameHeight : lineHeight} fill="#475e75">
                {line}
              </tspan>
            ))}
          </text>
        </g>
      ))}
    </svg>
  );
}

function AreaSubcategorySlide({ area }: { area: string }) {
  const entry = areaTree.find((candidate) => candidate.area === area);
  if (!entry) return null;
  const items: SplitItem[] = entry.subs
    .map(([name, { main, extra }]) => ({ name, main, extra, total: main + extra }))
    .filter((item) => item.total > 0)
    .sort((x, y) => y.total - x.total || x.name.localeCompare(y.name, "nb"))
    .map((item, index) => ({ ...item, color: blueShades[index % blueShades.length] }));
  return <AreaSplitSankey area={area} items={items} />;
}

const crossCuttingExamples: BeforeAfterExample[] = [
  { title: "Helseledelse", level: "Masterkurs" },
  { title: "Bachelor fintech", level: "Bachelorkurs" },
  { title: "Sikkerhetsledelse", level: "Bachelorkurs" },
];

function CrossCuttingSlide() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <p style={{ margin: 0, maxWidth: 820, color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.9375rem" }}>
        Studier og kurs som går på tvers kan finnes flere steder. Hovedfagområdet bestemmer hvor de står i den grupperte lista, med fagområde og underkategori som overskrifter.
        De ekstra fagområdene gjør at de også vises under de andre fagområdene, så de blir funnet uansett hvilken inngang man velger.
      </p>
      <BeforeAfterExamples examples={crossCuttingExamples} showLocations />
      <SubcategoryOverlap />
    </div>
  );
}

/** Blå og grå toner per fagområde i overlappdiagrammet. */
const overlapColors: Record<string, string> = {
  "Finans, økonomi og regnskap": "#042f5b",
  "Ledelse og strategi": "#0b4db4",
  "Innovasjon, bærekraft og logistikk": "#3a7be0",
  "KI, digitalisering og analytics": "#6196f4",
  "Markedsføring, kommunikasjon og kultur": "#9ec0f1",
  "HR og organisasjonsutvikling": "#597694",
  "Helse, skole og barnehage": "#90a3b7",
  "Sikkerhet og beredskap": "#2c3e50",
  "Juss, skatt og eiendom": "#b4c0cd",
};
const overlapColor = (area: string) => overlapColors[area] ?? "#c8d1db";

/** Underkategorier som oftest står sammen på det samme studiet eller kurset. */function SubcategoryOverlap() {
  const [focus, setFocus] = useState<string | null>(null);
  const flowMap = new Map<string, { from: string; to: string; count: number }>();
  summaryRows.forEach((row) => {
    const [main, ...extras] = [...new Set(row[6].split("; "))];
    extras.forEach((extra) => {
      const key = `${main}|${extra}`;
      flowMap.set(key, { from: main, to: extra, count: (flowMap.get(key)?.count ?? 0) + 1 });
    });
  });
  const flows = [...flowMap.values()].sort((x, y) => y.count - x.count || x.from.localeCompare(y.from, "nb")).slice(0, 14);
  const totalOf = (side: "from" | "to") => {
    const totals = new Map<string, number>();
    flows.forEach((flow) => totals.set(flow[side], (totals.get(flow[side]) ?? 0) + flow.count));
    return totals;
  };
  const leftTotals = totalOf("from");
  const rightTotals = totalOf("to");
  const crossings = (leftOrder: string[], rightOrder: string[]) => {
    let count = 0;
    flows.forEach((a, i) =>
      flows.slice(i + 1).forEach((b) => {
        const left = leftOrder.indexOf(a.from) - leftOrder.indexOf(b.from);
        const right = rightOrder.indexOf(a.to) - rightOrder.indexOf(b.to);
        if (left * right < 0) count += a.count * b.count;
      }),
    );
    return count;
  };
  const areaOrder = ["Ledelse og strategi", "Finans, økonomi og regnskap", "Innovasjon, bærekraft og logistikk", ...Object.keys(areaColors)];
  const rightRank = (name: string) => areaOrder.indexOf(name.split(" › ")[0]);
  const barycenter = (names: string[], side: "from" | "to", otherOrder: string[]) => {
    const other = side === "from" ? "to" : "from";
    const position = (name: string) => {
      const related = flows.filter((flow) => flow[side] === name);
      return related.reduce((sum, flow) => sum + otherOrder.indexOf(flow[other]) * flow.count, 0) / (related.reduce((sum, flow) => sum + flow.count, 0) || 1);
    };
    return [...names].sort((x, y) => (side === "to" ? rightRank(x) - rightRank(y) : 0) || position(x) - position(y));
  };
  let left = [...leftTotals.keys()].sort((x, y) => (leftTotals.get(y) ?? 0) - (leftTotals.get(x) ?? 0));
  let right = [...rightTotals.keys()];
  for (let pass = 0; pass < 6; pass++) {
    right = barycenter(right, "to", left);
    left = barycenter(left, "from", right);
  }
  // Bytter nabonoder så lenge det gir færre kryssende bånd. Til høyre holdes fagområdene samlet i fast rekkefølge.
  let improved = true;
  while (improved) {
    improved = false;
    for (const side of ["left", "right"] as const) {
      const order = side === "left" ? left : right;
      for (let i = 0; i < order.length - 1; i++) {
        if (side === "right" && rightRank(order[i]) !== rightRank(order[i + 1])) continue;
        const swapped = [...order];
        [swapped[i], swapped[i + 1]] = [swapped[i + 1], swapped[i]];
        const before = crossings(left, right);
        const after = side === "left" ? crossings(swapped, right) : crossings(left, swapped);
        if (after < before) {
          if (side === "left") left = swapped;
          else right = swapped;
          improved = true;
          break;
        }
      }
    }
  }

  const width = 420;
  const nodeWidth = 14;
  const gap = 12;
  const scale = 7;
  const minNode = 30;
  const sizeOf = (totals: Map<string, number>) => (name: string) => Math.max((totals.get(name) ?? 0) * scale, minNode);
  const leftSize = sizeOf(leftTotals);
  const rightSize = sizeOf(rightTotals);
  const columnHeight = (names: string[], size: (name: string) => number) => names.reduce((sum, name) => sum + size(name), 0) + gap * (names.length - 1);
  const height = Math.max(columnHeight(left, leftSize), columnHeight(right, rightSize));
  const place = (names: string[], size: (name: string) => number) => {
    const offset = (height - columnHeight(names, size)) / 2;
    const positions = new Map<string, number>();
    let cursor = offset;
    names.forEach((name) => {
      positions.set(name, cursor);
      cursor += size(name) + gap;
    });
    return positions;
  };
  const leftY = place(left, leftSize);
  const rightY = place(right, rightSize);
  const leftCursor = new Map(left.map((name) => [name, (leftY.get(name) ?? 0) + (leftSize(name) - (leftTotals.get(name) ?? 0) * scale) / 2]));
  const rightCursor = new Map(right.map((name) => [name, (rightY.get(name) ?? 0) + (rightSize(name) - (rightTotals.get(name) ?? 0) * scale) / 2]));
  const bands = new Map<string, { y0: number; y1: number }>();
  left.forEach((from) =>
    [...flows]
      .filter((flow) => flow.from === from)
      .sort((x, y) => right.indexOf(x.to) - right.indexOf(y.to))
      .forEach((flow) => {
        bands.set(`${flow.from}|${flow.to}`, { y0: leftCursor.get(from) ?? 0, y1: 0 });
        leftCursor.set(from, (leftCursor.get(from) ?? 0) + flow.count * scale);
      }),
  );
  right.forEach((to) =>
    [...flows]
      .filter((flow) => flow.to === to)
      .sort((x, y) => (bands.get(`${x.from}|${x.to}`)?.y0 ?? 0) - (bands.get(`${y.from}|${y.to}`)?.y0 ?? 0))
      .forEach((flow) => {
        const band = bands.get(`${flow.from}|${flow.to}`);
        if (band) band.y1 = rightCursor.get(to) ?? 0;
        rightCursor.set(to, (rightCursor.get(to) ?? 0) + flow.count * scale);
      }),
  );
  const split = (entry: string) => {
    const [area, sub] = entry.split(" › ");
    return { area, sub };
  };
  const isActive = (flow: { from: string; to: string }) => focus === null || focus === `L|${flow.from}` || focus === `R|${flow.to}`;
  const nodeLabel = (entry: string, x: number, anchor: "start" | "end", y: number, h: number, total: number) => {
    const { area, sub } = split(entry);
    const lines = wrapLabel(sub, 30);
    const lineHeight = 14;
    const startY = y + h / 2 - ((lines.length + 1) * lineHeight) / 2 + lineHeight / 2;
    return (
      <text x={x} textAnchor={anchor} fontSize="12" fill="#222d38">
        {lines.map((line, index) => (
          <tspan key={line} x={x} y={startY + index * lineHeight} fontWeight="700">
            {line}
            {index === lines.length - 1 && <tspan fill="#597694" fontWeight="400"> ({total})</tspan>}
          </tspan>
        ))}
        <tspan x={x} y={startY + lines.length * lineHeight} fontSize="11" fill="#597694">
          {areaShortName[area] ?? area}
        </tspan>
      </text>
    );
  };
  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 980, marginTop: 12 }}>
      <div style={{ fontWeight: 700 }}>Underkategorier som oftest overlapper</div>
      <p style={{ margin: 0, maxWidth: 820, color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.9375rem" }}>
        Til venstre er underkategorien studiet eller kurset har som hovedplassering, til høyre er underkategorien det også vises under som ekstra. Bredden viser antall studier og kurs. De {flows.length} vanligste
        kombinasjonene vises. Hold musepekeren over en underkategori for å se koblingene.
      </p>
      <svg viewBox={`-260 -44 ${width + 520} ${height + 54}`} role="img" aria-label="Overlapp mellom underkategorier" style={{ width: "100%", height: "auto" }} onMouseLeave={() => setFocus(null)}>
        <text x={-8} y={-22} textAnchor="end" fontSize="13" fontWeight="700" fill="#222d38">
          Hovedfagområde
        </text>
        <text x={width + 8} y={-22} textAnchor="start" fontSize="13" fontWeight="700" fill="#222d38">
          Ekstra fagområde
        </text>
        {flows.map((flow) => {
          const band = bands.get(`${flow.from}|${flow.to}`);
          if (!band) return null;
          const h = flow.count * scale;
          const x0 = nodeWidth;
          const x1 = width - nodeWidth;
          const c = (x1 - x0) / 2;
          const gradientId = `overlap-${flows.indexOf(flow)}`;
          const path = `M ${x0} ${band.y0} C ${x0 + c} ${band.y0} ${x1 - c} ${band.y1} ${x1} ${band.y1} L ${x1} ${band.y1 + h} C ${x1 - c} ${band.y1 + h} ${x0 + c} ${band.y0 + h} ${x0} ${band.y0 + h} Z`;
          return (
            <g key={`${flow.from}|${flow.to}`}>
              <defs>
                <linearGradient id={gradientId} gradientUnits="userSpaceOnUse" x1={x0} y1={0} x2={x1} y2={0}>
                  <stop offset="0%" stopColor={overlapColor(split(flow.from).area)} />
                  <stop offset="100%" stopColor={overlapColor(split(flow.to).area)} />
                </linearGradient>
              </defs>
              <path d={path} fill={`url(#${gradientId})`} fillOpacity={isActive(flow) ? 0.5 : 0.1} style={{ transition: "fill-opacity 150ms" }}>
                <title>{`${split(flow.from).sub} + ${split(flow.to).sub}: ${flow.count}`}</title>
              </path>
            </g>
          );
        })}
        {left.map((name) => {
          const y = leftY.get(name) ?? 0;
          const h = leftSize(name);
          return (
            <g key={name} onMouseEnter={() => setFocus(`L|${name}`)} style={{ cursor: "default" }}>
              <rect x={0} y={y} width={nodeWidth} height={h} fill={overlapColor(split(name).area)} />
              {nodeLabel(name, -8, "end", y, h, leftTotals.get(name) ?? 0)}
            </g>
          );
        })}
        {right.map((name) => {
          const y = rightY.get(name) ?? 0;
          const h = rightSize(name);
          return (
            <g key={name} onMouseEnter={() => setFocus(`R|${name}`)} style={{ cursor: "default" }}>
              <rect x={width - nodeWidth} y={y} width={nodeWidth} height={h} fill={overlapColor(split(name).area)} />
              {nodeLabel(name, width + 8, "start", y, h, rightTotals.get(name) ?? 0)}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/** Antall studier og kurs som har en gitt underkategori, enten som hoved eller ekstra. */
const placedInSub = (area: string, sub: string) => summaryRows.filter((row) => row[6].split("; ").includes(`${area} › ${sub}`)).length;
/** Antall studier og kurs som er plassert i et fagområde, enten som hoved eller ekstra. */
const placedInArea = (area: string) => summaryRows.filter((row) => row[6].split("; ").some((placement) => placement.startsWith(`${area} › `))).length;

const renamedPairs = [
  { from: "Finans, økonomi og styring", to: "Finans, økonomi og regnskap", why: `«Styring» var tvetydig (økonomistyring eller ledelse?). Regnskap er et stort og vanlig søkeord, med egne yrkesløp som revisor og regnskapsfører, og er nå synlig i navnet. ${placedInSub("Finans, økonomi og regnskap", "Regnskap og revisjon")} studier og kurs har underkategorien Regnskap og revisjon, av ${placedInArea("Finans, økonomi og regnskap")} i fagområdet.` },
  { from: "Digitalisering og Analytics", to: "KI, digitalisering og analytics", why: `KI er et stort og vanlig begrep som mange studier og kurs har som hovedtema, så det bør stå i navnet. ${placedInSub("KI, digitalisering og analytics", "KI")} studier og kurs har underkategorien KI, ved siden av ${placedInSub("KI, digitalisering og analytics", "Data science og analytics")} i Data science og analytics og ${placedInSub("KI, digitalisering og analytics", "Digital transformasjon")} i Digital transformasjon.` },
  { from: "Organisasjonsutvikling og Human Resource Management", to: "HR og organisasjonsutvikling", why: `HR er et mer vanlig begrep i Norge enn «Human Resource Management», og det folk flest søker etter. HR og personalledelse har ${placedInSub("HR og organisasjonsutvikling", "HR og personalledelse")} studier og kurs, og hele fagområdet har ${placedInArea("HR og organisasjonsutvikling")}. Derfor står HR først i navnet.` },
  { from: "Eiendom, varehandel og forretningsjus", to: "Juss, skatt og eiendom", why: `Skatt er et stort og vanlig søkeord som før var gjemt rundt på flere fagområder, og er nå synlig i navnet. ${placedInSub("Juss, skatt og eiendom", "Skatt og avgift")} studier og kurs har underkategorien Skatt og avgift. Forretningsjus har blitt til kun juss, siden fagområdet har mer enn forretningsjus: ${placedInSub("Juss, skatt og eiendom", "Forretningsjus og rettsvitenskap")} i Forretningsjus og rettsvitenskap, og ${placedInSub("Juss, skatt og eiendom", "Eiendomsmegling")} i Eiendomsmegling. I alt har fagområdet ${placedInArea("Juss, skatt og eiendom")} studier og kurs.` },
  { from: "Ledelse", to: "Ledelse og strategi", why: `Ledelse er det største og mest brukte begrepet, med ${placedInArea("Ledelse og strategi")} studier og kurs i fagområdet. Strategi er også et vanlig søkeord, men har mye overlapp med ledelse, noe som gjør det vanskelig å skille dem. Strategi er nå synlig i navnet og samlet med ledelse.` },
  { from: "Strategi, innovasjon og bærekraft", to: "Innovasjon, bærekraft og logistikk", why: `Strategi er flyttet til Ledelse og strategi. Logistikk lå tidligere gjemt inne i Finans, økonomi og regnskap, og begrepet er nå løftet frem og gjort mer synlig her. Innovasjon, bærekraft og logistikk er alle vanlige begreper, og fagområdet har ${placedInArea("Innovasjon, bærekraft og logistikk")} studier og kurs: ${placedInSub("Innovasjon, bærekraft og logistikk", "Bærekraft")} i Bærekraft, ${placedInSub("Innovasjon, bærekraft og logistikk", "Innovasjon og entreprenørskap")} i Innovasjon og entreprenørskap og ${placedInSub("Innovasjon, bærekraft og logistikk", "Logistikk og forsyningskjeder")} i Logistikk og forsyningskjeder. Bærekraft er også et tema som går på tvers.` },
];

const whyRenamed = (from: string) => renamedPairs.find((pair) => pair.from === from)?.why;

function WhyBetter() {
  const { before, after, extras, subs, withSeveral, withoutArea } = beforeAfter;
  const { total, maxCount, percent } = beforeAfterScale();
  const [exampleLevel, setExampleLevel] = useState("Masterkurs");
  const [exampleArea, setExampleArea] = useState("Ledelse og strategi");
  const [showReal, setShowReal] = useState(false);
  const exampleLevels = levelGroups.filter(({ key }) => ["Bachelor", "Master", "Bachelorkurs", "Masterkurs", "NettAlle"].includes(key)).map(({ key, label }) => ({ key, label }));
  const exampleAreas = [...overlapOrder].sort((x, y) => x.localeCompare(y, "nb")).map((area) => ({ key: area, label: area }));
  const choices = (label: string, options: { key: string; label: string }[], value: string, onChange: (key: string) => void) => (
    <div style={{ display: "flex", alignItems: "end", gap: 12 }}>
      <div style={{ flex: "0 0 300px", maxWidth: "100%" }}>
        <Selectfield fullwidth label={label} value={value} onChange={(event) => onChange(event.target.value)}>
          {options.map(({ key, label: optionLabel }) => (
            <option key={key} value={key}>
              {optionLabel}
            </option>
          ))}
        </Selectfield>
      </div>
      <Button size="medium" variant="outlined" aria-pressed={showReal} onClick={() => setShowReal((current) => !current)}>
        {showReal ? "Vis skeleton" : "Vis faktiske studier og kurs"}
      </Button>
    </div>
  );
  /** Én linje i en liste: skeleton eller tittelen på studiet eller kurset. */
  const listLine = (title: string, muted = false) =>
    showReal ? <span style={{ color: muted ? "var(--bi-color-neutral-text-secondary)" : undefined }}>{title}</span> : <SkeletonLine seed={title} muted={muted} />;
  /** Ekstra linjer i «Før»-listen så den blir like lang som «Nå»-listen. Usynlige når de faktiske titlene vises. */
  const fillerLines = (groupCount: number) =>
    fillerSeeds(groupCount, showReal).map((seed, rowIndex) => (
      <li key={`${seed}-${rowIndex}`} aria-hidden="true">
        {showReal ? <span style={{ visibility: "hidden" }}>&nbsp;</span> : <SkeletonLine seed={seed} />}
      </li>
    ));
  return (() => {
          const withOne = total - withoutArea - withSeveral;
          const ledelseSubs = [...(subs.get(exampleArea) ?? [])].filter(([, v]) => v.main + v.extra > 0).sort((x, y) => y[1].main + y[1].extra - (x[1].main + x[1].extra));
          const ledelseNow = ledelseSubs.reduce((sum, [, v]) => sum + v.main + v.extra, 0);
          const HRNAME = "Organisasjonsutvikling og Human Resource Management";
          const HRNEW = "HR og organisasjonsutvikling";
          const bothBefore = summaryRows.filter((row) => row[4].split("; ").includes("Ledelse") && row[4].split("; ").includes(HRNAME)).length;
          const onlyLedelseBefore = summaryRows.filter((row) => row[4].split("; ").includes("Ledelse") && !row[4].split("; ").includes(HRNAME)).length;
          const onlyHrBefore = summaryRows.filter((row) => !row[4].split("; ").includes("Ledelse") && row[4].split("; ").includes(HRNAME)).length;
          const touches = (row: Row, area: string) => row[6].split("; ").some((entry) => entryArea(entry) === area);
          const ledelseWithHr = summaryRows.filter((row) => row[0] === "Ledelse og strategi" && touches(row, HRNEW)).length;
          const ledelseOnly = summaryRows.filter((row) => row[0] === "Ledelse og strategi" && !touches(row, HRNEW)).length;
          const hrWithLedelse = summaryRows.filter((row) => row[0] === HRNEW && touches(row, "Ledelse og strategi")).length;
          const hrOnly = summaryRows.filter((row) => row[0] === HRNEW && !touches(row, "Ledelse og strategi")).length;
          const missingRows = summaryRows.filter((row) => row[4] === "–");
          const missingMap = new Map<string, number>();
          for (const row of missingRows) missingMap.set(row[0], (missingMap.get(row[0]) ?? 0) + 1);
          const missingParts = [...missingMap].sort((x, y) => y[1] - x[1]);
          const areaMain = (area: string) => after.get(area)?.count ?? 0;
          const areaExtra = (area: string) => [...(extras.get(area)?.values() ?? [])].reduce((sum, value) => sum + value, 0);
          const withExtraRows = summaryRows.filter((row) => row[6].split("; ").some((entry) => entryArea(entry) !== row[0])).length;
          const placementsBefore = [...before].filter(([name]) => name !== noOldArea).reduce((sum, [, value]) => sum + value.count, 0);
          const placementsNow = summaryRows.reduce((sum, row) => sum + row[6].split("; ").length, 0);
          const withExtraCount = placementsNow - total;
          const industryMap = new Map<string, number>();
          for (const row of summaryRows) if (row[9] !== "–") industryMap.set(row[9], (industryMap.get(row[9]) ?? 0) + 1);
          const industryParts = [...industryMap].sort((x, y) => y[1] - x[1]);
          const industryTotal = industryParts.reduce((sum, [, value]) => sum + value, 0);
          const sizesBefore = [...before].filter(([name]) => name !== noOldArea).sort((x, y) => y[1].count - x[1].count).map(([name, value]) => [name, value.count] as [string, number]);
          const sizesAfter = [...after].sort((x, y) => y[1].count - x[1].count).map(([name, value]) => [name, value.count] as [string, number]);
          const ratioBefore = Math.round(sizesBefore[0][1] / sizesBefore[sizesBefore.length - 1][1]);
          const ratioAfter = Math.round(sizesAfter[0][1] / sizesAfter[sizesAfter.length - 1][1]);
          const describeSizes = (sizes: [string, number][]) => {
            const values = sizes.map(([, value]) => value).sort((x, y) => x - y);
            const mid = Math.floor(values.length / 2);
            const median = values.length % 2 ? values[mid] : (values[mid - 1] + values[mid]) / 2;
            const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
            const deviation = Math.sqrt(values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / values.length);
            return { min: values[0], max: values[values.length - 1], median, mean, spread: values[values.length - 1] - values[0], variation: deviation / mean };
          };
          const statsBefore = describeSizes(sizesBefore);
          const statsAfter = describeSizes(sizesAfter);
          const sizesSubs: [string, number][] = [...subs.entries()].flatMap(([area, map]) => [...map].map(([name, value]) => [`${area} › ${name}`, value.main + value.extra] as [string, number]));
          const statsSubs = describeSizes(sizesSubs);
          const dotValues = { before: sizesBefore.map(([, value]) => value), after: sizesAfter.map(([, value]) => value), subs: sizesSubs.map(([, value]) => value) };
          const oneDecimal = (value: number) => (Math.round(value * 10) / 10).toString().replace(".", ",");
          return (
            <Carousel
              heading={<h3 id="hvorfor" style={{ ...summaryPartHeading, margin: 0 }}>Hvorfor gjøres dette?</h3>}
              slides={[
            {
              title: "Mindre grupper - Bedre navigasjon",
              content: (
              <div style={{ display: "grid", gap: 12, maxWidth: 820 }}>
                <p style={{ margin: 0, color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.9375rem" }}>{`Forskjellen mellom den største og den minste gruppen er ${statsAfter.spread} mellom de nye fagområdene og ${statsSubs.spread} mellom underkategoriene, mot ${statsBefore.spread} mellom de gamle fagområdene (${ratioAfter}× mot ${ratioBefore}× for fagområdene).`}</p>
                <div style={{ display: "grid", gap: 14, padding: "4px 0 2px" }}>
                  {(
                    [
                      ["Før: fagområder", statsBefore, "#c8d1db", dotValues.before],
                      ["Nå: fagområder", statsAfter, "#0b4db4", dotValues.after],
                      ["Nå: underkategorier", statsSubs, "#6196f4", dotValues.subs],
                    ] as [string, ReturnType<typeof describeSizes>, string, number[]][]
                  ).map(([label, stats, color, dots]) => (
                    <div key={label} style={{ display: "grid", gridTemplateColumns: "120px minmax(0, 1fr)", gap: 8, alignItems: "center", fontSize: "0.8125rem" }}>
                      <span style={{ color: "var(--bi-color-neutral-text-secondary)" }}>{label}</span>
                      <div style={{ position: "relative", height: 34 }}>
                        <div style={{ position: "absolute", left: 0, right: 0, top: 14, height: 1, background: "var(--bi-color-neutral-stroke)" }} />
                        {dots.map((value, dotIndex) => (
                          <div key={dotIndex} title={`${value}`} style={{ position: "absolute", left: `calc(${(value / maxCount) * 100}% - 3px)`, top: 12, width: 6, height: 6, borderRadius: "50%", background: color, opacity: 0.55 }} />
                        ))}
                        <div title={`Fra ${stats.min} til ${stats.max}`} style={{ position: "absolute", left: `${(stats.min / maxCount) * 100}%`, width: `${((stats.max - stats.min) / maxCount) * 100}%`, top: 8, height: 14, borderRadius: 7, background: color, opacity: 0.55 }} />
                        <div title={`Minste: ${stats.min}`} style={{ position: "absolute", left: `${(stats.min / maxCount) * 100}%`, top: 6, width: 3, height: 18, background: color }} />
                        <div title={`Største: ${stats.max}`} style={{ position: "absolute", left: `calc(${(stats.max / maxCount) * 100}% - 3px)`, top: 6, width: 3, height: 18, background: color }} />
                        <div title={`Median: ${oneDecimal(stats.median)}`} style={{ position: "absolute", left: `calc(${(stats.median / maxCount) * 100}% - 6px)`, top: 9, width: 12, height: 12, borderRadius: "50%", background: "var(--bi-basic-white)", border: `3px solid ${color}` }} />
                        <div title={`Gjennomsnitt: ${oneDecimal(stats.mean)}`} style={{ position: "absolute", left: `calc(${(stats.mean / maxCount) * 100}% - 1px)`, top: 2, width: 2, height: 26, background: "#042f5b" }} />
                        <span style={{ position: "absolute", left: `${(stats.min / maxCount) * 100}%`, top: 24, fontSize: "0.6875rem", color: "var(--bi-color-neutral-text-secondary)", transform: "translateX(-50%)" }}>{stats.min}</span>
                        <span style={{ position: "absolute", left: `${(stats.max / maxCount) * 100}%`, top: 24, fontSize: "0.6875rem", color: "var(--bi-color-neutral-text-secondary)", transform: "translateX(-50%)" }}>{stats.max}</span>
                      </div>
                    </div>
                  ))}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "2px 14px", color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.8125rem" }}>
                    <span>● Hver gruppe</span>
                    <span>▬ Fra minste til største</span>
                    <span>◯ Median</span>
                    <span style={{ color: "#042f5b" }}>| Gjennomsnitt</span>
                  </div>
                </div>
              </div>
              ),
            },
            {
              title: "Løfte frem skjulte fagområder",
              content: (
              <div style={{ display: "grid", gap: 12, maxWidth: 820 }}>
                <p style={{ margin: 0, color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.9375rem" }}>{"«Offentlig sektor» skjulte tre ulike fagområder: helse, juss og sikkerhet. Nå får hvert tema sin egen inngang, og Juss, skatt og eiendom samler i tillegg kurs som før lå spredt i andre fagområder."}</p>
                <PublicSectorSankey />
                <div style={{ color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.9375rem" }}>Bredden viser antall studier og kurs. Hvert studie eller kurs er vist med ett tidligere fagområde (Offentlig sektor hvis det hadde det, ellers det første).</div>
              </div>
              ),
            },
            {
              title: "Flere innganger, færre blindveier",
              content: (
              <div style={{ display: "grid", gap: 12, maxWidth: 820 }}>
                <div style={{ fontWeight: 700 }}>Flere plasseringer</div>
                <p style={{ margin: 0, color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.9375rem" }}>{`Før var det ${placementsBefore} plasseringer, uten prioritet. Nå har alle en hovedplassering, og ${withExtraCount} ekstra plasseringer gjør at studier og kurs også kan finnes i et nærliggende fagområde.`}</p>
                {labelled("Før", barWithNumber({ key: "p", value: placementsBefore, color: "#c8d1db", label: "Plasseringer før" }, (placementsBefore / placementsNow) * 100))}
                {labelled(
                  "Nå",
                  barWithLegend(
                    [
                      { key: "m", value: total, color: "#0b4db4", label: "Hovedfagområde", legend: "hovedfagområde" },
                      { key: "e", value: placementsNow - total, color: "#9ec0f1", label: "Ekstra fagområde", legend: "ekstra fagområde" },
                    ],
                    100,
                  ),
                )}
                <div style={{ fontWeight: 700, marginTop: 8 }}>Ingen ukategoriserte studier eller kurs</div>
                <p style={{ margin: 0, color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.9375rem" }}>{`${missingRows.length} studier og kurs hadde ikke noe fagområde på bi.no. Nå er de fordelt på ${missingParts.length} fagområder.`}</p>
                {labelled("Før", <span style={{ lineHeight: "14px" }}>Hadde ikke fagområde</span>)}
                {labelled("Nå", barWithNumber({ key: "missing-now", value: missingRows.length, color: "#0b4db4", label: "Har fagområde nå" }, 100))}
                <div style={{ fontWeight: 700, marginTop: 8 }}>Bransjekategorier for B2B</div>
                <p style={{ margin: 0, color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.9375rem" }}>{`${industryTotal} studier og kurs er rettet mot en bestemt bransje. De kan finnes via bransjefilteret og en etikett, uten at bransjen er et eget fagområde.`}</p>
                {labelled("Før", <span style={{ lineHeight: "14px" }}>Hadde ikke bransjekategori</span>)}
                {labelled("Nå", barWithNumber({ key: "industry-now", value: industryTotal, color: "#0b4db4", label: "Har bransjekategori nå" }, 100))}
              </div>
              ),
            },
            {
              title: "Forbedret søk og SEO",
              content: (
              <div style={{ display: "grid", gap: 12, maxWidth: 820 }}>
                {(() => {
                  const oldAreaCount = [...before.keys()].filter((name) => name !== noOldArea).length;
                  const newAreaCount = after.size;
                  const subCount = [...subs.values()].reduce((sum, map) => sum + map.size, 0);
                  return (
                    <>
                      <div style={{ fontWeight: 700 }}>Temasider</div>
                      <div style={{ color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.9375rem" }}>
                        {`Før var det ${oldAreaCount} fagområder, og nå er det ${newAreaCount} fagområder og ${subCount} underkategorier. Det gjør det mulig å ha egne temasider for hvert fagområde og hver underkategori, som også hjelper med søk og navigasjon.`}
                      </div>
                      {labelled("Før", barWithNumber({ key: "pages-before", value: oldAreaCount, color: "#c8d1db", label: "Fagområder før" }, (oldAreaCount / (newAreaCount + subCount)) * 100))}
                      {labelled(
                        "Nå",
                        barWithLegend(
                          [
                            { key: "pages-areas", value: newAreaCount, color: "#0b4db4", label: "Fagområder", legend: "fagområder" },
                            { key: "pages-subs", value: subCount, color: "#9ec0f1", label: "Underkategorier", legend: "underkategorier" },
                          ],
                          100,
                        ),
                      )}
                      <div style={{ fontWeight: 700, marginTop: 8 }}>Søkbare ord</div>
                    </>
                  );
                })()}
                {(() => {
                  const stopWords = new Set(["og", "i", "for", "av", "på", "til", "med", "en", "et", "er"]);
                  const wordsOf = (text: string) => [...new Set((text.toLowerCase().match(/[a-zæøåéü0-9]+/g) ?? []).filter((word) => !stopWords.has(word)))];
                  const oldAreas = [...before.keys()].filter((name) => name !== noOldArea);
                  const uniqueBefore = new Set(oldAreas.flatMap(wordsOf)).size;
                  const nameWordSet = new Set(areaTree.flatMap(({ area }) => wordsOf(area)));
                  const subWordSet = new Set([...subs.values()].flatMap((map) => [...map.keys()].flatMap(wordsOf)).filter((word) => !nameWordSet.has(word)));
                  const uniqueNow = nameWordSet.size + subWordSet.size;
                  return (
                    <>
                      <div style={{ color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.9375rem" }}>
                        {`Antall ulike søkbare ord i navnene på fagområdene og underkategoriene (uten småord som «og»). Før var det ${uniqueBefore} ord, og nå er det ${uniqueNow}.`}
                      </div>
                      {labelled("Før", barWithNumber({ key: "words-before", value: uniqueBefore, color: "#c8d1db", label: "Ord i fagområdene før" }, (uniqueBefore / uniqueNow) * 100))}
                      {labelled(
                        "Nå",
                        barWithLegend(
                          [
                            { key: "words-names", value: nameWordSet.size, color: "#0b4db4", label: "Ord i fagområdene", legend: "ord i fagområdene" },
                            { key: "words-subs", value: subWordSet.size, color: "#9ec0f1", label: "Ord i underkategoriene", legend: "ord i underkategoriene" },
                          ],
                          100,
                        ),
                      )}
                    </>
                  );
                })()}
              </div>
              ),
            },
            {
              title: "Navnene sier mer om innholdet",
              content: (
              <div style={{ display: "grid", gap: 12, maxWidth: 820 }}>
                <p style={{ margin: 0, color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.9375rem" }}>{"Fire fagområder har fått navn som beskriver innholdet bedre, «Offentlig sektor» er delt opp, og to små fagområder er blitt underkategorier. Navnene bruker store og vanlige søkeord og begreper, og tallene viser hvor mange studier og kurs som ligger i hver del."}</p>
                <div style={{ display: "grid", gap: 12 }}>
                  {renamedPairs.map(({ from, to, why }) => (
                    <div key={from} style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 44px minmax(0, 1fr)", alignItems: "center", columnGap: 8, rowGap: 4 }}>
                      <span style={{ justifySelf: "start" }}>
                        <AreaPill label={shortOldName(from)} kind="old" />
                      </span>
                      <ChangeArrow />
                      <span style={{ justifySelf: "start", padding: "4px 10px", border: "1px solid var(--bi-primary-20)", borderRadius: 4, background: "var(--bi-primary-5)", color: "var(--bi-color-primary-text-accent)" }}>{to}</span>
                      <div style={{ gridColumn: 3, color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.9375rem" }}>{why}</div>
                    </div>
                  ))}
                  {[
                    {
                      from: "Offentlig sektor",
                      to: ["Helse, skole og barnehage", "Sikkerhet og beredskap"],
                      why: "Offentlig sektor er ikke et fag og bestod av mange studier og kurs innad helse, jus, skatt og sikkerhet som hadde lite til felles. De nye navnene løfter disse fagområdene frem.",
                    },
                    {
                      from: "Internasjonal Business",
                      to: ["Markedsføring, kommunikasjon og kultur › Kultur og internasjonal business", "Ledelse og strategi", "Finans, økonomi og regnskap"],
                      why: "Internasjonal profil er en egenskap ved studiene og kursene, ikke et fagområde. Internasjonal Business var for lite til å være et eget fagområde og var spredt på mange temaer. Studiene og kursene er nå plassert i tre fagområder, og Kultur og internasjonal business er en underkategori.",
                    },
                    {
                      from: "Prosjektledelse",
                      to: ["Ledelse og strategi › Prosjektledelse"],
                      why: "Var for lite til å være et eget fagområde og hører hjemme i Ledelse og strategi. Er nå en underkategori.",
                    },
                  ].map(({ from, to, why }) => (
                    <div key={from} style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 44px minmax(0, 1fr)", alignItems: "center", columnGap: 8, rowGap: 4 }}>
                      <span style={{ justifySelf: "start" }}>
                        <AreaPill label={from} kind="old" count={before.get(from)?.count} strike />
                      </span>
                      <ChangeArrow />
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, minWidth: 0 }}>
                        {to.map((area) => (
                          <span key={area} style={{ padding: "4px 10px", border: "1px solid var(--bi-primary-20)", borderRadius: 4, background: "var(--bi-primary-5)", color: "var(--bi-color-primary-text-accent)" }}>
                            {area}
                          </span>
                        ))}
                      </div>
                      <div style={{ gridColumn: 3, color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.9375rem" }}>{why}</div>
                    </div>
                  ))}
                </div>
              </div>
              ),
            },
            {
              title: "Prioriterte fagområder → Grupperte lister",
              content: (
              <div style={{ display: "grid", gap: 12, maxWidth: 820 }}>
                <p style={{ margin: 0, color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.9375rem" }}>{`Før manglet ${percent(withoutArea)} fagområde, og ${percent(withSeveral)} hadde flere uten prioritet. Nå har alle ett hovedfagområde (*), og da kan en liste deles opp i grupper i stedet for å vises som én lang liste.`}</p>
                {labelled(
                  "Før",
                  barWithLegend([
                    { key: "none", value: withoutArea, color: "#c8d1db", label: "Manglet fagområde", legend: "manglet" },
                    { key: "several", value: withSeveral, color: "#9ec0f1", label: "Flere fagområder uten prioritet", legend: "flere, uten prioritet" },
                    { key: "one", value: withOne, color: "#0b4db4", label: "Ett fagområde", legend: "ett fagområde" },
                  ]),
                )}
                {labelled("Nå", barWithLegend([{ key: "all", value: total, color: "#0b4db4", label: "Ett hovedfagområde", legend: "ett hovedfagområde" }]))}
                {(() => {
                  const levelGroup = levelGroups.find((group) => group.key === exampleLevel) ?? levelGroups[0];
                  const masterCourses = summaryRows.filter(levelGroup.filter);
                  const byTitle = [...masterCourses].sort((x, y) => x[2].localeCompare(y[2], "nb"));
                  const groups = [...new Set(masterCourses.map((row) => row[0]))]
                    .sort((x, y) => x.localeCompare(y, "nb"))
                    .map((area) => ({ area, list: masterCourses.filter((row) => row[0] === area).sort((x, y) => x[2].localeCompare(y[2], "nb")) }));
                  const listStyle = { margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 4, fontSize: "0.9375rem", color: "var(--bi-color-neutral-text)" } as const;
                  return (
                    <div style={{ display: "grid", gap: 12, marginTop: 8 }}>
                      <div style={{ fontWeight: 700 }}>Eksempel: {levelGroup.label.charAt(0).toLowerCase() + levelGroup.label.slice(1)} ({masterCourses.length})</div>
                      {choices("Studienivå", exampleLevels, exampleLevel, setExampleLevel)}
                      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.3fr)", gap: 32, alignItems: "start" }}>
                        <div style={{ display: "grid", gap: 8 }}>
                          <div style={{ color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.8125rem" }}>Før: én lang liste</div>
                          <ul style={listStyle}>
                            {byTitle.map((row, rowIndex) => (
                              <li key={`${row[2]}-${rowIndex}`}>{listLine(row[2])}</li>
                            ))}
                            {fillerLines(groups.length)}
                          </ul>
                        </div>
                        <div style={{ display: "grid", gap: 26 }}>
                          <div style={{ color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.8125rem" }}>Nå: samme liste, gruppert etter hovedfagområde</div>
                          {groups.map(({ area, list }) => (
                            <div key={area} style={{ display: "grid", gap: 6 }}>
                              <div style={{ fontWeight: 700, display: "flex", alignItems: "center", gap: 10 }}>
                                <AreaIcon area={area} height="0.95em" />
                                <span>
                                  {area} <span style={{ color: "var(--bi-color-neutral-text-secondary)", fontWeight: 400 }}>({list.length})</span>
                                </span>
                              </div>
                              <ul style={listStyle}>
                                {list.map((row, rowIndex) => (
                                  <li key={`${row[2]}-${rowIndex}`}>{listLine(row[2])}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
              ),
            },
            {
              title: "Underkategorier → Grupperte lister",
              content: (
              <div style={{ display: "grid", gap: 12, maxWidth: 820 }}>
                {labelled("Før", barWithNumber({ key: "l-before", value: ledelseNow, color: "#c8d1db", label: "Én lang liste uten underkategorier" }, 100))}
                {labelled(
                  "Nå",
                  barWithLegend(ledelseSubs.map(([name, value], index) => ({ key: name, value: value.main + value.extra, color: blueShades[index % blueShades.length], label: name }))),
                )}
                {(() => {
                  const subOf = (row: Row) => row[6].split("; ").map((entry) => entry.split(" › ")).find(([area]) => area === exampleArea)?.[1];
                  const areaRows = summaryRows.filter((row) => subOf(row));
                  const byTitle = [...areaRows].sort((x, y) => x[2].localeCompare(y[2], "nb"));
                  const groups = [...new Set(areaRows.map(subOf).filter((sub): sub is string => Boolean(sub)))]
                    .sort((x, y) => x.localeCompare(y, "nb"))
                    .map((sub) => ({ sub, list: areaRows.filter((row) => subOf(row) === sub).sort((x, y) => x[2].localeCompare(y[2], "nb")) }));
                  const listStyle = { margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 4, fontSize: "0.9375rem", color: "var(--bi-color-neutral-text)" } as const;
                  return (
                    <div style={{ display: "grid", gap: 12, marginTop: 8 }}>
                      <div style={{ fontWeight: 700 }}>Eksempel: alle studier og kurs i {exampleArea} ({areaRows.length})</div>
                      {choices("Fagområde", exampleAreas, exampleArea, setExampleArea)}
                      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.3fr)", gap: 32, alignItems: "start" }}>
                        <div style={{ display: "grid", gap: 8 }}>
                          <div style={{ color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.8125rem" }}>Før: én lang liste</div>
                          <ul style={listStyle}>
                            {byTitle.map((row, rowIndex) => (
                              <li key={`${row[2]}-${rowIndex}`}>{listLine(row[2])}</li>
                            ))}
                            {fillerLines(groups.length)}
                          </ul>
                        </div>
                        <div style={{ display: "grid", gap: 26 }}>
                          <div style={{ color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.8125rem" }}>Nå: samme studier og kurs, gruppert etter underkategori</div>
                          {groups.map(({ sub, list }, groupIndex) => (
                            <div key={sub} style={{ borderLeft: `4px solid ${blueShades[groupIndex % blueShades.length]}`, paddingLeft: 12, display: "grid", gap: 6 }}>
                              <div style={{ fontWeight: 700 }}>
                                {sub} <span style={{ color: "var(--bi-color-neutral-text-secondary)", fontWeight: 400 }}>({list.length})</span>
                              </div>
                              <ul style={listStyle}>
                                {list.map((row, rowIndex) => (
                                  <li key={`${row[2]}-${rowIndex}`}>{listLine(row[2], row[0] !== exampleArea)}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
              ),
            },
            {
              title: "Ledelse og strategi samler ledelse og strategi",
              content: (
              <div style={{ display: "grid", gap: 12, maxWidth: 820 }}>
                <p style={{ margin: 0, color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.9375rem" }}>{`Ledelse og strategi har ${areaMain("Ledelse og strategi")} studier og kurs som hovedfagområde og ${areaExtra("Ledelse og strategi")} til som ekstra, fra fag der ledelse eller strategi er en viktig del. Strategi er ikke lenger et eget tema sammen med innovasjon og bærekraft, men ligger i underkategorien Strategisk ledelse. Den som leter i Ledelse og strategi, finner dem alle.`}</p>
                <LedelseSankey />
                <div style={{ fontWeight: 700, marginTop: 8 }}>Grensen mellom Ledelse og HR er tydeligere</div>
                <p style={{ margin: 0, color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.9375rem" }}>{"Ledelse eier lederrollen, og HR eier organisasjonen og medarbeiderne. Før lå mange i begge uten at det sto hvilket som var viktigst."}</p>
                {labelled(
                  "Før",
                  barWithLegend([
                    { key: "ol", value: onlyLedelseBefore, color: "#0b4db4", label: "Bare Ledelse" },
                    { key: "both", value: bothBefore, color: "#c8d1db", label: "I både Ledelse og HR", legend: "begge, uten prioritet" },
                    { key: "oh", value: onlyHrBefore, color: "#9ec0f1", label: "Bare HR" },
                  ]),
                )}
                {labelled(
                  "Nå",
                  barWithLegend([
                    { key: "lo", value: ledelseOnly, color: "#0b4db4", label: "Ledelse og strategi" },
                    { key: "lh", value: ledelseWithHr, color: "#6196f4", label: "Ledelse og strategi, med HR som ekstra fagområde" },
                    { key: "hl", value: hrWithLedelse, color: "#c5d9f7", label: "HR, med Ledelse og strategi som ekstra fagområde" },
                    { key: "ho", value: hrOnly, color: "#9ec0f1", label: "HR" },
                  ]),
                )}
                <div style={{ fontWeight: 700, marginTop: 8 }}>Tre eksempler: før og nå</div>
                <BeforeAfterExamples />
              </div>
              ),
            },
            {
              title: "Forhindre inkonsekvent kategorisering",
              content: <ConsistentCategorisationSlide />,
            },
            {
              title: "Overlapp er synlig i stedet for skjult",
              content: (
              <div style={{ display: "grid", gap: 12, maxWidth: 820 }}>
                <p style={{ margin: 0, color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.9375rem" }}>{`${withExtraRows} av ${total} studier og kurs (${percent(withExtraRows)}) har ekstra fagområde, og koblingene kan utforskes i diagrammene over. Før hadde ${percent(withSeveral)} flere fagområder, men uten å si hvilket som var viktigst.`}</p>
                {labelled("Før", barWithLegend([{ key: "several", value: withSeveral, color: "#9ec0f1", label: "Flere fagområder uten prioritet", legend: "flere, uten prioritet" }, { key: "rest", value: total - withSeveral, color: "#c8d1db", label: "Ett eller ingen", legend: "ett eller ingen" }]))}
                {labelled("Nå", barWithLegend([{ key: "extra", value: withExtraRows, color: "#9ec0f1", label: "Hoved og ekstra", legend: "hoved og ekstra fagområde" }, { key: "main", value: total - withExtraRows, color: "#0b4db4", label: "Bare hovedfagområde", legend: "bare hovedfagområde" }]))}
              </div>
              ),
            },
            {
              title: "Bygger videre på eksisterende struktur",
              content: <KeepAreaSlide />,
            },
            {
              title: "Oppsummering",
              content: (
                <SectionSummary
                  items={[
                    { title: "Mindre grupper - Bedre navigasjon", text: "Gruppene er jevnere i størrelse, og underkategoriene gjør dem enda mindre." },
                    { title: "Løfte frem skjulte fagområder", text: "Offentlig sektor skjulte helse, juss og sikkerhet. Nå har hvert tema sin egen inngang." },
                    { title: "Flere innganger, færre blindveier", text: "Ekstra fagområder gir flere plasseringer, så studier og kurs også finnes i nærliggende fagområder." },
                    { title: "Forbedret søk og SEO", text: "Flere temasider og søkbare ord gjennom fagområder og underkategorier." },
                    { title: "Navnene sier mer om innholdet", text: "Nye navn beskriver innholdet bedre, og små fagområder er blitt underkategorier." },
                    { title: "Prioriterte fagområder → Grupperte lister", text: "Ett hovedfagområde per studie og kurs gjør at lister kan grupperes i stedet for å vises som én lang liste." },
                    { title: "Underkategorier → Grupperte lister", text: "Underkategorier deler lange lister i oversiktlige grupper." },
                    { title: "Ledelse og strategi samler ledelse og strategi", text: "Strategi ligger i Ledelse og strategi, og grensen mot HR er tydeligere." },
                    { title: "Forhindre inkonsekvent kategorisering", text: "Felles regler: ett hovedfagområde med underkategori, og ekstra fagområder for bredden." },
                    { title: "Overlapp er synlig i stedet for skjult", text: "Ekstra fagområder viser hvor studier og kurs overlapper, og hvilket fagområde som er viktigst." },
                    { title: "Bygger videre på eksisterende struktur", text: "De fleste beholder hovedfagområdet sitt, og få er flyttet til et annet." },
                  ]}
                />
              ),
            },
              ]}
            />
          );
        })();
}

const shuffleIndexes = (length: number) => {
  const order = Array.from({ length }, (_, index) => index);
  for (let index = order.length - 1; index > 0; index--) {
    const other = Math.floor(Math.random() * (index + 1));
    [order[index], order[other]] = [order[other], order[index]];
  }
  return order;
};

const ROUNDS = 10;
const POINTS_PER_ROUND = 2.5;
const fmtPoints = (points: number) => points.toLocaleString("nb-NO");

const grades: { min: number; letter: string; emoji: string; motion: string; title: string; text: string }[] = [
  { min: 22.5, letter: "A", emoji: "🏆", motion: "grade-bounce 1.8s ease-in-out", title: "Fagområde-guru", text: "Du finner studiene og kursene i søvne. Strukturen fungerer for deg!" },
  { min: 18, letter: "B", emoji: "🧭", motion: "grade-sway 3s ease-in-out", title: "Trygg navigatør", text: "Nesten helt i mål. Du leser kartet godt." },
  { min: 14.5, letter: "C", emoji: "🔍", motion: "grade-search 3.2s linear", title: "Nysgjerrig oppdager", text: "Du finner det meste, og du er godt på vei. Litt mer utforsking, så sitter strukturen." },
  { min: 10, letter: "D", emoji: "🗺️", motion: "grade-drift 4s ease-in-out", title: "Turist i landskapet", text: "Du er på rett vei, men noen steder er litt vanskelige å finne." },
  { min: 6, letter: "E", emoji: "🧪", motion: "grade-wiggle 1.6s ease-in-out", title: "Rask på labben", text: "Du er i gang! Her er det mye å utforske." },
  { min: 0, letter: "F", emoji: "😵‍💫", motion: "grade-spin 3s ease-in-out", title: "Villfaren, men modig", text: "Det var en tøff runde. Prøv igjen, så sitter det snart." },
];

const emojiScatter = [
  { left: 5, top: 7, size: 2.6, rotate: -14, delay: 0 },
  { left: 90, top: 5, size: 3.2, rotate: 12, delay: 0.7 },
  { left: 17, top: 27, size: 3.6, rotate: 8, delay: 1.3 },
  { left: 80, top: 24, size: 2.3, rotate: -20, delay: 0.4 },
  { left: 4, top: 50, size: 3, rotate: 18, delay: 1.1 },
  { left: 92, top: 46, size: 3.4, rotate: -8, delay: 1.7 },
  { left: 14, top: 72, size: 2.4, rotate: -22, delay: 0.5 },
  { left: 84, top: 70, size: 3.1, rotate: 15, delay: 0.2 },
  { left: 6, top: 90, size: 3.3, rotate: 10, delay: 1.5 },
  { left: 93, top: 88, size: 2.5, rotate: -12, delay: 0.9 },
];

const gradeFor = (score: number) => grades.find((grade) => score >= grade.min) ?? grades[grades.length - 1];

const gradeSuffix = (score: number) => {
  const index = grades.findIndex((grade) => score >= grade.min);
  const grade = grades[index] ?? grades[grades.length - 1];
  if (grade.letter === "F") return "";
  const max = index === 0 ? ROUNDS * POINTS_PER_ROUND : grades[index - 1].min - 0.5;
  return score > max - 1 ? "+" : score < grade.min + 1 ? "−" : "";
};

const confettiColors = ["var(--bi-primary-90)", "var(--bi-primary-60)", "var(--bi-primary-40)", "var(--bi-primary-20)", "var(--bi-secondary-50)", "var(--bi-success-50)", "var(--bi-info-40)"];
const confettiPieces = Array.from({ length: 44 }, (_, index) => ({
  left: (index * 53) % 100,
  delay: ((index * 37) % 20) / 10,
  duration: 2.4 + ((index * 17) % 15) / 10,
  size: 6 + ((index * 7) % 7),
  color: confettiColors[index % confettiColors.length],
  rotate: (index * 47) % 360,
}));

function GradeScreen({ score, roundPoints, onRestart }: { score: number; roundPoints: number[]; onRestart: () => void }) {
  const grade = gradeFor(score);
  const suffix = gradeSuffix(score);
  const max = ROUNDS * POINTS_PER_ROUND;
  const celebrate = grade.min >= 14.5;
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const chipColor = (points: number) => (points >= 2.5 ? "var(--bi-primary-50)" : points >= 1.5 ? "var(--bi-primary-40)" : points >= 1 ? "var(--bi-primary-20)" : "var(--bi-neutral-20)");
  return (
    <div style={{ position: "relative", overflow: "hidden", background: "var(--bi-color-neutral-surface)", borderRadius: "var(--bi-radius-xl)", padding: "40px 28px 36px" }}>
      <style>{`
        @keyframes grade-pop { 0% { transform: scale(0.2) rotate(-12deg); opacity: 0; } 60% { transform: scale(1.18) rotate(4deg); opacity: 1; } 100% { transform: scale(1) rotate(0); opacity: 1; } }
        @keyframes grade-bounce { 0%, 100% { transform: translateY(0) scale(1); } 35% { transform: translateY(-20px) scale(1.12); } 55% { transform: translateY(0) scale(0.94); } }
        @keyframes grade-sway { 0%, 100% { transform: rotate(-28deg); } 50% { transform: rotate(28deg); } }
        @keyframes grade-search { 0% { transform: translate(12px, 0); } 25% { transform: translate(0, 12px); } 50% { transform: translate(-12px, 0); } 75% { transform: translate(0, -12px); } 100% { transform: translate(12px, 0); } }
        @keyframes grade-drift { 0%, 100% { transform: translateX(-14px) rotate(-8deg); } 50% { transform: translateX(14px) rotate(8deg); } }
        @keyframes grade-wiggle { 0%, 100% { transform: rotate(-14deg); } 50% { transform: rotate(14deg); } }
        @keyframes grade-spin { 0% { transform: rotate(0deg); } 70%, 100% { transform: rotate(360deg); } }
        @keyframes grade-fall { 0% { transform: translateY(-30px) rotate(0deg); opacity: 0; } 10% { opacity: 1; } 100% { transform: translateY(420px) rotate(540deg); opacity: 0; } }
        @keyframes grade-ring { from { stroke-dashoffset: ${circumference}; } }
        @media (prefers-reduced-motion: reduce) { .grade-anim { animation: none !important; } }
      `}</style>
      {celebrate &&
        confettiPieces.map((piece, index) => (
          <span
            key={index}
            className="grade-anim"
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              left: `${piece.left}%`,
              width: piece.size,
              height: piece.size * 0.6,
              background: piece.color,
              borderRadius: 2,
              transform: `rotate(${piece.rotate}deg)`,
              opacity: 0,
              animation: `grade-fall ${piece.duration}s ${piece.delay}s ease-in infinite`,
              pointerEvents: "none",
            }}
          />
        ))}
      {emojiScatter.map((spot, index) => (
        <div key={index} aria-hidden="true" style={{ position: "absolute", left: `${spot.left}%`, top: `${spot.top}%`, transform: `rotate(${spot.rotate}deg)`, pointerEvents: "none" }}>
          <div className="grade-anim" style={{ fontSize: `${spot.size}rem`, lineHeight: 1, animation: `${grade.motion} ${-spot.delay}s infinite` }}>
            {grade.emoji}
          </div>
        </div>
      ))}
      <div style={{ position: "relative", display: "grid", justifyItems: "center", gap: 14, textAlign: "center" }}>
        <div style={{ color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.9375rem" }}>Ferdig! Her er karakteren din etter {ROUNDS} spørsmål</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 36 }}>
        <div className="grade-anim" style={{ position: "relative", width: 180, height: 180, animation: "grade-pop 0.8s cubic-bezier(0.2, 0.9, 0.3, 1.2) both" }}>
          <svg width="180" height="180" viewBox="0 0 180 180" aria-hidden="true" style={{ position: "absolute", inset: 0 }}>
            <circle cx="90" cy="90" r={radius} fill="var(--bi-basic-white)" stroke="var(--bi-color-neutral-stroke-subtle)" strokeWidth="14" />
            <circle
              className="grade-anim"
              cx="90"
              cy="90"
              r={radius}
              fill="none"
              stroke="var(--bi-primary-50)"
              strokeWidth="14"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - Math.max(0, score) / max)}
              transform="rotate(-90 90 90)"
              style={{ animation: "grade-ring 1.4s 0.3s ease-out both" }}
            />
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", fontFamily: "var(--bi-font-family-brand)", fontSize: "5.5rem", lineHeight: 1, color: "var(--bi-primary-50)" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 0 }}>
              <span>{grade.letter}</span>
              {suffix && <span style={{ fontSize: "0.5em", lineHeight: 1 }}>{suffix}</span>}
            </span>
          </div>
        </div>
        </div>
        <div style={{ fontFamily: "var(--bi-font-family-brand)", fontSize: "1.875rem", color: "var(--bi-color-primary-text)" }}>{grade.title}</div>
        <div style={{ fontSize: "1.125rem", color: "var(--bi-color-neutral-text)" }}>
          <strong>{fmtPoints(score)}</strong> av {fmtPoints(max)} poeng
        </div>
        <p style={{ margin: 0, maxWidth: 520, color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.9375rem" }}>{grade.text}</p>
        <div style={{ display: "grid", gap: 6, justifyItems: "center", marginTop: 6 }}>
          <div style={{ color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.8125rem" }}>Poeng per spørsmål</div>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6 }}>
            {roundPoints.map((points, index) => (
              <span
                key={index}
                title={`Spørsmål ${index + 1}: ${fmtPoints(points)} poeng`}
                style={{ display: "grid", placeItems: "center", minWidth: 34, height: 30, padding: "0 4px", borderRadius: 6, background: chipColor(points), color: points >= 1.5 ? "var(--bi-basic-white)" : "var(--bi-color-neutral-text)", fontWeight: 700, fontSize: "0.9375rem" }}
              >
                {fmtPoints(points)}
              </span>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 12 }}>
          <Button size="large" variant="filled" onClick={onRestart}>
            <RedoIcon aria-hidden="true" />
            Prøv igjen
          </Button>
        </div>
      </div>
    </div>
  );
}

function GradePreview() {
  const [selected, setSelected] = useState(0);
  const samples = [25, 23.5, 22.5, 22, 20, 18, 17.5, 16, 14.5, 14, 12, 10, 9.5, 8, 6, 3];
  const score = samples[selected];
  const halfPoints = score * 2;
  const roundPoints = Array.from({ length: ROUNDS }, (_, index) => (Math.floor(halfPoints / ROUNDS) + (index < halfPoints % ROUNDS ? 1 : 0)) / 2);
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8 }}>
        {samples.map((sample, index) => (
          <Button key={sample} size="small" variant={index === selected ? "filled" : "outlined"} onClick={() => setSelected(index)}>
            {gradeFor(sample).letter}
            {gradeSuffix(sample)} ({fmtPoints(sample)})
          </Button>
        ))}
      </div>
      <GradeScreen key={selected} score={score} roundPoints={roundPoints} onRestart={() => setSelected((selected + 1) % samples.length)} />
    </div>
  );
}

const optionStyle = (state: "idle" | "main" | "extra" | "bad" | "dim", selected: boolean) => {
  const palette =
    state === "main" || state === "extra"
      ? { border: "var(--bi-primary-50)", text: "var(--bi-primary-90)" }
      : state === "bad"
        ? { border: "var(--bi-alert-60)", text: "var(--bi-alert-85)" }
        : null;
  return {
    padding: "6px 14px",
    display: "flex",
    alignItems: "center",
    minHeight: 40,
    borderRadius: "var(--bi-radius-large)",
    border: selected ? `2px solid ${palette?.border ?? "var(--bi-color-primary-stroke-accent)"}` : `1px solid ${palette?.border ?? "var(--bi-color-neutral-stroke)"}`,
    background:
      state === "main" || state === "extra"
        ? "var(--bi-primary-0)"
        : state === "bad"
          ? "var(--bi-alert-0)"
          : "var(--bi-color-neutral-surface-subtle)",
    color: palette?.text ?? (state === "dim" ? "var(--bi-neutral-40)" : "var(--bi-color-neutral-text)"),
    opacity: state === "dim" ? 0.7 : 1,
    cursor: state === "dim" ? "default" : "pointer",
    transition: "background 150ms ease, border-color 150ms ease, color 150ms ease, opacity 150ms ease",
    font: "inherit",
    fontSize: "1.125rem",
    textAlign: "left" as const,
  };
};

const tagStyle = { marginLeft: 12, padding: "2px 8px", border: "1px solid var(--bi-primary-50)", borderRadius: 4, background: "var(--bi-basic-white)", color: "var(--bi-primary-90)", fontSize: "0.8125rem", fontWeight: 500, lineHeight: 1.3 } as const;
const mainTag = (label: string) => <span style={tagStyle}>{label}</span>;

function SearchTest() {
  const [order, setOrder] = useState(() => shuffleIndexes(rows.length));
  const [position, setPosition] = useState(0);
  const [picks, setPicks] = useState<Record<number, { area?: string; sub?: string }>>({});
  const [finished, setFinished] = useState(false);
  const [slide, setSlide] = useState<"idle" | "out-next" | "out-prev" | "in-next" | "in-prev">("idle");
  const normalizeTitle = (text: string) => text.replace(/\u00ad|\(-\)/g, "");

  const rowIndex = order[position];
  const row = rows[rowIndex];
  const title = normalizeTitle(row[2]);
  const sameName = rows.filter((candidate) => normalizeTitle(candidate[2]) === title);
  const entries = [...new Set(sameName.flatMap((candidate) => candidate[6].split("; ")))];
  const mainEntries = new Set(sameName.map((candidate) => candidate[6].split("; ")[0]));
  const previous = [...new Set(sameName.flatMap((candidate) => candidate[4].split("; ").filter((p) => p !== "–")))];
  const pick = picks[rowIndex] ?? {};
  const areaOptions = [...overlapOrder].sort((x, y) => x.localeCompare(y, "nb"));
  const subOptions = pick.area ? [...(beforeAfter.subs.get(pick.area)?.keys() ?? [])].sort((x, y) => x.localeCompare(y, "nb")) : [];
  const kindOf = (entry: string) => (mainEntries.has(entry) ? "main" : entries.includes(entry) ? "extra" : "none");
  const areaKind = (area: string) => (sameName.some((candidate) => candidate[0] === area) ? "main" : entries.some((entry) => entryArea(entry) === area) ? "extra" : "none");

  // Fagområdet gir 1 poeng (1,5 for hovedfagområdet), riktig underkategori gir 1 poeng. Feil valg gir 0 poeng.
  // Et feil fagområde avslutter spørsmålet uten at man må velge underkategori.
  const isAnswered = (index: number, value?: { area?: string; sub?: string }) => {
    if (!value?.area) return false;
    if (value.sub) return true;
    const name = normalizeTitle(rows[index][2]);
    const set = rows.filter((other) => normalizeTitle(other[2]) === name).flatMap((other) => other[6].split("; "));
    return !set.some((entry) => entryArea(entry) === value.area);
  };
  const partsFor = (index: number, value?: { area?: string; sub?: string }) => {
    if (!value || !isAnswered(index, value)) return { area: 0, sub: 0 };
    const name = normalizeTitle(rows[index][2]);
    const same = rows.filter((other) => normalizeTitle(other[2]) === name);
    const set = same.flatMap((other) => other[6].split("; "));
    const key = `${value.area} › ${value.sub}`;
    const areaRight = set.some((entry) => entryArea(entry) === value.area);
    const subRight = set.includes(key);
    const mainArea = same.some((other) => other[0] === value.area);
    return { area: !areaRight ? 0 : mainArea ? 1.5 : 1, sub: subRight ? 1 : 0 };
  };
  const pointsFor = (index: number, value?: { area?: string; sub?: string }): number => {
    const parts = partsFor(index, value);
    return parts.area + parts.sub;
  };
  const rounds = order.slice(0, ROUNDS);
  const roundPoints = rounds.map((index) => pointsFor(index, picks[index]));
  const score = roundPoints.reduce((sum, points) => sum + points, 0);

  const pointDots = (points: number) => {
    if (points === 0) return null;
    const wholeCount = Math.floor(Math.abs(points));
    const hasHalf = Math.abs(points) % 1 !== 0;
    const circle = (index: number, half: boolean) => {
      const size = half ? 16 : 24;
      return (
        <span key={index} className="st-pop" style={{ display: "grid", placeItems: "center", width: size, height: size, borderRadius: "50%", background: points > 0 ? "var(--bi-primary-50)" : "var(--bi-alert-60)", color: "var(--bi-basic-white)", fontSize: half ? 13 : 20, animationDelay: `${index * 60}ms` }}>
          {points > 0 ? <CheckThickIcon aria-hidden="true" /> : <CrossThickIcon aria-hidden="true" />}
        </span>
      );
    };
    return (
      <span aria-label={points > 0 ? `${fmtPoints(points)} poeng` : "Feil, 0 poeng"} style={{ display: "inline-flex", alignItems: "center", gap: 4, marginLeft: "auto", paddingLeft: 12 }}>
        {Array.from({ length: wholeCount }, (_, index) => circle(index, false))}
        {hasHalf && circle(wholeCount, true)}
      </span>
    );
  };
  const navigate = (target: number) => {
    if (slide !== "idle" || target === position || target < 0 || target > ROUNDS - 1) return;
    const forward = target > position;
    setSlide(forward ? "out-next" : "out-prev");
    window.setTimeout(() => {
      setPosition(target);
      setSlide(forward ? "in-next" : "in-prev");
      window.setTimeout(() => setSlide("idle"), 220);
    }, 150);
  };
  const nextRandom = () => navigate(position + 1);
  const restart = () => {
    setOrder(shuffleIndexes(rows.length));
    setPosition(0);
    setPicks({});
    setFinished(false);
  };
  const done = isAnswered(rowIndex, pick);
  const lastRound = position === ROUNDS - 1;
  const answeredCount = rounds.filter((index) => isAnswered(index, picks[index])).length;

  if (finished) return <GradeScreen score={score} roundPoints={roundPoints} onRestart={restart} />;

  return (
    <div style={{ display: "flex", flexDirection: "column", background: "var(--bi-color-neutral-surface)", borderRadius: "var(--bi-radius-xl)", padding: 28, overflow: "clip" }}>
      <style>{`
        @keyframes st-open { from { max-height: 0; opacity: 0; } to { max-height: 1000px; opacity: 1; } }
        @keyframes st-sub-in { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes st-pop { 0% { transform: scale(0); } 70% { transform: scale(1.2); } 100% { transform: scale(1); } }
        @keyframes st-fade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes st-out-next { from { opacity: 1; transform: translateX(0); } to { opacity: 0; transform: translateX(-80px); } }
        @keyframes st-out-prev { from { opacity: 1; transform: translateX(0); } to { opacity: 0; transform: translateX(80px); } }
        @keyframes st-in-next { from { opacity: 0; transform: translateX(80px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes st-in-prev { from { opacity: 0; transform: translateX(-80px); } to { opacity: 1; transform: translateX(0); } }
        .st-out-next { animation: st-out-next 150ms ease-in both; }
        .st-out-prev { animation: st-out-prev 150ms ease-in both; }
        .st-in-next { animation: st-in-next 220ms ease-out both; }
        .st-in-prev { animation: st-in-prev 220ms ease-out both; }
        .st-subs { animation: st-open 260ms ease-out both; }
        .st-sub { animation: st-sub-in 200ms ease-out both; }
        .st-pop { animation: st-pop 260ms cubic-bezier(0.2, 0.9, 0.3, 1.3) both; }
        .st-fade { animation: st-fade 240ms ease-out both; }
        @media (prefers-reduced-motion: reduce) { .st-subs, .st-sub, .st-pop, .st-fade, .st-out-next, .st-out-prev, .st-in-next, .st-in-prev { animation: none; } }
      `}</style>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16, marginBottom: 12 }}>
        <div>
          <div style={{ display: "flex", alignItems: "baseline", color: "var(--bi-neutral-95)", fontSize: "1.5rem", fontWeight: 500 }}>
            <strong style={{ fontSize: "3.5rem", lineHeight: 1, fontWeight: 700, color: "var(--bi-primary-50)" }}>{fmtPoints(score)}</strong>
            <span>/{fmtPoints(answeredCount * POINTS_PER_ROUND)} poeng</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "var(--bi-scale-3x)" }}>
          <span style={{ color: "var(--bi-color-neutral-text-secondary)", fontSize: "1.25rem" }}>
            Spørsmål {position + 1} / {ROUNDS}
          </span>
          <Button icon size="large" variant="outlined" aria-label="Forrige spørsmål" disabled={position === 0} onClick={() => navigate(position - 1)} style={roundButtonStyle(position === 0)}>
            <ChevronLeftIcon aria-hidden="true" />
          </Button>
          <Button
            icon
            size="large"
            variant="outlined"
            aria-label={lastRound ? "Se karakteren din" : "Neste spørsmål"}
            disabled={!done}
            onClick={lastRound ? () => setFinished(true) : nextRandom}
            style={roundButtonStyle(!done)}
          >
            <ChevronRightIcon aria-hidden="true" />
          </Button>
        </div>
      </div>
      <div style={{ display: "grid", gap: 6, marginBottom: 20 }}>
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={ROUNDS * POINTS_PER_ROUND}
          aria-valuenow={Math.max(0, score)}
          aria-label={`${fmtPoints(score)} poeng av ${fmtPoints(answeredCount * POINTS_PER_ROUND)} mulige så langt, maks ${fmtPoints(ROUNDS * POINTS_PER_ROUND)}`}
          style={{ position: "relative", height: 12, borderRadius: 6, background: "var(--bi-color-neutral-stroke-subtle)", overflow: "hidden" }}
        >
          <div style={{ position: "absolute", inset: 0, width: `${((answeredCount * POINTS_PER_ROUND) / (ROUNDS * POINTS_PER_ROUND)) * 100}%`, borderRadius: 6, background: "var(--bi-primary-10)", transition: "width 200ms ease" }} />
          <div style={{ position: "absolute", inset: 0, width: `${(Math.max(0, score) / (ROUNDS * POINTS_PER_ROUND)) * 100}%`, borderRadius: 6, background: "var(--bi-primary-50)", transition: "width 200ms ease" }} />
        </div>
      </div>
      <div className={slide === "idle" ? undefined : `st-${slide}`} style={{ pointerEvents: slide === "idle" ? undefined : "none" }}>
      <div style={{ fontWeight: 700, fontSize: "1.375rem", marginBottom: 16 }}>Hvor finner du «{title}»?</div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 32, alignItems: "start", marginBottom: 16 }}>
        <div>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>Velg fagområde og underkategori</div>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: 4 }}>
            {areaOptions.map((area) => {
              const chosen = pick.area === area;
              const kind = areaKind(area);
              const kindState = kind === "main" ? "main" : kind === "extra" ? "extra" : "bad";
              const state = chosen ? kindState : done ? (kind === "none" ? "dim" : kindState) : pick.area ? "dim" : "idle";
              const expanded = chosen && kind !== "none";
              return (
                <div key={area} style={{ display: "grid", gap: 6, margin: expanded ? "10px 0 16px" : undefined }}>
                  <button
                    type="button"
                    disabled={Boolean(pick.area)}
                    aria-expanded={chosen}
                    onClick={() => setPicks((current) => ({ ...current, [rowIndex]: { area } }))}
                    style={{ ...optionStyle(state, chosen), fontSize: "1rem" }}
                  >
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                      <AreaIcon area={area} height="0.95em" />
                      <span style={{ display: "inline-flex", alignItems: "center" }}>
                        {area}
                        {state === "main" && mainTag("Hovedfagområde")}
                      </span>
                    </span>
                    {chosen && pointDots(kind === "none" ? -1 : kind === "main" ? 1.5 : 1)}
                    <span style={{ marginLeft: chosen ? 12 : "auto", display: "flex", transform: expanded ? "rotate(90deg)" : undefined, transition: "transform 100ms ease" }}>
                      <ChevronRightIcon aria-hidden="true" />
                    </span>
                  </button>
                  {expanded && (
                    <div className="st-subs" style={{ display: "grid", gap: 4, marginLeft: 20, marginTop: -6, paddingTop: 6, overflow: "hidden" }}>
                      {subOptions.map((sub, subIndex) => {
                        const subChosen = pick.sub === sub;
                        const subKind = kindOf(`${area} › ${sub}`);
                        const subKindState = subKind === "main" ? "main" : subKind === "extra" ? "extra" : "bad";
                        const subState = subChosen ? subKindState : done ? (subKind === "none" ? "dim" : subKindState) : "idle";
                        const treeLine = "2px solid var(--bi-color-neutral-stroke)";
                        return (
                          <div key={sub} className="st-sub" style={{ position: "relative", paddingLeft: 20, animationDelay: `${subIndex * 25}ms` }}>
                            {subIndex < subOptions.length - 1 ? (
                              <>
                                <span aria-hidden style={{ position: "absolute", left: 0, top: -4, bottom: 0, borderLeft: treeLine }} />
                                <span aria-hidden style={{ position: "absolute", left: 0, top: "calc(50% - 1px)", width: 20, borderTop: treeLine }} />
                              </>
                            ) : (
                              <span aria-hidden style={{ position: "absolute", left: 0, top: -4, width: 20, height: "calc(50% + 4px)", borderLeft: treeLine, borderBottom: treeLine, borderBottomLeftRadius: 8, boxSizing: "border-box" }} />
                            )}
                            <button
                              type="button"
                              disabled={done}
                              onClick={() => setPicks((current) => ({ ...current, [rowIndex]: { ...current[rowIndex], sub } }))}
                              style={{ ...optionStyle(subState, subChosen), fontSize: "0.9375rem", width: "100%", boxSizing: "border-box" }}
                            >
                              <span style={{ display: "inline-flex", alignItems: "center" }}>{sub}</span>
                              {subChosen && pointDots(subKind === "none" ? -1 : 1)}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div>
          {done ? (
            <div className="st-fade" style={{ display: "grid", gap: 16 }}>
              <Button size="large" variant="filled" style={{ width: "100%" }} onClick={lastRound ? () => setFinished(true) : nextRandom}>
                {lastRound ? "Se karakteren din" : "Neste spørsmål"}
              </Button>
              <div style={{ display: "grid", gap: 8, marginTop: 20 }}>
                <div style={{ fontWeight: 700, fontSize: "1.25rem", color: "var(--bi-color-neutral-text)" }}>Kontekst</div>
              <div style={{ display: "grid", gap: 20, padding: 20, background: "var(--bi-basic-white)", border: "1px solid var(--bi-color-neutral-stroke-subtle)", borderRadius: "var(--bi-radius-large)" }}>
                <div>
                  <div style={{ fontWeight: 700, color: "var(--bi-color-neutral-text-secondary)", marginBottom: 8 }}>BI.no i dag</div>
                  {previous.length === 0 ? (
                    <p style={{ margin: 0, color: "var(--bi-color-neutral-text)" }}>Har ikke et fagområde</p>
                  ) : (
                    <>
                      <div style={{ display: "grid", gap: 4, marginBottom: 8 }}>
                        {previous.map((name) => {
                          const removed = oldAreaCatalog[name]?.kind === "removed";
                          return (
                            <div key={name} style={{ ...optionStyle("idle", false), fontSize: "1rem", cursor: "default", textDecoration: removed ? "line-through" : undefined }}>
                              {shortOldName(name)}
                            </div>
                          );
                        })}
                      </div>
                      <p style={{ margin: 0, color: "var(--bi-color-neutral-text)", fontSize: "0.875rem" }}>
                        {previous.length === 1 ? "Lå i ett fagområde, uten underkategori." : `Lå i ${previous.length} fagområder uten prioritet og uten underkategori.`}
                      </p>
                    </>
                  )}
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: "var(--bi-color-primary-text-accent)", marginBottom: 8 }}>Nytt forslag</div>
                  <div style={{ display: "grid", gap: 14 }}>
                    {row[6].split("; ").map((entry, index) => {
                      const placementState = index === 0 ? "main" : "extra";
                      return (
                        <div key={entry} style={{ display: "grid", gap: 4 }}>
                          <div style={{ ...optionStyle(placementState, false), fontSize: "1rem", cursor: "default" }}>
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                              <AreaIcon area={entryArea(entry)} height="0.95em" />
                              {entryArea(entry)}
                              {index === 0 && mainTag("Hovedfagområde")}
                            </span>
                          </div>
                          <div style={{ position: "relative", marginLeft: 20, paddingLeft: 20 }}>
                            <span aria-hidden style={{ position: "absolute", left: 0, top: -4, width: 20, height: "calc(50% + 4px)", borderLeft: "2px solid var(--bi-color-neutral-stroke)", borderBottom: "2px solid var(--bi-color-neutral-stroke)", borderBottomLeftRadius: 8, boxSizing: "border-box" }} />
                            <div style={{ ...optionStyle(placementState, false), fontSize: "0.9375rem", cursor: "default" }}>{entrySub(entry)}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                {row[9] !== "–" && (
                  <div>
                    <div style={{ fontWeight: 700, color: "var(--bi-color-neutral-text-secondary)", marginBottom: 8 }}>Bransje</div>
                    <div style={{ ...optionStyle("idle", false), fontSize: "1rem", cursor: "default" }}>{row[9]}</div>
                  </div>
                )}
                <div style={{ background: "var(--bi-color-primary-background)", borderRadius: "var(--bi-radius-large)", padding: 12, fontSize: "0.875rem", color: "var(--bi-color-neutral-text)", display: "grid", gap: 10 }}>
                  <div style={{ fontWeight: 700 }}>Hvorfor ligger det her?</div>
                  {row[6].split("; ").map((entry, index) => {
                    const reason = migratedReasons[`${row[2]}|${entry}`];
                    if (!reason) return null;
                    return (
                      <div key={entry} style={{ display: "grid", gap: 3, paddingTop: index === 0 ? 0 : 8, borderTop: index === 0 ? undefined : "1px solid var(--bi-color-neutral-stroke-subtle)" }}>
                        <div style={{ fontWeight: 600 }}>
                          {entryArea(entry)} › {entrySub(entry)}
                          <span style={{ marginLeft: 8, fontWeight: 400, color: "var(--bi-color-neutral-text-secondary)" }}>{index === 0 ? "Hovedfagområde" : "Ekstra fagområde"}</span>
                        </div>
                        <p style={{ margin: 0 }}>{reason}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              </div>
            </div>
          ) : (
            <div style={{ color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.9375rem", paddingTop: 4 }}>
              Trykk på et fagområde, så faller underkategoriene ut under det. Når du har valgt underkategori, vises forklaringen her.
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}

function Feedback() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 24,
        padding: 24,
        background: "var(--bi-color-neutral-surface)",
        borderRadius: "var(--bi-radius-xl)",
        textAlign: "left",
      }}
    >
      <p style={{ margin: 0, flex: "1 1 360px", color: "var(--bi-color-neutral-text)", fontSize: "1.125rem" }}>
        Noen studier eller kurs du tenker er plassert feil eller som trenger et ekstra fagområde?
        <br />
        Gi beskjed til Stian Bordewick (
        <Link data-color="neutral" href="mailto:stian.a.bordewick@bi.no">
          stian.a.bordewick@bi.no
        </Link>
        ) på enten Teams, Slack eller på e-post.
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 28, flex: "0 0 auto" }}>
        {(["teams.webp", "slack.png", "outlook.png"] as const).map((file) => (
          <img key={file} src={`${import.meta.env.BASE_URL}logos/${file}`} alt={file.split(".")[0]} height={40} style={{ display: "block", height: 40, width: "auto" }} />
        ))}
      </div>
    </div>
  );
}

/** Ekstra plassholdere i «Før»-listen, slik at den blir like lang som «Nå»-listen med overskriftene og mellomrommene mellom gruppene. */
const fillerSeeds = (groupCount: number, real = false) => Array.from({ length: Math.round(groupCount * (real ? 2.1 : 2.7)) }, (_, index) => `ekstra-${index}`);

/** Plassholder som ligner innlastingsskjelettene på nettsider. Navnene på studiene og kursene er ikke viktige, bare at de sorteres i grupper. */
function SkeletonLine({ seed, muted = false }: { seed: string; muted?: boolean }) {
  const hash = [...seed].reduce((sum, character) => (sum * 31 + character.charCodeAt(0)) % 997, 7);
  return <div aria-hidden="true" className="skeleton-line" style={{ width: `${45 + (hash % 46)}%`, opacity: muted ? 0.5 : 1 }} />;
}

/** Begrunnelsene fra fagområdequizen. Boksen er like høy som resten av tabellraden og toner ut nederst til «Vis mer» åpner den. */
function PlacementReasons({ row }: { row: Row }) {
  const [mode, setMode] = useState<"collapsed" | "expanding" | "expanded" | "collapsing">("collapsed");
  const [spacerHeight, setSpacerHeight] = useState<number | undefined>(undefined);
  const [canExpand, setCanExpand] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const collapsedHeight = useRef(0);
  const items = row[6]
    .split("; ")
    .map((entry, index) => ({ entry, index, reason: migratedReasons[`${row[2]}|${entry}`] }))
    .filter((item): item is { entry: string; index: number; reason: string } => Boolean(item.reason));
  const padding = 10;
  const buttonSpace = 28;
  const open = mode === "expanding" || mode === "expanded";

  useEffect(() => {
    if (mode !== "collapsed") return;
    const box = boxRef.current;
    const content = contentRef.current;
    if (!box || !content) return;
    const measure = () => setCanExpand(content.offsetHeight > box.clientHeight - padding * 2);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(box);
    observer.observe(content);
    return () => observer.disconnect();
  }, [mode]);

  // Høyden animeres mellom radhøyden (lukket) og innholdets høyde (åpen). Etter animasjonen går boksen tilbake til auto eller til å ligge over cellen.
  const finish = () => {
    setMode((current) => (current === "expanding" ? "expanded" : current === "collapsing" ? "collapsed" : current));
    setSpacerHeight((current) => (mode === "collapsing" ? undefined : current));
  };
  const toggle = () => {
    const box = boxRef.current;
    const content = contentRef.current;
    if (!box || !content) return;
    const start = box.offsetHeight;
    const nextFrame = (callback: () => void) => requestAnimationFrame(() => requestAnimationFrame(callback));
    setSpacerHeight(start);
    if (!open) {
      collapsedHeight.current = start;
      setMode("expanding");
      nextFrame(() => setSpacerHeight(content.offsetHeight + padding * 2 + buttonSpace));
    } else {
      setMode("collapsing");
      nextFrame(() => setSpacerHeight(collapsedHeight.current));
    }
    window.setTimeout(() => {
      setMode((current) => (current === "expanding" ? "expanded" : current === "collapsing" ? "collapsed" : current));
      setSpacerHeight((current) => (open ? undefined : current));
    }, 450);
  };

  if (items.length === 0) return <div style={{ color: "var(--bi-color-neutral-text-secondary)" }}>{row[7]}</div>;
  const collapsed = mode === "collapsed";
  return (
    <>
      {/* Boksen ligger alltid over cellen, så bredden er den samme hele tiden. Det er avstandsstykket som vokser og skyver raden ned. */}
      <div aria-hidden="true" className="reason-spacer" onTransitionEnd={(event) => event.propertyName === "height" && finish()} style={{ minHeight: 76, minWidth: 320, height: spacerHeight }} />
      <div
        ref={boxRef}
        style={{
          background: "var(--bi-color-primary-background)",
          borderRadius: "var(--bi-radius-large)",
          padding,
          color: "var(--bi-color-neutral-text)",
          overflow: "hidden",
          boxSizing: "border-box",
          position: "absolute",
          inset: "8px 12px",
        }}
      >
        <div ref={contentRef} style={{ display: "grid", gap: 8 }}>
          {items.map(({ entry, index, reason }) => (
            <div key={entry} style={{ display: "grid", gap: 2, paddingTop: index === 0 ? 0 : 8, borderTop: index === 0 ? undefined : "1px solid var(--bi-color-neutral-stroke-subtle)" }}>
              <div style={{ fontWeight: 600 }}>
                {entry}
                <span style={{ marginLeft: 6, fontWeight: 400, color: "var(--bi-color-neutral-text-secondary)" }}>{index === 0 ? "Hovedfagområde" : "Ekstra fagområde"}</span>
              </div>
              <p style={{ margin: 0 }}>{reason}</p>
            </div>
          ))}
        </div>
        {canExpand && (
          <div aria-hidden="true" style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 72, background: "linear-gradient(to bottom, transparent, var(--bi-color-primary-background) 75%)", pointerEvents: "none", opacity: collapsed ? 1 : 0, transition: "opacity 0.25s ease" }} />
        )}
        {canExpand && (
          <div style={{ position: "absolute", left: padding, bottom: 6 }}>
            <Button className="reason-toggle" size="small" variant="text" aria-expanded={open} onClick={toggle} style={{ fontSize: "0.8125rem", minHeight: 0 }}>
              {open ? "Vis mindre" : "Vis mer"}
              <ChevronDownIcon aria-hidden="true" style={{ width: "1.5em", height: "1.5em", transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s ease" }} />
            </Button>
          </div>
        )}
        {!collapsed && <div aria-hidden="true" style={{ height: buttonSpace }} />}
      </div>
    </>
  );
}

export default function Result() {
  const [query, setQuery] = useState("");
  const [showGrades, setShowGrades] = useState(false);
  const [areaFilter, setAreaFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const [previousFilter, setPreviousFilter] = useState("");
  const [subcategoryFilter, setSubcategoryFilter] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");
  const areas = [...new Set(rows.map(([area]) => area))].sort((a, b) => a.localeCompare(b, "nb"));
  const normalize = (text: string) => text.replace(/\u00ad|\(-\)/g, "").toLowerCase();
  const levelOrder = ["Bachelor", "Master", "Bachelorkurs", "Masterkurs"];
  const levels = [...new Set(rows.map((row) => row[3]))].sort((a, b) => {
    const ia = levelOrder.indexOf(a);
    const ib = levelOrder.indexOf(b);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib) || a.localeCompare(b, "nb");
  });
  const matchesQuery = (row: Row) =>
    normalize(row[2]).includes(normalize(query.trim())) &&
    (!areaFilter || row[0] === areaFilter) &&
    (!statusFilter || row[1].includes(statusFilter as Status)) &&
    (!levelFilter || row[3] === levelFilter) &&
    (!previousFilter || row[4].split("; ").includes(previousFilter)) &&
    (!subcategoryFilter || row[6].split("; ").includes(subcategoryFilter)) &&
    (!industryFilter || row[9] === industryFilter);
  const activeFilterCount = [areaFilter, statusFilter, levelFilter, previousFilter, subcategoryFilter, industryFilter].filter(Boolean).length;
  const industries = [...new Set(rows.map((row) => row[9]).filter((industry) => industry !== "–"))].sort((a, b) => a.localeCompare(b, "nb"));
  const subcategoryGroups = areas.map((area) => ({
    area,
    subcategories: [
      ...new Set(
        rows.flatMap((row) => row[6].split("; ").filter((entry) => entry.startsWith(`${area} › `))),
      ),
    ].sort((a, b) => a.localeCompare(b, "nb")),
  }));
  const previousAreas = [...new Set(rows.flatMap((row) => row[4].split("; ")))].sort((a, b) => {
    if (a === "–") return 1;
    if (b === "–") return -1;
    return a.localeCompare(b, "nb");
  });
  const filtersActive = Boolean(query.trim() || activeFilterCount);
  const matchCount = rows.filter(matchesQuery).length;

  return (
    <div style={{ padding: 24, maxWidth: 1600, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 24 }}>
      <SummaryToc />
      <div style={{ flex: 1, minWidth: 0 }}>
      <section>
        <h2 id="soketest" style={{ scrollMarginTop: 16, margin: "0 0 12px", fontFamily: "var(--bi-font-family-brand)", fontSize: "2rem", lineHeight: 1.2, color: "var(--bi-color-primary-text)" }}>Fagområdequiz</h2>
        <SearchTest />
        <style>{`
          .bi-button.grade-toggle { --bic-button-size: 0; --bic-button-padding-block: 0.125rem; --bic-button-padding-inline: 0.75rem; }
          .grade-toggle[aria-expanded="true"]:not(:focus-visible) { box-shadow: none; }
        `}</style>
        <div style={{ display: "flex", justifyContent: "center", margin: "12px 0 0" }}>
          <Button className="grade-toggle" size="medium" variant="text" aria-expanded={showGrades} aria-controls="grade-preview" onClick={() => setShowGrades((value) => !value)}>
            {showGrades ? "Skjul" : "Vis"} oversikt over karakterer
            <ChevronDownIcon
              aria-hidden="true"
              style={{ width: "var(--bi-icon-large)", height: "var(--bi-icon-large)", transform: showGrades ? "rotate(180deg)" : "none", transition: "transform 0.2s ease" }}
            />
          </Button>
        </div>
        <div
          id="grade-preview"
          inert={!showGrades}
          style={{
            display: "grid",
            gridTemplateRows: showGrades ? "1fr" : "0fr",
            opacity: showGrades ? 1 : 0,
            transition: "grid-template-rows 0.35s ease, opacity 0.25s ease",
          }}
        >
          <div style={{ minHeight: 0, overflow: "hidden" }}>
            <div style={{ paddingTop: 12 }}>
              <GradePreview />
            </div>
          </div>
        </div>
      </section>

      <section style={{ margin: "48px 0 0" }}>
        <h2 id="tilbakemelding" style={{ scrollMarginTop: 16, margin: "0 0 12px", fontFamily: "var(--bi-font-family-brand)", fontSize: "2rem", lineHeight: 1.2, color: "var(--bi-color-primary-text)" }}>Tilbakemelding</h2>
        <Feedback />
      </section>

      <section style={{ margin: "48px 0 0" }}>
        <h2 style={{ margin: "0 0 8px", fontFamily: "var(--bi-font-family-brand)", fontSize: "2rem", lineHeight: 1.2, color: "var(--bi-color-primary-text)" }}>Forklaring</h2>

        <div style={summaryBox}>
        <Carousel
          heading={<h3 id="hva-gjores" style={{ ...summaryPartHeading, margin: 0 }}>Hva gjøres?</h3>}
          slides={[
            {
              title: "Nye fagområder i fem steg",
              content: <StepsSlide />,
            },
            {
              title: "Fagområder med nytt navn",
              content: (
        <ChangeGroup>
          <ChangeRow
            from="Finans, økonomi og styring"
            fromKind="old"
            to={[{ label: "Finans, økonomi og regnskap", count: areaCount("Finans, økonomi og regnskap") }]}
            note={whyRenamed("Finans, økonomi og styring")}
          />
          <ChangeRow
            from="Digitalisering og Analytics"
            fromKind="old"
            to={[{ label: "KI, digitalisering og analytics", count: areaCount("KI, digitalisering og analytics") }]}
            note={whyRenamed("Digitalisering og Analytics")}
          />
          <ChangeRow
            from={"Organisasjonsutvikling og\nHuman Resource Management"}
            fromKind="old"
            to={[{ label: "HR og organisasjonsutvikling", count: areaCount("HR og organisasjonsutvikling") }]}
            note={whyRenamed("Organisasjonsutvikling og Human Resource Management")}
          />
          <ChangeRow
            from="Eiendom, varehandel og forretningsjus"
            fromKind="old"
            to={[{ label: "Juss, skatt og eiendom", count: areaCount("Juss, skatt og eiendom") }]}
            note={whyRenamed("Eiendom, varehandel og forretningsjus")}
          />
          <ChangeRow
            from="Ledelse"
            fromKind="old"
            to={[{ label: "Ledelse og strategi", count: areaCount("Ledelse og strategi") }]}
            note={whyRenamed("Ledelse")}
          />
          <ChangeRow
            from="Strategi, innovasjon og bærekraft"
            fromKind="old"
            to={[{ label: "Innovasjon, bærekraft og logistikk", count: areaCount("Innovasjon, bærekraft og logistikk") }]}
            note={whyRenamed("Strategi, innovasjon og bærekraft")}
          />
          <ChangeRow
            from="Markedsføring, kommunikasjon og kultur"
            fromKind="same"
            equal
            to={[{ label: "Markedsføring, kommunikasjon og kultur", count: areaCount("Markedsføring, kommunikasjon og kultur") }]}
            toKind="same"
          />
        </ChangeGroup>
              ),
            },
            {
              title: "Fjernede fagområder",
              content: (
        <ChangeGroup>
          <SplitRow
            from={[{ label: "Offentlig sektor", kind: "removed" }]}
            color="#e41100"
            to={[
              {
                label: "Helse, skole og barnehage",
                count: areaCount("Helse, skole og barnehage"),
                note: `Offentlig sektor er ikke et fag, og de ${wasIn("Offentlig sektor")} studiene og kursene handlet om svært ulike temaer. De er nå fordelt etter faget de handler om. ${originNote("Helse, skole og barnehage")} Helse, skole og barnehage er egne og vanlige fagfelt som nå er synlige i navnet. «Juss for ledere» ligger her, med Juss, skatt og eiendom og Ledelse og strategi som ekstra.`,
              },
              {
                label: "Sikkerhet og beredskap",
                count: areaCount("Sikkerhet og beredskap"),
                note: `${originNote("Sikkerhet og beredskap")} Sikkerhet og beredskap er et eget og vanlig fagfelt som før var skjult inne i Offentlig sektor.`,
              },
              {
                label: "Juss, skatt og eiendom",
                count: areaCount("Juss, skatt og eiendom"),
                note: `${originNote("Juss, skatt og eiendom")} Skatt- og avgiftskursene ligger her, der skatt er et stort og vanlig søkeord som nå er synlig i navnet.`,
              },
            ]}
          />
          <ChangeRow
            from="Prosjektledelse"
            fromKind="removed"
            arrowColor="#e41100"
            to={[{ label: "Ledelse og strategi › Prosjektledelse (underkategori)" }]}
            note={`Prosjektledelse hadde bare ${wasIn("Prosjektledelse")} studier og kurs, for lite til å være et eget fagområde. Prosjektledelse er en del av ledelse og overlapper mye med det, så det er nå en underkategori i Ledelse og strategi. Der finner de som søker på ledelse det lettere, og ${placedInSub("Ledelse og strategi", "Prosjektledelse")} studier og kurs har underkategorien.`}
          />
          <ChangeRow
            from="Internasjonal Business"
            fromKind="removed"
            arrowColor="#e41100"
            to={[
              { label: "Markedsføring, kommunikasjon og kultur › Kultur og internasjonal business" },
              { label: "Ledelse og strategi" },
              { label: "Finans, økonomi og regnskap" },
            ]}
            note={`De ${wasIn("Internasjonal Business")} studiene og kursene er fordelt på tre fagområder etter faget de handler om. Internasjonal profil er en egenskap ved studiet og ikke et fagområde, og var for lite til å være et eget fagområde. Kultur og internasjonal business er nå en underkategori i Markedsføring, kommunikasjon og kultur, med ${placedInSub("Markedsføring, kommunikasjon og kultur", "Kultur og internasjonal business")} studier og kurs.`}
          />
        </ChangeGroup>
              ),
            },
            {
              title: "Underkategorier og begrunnelse",
              content: (
                <div style={{ display: "grid", gap: 40 }}>
                  {areaTree.map(({ area }) => (
                    <AreaSubcategorySlide key={area} area={area} />
                  ))}
                </div>
              ),
            },
            {
              title: "Tverrgående studier og kurs har egne underkategorier",
              content: <CrossCuttingSlide />,
            },
            {
              title: "Status",
              content: (
        <StatusOverview rows={summaryRows} />
              ),
            },
            {
              title: "Engelske navn",
              content: (
        <>
                <p style={{ margin: "0 0 12px", color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.9375rem" }}>
          Forslag til engelske navn, basert på begreper som allerede brukes i titlene på studiene og kurs.
        </p>
        <table style={{ width: "100%", maxWidth: 720, borderCollapse: "collapse", background: "var(--bi-basic-white)", border: "1px solid var(--bi-color-neutral-stroke-subtle)", fontSize: "0.9375rem" }}>
          <tbody>
            {englishNames.map(({ area, subcategories }) => (
              <Fragment key={area.no}>
                <tr style={{ background: "var(--bi-primary-5)", color: "var(--bi-color-primary-text-accent)", fontWeight: 700 }}>
                  <td style={{ padding: "5px 12px", width: "50%" }}>{area.no}</td>
                  <td style={{ padding: "5px 12px" }}>{area.en}</td>
                </tr>
                {subcategories.map((sub) => (
                  <tr key={sub.no} style={{ borderTop: "1px solid var(--bi-color-neutral-stroke-subtle)" }}>
                    <td style={{ padding: "3px 12px", color: "var(--bi-color-neutral-text-secondary)" }}>{sub.no}</td>
                    <td style={{ padding: "3px 12px" }}>{sub.en}</td>
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>
        </table>
        </>
              ),
            },
          ]}
        />
        </div>

        <div style={summaryBox}>
        <WhyBetter />
        </div>

        <div style={summaryBox}>
        <Carousel
          heading={<h3 id="oversikt-endringer" style={{ ...summaryPartHeading, margin: 0 }}>Hvordan ser dette ut?</h3>}
          slides={[
            {
              title: "Migrering av fagområder",
              content: <BeforeAfterSankey />,
            },
            {
              title: "Migrering til underkategorier",
              content: <SubcategoryMigrationSankey />,
            },
            {
              title: "Før og nå",
              content: (
        <BeforeAfterOverview />
              ),
            },
            {
              title: "Fagområder og underkategorier",
              content: (
        <>
        <p style={{ margin: "0 0 12px", color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.9375rem" }}>
          {summaryRows.length} studier og kurs fordelt på {areaTree.length} fagområder og {subcategoryCount} underkategorier. Tallene viser
          hvor mange studier og kurs som har fagområdet eller underkategorien som hovedplassering, og hvor mange som har det som ekstra.
        </p>
        <div style={{ display: "flex", gap: 16, margin: "0 0 16px", color: "var(--bi-color-neutral-text)", fontSize: "0.8125rem" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
            <span style={{ width: 9, height: 9, borderRadius: 2, background: treeColors.mainArea }} />
            Hovedfagområde
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
            <span style={{ width: 9, height: 9, borderRadius: 2, background: treeColors.extraArea }} />
            Ekstra fagområde
          </span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", columnGap: 64, alignItems: "start" }}>
          {treeColumns.map((column, columnIndex) => (
            <div key={columnIndex}>
          {column.map(({ area, main, extra, subs }) => (
            <div key={area} style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <strong style={{ flex: "0 0 320px", color: "var(--bi-color-primary-text-accent)", whiteSpace: "nowrap" }}>{area}</strong>
                <TreeNumbers main={main} extra={extra} bold />
                <TreeBar main={main} extra={extra} height={14} mainColor={treeColors.mainArea} extraColor={treeColors.extraArea} />
              </div>
              <div style={{ margin: "4px 0 0 10px" }}>
                {subs.map(([name, { main: subMain, extra: subExtra }], index) => (
                  <div
                    key={name}
                    style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      paddingTop: 4,
                      paddingBottom: 4,
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        bottom: index === subs.length - 1 ? "50%" : 0,
                        width: 2,
                        background: treeLine,
                      }}
                    />
                    <span
                      style={{
                        flex: "0 0 18px",
                        height: 2,
                        background: treeLine,
                        marginTop: 0,
                      }}
                    />
                    <span style={{ flex: "0 0 280px" }}>{name}</span>
                    <TreeNumbers main={subMain} extra={subExtra} />
                    <TreeBar main={subMain} extra={subExtra} height={8} mainColor={treeColors.mainSub} extraColor={treeColors.extraSub} />
                  </div>
                ))}
              </div>
            </div>
          ))}
            </div>
          ))}
        </div>

        </>
              ),
            },
            {
              title: "Størrelse og fordeling per fagområde",
              content: <AreaSizeBars />,
            },
            {
              title: "Hoved og ekstra per fagområde",
              content: <AreaMainExtraBars />,
            },
            {
              title: "Overlapp og koblinger",
              content: (
        <OverlapSection />
              ),
            },
            {
              title: "Fordeling per nivå",
              content: (
        <>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "24px 64px" }}>
          {levelTrees.map(({ key, label, list, count, tree }) => {
            const split = levelSplits[key];
            const largestShare = Math.max(...tree.map(({ main }) => main / count));
            return (
              <div key={key}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 8, whiteSpace: "nowrap" }}>
                  <span style={{ fontWeight: 700, color: "var(--bi-color-primary-text-accent)" }}>
                    {label} ({count})
                  </span>
                  {split?.map(({ key: splitKey, label: levelLabel, color }) => (
                      <span key={splitKey} style={{ display: "inline-flex", alignItems: "center", gap: 4, color: "var(--bi-color-neutral-text)", fontSize: "0.8125rem" }}>
                        <span style={{ width: 9, height: 9, borderRadius: 2, background: color, boxShadow: hairline(color) }} />
                        {levelLabel}
                      </span>
                    ))}
                </div>
                {[...tree]
                  .sort((x, y) => y.main - x.main || x.area.localeCompare(y.area, "nb"))
                  .map(({ area, main }) => (
                    <div key={area} style={{ display: "flex", alignItems: "center", gap: 12, padding: "3px 0" }}>
                      <span style={{ flex: "0 0 290px", whiteSpace: "nowrap" }}>{area}</span>
                      <span style={{ flex: "0 0 84px", whiteSpace: "nowrap", textAlign: "right" }}>
                        {main} <span style={{ color: "var(--bi-color-neutral-text-secondary)" }}>({Math.round((main / count) * 100)} %)</span>
                      </span>
                      <div style={{ flex: 1, display: "flex" }}>
                        {(split
                          ? split.map(({ match, color }) => ({
                              color,
                              value: list.filter((row) => row[0] === area && match(row)).length,
                            }))
                          : [{ color: treeColors.mainArea, value: main }]
                        )
                          .filter(({ value }) => value > 0)
                          .map(({ color, value }, index, segments) => (
                            <div
                              key={color}
                              style={{
                                width: `${(value / count / largestShare) * 100}%`,
                                minWidth: 4,
                                height: 14,
                                background: color,
                                boxShadow: hairline(color),
                                borderRight: index < segments.length - 1 ? "2px solid var(--bi-basic-white)" : undefined,
                                boxSizing: "border-box",
                                borderRadius: `${index === 0 ? 7 : 0}px ${index === segments.length - 1 ? 7 : 0}px ${
                                  index === segments.length - 1 ? 7 : 0
                                }px ${index === 0 ? 7 : 0}px`,
                              }}
                            />
                          ))}
                      </div>
                    </div>
                  ))}
              </div>
            );
          })}
        </div>

        </>
              ),
            },
            {
              title: "Studier og kurs per bransje",
              content: (
        <>
        <p style={{ margin: "0 0 12px", color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.9375rem" }}>
          Studier og kurs som retter seg mot en bestemt bransje. Bransjen er avledet av nettadressen (bransjeprogram og målgruppeprogram
          på bi.no), tittelen og beskrivelsen, ikke fra et eget bransjefelt hos BI. Studier uten tydelig bransje er ikke med.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 24 }}>
          {industryGroups.map(({ industry, list }) => {
            const byArea = [...new Set(list.map((row) => row[0]))]
              .map((area) => ({ area, rows: list.filter((row) => row[0] === area).sort((a, b) => a[2].localeCompare(b[2], "nb")) }))
              .sort((a, b) => b.rows.length - a.rows.length || a.area.localeCompare(b.area, "nb"));
            return (
              <div key={industry} style={{ background: "var(--bi-basic-white)", border: "1px solid var(--bi-color-neutral-stroke-subtle)", borderRadius: 8, padding: 20 }}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, marginBottom: 12 }}>
                  <strong style={{ fontSize: "1.125rem", color: "var(--bi-color-primary-text-accent)" }}>{industry}</strong>
                  <span style={{ color: "var(--bi-color-neutral-text-secondary)" }}>{list.length} studier og kurs</span>
                </div>
                <div style={{ display: "flex", height: 14, borderRadius: 7, overflow: "hidden", marginBottom: 16, background: "var(--bi-color-neutral-stroke-subtle)" }}>
                  {byArea.map(({ area, rows: areaList }, index) => (
                    <div
                      key={area}
                      title={`${area}: ${areaList.length}`}
                      style={{ flex: areaList.length, background: areaColor(area), boxShadow: hairline(areaColor(area)), borderRight: index < byArea.length - 1 ? "2px solid var(--bi-basic-white)" : undefined }}
                    />
                  ))}
                </div>
                <div style={{ display: "grid", gap: 14 }}>
                  {byArea.map(({ area, rows: areaList }) => (
                    <div key={area} style={{ borderLeft: `4px solid ${areaColor(area)}`, paddingLeft: 12 }}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 6 }}>
                        <strong>{area}</strong>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
                          <span style={{ width: 9, height: 9, borderRadius: 2, background: areaColor(area), boxShadow: hairline(areaColor(area)) }} />
                          <strong>{areaList.length}</strong>
                        </span>
                      </div>
                      <ul style={{ margin: 0, paddingLeft: 18, color: "var(--bi-color-neutral-text)" }}>
                        {areaList.map((row) => (
                          <li key={`${row[2]}-${row[3]}`}>
                            {row[2]} <span style={{ color: "var(--bi-color-neutral-text-secondary)" }}>({row[3]})</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        </>
              ),
            },
          ]}
        />
        </div>
      </section>

      <div style={{ margin: "48px 0 0" }}>
      <h1 style={{ margin: "0 0 4px", fontFamily: "var(--bi-font-family-brand)", color: "var(--bi-color-primary-text)" }}>Forslag til nye fagområder</h1>
      <p style={{ margin: "0 0 24px" }}>
        {rows.length} studier og kurs fordelt på {areas.length} fagområder. Alle har fått ett hovedfagområde, og{" "}
        {rows.filter((row) => row[6]).length === rows.length ? "alle" : rows.filter((row) => row[6]).length} har en underkategori.{" "}
        {rows.filter((row) => row[5] !== "–").length} av dem har i tillegg ett eller flere ekstra fagområder, med egen underkategori, og
        kan dermed finnes i flere enn ett fagområde.
      </p>

      <div style={{ margin: "0 0 16px" }}>
        <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ flex: 1 }}>
            <Search
              fullwidth
              placeholder="Søk etter studie eller kurs"
              aria-label="Søk etter studie eller kurs"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onReset={() => setQuery("")}
            />
          </div>
        </div>
        {filtersActive && (
          <p style={{ margin: "8px 0 0", color: "var(--bi-color-neutral-text-secondary)" }}>
            {matchCount === 0 ? "Ingen treff." : `Viser ${matchCount} av ${rows.length} studier og kurs.`}
          </p>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, minmax(0, 1fr))", alignItems: "end", gap: 16, margin: "0 0 16px" }}>
        <Selectfield fullwidth label="Nivå" value={levelFilter} onChange={(event) => setLevelFilter(event.target.value)}>
          <option value="">Alle</option>
          {levels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </Selectfield>
        <Selectfield fullwidth label="Bransje" value={industryFilter} onChange={(event) => setIndustryFilter(event.target.value)}>
          <option value="">Alle</option>
          {industries.map((industry) => (
            <option key={industry} value={industry}>
              {industry}
            </option>
          ))}
        </Selectfield>
        <Selectfield fullwidth label="Tidligere fagområde" value={previousFilter} onChange={(event) => setPreviousFilter(event.target.value)}>
          <option value="">Alle</option>
          {previousAreas.map((previous) => (
            <option key={previous} value={previous}>
              {previous === "–" ? "Manglet fagområde" : previous}
            </option>
          ))}
        </Selectfield>
        <Selectfield fullwidth label="Fagområde" value={areaFilter} onChange={(event) => setAreaFilter(event.target.value)}>
          <option value="">Alle</option>
          {areas.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </Selectfield>
        <Selectfield fullwidth label="Underkategori" value={subcategoryFilter} onChange={(event) => setSubcategoryFilter(event.target.value)}>
          <option value="">Alle</option>
          {subcategoryGroups.map(({ area, subcategories }) => (
            <optgroup key={area} label={area}>
              {subcategories.map((entry) => (
                <option key={entry} value={entry}>
                  {entry.slice(area.length + 3)}
                </option>
              ))}
            </optgroup>
          ))}
        </Selectfield>
        <Selectfield fullwidth label="Status" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
          <option value="">Alle</option>
          {statusOrder.map((status) => (
            <option key={status} value={status}>
              {statusLabel(status)}
            </option>
          ))}
        </Selectfield>
      </div>

      <style>{`.bi-button.reason-toggle { --bic-button-size: 0; --bic-button-padding-block: 0.125rem; --bic-button-padding-inline: 0.25rem; } .reason-toggle[aria-expanded="true"]:not(:focus-visible) { box-shadow: none; }
        .reason-spacer { transition: height 0.35s ease; }
        @media (prefers-reduced-motion: reduce) { .reason-spacer, .reason-spacer * { transition: none !important; } }
        @keyframes skeleton-shimmer { from { background-position: 100% 0; } to { background-position: -100% 0; } }
        .skeleton-line { height: 12px; margin: 1px 0; border-radius: 6px; background: linear-gradient(90deg, var(--bi-color-neutral-stroke-subtle) 25%, var(--bi-neutral-5) 50%, var(--bi-color-neutral-stroke-subtle) 75%); background-size: 200% 100%; animation: skeleton-shimmer 1.6s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .skeleton-line { animation: none; } }`}</style>
      <div style={{ width: "fit-content", minWidth: "100%" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={headCell}>Studie/kurs</th>
            <th style={headCell}>Tidligere fagområder</th>
            <th style={headCell}>Fagområde</th>
            <th style={{ ...headCell, width: 136 }}>Status</th>
            <th style={headCell}>Begrunnelse</th>
          </tr>
        </thead>
        {areas.map((area) => {
          const areaRows = rows
            .filter(([a]) => a === area)
            .sort((a, b) => statusOrder.indexOf(a[1][0]) - statusOrder.indexOf(b[1][0]));
          const visibleRows = areaRows.filter(matchesQuery);
          if (visibleRows.length === 0) return null;
          return (
            <tbody key={area}>
              <tr>
                <td colSpan={5} style={{ padding: "28px 12px 12px" }}>
                  <h2 id={areaAnchor(area)} style={{ scrollMarginTop: 16, margin: 0, display: "flex", alignItems: "center", gap: 12, fontFamily: "var(--bi-font-family-brand)", fontSize: "1.5rem", color: "var(--bi-color-primary-text)" }}>
                    <AreaIcon area={area} />
                    {area}
                  </h2>
                </td>
              </tr>
              {visibleRows.map((row, index) => {
                const [, statuses, title, level, previous, , subcategories, , , industry] = row;
                return (
                  <tr key={`${title}-${index}`} style={{ borderBottom: "1px solid var(--bi-color-neutral-stroke-subtle)" }}>
                    <td style={cell}>
                      <div style={{ marginBottom: 2, color: "var(--bi-primary-60)", fontSize: "0.8125rem", fontWeight: 700 }}>{level}</div>
                      {title}
                      <SuggestedTitle row={row} />
                      {industry !== "–" && (
                        <div style={{ marginTop: 6 }}>
                          <span
                            style={{
                              display: "inline-block",
                              padding: "1px 8px",
                              borderRadius: 10,
                              background: "var(--bi-color-neutral-surface)",
                              border: "1px solid var(--bi-color-neutral-stroke)",
                              color: "var(--bi-color-neutral-text)",
                              fontSize: "0.8125rem",
                            }}
                          >
                            Bransje: {industry}
                          </span>
                        </div>
                      )}
                    </td>
                    <td style={{ ...cell, position: "relative", paddingRight: 56 }}>
                      {previous}
                      <svg width="18" height="12" viewBox="0 0 18 12" aria-hidden="true" style={{ position: "absolute", right: 18, top: 14 }}>
                        <line x1="0" y1="6" x2="15" y2="6" stroke="#d5dde4" strokeWidth="1.5" />
                        <polyline points="10,1.5 16,6 10,10.5" fill="none" stroke="#d5dde4" strokeWidth="1.5" />
                      </svg>
                    </td>
                    <td style={cell}>
                      {subcategories.split("; ").map((entry, entryIndex) => {
                        const [entryArea, entrySub] = entry.split(" › ");
                        return (
                          <div key={entry} style={{ marginBottom: 8 }}>
                            <AreaWithSubcategory area={entryArea} subcategory={entrySub} muted={entryIndex > 0} />
                          </div>
                        );
                      })}
                    </td>
                    <td style={{ ...cell, width: 136 }}>
                      <div style={{ display: "grid", gap: 4, justifyItems: "start" }}>
                        {statuses.map((status) => (
                          <StatusBadge key={status} status={status} />
                        ))}
                      </div>
                    </td>
                    <td style={{ ...cell, fontSize: "0.8125rem", position: "relative" }}>
                      <PlacementReasons row={row} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          );
        })}
      </table>
      </div>
      </div>
      </div>
      </div>
    </div>
  );
}
