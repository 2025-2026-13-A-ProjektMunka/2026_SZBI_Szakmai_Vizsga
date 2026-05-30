using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace EUTagorszagokKonzol
{
    public class Tagorszag
    {
        // Változók & lista létrehozása
        public static List<Tagorszag> tagorszagLista = new List<Tagorszag>();
        public string TagorszagNev { get; set; }
        public int Terulet { get; set; }
        public int Lakossag { get; set; }
        public string TagorszagFovaros { get; set; }
        public int TagorszagFovarosLakossag { get; set; }
        public int CsatlakozasEve { get; set; }
        public string HivatalosNyelv { get; set; }
        // Osztály
        public Tagorszag(string tn, int ter, int lak, string tf, int tfl, int cse, string hny)
        {
            this.TagorszagNev = tn;
            this.Terulet = ter;
            this.Lakossag = lak;
            this.TagorszagFovaros = tf;
            this.TagorszagFovarosLakossag = tfl;
            this.CsatlakozasEve = cse;
            this.HivatalosNyelv = hny;
        }

        // 3. Feladat, Állomány beolvasása
        public static void AllomanyBeolvas()
        {
            using (StreamReader sr = new StreamReader("eu_tagorszagok.txt", Encoding.UTF8))
            {
                // Első sor átugrása,
                sr.ReadLine();

                while (!sr.EndOfStream)
                {
                    // Az elválasztókarakter a ;
                    string[] tomb = sr.ReadLine().Split(';');
                    Tagorszag tagorszag = new Tagorszag(
                        tomb[0],
                        Int32.Parse(tomb[1]),
                        Int32.Parse(tomb[2]),
                        tomb[3],
                        Int32.Parse(tomb[4]),
                        Int32.Parse(tomb[5]),
                        tomb[6]
                    );
                    // Listához hozzá kell adni
                    tagorszagLista.Add(tagorszag);
                }
            }
        }

        // 4. Feladat, Hány tagország szerepel?
        // Egyszerű Count() függvény
        public static void HanyTagorszag()
        {
            Console.WriteLine($"1. Feladat: Tagországok száma: {tagorszagLista.Count()}");
        }

        // 5. Feladat, Legkisebb És Legnagyobb terület
        // Két-két integer és string változóval, feltétel ellenőrzéssel
        public static void LkEsLn()
        {
            string minS = "", maxS = "";
            int minN = tagorszagLista[0].Terulet, maxN = tagorszagLista[0].Terulet;
            foreach (var item in tagorszagLista)
            {
                // Legkisebb
                if (item.Terulet < minN) { minN = item.Terulet; minS = item.TagorszagNev; }
                // Legnagyobb
                if (item.Terulet > maxN) { maxN = item.Terulet; maxS = item.TagorszagNev; }
            }
            Console.WriteLine($"2. Feladat: Legkisebb területű tagország: {minS}\n\tLegnagyobb területű tagország: {maxS}");
        }

        // 6. feladat, egynél több hivatalos nyelv
        public static void TobbHivatalosNyelv()
        {
            int nyelvSzamlalo = 0;
            Console.WriteLine($"3. Feladat: Többnyelvű országok:");
            foreach (var item in tagorszagLista)
            {
                if (item.HivatalosNyelv.Split('/').Count() > 1) {
                    string[] nyelvTomb = item.HivatalosNyelv.Split('/');
                    Console.Write($"\tTagország: {item.TagorszagNev}, beszélt nyelvek: ");
                    foreach (var nyelv in nyelvTomb)
                    {
                        Console.Write($"{nyelv}, ");
                    }
                    Console.Write('\n');
                }
            }
        }
        public static void Statisztika()
        {
            // Könyvtár létrehozása, mivel ebbe rakom majd bele a kulcs-érték párokat
            Dictionary<int, int> statisztikaDict = new Dictionary<int, int>();
            foreach (var item in tagorszagLista)
            {
                bool benneVan = false;
                foreach (var tagorszag in statisztikaDict)
                {
                    if (item.CsatlakozasEve == tagorszag.Key)
                    {
                        int szamlalo = tagorszag.Value;
                        // Muszáj kitörölnöm, mert egyébként read-only
                        statisztikaDict.Remove(item.CsatlakozasEve);
                        // Ezért utána újra hozzáadom, mintha módosítottam volna
                        statisztikaDict.Add(item.CsatlakozasEve, szamlalo + 1);
                        benneVan = true;
                        break;
                    }
                }

                // Alábbi nem fut le, ha a könyvtárban már szerepel
                if (!benneVan)
                {
                    statisztikaDict.Add(item.CsatlakozasEve, 1);
                }
            }

            using (StreamWriter sw = new StreamWriter("Statisztika.txt"))
            {
                sw.WriteLine("csatlakozás éve,országok száma");
                // KeyValuePair használata, mert csak ezzel lehet iterálni a Dictionary gyűjteményben
                foreach (KeyValuePair<int,int> kvp in statisztikaDict) 
                {
                    sw.WriteLine($"{kvp.Key},{kvp.Value}");
                }
            }
        }
    }
}