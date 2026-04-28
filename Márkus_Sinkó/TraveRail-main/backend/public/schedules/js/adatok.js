
// Járattípusok
let jarat = ['Napfény Intercity', 'Civis Interrégió', 'Sebesvonat', 'Személyvonat', 'Hortobágy Eurocity', 'S10','Corona Intercity', 'Nyírség Intercity', 'Tokaj Intercity', 'Mecsek Intercity','Tisza-Szamos Eurocity', 'IR85 Mátra Interrégió'];


// indulo állomások
let induloallomas = ['Budapest', 'Győr', 'Pécs', 'Szeged', 'Debrecen', 'Miskolc','Békéscsaba', 'Kál-Kápolna','Gyöngyös'];
// célállomások
let celallomas =['Budapest', 'Győr', 'Pécs', 'Szeged', 'Debrecen', 'Miskolc','Békéscsaba','Kisújszállás','Gyöngyös'];

//Jelmagyarázat: IC(InterCity) IR(Interregio) S(Sebesvonat) SZ(Szemelyvonat) EC(EuroCity), s10(személy)

let idopontok = [
  '3:25(S)', '4:30(IC)', '5:46(IC)', '6:44(IC)', '7:44(IC)', '8:44(IC)', '9:44(IC)', '10:44(IC)', '11:44(IC)', '12:44(IC)', '13:44(IC)', '14:44(IC)', '15:44(IC)', '16:44(IC)', '17:44(IC)', '18:44(IC)', '19:44(IC)', '20:44(IC)',
  '5:28(SZ)', '6:28(SZ)', '7:28(SZ)', '8:28(SZ)', '9:28(SZ)','10:28(SZ)','11:28(SZ)','12:28(SZ)','13:28(SZ)','14:28(SZ)','15:28(SZ)','16:28(SZ)','17:28(SZ)','18:28(SZ)','19:28(SZ)','20:28(SZ)','22:28(SZ)',
  '6:07(SZ)','8:11(SZ)','15:11(SZ)','18:11(SZ)'
  ,'03:10(S10)','04:30(S10)','05:25(S10)','06:25(S10)','07:25(S10)','08:25(S10)','09:25(S10)','10:25(S10)','11:25(S10)','12:25(S10)','13:25(S10)','14:25(S10)','15:25(S10)','16:25(S10)','17:25(S10)','18:25(S10)','19:25(S10)','20:25(S10)','22:25(S10)','5:53(IC)','6:53(IC)','7:53(IC)','8:53(IC)','9:53(IC)','10:53(IC)','11:53(IC)','12:53(IC)','13:53(IC)','14:53(IC)','15:53(IC)','16:53(IC)','17:53(IC)','19:53(IC)',
 '02:35(SZ)','03:40(IC)','03:45(Sz)','04:55(IC)','05:25(IC)','05:55(IC)','06:25(IR)','06:40(IC)','06:55(IC)','07:25(IC)','07:25(IR)','07:55(IC)','08:25(IR)','08:55(IC)','09:25(IC)','09:25(IR)','09:55(IC)','10:25(IR)','10:55(IC)','11:25(IC)','11:25(IR)','11:55(IC)','12:25(IR)','12:55(IC)','13:25(IC)','13:25(IR)','13:40(IC)','13:40(EC)','13:55(IC)'
 ,'14:25(IR)','14:55(IC)','15:25(IC)','15:25(IR)','15:55(IC)','16:25(IR)','16:55(IC)','17:25(IC)','17:25(IR)','17:40(IC)','17:55(IC)','18:25(IR)','18:55(IC)','19:25(IR)','19:40(EC)','19:55(IC)','20:25(IR)','21:25(IR)','22:25(IR)',
'03:40(IC)','04:00(SZ)','05:25(IC)','05:55(IC)','06:25(IC)','07:25(IC)','07:55(IC)','08:25(IC)','09:25(IC)','09:55(IC)','10:25(IC)','11:25(IC)','11:55(IC)','12:25(IC)','13:25(IC)','13:55(IC)','14:25(IC)','15:25(IC)','15:55(IC)','16:25(IC)','17:25(IC)','17:55(IC)','18:25(IC)','19:25(IC)','20:25(IC)','22:00(S)','3:55(SZ)',
'3:50(IC)','5:20(IC)','6:20(IC)','7:20(IC)','8:20(IC)','9:20(IC)','10:20(IC)','11:20(IC)','12:20(IC)','13:20(IC)','14:20(IC)','15:20(IC)','16:20(IC)','17:20(IC)','18:20(IC)','19:20(IC)','20:20(IC)',
//Kál-Kápolna-> Kisújszállás
'04:12(SZ)','06:37(SZ)','09:37(SZ)','12:37(SZ)','14:37(SZ)','17:37(SZ)',
//Kisújszállás-> Kál-Kápolna
'06:12(SZ)','09:38(SZ)','12:28(SZ)','14:38(SZ)','17:28(SZ)','20:42(SZ)',
//Bp-Keleti-> Gyöngyös
'05:30 (IR)',
  '06:30 (IR)','07:30 (IR)','08:30 (IR)','09:30 (IR)','10:30 (IR)','11:30 (IR)','12:30 (IR)','13:30 (IR)','14:30 (IR)','15:30 (IR)','16:30 (IR)','17:30 (IR)','18:30 (IR)','19:30 (IR)','20:30 (IR)','21:30 (IR)','22:30 (IR)'
];

// Állomások
let allomasok = [
//szegedi oldal
'Szeged', 'Szatymaz', 'Kistelek', 'Kiskunfélegyháza', 'Kecskemét', 'Nagykőrös', 'Cegléd', 'Ferihegy', 'Kőbánya-kispest(KÖKI)', 'Zugló', 'Budapest-Nyugati',
 'Szeged-Rókus','Hódmezővásárhelyi-Népkert ', 'Hódmezővásárhely Vasútállomás', 'Kútvölgy', 'Székkutas', 'Orosháza', 'Orosházi-tanyák', 'Csorvás','Csorvás-alsó', 'Telekgerendás', 'Fürjes', 'Békéscsaba', 
 'Kiskundorozsma', 'Jánosszállás', 'Vilmaszállás', 'Őszeszék', 'Balástya','Kapitányság', 'Kisteleki-szőlők','Csengele','Petőfiszállási-tanyák','Petőfiszállás', 'Selymes',
 'Kunsszállás','Városföld', 'Nyársapát','Üllő','Katonatelep',
 //győr,pécs,debrecen,Miskolc oldal
 'Budapest-Déli','Budapest-Kelenföld','Budaörs','Törökbálint','Biatorbágy','Herceghalom','Bicske alsó','Bicske','Szár','Szárliget','Alsógalla','Tatabánya','Vérteszőlős','Tóvároskert','Tata','Almásfüzitő','Almásfüzitő felső','Szőny','Komárom','Ács','Nagyszentjános','Győrszentiván','Győr-Gyárváros','Győr',
 'Budapest-Keleti','Sárbogárd','Dombóvár','Szentlőrinc','Pécs',
 'kőbánya-alsó', 'Pestszentlőrinc', 'Szemeretelep','Vecsés','Vecsés-Kertekalja','Hosszúberek-Péteri', 'Monor', 'Monorierdő','Pilis','Albertirsa','Ceglédbercel','Ceglédbercel-Cserő','Budai út', 'Abony','Szolnok', 'Szajol', 'Törökszentmiklós', 'Fegyvernek-Örményes', 'Kisújszállás', 'Karcag', 'Püspökladány','Kaba' ,'Hajdúszoboszló','Ebes','Debrecen',
  'Rákoshegy','Nyíregyháza','Tokaj','szerencs','Miskolc-Tiszai','Füzesabony','Hatvan','Kisvárda','Záhony','Nyírábrány','Hegyeshalom','Mosonmagyaróvár','Debrecen-Szabadságtelep','Debrecen-Kondoros','Nagycsere','Haláp','Vámospércs','Demecser','Mezőkövesd','Nyékládháza','Kőbánya-felső','Rákos','Akadémiaújtelep','Rákosliget','Rákoscsaba-Újtelep','Pécel','Isaszeg','Gödöllő,','Máriabesnyő','Bag','Aszód','Tura','Vámosgyörk','Adács','Karácsond','Ludas','Nagyút','Kál-Kápolna','Szilhalom','Mezőkövesd-felső','Mezőkeresztes-Mezőnyárád','Csincse','Emőd','Rakamaz','Rákoscsaba','Sásd',
  //Kál-Kápolna-> Kisújszállás
  'Kál-Kápolna','Erdőtelek','Heves','Hevesvezekény','Kisköre','Kisköre-Tiszahíd','Abádszalók','Kunhegyes','Kenderes','Kisújszállás','Tarnaszentmiklós',
  //Keleti-Gyöngyös
  'Gyöngyöshalász','Kitérőgyár','Gyöngyös'

];

// Kedvezmények (%)
let kedvezmeny = [' BKK bérletek és jegyek (csak HÉV utazásahoz)', 'BKK munkavállaló 2. kocsiosztály', 'BKV munkavállaló 2. kocsiosztály', 'Ellátottak utazási utalványa','Ellátottak utazási utalványa', 'FIP igazolvány 1. oszt.', 'Fogyatékossággal élők igazolványa', 'GYSEV igazolvány 1. oszt.', 'GYSEV igazolvány 2. oszt.', 'GYSEV igazolvány-családtag 1. oszt.', 'GYSEV igazolvány-családtag 2. oszt.Díjmentes','Magyar Igazolvány, Magyar hozzátartozói Igazolvány Díjmentes','Magyarország24 jegyDíjmentes','MÁV-START igazolvány 1. oszt. Díjmentes',
  'MÁV-START igazolvány 2. oszt. Díjmentes',
  'MÁV-START igazolvány-családtag 1. oszt. Díjmentes',
  'MÁV-START igazolvány-családtag 2. oszt. Díjmentes',
  'Menekültek igazolása Díjmentes',
  'Nagycsalád tagja Díjmentes',
  'Nemzetközi bérlet, menetjegy 1. o.Díjmentes',
  'Nemzetközi bérlet, menetjegy 2. o. Díjmentes',
  'Országbérlet',
  'OSZZSD igazolvány magáncélú Díjmentes',
  'Rendőr - készenléti igazolvány (203) Díjmentes',
  'START Klub VIP kártya Díjmentes',
  'U jelű, vagy azzal egyenértékű utazási igazolvány Díjmentes',
  'VOLÁN szabadjegy (országos) Díjmentes'];

// Kortábla minták
let kortablak = ['Kisgyerek (0-3 éves)',
  'Kisgyerek (3-6 éves)',
  'Gyerek (6-14 éves)',
  'Gyerek [14-18 éves]',
  'Felnőtt [25-65 éves]',
  'Nyugdíjas/senior (65+ éves)'];


//Szeged-> BP-Nyugati(Ic,S),       |kesz|-
//Szeged-> Békéscsaba(Sz),         |kesz|-
//Szeged-> Kiskunfélegyháza(Sz),   |kesz|-
//Bp-Keleti-> Pécs(IC),            |kesz|-
//Bp-Nyugati-> Debrecen(IC,SZ,IR), |kesz|-
//Bp-Keleti-> Debrecen(IC,EC),     |kesz|-
//Bp-Nyugati-> Miskolc(IC),        |kesz|-
//Bp-Keleti-> Miskolc(IC,S,SZ),    |kesz|-
//Bp-Déli-> Győr(S10),             |kesz|- 
//Kál-Kápolna-> Kisújszállás       |kesz|-
//Kisújszállás-> Kál-Kápolna       |kesz|-
//Bp-Keleti-> Gyöngyös             |Munkálat alatt|
let idotartam = ['2:39(S)','2:34(Ic)','2:23(Ic)','2:25(Ic)','1:11(Sz)','1:42(Sz)','1:50(S10)','2:45(IC)','3:28(SZ)','3:13(IC)','3:38(SZ)','3:07(IC)','3:00(IC)','2:58(IR)','3:37(IC)','2:47(IC)','2:49(EC)','2:45(IC)','4:49(IC)','4:34(IC)','4:40(IC)','2:49(SZ)','2:02(IC)','2:04(IC)','2:06(IC)','2:29(S)','3:28(SZ)','2:42(EC)','1:36(SZ)','1:37(SZ)','1:59(SZ)','3:23(SZ)','3:03(IC)','1:24(SZ)'];

let ar = [2990, 3490, 3990, 4500, 1990, 2490, 1590, 4990, 5990, 5490, 6290, 5790, 5200, 5100, 6490, 4290, 4390, 4590, 6990, 7990, 7490, 4390, 3890, 3990, 4090, 2790, 5990, 4490];

module.exports = {
        jarat, 
        allomasok, 
        kedvezmeny, 
        kortablak, 
        idotartam, 
        idopontok, 
        induloallomas, 
        celallomas,
        ar
};


