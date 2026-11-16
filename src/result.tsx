// --- generert kode ---
import { Fragment, useState } from "react";
import { Badge, Search, Selectfield } from "@bi-digital/react";

type Status =
  | "Uendret"
  | "Endret navn på fagområde"
  | "1 fagområde prioritert"
  | "Manglet fagområde"
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
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Digital økonomistyring", "Bachelorkurs", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Økonomistyring", "Handler om bedriftsøkonomi, budsjett og beslutningsstøtte, eller er en bred økonomiutdanning.", false, "–", true],
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
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Prestasjonsstyring", "Bachelorkurs", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Økonomistyring", "Handler om bedriftsøkonomi, budsjett og beslutningsstøtte, eller er en bred økonomiutdanning.", false, "–", true],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Regnskapsføring i næring", "Bachelorkurs", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Regnskap og revisjon", "Handler om regnskap, bokføring eller revisjon.", false, "–", true],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Samfunnsøkonomi I", "Bachelorkurs", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Samfunnsøkonomi", "Handler om økonomisk teori og samfunnsøkonomi.", false, "–", true],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Samfunnsøkonomi II", "Bachelorkurs", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Samfunnsøkonomi", "Handler om økonomisk teori og samfunnsøkonomi.", false, "–", true],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Strategisk økonomistyring", "Bachelorkurs", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Økonomistyring", "Handler om bedriftsøkonomi, budsjett og beslutningsstøtte, eller er en bred økonomiutdanning.", false, "–", true],
  ["Finans, økonomi og regnskap", ["1 fagområde prioritert", "Fagområde fjernet"], "Styrekompetanse", "Bachelorkurs", "Finans, økonomi og styring; Organisasjonsutvikling og Human Resource Management", "–", "Finans, økonomi og regnskap › Bedriftsøkonomi", "Handler om styrearbeid, eierstyring og governance.", false, "–", false],
  ["Finans, økonomi og regnskap", ["1 fagområde prioritert", "Fagområde fjernet"], "Business", "Master", "Finans, økonomi og styring; Ledelse; Markedsføring, kommunikasjon og kultur; Organisasjonsutvikling og Human Resource Management; Eiendom, varehandel og forretningsjus; Strategi, innovasjon og bærekraft", "Markedsføring, kommunikasjon og kultur; Strategi, innovasjon og bærekraft; Ledelse; HR og organisasjonsutvikling", "Finans, økonomi og regnskap › Bedriftsøkonomi; Markedsføring, kommunikasjon og kultur › Markedsføring; Strategi, innovasjon og bærekraft › Strategi; Ledelse › Generell ledelse og lederutdanning; HR og organisasjonsutvikling › HR og personalledelse", "Handler om bedriftsøkonomi, budsjett og beslutningsstøtte, eller er en bred økonomiutdanning.", false, "–", false],
  ["Finans, økonomi og regnskap", ["1 fagområde prioritert"], "Bærekraft og finans", "Master", "Finans, økonomi og styring; Strategi, innovasjon og bærekraft", "Strategi, innovasjon og bærekraft", "Finans, økonomi og regnskap › Bærekraftig finans; Strategi, innovasjon og bærekraft › Bærekraft", "Handler om finans og investering, med bærekraft som tema.", true, "–", false],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Finans", "Master", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Finans og investering", "Handler om finans, investering, bank eller finansnæringen.", false, "–", false],
  ["Finans, økonomi og regnskap", ["1 fagområde prioritert", "Fagområde fjernet"], "Major in Accounting and Business Control", "Master", "Finans, økonomi og styring; Strategi, innovasjon og bærekraft", "–", "Finans, økonomi og regnskap › Regnskap og revisjon", "Handler om regnskap, bokføring eller revisjon.", false, "–", false],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Major in Economics", "Master", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Samfunnsøkonomi", "Handler om økonomisk teori og samfunnsøkonomi.", false, "–", false],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Major in Finance", "Master", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Finans og investering", "Handler om finans, investering, bank eller finansnæringen.", false, "–", false],
  ["Finans, økonomi og regnskap", ["1 fagområde prioritert", "Fagområde fjernet"], "Quantitative Finance", "Master", "Finans, økonomi og styring; Digitalisering og Analytics", "–", "Finans, økonomi og regnskap › Finans og investering", "Handler om finans, investering, bank eller finansnæringen.", false, "–", false],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Regnskap og revisjon", "Master", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Regnskap og revisjon", "Handler om regnskap, bokføring eller revisjon.", false, "–", false],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Regnskap og revisjon +1-modellen", "Master", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Regnskap og revisjon", "Handler om regnskap, bokføring eller revisjon.", false, "–", false],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Anvendt økonomi", "Masterkurs", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Samfunnsøkonomi", "Handler om økonomisk teori og samfunnsøkonomi.", false, "–", false],
  ["Finans, økonomi og regnskap", ["1 fagområde prioritert", "Fagområde fjernet"], "Det verdiskapende styret", "Masterkurs", "Finans, økonomi og styring; Strategi, innovasjon og bærekraft", "–", "Finans, økonomi og regnskap › Bedriftsøkonomi", "Handler om styrearbeid, eierstyring og governance.", false, "–", false],
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
  ["Finans, økonomi og regnskap", ["Flyttet til nytt fagområde"], "Marked, kriser og bærekraft", "Bachelorkurs", "Strategi, innovasjon og bærekraft", "Strategi, innovasjon og bærekraft", "Finans, økonomi og regnskap › Samfunnsøkonomi; Strategi, innovasjon og bærekraft › Bærekraft", "Innsikt i markedsøkonomi som økonomisk system.", false, "–", true],
  ["Helse, skole og barnehage", ["Flyttet til nytt fagområde", "Fagområde fjernet"], "Grunnkurs i ledelse og kvalitet i helse- og omsorgstjenesten", "Bachelor", "Offentlig sektor; Organisasjonsutvikling og Human Resource Management", "Ledelse", "Helse, skole og barnehage › Helse; Ledelse › Helse-, skole- og barnehageledelse", "Rettet mot ledere og fagfolk i helsetjenesten.", false, "Helse og omsorg", false],
  ["Helse, skole og barnehage", ["Flyttet til nytt fagområde"], "Helseledelse, kvalitet og utvikling", "Bachelorkurs", "Offentlig sektor", "Ledelse", "Helse, skole og barnehage › Helse; Ledelse › Helse-, skole- og barnehageledelse", "Rettet mot ledere og fagfolk i helsetjenesten.", false, "Helse og omsorg", false],
  ["Helse, skole og barnehage", ["Flyttet til nytt fagområde"], "Ledelse av tjenesteutvikling og innovasjonsprosesser i helsetjenesten", "Bachelorkurs", "Strategi, innovasjon og bærekraft", "Strategi, innovasjon og bærekraft; Ledelse", "Helse, skole og barnehage › Helse; Strategi, innovasjon og bærekraft › Innovasjon og entreprenørskap; Ledelse › Helse-, skole- og barnehageledelse", "Rettet mot ledere og fagfolk i helsetjenesten.", false, "Helse og omsorg", false],
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
  ["HR og organisasjonsutvikling", ["1 fagområde prioritert"], "Organisasjonspsykologi, HR og ledelse", "Bachelor", "Ledelse; Organisasjonsutvikling og Human Resource Management", "Ledelse", "HR og organisasjonsutvikling › Organisasjonspsykologi; Ledelse › Team-, medarbeider- og endringsledelse", "Handler om organisasjonspsykologi og atferd i organisasjoner.", false, "–", false],
  ["HR og organisasjonsutvikling", ["1 fagområde prioritert"], "Arbeidsglede i praksis", "Bachelorkurs", "Ledelse; Organisasjonsutvikling og Human Resource Management", "Ledelse", "HR og organisasjonsutvikling › Arbeidsmiljø; Ledelse › Team-, medarbeider- og endringsledelse", "Handler om arbeidsmiljø, trivsel og arbeidsglede.", false, "–", false],
  ["Strategi, innovasjon og bærekraft", ["Flyttet til nytt fagområde"], "Consulting - Verktøy og teknikker", "Bachelorkurs", "Finans, økonomi og styring", "–", "Strategi, innovasjon og bærekraft › Strategi", "Konsulentverktøy og problemløsning, nær strategi- og analysefaget.", false, "–", true],
  ["HR og organisasjonsutvikling", ["1 fagområde prioritert"], "Endringsledelse i praksis", "Bachelorkurs", "Ledelse; Organisasjonsutvikling og Human Resource Management", "Ledelse", "HR og organisasjonsutvikling › Endringsledelse; Ledelse › Team-, medarbeider- og endringsledelse", "Handler om endring i organisasjoner og rådgivning.", false, "–", false],
  ["HR og organisasjonsutvikling", ["Manglet fagområde"], "HR og personalledelse", "Bachelorkurs", "–", "Ledelse", "HR og organisasjonsutvikling › HR og personalledelse; Ledelse › Generell ledelse og lederutdanning", "Handler om HR og personalarbeid.", false, "–", false],
  ["HR og organisasjonsutvikling", ["1 fagområde prioritert"], "HRM og arbeidsrett", "Bachelorkurs", "Ledelse; Organisasjonsutvikling og Human Resource Management", "Juss, skatt og eiendom; Ledelse", "HR og organisasjonsutvikling › HR og personalledelse; Juss, skatt og eiendom › Arbeidsrett; Ledelse › Team-, medarbeider- og endringsledelse", "Handler om HR og personalarbeid.", false, "–", false],
  ["HR og organisasjonsutvikling", ["1 fagområde prioritert"], "HRM", "Bachelorkurs", "Ledelse; Organisasjonsutvikling og Human Resource Management", "Ledelse", "HR og organisasjonsutvikling › HR og personalledelse; Ledelse › Team-, medarbeider- og endringsledelse", "Handler om HR og personalarbeid.", false, "–", false],
  ["HR og organisasjonsutvikling", ["Flyttet til nytt fagområde"], "Ledelse og endring", "Bachelorkurs", "Ledelse", "Ledelse", "HR og organisasjonsutvikling › Endringsledelse; Ledelse › Team-, medarbeider- og endringsledelse", "Handler om endring i organisasjoner og rådgivning.", false, "–", false],
  ["HR og organisasjonsutvikling", ["Flyttet til nytt fagområde"], "Organisasjonsatferd og ledelse", "Bachelorkurs", "Markedsføring, kommunikasjon og kultur", "Ledelse", "HR og organisasjonsutvikling › Organisasjonspsykologi; Ledelse › Team-, medarbeider- og endringsledelse", "Handler om organisasjonspsykologi og atferd i organisasjoner.", false, "–", true],
  ["HR og organisasjonsutvikling", ["Endret navn på fagområde"], "Praktisk HR og ledelse", "Bachelorkurs", "Organisasjonsutvikling og Human Resource Management", "Ledelse", "HR og organisasjonsutvikling › HR og personalledelse; Ledelse › Team-, medarbeider- og endringsledelse", "Handler om HR og personalarbeid.", false, "–", false],
  ["HR og organisasjonsutvikling", ["Endret navn på fagområde"], "Prestasjoner og arbeidsglede", "Bachelorkurs", "Organisasjonsutvikling og Human Resource Management", "–", "HR og organisasjonsutvikling › Arbeidsmiljø", "Handler om arbeidsmiljø, trivsel og arbeidsglede.", false, "–", false],
  ["HR og organisasjonsutvikling", ["Flyttet til nytt fagområde"], "Rekruttering og onboarding", "Bachelorkurs", "Ledelse", "–", "HR og organisasjonsutvikling › HR og personalledelse", "Handler om HR og personalarbeid.", false, "–", false],
  ["HR og organisasjonsutvikling", ["Endret navn på fagområde"], "Kunstig intelligent organisasjonspsykologi", "Master", "Organisasjonsutvikling og Human Resource Management", "KI, digitalisering og analytics", "HR og organisasjonsutvikling › Organisasjonspsykologi; KI, digitalisering og analytics › KI", "Handler om organisasjonspsykologi og atferd i organisasjoner.", false, "–", false],
  ["HR og organisasjonsutvikling", ["1 fagområde prioritert"], "Leadership and Organisational Psychology", "Master", "Ledelse; Organisasjonsutvikling og Human Resource Management", "Ledelse", "HR og organisasjonsutvikling › Organisasjonspsykologi; Ledelse › Team-, medarbeider- og endringsledelse", "Handler om organisasjonspsykologi og atferd i organisasjoner.", true, "–", false],
  ["HR og organisasjonsutvikling", ["Endret navn på fagområde"], "Arbeidsglede og livskvalitet", "Masterkurs", "Organisasjonsutvikling og Human Resource Management", "–", "HR og organisasjonsutvikling › Arbeidsmiljø", "Handler om arbeidsmiljø, trivsel og arbeidsglede.", false, "–", false],
  ["HR og organisasjonsutvikling", ["1 fagområde prioritert", "Fagområde fjernet"], "Consulting", "Masterkurs", "Ledelse; Prosjektledelse; Organisasjonsutvikling og Human Resource Management", "Ledelse", "HR og organisasjonsutvikling › Endringsledelse; Ledelse › Team-, medarbeider- og endringsledelse", "Rådgivning og endring i organisasjoner, med ledelsesteori.", false, "–", false],
  ["HR og organisasjonsutvikling", ["1 fagområde prioritert"], "Endringsledelse", "Masterkurs", "Ledelse; Organisasjonsutvikling og Human Resource Management", "Ledelse", "HR og organisasjonsutvikling › Endringsledelse; Ledelse › Team-, medarbeider- og endringsledelse", "Handler om endring i organisasjoner og rådgivning.", false, "–", false],
  ["HR og organisasjonsutvikling", ["Endret navn på fagområde"], "HMS i et ledelsesperspektiv", "Masterkurs", "Organisasjonsutvikling og Human Resource Management", "Ledelse", "HR og organisasjonsutvikling › Arbeidsmiljø; Ledelse › Team-, medarbeider- og endringsledelse", "Handler om arbeidsmiljø, trivsel og arbeidsglede.", false, "–", false],
  ["HR og organisasjonsutvikling", ["1 fagområde prioritert"], "HRM", "Masterkurs", "Ledelse; Organisasjonsutvikling og Human Resource Management", "Ledelse", "HR og organisasjonsutvikling › HR og personalledelse; Ledelse › Team-, medarbeider- og endringsledelse", "Handler om HR og personalarbeid.", false, "–", false],
  ["HR og organisasjonsutvikling", ["1 fagområde prioritert"], "Helsefremmende ledelse", "Bachelorkurs", "Ledelse; Organisasjonsutvikling og Human Resource Management", "Ledelse", "HR og organisasjonsutvikling › Arbeidsmiljø; Ledelse › Team-, medarbeider- og endringsledelse", "Handler om helsefremmende arbeidsmiljø og sykefravær generelt, ikke ledelse i helsesektoren (kursbeskrivelsen).", false, "–", false],
  ["HR og organisasjonsutvikling", ["1 fagområde prioritert"], "Samspill og ledelse", "Masterkurs", "Ledelse; Organisasjonsutvikling og Human Resource Management", "Ledelse", "HR og organisasjonsutvikling › Organisasjonspsykologi; Ledelse › Team-, medarbeider- og endringsledelse", "Bygger på organisasjonspsykologi og gruppedynamikk.", false, "–", false],
  ["HR og organisasjonsutvikling", ["1 fagområde prioritert"], "Ytringsklima og ledelse", "Masterkurs", "Ledelse; Organisasjonsutvikling og Human Resource Management", "Ledelse", "HR og organisasjonsutvikling › Arbeidsmiljø; Ledelse › Team-, medarbeider- og endringsledelse", "Handler om psykologisk trygghet og ytringsklima i organisasjoner. Flyttet fra Ledelse, siden temaet er arbeidsmiljøet mer enn lederrollen.", true, "–", false],
  ["Juss, skatt og eiendom", ["Endret navn på fagområde"], "Eiendomsmegling, jus og økonomi", "Bachelor", "Eiendom, varehandel og forretningsjus", "–", "Juss, skatt og eiendom › Eiendomsmegling", "Handler om eiendomsmegling og eiendomsjus.", false, "Eiendom", false],
  ["Juss, skatt og eiendom", ["Flyttet til nytt fagområde"], "Forretningsjus og økonomi", "Bachelor", "Finans, økonomi og styring", "–", "Juss, skatt og eiendom › Forretningsjus og rettsvitenskap", "Jus er hovedtemaet.", false, "–", false],
  ["Juss, skatt og eiendom", ["Flyttet til nytt fagområde"], "Personvern og GDPR", "Bachelor", "Finans, økonomi og styring", "–", "Juss, skatt og eiendom › Compliance", "Handler om etterlevelse av regelverk som hvitvasking, personvern og digital regulering.", false, "–", false],
  ["Juss, skatt og eiendom", ["Endret navn på fagområde"], "Rettsvitenskap", "Bachelor", "Eiendom, varehandel og forretningsjus", "–", "Juss, skatt og eiendom › Forretningsjus og rettsvitenskap", "Jus er hovedtemaet.", false, "–", false],
  ["Juss, skatt og eiendom", ["Manglet fagområde"], "Arbeidsrett: Lover og regulering", "Bachelorkurs", "–", "–", "Juss, skatt og eiendom › Arbeidsrett", "Handler om arbeidsrettslige regler.", false, "–", false],
  ["Juss, skatt og eiendom", ["1 fagområde prioritert"], "Arbeidsrett: Omstilling og nedbemanning", "Bachelorkurs", "Eiendom, varehandel og forretningsjus; Organisasjonsutvikling og Human Resource Management", "HR og organisasjonsutvikling", "Juss, skatt og eiendom › Arbeidsrett; HR og organisasjonsutvikling › HR og personalledelse", "Handler om arbeidsrettslige regler.", false, "–", false],
  ["Juss, skatt og eiendom", ["1 fagområde prioritert", "Fagområde fjernet"], "Foretaksrett", "Bachelorkurs", "Eiendom, varehandel og forretningsjus; Finans, økonomi og styring", "–", "Juss, skatt og eiendom › Forretningsjus og rettsvitenskap", "Jus er hovedtemaet.", false, "–", true],
  ["Juss, skatt og eiendom", ["1 fagområde prioritert", "Fagområde fjernet"], "Forretningsjus", "Bachelorkurs", "Eiendom, varehandel og forretningsjus; Finans, økonomi og styring", "–", "Juss, skatt og eiendom › Forretningsjus og rettsvitenskap", "Jus er hovedtemaet.", false, "–", true],
  ["Juss, skatt og eiendom", ["Endret navn på fagområde"], "Jus og eiendomsmegling", "Bachelorkurs", "Eiendom, varehandel og forretningsjus", "–", "Juss, skatt og eiendom › Eiendomsmegling", "Handler om eiendomsmegling og eiendomsjus.", false, "Eiendom", false],
  ["Juss, skatt og eiendom", ["Manglet fagområde"], "Økonomisk kriminalitet i finansnæringen", "Bachelorkurs", "–", "Finans, økonomi og regnskap", "Juss, skatt og eiendom › Compliance; Finans, økonomi og regnskap › Finansiell kriminalitet og compliance", "Handler om etterlevelse av regelverk som hvitvasking, personvern og digital regulering.", false, "Finansnæringen", false],
  ["Juss, skatt og eiendom", ["1 fagområde prioritert", "Fagområde fjernet"], "Forretningsjus og økonomi", "Master", "Eiendom, varehandel og forretningsjus; Finans, økonomi og styring", "–", "Juss, skatt og eiendom › Forretningsjus og rettsvitenskap", "Jus er hovedtemaet.", false, "–", false],
  ["Juss, skatt og eiendom", ["Endret navn på fagområde"], "Rettsvitenskap", "Master", "Eiendom, varehandel og forretningsjus", "–", "Juss, skatt og eiendom › Forretningsjus og rettsvitenskap", "Jus er hovedtemaet.", false, "–", false],
  ["Juss, skatt og eiendom", ["1 fagområde prioritert"], "Arbeidsrett og arbeidsliv", "Masterkurs", "Eiendom, varehandel og forretningsjus; Organisasjonsutvikling og Human Resource Management", "HR og organisasjonsutvikling", "Juss, skatt og eiendom › Arbeidsrett; HR og organisasjonsutvikling › HR og personalledelse", "Handler om arbeidsrettslige regler.", false, "–", false],
  ["Helse, skole og barnehage", ["Flyttet til nytt fagområde"], "Juss for ledere", "Masterkurs", "Offentlig sektor", "Juss, skatt og eiendom; Ledelse", "Helse, skole og barnehage › Skole og barnehage; Juss, skatt og eiendom › Arbeidsrett; Ledelse › Helse-, skole- og barnehageledelse", "Rettet mot ledere i skole og barnehage, med arbeidsrettslig vekt.", false, "Skole og barnehage", false],
  ["Juss, skatt og eiendom", ["Manglet fagområde"], "Regelverk og risikoer", "Kurs uten studiepoeng", "–", "Finans, økonomi og regnskap", "Juss, skatt og eiendom › Compliance; Finans, økonomi og regnskap › Finansiell kriminalitet og compliance", "Handler om etterlevelse av regelverk som hvitvasking, personvern og digital regulering.", false, "Finansnæringen", true],
  ["Juss, skatt og eiendom", ["Manglet fagområde"], "Rettslige rammebetingelser", "Kurs uten studiepoeng", "–", "Strategi, innovasjon og bærekraft", "Juss, skatt og eiendom › Compliance; Strategi, innovasjon og bærekraft › Bærekraft", "Handler om etterlevelse av regelverk som hvitvasking, personvern og digital regulering.", false, "Finansnæringen", true],
  ["Juss, skatt og eiendom", ["Flyttet til nytt fagområde"], "Skatt og avgift", "Bachelorkurs", "Finans, økonomi og styring", "Finans, økonomi og regnskap", "Juss, skatt og eiendom › Skatt og avgift; Finans, økonomi og regnskap › Regnskap og revisjon", "Handler om skatte- og avgiftsregler.", false, "–", true],
  ["Juss, skatt og eiendom", ["Flyttet til nytt fagområde"], "Master of Management med spesialisering i skatte- og avgiftsrett", "Master", "Finans, økonomi og styring", "Ledelse", "Juss, skatt og eiendom › Skatt og avgift; Ledelse › Generell ledelse og lederutdanning", "Handler om skatte- og avgiftsregler.", false, "–", false],
  ["Juss, skatt og eiendom", ["Flyttet til nytt fagområde"], "Merverdiavgift II", "Master", "Finans, økonomi og styring; Offentlig sektor", "Finans, økonomi og regnskap", "Juss, skatt og eiendom › Skatt og avgift; Finans, økonomi og regnskap › Regnskap og revisjon", "Handler om skatte- og avgiftsregler.", false, "–", false],
  ["Juss, skatt og eiendom", ["Flyttet til nytt fagområde"], "Internasjonal skatterett", "Masterkurs", "Finans, økonomi og styring; Offentlig sektor", "Finans, økonomi og regnskap", "Juss, skatt og eiendom › Skatt og avgift; Finans, økonomi og regnskap › Regnskap og revisjon", "Handler om skatte- og avgiftsregler.", false, "–", false],
  ["Juss, skatt og eiendom", ["Flyttet til nytt fagområde"], "Internprising", "Masterkurs", "Finans, økonomi og styring; Offentlig sektor", "Finans, økonomi og regnskap", "Juss, skatt og eiendom › Skatt og avgift; Finans, økonomi og regnskap › Regnskap og revisjon", "Handler om skatte- og avgiftsregler.", false, "–", false],
  ["Juss, skatt og eiendom", ["Flyttet til nytt fagområde"], "Merverdiavgift", "Masterkurs", "Finans, økonomi og styring; Offentlig sektor", "Finans, økonomi og regnskap", "Juss, skatt og eiendom › Skatt og avgift; Finans, økonomi og regnskap › Regnskap og revisjon", "Handler om skatte- og avgiftsregler.", false, "–", false],
  ["Juss, skatt og eiendom", ["Flyttet til nytt fagområde"], "Selskaps- og næringsbeskatning I", "Masterkurs", "Finans, økonomi og styring; Offentlig sektor", "Finans, økonomi og regnskap", "Juss, skatt og eiendom › Skatt og avgift; Finans, økonomi og regnskap › Regnskap og revisjon", "Handler om skatte- og avgiftsregler.", false, "–", false],
  ["Juss, skatt og eiendom", ["Flyttet til nytt fagområde"], "Skatteprosess", "Masterkurs", "Finans, økonomi og styring; Offentlig sektor", "Finans, økonomi og regnskap", "Juss, skatt og eiendom › Skatt og avgift; Finans, økonomi og regnskap › Regnskap og revisjon", "Handler om skatte- og avgiftsregler.", false, "–", false],
  ["Juss, skatt og eiendom", ["Flyttet til nytt fagområde"], "Digital Compliance", "Bachelorkurs", "Finans, økonomi og styring; Digitalisering og Analytics", "KI, digitalisering og analytics", "Juss, skatt og eiendom › Compliance; KI, digitalisering og analytics › Digital transformasjon", "Handler om lover og forskrifter (GDPR, IT-kontrakter, opphavsrett), ikke finansiell styring.", false, "–", false],
  ["Juss, skatt og eiendom", ["Manglet fagområde"], "Risikobasert tilnærming", "Kurs uten studiepoeng", "–", "Finans, økonomi og regnskap", "Juss, skatt og eiendom › Compliance; Finans, økonomi og regnskap › Finansiell kriminalitet og compliance", "Handler om hvitvaskingsloven og compliance. Flyttet fra Finans, og søsterkurs ligger i Juss.", false, "Finansnæringen", false],
  ["Juss, skatt og eiendom", ["Manglet fagområde"], "Utvalgte praktiske problemstillinger", "Årsenhet", "–", "Finans, økonomi og regnskap", "Juss, skatt og eiendom › Compliance; Finans, økonomi og regnskap › Finansiell kriminalitet og compliance", "Handler om hvitvaskingsloven, taushetsplikt og tilsyn.", false, "Finansnæringen", false],
  ["Juss, skatt og eiendom", ["Flyttet til nytt fagområde"], "Markedsrett og etikk", "Bachelorkurs", "Finans, økonomi og styring; Markedsføring, kommunikasjon og kultur", "Markedsføring, kommunikasjon og kultur", "Juss, skatt og eiendom › Forretningsjus og rettsvitenskap; Markedsføring, kommunikasjon og kultur › Markedsføring", "Juridisk rammeverk (avtalerett, kjøpsrett, markedsføringsloven).", false, "–", true],
  ["KI, digitalisering og analytics", ["Endret navn på fagområde"], "Bachelor of Data Science for Business", "Bachelor", "Digitalisering og Analytics", "–", "KI, digitalisering og analytics › Data science og analytics", "Handler om dataanalyse, data science og maskinlæring.", false, "–", false],
  ["KI, digitalisering og analytics", ["1 fagområde prioritert", "Fagområde fjernet"], "Digital Business", "Bachelor", "Finans, økonomi og styring; Digitalisering og Analytics; Internasjonal Business", "–", "KI, digitalisering og analytics › Digital transformasjon", "Handler om digitalisering og digital transformasjon.", false, "–", false],
  ["KI, digitalisering og analytics", ["Manglet fagområde"], "AI i finansnæringen", "Bachelorkurs", "–", "Finans, økonomi og regnskap", "KI, digitalisering og analytics › KI; Finans, økonomi og regnskap › Fintech", "Handler om kunstig intelligens, maskinlæring og bruken av dem.", true, "Finansnæringen", false],
  ["KI, digitalisering og analytics", ["Manglet fagområde"], "Bachelor digital transformasjon", "Bachelorkurs", "–", "Finans, økonomi og regnskap", "KI, digitalisering og analytics › Digital transformasjon; Finans, økonomi og regnskap › Fintech", "Handler om digitalisering og digital transformasjon.", false, "Finansnæringen", false],
  ["KI, digitalisering og analytics", ["Flyttet til nytt fagområde"], "Kunstig intelligens for økt produktivitet", "Bachelorkurs", "Ledelse", "–", "KI, digitalisering og analytics › KI", "Handler om kunstig intelligens, maskinlæring og bruken av dem.", false, "–", false],
  ["KI, digitalisering og analytics", ["Endret navn på fagområde"], "Kunstig intelligens i praksis", "Bachelorkurs", "Digitalisering og Analytics", "–", "KI, digitalisering og analytics › KI", "Handler om kunstig intelligens, maskinlæring og bruken av dem.", false, "–", false],
  ["Markedsføring, kommunikasjon og kultur", ["Flyttet til nytt fagområde"], "Kvalitativ metode: Dypere innsikt", "Bachelorkurs", "Digitalisering og Analytics", "KI, digitalisering og analytics", "Markedsføring, kommunikasjon og kultur › Kunde- og markedsinnsikt; KI, digitalisering og analytics › Statistikk og metode", "Metodekurs for innsikt i kunder og marked.", false, "–", true],
  ["KI, digitalisering og analytics", ["Manglet fagområde"], "Maskinlæring og anvendelser i finansnæringen", "Bachelorkurs", "–", "Finans, økonomi og regnskap", "KI, digitalisering og analytics › KI; Finans, økonomi og regnskap › Fintech", "Handler om kunstig intelligens, maskinlæring og bruken av dem.", true, "Finansnæringen", false],
  ["Markedsføring, kommunikasjon og kultur", ["Flyttet til nytt fagområde"], "Metode og innsikt", "Bachelorkurs", "Digitalisering og Analytics", "KI, digitalisering og analytics", "Markedsføring, kommunikasjon og kultur › Kunde- og markedsinnsikt; KI, digitalisering og analytics › Statistikk og metode", "Metodekurs for innsikt i kunder og marked.", false, "–", true],
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
  ["KI, digitalisering og analytics", ["1 fagområde prioritert", "Fagområde fjernet"], "Responsible AI Leadership", "Masterkurs", "Eiendom, varehandel og forretningsjus; Finans, økonomi og styring; Digitalisering og Analytics", "Ledelse", "KI, digitalisering og analytics › Ansvarlig KI og personvern; Ledelse › Generell ledelse og lederutdanning", "Handler om etikk, regulering og personvern i KI.", true, "–", false],
  ["KI, digitalisering og analytics", ["Manglet fagområde"], "Digital transformasjon i finansnæringen", "Kurs uten studiepoeng", "–", "Finans, økonomi og regnskap", "KI, digitalisering og analytics › Digital transformasjon; Finans, økonomi og regnskap › Fintech", "Handler om digitalisering og digital transformasjon.", false, "Finansnæringen", true],
  ["KI, digitalisering og analytics", ["Manglet fagområde"], "Grunnleggende teknologiforståelse", "Kurs uten studiepoeng", "–", "Finans, økonomi og regnskap", "KI, digitalisering og analytics › KI; Finans, økonomi og regnskap › Fintech", "Innholdet er maskinlæring og AI, anvendt i finansnæringen.", true, "Finansnæringen", false],
  ["KI, digitalisering og analytics", ["Manglet fagområde"], "Etikk og regulering i AI", "Årsenhet", "–", "–", "KI, digitalisering og analytics › Ansvarlig KI og personvern", "Handler om etikk, regulering og personvern i KI.", true, "Finansnæringen", false],
  ["KI, digitalisering og analytics", ["Endret navn på fagområde"], "Prototyping med KI", "Årsenhet", "Digitalisering og Analytics", "–", "KI, digitalisering og analytics › KI", "Handler om kunstig intelligens, maskinlæring og bruken av dem.", false, "–", false],
  ["KI, digitalisering og analytics", ["Manglet fagområde"], "Data and Decision Science", "PhD", "–", "–", "KI, digitalisering og analytics › Data science og analytics", "Handler om dataanalyse, data science og maskinlæring.", false, "–", false],
  ["Ledelse", ["1 fagområde prioritert"], "Effektive team", "Bachelorkurs", "Ledelse; Organisasjonsutvikling og Human Resource Management", "HR og organisasjonsutvikling", "Ledelse › Team-, medarbeider- og endringsledelse; HR og organisasjonsutvikling › Organisasjonspsykologi", "Handler om team, tillit og konflikthåndtering på arbeidsplassen. Flyttet fra HR og organisasjonsutvikling, siden team og prestasjon nå eies av Ledelse.", true, "–", false],
  ["Ledelse", ["1 fagområde prioritert", "Fagområde fjernet"], "Forhandling og forhandlingsteknikk", "Bachelorkurs", "Ledelse; Organisasjonsutvikling og Human Resource Management", "–", "Ledelse › Lederferdigheter og kommunikasjon", "Handler om forhandling som lederferdighet. Flyttet fra HR og organisasjonsutvikling, siden påvirkning og forhandling nå eies av Ledelse.", true, "–", false],
  ["Ledelse", ["1 fagområde prioritert"], "Prestasjonsledelse", "Bachelorkurs", "Ledelse; Organisasjonsutvikling og Human Resource Management", "HR og organisasjonsutvikling", "Ledelse › Team-, medarbeider- og endringsledelse; HR og organisasjonsutvikling › HR og personalledelse", "Handler om å motivere og utvikle medarbeidere med styrkebasert ledelse. Flyttet fra HR og organisasjonsutvikling, siden team og prestasjon nå eies av Ledelse.", true, "–", false],
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
  ["Finans, økonomi og regnskap", ["Flyttet til nytt fagområde"], "Major in Leadership, Change and Analytics", "Master", "Ledelse; Organisasjonsutvikling og Human Resource Management", "Ledelse; HR og organisasjonsutvikling; KI, digitalisering og analytics", "Finans, økonomi og regnskap › Bedriftsøkonomi; Ledelse › Team-, medarbeider- og endringsledelse; HR og organisasjonsutvikling › Endringsledelse; KI, digitalisering og analytics › Data science og analytics", "Major i Master in Business, plassert sammen med selve graden og Siviløkonom.", true, "–", false],
  ["Ledelse", ["Uendret"], "Master of Management", "Master", "Ledelse", "Strategi, innovasjon og bærekraft; Finans, økonomi og regnskap", "Ledelse › Generell ledelse og lederutdanning; Strategi, innovasjon og bærekraft › Strategi; Finans, økonomi og regnskap › Bedriftsøkonomi", "Handler om lederskap og lederrollen.", false, "–", false],
  ["Ledelse", ["1 fagområde prioritert", "Fagområde fjernet"], "Effektiv ledelse, påvirkning og innflytelse", "Masterkurs", "Ledelse; Organisasjonsutvikling og Human Resource Management", "–", "Ledelse › Lederferdigheter og kommunikasjon", "Handler om lederens kommunikasjon, påvirkning og forhandling.", false, "–", false],
  ["Ledelse", ["1 fagområde prioritert", "Fagområde fjernet"], "Ledelse; makt og mening", "Masterkurs", "Ledelse; Prosjektledelse", "–", "Ledelse › Lederferdigheter og kommunikasjon", "Handler om lederskap og lederrollen.", false, "–", false],
  ["Ledelse", ["1 fagområde prioritert"], "Lederskap i uforutsigbare omgivelser", "Masterkurs", "Ledelse; Organisasjonsutvikling og Human Resource Management", "HR og organisasjonsutvikling", "Ledelse › Lederferdigheter og kommunikasjon; HR og organisasjonsutvikling › Endringsledelse", "Handler om lederskap og lederrollen.", false, "–", false],
  ["Ledelse", ["Uendret"], "Prestasjoner og utviklingsledelse", "Masterkurs", "Ledelse", "HR og organisasjonsutvikling", "Ledelse › Team-, medarbeider- og endringsledelse; HR og organisasjonsutvikling › HR og personalledelse", "Handler om å lede team og prestasjoner.", false, "–", false],
  ["Ledelse", ["Manglet fagområde"], "Prosjektledelse", "Masterkurs", "–", "–", "Ledelse › Prosjektledelse", "Handler om å lede prosjekter.", false, "–", false],
  ["Ledelse", ["Uendret"], "Teamledelse", "Masterkurs", "Ledelse", "HR og organisasjonsutvikling", "Ledelse › Team-, medarbeider- og endringsledelse; HR og organisasjonsutvikling › Organisasjonspsykologi", "Handler om å lede team og prestasjoner.", false, "–", false],
  ["Ledelse", ["1 fagområde prioritert"], "Tilstedeværende ledelse", "Masterkurs", "Ledelse; Organisasjonsutvikling og Human Resource Management", "HR og organisasjonsutvikling", "Ledelse › Lederferdigheter og kommunikasjon; HR og organisasjonsutvikling › Organisasjonspsykologi", "Handler om lederskap og lederrollen.", false, "–", false],
  ["Ledelse", ["Uendret"], "Årsenhet i ledelse", "Årsenhet", "Ledelse", "–", "Ledelse › Generell ledelse og lederutdanning", "Handler om lederskap og lederrollen.", false, "–", false],
  ["Ledelse", ["1 fagområde prioritert"], "Ledelse og organisasjon", "PhD", "Ledelse; Organisasjonsutvikling og Human Resource Management", "HR og organisasjonsutvikling", "Ledelse › Generell ledelse og lederutdanning; HR og organisasjonsutvikling › Organisasjonspsykologi", "Handler om lederskap og lederrollen.", false, "–", false],
  ["Ledelse", ["1 fagområde prioritert", "Fagområde fjernet"], "Multicultural Leadership", "Masterkurs", "Ledelse; Strategi, innovasjon og bærekraft; Internasjonal Business", "Markedsføring, kommunikasjon og kultur", "Ledelse › Lederferdigheter og kommunikasjon; Markedsføring, kommunikasjon og kultur › Kultur og internasjonal business", "Handler om lederskap og lederrollen.", false, "–", false],
  ["Ledelse", ["1 fagområde prioritert", "Fagområde fjernet"], "Ledelse i vår tid for finansnæringen", "Masterkurs", "Finans, økonomi og styring; Ledelse", "–", "Ledelse › Generell ledelse og lederutdanning", "Handler om lederrollen og selvinnsikt, ikke finans.", false, "Finansnæringen", false],
  ["Ledelse", ["1 fagområde prioritert", "Fagområde fjernet"], "Leading in the Age of AI", "Masterkurs", "Ledelse; Strategi, innovasjon og bærekraft; Organisasjonsutvikling og Human Resource Management; Digitalisering og Analytics", "KI, digitalisering og analytics", "Ledelse › Generell ledelse og lederutdanning; KI, digitalisering og analytics › KI", "Lederrollen i møte med KI er hovedtemaet.", true, "–", false],
  ["Helse, skole og barnehage", ["Flyttet til nytt fagområde"], "Ledelse av tjenesteutvikling", "Masterkurs", "Offentlig sektor", "Ledelse", "Helse, skole og barnehage › Helse; Ledelse › Helse-, skole- og barnehageledelse", "Ledelse av tjenesteutvikling i helsesektoren.", false, "Helse og omsorg", false],
  ["Ledelse", ["1 fagområde prioritert", "Fagområde fjernet"], "Kommunikasjon for ledere og organisasjoner", "Bachelorkurs", "Ledelse; Markedsføring, kommunikasjon og kultur; Organisasjonsutvikling og Human Resource Management", "Markedsføring, kommunikasjon og kultur", "Ledelse › Lederferdigheter og kommunikasjon; Markedsføring, kommunikasjon og kultur › Kommunikasjon", "Handler om kommunikasjon for ledere og organisasjoner. Flyttet fra Markedsføring, kommunikasjon og kultur, siden Ledelse eier kommunikasjon for ledere.", true, "–", true],
  ["Ledelse", ["1 fagområde prioritert", "Fagområde fjernet"], "Muntlig gjennomslag for ledere", "Bachelorkurs", "Ledelse; Markedsføring, kommunikasjon og kultur; Organisasjonsutvikling og Human Resource Management", "Markedsføring, kommunikasjon og kultur", "Ledelse › Lederferdigheter og kommunikasjon; Markedsføring, kommunikasjon og kultur › Kommunikasjon", "Handler om muntlig gjennomslag og kommunikasjon for ledere. Flyttet fra Markedsføring, kommunikasjon og kultur, siden Ledelse eier kommunikasjon for ledere.", true, "–", false],
  ["Ledelse", ["Flyttet til nytt fagområde"], "Retorikk, kommunikasjon og ledelse", "Bachelorkurs", "Markedsføring, kommunikasjon og kultur", "Markedsføring, kommunikasjon og kultur", "Ledelse › Lederferdigheter og kommunikasjon; Markedsføring, kommunikasjon og kultur › Kommunikasjon", "Handler om retorikk og kommunikasjon i lederrollen. Flyttet fra Markedsføring, kommunikasjon og kultur, siden Ledelse eier kommunikasjon for ledere.", true, "–", false],
  ["Markedsføring, kommunikasjon og kultur", ["Manglet fagområde"], "Bachelor i markedsføringsledelse, 3. studieår", "–", "–", "–", "Markedsføring, kommunikasjon og kultur › Markedsføring", "Handler om markedsføring, fra merkevare og strategi til digitale kanaler.", true, "–", false],
  ["Markedsføring, kommunikasjon og kultur", ["Manglet fagområde"], "Markedskandidat", "–", "–", "–", "Markedsføring, kommunikasjon og kultur › Markedsføring", "Handler om markedsføring, fra merkevare og strategi til digitale kanaler.", true, "–", false],
  ["Markedsføring, kommunikasjon og kultur", ["Uendret"], "Digital kommunikasjon og markedsføring", "Bachelor", "Markedsføring, kommunikasjon og kultur", "–", "Markedsføring, kommunikasjon og kultur › Markedsføring", "Handler om markedsføring, fra merkevare og strategi til digitale kanaler.", true, "–", false],
  ["Markedsføring, kommunikasjon og kultur", ["Uendret"], "Markedsføringsledelse", "Bachelor", "Markedsføring, kommunikasjon og kultur", "–", "Markedsføring, kommunikasjon og kultur › Markedsføring", "Handler om markedsføring, fra merkevare og strategi til digitale kanaler.", true, "–", false],
  ["Markedsføring, kommunikasjon og kultur", ["Flyttet til nytt fagområde"], "Markedsøkonomi", "Bachelor/Årsenhet", "Finans, økonomi og styring", "Finans, økonomi og regnskap", "Markedsføring, kommunikasjon og kultur › Markedsføring; Finans, økonomi og regnskap › Samfunnsøkonomi", "Handler om markedsføring, fra merkevare og strategi til digitale kanaler.", true, "–", true],
  ["Markedsføring, kommunikasjon og kultur", ["1 fagområde prioritert", "Fagområde fjernet"], "Business Communication: Culture and Ethics", "Bachelorkurs", "Markedsføring, kommunikasjon og kultur; Internasjonal Business", "–", "Markedsføring, kommunikasjon og kultur › Kultur og internasjonal business", "Handler om kultur eller har internasjonal vinkling.", false, "–", true],
  ["Markedsføring, kommunikasjon og kultur", ["Uendret"], "Digital Marketing Management", "Bachelorkurs", "Markedsføring, kommunikasjon og kultur", "–", "Markedsføring, kommunikasjon og kultur › Markedsføring", "Handler om markedsføring, fra merkevare og strategi til digitale kanaler.", false, "–", false],
  ["Markedsføring, kommunikasjon og kultur", ["Uendret"], "Digital Marketing Tools and AI", "Bachelorkurs", "Markedsføring, kommunikasjon og kultur", "KI, digitalisering og analytics", "Markedsføring, kommunikasjon og kultur › Markedsføring; KI, digitalisering og analytics › KI", "Handler om markedsføring, fra merkevare og strategi til digitale kanaler.", false, "–", true],
  ["Markedsføring, kommunikasjon og kultur", ["Uendret"], "Forbrukerpsykologi", "Bachelorkurs", "Markedsføring, kommunikasjon og kultur", "–", "Markedsføring, kommunikasjon og kultur › Kunde- og markedsinnsikt", "Handler om markedsinnsikt: kunder, forbrukeratferd og markedsanalyse.", false, "–", true],
  ["Markedsføring, kommunikasjon og kultur", ["Uendret"], "KI i markedsføring", "Bachelorkurs", "Markedsføring, kommunikasjon og kultur", "–", "Markedsføring, kommunikasjon og kultur › Markedsføring", "Handler om markedsføring, fra merkevare og strategi til digitale kanaler.", false, "–", true],
  ["Markedsføring, kommunikasjon og kultur", ["Uendret"], "Kunderelasjoner på bedriftsmarkedet", "Bachelorkurs", "Markedsføring, kommunikasjon og kultur", "–", "Markedsføring, kommunikasjon og kultur › Kunde- og markedsinnsikt", "Handler om markedsinnsikt: kunder, forbrukeratferd og markedsanalyse.", false, "–", true],
  ["Markedsføring, kommunikasjon og kultur", ["Uendret"], "Markedsføring", "Bachelorkurs", "Markedsføring, kommunikasjon og kultur", "–", "Markedsføring, kommunikasjon og kultur › Markedsføring", "Handler om markedsføring, fra merkevare og strategi til digitale kanaler.", false, "–", true],
  ["Markedsføring, kommunikasjon og kultur", ["Uendret"], "Markedsføring og kunderelasjoner", "Bachelorkurs", "Markedsføring, kommunikasjon og kultur", "–", "Markedsføring, kommunikasjon og kultur › Kunde- og markedsinnsikt", "Handler om markedsinnsikt: kunder, forbrukeratferd og markedsanalyse.", false, "–", true],
  ["Markedsføring, kommunikasjon og kultur", ["1 fagområde prioritert", "Fagområde fjernet"], "Markedsføringsledelse og strategi", "Bachelorkurs", "Finans, økonomi og styring; Markedsføring, kommunikasjon og kultur; Strategi, innovasjon og bærekraft", "Strategi, innovasjon og bærekraft", "Markedsføring, kommunikasjon og kultur › Markedsføring; Strategi, innovasjon og bærekraft › Strategi", "Handler om markedsføring, fra merkevare og strategi til digitale kanaler.", true, "–", false],
  ["Markedsføring, kommunikasjon og kultur", ["Uendret"], "Markedsføringsledelse og strategi", "Bachelorkurs", "Markedsføring, kommunikasjon og kultur", "Strategi, innovasjon og bærekraft", "Markedsføring, kommunikasjon og kultur › Markedsføring; Strategi, innovasjon og bærekraft › Strategi", "Handler om markedsføring, fra merkevare og strategi til digitale kanaler.", true, "–", true],
  ["Markedsføring, kommunikasjon og kultur", ["1 fagområde prioritert"], "Marketing Analytics", "Bachelorkurs", "Markedsføring, kommunikasjon og kultur; Digitalisering og Analytics", "KI, digitalisering og analytics", "Markedsføring, kommunikasjon og kultur › Kunde- og markedsinnsikt; KI, digitalisering og analytics › Data science og analytics", "Handler om markedsinnsikt: kunder, forbrukeratferd og markedsanalyse.", true, "–", true],
  ["Markedsføring, kommunikasjon og kultur", ["1 fagområde prioritert", "Fagområde fjernet"], "Marketing Communication", "Bachelorkurs", "Markedsføring, kommunikasjon og kultur; Strategi, innovasjon og bærekraft", "–", "Markedsføring, kommunikasjon og kultur › Kommunikasjon", "Handler om kommunikasjon, retorikk og presentasjon.", false, "–", true],
  ["Markedsføring, kommunikasjon og kultur", ["1 fagområde prioritert", "Fagområde fjernet"], "Merkevareledelse", "Bachelorkurs", "Markedsføring, kommunikasjon og kultur; Strategi, innovasjon og bærekraft", "–", "Markedsføring, kommunikasjon og kultur › Markedsføring", "Handler om markedsføring, fra merkevare og strategi til digitale kanaler.", false, "–", true],
  ["Markedsføring, kommunikasjon og kultur", ["Uendret"], "BI–Luiss Joint Master in Marketing", "Master", "Markedsføring, kommunikasjon og kultur", "–", "Markedsføring, kommunikasjon og kultur › Markedsføring", "Handler om markedsføring, fra merkevare og strategi til digitale kanaler.", true, "–", false],
  ["Markedsføring, kommunikasjon og kultur", ["1 fagområde prioritert", "Fagområde fjernet"], "Business Communication", "Master", "Ledelse; Markedsføring, kommunikasjon og kultur; Digitalisering og Analytics", "–", "Markedsføring, kommunikasjon og kultur › Kommunikasjon", "Handler om kommunikasjon, retorikk og presentasjon.", false, "–", false],
  ["Finans, økonomi og regnskap", ["Flyttet til nytt fagområde"], "Major in Marketing", "Master", "Markedsføring, kommunikasjon og kultur", "Markedsføring, kommunikasjon og kultur", "Finans, økonomi og regnskap › Bedriftsøkonomi; Markedsføring, kommunikasjon og kultur › Markedsføring", "Major i Master in Business, plassert sammen med selve graden og Siviløkonom.", true, "–", false],
  ["Markedsføring, kommunikasjon og kultur", ["Uendret"], "Strategic Marketing Management", "Master", "Markedsføring, kommunikasjon og kultur", "Strategi, innovasjon og bærekraft", "Markedsføring, kommunikasjon og kultur › Markedsføring; Strategi, innovasjon og bærekraft › Strategi", "Handler om markedsføring, fra merkevare og strategi til digitale kanaler.", true, "–", false],
  ["Markedsføring, kommunikasjon og kultur", ["Flyttet til nytt fagområde"], "Customer and Market analytics", "Masterkurs", "Digitalisering og Analytics", "KI, digitalisering og analytics", "Markedsføring, kommunikasjon og kultur › Kunde- og markedsinnsikt; KI, digitalisering og analytics › Data science og analytics", "Handler om markedsinnsikt: kunder, forbrukeratferd og markedsanalyse.", true, "–", false],
  ["Markedsføring, kommunikasjon og kultur", ["1 fagområde prioritert", "Fagområde fjernet"], "Markedsstrategi - innsikt, posisjonering og vekst", "Masterkurs", "Markedsføring, kommunikasjon og kultur; Strategi, innovasjon og bærekraft; Digitalisering og Analytics", "Strategi, innovasjon og bærekraft", "Markedsføring, kommunikasjon og kultur › Markedsføring; Strategi, innovasjon og bærekraft › Strategi", "Handler om markedsføring, fra merkevare og strategi til digitale kanaler.", true, "–", false],
  ["Markedsføring, kommunikasjon og kultur", ["Uendret"], "Strategisk historiefortelling", "Masterkurs", "Markedsføring, kommunikasjon og kultur", "–", "Markedsføring, kommunikasjon og kultur › Kommunikasjon", "Handler om kommunikasjon, retorikk og presentasjon.", false, "–", false],
  ["Markedsføring, kommunikasjon og kultur", ["1 fagområde prioritert", "Fagområde fjernet"], "Strategisk kommunikasjon", "Masterkurs", "Markedsføring, kommunikasjon og kultur; Strategi, innovasjon og bærekraft", "–", "Markedsføring, kommunikasjon og kultur › Kommunikasjon", "Handler om kommunikasjon, retorikk og presentasjon.", false, "–", false],
  ["Markedsføring, kommunikasjon og kultur", ["Uendret"], "Kommunikasjon", "PhD", "Markedsføring, kommunikasjon og kultur", "–", "Markedsføring, kommunikasjon og kultur › Kommunikasjon", "Handler om kommunikasjon, retorikk og presentasjon.", false, "–", false],
  ["Markedsføring, kommunikasjon og kultur", ["Uendret"], "Markedsføring", "PhD", "Markedsføring, kommunikasjon og kultur", "–", "Markedsføring, kommunikasjon og kultur › Markedsføring", "Handler om markedsføring, fra merkevare og strategi til digitale kanaler.", true, "–", false],
  ["Markedsføring, kommunikasjon og kultur", ["Uendret"], "International Management", "Bachelor", "Markedsføring, kommunikasjon og kultur", "Ledelse", "Markedsføring, kommunikasjon og kultur › Kultur og internasjonal business; Ledelse › Generell ledelse og lederutdanning", "Handler om kultur eller har internasjonal vinkling.", false, "–", false],
  ["Markedsføring, kommunikasjon og kultur", ["Uendret"], "Summer School at BI", "Bachelor", "Markedsføring, kommunikasjon og kultur", "–", "Markedsføring, kommunikasjon og kultur › Kultur og internasjonal business", "Handler om kultur eller har internasjonal vinkling.", false, "–", false],
  ["Markedsføring, kommunikasjon og kultur", ["Manglet fagområde"], "Kulturforståelse, forhandlinger og etisk refleksjon", "Masterkurs", "–", "Sikkerhet og beredskap", "Markedsføring, kommunikasjon og kultur › Kultur og internasjonal business; Sikkerhet og beredskap › Sikkerhetsledelse og cybersikkerhet", "Handler om kultur eller har internasjonal vinkling.", false, "–", false],
  ["Sikkerhet og beredskap", ["Manglet fagområde"], "Topplederkurs i geopolitisk risikohåndtering", "–", "–", "Ledelse", "Sikkerhet og beredskap › Beredskap og krisehåndtering; Ledelse › Sikkerhets- og beredskapsledelse", "Handler om beredskap, krisehåndtering og risiko.", false, "–", false],
  ["Sikkerhet og beredskap", ["Flyttet til nytt fagområde"], "Sikkerhetsledelse", "Bachelorkurs", "Ledelse; Offentlig sektor", "Ledelse", "Sikkerhet og beredskap › Sikkerhetsledelse og cybersikkerhet; Ledelse › Sikkerhets- og beredskapsledelse", "Handler om sikkerhetsledelse og digital sikkerhet.", false, "–", false],
  ["Sikkerhet og beredskap", ["Flyttet til nytt fagområde", "Fagområde fjernet"], "Sikkerhetsledelse", "Master", "Ledelse; Offentlig sektor; Strategi, innovasjon og bærekraft", "Ledelse", "Sikkerhet og beredskap › Sikkerhetsledelse og cybersikkerhet; Ledelse › Sikkerhets- og beredskapsledelse", "Handler om sikkerhetsledelse og digital sikkerhet.", false, "–", false],
  ["Sikkerhet og beredskap", ["Flyttet til nytt fagområde"], "Digital sikkerhet for ledere", "Masterkurs", "Offentlig sektor; Digitalisering og Analytics", "KI, digitalisering og analytics; Ledelse", "Sikkerhet og beredskap › Sikkerhetsledelse og cybersikkerhet; KI, digitalisering og analytics › Digital transformasjon; Ledelse › Sikkerhets- og beredskapsledelse", "Handler om sikkerhetsledelse og digital sikkerhet.", true, "–", false],
  ["Sikkerhet og beredskap", ["Flyttet til nytt fagområde", "Fagområde fjernet"], "Organisering for det uventede", "Masterkurs", "Offentlig sektor; Organisasjonsutvikling og Human Resource Management", "–", "Sikkerhet og beredskap › Beredskap og krisehåndtering", "Handler om beredskap og krisehåndtering.", false, "–", false],
  ["Sikkerhet og beredskap", ["Flyttet til nytt fagområde", "Fagområde fjernet"], "Sikkerhetsledelse og konflikthåndtering", "Masterkurs", "Offentlig sektor; Organisasjonsutvikling og Human Resource Management", "Ledelse", "Sikkerhet og beredskap › Beredskap og krisehåndtering; Ledelse › Sikkerhets- og beredskapsledelse", "Handler om beredskap, krisehåndtering og risiko.", true, "–", false],
  ["Sikkerhet og beredskap", ["Manglet fagområde"], "Terrorisme og terrorbekjempelse", "Masterkurs", "–", "–", "Sikkerhet og beredskap › Beredskap og krisehåndtering", "Handler om beredskap, krisehåndtering og risiko.", false, "–", false],
  ["Strategi, innovasjon og bærekraft", ["Uendret"], "D-box kurs i systemorientert innovasjon", "–", "Strategi, innovasjon og bærekraft", "Ledelse", "Strategi, innovasjon og bærekraft › Innovasjon og entreprenørskap; Ledelse › Generell ledelse og lederutdanning", "Handler om innovasjon, entreprenørskap eller forretningsutvikling.", false, "–", false],
  ["Ledelse", ["Manglet fagområde"], "Ocean Industry Leadership 2025", "–", "–", "Strategi, innovasjon og bærekraft", "Ledelse › Strategisk ledelse; Strategi, innovasjon og bærekraft › Strategi", "Bransjekurs for ledere i havnæringen, med strategisk fokus.", false, "Maritim næring", false],
  ["Strategi, innovasjon og bærekraft", ["Uendret"], "Forretningsutvikling og entreprenørskap", "Bachelor", "Strategi, innovasjon og bærekraft", "Finans, økonomi og regnskap", "Strategi, innovasjon og bærekraft › Innovasjon og entreprenørskap; Finans, økonomi og regnskap › Bedriftsøkonomi", "Handler om innovasjon, entreprenørskap eller forretningsutvikling.", false, "–", false],
  ["Strategi, innovasjon og bærekraft", ["1 fagområde prioritert", "Fagområde fjernet"], "Bærekraftig risikostyring", "Bachelorkurs", "Ledelse; Strategi, innovasjon og bærekraft; Organisasjonsutvikling og Human Resource Management", "Finans, økonomi og regnskap", "Strategi, innovasjon og bærekraft › Bærekraft; Finans, økonomi og regnskap › Bærekraftig finans", "Handler om bærekraft, ESG og rapportering i virksomheter.", false, "–", false],
  ["Strategi, innovasjon og bærekraft", ["1 fagområde prioritert", "Fagområde fjernet"], "Designdrevet innovasjon", "Bachelorkurs", "Markedsføring, kommunikasjon og kultur; Strategi, innovasjon og bærekraft", "–", "Strategi, innovasjon og bærekraft › Innovasjon og entreprenørskap", "Handler om innovasjon, entreprenørskap eller forretningsutvikling.", false, "–", true],
  ["Strategi, innovasjon og bærekraft", ["1 fagområde prioritert"], "Forretningsmodeller og ESG-risiko", "Bachelorkurs", "Finans, økonomi og styring; Strategi, innovasjon og bærekraft", "Finans, økonomi og regnskap", "Strategi, innovasjon og bærekraft › Bærekraft; Finans, økonomi og regnskap › Bærekraftig finans", "Handler om bærekraft, ESG og rapportering i virksomheter.", false, "Finansnæringen", true],
  ["Ledelse", ["Flyttet til nytt fagområde"], "Executive Master of Management in Energy", "Master", "Strategi, innovasjon og bærekraft; Internasjonal Business", "Strategi, innovasjon og bærekraft", "Ledelse › Strategisk ledelse; Strategi, innovasjon og bærekraft › Strategi", "Lederstudium i energibransjen.", false, "Energi", false],
  ["Strategi, innovasjon og bærekraft", ["Uendret"], "Innovation and Entrepreneurship", "Master", "Strategi, innovasjon og bærekraft", "Finans, økonomi og regnskap", "Strategi, innovasjon og bærekraft › Innovasjon og entreprenørskap; Finans, økonomi og regnskap › Bedriftsøkonomi", "Handler om innovasjon, entreprenørskap eller forretningsutvikling.", false, "–", false],
  ["Finans, økonomi og regnskap", ["Flyttet til nytt fagområde"], "Major in Strategy", "Master", "Strategi, innovasjon og bærekraft", "Strategi, innovasjon og bærekraft", "Finans, økonomi og regnskap › Bedriftsøkonomi; Strategi, innovasjon og bærekraft › Strategi", "Major i Master in Business, plassert sammen med selve graden og Siviløkonom.", true, "–", false],
  ["Strategi, innovasjon og bærekraft", ["Uendret"], "Bærekraft 2.0: Globale trender, strategiske valg og lederatferd", "Masterkurs", "Strategi, innovasjon og bærekraft", "Ledelse", "Strategi, innovasjon og bærekraft › Bærekraft; Ledelse › Strategisk ledelse", "Handler om bærekraft, ESG og rapportering i virksomheter.", false, "–", false],
  ["Strategi, innovasjon og bærekraft", ["Uendret"], "Grønn vekst og konkurransekraft", "Masterkurs", "Strategi, innovasjon og bærekraft", "–", "Strategi, innovasjon og bærekraft › Bærekraft", "Handler om bærekraft, ESG og rapportering i virksomheter.", false, "–", false],
  ["Strategi, innovasjon og bærekraft", ["1 fagområde prioritert"], "KI, innovasjon og forretningsmodeller", "Masterkurs", "Strategi, innovasjon og bærekraft; Digitalisering og Analytics", "KI, digitalisering og analytics", "Strategi, innovasjon og bærekraft › Innovasjon og entreprenørskap; KI, digitalisering og analytics › KI", "Handler om innovasjon, entreprenørskap eller forretningsutvikling.", false, "–", false],
  ["Strategi, innovasjon og bærekraft", ["1 fagområde prioritert"], "Strategisk forretningsutvikling med KI", "Masterkurs", "Strategi, innovasjon og bærekraft; Digitalisering og Analytics", "KI, digitalisering og analytics", "Strategi, innovasjon og bærekraft › Innovasjon og entreprenørskap; KI, digitalisering og analytics › KI", "Handler om innovasjon, entreprenørskap eller forretningsutvikling.", false, "–", false],
  ["Ledelse", ["Flyttet til nytt fagområde"], "Strategisk ledelse", "Masterkurs", "Strategi, innovasjon og bærekraft", "Strategi, innovasjon og bærekraft", "Ledelse › Strategisk ledelse; Strategi, innovasjon og bærekraft › Strategi", "Handler om strategi og strategisk ledelse av virksomheter.", false, "–", false],
  ["Strategi, innovasjon og bærekraft", ["Manglet fagområde"], "Vesentlighetsanalyse", "Årsenhet", "–", "Finans, økonomi og regnskap", "Strategi, innovasjon og bærekraft › Bærekraft; Finans, økonomi og regnskap › Regnskap og revisjon", "Handler om bærekraft, ESG og rapportering i virksomheter.", false, "Finansnæringen", false],
  ["Strategi, innovasjon og bærekraft", ["Uendret"], "Strategi, entreprenørskap og innovasjon", "PhD", "Strategi, innovasjon og bærekraft", "–", "Strategi, innovasjon og bærekraft › Innovasjon og entreprenørskap", "Handler om innovasjon, entreprenørskap eller forretningsutvikling.", false, "–", false],
  ["Finans, økonomi og regnskap", ["1 fagområde prioritert", "Fagområde fjernet"], "Logistikk og bærekraftige forsyningskjeder", "Bachelorkurs", "Finans, økonomi og styring; Markedsføring, kommunikasjon og kultur", "Strategi, innovasjon og bærekraft", "Finans, økonomi og regnskap › Logistikk og forsyningskjeder; Strategi, innovasjon og bærekraft › Bærekraft", "Handler om logistikk og forsyningskjeder.", false, "–", true],
  ["Finans, økonomi og regnskap", ["Endret navn på fagområde"], "Logistikkledelse - Supply Chain Management", "Bachelorkurs", "Finans, økonomi og styring", "–", "Finans, økonomi og regnskap › Logistikk og forsyningskjeder", "Handler om logistikk og forsyningskjeder.", false, "–", true],
  ["Finans, økonomi og regnskap", ["Flyttet til nytt fagområde", "Fagområde fjernet"], "Major in Logistics, Operations, and Supply Chain Management", "Master", "Eiendom, varehandel og forretningsjus; Strategi, innovasjon og bærekraft; Organisasjonsutvikling og Human Resource Management", "–", "Finans, økonomi og regnskap › Logistikk og forsyningskjeder", "Major i Master in Business, plassert sammen med selve graden og Siviløkonom.", true, "–", false],
];

const statusStyle: Record<Status, { background: string; text: string }> = {
  Uendret: { background: "#efeff1", text: "#52525b" },
  "Endret navn på fagområde": { background: "#dff3f0", text: "#1b6a5f" },
  "1 fagområde prioritert": { background: "#e0ebf5", text: "#00467f" },
  "Manglet fagområde": { background: "#f0e6f4", text: "#5e3a70" },
  "Flyttet til nytt fagområde": { background: "#fbeadb", text: "#8a4a0a" },
  "Fagområde fjernet": { background: "#f9e1ea", text: "#8a1040" },
};

const statusLines: Record<Status, string[]> = {
  Uendret: ["Uendret"],
  "Endret navn på fagområde": ["Endret navn på", "fagområde"],
  "1 fagområde prioritert": ["1 fagområde prioritert"],
  "Manglet fagområde": ["Manglet fagområde"],
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
        border: `1px solid color-mix(in srgb, ${text} 45%, #ffffff)`,
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
      <div style={{ position: "relative", whiteSpace: "nowrap", fontSize: muted ? "0.875rem" : undefined, color: muted ? "#71717a" : undefined }}>
        {!muted && (
          <span aria-label="Hovedfagområde" title="Hovedfagområde" style={{ position: "absolute", left: -12, color: "#0057b8", fontWeight: 700 }}>
            *
          </span>
        )}
        {area}
      </div>
      <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 8, margin: "2px 0 0 10px", padding: "3px 0" }}>
        <span style={{ position: "absolute", left: 0, top: 0, bottom: "50%", width: 1, background: treeLine }} />
        <span style={{ flex: "0 0 14px", height: 1, background: treeLine }} />
        <span style={{ fontSize: muted ? "0.8125rem" : "0.875rem", color: muted ? "#a1a1aa" : undefined, whiteSpace: "nowrap" }}>{subcategory}</span>
      </div>
    </>
  );
}

type PillKind = "old" | "removed" | "new" | "same" | "added";

const pillStyles: Record<PillKind, { background: string; border: string; color: string; textDecoration?: string }> = {
  old: { background: "#ffffff", border: "1px dashed #a1a1aa", color: "#52525b" },
  removed: { background: "#fde4e4", border: "1px solid #e8a9a5", color: "#b3261e", textDecoration: "line-through" },
  new: { background: "#e3effa", border: "1px solid #9ec0e0", color: "#00467f" },
  same: { background: "#f4f4f5", border: "1px solid #d4d4d8", color: "#27272a" },
  added: { background: "#e8f5e4", border: "1px solid #a9d39b", color: "#2e6b1f" },
};

function AreaPill({ label, kind, count, bold = false }: { label: string; kind: PillKind; count?: number; bold?: boolean }) {
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
        textDecoration: style.textDecoration,
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

function ChangeArrow({ equal = false, color = "#71717a" }: { equal?: boolean; color?: string }) {
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
        borderTop: "1px solid #e4e4e7",
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
            <AreaPill label={label} kind="added" count={count} />
            <p style={{ margin: "6px 0 0", color: "#52525b" }}>{note}</p>
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
        borderTop: compact ? undefined : "1px solid #e4e4e7",
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
        {note && <p style={{ margin: compact ? "3px 0 0" : "6px 0 0", color: "#52525b", fontSize: compact ? "0.8125rem" : undefined }}>{note}</p>}
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

/** Anbefalte nye navn på studier og kurs, med nåværende tittel som nøkkel. */
const suggestedNames: Record<string, string> = {
  "Juss for ledere": "Juss for skole- og barnehageledere",
  "Ledelse av utviklings- og endringsarbeid": "Ledelse av utviklings- og endringsarbeid i skole og barnehage",
  "Ledelse av tjenesteutvikling": "Ledelse av tjenesteutvikling i helse- og omsorgstjenesten",
  "Rådgivning og risiko": "Rådgivning og risiko i finansnæringen",
  "Regelverk og risikoer": "Regelverk og risikoer i finansnæringen",
  "Risikobasert tilnærming": "Risikobasert tilnærming i finansnæringen",
  "Utvalgte praktiske problemstillinger": "Utvalgte praktiske problemstillinger innen compliance i finansnæringen",
  "Grunnleggende teknologiforståelse": "Grunnleggende teknologiforståelse i finansnæringen",
  "D-box kurs i systemorientert innovasjon": "Systemorientert innovasjon (D-box)",
  "Ledelse; makt og mening": "Ledelse, makt og mening",
  "Customer and Market analytics": "Customer and Market Analytics",
};

const statusOrder: Status[] = [
  "Flyttet til nytt fagområde",
  "Manglet fagområde",
  "1 fagområde prioritert",
  "Endret navn på fagområde",
  "Uendret",
  "Fagområde fjernet",
];

const statusPieColors: Record<Status, string> = {
  "Flyttet til nytt fagområde": "#d9822b",
  "Manglet fagområde": "#8e5ea2",
  "1 fagområde prioritert": "#00467f",
  "Endret navn på fagområde": "#2f9e8f",
  Uendret: "#a1a1aa",
  "Fagområde fjernet": "#c2185b",
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
      <span style={{ width: 12, height: 12, borderRadius: 3, background: statusPieColors[status] }} />
      <StatusBadge status={status} wide />
      <span>
        {count} <span style={{ color: "#71717a" }}>({Math.round((count / total) * 100)} %)</span>
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
        <div style={{ borderTop: "1px solid #d4d4d8", margin: "4px 0 2px" }} />
        {legendRow("Fagområde fjernet", removedCount)}
        <span style={{ color: "#71717a", fontSize: "0.8125rem" }}>
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
  background: "#ffffff",
  boxShadow: "inset 0 -2px 0 #00467f",
} as const;

const studyCount = (list: Row[]) => list.filter(([, , , level]) => !/kurs/i.test(level)).length;

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

const newAreas = ["Helse, skole og barnehage", "Sikkerhet og beredskap"];

/** Tidligere fagområder (eller «Manglet fagområde») for studier og kurs i et nytt fagområde som ikke kom fra Offentlig sektor. */
function otherOrigins(area: string): { origin: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const row of summaryRows) {
    if (row[0] !== area || row[4].split("; ").includes("Offentlig sektor")) continue;
    const origin = row[4] === "–" ? "Manglet fagområde" : row[4];
    counts.set(origin, (counts.get(origin) ?? 0) + 1);
  }
  return [...counts].map(([origin, count]) => ({ origin, count })).sort((a, b) => b.count - a.count);
}

function originNote(area: string): string {
  const fromPublic = summaryRows.filter((row) => row[0] === area && row[4].split("; ").includes("Offentlig sektor")).length;
  const others = otherOrigins(area).map(({ origin, count }) =>
    origin === "Manglet fagområde" ? `${count} hadde ikke fagområde fra før` : `${count} kom fra ${origin}`,
  );
  const joined = others.length > 1 ? `${others.slice(0, -1).join(", ")} og ${others[others.length - 1]}` : others[0];
  return `${fromPublic} av ${areaCount(area)} studier og kurs kom fra Offentlig sektor${joined ? `, ${joined}` : ""}.`;
}

const areaColors: Record<string, string> = {
  "Finans, økonomi og regnskap": "#00467f",
  "Helse, skole og barnehage": "#2f9e8f",
  "HR og organisasjonsutvikling": "#8e5ea2",
  "Juss, skatt og eiendom": "#6b7280",
  "KI, digitalisering og analytics": "#c2185b",
  Ledelse: "#d9822b",
  "Markedsføring, kommunikasjon og kultur": "#2e7d32",
  "Sikkerhet og beredskap": "#b3261e",
  "Strategi, innovasjon og bærekraft": "#1e88e5",
};

const areaColor = (area: string) => areaColors[area] ?? "#a1a1aa";

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

type LevelSplit = { key: string; label: string; color: string; match: (row: Row) => boolean };

const levelSplits: Record<string, LevelSplit[]> = {
  Bachelorkurs: [
    { key: "Kurs", label: "Bachelorkurs", color: "#00467f", match: (row) => row[3] === "Bachelorkurs" },
    { key: "Deltid", label: "Bachelorstudier, deltid", color: "#c2185b", match: (row) => row[3] === "Bachelor" },
  ],
  Masterkurs: [
    { key: "Kurs", label: "Masterkurs", color: "#00467f", match: (row) => row[3] === "Masterkurs" },
    { key: "Deltid", label: "Masterstudier, deltid", color: "#c2185b", match: (row) => row[3] === "Master" },
  ],
  Heltid: [
    { key: "Bachelor", label: "Bachelorstudier", color: "#00467f", match: (row) => row[3] === "Bachelor" },
    { key: "Master", label: "Masterstudier", color: "#2f9e8f", match: (row) => row[3] === "Master" },
  ],
  Deltid: [
    { key: "Bachelorkurs", label: "Bachelorkurs", color: "#00467f", match: (row) => row[3] === "Bachelorkurs" },
    { key: "Masterkurs", label: "Masterkurs", color: "#2f9e8f", match: (row) => row[3] === "Masterkurs" },
  ],
  NettAlle: [
    { key: "Bachelor", label: "Bachelorstudier", color: "#8e5ea2", match: (row) => row[3] === "Bachelor" },
    { key: "Arsenhet", label: "Årsenhet", color: "#d9822b", match: (row) => /årsenhet/i.test(row[3]) },
    { key: "Bachelorkurs", label: "Bachelorkurs", color: "#00467f", match: (row) => row[3] === "Bachelorkurs" },
    {
      key: "Andre",
      label: "Masterkurs og kurs uten studiepoeng",
      color: "#a1a1aa",
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

const levelExcluded = summaryRows.filter((row) => !levelGroups.some(({ filter }) => filter(row))).length;

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
const noOldArea = "Ingen fagområde";

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
  mainArea: "#00467f",
  extraArea: "#d9822b",
  mainSub: "#7fa7cb",
  extraSub: "#f0c391",
  extraText: "#b45f06",
};

const treeLine = "#c4c4c8";

const summaryHeading = {
  margin: "44px 0 12px",
  padding: "16px 0 0",
  borderTop: "2px solid #00467f",
  fontSize: "1.5rem",
  lineHeight: 1.25,
  color: "#00467f",
} as const;
const summarySubHeading = { margin: "32px 0 12px", fontSize: "1.1875rem", fontWeight: 700, color: "#27272a" } as const;
const summaryList = { margin: 0, paddingLeft: 20 } as const;

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
      { no: "Team-, medarbeider- og endringsledelse", en: "Team, People and Change Leadership", terms: "Team Leadership, Organisational Psychology, Change Management" },
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

const pieColors = ["#00467f", "#2f9e8f", "#d9822b", "#8e5ea2", "#c2185b", "#6b7280", "#7fa7d4", "#9a7b1c", "#6aa84f", "#17a2b8", "#a05a2c"];

/** Antall hovedplasseringer og ekstra-plasseringer per underkategori i et fagområde, alfabetisk. */
function subcategoryCounts(area: string): { name: string; main: number; extra: number }[] {
  const counts = new Map<string, { main: number; extra: number }>();
  for (const row of rows) {
    row[6].split("; ").forEach((entry, index) => {
      const [entryArea, name] = entry.split(" › ");
      if (entryArea !== area) return;
      const count = counts.get(name) ?? { main: 0, extra: 0 };
      if (index === 0) count.main += 1;
      else count.extra += 1;
      counts.set(name, count);
    });
  }
  return [...counts]
    .map(([name, count]) => ({ name, ...count }))
    .sort((a, b) => a.name.localeCompare(b.name, "nb"));
}

function SubcategoryPie({ area }: { area: string }) {
  const counts = subcategoryCounts(area);
  const total = counts.reduce((sum, { main, extra }) => sum + main + extra, 0);
  let angle = 0;
  const stops = counts.map(({ main, extra }, index) => {
    const start = angle;
    angle += ((main + extra) / total) * 360;
    return `${pieColors[index % pieColors.length]} ${start}deg ${angle}deg`;
  });
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
      <div
        role="img"
        aria-label="Fordeling av underkategorier, hoved og ekstra samlet"
        style={{ flex: "0 0 auto", width: 120, height: 120, borderRadius: "50%", background: `conic-gradient(${stops.join(", ")})` }}
      />
      <div style={{ display: "grid", gap: 4, color: "#52525b", fontSize: "0.875rem" }}>
        {counts.map(({ name, main, extra }, index) => (
          <span key={name} style={{ display: "inline-flex", alignItems: "center", gap: 8, whiteSpace: "nowrap" }}>
            <span style={{ width: 12, height: 12, borderRadius: 3, background: pieColors[index % pieColors.length] }} />
            <span>
              {name} ({main + extra}, {Math.round(((main + extra) / total) * 100)} %)
              <span style={{ color: "#71717a" }}>
                {" "}
                {main} hoved{extra > 0 ? ` + ${extra} ekstra` : ""}
              </span>
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

function subcategorySummary(area: string): string {
  return subcategoryCounts(area)
    .map(({ name, main, extra }) => `${name} (${main + extra})`)
    .join(", ");
}

/** Fagområder som har fått nytt navn eller er delt ut fra et tidligere fagområde. */
const areaOrigin: Record<string, { label: string; from: string; text: (linked: number, total: number) => string }> = {
  "Finans, økonomi og regnskap": {
    label: "Tidligere navn",
    from: "Finans, økonomi og styring",
    text: (linked, total) => `Finans, økonomi og styring. ${linked} av ${total} studier og kurs hadde dette fagområdet fra før.`,
  },
  "Juss, skatt og eiendom": {
    label: "Tidligere navn",
    from: "Eiendom, varehandel og forretningsjus",
    text: (linked, total) =>
      `Eiendom, varehandel og forretningsjus. ${linked} av ${total} studier og kurs hadde dette fagområdet fra før. Skatt og avgift er slått sammen med fagområdet.`,
  },
  "KI, digitalisering og analytics": {
    label: "Tidligere navn",
    from: "Digitalisering og Analytics",
    text: (linked, total) => `Digitalisering og Analytics. ${linked} av ${total} studier og kurs hadde dette fagområdet fra før.`,
  },
  "HR og organisasjonsutvikling": {
    label: "Tidligere navn",
    from: "Organisasjonsutvikling og Human Resource Management",
    text: (linked, total) =>
      `Organisasjonsutvikling og Human Resource Management. ${linked} av ${total} studier og kurs hadde dette fagområdet fra før.`,
  },
  "Helse, skole og barnehage": {
    label: "Delt ut fra",
    from: "Offentlig sektor",
    text: (linked, total) => `Offentlig sektor, som er delt opp. ${linked} av ${total} studier og kurs hadde dette fagområdet fra før.`,
  },
  "Sikkerhet og beredskap": {
    label: "Delt ut fra",
    from: "Offentlig sektor",
    text: (linked, total) => `Offentlig sektor, som er delt opp. ${linked} av ${total} studier og kurs hadde dette fagområdet fra før.`,
  },
};

const areaRationale: Record<string, string> = {
  "Juss, skatt og eiendom":
    "Fag der regelverk og juridisk kunnskap er kjernen: rettsvitenskap, forretningsjus, arbeidsrett, skatt og avgift og eiendomsmegling. Skiller seg fra Finans ved at jus og skatterett, ikke økonomi, er hovedfaget. Fordelingen er 18 innen jus, 8 innen skatt og 2 innen eiendom.",
  "Finans, økonomi og regnskap":
    "Det største fagfeltet: finans, økonomi, regnskap, økonomistyring og logistikk. Fagene bygger på felles økonomisk teori og kvantitative metoder, og har egne yrkesløp som revisor og regnskapsfører.",
  "Strategi, innovasjon og bærekraft":
    "Hvordan virksomheter fornyer seg og tar ansvar for omgivelsene: innovasjon og entreprenørskap, bærekraft og strategi.",
  "Helse, skole og barnehage":
    "Kurs for ledere i helse og utdanning, med egne målgrupper som allmennleger, tannleger, rektorer og barnehagestyrere. Innholdet er tilpasset sektorenes regelverk og styring, og passer ikke i generell ledelse.",
  "KI, digitalisering og analytics":
    "KI, data, analyse og digital transformasjon, ofte sammen med metode og statistikk. Fagene har eget teknologifokus og egen etterspørsel på tvers av bransjer.",
  Ledelse:
    "Lederrollen og lederskap: grunnutdanning i ledelse, lederutvikling, teamledelse og prosjektledelse. Bare fag der ledelse er hovedtemaet, ikke en bransje eller et annet fagfelt.",
  "Markedsføring, kommunikasjon og kultur":
    "Markedsføring, merkevare, kommunikasjon og forbrukeratferd, med internasjonale og kulturelle perspektiver. Et etablert fagfelt med egne studier og en tydelig målgruppe, der kommunikasjon og kultur hører naturlig sammen med markedsføring.",
  "HR og organisasjonsutvikling":
    "Mennesker og organisering i virksomheter: HR, organisasjonspsykologi, arbeidsmiljø og endring. Et eget fagfelt som handler om organisasjonen som helhet, i motsetning til Ledelse som handler om lederrollen.",
  "Sikkerhet og beredskap":
    "Sikkerhetsledelse, digital sikkerhet, beredskap og terrorbekjempelse. Et lite, men tydelig avgrenset tema med egen målgruppe, samlet slik at det er lett å finne.",
};

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
            stroke="#ffffff"
            strokeWidth={0.5}
            onMouseEnter={() => setFocus({ from: link.from, to: link.to })}
          >
            <title>{`${areaShortName[link.from]} (hoved) → ${areaShortName[link.to]} (ekstra): ${link.count}`}</title>
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
                  <text x={labelX} y={top} textAnchor={anchor} dominantBaseline="middle" fontSize="13" fontWeight={focusArea === area ? 700 : 600} fill="#27272a">
                    {lines.map((line, lineIndex) => (
                      <tspan key={line} x={labelX} dy={lineIndex === 0 ? 0 : 15}>
                        {line}
                      </tspan>
                    ))}
                  </text>
                  <text x={labelX} y={top + (lines.length - 1) * 15 + 15} textAnchor={anchor} dominantBaseline="middle" fontSize="11" fill="#71717a">
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
            stroke="#ffffff"
            strokeWidth={0.4}
            onMouseEnter={() => setFocus({ from: link.from, to: link.to })}
          >
            <title>{`${label(link.from)} (hoved) → ${label(link.to)} (ekstra): ${link.count}`}</title>
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
              <text transform={flip ? "rotate(180)" : undefined} textAnchor={flip ? "end" : "start"} dominantBaseline="middle" fontSize="13" fontWeight={focused ? 700 : 400} fill="#27272a">
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
      <div style={{ fontWeight: 700, color: "#00467f" }}>Sterkeste koblinger mellom underkategorier</div>
      <div style={{ display: "grid", gridTemplateColumns: "24px max-content 72px max-content max-content", columnGap: 12, rowGap: 8, alignItems: "center", margin: "8px 0 20px", fontSize: "0.875rem" }}>
        {strongest.map(({ from, to, count, share }) => (
          <Fragment key={`${from}|${to}`}>
            <span style={{ textAlign: "right", fontWeight: 700 }}>{count}</span>
            <span style={{ justifySelf: "start", padding: "2px 8px", borderRadius: 4, background: "#ffffff", borderLeft: `4px solid ${areaColor(entryArea(from))}` }}>{label(from)}</span>
            <span style={{ justifySelf: "center", width: 44 }}>
              <ChangeArrow />
            </span>
            <span style={{ justifySelf: "start", padding: "2px 8px", borderRadius: 4, background: "#ffffff", borderLeft: `4px solid ${areaColor(entryArea(to))}` }}>{label(to)}</span>
            <span style={{ color: share === 1 ? "#2e6b1f" : "#71717a", fontSize: "0.8125rem" }}>
              {share === 1 ? "alle hovedkursene" : `${Math.round(share * 100)} % av hovedkursene`}
            </span>
          </Fragment>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "0 24px", alignItems: "center" }}>
        <div style={{ alignSelf: "start", minHeight: 76 }}>
          <div style={{ fontWeight: 700, color: "#52525b" }}>Fagområder</div>
          <p style={{ margin: "2px 0 0", color: "#52525b", fontSize: "0.8125rem" }}>
            {describe(areaFocus, "Hold musepekeren over et fagområde eller en strek.")}
          </p>
        </div>
        <div style={{ alignSelf: "start", minHeight: 76 }}>
          <div style={{ fontWeight: 700, color: "#52525b" }}>Underkategorier</div>
          <p style={{ margin: "2px 0 0", color: "#52525b", fontSize: "0.8125rem" }}>
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

function BeforeAfterKpis() {
  const { before, withSeveral, withoutArea } = beforeAfter;
  const total = summaryRows.length;
  const pct = (value: number) => `${Math.round((value / total) * 100)} %`;
  const largestBefore = Math.max(...[...before].filter(([name]) => name !== noOldArea).map(([, value]) => value.count));
  const largestAfter = Math.max(...areaTree.map(({ main }) => main));
  const withExtra = summaryRows.filter((row) => row[6].split("; ").some((entry) => entry.split(" › ")[0] !== row[0])).length;
  const cards: { label: string; before: string; after: string; note: string }[] = [
    { label: "Uten fagområde", before: `${withoutArea}`, after: "0", note: `${pct(withoutArea)} av studiene og kursene manglet fagområde. Nå har alle ett.` },
    {
      label: "Flere fagområder uten prioritet",
      before: `${withSeveral}`,
      after: "0",
      note: `${pct(withSeveral)} hadde flere likestilte fagområder. Nå har alle ett hovedfagområde (*), og ${withExtra} har i tillegg ekstra fagområder med egen underkategori.`,
    },
    {
      label: "Største fagområde",
      before: pct(largestBefore),
      after: pct(largestAfter),
      note: "Andel av alle studier og kurs i det største fagområdet. Mindre samleområde.",
    },
    { label: "Nivåer", before: "1", after: "2", note: `Før fantes bare fagområde. Nå finnes også ${subcategoryCount} underkategorier som gjør innholdet synlig.` },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 16, margin: "0 0 20px" }}>
      {cards.map(({ label, before: b, after: a, note }) => (
        <div key={label} style={{ background: "#ffffff", border: "1px solid #e4e4e7", borderRadius: 8, padding: 16 }}>
          <div style={{ color: "#52525b", fontSize: "0.8125rem", fontWeight: 600 }}>{label}</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, margin: "6px 0" }}>
            <span style={{ fontSize: "1.5rem", color: "#71717a", textDecoration: "line-through", textDecorationColor: "#d4d4d8" }}>{b}</span>
            <span style={{ width: 32 }}>
              <ChangeArrow />
            </span>
            <span style={{ fontSize: "1.75rem", fontWeight: 700, color: "#00467f" }}>{a}</span>
          </div>
          <div style={{ color: "#52525b", fontSize: "0.8125rem" }}>{note}</div>
        </div>
      ))}
    </div>
  );
}

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
    return target ? areaColor(target) : name === noOldArea ? "#d4d4d8" : "#8d6e63";
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
            <text x={-8} y={y + h / 2} textAnchor="end" dominantBaseline="middle" fontSize="12" fill="#27272a" textDecoration={oldAreaCatalog[name]?.kind === "removed" ? "line-through" : undefined}>
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
            <text x={width + 8} y={y + h / 2} textAnchor="start" dominantBaseline="middle" fontSize="12" fill="#27272a">
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

const beforeAfterExamples: { title: string; level: string }[] = [
  { title: "Juss for ledere", level: "Masterkurs" },
  { title: "Effektive team", level: "Bachelorkurs" },
  { title: "Leading in the Age of AI", level: "Masterkurs" },
  { title: "Arbeidsrett og arbeidsliv", level: "Masterkurs" },
  { title: "Bærekraftig risikostyring", level: "Bachelorkurs" },
  { title: "Helseledelse", level: "Masterkurs" },
];

function BeforeAfterExamples() {
  const normalizeTitle = (text: string) => text.replace(/\u00ad|\(-\)/g, "");
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16, margin: "0 0 20px" }}>
      {beforeAfterExamples.map(({ title, level }) => {
        const row = summaryRows.find((candidate) => normalizeTitle(candidate[2]) === title && candidate[3] === level);
        if (!row) return null;
        const previous = row[4].split("; ").filter((p) => p !== "–");
        const entries = row[6].split("; ");
        return (
          <div key={title} style={{ background: "#ffffff", border: "1px solid #e4e4e7", borderRadius: 8, padding: 16 }}>
            <div style={{ fontWeight: 700 }}>{title}</div>
            <div style={{ color: "#71717a", fontSize: "0.8125rem", marginBottom: 10 }}>{level}</div>
            <div style={{ color: "#71717a", fontSize: "0.8125rem", marginBottom: 4 }}>
              Før: {previous.length > 1 ? `${previous.length} fagområder uten prioritet` : previous.length === 1 ? "1 fagområde" : "ingen fagområde"}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
              {previous.length ? previous.map((name) => <AreaPill key={name} label={shortOldName(name)} kind={oldAreaCatalog[name]?.kind === "removed" ? "removed" : "old"} />) : <AreaPill label="Ingen fagområde" kind="added" />}
            </div>
            <div style={{ color: "#00467f", fontSize: "0.8125rem", fontWeight: 600, marginBottom: 4 }}>
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

function BeforeAfterOverview() {
  const { before, after, extras, subs, withSeveral, withoutArea, pairCount } = beforeAfter;
  const total = summaryRows.length;
  const extraTotal = (area: string) => [...(extras.get(area)?.values() ?? [])].reduce((sum, value) => sum + value, 0);
  const maxCount = Math.max(...[...before.values()].map((v) => v.count), ...[...after.values()].map((v) => v.count), ...[...after.entries()].map(([area, value]) => value.count + extraTotal(area)));
  const percent = (value: number) => `${Math.round((value / total) * 100)} %`;
  const bar = (segments: { key: string; value: number; color: string }[], count: number) => (
    <div style={{ display: "flex", width: `${(count / maxCount) * 100}%`, height: 14, borderRadius: 7, overflow: "hidden", background: "#e4e4e7" }}>
      {segments
        .filter(({ value }) => value > 0)
        .map(({ key, value, color }) => (
          <div key={key} style={{ flex: value, background: color, borderRight: "1px solid #ffffff" }} />
        ))}
    </div>
  );
  const breakdown = (items: { name: string; value: number; color: string }[], prefix: string) => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "2px 12px", color: "#52525b", fontSize: "0.8125rem" }}>
      <span style={{ color: "#71717a" }}>{prefix}</span>
      {items
        .filter(({ value }) => value > 0)
        .sort((a, b) => b.value - a.value)
        .map(({ name, value, color }) => (
          <span key={name} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
            <span style={{ width: 9, height: 9, borderRadius: 2, background: color }} />
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
          <span style={{ color: "#71717a", fontSize: "0.8125rem" }}>studier og kurs{info?.note ? ` · ${info.note}` : ""}</span>
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
      <div style={{ display: "flex", width: `${((main + extra) / maxCount) * 100}%`, height, borderRadius: height / 2, overflow: "hidden", background: "#e4e4e7" }}>
        {main > 0 && <div title={`Hovedfagområde: ${main}`} style={{ flex: main, background: color }} />}
        {extra > 0 && <div title={`Ekstra fagområde: ${extra}`} style={{ flex: extra, background: color, opacity: 0.35 }} />}
      </div>
    );
    const rowGrid = { display: "grid", gridTemplateColumns: "minmax(120px, 210px) minmax(0, 1fr) 118px", gap: 8, alignItems: "center", fontSize: "0.8125rem" } as const;
    return (
      <div key={area} style={{ display: "grid", gap: 6 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span style={{ padding: "4px 10px", border: "1px solid #9ec0e0", borderRadius: 4, background: "#e3effa", color: "#00467f" }}>{area}</span>
          <span style={{ color: "#71717a", fontSize: "0.8125rem" }}>Hovedkursene kom fra: {origins}</span>
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
              <span style={{ color: "#3f3f46" }}>{name}</span>
              <div style={{ display: "flex" }}>{twoToneBar(main, extra, 8)}</div>
              <span style={{ color: "#71717a", whiteSpace: "nowrap" }}>
                {main > 0 && <strong style={{ color: "#27272a" }}>{main}</strong>}
                {extra > 0 && ` ${main > 0 ? "+ " : ""}${extra}`}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const toLedelseFromHr = pairCount("Organisasjonsutvikling og Human Resource Management", "Ledelse");
  const toHrFromLedelse = pairCount("Ledelse", "HR og organisasjonsutvikling");
  const financeToLaw = pairCount("Finans, økonomi og styring", "Juss, skatt og eiendom");
  const digitalToMarketing = pairCount("Digitalisering og Analytics", "Markedsføring, kommunikasjon og kultur");

  return (
    <div>
      <BeforeAfterKpis />
      <p style={{ margin: "0 0 4px", color: "#52525b", fontSize: "0.8125rem" }}>
        Fra gamle fagområder (til venstre) til nye hovedfagområder (til høyre). Bredden viser antall studier og kurs. Et studie eller kurs med flere gamle
        fagområder deles likt mellom dem. Hold musepekeren over et fagområde for å se hvor kursene kom fra eller gikk.
      </p>
      <BeforeAfterSankey />
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 40px minmax(0, 1fr)", gap: "0 16px", margin: "0 0 4px" }}>
        <div>
          <div style={{ fontWeight: 700, color: "#52525b" }}>Før (bi.no i dag)</div>
          <p style={{ margin: "2px 0 8px", color: "#52525b", fontSize: "0.8125rem" }}>
            Stolpen viser hvor de ble av. Fargene er det nye hovedfagområdet. {withSeveral} av {total} ({percent(withSeveral)}) hadde flere fagområder, og {withoutArea}{" "}
            ({percent(withoutArea)}) hadde ingen.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "2px 12px", color: "#52525b", fontSize: "0.8125rem" }}>
            {overlapOrder.map((area) => (
              <span key={area} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                <span style={{ width: 9, height: 9, borderRadius: 2, background: areaColor(area) }} />
                {areaShortName[area]}
              </span>
            ))}
          </div>
        </div>
        <span />
        <div>
          <div style={{ fontWeight: 700, color: "#00467f" }}>Nå (forslaget)</div>
          <p style={{ margin: "2px 0 8px", color: "#52525b", fontSize: "0.8125rem" }}>
            Én stolpe per fagområde: solid farge er studier og kurs med fagområdet som hovedfagområde, og lys farge er de som har det som ekstra.
            De mindre stolpene under er underkategoriene, i samme skala. Tallene viser antall studier og kurs som hoved + ekstra, og totalt for hele fagområdet.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "2px 16px", color: "#52525b", fontSize: "0.8125rem" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
              <span style={{ width: 14, height: 9, borderRadius: 2, background: "#1b6a5f" }} />
              Hovedfagområde (*)
            </span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
              <span style={{ width: 14, height: 9, borderRadius: 2, background: "#1b6a5f", opacity: 0.35 }} />
              Ekstra fagområde
            </span>
          </div>
        </div>
      </div>
      {lineage.map(({ olds, news }) => (
        <div
          key={olds.join("|")}
          style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 40px minmax(0, 1fr)", gap: "0 16px", alignItems: "start", padding: "12px 0", borderTop: "1px solid #e4e4e7" }}
        >
          <div style={{ display: "grid", gap: 12 }}>{olds.map((name) => oldCell(name))}</div>
          <div style={{ paddingTop: 6 }}>
            <ChangeArrow />
          </div>
          {news.length > 0 ? (
            <div style={{ display: "grid", gap: 12 }}>{news.map((area) => newCell(area))}</div>
          ) : (
            <div style={{ color: "#71717a", fontSize: "0.875rem", paddingTop: 4 }}>
              {olds[0] === noOldArea
                ? "Har nå fått hovedfagområde (se stolpen til venstre)."
                : "Ikke lenger fagområder. Studiene og kursene er plassert i andre fagområder, og Prosjektledelse er en underkategori i Ledelse."}
            </div>
          )}
        </div>
      ))}

      <h4 style={summarySubHeading}>Seks eksempler: før og nå</h4>
      <BeforeAfterExamples />

      <h4 style={summarySubHeading}>Hva fungerer bedre</h4>
      <div style={{ columnCount: 2, columnGap: 16, margin: "0 0 20px" }}>
        {(() => {
          const withOne = total - withoutArea - withSeveral;
          const card = { background: "#ffffff", border: "1px solid #e4e4e7", borderRadius: 8, padding: 16, display: "grid", gap: 10, alignContent: "start", breakInside: "avoid", marginBottom: 16 } as const;
          const heading = (text: string, sub: string) => (
            <div>
              <div style={{ fontWeight: 700 }}>{text}</div>
              <div style={{ color: "#52525b", fontSize: "0.8125rem" }}>{sub}</div>
            </div>
          );
          const labelled = (label: string, content: React.ReactNode) => (
            <div style={{ display: "grid", gridTemplateColumns: "34px minmax(0, 1fr)", gap: 8, alignItems: "center", fontSize: "0.8125rem" }}>
              <span style={{ color: "#71717a" }}>{label}</span>
              {content}
            </div>
          );
          const segmentBar = (segments: { key: string; value: number; color: string; label: string }[], widthPercent = 100) => (
            <div style={{ display: "flex", width: `${widthPercent}%`, height: 22, borderRadius: 6, overflow: "hidden", background: "#e4e4e7" }}>
              {segments
                .filter((segment) => segment.value > 0)
                .map((segment) => (
                  <div
                    key={segment.key}
                    title={`${segment.label}: ${segment.value}`}
                    style={{ flex: segment.value, background: segment.color, borderRight: "1px solid #ffffff", color: "#ffffff", fontSize: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", whiteSpace: "nowrap" }}
                  >
                    {segment.value}
                  </div>
                ))}
            </div>
          );
          const publicParts = [...(before.get("Offentlig sektor")?.destinations ?? [])].sort((x, y) => y[1] - x[1]);
          const ledelseSubs = [...(subs.get("Ledelse") ?? [])].filter(([, v]) => v.main > 0).sort((x, y) => y[1].main - x[1].main);
          const financeBefore = before.get("Finans, økonomi og styring")?.count ?? 0;
          const financeAfter = after.get("Finans, økonomi og regnskap")?.count ?? 0;
          const ledelseBefore = before.get("Ledelse")?.count ?? 0;
          const crossCutting = [...subs]
            .flatMap(([area, map]) => [...map].filter(([, value]) => value.main === 0 && value.extra > 0).map(([name, value]) => ({ area, name, count: value.extra })))
            .sort((x, y) => y.count - x.count);
          const majorRows = summaryRows.length === rows.length ? [] : rows.filter((row) => !summaryRows.includes(row));
          const nameSuggestions = Object.entries(suggestedNames);
          const statusCount = (status: Status) => summaryRows.filter((row) => row[1][0] === status).length;
          const keptCount = statusCount("Uendret") + statusCount("Endret navn på fagområde");
          const prioritisedCount = statusCount("1 fagområde prioritert");
          const movedCount = statusCount("Flyttet til nytt fagområde");
          const missingCount = statusCount("Manglet fagområde");
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
          const englishExamples = ["Bedriftsøkonomi", "Logistikk og forsyningskjeder", "Innovasjon og entreprenørskap", "Endringsledelse"]
            .map((name) => englishNames.flatMap((group) => group.subcategories).find((sub) => sub.no === name))
            .filter((sub): sub is NonNullable<typeof sub> => Boolean(sub));
          const englishTotal = englishNames.reduce((sum, group) => sum + 1 + group.subcategories.length, 0);
          const missingRows = summaryRows.filter((row) => row[4] === "–");
          const missingMap = new Map<string, number>();
          for (const row of missingRows) missingMap.set(row[0], (missingMap.get(row[0]) ?? 0) + 1);
          const missingParts = [...missingMap].sort((x, y) => y[1] - x[1]);
          const areaMain = (area: string) => after.get(area)?.count ?? 0;
          const areaExtra = (area: string) => [...(extras.get(area)?.values() ?? [])].reduce((sum, value) => sum + value, 0);
          const subCounts = [...subs].map(([area, map]) => [area, map.size] as [string, number]).sort((x, y) => overlapOrder.indexOf(x[0]) - overlapOrder.indexOf(y[0]));
          const withExtraRows = summaryRows.filter((row) => row[6].split("; ").some((entry) => entryArea(entry) !== row[0])).length;
          const placementsBefore = [...before].filter(([name]) => name !== noOldArea).reduce((sum, [, value]) => sum + value.count, 0);
          const placementsNow = summaryRows.reduce((sum, row) => sum + row[6].split("; ").length, 0);
          const withExtraCount = placementsNow - total;
          const renamedPairs = [
            { from: "Finans, økonomi og styring", to: "Finans, økonomi og regnskap", why: "«Styring» var tvetydig (økonomistyring eller ledelse?). Regnskap er et eget yrkesløp med revisor og regnskapsfører, og er nå synlig i navnet." },
            { from: "Digitalisering og Analytics", to: "KI, digitalisering og analytics", why: "KI er det kursene faktisk handler om i dag, og det manglet i navnet. Digitalisering og analytics er beholdt." },
            { from: "Organisasjonsutvikling og Human Resource Management", to: "HR og organisasjonsutvikling", why: "Kortere og lettere å søke på. HR står først fordi det er det største temaet, og HRM er skrevet ut som HR." },
            { from: "Eiendom, varehandel og forretningsjus", to: "Juss, skatt og eiendom", why: "Ingen kurs handler om varehandel, så det er tatt ut. Skatt og avgift er synlig i navnet, og «forretningsjus» er blitt «juss»." },
          ];
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
            <>
              <div style={card}>
                {heading("Alle har ett hovedfagområde", `Før manglet ${percent(withoutArea)} fagområde, og ${percent(withSeveral)} hadde flere uten prioritet. Nå har alle ett hovedfagområde (*).`)}
                {labelled(
                  "Før",
                  segmentBar([
                    { key: "none", value: withoutArea, color: "#a1a1aa", label: "Ingen fagområde" },
                    { key: "several", value: withSeveral, color: "#d9822b", label: "Flere fagområder uten prioritet" },
                    { key: "one", value: withOne, color: "#00467f", label: "Ett fagområde" },
                  ]),
                )}
                {labelled("Nå", segmentBar([{ key: "all", value: total, color: "#00467f", label: "Ett hovedfagområde" }]))}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, color: "#52525b", fontSize: "0.75rem" }}>
                  <span>■ <span style={{ color: "#a1a1aa" }}>ingen</span></span>
                  <span>■ <span style={{ color: "#d9822b" }}>flere, uten prioritet</span></span>
                  <span>■ <span style={{ color: "#00467f" }}>ett fagområde</span></span>
                </div>
              </div>

              <div style={card}>
                {heading("Fagområdene er temaer, ikke målgrupper", "«Offentlig sektor» blandet helse, jus og sikkerhet. Nå har hvert tema sitt eget fagområde.")}
                {labelled(
                  "Før",
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <AreaPill label="Offentlig sektor" kind="removed" />
                    <span style={{ color: "#52525b" }}>{before.get("Offentlig sektor")?.count ?? 0} studier og kurs</span>
                  </div>,
                )}
                {labelled(
                  "Nå",
                  segmentBar(publicParts.map(([area, value]) => ({ key: area, value, color: areaColor(area), label: area }))),
                )}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "2px 12px", color: "#52525b", fontSize: "0.75rem" }}>
                  {publicParts.map(([area, value]) => (
                    <span key={area} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                      <span style={{ width: 9, height: 9, borderRadius: 2, background: areaColor(area) }} />
                      {areaShortName[area]} {value}
                    </span>
                  ))}
                </div>
              </div>

              <div style={card}>
                {heading("Færre samleområder", `«Finans, økonomi og styring» rommet også jus og KI. Det største fagområdet er nå ${percent(financeAfter)} av alle, mot ${percent(financeBefore)}.`)}
                {labelled(
                  "Før",
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {segmentBar([{ key: "f", value: financeBefore, color: "#a1a1aa", label: "Finans, økonomi og styring" }], (financeBefore / maxCount) * 100)}
                  </div>,
                )}
                {labelled(
                  "Nå",
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {segmentBar([{ key: "f", value: financeAfter, color: areaColor("Finans, økonomi og regnskap"), label: "Finans" }], (financeAfter / maxCount) * 100)}
                  </div>,
                )}
                <div style={{ color: "#52525b", fontSize: "0.75rem" }}>Studier og kurs i det største fagområdet, i samme skala.</div>
              </div>

              <div style={card}>
                {heading("Underkategorier gjør innholdet synlig", `Før var «Ledelse» én lang liste med ${ledelseBefore} studier og kurs. Nå er hovedplasseringene delt i ${ledelseSubs.length} underkategorier.`)}
                {labelled("Før", segmentBar([{ key: "l", value: ledelseBefore, color: "#a1a1aa", label: "Ledelse (én liste)" }], (ledelseBefore / Math.max(ledelseBefore, 35)) * 100))}
                {labelled(
                  "Nå",
                  segmentBar(ledelseSubs.map(([name, value], index) => ({ key: name, value: value.main, color: pieColors[index % pieColors.length], label: name })), (35 / Math.max(ledelseBefore, 35)) * 100),
                )}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "2px 12px", color: "#52525b", fontSize: "0.75rem" }}>
                  {ledelseSubs.map(([name], index) => (
                    <span key={name} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                      <span style={{ width: 9, height: 9, borderRadius: 2, background: pieColors[index % pieColors.length] }} />
                      {name}
                    </span>
                  ))}
                </div>
              </div>

              <div style={card}>
                {heading("Studier og kurs kan finnes der man leter", `Før var det ${placementsBefore} plasseringer, uten prioritet. Nå har alle en hovedplassering, og ${withExtraCount} ekstra plasseringer gjør at studier og kurs også kan finnes i et nærliggende fagområde.`)}
                {labelled("Før", segmentBar([{ key: "p", value: placementsBefore, color: "#a1a1aa", label: "Plasseringer før" }], (placementsBefore / placementsNow) * 100))}
                {labelled(
                  "Nå",
                  segmentBar(
                    [
                      { key: "m", value: total, color: "#00467f", label: "Hovedfagområde" },
                      { key: "e", value: placementsNow - total, color: "#7fa7d4", label: "Ekstra fagområde" },
                    ],
                    100,
                  ),
                )}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, color: "#52525b", fontSize: "0.75rem" }}>
                  <span style={{ color: "#a1a1aa" }}>■ plasseringer før ({placementsBefore})</span>
                  <span style={{ color: "#00467f" }}>■ hovedfagområde ({total})</span>
                  <span style={{ color: "#7fa7d4" }}>■ ekstra ({placementsNow - total})</span>
                </div>
              </div>

              <div style={card}>
                {heading("Navnene sier mer om innholdet", "Fire fagområder har fått navn som beskriver innholdet bedre, «Offentlig sektor» er delt opp, og to små fagområder er blitt underkategorier.")}
                <div style={{ display: "grid", gap: 12 }}>
                  {renamedPairs.map(({ from, to, why }) => (
                    <div key={from} style={{ display: "grid", gap: 4 }}>
                      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 44px minmax(0, 1fr)", alignItems: "center", gap: 8 }}>
                        <span style={{ justifySelf: "start" }}>
                          <AreaPill label={shortOldName(from)} kind="old" />
                        </span>
                        <ChangeArrow />
                        <span style={{ justifySelf: "start", padding: "4px 10px", border: "1px solid #9ec0e0", borderRadius: 4, background: "#e3effa", color: "#00467f" }}>{to}</span>
                      </div>
                      <div style={{ color: "#52525b", fontSize: "0.8125rem" }}>{why}</div>
                    </div>
                  ))}
                  <div style={{ display: "grid", gap: 4 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 44px minmax(0, 1fr)", alignItems: "center", gap: 8 }}>
                      <span style={{ justifySelf: "start" }}>
                        <AreaPill label="Offentlig sektor" kind="removed" />
                      </span>
                      <ChangeArrow />
                      <span style={{ justifySelf: "start", padding: "4px 10px", border: "1px solid #9ec0e0", borderRadius: 4, background: "#e3effa", color: "#00467f" }}>
                        Helse, skole og barnehage + Sikkerhet og beredskap
                      </span>
                    </div>
                    <div style={{ color: "#52525b", fontSize: "0.8125rem" }}>
                      «Offentlig sektor» er en målgruppe, ikke et fag. De {before.get("Offentlig sektor")?.count ?? 0} kursene gikk til helse ({pairCount("Offentlig sektor", "Helse, skole og barnehage")}), jus og skatt ({pairCount("Offentlig sektor", "Juss, skatt og eiendom")}) og sikkerhet ({pairCount("Offentlig sektor", "Sikkerhet og beredskap")}) og har lite til felles. De nye navnene sier hva kursene handler om og hvem de er for. Til gjengjeld forsvinner samlingen «for offentlig sektor» som inngang, og bransjefilteret dekker det delvis.
                    </div>
                  </div>
                  <div style={{ color: "#52525b", fontSize: "0.8125rem" }}>
                    <strong>Internasjonal Business ({before.get("Internasjonal Business")?.count ?? 0}) og Prosjektledelse ({before.get("Prosjektledelse")?.count ?? 0}):</strong> var for små til å være egne fagområder. Internasjonal Business var spredt på mange temaer, og Prosjektledelse hører hjemme i Ledelse. Begge er nå underkategorier.
                  </div>
                </div>
              </div>

              <div style={card}>
                {heading("Bransje som egen inngang", `${industryTotal} studier og kurs er rettet mot en bestemt bransje. De kan finnes via bransjefilteret og en etikett, uten at bransjen er et eget fagområde.`)}
                {segmentBar(industryParts.map(([name, value], index) => ({ key: name, value, color: pieColors[index % pieColors.length], label: name })))}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "2px 12px", color: "#52525b", fontSize: "0.75rem" }}>
                  {industryParts.map(([name, value], index) => (
                    <span key={name} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                      <span style={{ width: 9, height: 9, borderRadius: 2, background: pieColors[index % pieColors.length] }} />
                      {name} {value}
                    </span>
                  ))}
                </div>
              </div>

              <div style={card}>
                {heading("Jevnere grupper å lete i", `Forskjellen mellom den største og den minste gruppen er ${statsAfter.spread} mellom de nye fagområdene og ${statsSubs.spread} mellom underkategoriene, mot ${statsBefore.spread} mellom de gamle fagområdene (${ratioAfter}× mot ${ratioBefore}× for fagområdene). Den relative variasjonen er omtrent som før, men gruppene er langt mindre, så ingen gruppe blir en lang liste.`)}
                <div style={{ display: "grid", gap: 14, padding: "4px 0 2px" }}>
                  {(
                    [
                      ["Før: fagområder", statsBefore, "#a1a1aa", dotValues.before],
                      ["Nå: fagområder", statsAfter, "#00467f", dotValues.after],
                      ["Nå: underkategorier", statsSubs, "#2f9e8f", dotValues.subs],
                    ] as [string, ReturnType<typeof describeSizes>, string, number[]][]
                  ).map(([label, stats, color, dots]) => (
                    <div key={label} style={{ display: "grid", gridTemplateColumns: "120px minmax(0, 1fr)", gap: 8, alignItems: "center", fontSize: "0.8125rem" }}>
                      <span style={{ color: "#71717a" }}>{label}</span>
                      <div style={{ position: "relative", height: 34 }}>
                        <div style={{ position: "absolute", left: 0, right: 0, top: 14, height: 1, background: "#d4d4d8" }} />
                        {dots.map((value, dotIndex) => (
                          <div key={dotIndex} title={`${value}`} style={{ position: "absolute", left: `calc(${(value / maxCount) * 100}% - 3px)`, top: 12, width: 6, height: 6, borderRadius: "50%", background: color, opacity: 0.55 }} />
                        ))}
                        <div title={`Fra ${stats.min} til ${stats.max}`} style={{ position: "absolute", left: `${(stats.min / maxCount) * 100}%`, width: `${((stats.max - stats.min) / maxCount) * 100}%`, top: 8, height: 14, borderRadius: 7, background: color, opacity: 0.35 }} />
                        <div title={`Minste: ${stats.min}`} style={{ position: "absolute", left: `${(stats.min / maxCount) * 100}%`, top: 6, width: 3, height: 18, background: color }} />
                        <div title={`Største: ${stats.max}`} style={{ position: "absolute", left: `calc(${(stats.max / maxCount) * 100}% - 3px)`, top: 6, width: 3, height: 18, background: color }} />
                        <div title={`Median: ${oneDecimal(stats.median)}`} style={{ position: "absolute", left: `calc(${(stats.median / maxCount) * 100}% - 6px)`, top: 9, width: 12, height: 12, borderRadius: "50%", background: "#ffffff", border: `3px solid ${color}` }} />
                        <div title={`Gjennomsnitt: ${oneDecimal(stats.mean)}`} style={{ position: "absolute", left: `calc(${(stats.mean / maxCount) * 100}% - 1px)`, top: 2, width: 2, height: 26, background: "#d9822b" }} />
                        <span style={{ position: "absolute", left: `${(stats.min / maxCount) * 100}%`, top: 24, fontSize: "0.6875rem", color: "#71717a", transform: "translateX(-50%)" }}>{stats.min}</span>
                        <span style={{ position: "absolute", left: `${(stats.max / maxCount) * 100}%`, top: 24, fontSize: "0.6875rem", color: "#71717a", transform: "translateX(-50%)" }}>{stats.max}</span>
                      </div>
                    </div>
                  ))}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "2px 14px", color: "#52525b", fontSize: "0.75rem" }}>
                    <span>● hver gruppe</span>
                    <span>▬ fra minste til største</span>
                    <span>◯ median</span>
                    <span style={{ color: "#d9822b" }}>| gjennomsnitt</span>
                  </div>
                  <table style={{ borderCollapse: "collapse", fontSize: "0.8125rem", width: "100%" }}>
                    <thead>
                      <tr style={{ color: "#71717a", textAlign: "right" }}>
                        <th style={{ textAlign: "left", fontWeight: 400, padding: "2px 0" }} />
                        <th style={{ fontWeight: 400 }}>Før: fagområder</th>
                        <th style={{ fontWeight: 400 }}>Nå: fagområder</th>
                        <th style={{ fontWeight: 400 }}>Nå: underkategorier</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(
                        [
                          ["Antall grupper", `${sizesBefore.length}`, `${sizesAfter.length}`, `${sizesSubs.length}`],
                          ["Største gruppe", `${statsBefore.max}`, `${statsAfter.max}`, `${statsSubs.max}`],
                          ["Minste gruppe", `${statsBefore.min}`, `${statsAfter.min}`, `${statsSubs.min}`],
                          ["Forskjell (største − minste)", `${statsBefore.spread}`, `${statsAfter.spread}`, `${statsSubs.spread}`],
                          ["Median", oneDecimal(statsBefore.median), oneDecimal(statsAfter.median), oneDecimal(statsSubs.median)],
                          ["Gjennomsnitt", oneDecimal(statsBefore.mean), oneDecimal(statsAfter.mean), oneDecimal(statsSubs.mean)],
                          ["Variasjon rundt snittet", `${Math.round(statsBefore.variation * 100)} %`, `${Math.round(statsAfter.variation * 100)} %`, `${Math.round(statsSubs.variation * 100)} %`],
                        ] as [string, string, string, string][]
                      ).map(([name, before, after, subsValue]) => (
                        <tr key={name} style={{ borderTop: "1px solid #ececee", textAlign: "right" }}>
                          <td style={{ textAlign: "left", padding: "3px 0", color: "#3f3f46" }}>{name}</td>
                          <td style={{ color: "#71717a" }}>{before}</td>
                          <td style={{ color: "#00467f" }}>{after}</td>
                          <td style={{ fontWeight: 700, color: "#1b6a5f" }}>{subsValue}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 16 }}>
                  {(
                    [
                      ["Før", sizesBefore, () => "#a1a1aa"],
                      ["Nå", sizesAfter, (name: string) => areaColor(name)],
                    ] as [string, [string, number][], (name: string) => string][]
                  ).map(([label, sizes, colorOf]) => (
                    <div key={label} style={{ display: "grid", gap: 3, alignContent: "start" }}>
                      <span style={{ color: "#71717a", fontSize: "0.8125rem" }}>{label}</span>
                      {sizes.map(([name, value]) => (
                        <div key={name} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.6875rem", color: "#71717a" }}>
                          <div style={{ width: `${(value / maxCount) * 100}%`, height: 6, borderRadius: 3, background: colorOf(name) }} />
                          {value}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                <div style={{ color: "#52525b", fontSize: "0.75rem" }}>Antall studier og kurs per fagområde, i samme skala. Før uten studier og kurs som manglet fagområde. Underkategoriene teller hoved og ekstra, på samme måte som fagområdene før.</div>
              </div>

              <div style={card}>
                {heading("Studier og kurs som manglet fagområde har fått hjem", `${missingRows.length} studier og kurs hadde ikke noe fagområde på bi.no. Nå er de fordelt på ${missingParts.length} fagområder.`)}
                {segmentBar(missingParts.map(([area, value]) => ({ key: area, value, color: areaColor(area), label: area })))}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "2px 12px", color: "#52525b", fontSize: "0.75rem" }}>
                  {missingParts.map(([area, value]) => (
                    <span key={area} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                      <span style={{ width: 9, height: 9, borderRadius: 2, background: areaColor(area) }} />
                      {area} {value}
                    </span>
                  ))}
                </div>
              </div>

              <div style={card}>
                {heading("Ledelse samler all ledelse", `Ledelse har ${areaMain("Ledelse")} studier og kurs som hovedfagområde og ${areaExtra("Ledelse")} til som ekstra, fra fag der ledelse er en viktig del. Den som leter i Ledelse, finner dem alle.`)}
                {segmentBar([
                  { key: "main", value: areaMain("Ledelse"), color: areaColor("Ledelse"), label: "Hovedfagområde" },
                  ...[...(extras.get("Ledelse") ?? [])].sort((x, y) => y[1] - x[1]).map(([area, value]) => ({ key: area, value, color: areaColor(area), label: `Ekstra, med hovedfagområde ${area}` })),
                ])}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "2px 12px", color: "#52525b", fontSize: "0.75rem" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                    <span style={{ width: 9, height: 9, borderRadius: 2, background: areaColor("Ledelse") }} />
                    Hovedfagområde {areaMain("Ledelse")}
                  </span>
                  {[...(extras.get("Ledelse") ?? [])]
                    .sort((x, y) => y[1] - x[1])
                    .map(([area, value]) => (
                      <span key={area} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                        <span style={{ width: 9, height: 9, borderRadius: 2, background: areaColor(area) }} />
                        Ekstra fra {area} {value}
                      </span>
                    ))}
                </div>
              </div>

              <div style={card}>
                {heading("Hvert fagområde har flere underkategorier", `Før fantes ingen underkategorier. Nå har hvert fagområde mellom ${Math.min(...subCounts.map(([, n]) => n))} og ${Math.max(...subCounts.map(([, n]) => n))}, så det er kort vei til riktig tema.`)}
                <div style={{ display: "grid", gap: 4 }}>
                  {subCounts.map(([area, n]) => (
                    <div key={area} style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr) 24px", gap: 8, alignItems: "center", fontSize: "0.8125rem" }}>
                      <span style={{ color: "#3f3f46" }}>{area}</span>
                      <div style={{ display: "flex", gap: 2 }}>
                        {Array.from({ length: n }, (_, index) => (
                          <div key={index} style={{ width: 14, height: 14, borderRadius: 3, background: areaColor(area) }} />
                        ))}
                      </div>
                      <strong style={{ textAlign: "right" }}>{n}</strong>
                    </div>
                  ))}
                </div>
              </div>

              <div style={card}>
                {heading("Overlapp er synlig i stedet for skjult", `${withExtraRows} av ${total} studier og kurs (${percent(withExtraRows)}) har ekstra fagområde, og koblingene kan utforskes i diagrammene over. Før hadde ${percent(withSeveral)} flere fagområder, men uten å si hvilket som var viktigst.`)}
                {labelled("Før", segmentBar([{ key: "several", value: withSeveral, color: "#d9822b", label: "Flere fagområder uten prioritet" }, { key: "rest", value: total - withSeveral, color: "#a1a1aa", label: "Ett eller ingen" }]))}
                {labelled("Nå", segmentBar([{ key: "extra", value: withExtraRows, color: "#7fa7d4", label: "Hoved og ekstra" }, { key: "main", value: total - withExtraRows, color: "#00467f", label: "Bare hovedfagområde" }]))}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, color: "#52525b", fontSize: "0.75rem" }}>
                  <span style={{ color: "#d9822b" }}>■ flere, uten prioritet</span>
                  <span style={{ color: "#7fa7d4" }}>■ hoved og ekstra</span>
                  <span style={{ color: "#00467f" }}>■ bare hovedfagområde</span>
                </div>
              </div>

              <div style={card}>
                {heading("De fleste beholder fagområdet", `Bare ${Math.round((movedCount / total) * 100)} % er flyttet til et annet fagområde. ${Math.round(((keptCount + prioritisedCount) / total) * 100)} % har fått beholde ett av fagområdene de hadde, og ${Math.round((missingCount / total) * 100)} % har fått et fagområde for første gang.`)}
                {segmentBar([
                  { key: "kept", value: keptCount, color: "#2f9e8f", label: "Beholdt fagområdet (uendret eller nytt navn)" },
                  { key: "prio", value: prioritisedCount, color: "#00467f", label: "Ett fagområde prioritert" },
                  { key: "moved", value: movedCount, color: "#d9822b", label: "Flyttet til nytt fagområde" },
                  { key: "missing", value: missingCount, color: "#8e5ea2", label: "Manglet fagområde" },
                ])}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "2px 14px", color: "#52525b", fontSize: "0.75rem" }}>
                  <span style={{ color: "#2f9e8f" }}>■ beholdt ({keptCount})</span>
                  <span style={{ color: "#00467f" }}>■ ett prioritert ({prioritisedCount})</span>
                  <span style={{ color: "#d9822b" }}>■ flyttet ({movedCount})</span>
                  <span style={{ color: "#8e5ea2" }}>■ manglet ({missingCount})</span>
                </div>
              </div>

              <div style={card}>
                {heading("Grensen mellom Ledelse og HR er tydeligere", "Ledelse eier lederrollen, og HR eier organisasjonen og medarbeiderne. Før lå mange i begge uten at det sto hvilket som var viktigst.")}
                {labelled(
                  "Før",
                  segmentBar([
                    { key: "ol", value: onlyLedelseBefore, color: areaColor("Ledelse"), label: "Bare Ledelse" },
                    { key: "both", value: bothBefore, color: "#a1a1aa", label: "I både Ledelse og HR" },
                    { key: "oh", value: onlyHrBefore, color: areaColor(HRNEW), label: "Bare HR" },
                  ]),
                )}
                {labelled(
                  "Nå",
                  segmentBar([
                    { key: "lo", value: ledelseOnly, color: areaColor("Ledelse"), label: "Ledelse" },
                    { key: "lh", value: ledelseWithHr, color: areaColor("Ledelse"), label: "Ledelse, med HR som ekstra" },
                    { key: "hl", value: hrWithLedelse, color: areaColor(HRNEW), label: "HR, med Ledelse som ekstra" },
                    { key: "ho", value: hrOnly, color: areaColor(HRNEW), label: "HR" },
                  ]),
                )}
                <div style={{ color: "#52525b", fontSize: "0.75rem" }}>
                  Før: bare Ledelse {onlyLedelseBefore}, begge uten prioritet {bothBefore}, bare HR {onlyHrBefore}. Nå: Ledelse {ledelseOnly} + {ledelseWithHr} med HR som ekstra, HR {hrOnly} + {hrWithLedelse} med Ledelse som ekstra.
                </div>
              </div>

              <div style={card}>
                {heading("Flere veier inn", "Tabellen har søk og fire filtre som kan kombineres, så man kan nå samme studie eller kurs fra flere kanter.")}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {["Søk på navn", "Nivå", "Bransje", "Fagområde", "Underkategori"].map((name) => (
                    <span key={name} style={{ padding: "3px 10px", border: "1px solid #d4d4d8", borderRadius: 14, background: "#f4f4f5", fontSize: "0.8125rem" }}>
                      {name}
                    </span>
                  ))}
                </div>
                <div style={{ color: "#52525b", fontSize: "0.8125rem" }}>
                  For eksempel «Finansnæringen» + «Fintech», eller «Masterkurs» + «Helse, skole og barnehage».
                </div>
              </div>

              <div style={card}>
                {heading("Engelske navn følger begrepene i kursene", `Alle ${englishTotal} fagområder og underkategorier har et engelsk forslag. De bruker begreper som allerede finnes i titlene på studiene og kursene, ikke direkte oversettelser.`)}
                <div style={{ display: "grid", gap: 6 }}>
                  {englishExamples.map((sub) => (
                    <div key={sub.no} style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 44px minmax(0, 1fr)", alignItems: "center", gap: 8 }}>
                      <span style={{ justifySelf: "start", padding: "3px 10px", border: "1px solid #d4d4d8", borderRadius: 4, background: "#ffffff" }}>{sub.no}</span>
                      <ChangeArrow />
                      <span style={{ justifySelf: "start", padding: "3px 10px", border: "1px solid #9ec0e0", borderRadius: 4, background: "#e3effa", color: "#00467f" }}>{sub.en}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={card}>
                {heading("Tverrgående temaer har egne underkategorier", `${crossCutting.length} underkategorier har ingen studier som hovedplassering, bare ekstra. De gjør at temaer som går på tvers, som fintech og ledelse i helse, kan finnes samlet.`)}
                <div style={{ display: "grid", gap: 6 }}>
                  {crossCutting.map(({ area, name, count }) => (
                    <div key={`${area}|${name}`} style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 24px", gap: 8, alignItems: "center", fontSize: "0.8125rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                        <span style={{ padding: "2px 8px", borderRadius: 4, background: "#ffffff", border: "1px solid #e4e4e7", borderLeft: `4px solid ${areaColor(area)}` }}>{name}</span>
                        <span style={{ color: "#71717a" }}>i {area}</span>
                      </div>
                      <strong style={{ textAlign: "right" }}>{count}</strong>
                    </div>
                  ))}
                </div>
              </div>

              <div style={card}>
                {heading("Master in Business-majorene er plassert likt", `De ${majorRows.length} majorene ligger alle i Finans, økonomi og regnskap, sammen med selve graden. De som ikke handler om finans (markedsføring, strategi og ledelse) har spesialiseringen som ekstra fagområde.`)}
                <div style={{ display: "grid", gap: 6 }}>
                  {majorRows.map((row) => (
                    <div key={row[2]} style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", fontSize: "0.8125rem" }}>
                      <span style={{ flex: "1 1 220px" }}>{row[2].replace(/^Major in /, "")}</span>
                      {row[6]
                        .split("; ")
                        .filter((entry) => entryArea(entry) !== row[0])
                        .map((entry) => (
                          <span key={entry} style={{ padding: "1px 8px", borderRadius: 10, background: areaColor(entryArea(entry)), color: "#ffffff", fontSize: "0.75rem" }}>
                            {entryArea(entry)}
                          </span>
                        ))}
                    </div>
                  ))}
                </div>
              </div>

              <div style={card}>
                {heading("Tydeligere navn på kurs", `${nameSuggestions.length} studier og kurs har fått et forslag til navneendring som sier hvem eller hva de er for.`)}
                <div style={{ display: "grid", gap: 8 }}>
                  {nameSuggestions.slice(0, 5).map(([from, to]) => (
                    <div key={from} style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 44px minmax(0, 1fr)", alignItems: "center", gap: 8, fontSize: "0.8125rem" }}>
                      <span style={{ color: "#52525b" }}>{from}</span>
                      <ChangeArrow />
                      <span style={{ color: "#1b6a5f", fontWeight: 600 }}>{to}</span>
                    </div>
                  ))}
                  <div style={{ color: "#71717a", fontSize: "0.75rem" }}>Alle forslagene står under navnet i tabellen.</div>
                </div>
              </div>
            </>
          );
        })()}
      </div>

      <h4 style={summarySubHeading}>Interessante koblinger før og nå</h4>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 16 }}>
        {(() => {
          const flowCard = (title: string, oldName: string, newName: string, count: number, note: string) => {
            const oldTotal = before.get(oldName)?.count ?? 1;
            return (
              <div key={title} style={{ background: "#ffffff", border: "1px solid #e4e4e7", borderRadius: 8, padding: 16, display: "grid", gap: 10, alignContent: "start" }}>
                <div style={{ fontWeight: 700 }}>{title}</div>
                <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) 44px minmax(0, 1fr)", gridTemplateRows: "auto auto", columnGap: 8, rowGap: 4, alignItems: "center" }}>
                  <div style={{ justifySelf: "start" }}>
                    <AreaPill label={shortOldName(oldName)} kind={oldAreaCatalog[oldName]?.kind === "removed" ? "removed" : "old"} />
                  </div>
                  <ChangeArrow />
                  <span style={{ justifySelf: "start", padding: "4px 10px", border: "1px solid #9ec0e0", borderRadius: 4, background: "#e3effa", color: "#00467f" }}>{newName}</span>
                  <span style={{ color: "#71717a", fontSize: "0.75rem" }}>{oldTotal} studier og kurs før</span>
                  <span />
                  <span style={{ color: "#71717a", fontSize: "0.75rem" }}>hovedfagområde (*)</span>
                </div>
                <div style={{ display: "flex", height: 14, borderRadius: 7, overflow: "hidden", background: "#e4e4e7" }}>
                  <div style={{ width: `${(count / oldTotal) * 100}%`, background: areaColor(newName) }} />
                </div>
                <div style={{ color: "#3f3f46", fontSize: "0.875rem" }}>
                  <strong>
                    {count} av {oldTotal} ({Math.round((count / oldTotal) * 100)} %)
                  </strong>{" "}
                  {note}
                </div>
              </div>
            );
          };
          return (
            <>
              {flowCard("Ledelse → HR og organisasjonsutvikling", "Ledelse", "HR og organisasjonsutvikling", toHrFromLedelse, "av studiene og kursene i Ledelse har nå HR og organisasjonsutvikling som hovedfagområde.")}
              {flowCard("Organisasjonsutvikling og HRM → Ledelse", "Organisasjonsutvikling og Human Resource Management", "Ledelse", toLedelseFromHr, "av studiene og kursene i Organisasjonsutvikling og HRM har nå Ledelse som hovedfagområde. Grensen var uklar før, og er nå uttrykt som ekstra fagområde.")}
              {flowCard("Jus og skatt var gjemt i Finans, økonomi og styring", "Finans, økonomi og styring", "Juss, skatt og eiendom", financeToLaw, "er nå hovedplassert i Juss, skatt og eiendom, først og fremst skatt og avgift.")}
              {flowCard("Digitalisering og markedsføring henger sammen", "Digitalisering og Analytics", "Markedsføring, kommunikasjon og kultur", digitalToMarketing, "er nå hovedplassert i Markedsføring, kommunikasjon og kultur (digital markedsføring og KI i markedsføring), og har KI, digitalisering og analytics som ekstra.")}
            </>
          );
        })()}
      </div>
    </div>
  );
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
    padding: "6px 10px",
    borderRadius: 4,
    border: selected ? "2px solid #00467f" : "1px solid #d4d4d8",
    background: state === "main" ? "#d6ecd0" : state === "extra" ? "#e8f5e4" : state === "bad" ? "#fde4e4" : "#ffffff",
    color: state === "dim" ? "#a1a1aa" : "#27272a",
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
    <div style={{ background: "#ffffff", border: "1px solid #e4e4e7", borderRadius: 8, padding: 20 }}>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 16, marginBottom: 12 }}>
        <div>
          <div style={{ color: "#71717a", fontSize: "0.8125rem" }}>
            Studie eller kurs {position + 1} av {order.length}
          </div>
          <div style={{ fontWeight: 700, fontSize: "1.25rem" }}>Hvor finner du «{title}»?</div>
        </div>
        <div style={{ color: "#52525b", fontSize: "0.875rem", textAlign: "right" }}>
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
              disabled={Boolean(pick.area)}
              onClick={() => setPicks((current) => ({ ...current, [rowIndex]: { area } }))}
              style={optionStyle(pick.area && !done ? (chosen ? "idle" : "dim") : state, chosen)}
            >
              {done && kind === "main" ? <span style={{ color: "#0057b8", fontWeight: 700 }}>* </span> : null}
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
                  {done && kind === "main" ? <span style={{ color: "#0057b8", fontWeight: 700 }}>* </span> : null}
                  {sub}
                </button>
              );
            })}
          </div>
        </>
      ) : (
        <div style={{ color: "#71717a", fontSize: "0.875rem", paddingTop: 4 }}>2. Underkategoriene vises når du har valgt fagområde.</div>
      )}
      </div>
      </div>

      {done && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 32, borderTop: "1px solid #e4e4e7", paddingTop: 16 }}>
          <div>
            <div style={{ fontWeight: 700, color: "#52525b", marginBottom: 8 }}>Før (bi.no i dag)</div>
            {previous.length === 0 ? (
              <p style={{ margin: 0, color: "#3f3f46" }}>Hadde ikke noe fagområde. Det kunne ikke finnes via fagområde.</p>
            ) : (
              <>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 6 }}>
                  {previous.map((name) => (
                    <AreaPill key={name} label={shortOldName(name)} kind={oldAreaCatalog[name]?.kind === "removed" ? "removed" : "old"} />
                  ))}
                </div>
                <p style={{ margin: 0, color: "#3f3f46", fontSize: "0.875rem" }}>
                  {previous.length === 1 ? "Lå i ett fagområde, uten underkategori." : `Lå i ${previous.length} fagområder uten prioritet og uten underkategori.`}
                </p>
              </>
            )}
          </div>
          <div>
            <div style={{ fontWeight: 700, color: "#00467f", marginBottom: 8 }}>Nå (forslaget)</div>
            {row[6].split("; ").map((entry, index) => (
              <div key={entry} style={{ marginBottom: 8 }}>
                <AreaWithSubcategory area={entryArea(entry)} subcategory={entrySub(entry)} muted={index > 0} />
              </div>
            ))}
            <div style={{ background: "#f4f4f5", borderRadius: 6, padding: 12, margin: "0 0 10px", fontSize: "0.875rem", color: "#3f3f46" }}>
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
            <p style={{ margin: 0, color: "#3f3f46", fontSize: "0.875rem" }}>
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

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16 }}>
        <button type="button" disabled={position === 0} onClick={() => setPosition(position - 1)} style={optionStyle(position === 0 ? "dim" : "idle", false)}>
          Forrige
        </button>
        <button
          type="button"
          onClick={() => {
            setPicks({});
            setOrder(shuffleIndexes(rows.length));
            setPosition(0);
          }}
          style={optionStyle("idle", false)}
        >
          Start på nytt
        </button>
        <button type="button" onClick={nextRandom} style={optionStyle("idle", false)}>
          Neste
        </button>
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
      <h1 style={{ margin: "0 0 4px" }}>Forslag til nye fagområder</h1>
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
          <p style={{ margin: "8px 0 0", color: "#52525b" }}>
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
            <th style={headCell}>Nivå</th>
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
                <td colSpan={6} style={{ padding: "28px 0 12px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 40,
                      background: "#f1f1f1",
                      borderRadius: 8,
                      padding: "16px 24px",
                      margin: "0 -12px",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                    <h2 style={{ margin: "0 0 4px", fontSize: "1.125rem", color: "#00467f" }}>
                      {area} ({areaRows.length})
                    </h2>
                    <p style={{ margin: 0, color: "#52525b", fontWeight: "normal" }}>
                      {areaRows.length} studier og kurs ({studyCount(areaRows)} {studyCount(areaRows) === 1 ? "studie" : "studier"} og{" "}
                      {areaRows.length - studyCount(areaRows)} kurs). {areaRationale[area]}
                    </p>
                    <p style={{ margin: "8px 0 0", color: "#52525b", fontWeight: "normal" }}>
                      <strong>Underkategorier:</strong> {subcategorySummary(area)}
                    </p>
                    {areaOrigin[area] && (
                      <p style={{ margin: "8px 0 0", color: "#52525b", fontWeight: "normal" }}>
                        <strong>{areaOrigin[area].label}:</strong> {areaOrigin[area].text(areaRows.filter(([, , , , previous]) => previous.split("; ").includes(areaOrigin[area].from)).length, areaRows.length)}
                      </p>
                    )}
                    </div>
                    <SubcategoryPie area={area} />
                  </div>
                </td>
              </tr>
              {visibleRows.map((row, index) => {
                const [, statuses, title, level, previous, , subcategories, reason, , industry] = row;
                return (
                  <tr key={`${title}-${index}`} style={{ borderBottom: "1px solid #e0e0e0" }}>
                    <td style={cell}>{level}</td>
                    <td style={cell}>
                      {title}
                      {suggestedNames[title.replace(/\u00ad/g, "")] && (
                        <div style={{ marginTop: 4, color: "#1b6a5f", fontSize: "0.875rem" }}>
                          <div style={{ fontSize: "0.75rem", opacity: 0.8 }}>Forslag til navneendring</div>({suggestedNames[title.replace(/\u00ad/g, "")]})
                        </div>
                      )}
                      {industry !== "–" && (
                        <div style={{ marginTop: 6 }}>
                          <span
                            style={{
                              display: "inline-block",
                              padding: "1px 8px",
                              borderRadius: 10,
                              background: "#eef0f3",
                              border: "1px solid #d4d4d8",
                              color: "#3f3f46",
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
                        <line x1="0" y1="6" x2="15" y2="6" stroke="#d4d4d8" strokeWidth="1.5" />
                        <polyline points="10,1.5 16,6 10,10.5" fill="none" stroke="#d4d4d8" strokeWidth="1.5" />
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
                    <td style={{ ...cell, fontSize: "0.8125rem", color: "#71717a" }}>
                      {reason}
                                          </td>
                  </tr>
                );
              })}
            </tbody>
          );
        })}
      </table>

      <section style={{ background: "#f1f1f1", borderRadius: 8, padding: "24px", margin: "48px -12px 0" }}>
        <h2 style={{ margin: "0 0 8px", fontSize: "2rem", lineHeight: 1.2, color: "#00467f" }}>Oppsummering</h2>

        <h3 style={summaryHeading}>Før og nå: fagområdene sammenlignet</h3>
        <p style={{ margin: "0 0 12px", color: "#52525b" }}>
          Venstre side viser fagområdene slik de er på bi.no i dag, og høyre side viser forslaget. Et studie eller kurs som hadde to
          fagområder før, telles i begge radene til venstre.
        </p>
        <BeforeAfterOverview />

        <h3 style={summaryHeading}>Oversikt over fagområder og underkategorier</h3>
        <p style={{ margin: "0 0 12px", color: "#52525b" }}>
          {summaryRows.length} studier og kurs fordelt på {areaTree.length} fagområder og {subcategoryCount} underkategorier. Tallene viser
          hvor mange studier og kurs som har fagområdet eller underkategorien som hovedplassering, og hvor mange som har det som ekstra.
        </p>
        <p style={{ margin: "0 0 12px", color: "#52525b" }}>
          De sju majorene i Master in Business er ikke med i tallene i oppsummeringen. Alle er plassert i Finans, økonomi og regnskap,
          som selve graden og Siviløkonom. Major in Finance (Finans og investering), Economics (Samfunnsøkonomi) og Accounting and
          Business Control (Regnskap og revisjon) ligger i underkategorien som passer spesialiseringen. Marketing, Strategy, Logistics,
          Operations and Supply Chain Management og Leadership, Change and Analytics ligger i Bedriftsøkonomi, med spesialiseringen som
          ekstra fagområde (Markedsføring, Strategi to ganger og Ledelse).
        </p>
        <div style={{ display: "flex", gap: 24, margin: "0 0 16px", color: "#52525b" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 14, height: 10, borderRadius: 3, background: treeColors.mainArea }} />
            Hovedfagområde
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 14, height: 10, borderRadius: 3, background: treeColors.extraArea }} />
            Ekstra fagområde
          </span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", columnGap: 64, alignItems: "start" }}>
          {treeColumns.map((column, columnIndex) => (
            <div key={columnIndex}>
          {column.map(({ area, main, extra, subs }) => (
            <div key={area} style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <strong style={{ flex: "0 0 320px", color: "#00467f", whiteSpace: "nowrap" }}>{area}</strong>
                <TreeNumbers main={main} extra={extra} bold />
                <TreeBar main={main} extra={extra} height={10} mainColor={treeColors.mainArea} extraColor={treeColors.extraArea} />
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

        <h3 style={summaryHeading}>Overlapp og koblinger mellom fagområder og underkategorier</h3>
        <p style={{ margin: "0 0 12px", color: "#52525b" }}>
          Hver strek viser studier og kurs som har ett fagområde (eller en underkategori) som hovedplassering og et annet som ekstra. Streken har
          fargen til hovedfagområdet, og bredden viser antall. Til venstre er koblingene mellom fagområdene, og til høyre mellom underkategoriene. Hold musepekeren over en bue eller en strek i en av sirklene
          for å fremheve koblingene i den sirkelen. De sterkeste koblingene mellom underkategorier står alltid øverst.
          Fagområdene som henger tett sammen ligger ved siden av hverandre. For eksempel har alle studiene og kursene i Helse, skole og barnehage også
          Ledelse som ekstra. Underkategorier som bare brukes i ett fagområde, uten koblinger, er ikke med.
        </p>
        <OverlapSection />

        <h3 style={summaryHeading}>Fordeling per nivå</h3>
        <p style={{ margin: "0 0 12px", color: "#52525b" }}>
          Hovedfagområde for bachelorstudier på heltid, masterstudier på heltid, bachelorkurs og masterkurs. «Heltid» er bachelorstudier og
          masterstudier på heltid samlet, «Deltid» er bachelorkurs og masterkurs samlet (uten deltidsstudiene), og bachelorkurs- og masterkursoversiktene har i tillegg deltidsstudiene markert i egen farge, og «Alle nettstudier» er alt som tilbys på nett (campus Online på bi.no),
          delt på bachelorstudier, årsenhet, bachelorkurs og øvrige kurs. Gruppene
          overlapper derfor. Søylene viser andelen av studiene eller kursene i gruppen, og tallet er antall. {summaryRows.length - levelExcluded}{" "}
          av {summaryRows.length} studier og kurs er med i minst én gruppe. De {levelExcluded} øvrige er studier uten
          oppgitt studieform på bi.no, PhD, årsenheter, kurs uten studiepoeng og andre nivåer som ikke tilbys på nett.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "24px 64px" }}>
          {levelTrees.map(({ key, label, list, count, tree }) => {
            const split = levelSplits[key];
            const largestShare = Math.max(...tree.map(({ main }) => main / count));
            return (
              <div key={key}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 8, whiteSpace: "nowrap" }}>
                  <span style={{ fontWeight: 700, color: "#00467f" }}>
                    {label} ({count})
                  </span>
                  {split?.map(({ key: splitKey, label: levelLabel, color }) => (
                      <span key={splitKey} style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#52525b" }}>
                        <span style={{ width: 14, height: 10, borderRadius: 3, background: color }} />
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
                        {main} <span style={{ color: "#71717a" }}>({Math.round((main / count) * 100)} %)</span>
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
                                height: 12,
                                background: color,
                                borderRadius: `${index === 0 ? 6 : 0}px ${index === segments.length - 1 ? 6 : 0}px ${
                                  index === segments.length - 1 ? 6 : 0
                                }px ${index === 0 ? 6 : 0}px`,
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

        <ChangeGroup>
        <h3 style={{ ...summaryHeading, gridColumn: "1 / -1" }}>Fagområder som har fått nytt navn</h3>
          <ChangeRow
            from="Eiendom, varehandel og forretningsjus"
            fromKind="old"
            to={[{ label: "Juss, skatt og eiendom", count: areaCount("Juss, skatt og eiendom") }]}
            note="«Varehandel» utgår fordi ingen kurs har det som eget tema. Det nærmeste er logistikk og forsyningskjeder, som nå ligger i Finans, økonomi og regnskap. Skatt og avgift er slått sammen med fagområdet."
          />
          <ChangeRow
            from="Finans, økonomi og styring"
            fromKind="old"
            to={[{ label: "Finans, økonomi og regnskap", count: areaCount("Finans, økonomi og regnskap") }]}
            note="Regnskap er nå synlig i navnet, og styring er dekket av økonomi."
          />
          <ChangeRow
            from="Digitalisering og Analytics"
            fromKind="old"
            to={[{ label: "KI, digitalisering og analytics", count: areaCount("KI, digitalisering og analytics") }]}
          />
          <ChangeRow
            from={"Organisasjonsutvikling og\nHuman Resource Management"}
            fromKind="old"
            to={[{ label: "HR og organisasjonsutvikling", count: areaCount("HR og organisasjonsutvikling") }]}
            note="HR står først fordi det er det største temaet, og HRM er skrevet ut som HR."
          />

        <h3 style={{ ...summaryHeading, gridColumn: "1 / -1" }}>Fagområder som er fjernet</h3>
          <ChangeRow
            from="Offentlig sektor"
            fromKind="removed"
            arrowColor="#b3261e"
            to={[
              { label: "Helse, skole og barnehage", count: areaCount("Helse, skole og barnehage") },
              { label: "Sikkerhet og beredskap", count: areaCount("Sikkerhet og beredskap") },
              { label: "Juss, skatt og eiendom" },
            ]}
            note="Skatt- og avgiftskursene ligger i Juss, skatt og eiendom. «Juss for ledere» ligger i Helse, skole og barnehage, med Juss, skatt og eiendom og Ledelse som ekstra."
          />
          <ChangeRow
            from="Prosjektledelse"
            fromKind="removed"
            arrowColor="#b3261e"
            to={[{ label: "Ledelse › Prosjektledelse (underkategori)" }]}
            note="Slått sammen med Ledelse."
          />
          <ChangeRow
            from="Internasjonal Business"
            fromKind="removed"
            arrowColor="#b3261e"
            to={[
              { label: "Markedsføring, kommunikasjon og kultur › Kultur og internasjonal business" },
              { label: "Ledelse" },
              { label: "Finans, økonomi og regnskap" },
            ]}
            note="De fem studiene og kursene er fordelt på tre fagområder. Internasjonal profil er en egenskap ved kurset og ikke et fagområde."
          />
          <ChangeRow
            from="Skatt og avgift"
            fromKind="removed"
            arrowColor="#b3261e"
            to={[{ label: "Juss, skatt og eiendom" }]}
            note="Foreslått som eget fagområde, men slått sammen med Juss, skatt og eiendom."
          />

        <h3 style={{ ...summaryHeading, gridColumn: "1 / -1" }}>Nye fagområder</h3>
          <SplitRow
            from={[{ label: "Offentlig sektor", kind: "old" }]}
            color="#2e6b1f"
            to={newAreas.map((area) => ({
              label: area,
              count: areaCount(area),
              note: originNote(area),
            }))}
          />
        <h3 style={{ ...summaryHeading, gridColumn: "1 / -1" }}>Fagområder uten endring i navn</h3>
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
            note="Navnet er beholdt, og strategi er en underkategori."
          />
          <ChangeRow
            from="Markedsføring, kommunikasjon og kultur"
            fromKind="same"
            equal
            to={[{ label: "Markedsføring, kommunikasjon og kultur", count: areaCount("Markedsføring, kommunikasjon og kultur") }]}
            toKind="same"
          />
        </ChangeGroup>

        <h3 style={summaryHeading}>Andre grep</h3>
        <ul style={summaryList}>
          <li>
            Alle {summaryRows.length} studier og kurs har nå nøyaktig ett hovedfagområde. Kolonnen «Fagområde» viser hovedfagområdet først
            og deretter eventuelle ekstra fagområder i mindre og svakere tekst, som de også kunne passet i.
          </li>
          <li>
            Ledelse er strammet inn til studier og kurs der lederrollen er hovedtemaet. Endringsledelse, rådgivning og HR-kurs ligger i
            HR og organisasjonsutvikling. Team, prestasjon, forhandling og kommunikasjon for ledere ligger i Ledelse.
          </li>
          <li>
            Ledelse er også ekstra fagområde for studier og kurs om å lede innenfor et annet felt, for eksempel sikkerhetsledelse,
            medarbeiderledelse, endringsledelse og ledelse i skole og helse. Underkategoriene i Ledelse er slått sammen der
            innholdet overlapper: Team-, medarbeider- og endringsledelse og Lederferdigheter og kommunikasjon. Strategisk ledelse og
            Sikkerhets- og beredskapsledelse står for seg selv.
          </li>
          <li>Logistikk og supply chain ligger i Finans, økonomi og regnskap, med egen underkategori.</li>
          <li>
            Det er innført {subcategoryCount} underkategorier innenfor fagområdene. Under hvert fagområde i kolonnen «Fagområde»
            står underkategorien, også i ekstra fagområder, for eksempel Helse i Helse, skole og barnehage og Helse-, skole- og barnehageledelse i Ledelse.
          </li>
          <li>Ledelse har underkategorien «Helse-, skole- og barnehageledelse» for ledelse i helsetjenesten og i skole og barnehage. Bransjer er samlet i et eget avsnitt nederst i oppsummeringen.</li>
          <li>
            {summaryRows.filter(([, statuses]) => statuses.includes("Manglet fagområde")).length} studier og kurs som ikke hadde noe fagområde
            fra før, er nå plassert.
          </li>
        </ul>

        <h3 style={summaryHeading}>Status</h3>
        <StatusPie rows={summaryRows} />

        <h3 style={summaryHeading}>Gjennomgang av underkategoriene</h3>
        <ul style={summaryList}>
          <li>
            Underkategoriene er gjennomgått mot kursbeskrivelsene for å få lister med temaer av samme slag, uten overlapp innenfor hvert
            fagområde.
          </li>
          <li>
            «Ledelsesstudier» og «Markedsføringsstudier» er fjernet, siden de grupperte etter format og ikke tema. Studiene ligger nå
            under «Generell ledelse og lederutdanning» og «Markedsføring».
          </li>
          <li>
            Ledelse eier lederrollen, og HR eier organisasjonen og medarbeiderne. Endringsledelse ligger derfor i HR, og team og
            prestasjon i Ledelse.
          </li>
          <li>
            Finans er delt opp: Økonomistyring skilt ut fra Bedriftsøkonomi, og Bærekraftig finans og «Fintech» skilt
            ut fra Finans og investering. «Fintech» og «Finansiell kriminalitet og compliance» brukes bare som ekstra, siden hovedfaget til de kursene er KI, digitalisering og analytics eller Juss, skatt og eiendom.
          </li>
          <li>
            «Lederskap og lederutdanning» er delt i tre: Generell ledelse og lederutdanning (hele studier, grunnutdanning og brede
            ledelseskurs), Lederferdigheter og kommunikasjon (coaching, selvinnsikt, retorikk og forhandling) og Strategisk ledelse.
          </li>
          <li>
            Underkategorier som var så like at de trengte lignende navn, er slått sammen innenfor samme fagområde: Bærekraft i Finans
            (nå en del av Bærekraftig finans), KI-gruppene, Lederutdanning og Lederskap, og de tre markedsføringsgruppene. Navn kan
            fortsatt gjentas mellom fagområder.
          </li>
          <li>Navn er valgt ut fra ord studentene søker på. Navn kan gjentas mellom fagområder, men ikke innenfor samme fagområde.</li>
        </ul>

        <h3 style={summaryHeading}>Gjennomgang mot kursbeskrivelsene</h3>
        <ul style={summaryList}>
          <li>
            Plasseringene er sjekket mot beskrivelsene på bi.no for 235 av 237 studier og kurs. To sider (Eiendomsmegling, jus og
            økonomi og Rettsvitenskap, bachelor) ble ikke funnet.
          </li>
          <li>
            31 studier og kurs er justert på grunn av beskrivelsen, bare der gjennomgangen var tydelig. Ti har fått nytt fagområde,
            for eksempel Digital Compliance (til Juss, skatt og eiendom), Markedsrett og etikk (til Juss, skatt og eiendom) og
            Helsefremmende ledelse (til HR og organisasjonsutvikling). Resten er justert underkategori eller ekstra fagområde.
          </li>
          <li>Foreslåtte endringer med lav sikkerhet er ikke gjennomført.</li>
        </ul>

        <h3 style={summaryHeading}>Studier og kurs per bransje</h3>
        <p style={{ margin: "0 0 12px", color: "#52525b" }}>
          Studier og kurs som retter seg mot en bestemt bransje. Bransjen er avledet av nettadressen (bransjeprogram og målgruppeprogram
          på bi.no), tittelen og beskrivelsen, ikke fra et eget bransjefelt hos BI. Studier uten tydelig bransje er ikke med.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 24 }}>
          {industryGroups.map(({ industry, list }) => {
            const byArea = [...new Set(list.map((row) => row[0]))]
              .map((area) => ({ area, rows: list.filter((row) => row[0] === area).sort((a, b) => a[2].localeCompare(b[2], "nb")) }))
              .sort((a, b) => b.rows.length - a.rows.length || a.area.localeCompare(b.area, "nb"));
            return (
              <div key={industry} style={{ background: "#ffffff", border: "1px solid #e4e4e7", borderRadius: 8, padding: 20 }}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, marginBottom: 12 }}>
                  <strong style={{ fontSize: "1.125rem", color: "#00467f" }}>{industry}</strong>
                  <span style={{ color: "#52525b" }}>{list.length} studier og kurs</span>
                </div>
                <div style={{ display: "flex", height: 10, borderRadius: 5, overflow: "hidden", marginBottom: 16, gap: 2 }}>
                  {byArea.map(({ area, rows: areaList }) => (
                    <div key={area} title={`${area}: ${areaList.length}`} style={{ flex: areaList.length, background: areaColor(area) }} />
                  ))}
                </div>
                <div style={{ display: "grid", gap: 14 }}>
                  {byArea.map(({ area, rows: areaList }) => (
                    <div key={area} style={{ borderLeft: `4px solid ${areaColor(area)}`, paddingLeft: 12 }}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 6 }}>
                        <strong>{area}</strong>
                        <span
                          style={{
                            padding: "0 8px",
                            borderRadius: 10,
                            background: areaColor(area),
                            color: "#ffffff",
                            fontSize: "0.8125rem",
                            lineHeight: 1.5,
                          }}
                        >
                          {areaList.length}
                        </span>
                      </div>
                      <ul style={{ margin: 0, paddingLeft: 18, color: "#27272a" }}>
                        {areaList.map((row) => (
                          <li key={`${row[2]}-${row[3]}`}>
                            {row[2]} <span style={{ color: "#71717a" }}>({row[3]})</span>
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

        <h3 style={summaryHeading}>Engelske navn</h3>
        <p style={{ margin: "0 0 16px", color: "#52525b" }}>
          Forslag til engelske navn på fagområdene og underkategoriene. Navnene bygger på begrepene som allerede brukes i titlene på
          studiene og kursene (for eksempel «Business Administration», «Supply Chain Management» og «Change Management»), og er ikke
          direkte oversettelser.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "16px 32px", alignItems: "start" }}>
          {englishNames.map(({ area, subcategories }) => (
            <div key={area.no} style={{ background: "#ffffff", border: "1px solid #e4e4e7", borderRadius: 8, padding: 20 }}>
              <ChangeGroup compact>
                <ChangeRow from={area.no} fromKind="same" to={[{ label: area.en }]} note={`Begreper: ${area.terms}`} compact bold />
                {subcategories.map((sub) => (
                  <ChangeRow key={sub.no} from={sub.no} fromKind="same" to={[{ label: sub.en }]} note={`Begreper: ${sub.terms}`} compact />
                ))}
              </ChangeGroup>
            </div>
          ))}
        </div>

        <h3 style={summaryHeading}>Forbehold</h3>
        <p style={{ margin: 0 }}>
          Plasseringene er justert ut fra beskrivelsene bare der gjennomgangen var tydelig, så noen er fortsatt basert på tittelen og de
          tidligere fagområdene.
        </p>
      </section>

      <section style={{ background: "#f1f1f1", borderRadius: 8, padding: "24px", margin: "24px -12px 0" }}>
        <h2 style={{ margin: "0 0 8px", fontSize: "2rem", lineHeight: 1.2, color: "#00467f" }}>Søketest: finner du kurset?</h2>
        <p style={{ margin: "0 0 12px", color: "#52525b" }}>
          Et tilfeldig studie eller kurs vises med bare navnet. Velg hvilket fagområde og hvilken underkategori du ville lete i. Når du har svart, vises hvor det lå før og
          hvor det ligger nå, så man ser om det finnes et tydelig hovedsted. Alle studier og kurs kan dukke opp.
        </p>
        <SearchTest />
      </section>

      </div>
    </div>
  );
}
