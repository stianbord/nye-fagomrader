// --- generert kode ---
import { Fragment, useEffect, useRef, useState } from "react";
import { Button, Link, Badge, Search, Selectfield } from "@bi-digital/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@bi-digital/icons";

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

const rows: Row[] = [
  ["Finans, økonomi og regnskap", ["Manglet fagområde"], "Høyskolekandidat i økonomi og administrasjon", "–", "–", "–", "Finans, økonomi og regnskap › Bedriftsøkonomi", "Handler om bedriftsøkonomi, budsjett og beslutningsstøtte, eller er en bred økonomiutdanning.", false, "–", false],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Regnskap for nyutdannede jurister", "–", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Regnskap og revisjon", "Handler om regnskap, bokføring eller revisjon.", false, "–", false],
  ["Finans, økonomi og regnskap", ["1 fagområde prioritert", "Fagområde fjernet"], "Business Administration", "Bachelor", "Finans, økonomi og styring; Ledelse; Internasjonal Business", "–", "Finans, økonomi og regnskap › Bedriftsøkonomi", "Handler om bedriftsøkonomi, budsjett og beslutningsstøtte, eller er en bred økonomiutdanning.", false, "–", false],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Finans", "Bachelor", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Finans og investering", "Handler om finans, investering, bank eller finansnæringen.", false, "–", false],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Vil du bli statsautorisert regnskapsfører?", "Bachelor", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Regnskap og revisjon", "Handler om regnskap, bokføring eller revisjon.", false, "–", false],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Økonomi og administrasjon", "Bachelor", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Bedriftsøkonomi", "Handler om bedriftsøkonomi, budsjett og beslutningsstøtte, eller er en bred økonomiutdanning.", false, "–", true],
  ["Finans, økonomi og regnskap", ["1 fagområde prioritert", "Fagområde fjernet"], "Siviløkonom", "Bachelor/Master", "Finans, økonomi og styring; Ledelse", "–", "Finans, økonomi og regnskap › Bedriftsøkonomi", "Handler om bedriftsøkonomi, budsjett og beslutningsstøtte, eller er en bred økonomiutdanning.", false, "–", false],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Bedriftsøkonomi", "Bachelor/Årsenhet", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Bedriftsøkonomi", "Handler om bedriftsøkonomi, budsjett og beslutningsstøtte, eller er en bred økonomiutdanning.", false, "–", true],
  ["Finans, økonomi og regnskap", ["Manglet fagområde"], "Anvendt mikroøkonomi", "Bachelorkurs", "–", "–", "Finans, økonomi og regnskap › Samfunnsøkonomi", "Handler om økonomisk teori og samfunnsøkonomi.", false, "–", true],
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
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Matematikk for økonomer", "Bachelorkurs", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Samfunnsøkonomi", "Handler om økonomisk teori og samfunnsøkonomi.", false, "–", true],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Matematisk analyse", "Bachelorkurs", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Samfunnsøkonomi", "Handler om økonomisk teori og samfunnsøkonomi.", false, "–", true],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Personlig økonomi", "Bachelorkurs", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Finans og investering", "Handler om finans, investering, bank eller finansnæringen.", false, "–", true],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Prestasjonsstyring", "Bachelorkurs", "Finans, økonomi og styring", "Ledelse", "Finans, økonomi og regnskap › Økonomistyring; Ledelse › Strategisk ledelse", "Handler om budsjett, nøkkeltall og oppfølging av økonomisk resultat, derfor Økonomistyring. Styring av enheter og resultater er også et lederansvar, så Ledelse er ekstra fagområde.", false, "–", true],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Regnskapsføring i næring", "Bachelorkurs", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Regnskap og revisjon", "Handler om regnskap, bokføring eller revisjon.", false, "–", true],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Samfunnsøkonomi I", "Bachelorkurs", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Samfunnsøkonomi", "Handler om økonomisk teori og samfunnsøkonomi.", false, "–", true],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Samfunnsøkonomi II", "Bachelorkurs", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Samfunnsøkonomi", "Handler om økonomisk teori og samfunnsøkonomi.", false, "–", true],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Strategisk økonomistyring", "Bachelorkurs", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Økonomistyring", "Handler om bedriftsøkonomi, budsjett og beslutningsstøtte, eller er en bred økonomiutdanning.", false, "–", true],
  ["Finans, økonomi og regnskap", ["1 fagområde prioritert", "Fagområde fjernet"], "Styrekompetanse", "Bachelorkurs", "Finans, økonomi og styring; Organisasjonsutvikling og Human Resource Management", "Ledelse; Strategi, innovasjon og bærekraft; Juss, skatt og eiendom", "Finans, økonomi og regnskap › Bedriftsøkonomi; Ledelse › Strategisk ledelse; Strategi, innovasjon og bærekraft › Strategi; Juss, skatt og eiendom › Forretningsjus og rettsvitenskap", "Handler om styrearbeid, eierstyring og governance.", false, "–", false],
  ["Finans, økonomi og regnskap", ["1 fagområde prioritert", "Fagområde fjernet"], "Business", "Master", "Finans, økonomi og styring; Ledelse; Markedsføring, kommunikasjon og kultur; Organisasjonsutvikling og Human Resource Management; Eiendom, varehandel og forretningsjus; Strategi, innovasjon og bærekraft", "Markedsføring, kommunikasjon og kultur; Strategi, innovasjon og bærekraft; Ledelse; HR og organisasjonsutvikling", "Finans, økonomi og regnskap › Bedriftsøkonomi; Markedsføring, kommunikasjon og kultur › Markedsføring; Strategi, innovasjon og bærekraft › Strategi; Ledelse › Generell ledelse og lederutdanning; HR og organisasjonsutvikling › HR og personalledelse", "Handler om bedriftsøkonomi, budsjett og beslutningsstøtte, eller er en bred økonomiutdanning.", false, "–", false],
  ["Finans, økonomi og regnskap", ["1 fagområde prioritert"], "Bærekraft og finans", "Master", "Finans, økonomi og styring; Strategi, innovasjon og bærekraft", "Strategi, innovasjon og bærekraft", "Finans, økonomi og regnskap › Bærekraftig finans; Strategi, innovasjon og bærekraft › Bærekraft", "Handler om finans og investering, med bærekraft som tema.", true, "–", false],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Finans", "Master", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Finans og investering", "Handler om finans, investering, bank eller finansnæringen.", false, "–", false],
  ["Finans, økonomi og regnskap", ["1 fagområde prioritert", "Fagområde fjernet"], "Major in Accounting and Business Control", "Master", "Finans, økonomi og styring; Strategi, innovasjon og bærekraft", "–", "Finans, økonomi og regnskap › Regnskap og revisjon", "Handler om regnskap, bokføring eller revisjon.", false, "–", false],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Major in Economics", "Master", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Samfunnsøkonomi", "Handler om økonomisk teori og samfunnsøkonomi.", false, "–", false],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Major in Finance", "Master", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Finans og investering", "Handler om finans, investering, bank eller finansnæringen.", false, "–", false],
  ["Finans, økonomi og regnskap", ["1 fagområde prioritert", "Fagområde fjernet"], "Quantitative Finance", "Master", "Finans, økonomi og styring; Digitalisering og Analytics", "KI, digitalisering og analytics", "Finans, økonomi og regnskap › Finans og investering; KI, digitalisering og analytics › Data science og analytics", "Handler om finans, investering, bank eller finansnæringen.", false, "–", false],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Regnskap og revisjon", "Master", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Regnskap og revisjon", "Handler om regnskap, bokføring eller revisjon.", false, "–", false],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Regnskap og revisjon +1-modellen", "Master", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Regnskap og revisjon", "Handler om regnskap, bokføring eller revisjon.", false, "–", false],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Anvendt økonomi", "Masterkurs", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Samfunnsøkonomi", "Handler om økonomisk teori og samfunnsøkonomi.", false, "–", false],
  ["Finans, økonomi og regnskap", ["1 fagområde prioritert", "Fagområde fjernet"], "Det verdiskapende styret", "Masterkurs", "Finans, økonomi og styring; Strategi, innovasjon og bærekraft", "Ledelse; Strategi, innovasjon og bærekraft; Juss, skatt og eiendom", "Finans, økonomi og regnskap › Bedriftsøkonomi; Ledelse › Strategisk ledelse; Strategi, innovasjon og bærekraft › Strategi; Juss, skatt og eiendom › Forretningsjus og rettsvitenskap", "Handler om styrearbeid, eierstyring og governance.", false, "–", false],
  ["Finans, økonomi og regnskap", ["1 fagområde prioritert"], "Finansiell strategi", "Masterkurs", "Finans, økonomi og styring; Strategi, innovasjon og bærekraft", "Strategi, innovasjon og bærekraft", "Finans, økonomi og regnskap › Finans og investering; Strategi, innovasjon og bærekraft › Strategi", "Handler om finans, investering, bank eller finansnæringen.", false, "–", false],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Global økonomi", "Masterkurs", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Samfunnsøkonomi", "Handler om økonomisk teori og samfunnsøkonomi.", false, "–", false],
  ["Juss, skatt og eiendom", ["1 fagområde prioritert", "Fagområde fjernet"], "Governance: Risikostyring, compliance og internrevisjon", "Masterkurs", "Eiendom, varehandel og forretningsjus; Finans, økonomi og styring; Strategi, innovasjon og bærekraft", "Finans, økonomi og regnskap", "Juss, skatt og eiendom › Compliance; Finans, økonomi og regnskap › Regnskap og revisjon", "Handler om risikostyring, compliance og internrevisjon.", false, "–", false],
  ["KI, digitalisering og analytics", ["Manglet fagområde"], "Master fintech", "Masterkurs", "–", "Finans, økonomi og regnskap", "KI, digitalisering og analytics › Digital transformasjon; Finans, økonomi og regnskap › Fintech", "Handler om teknologi og digital transformasjon i finansnæringen.", false, "Finansnæringen", true],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Økonomi for beslutningstakere", "Masterkurs", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Økonomistyring", "Budsjettering, kostnads- og lønnsomhetsanalyse, derfor Økonomistyring og bedriftsøkonomi.", false, "–", false],
  ["Finans, økonomi og regnskap", ["Manglet fagområde"], "Rådgivning og risiko", "Kurs uten studiepoeng", "–", "Strategi, innovasjon og bærekraft", "Finans, økonomi og regnskap › Finans og investering; Strategi, innovasjon og bærekraft › Bærekraft", "Handler om finans og investering, med bærekraft som tema.", true, "Finansnæringen", true],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Finans", "PhD", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Finans og investering", "Handler om finans, investering, bank eller finansnæringen.", false, "–", false],
  ["Finans, økonomi og regnskap", ["Manglet fagområde"], "Regnskap", "PhD", "–", "–", "Finans, økonomi og regnskap › Regnskap og revisjon", "Handler om regnskap, bokføring eller revisjon.", false, "–", false],
  ["Finans, økonomi og regnskap", ["Manglet fagområde"], "Samfunnsøkonomi", "PhD", "–", "–", "Finans, økonomi og regnskap › Samfunnsøkonomi", "Handler om økonomisk teori og samfunnsøkonomi.", false, "–", false],
  ["Finans, økonomi og regnskap", ["Manglet fagområde"], "Qualifying Year at American College of Norway", "–", "–", "–", "Finans, økonomi og regnskap › Bedriftsøkonomi", "Handler om bedriftsøkonomi, budsjett og beslutningsstøtte, eller er en bred økonomiutdanning.", false, "–", false],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Bærekraftig økonomisk utvikling", "Bachelorkurs", "Finans, økonomi og styring", "Strategi, innovasjon og bærekraft", "Finans, økonomi og regnskap › Samfunnsøkonomi; Strategi, innovasjon og bærekraft › Bærekraft", "Makroøkonomi (vekst, statsfinanser) med bærekraft som perspektiv.", false, "–", true],
  ["Finans, økonomi og regnskap", ["Lagt til ekstra fagområde"], "Marked, kriser og bærekraft", "Bachelorkurs", "Strategi, innovasjon og bærekraft", "Strategi, innovasjon og bærekraft", "Finans, økonomi og regnskap › Samfunnsøkonomi; Strategi, innovasjon og bærekraft › Bærekraft", "Innsikt i markedsøkonomi som økonomisk system.", false, "–", true],
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
  ["KI, digitalisering og analytics", ["1 fagområde prioritert"], "Statistikk for økonomer", "Bachelorkurs", "Finans, økonomi og styring; Digitalisering og Analytics", "Finans, økonomi og regnskap", "KI, digitalisering og analytics › Statistikk og metode; Finans, økonomi og regnskap › Samfunnsøkonomi", "Handler om statistikk og forskningsmetode.", false, "–", true],
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
  ["Markedsføring, kommunikasjon og kultur", ["Lagt til ekstra fagområde"], "Markedsøkonomi", "Bachelor/Årsenhet", "Finans, økonomi og styring", "Finans, økonomi og regnskap", "Markedsføring, kommunikasjon og kultur › Markedsføring; Finans, økonomi og regnskap › Samfunnsøkonomi", "Handler om markedsføring, fra merkevare og strategi til digitale kanaler.", true, "–", true],
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
  ["Finans, økonomi og regnskap", ["Lagt til ekstra fagområde"], "Major in Strategy", "Master", "Strategi, innovasjon og bærekraft", "Strategi, innovasjon og bærekraft", "Finans, økonomi og regnskap › Bedriftsøkonomi; Strategi, innovasjon og bærekraft › Strategi", "Major i Master in Business, plassert sammen med selve graden og Siviløkonom.", true, "–", false],
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
  "1 fagområde prioritert": ["1 fagområde prioritert"],
  "Manglet fagområde": ["Manglet fagområde"],
  "Lagt til ekstra fagområde": ["Lagt til ekstra", "fagområde"],
  "Flyttet til nytt fagområde": ["Flyttet til nytt", "fagområde"],
  "Fagområde fjernet": ["Fagområde fjernet"],
};

function StatusBadge({ status, wide = false }: { status: Status; wide?: boolean }) {
  const { background, text } = statusStyle[status];
  const lines = wide ? [status] : statusLines[status];
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

function AreaWithSubcategory({ area, subcategory, muted = false }: { area: string; subcategory: string; muted?: boolean }) {
  return (
    <>
      <div style={{ position: "relative", whiteSpace: "nowrap", fontSize: muted ? "0.875rem" : undefined, color: muted ? "var(--bi-color-neutral-text-secondary)" : undefined }}>
        {!muted && (
          <span aria-label="Hovedfagområde" title="Hovedfagområde" style={{ position: "absolute", left: -12, color: "var(--bi-primary-50)", fontWeight: 700 }}>
            *
          </span>
        )}
        {area}
      </div>
      <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 8, margin: "2px 0 0 10px", padding: "3px 0" }}>
        <span style={{ position: "absolute", left: 0, top: 0, bottom: "50%", width: 1, background: treeLine }} />
        <span style={{ flex: "0 0 14px", height: 1, background: treeLine }} />
        <span style={{ fontSize: muted ? "0.8125rem" : "0.875rem", color: muted ? "var(--bi-neutral-40)" : undefined, whiteSpace: "nowrap" }}>{subcategory}</span>
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
          gridRow: `1 / span ${to.length}`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
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
          <div style={{ gridColumn: 2, gridRow: index + 1, position: "relative", paddingTop: 22 }}>
            <span
              style={{
                position: "absolute",
                left: 0,
                width: 1.5,
                background: color,
                top: index === 0 ? 29 : 0,
                bottom: index === to.length - 1 ? "calc(100% - 29px)" : 0,
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
  "Lagt til ekstra fagområde",
  "Flyttet til nytt fagområde",
  "Manglet fagområde",
  "1 fagområde prioritert",
  "Endret navn på fagområde",
  "Uendret",
  "Fagområde fjernet",
];

const statusPieColors: Record<Status, string> = {
  "Lagt til ekstra fagområde": "#c5d9f7",
  "Flyttet til nytt fagområde": "#6196f4",
  "Manglet fagområde": "#042f5b",
  "1 fagområde prioritert": "#0b4db4",
  "Endret navn på fagområde": "#9ec0f1",
  Uendret: "#c8d1db",
  "Fagområde fjernet": "#475e75",
};

function StatusPie({ rows: list }: { rows: Row[] }) {
  const pieStatuses = statusOrder.filter((status) => status !== "Fagområde fjernet");
  const counts = pieStatuses.map((status) => ({ status, count: list.filter(([, s]) => s[0] === status).length }));
  const removedCount = list.filter(([, s]) => s.includes("Fagområde fjernet")).length;
  const total = counts.reduce((sum, { count }) => sum + count, 0);
  let angle = 0;
  const stops = counts.map(({ status, count }) => {
    const start = angle;
    angle += (count / total) * 360;
    return `${statusPieColors[status]} ${start}deg ${angle}deg`;
  });
  const legendRow = (status: Status, count: number) => (
    <div key={status} style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ width: 9, height: 9, borderRadius: 2, background: statusPieColors[status], boxShadow: hairline(statusPieColors[status]) }} />
      <StatusBadge status={status} wide />
      <span>
        {count} <span style={{ color: "var(--bi-color-neutral-text-secondary)" }}>({Math.round((count / total) * 100)} %)</span>
      </span>
    </div>
  );
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 24, margin: "0 0 8px" }}>
      <div
        role="img"
        aria-label="Fordeling av status"
        style={{ flex: "0 0 auto", width: 140, height: 140, borderRadius: "50%", background: `conic-gradient(${stops.join(", ")})` }}
      />
      <div style={{ display: "grid", gap: 6 }}>
        {counts.map(({ status, count }) => legendRow(status, count))}
        <div style={{ borderTop: "1px solid var(--bi-color-neutral-stroke)", margin: "4px 0 2px" }} />
        {legendRow("Fagområde fjernet", removedCount)}
        <span style={{ color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.8125rem" }}>
          Kommer i tillegg til en av statusene over. Et tidligere fagområde er verken videreført som hoved, ekstra eller underkategori.
        </span>
      </div>
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

// Tre fargeroller: fagområde (kategorisk, areaColors), før/nå/ekstra (sammenligning) og relaterte kategorier i ett diagram (blå rampe, pieColors).
const areaColors: Record<string, string> = {
  "Finans, økonomi og regnskap": "#042f5b",
  Ledelse: "#6929c4",
  "Strategi, innovasjon og bærekraft": "#198038",
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
  "Ledelse",
  "HR og organisasjonsutvikling",
  "Sikkerhet og beredskap",
  "Markedsføring, kommunikasjon og kultur",
  "KI, digitalisering og analytics",
  "Juss, skatt og eiendom",
  "Finans, økonomi og regnskap",
  "Strategi, innovasjon og bærekraft",
];

const areaShortName: Record<string, string> = {
  "Helse, skole og barnehage": "Helse, skole og barnehage",
  Ledelse: "Ledelse",
  "HR og organisasjonsutvikling": "HR og organisasjonsutvikling",
  "Sikkerhet og beredskap": "Sikkerhet og beredskap",
  "Markedsføring, kommunikasjon og kultur": "Markedsføring, kommunikasjon og kultur",
  "KI, digitalisering og analytics": "KI, digitalisering og analytics",
  "Juss, skatt og eiendom": "Juss, skatt og eiendom",
  "Finans, økonomi og regnskap": "Finans, økonomi og regnskap",
  "Strategi, innovasjon og bærekraft": "Strategi, innovasjon og bærekraft",
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
  Ledelse: { kind: "same", to: "Ledelse", note: "Beholdt" },
  "Organisasjonsutvikling og Human Resource Management": { kind: "old", to: "HR og organisasjonsutvikling", note: "Nytt navn" },
  "Strategi, innovasjon og bærekraft": { kind: "same", to: "Strategi, innovasjon og bærekraft", note: "Beholdt" },
  "Markedsføring, kommunikasjon og kultur": { kind: "same", to: "Markedsføring, kommunikasjon og kultur", note: "Beholdt" },
  "Digitalisering og Analytics": { kind: "old", to: "KI, digitalisering og analytics", note: "Nytt navn" },
  "Offentlig sektor": { kind: "removed", note: "Delt opp" },
  "Eiendom, varehandel og forretningsjus": { kind: "old", to: "Juss, skatt og eiendom", note: "Nytt navn" },
  "Internasjonal Business": { kind: "removed", note: "Fjernet" },
  Prosjektledelse: { kind: "removed", note: "Nå underkategori i Ledelse" },
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

type TocItem = { id: string; label: string; gap?: boolean; section?: string };

const tocAreas = [...new Set(rows.map(([area]) => area))].sort((a, b) => a.localeCompare(b, "nb"));
const areaAnchor = (area: string) => `fagomrade-${area.toLowerCase().replace(/[^a-z0-9æøå]+/g, "-")}`;

const summaryToc: TocItem[] = [
  { id: "soketest", label: "Søketest" },
  { id: "tilbakemelding", label: "Tilbakemelding" },
  { id: "hva-gjores", label: "Hva gjøres?", section: "Forklaring" },
  { id: "hvorfor", label: "Hvorfor gjøres dette?" },
  { id: "oversikt-endringer", label: "Hvordan ser fordelingen ut?" },
  ...tocAreas.map((area, index) => ({ id: areaAnchor(area), label: area, section: index === 0 ? "Forslag til nye fagområder" : undefined })),
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
      {summaryToc.map(({ id, label, gap, section }) => (
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
            display: "block",
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
          {label}
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
  const roundButton = (disabled: boolean) =>
    ({
      borderRadius: "50%",
      "--bic-button-background": "var(--bi-basic-white)",
      "--bic-button-box-shadow": "0 0 0 1px var(--bi-color-neutral-stroke) inset",
      opacity: disabled ? 0.45 : 1,
    }) as React.CSSProperties;
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
      { no: "Bedriftsøkonomi", en: "Business Administration", terms: "Business Administration, Business" },
      { no: "Økonomistyring", en: "Management Accounting and Control", terms: "Accounting and Business Control" },
      { no: "Finans og investering", en: "Finance and Investment", terms: "Major in Finance, Quantitative Finance" },
      { no: "Bærekraftig finans", en: "Sustainable Finance", terms: "Sustainable Finance, ESG" },
      { no: "Fintech", en: "Fintech", terms: "Fintech, AI in Financial Services" },
      { no: "Finansiell kriminalitet og compliance", en: "Financial Crime and Compliance", terms: "Anti-Money Laundering, Compliance, Financial Crime" },
      { no: "Regnskap og revisjon", en: "Accounting and Auditing", terms: "Accounting, Auditing" },
      { no: "Logistikk og forsyningskjeder", en: "Logistics and Supply Chain Management", terms: "Supply Chain Management, Major in Logistics, Operations, and Supply Chain Management" },
      { no: "Samfunnsøkonomi", en: "Economics", terms: "Major in Economics, Applied Microeconomics" },
    ],
  },
  {
    area: { no: "KI, digitalisering og analytics", en: "AI, Digitalisation and Analytics", terms: "Digital Business, Business Analytics, Generative AI for Business" },
    subcategories: [
      { no: "Digital transformasjon", en: "Digital Transformation", terms: "Digital Transformation, Digital Business" },
      { no: "Data science og analytics", en: "Data Science and Analytics", terms: "Data Science for Business, Business Analytics" },
      { no: "KI", en: "Artificial Intelligence", terms: "Generative AI for Business, AI for Strategic Management" },
      { no: "Statistikk og metode", en: "Statistics and Quantitative Methods", terms: "Statistics, Data Analysis" },
      { no: "Ansvarlig KI og personvern", en: "Responsible AI and Data Privacy", terms: "Responsible AI Leadership, GDPR" },
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
    area: { no: "Strategi, innovasjon og bærekraft", en: "Strategy, Innovation and Sustainability", terms: "Major in Strategy, Innovation and Entrepreneurship" },
    subcategories: [
      { no: "Strategi", en: "Strategy", terms: "Major in Strategy" },
      { no: "Innovasjon og entreprenørskap", en: "Innovation and Entrepreneurship", terms: "Innovation and Entrepreneurship" },
      { no: "Bærekraft", en: "Sustainability", terms: "Sustainability, ESG, Green Growth" },
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
    area: { no: "Ledelse", en: "Leadership and Management", terms: "Bachelor in Management, Master of Management, Leadership in Action" },
    subcategories: [
      { no: "Generell ledelse og lederutdanning", en: "General Management and Leadership Education", terms: "Bachelor in Management, Executive MBA, Master of Management" },
      { no: "Prosjektledelse", en: "Project Management", terms: "Project Management, Agile" },
      { no: "Sikkerhets- og beredskapsledelse", en: "Security and Emergency Leadership", terms: "Security Management, Crisis Management" },
      { no: "Teamledelse og prestasjon", en: "Team Leadership and Performance", terms: "Team Leadership, Organisational Psychology" },
      { no: "Medarbeiderledelse og arbeidsmiljø", en: "People Leadership and Work Environment", terms: "HRM, Work Environment, Health-promoting Leadership" },
      { no: "Endringsledelse", en: "Leading Change", terms: "Change Management, Leadership, Change and Analytics" },
      { no: "Lederferdigheter og kommunikasjon", en: "Leadership Skills and Communication", terms: "Leadership in Action, Coaching, Negotiation, Leadership Communication" },
      { no: "Strategisk ledelse", en: "Strategic Management", terms: "Strategic Management, Ocean Industry Leadership" },
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
  "var(--bi-neutral-40)",
  "var(--bi-primary-60)",
  "var(--bi-neutral-60)",
  "var(--bi-primary-40)",
  "var(--bi-primary-10)",
  "var(--bi-primary-50)",
  "var(--bi-primary-20)",
  "var(--bi-neutral-80)",
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
        <div style={{ alignSelf: "start", minHeight: 76 }}>
          <div style={{ fontWeight: 700, color: "var(--bi-color-neutral-text-secondary)" }}>Fagområder</div>
          <p style={{ margin: "2px 0 0", color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.8125rem" }}>
            {describe(areaFocus, "Hold musepekeren over et fagområde eller en strek.")}
          </p>
        </div>
        <div style={{ alignSelf: "start", minHeight: 76 }}>
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
  "Ledelse",
  "HR og organisasjonsutvikling",
  "Strategi, innovasjon og bærekraft",
  "Markedsføring, kommunikasjon og kultur",
  "KI, digitalisering og analytics",
  "Juss, skatt og eiendom",
  "Helse, skole og barnehage",
  "Sikkerhet og beredskap",
];

function BeforeAfterSankey() {
  const [focus, setFocus] = useState<{ side: "old" | "new"; name: string } | null>(null);
  const width = 640;
  const height = 520;
  const nodeWidth = 14;
  const gap = 9;
  const total = summaryRows.length;
  const flows = new Map<string, number>();
  for (const row of summaryRows) {
    const previous = row[4].split("; ").filter((p) => p !== "–");
    const keys = previous.length ? previous : [noOldArea];
    for (const key of keys) flows.set(`${key}|${row[0]}`, (flows.get(`${key}|${row[0]}`) ?? 0) + 1 / keys.length);
  }
  const scale = (height - gap * (sankeyLeft.length - 1)) / total;
  const leftTotals = new Map(sankeyLeft.map((name) => [name, sankeyRight.reduce((sum, to) => sum + (flows.get(`${name}|${to}`) ?? 0), 0)]));
  const rightTotals = new Map(sankeyRight.map((name) => [name, sankeyLeft.reduce((sum, from) => sum + (flows.get(`${from}|${name}`) ?? 0), 0)]));
  const rightHeight = total * scale + gap * (sankeyRight.length - 1);
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
  const count = (name: string) => beforeAfter.before.get(name)?.count ?? 0;

  return (
    <svg viewBox={`-330 -10 ${width + 640} ${height + 20}`} role="img" aria-label="Fra gamle til nye fagområder" style={{ width: "100%", height: "auto", margin: "0 0 20px" }} onMouseLeave={() => setFocus(null)}>
      {bands.map((band) => {
        const h = band.value * scale;
        const x0 = nodeWidth;
        const x1 = width - nodeWidth;
        const c = (x1 - x0) / 2;
        const path = `M ${x0} ${band.y0} C ${x0 + c} ${band.y0} ${x1 - c} ${band.y1} ${x1} ${band.y1} L ${x1} ${band.y1 + h} C ${x1 - c} ${band.y1 + h} ${x0 + c} ${band.y0 + h} ${x0} ${band.y0 + h} Z`;
        return (
          <path key={`${band.from}|${band.to}`} d={path} fill={areaColor(band.to)} fillOpacity={isActive(band) ? (focus ? 0.8 : 0.5) : 0.06}>
            <title>{`${band.from} → ${band.to}: ${Math.round(band.value * 10) / 10}`}</title>
          </path>
        );
      })}
      {sankeyLeft.map((name) => {
        const y = leftY.get(name) ?? 0;
        const h = Math.max((leftTotals.get(name) ?? 0) * scale, 2);
        return (
          <g key={name} onMouseEnter={() => setFocus({ side: "old", name })} opacity={!focus || (focus.side === "old" && focus.name === name) || bands.some((b) => b.from === name && isActive(b)) ? 1 : 0.35}>
            <rect x={0} y={y} width={nodeWidth} height={h} fill={leftColor(name)} />
            <text x={-8} y={y + h / 2} textAnchor="end" dominantBaseline="middle" fontSize="12" fill="#222d38" textDecoration={oldAreaCatalog[name]?.kind === "removed" ? "line-through" : undefined}>
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
            <text x={width + 8} y={y + h / 2} textAnchor="start" dominantBaseline="middle" fontSize="12" fill="#222d38">
              {wrapLabel(areaShortName[name] ?? name, 34).map((line, lineIndex, all) => (
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
  const main = after.get("Ledelse")?.count ?? 0;
  const sources = [
    { key: "Ledelse", label: "Ledelse som hovedfagområde", value: main },
    ...[...(extras.get("Ledelse") ?? [])].sort((x, y) => y[1] - x[1]).map(([area, value]) => ({ key: area, label: `Ekstra fra ${areaShortName[area] ?? area}`, value })),
  ];
  const total = sources.reduce((sum, source) => sum + source.value, 0);
  const sizeOf = (value: number) => Math.max(value * scale, minNode);
  const leftHeight = sources.reduce((sum, source) => sum + sizeOf(source.value), 0) + gap * (sources.length - 1);
  const rightHeight = total * scale;
  const height = Math.max(leftHeight, rightHeight);
  const colors = ["var(--bi-primary-90)", "var(--bi-primary-60)", "var(--bi-primary-40)", "var(--bi-neutral-40)", "var(--bi-primary-50)", "var(--bi-neutral-60)", "var(--bi-primary-20)", "var(--bi-neutral-20)"];
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
    <svg viewBox={`-240 -10 ${width + 400} ${height + 20}`} role="img" aria-label="Studier og kurs i Ledelse, fordelt på hovedfagområde" style={{ width: "100%", height: "auto" }}>
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
        Ledelse <tspan fontWeight="700">{total}</tspan>
      </text>
    </svg>
  );
}

type BeforeAfterExample = { title: string; level: string };

const beforeAfterExamples: BeforeAfterExample[] = [
  { title: "Juss for ledere", level: "Masterkurs" },
  { title: "Effektive team", level: "Bachelorkurs" },
  { title: "Helseledelse", level: "Masterkurs" },
];

const sectorLeadershipExamples: BeforeAfterExample[] = [
  { title: "Helseledelse", level: "Masterkurs" },
  { title: "Nasjonal rektorutdanning", level: "Masterkurs" },
  { title: "Sikkerhetsledelse", level: "Bachelorkurs" },
  { title: "Digital sikkerhet for ledere", level: "Masterkurs" },
];

function BeforeAfterExamples({ examples = beforeAfterExamples }: { examples?: BeforeAfterExample[] }) {
  const normalizeTitle = (text: string) => text.replace(/\u00ad|\(-\)/g, "");
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16, margin: "0 0 20px" }}>
      {examples.map(({ title, level }) => {
        const row = summaryRows.find((candidate) => normalizeTitle(candidate[2]) === title && candidate[3] === level);
        if (!row) return null;
        const previous = row[4].split("; ").filter((p) => p !== "–");
        const entries = row[6].split("; ");
        return (
          <div key={title} style={{ background: "var(--bi-basic-white)", border: "1px solid var(--bi-color-neutral-stroke-subtle)", borderRadius: 8, padding: 16 }}>
            <div style={{ fontWeight: 700 }}>{title}</div>
            <div style={{ color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.8125rem", marginBottom: 10 }}>{level}</div>
            <div style={{ color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.8125rem", marginBottom: 4 }}>
              Før: {previous.length > 1 ? `${previous.length} fagområder uten prioritet` : previous.length === 1 ? "1 fagområde" : "manglet fagområde"}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
              {previous.length ? previous.map((name) => <AreaPill key={name} label={shortOldName(name)} kind={oldAreaCatalog[name]?.kind === "removed" ? "removed" : "old"} />) : <AreaPill label="Manglet fagområde" kind="added" />}
            </div>
            <div style={{ color: "var(--bi-color-primary-text-accent)", fontSize: "0.8125rem", fontWeight: 600, marginBottom: 4 }}>
              Nå: 1 hovedfagområde{entries.length > 1 ? ` + ${new Set(entries.slice(1).map((entry) => entry.split(" › ")[0])).size} ekstra` : ""}
            </div>
            {entries.map((entry, index) => {
              const [entryArea, entrySub] = entry.split(" › ");
              return (
                <div key={entry} style={{ position: "relative", marginBottom: 8, paddingLeft: 0 }}>
                  <AreaWithSubcategory area={entryArea} subcategory={entrySub} muted={index > 0} />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
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
    { olds: ["Ledelse"], news: ["Ledelse"] },
    { olds: ["Organisasjonsutvikling og Human Resource Management"], news: ["HR og organisasjonsutvikling"] },
    { olds: ["Strategi, innovasjon og bærekraft"], news: ["Strategi, innovasjon og bærekraft"] },
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
      <p style={{ margin: "0 0 4px", color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.8125rem" }}>
        Fra gamle fagområder (til venstre) til nye hovedfagområder (til høyre). Bredden viser antall studier og kurs. Et studie eller kurs med flere gamle
        fagområder deles likt mellom dem. Hold musepekeren over et fagområde for å se hvor kursene kom fra eller gikk.
      </p>
      <BeforeAfterSankey />
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
                : "Ikke lenger fagområder. Studiene og kursene er plassert i andre fagområder, og Prosjektledelse er en underkategori i Ledelse."}
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

function KeepAreaSlide() {
  const total = summaryRows.length;
  const statusCount = (status: Status) => summaryRows.filter((row) => row[1][0] === status).length;
  const keptCount = statusCount("Uendret") + statusCount("Endret navn på fagområde");
  const prioritisedCount = statusCount("1 fagområde prioritert");
  const extraCount = statusCount("Lagt til ekstra fagområde");
  const movedCount = statusCount("Flyttet til nytt fagområde");
  const missingCount = statusCount("Manglet fagområde");
  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 820 }}>
      <p style={{ margin: 0, color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.9375rem" }}>{`Bare ${Math.round((movedCount / total) * 100)} % er flyttet helt til et annet fagområde. ${Math.round(((keptCount + prioritisedCount) / total) * 100)} % har beholdt ett av fagområdene sine som hovedfagområde, ${Math.round((extraCount / total) * 100)} % har fått et nytt hovedfagområde, men beholder det gamle som ekstra, og ${Math.round((missingCount / total) * 100)} % har fått et fagområde for første gang.`}</p>
      {barWithLegend([
        { key: "kept", value: keptCount, color: statusPieColors.Uendret, label: "Beholdt fagområdet (uendret eller nytt navn)", legend: "beholdt" },
        { key: "prio", value: prioritisedCount, color: statusPieColors["1 fagområde prioritert"], label: "Ett fagområde prioritert", legend: "ett prioritert" },
        { key: "extra", value: extraCount, color: statusPieColors["Lagt til ekstra fagområde"], label: "Lagt til ekstra fagområde", legend: "lagt til ekstra fagområde" },
        { key: "moved", value: movedCount, color: statusPieColors["Flyttet til nytt fagområde"], label: "Flyttet til nytt fagområde", legend: "flyttet" },
        { key: "missing", value: missingCount, color: statusPieColors["Manglet fagområde"], label: "Manglet fagområde", legend: "manglet" },
      ])}
    </div>
  );
}

const subcategoryReasons: Record<string, string> = {
  "Finans, økonomi og regnskap › Bedriftsøkonomi": "Brede økonomi- og administrasjonsstudier som gir en grunnleggende forståelse av hvordan virksomheter drives økonomisk.",
  "Finans, økonomi og regnskap › Bærekraftig finans": "Skilt ut fra Finans og investering fordi bærekraft og finans er et eget, voksende tema med egne kurs.",
  "Finans, økonomi og regnskap › Finans og investering": "Kjernen i finansfaget: verdsettelse, investering og finansiell analyse.",
  "Finans, økonomi og regnskap › Finansiell kriminalitet og compliance": "Tverrgående tema som gjør kurs om økonomisk kriminalitet i finansnæringen lette å finne, selv om de har Juss som hovedfagområde.",
  "Finans, økonomi og regnskap › Fintech": "Tverrgående tema mellom finans og teknologi. Studiene og kursene har KI, digitalisering og analytics som hovedfagområde, men skal også være lette å finne under Finans.",
  "Finans, økonomi og regnskap › Logistikk og forsyningskjeder": "Handler om hvordan varer og tjenester flyttes og styres gjennom verdikjeden, fra innkjøp og lager til transport og drift (supply chain management). Det er et operativt fag om flyt og effektivitet, mens de andre underkategoriene i Finans handler om penger, regnskap og investering. Master in Business-majoren i logistikk ligger her.",
  "Finans, økonomi og regnskap › Regnskap og revisjon": "Regnskap er et eget yrkesløp med revisor og regnskapsfører, og skal være synlig i både navn og underkategori.",
  "Finans, økonomi og regnskap › Samfunnsøkonomi": "Teoretisk og analytisk økonomi, som mikroøkonomi og matematikk for økonomer, skiller seg fra de bedriftsrettede temaene.",
  "Finans, økonomi og regnskap › Økonomistyring": "Skilt ut fra Bedriftsøkonomi fordi budsjettering, prestasjonsstyring og beslutningsstøtte er et eget tema som ledere søker etter.",
  "HR og organisasjonsutvikling › Arbeidsmiljø": "Samler kurs om motivasjon, arbeidsglede og HMS, som handler om hvordan folk har det på jobb.",
  "HR og organisasjonsutvikling › Endringsledelse": "Egen inngang for endringsarbeid og omstilling, et tema mange leter etter.",
  "HR og organisasjonsutvikling › HR og personalledelse": "Kjernen i HR: rekruttering, onboarding og oppfølging av ansatte.",
  "HR og organisasjonsutvikling › Organisasjonspsykologi": "Eget fagfelt om atferd og samspill i organisasjoner.",
  "Helse, skole og barnehage › Helse": "Ledelse i helse- og omsorgstjenesten er en egen bransje med egne behov og målgruppe.",
  "Helse, skole og barnehage › Skole og barnehage": "Rektor- og styrerutdanning og pedagogisk ledelse har en annen målgruppe enn helse.",
  "Juss, skatt og eiendom › Arbeidsrett": "Eget rettsområde som er viktig for både HR og ledere.",
  "Juss, skatt og eiendom › Compliance": "Regelverk, personvern og risikostyring er et tema som trenger en egen oversikt.",
  "Juss, skatt og eiendom › Eiendomsmegling": "Egen yrkesutdanning for eiendomsmeglere.",
  "Juss, skatt og eiendom › Forretningsjus og rettsvitenskap": "Generell juss for næringslivet, fra rettsvitenskap til foretaksrett.",
  "Juss, skatt og eiendom › Skatt og avgift": "Skatt og avgift var gjemt rundt på flere fagområder, og er nå samlet og synlig.",
  "KI, digitalisering og analytics › Ansvarlig KI og personvern": "Etikk, regulering og personvern i bruk av KI er et eget tema som skiller seg fra de tekniske kursene.",
  "KI, digitalisering og analytics › Data science og analytics": "Dataanalyse og maskinlæring i forretning, med egne metoder og verktøy.",
  "KI, digitalisering og analytics › Digital transformasjon": "Hvordan virksomheter omstiller seg digitalt, med mer vekt på organisasjon og strategi enn teknikk.",
  "KI, digitalisering og analytics › KI": "KI er hovedtema for flest studier og kurs, og fortjener en egen inngang.",
  "KI, digitalisering og analytics › Statistikk og metode": "Grunnleggende metodefag som brukes på tvers av fagområdene.",
  "Ledelse › Generell ledelse og lederutdanning": "Brede lederutdanninger som ikke passer i et bestemt tema, og som er inngangen for de fleste ledere.",
  "Ledelse › Helse-, skole- og barnehageledelse": "Tverrgående tema: ledelse i helse og skole har Helse, skole og barnehage som hovedfagområde, men skal også kunne finnes under Ledelse.",
  "Ledelse › Endringsledelse": "Tverrgående tema: endringsledelse har HR og organisasjonsutvikling som hovedfagområde, men er også ledelse.",
  "Ledelse › Lederferdigheter og kommunikasjon": "Personlig lederutvikling som forhandling, coaching, påvirkning og ledertrening.",
  "Ledelse › Medarbeiderledelse og arbeidsmiljø": "Tverrgående tema: å lede og følge opp medarbeidere har HR og organisasjonsutvikling som hovedfagområde, men er også ledelse.",
  "Ledelse › Prosjektledelse": "Var tidligere et eget fagområde, men var for lite og hører hjemme i Ledelse.",
  "Ledelse › Sikkerhets- og beredskapsledelse": "Tverrgående tema: sikkerhetsledelse har Sikkerhet og beredskap som hovedfagområde, men er også ledelse.",
  "Ledelse › Strategisk ledelse": "Ledelse på toppnivå, som styrearbeid, strategi og prestasjonsstyring.",
  "Ledelse › Teamledelse og prestasjon": "Å lede team og skape prestasjon, skilt ut fra Team-, medarbeider- og endringsledelse som var for bredt.",
  "Markedsføring, kommunikasjon og kultur › Kommunikasjon": "Kommunikasjon er et eget fag, ikke bare en del av markedsføring.",
  "Markedsføring, kommunikasjon og kultur › Kultur og internasjonal business": "Internasjonal profil er en egenskap ved studiene og kursene, ikke et fagområde. Det som handler om kultur og internasjonal forståelse samles her.",
  "Markedsføring, kommunikasjon og kultur › Kunde- og markedsinnsikt": "Forbrukerpsykologi, kunderelasjoner og metode for å forstå kunder og marked.",
  "Markedsføring, kommunikasjon og kultur › Markedsføring": "Kjernen i fagområdet, og den største underkategorien.",
  "Sikkerhet og beredskap › Beredskap og krisehåndtering": "Å forberede seg på og håndtere kriser, terror og det uventede.",
  "Sikkerhet og beredskap › Sikkerhetsledelse og cybersikkerhet": "Sikkerhetsledelse og digital sikkerhet for ledere.",
  "Strategi, innovasjon og bærekraft › Bærekraft": "Bærekraft går på tvers av alle fagområder, og mange studier og kurs har det som ekstra fagområde.",
  "Strategi, innovasjon og bærekraft › Innovasjon og entreprenørskap": "Nyskaping, forretningsutvikling og entreprenørskap er et eget tema med egne kurs.",
  "Strategi, innovasjon og bærekraft › Strategi": "Strategi er et bredt tema som går på tvers, og få har det som hovedtema, men mange berører det.",
};

// Fagområder med like mange underkategorier står ved siden av hverandre.
const subcategoryLayout: string[][][] = [
  [["Finans, økonomi og regnskap"], ["Ledelse"]],
  [["Juss, skatt og eiendom"], ["KI, digitalisering og analytics"]],
  [["HR og organisasjonsutvikling"], ["Markedsføring, kommunikasjon og kultur"]],
  [["Strategi, innovasjon og bærekraft"], ["Helse, skole og barnehage", "Sikkerhet og beredskap"]],
];

function SubcategorySlide() {
  const { subs } = beforeAfter;
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <p style={{ margin: 0, color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.9375rem", maxWidth: 820 }}>
        Alle underkategoriene, med begrunnelse for hvorfor de bør være en underkategori. Tallet viser antall studier og kurs som har underkategorien som hovedplassering, pluss ekstra.
      </p>
      <div style={{ display: "grid", gap: 16 }}>
        {subcategoryLayout.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 16, alignItems: "start" }}>
            {row.map((cell, cellIndex) => (
              <div key={cellIndex} style={{ display: "grid", gap: 16 }}>
        {cell.map((area) => {
          const entries = [...(subs.get(area) ?? [])].sort((x, y) => y[1].main + y[1].extra - (x[1].main + x[1].extra) || x[0].localeCompare(y[0], "nb"));
          return (
            <div key={area} style={{ background: "var(--bi-basic-white)", border: "1px solid var(--bi-color-neutral-stroke-subtle)", borderLeft: `4px solid ${areaColor(area)}`, borderRadius: 8, padding: 16 }}>
              <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, marginBottom: 10 }}>
                <strong style={{ color: "var(--bi-color-primary-text-accent)" }}>{area}</strong>
                <span style={{ color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.8125rem" }}>{entries.length} underkategorier</span>
              </div>
              <div style={{ display: "grid", gap: 10 }}>
                {entries.map(([name, value]) => (
                  <div key={name} style={{ display: "grid", gap: 2 }}>
                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, fontSize: "0.9375rem" }}>
                      <strong>{name}</strong>
                      <span style={{ color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.8125rem", whiteSpace: "nowrap" }}>
                        {value.main}
                        {value.extra > 0 && ` + ${value.extra}`}
                      </span>
                    </div>
                    <div style={{ color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.9375rem" }}>{subcategoryReasons[`${area} › ${name}`]}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function CrossCuttingSlide() {
  const crossCutting = [...beforeAfter.subs]
    .flatMap(([area, map]) => [...map].filter(([, value]) => value.main === 0 && value.extra > 0).map(([name, value]) => ({ area, name, count: value.extra })))
    .sort((x, y) => y.count - x.count);
  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 820 }}>
      <p style={{ margin: 0, color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.9375rem" }}>{`${crossCutting.length} underkategorier har ingen studier som hovedplassering, bare ekstra. De gjør at temaer som går på tvers, som fintech og ledelse i helse, kan finnes samlet.`}</p>
      <div style={{ display: "grid", gap: 6 }}>
        {crossCutting.map(({ area, name, count }) => (
          <div key={`${area}|${name}`} style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 24px", gap: 8, alignItems: "center", fontSize: "0.9375rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <span style={{ padding: "2px 8px", borderRadius: 4, background: "var(--bi-basic-white)", border: "1px solid var(--bi-color-neutral-stroke-subtle)", borderLeft: "4px solid #6196f4" }}>{name}</span>
              <span style={{ color: "var(--bi-color-neutral-text-secondary)" }}>i {area}</span>
            </div>
            <strong style={{ textAlign: "right" }}>{count}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

const renamedPairs = [
  { from: "Finans, økonomi og styring", to: "Finans, økonomi og regnskap", why: "«Styring» var tvetydig (økonomistyring eller ledelse?). Regnskap er et eget yrkesløp med revisor og regnskapsfører, og er nå synlig i navnet." },
  { from: "Digitalisering og Analytics", to: "KI, digitalisering og analytics", why: "Mange studier og kurs har KI som hovedtema så det bør inkluderes i tittelen til fagområde." },
  { from: "Organisasjonsutvikling og Human Resource Management", to: "HR og organisasjonsutvikling", why: "HR er et mer vanlig begrep i Norge enn «Human Resource Management», og det folk flest søker etter. HR er også den største underkategorien, og står derfor først i navnet." },
  { from: "Eiendom, varehandel og forretningsjus", to: "Juss, skatt og eiendom", why: "Skatt og avgift er synlig i navnet, før var det gjemt rundt på flere fagområder. Forretningsjus har blitt til kun juss siden det er mer enn kun forretningsjus i fagområdet." },
];

const whyRenamed = (from: string) => renamedPairs.find((pair) => pair.from === from)?.why;

function WhyBetter() {
  const { before, after, extras, subs, withSeveral, withoutArea } = beforeAfter;
  const { total, maxCount, percent } = beforeAfterScale();
  return (() => {
          const withOne = total - withoutArea - withSeveral;
          const ledelseSubs = [...(subs.get("Ledelse") ?? [])].filter(([, v]) => v.main + v.extra > 0).sort((x, y) => y[1].main + y[1].extra - (x[1].main + x[1].extra));
          const ledelseNow = ledelseSubs.reduce((sum, [, v]) => sum + v.main + v.extra, 0);
          const HRNAME = "Organisasjonsutvikling og Human Resource Management";
          const HRNEW = "HR og organisasjonsutvikling";
          const bothBefore = summaryRows.filter((row) => row[4].split("; ").includes("Ledelse") && row[4].split("; ").includes(HRNAME)).length;
          const onlyLedelseBefore = summaryRows.filter((row) => row[4].split("; ").includes("Ledelse") && !row[4].split("; ").includes(HRNAME)).length;
          const onlyHrBefore = summaryRows.filter((row) => !row[4].split("; ").includes("Ledelse") && row[4].split("; ").includes(HRNAME)).length;
          const touches = (row: Row, area: string) => row[6].split("; ").some((entry) => entryArea(entry) === area);
          const ledelseWithHr = summaryRows.filter((row) => row[0] === "Ledelse" && touches(row, HRNEW)).length;
          const ledelseOnly = summaryRows.filter((row) => row[0] === "Ledelse" && !touches(row, HRNEW)).length;
          const hrWithLedelse = summaryRows.filter((row) => row[0] === HRNEW && touches(row, "Ledelse")).length;
          const hrOnly = summaryRows.filter((row) => row[0] === HRNEW && !touches(row, "Ledelse")).length;
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
                {labelled("Nå", barWithLegend(missingParts.map(([area, value], index) => ({ key: area, value, color: blueShades[index % blueShades.length], label: area }))))}
                <div style={{ fontWeight: 700, marginTop: 8 }}>Bransjekategorier for B2B</div>
                <p style={{ margin: 0, color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.9375rem" }}>{`${industryTotal} studier og kurs er rettet mot en bestemt bransje. De kan finnes via bransjefilteret og en etikett, uten at bransjen er et eget fagområde.`}</p>
                {labelled("Før", <span style={{ lineHeight: "14px" }}>Hadde ikke bransjekategori</span>)}
                {labelled("Nå", barWithLegend(industryParts.map(([name, value], index) => ({ key: name, value, color: blueShades[index % blueShades.length], label: name }))))}
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
                <p style={{ margin: 0, color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.9375rem" }}>{"Fire fagområder har fått navn som beskriver innholdet bedre, «Offentlig sektor» er delt opp, og to små fagområder er blitt underkategorier."}</p>
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
                      to: ["Markedsføring, kommunikasjon og kultur › Kultur og internasjonal business", "Ledelse", "Finans, økonomi og regnskap"],
                      why: "Internasjonal profil er en egenskap ved studiene og kursene, ikke et fagområde. Internasjonal Business var for lite til å være et eget fagområde og var spredt på mange temaer. Studiene og kursene er nå plassert i tre fagområder, og Kultur og internasjonal business er en underkategori.",
                    },
                    {
                      from: "Prosjektledelse",
                      to: ["Ledelse › Prosjektledelse"],
                      why: "Var for lite til å være et eget fagområde og hører hjemme i Ledelse. Er nå en underkategori.",
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
                  const masterCourses = summaryRows.filter((row) => row[3] === "Masterkurs");
                  const byTitle = [...masterCourses].sort((x, y) => x[2].localeCompare(y[2], "nb"));
                  const groups = [...new Set(masterCourses.map((row) => row[0]))]
                    .sort((x, y) => x.localeCompare(y, "nb"))
                    .map((area) => ({ area, list: masterCourses.filter((row) => row[0] === area).sort((x, y) => x[2].localeCompare(y[2], "nb")) }));
                  const listStyle = { margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 4, fontSize: "0.9375rem", color: "var(--bi-color-neutral-text)" } as const;
                  return (
                    <div style={{ display: "grid", gap: 12, marginTop: 8 }}>
                      <div style={{ fontWeight: 700 }}>Eksempel: masterkurs, deltid ({masterCourses.length})</div>
                      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.3fr)", gap: 32, alignItems: "start" }}>
                        <div style={{ display: "grid", gap: 8 }}>
                          <div style={{ color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.8125rem" }}>Før: én lang liste</div>
                          <ul style={listStyle}>
                            {byTitle.map((row, rowIndex) => (
                              <li key={`${row[2]}-${rowIndex}`}>{row[2]}</li>
                            ))}
                          </ul>
                        </div>
                        <div style={{ display: "grid", gap: 14 }}>
                          <div style={{ color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.8125rem" }}>Nå: samme liste, gruppert etter hovedfagområde</div>
                          {groups.map(({ area, list }, groupIndex) => (
                            <div key={area} style={{ borderLeft: `4px solid ${blueShades[groupIndex % blueShades.length]}`, paddingLeft: 12, display: "grid", gap: 6 }}>
                              <div style={{ fontWeight: 700 }}>
                                {area} <span style={{ color: "var(--bi-color-neutral-text-secondary)", fontWeight: 400 }}>({list.length})</span>
                              </div>
                              <ul style={listStyle}>
                                {list.map((row, rowIndex) => (
                                  <li key={`${row[2]}-${rowIndex}`}>{row[2]}</li>
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
                  const exampleArea = "Ledelse";
                  const areaRows = summaryRows.filter((row) => row[4].split("; ").includes(exampleArea));
                  const subOf = (row: Row) => row[6].split("; ").map((entry) => entry.split(" › ")).find(([area]) => area === exampleArea)?.[1];
                  const byTitle = [...areaRows].sort((x, y) => x[2].localeCompare(y[2], "nb"));
                  const groups = [...new Set(areaRows.map(subOf).filter((sub): sub is string => Boolean(sub)))]
                    .sort((x, y) => x.localeCompare(y, "nb"))
                    .map((sub) => ({ sub, list: areaRows.filter((row) => subOf(row) === sub).sort((x, y) => x[2].localeCompare(y[2], "nb")) }));
                  const listStyle = { margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 4, fontSize: "0.9375rem", color: "var(--bi-color-neutral-text)" } as const;
                  const mainNote = (row: Row) => (row[0] === exampleArea ? null : <span style={{ color: "var(--bi-color-neutral-text-secondary)" }}> (ekstra fagområde)</span>);
                  return (
                    <div style={{ display: "grid", gap: 12, marginTop: 8 }}>
                      <div style={{ fontWeight: 700 }}>Eksempel: alle som lå i {exampleArea} før ({areaRows.length})</div>
                      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.3fr)", gap: 32, alignItems: "start" }}>
                        <div style={{ display: "grid", gap: 8 }}>
                          <div style={{ color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.8125rem" }}>Før: én lang liste</div>
                          <ul style={listStyle}>
                            {byTitle.map((row, rowIndex) => (
                              <li key={`${row[2]}-${rowIndex}`}>{row[2]}</li>
                            ))}
                          </ul>
                        </div>
                        <div style={{ display: "grid", gap: 14 }}>
                          <div style={{ color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.8125rem" }}>Nå: samme studier og kurs, gruppert etter underkategori</div>
                          {groups.map(({ sub, list }, groupIndex) => (
                            <div key={sub} style={{ borderLeft: `4px solid ${blueShades[groupIndex % blueShades.length]}`, paddingLeft: 12, display: "grid", gap: 6 }}>
                              <div style={{ fontWeight: 700 }}>
                                {sub} <span style={{ color: "var(--bi-color-neutral-text-secondary)", fontWeight: 400 }}>({list.length})</span>
                              </div>
                              <ul style={listStyle}>
                                {list.map((row, rowIndex) => (
                                  <li key={`${row[2]}-${rowIndex}`}>
                                    {row[2]}
                                    {mainNote(row)}
                                  </li>
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
              title: "Ledelse samler all ledelse",
              content: (
              <div style={{ display: "grid", gap: 12, maxWidth: 820 }}>
                <p style={{ margin: 0, color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.9375rem" }}>{`Ledelse har ${areaMain("Ledelse")} studier og kurs som hovedfagområde og ${areaExtra("Ledelse")} til som ekstra, fra fag der ledelse er en viktig del. Den som leter i Ledelse, finner dem alle.`}</p>
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
                    { key: "lo", value: ledelseOnly, color: "#0b4db4", label: "Ledelse" },
                    { key: "lh", value: ledelseWithHr, color: "#6196f4", label: "Ledelse, med HR som ekstra fagområde" },
                    { key: "hl", value: hrWithLedelse, color: "#c5d9f7", label: "HR, med Ledelse som ekstra fagområde" },
                    { key: "ho", value: hrOnly, color: "#9ec0f1", label: "HR" },
                  ]),
                )}
                <div style={{ fontWeight: 700, marginTop: 8 }}>Tre eksempler: før og nå</div>
                <BeforeAfterExamples />
              </div>
              ),
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

function SearchTest() {
  const [order, setOrder] = useState(() => shuffleIndexes(rows.length));
  const [position, setPosition] = useState(0);
  const [picks, setPicks] = useState<Record<number, { area?: string; sub?: string }>>({});
  const normalizeTitle = (text: string) => text.replace(/\u00ad|\(-\)/g, "");

  const rowIndex = order[position];
  const row = rows[rowIndex];
  const title = normalizeTitle(row[2]);
  const sameName = rows.filter((candidate) => normalizeTitle(candidate[2]) === title);
  const entries = [...new Set(sameName.flatMap((candidate) => candidate[6].split("; ")))];
  const mainEntries = new Set(sameName.map((candidate) => candidate[6].split("; ")[0]));
  const previous = [...new Set(sameName.flatMap((candidate) => candidate[4].split("; ").filter((p) => p !== "–")))];
  const pick = picks[rowIndex] ?? {};
  const areaOptions = overlapOrder;
  const subOptions = pick.area ? [...(beforeAfter.subs.get(pick.area)?.keys() ?? [])].sort((x, y) => x.localeCompare(y, "nb")) : [];
  const kindOf = (entry: string) => (mainEntries.has(entry) ? "main" : entries.includes(entry) ? "extra" : "none");
  const areaKind = (area: string) => (sameName.some((candidate) => candidate[0] === area) ? "main" : entries.some((entry) => entryArea(entry) === area) ? "extra" : "none");

  const answered = Object.entries(picks).filter(([, value]) => value.area && value.sub);
  const score = answered.reduce(
    (sum, [key, value]) => {
      const candidate = rows[Number(key)];
      const name = normalizeTitle(candidate[2]);
      const set = rows.filter((other) => normalizeTitle(other[2]) === name).flatMap((other) => other[6].split("; "));
      return {
        area: sum.area + (set.some((entry) => entryArea(entry) === value.area) ? 1 : 0),
        sub: sum.sub + (set.includes(`${value.area} › ${value.sub}`) ? 1 : 0),
      };
    },
    { area: 0, sub: 0 },
  );

  const optionStyle = (state: "idle" | "main" | "extra" | "bad" | "dim", selected: boolean) => ({
    padding: "8px 12px",
    borderRadius: "var(--bi-radius-large)",
    border: selected ? "2px solid var(--bi-color-primary-stroke-accent)" : "1px solid var(--bi-color-neutral-stroke)",
    background:
      state === "main"
        ? "var(--bi-color-success-surface-strong)"
        : state === "extra"
          ? "var(--bi-color-success-surface)"
          : state === "bad"
            ? "var(--bi-color-alert-surface-strong)"
            : "var(--bi-color-neutral-surface-subtle)",
    color: state === "dim" ? "var(--bi-neutral-40)" : "var(--bi-color-neutral-text)",
    cursor: "pointer",
    font: "inherit",
    fontSize: "0.875rem",
    textAlign: "left" as const,
  });
  const nextRandom = () => {
    if (position < order.length - 1) setPosition(position + 1);
    else {
      setOrder(shuffleIndexes(rows.length));
      setPosition(0);
    }
  };
  const done = Boolean(pick.area && pick.sub);

  return (
    <div style={{ background: "var(--bi-color-neutral-surface)", borderRadius: "var(--bi-radius-xl)", padding: 28 }}>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 16, marginBottom: 12 }}>
        <div>
          <div style={{ color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.8125rem" }}>
            Studie eller kurs {position + 1} av {order.length}
          </div>
          <div style={{ fontWeight: 700, fontSize: "1.25rem" }}>Hvor finner du «{title}»?</div>
        </div>
        <div style={{ color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.875rem", textAlign: "right" }}>
          <div>
            Riktig fagområde: <strong>{score.area}</strong> av {answered.length}
          </div>
          <div>
            Riktig underkategori: <strong>{score.sub}</strong> av {answered.length}
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 24, alignItems: "start", marginBottom: 16 }}>
      <div>
      <div style={{ fontWeight: 600, marginBottom: 6 }}>1. Velg fagområde</div>
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: 6 }}>
        {areaOptions.map((area) => {
          const chosen = pick.area === area;
          const kind = areaKind(area);
          const state = done ? (kind === "main" ? "main" : kind === "extra" ? "extra" : chosen ? "bad" : "dim") : "idle";
          return (
            <button
              key={area}
              type="button"
              disabled={done}
              onClick={() => setPicks((current) => ({ ...current, [rowIndex]: { area } }))}
              style={optionStyle(state, chosen)}
            >
              {done && kind === "main" ? <span style={{ color: "var(--bi-primary-50)", fontWeight: 700 }}>* </span> : null}
              {area}
            </button>
          );
        })}
      </div>

      </div>
      <div>
      {pick.area ? (
        <>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>2. Velg underkategori i {areaShortName[pick.area]}</div>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: 6 }}>
            {subOptions.map((sub) => {
              const chosen = pick.sub === sub;
              const kind = kindOf(`${pick.area} › ${sub}`);
              const state = done ? (kind === "main" ? "main" : kind === "extra" ? "extra" : chosen ? "bad" : "dim") : "idle";
              return (
                <button
                  key={sub}
                  type="button"
                  disabled={done}
                  onClick={() => setPicks((current) => ({ ...current, [rowIndex]: { ...current[rowIndex], sub } }))}
                  style={optionStyle(state, chosen)}
                >
                  {done && kind === "main" ? <span style={{ color: "var(--bi-primary-50)", fontWeight: 700 }}>* </span> : null}
                  {sub}
                </button>
              );
            })}
          </div>
        </>
      ) : (
        <div style={{ color: "var(--bi-color-neutral-text-secondary)", fontSize: "0.875rem", paddingTop: 4 }}>2. Underkategoriene vises når du har valgt fagområde.</div>
      )}
      </div>
      </div>

      {done && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 32, borderTop: "1px solid var(--bi-color-neutral-stroke)", paddingTop: 16 }}>
          <div>
            <div style={{ fontWeight: 700, color: "var(--bi-color-neutral-text-secondary)", marginBottom: 8 }}>Før (bi.no i dag)</div>
            {previous.length === 0 ? (
              <p style={{ margin: 0, color: "var(--bi-color-neutral-text)" }}>Manglet fagområde. Det kunne ikke finnes via fagområde.</p>
            ) : (
              <>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 6 }}>
                  {previous.map((name) => (
                    <AreaPill key={name} label={shortOldName(name)} kind={oldAreaCatalog[name]?.kind === "removed" ? "removed" : "old"} />
                  ))}
                </div>
                <p style={{ margin: 0, color: "var(--bi-color-neutral-text)", fontSize: "0.875rem" }}>
                  {previous.length === 1 ? "Lå i ett fagområde, uten underkategori." : `Lå i ${previous.length} fagområder uten prioritet og uten underkategori.`}
                </p>
              </>
            )}
          </div>
          <div>
            <div style={{ fontWeight: 700, color: "var(--bi-color-primary-text-accent)", marginBottom: 8 }}>Nå (forslaget)</div>
            {row[6].split("; ").map((entry, index) => (
              <div key={entry} style={{ marginBottom: 8 }}>
                <AreaWithSubcategory area={entryArea(entry)} subcategory={entrySub(entry)} muted={index > 0} />
              </div>
            ))}
            <div style={{ marginBottom: 10 }}>
              <SuggestedTitle row={row} />
            </div>
            <div style={{ background: "var(--bi-color-primary-background)", borderRadius: "var(--bi-radius-large)", padding: 12, margin: "0 0 10px", fontSize: "0.875rem", color: "var(--bi-color-neutral-text)" }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>Hvorfor ligger det her?</div>
              {row[7] && <p style={{ margin: "0 0 6px" }}>{row[7]}</p>}
              {row[6].split("; ").some((entry) => entryArea(entry) !== row[0]) && (
                <p style={{ margin: "0 0 6px" }}>
                  <strong>Ekstra:</strong> temaet overlapper også med{" "}
                  {[...new Set(row[6].split("; ").filter((entry) => entryArea(entry) !== row[0]).map((entry) => areaShortName[entryArea(entry)]))].join(" og ")}, så{" "}
                  {row[3].toLowerCase().includes("kurs") ? "kurset" : "studiet"} kan også finnes der.
                </p>
              )}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
                {row[1].map((status) => (
                  <StatusBadge key={status} status={status} wide />
                ))}
              </div>
            </div>
            <p style={{ margin: 0, color: "var(--bi-color-neutral-text)", fontSize: "0.875rem" }}>
              {areaKind(pick.area ?? "") === "none"
                ? "Du valgte et fagområde der kurset ikke ligger."
                : areaKind(pick.area ?? "") === "main"
                  ? "Du valgte hovedfagområdet (*)."
                  : "Du valgte et ekstra fagområde."}{" "}
              {kindOf(`${pick.area} › ${pick.sub}`) === "none" ? "Underkategorien var ikke riktig." : kindOf(`${pick.area} › ${pick.sub}`) === "main" ? "Underkategorien er hovedkategorien." : "Underkategorien er en ekstra plassering."}
            </p>
          </div>
        </div>
      )}

      {done && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: 28 }}>
          <Button size="large" variant="filled" onClick={nextRandom}>
            Gi meg en til!
          </Button>
        </div>
      )}
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

export default function Result() {
  const [query, setQuery] = useState("");
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
        <h2 id="soketest" style={{ scrollMarginTop: 16, margin: "0 0 12px", fontFamily: "var(--bi-font-family-brand)", fontSize: "2rem", lineHeight: 1.2, color: "var(--bi-color-primary-text)" }}>Søketest: Finner du studiet/kurset?</h2>
        <SearchTest />
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
              title: "Fagområder uten endring i navn",
              content: (
        <ChangeGroup>
          <ChangeRow
            from="Ledelse"
            fromKind="same"
            equal
            to={[{ label: "Ledelse", count: areaCount("Ledelse") }]}
            toKind="same"
          />
          <ChangeRow
            from="Strategi, innovasjon og bærekraft"
            fromKind="same"
            equal
            to={[{ label: "Strategi, innovasjon og bærekraft", count: areaCount("Strategi, innovasjon og bærekraft") }]}
            toKind="same"
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
                note: `${originNote("Helse, skole og barnehage")} «Juss for ledere» ligger her, med Juss, skatt og eiendom og Ledelse som ekstra.`,
              },
              { label: "Sikkerhet og beredskap", count: areaCount("Sikkerhet og beredskap"), note: originNote("Sikkerhet og beredskap") },
              {
                label: "Juss, skatt og eiendom",
                count: areaCount("Juss, skatt og eiendom"),
                note: `${originNote("Juss, skatt og eiendom")} Skatt- og avgiftskursene ligger her.`,
              },
            ]}
          />
          <ChangeRow
            from="Prosjektledelse"
            fromKind="removed"
            arrowColor="#e41100"
            to={[{ label: "Ledelse › Prosjektledelse (underkategori)" }]}
            note="Slått sammen med Ledelse."
          />
          <ChangeRow
            from="Internasjonal Business"
            fromKind="removed"
            arrowColor="#e41100"
            to={[
              { label: "Markedsføring, kommunikasjon og kultur › Kultur og internasjonal business" },
              { label: "Ledelse" },
              { label: "Finans, økonomi og regnskap" },
            ]}
            note="De fem studiene og kursene er fordelt på tre fagområder. Internasjonal profil er en egenskap ved kurset og ikke et fagområde."
          />
        </ChangeGroup>
              ),
            },
            {
              title: "Underkategorier og begrunnelse",
              content: <SubcategorySlide />,
            },
            {
              title: "Tverrgående temaer har egne underkategorier",
              content: <CrossCuttingSlide />,
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
            {
              title: "Status",
              content: (
        <StatusPie rows={summaryRows} />
              ),
            },
            {
              title: "Eksempler: helseledelse og lignende",
              content: <BeforeAfterExamples examples={sectorLeadershipExamples} />,
            },
          ]}
        />
        </div>

        <div style={summaryBox}>
        <WhyBetter />
        </div>

        <div style={summaryBox}>
        <Carousel
          heading={<h3 id="oversikt-endringer" style={{ ...summaryPartHeading, margin: 0 }}>Hvordan ser fordelingen ut?</h3>}
          slides={[
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
                    <span style={{ flex: "0 0 280px", whiteSpace: "nowrap" }}>{name}</span>
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
          <option value="">Alle nivåer</option>
          {levels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </Selectfield>
        <Selectfield fullwidth label="Bransje" value={industryFilter} onChange={(event) => setIndustryFilter(event.target.value)}>
          <option value="">Alle bransjer</option>
          {industries.map((industry) => (
            <option key={industry} value={industry}>
              {industry}
            </option>
          ))}
        </Selectfield>
        <Selectfield fullwidth label="Tidligere fagområde" value={previousFilter} onChange={(event) => setPreviousFilter(event.target.value)}>
          <option value="">Alle tidligere fagområder</option>
          {previousAreas.map((previous) => (
            <option key={previous} value={previous}>
              {previous === "–" ? "Manglet fagområde" : previous}
            </option>
          ))}
        </Selectfield>
        <Selectfield fullwidth label="Fagområde" value={areaFilter} onChange={(event) => setAreaFilter(event.target.value)}>
          <option value="">Alle fagområder</option>
          {areas.map((area) => (
            <option key={area} value={area}>
              {area}
            </option>
          ))}
        </Selectfield>
        <Selectfield fullwidth label="Underkategori" value={subcategoryFilter} onChange={(event) => setSubcategoryFilter(event.target.value)}>
          <option value="">Alle underkategorier</option>
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
          <option value="">Alle statuser</option>
          {statusOrder.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </Selectfield>
      </div>

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
                  <h2 id={areaAnchor(area)} style={{ scrollMarginTop: 16, margin: 0, fontFamily: "var(--bi-font-family-brand)", fontSize: "1.5rem", color: "var(--bi-color-primary-text)" }}>
                    {area}
                  </h2>
                </td>
              </tr>
              {visibleRows.map((row, index) => {
                const [, statuses, title, level, previous, , subcategories, reason, , industry] = row;
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
                    <td style={{ ...cell, fontSize: "0.8125rem", color: "var(--bi-color-neutral-text-secondary)" }}>
                      {reason}
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
