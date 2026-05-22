using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EUTagorszagokKonzol
{
    public class Tagorszag
    {
        public static List<Tagorszag> AdatLista = new List<Tagorszag>();

        // Property-k
        public string TagorszagNev { get; set; }
        public int Terulet { get; set; }
        public int Lakossag { get; set; }
        public string TagorszagFovaros { get; set; }
        public int TagorszagFovarosLakossag { get; set; }
        public int CsatlakozasEve { get; set; }
        public string HivatalosNyelv { get; set; }

        // Konstruktor
        public Tagorszag(string tan, int ter, int lak, string taf, int tafl, int cse, string hny)
        {
            this.TagorszagNev = tan;
            this.Terulet = ter;
            this.Lakossag = lak;
            this.TagorszagFovaros = taf;
            this.TagorszagFovarosLakossag = tafl;
            this.CsatlakozasEve = cse;
            this.HivatalosNyelv = hny;
        }

        public static void AdatListaFeltolt()
        {
            string fileNev = "eu_tagorszagok.txt";

            using (StreamReader sr = new StreamReader(fileNev, Encoding.UTF8))
            {
                string elsoSor = sr.ReadLine();

                while (!sr.EndOfStream)
                {
                    string sor = sr.ReadLine();
                    string[] tomb = sor.Split(';');
                    string tan = tomb[0];
                    int ter = Int32.Parse(tomb[1]);
                    int lak = Int32.Parse(tomb[2]);
                    string taf = tomb[3];
                    int tafl = Int32.Parse(tomb[4]);
                    int cse = Int32.Parse(tomb[5]);
                    string hny = tomb[6];
                    Tagorszag vm = new Tagorszag(tan, ter, lak, taf, tafl, cse, hny);
                    AdatLista.Add(vm);
                }
            }
        }

        public override string ToString()
        {
            string szoveg = $"\tTagország: {this.TagorszagNev}, " +
                $"terület: {this.Terulet}, " +
                $"lakosság: {this.Lakossag}, " +
                $"főváros: {this.TagorszagFovaros}, " +
                $"lakosság: {this.TagorszagFovarosLakossag}, " +
                $"csatlakozás éve: {this.CsatlakozasEve}, " +
                $"hivatalos nyelv(ek): {this.HivatalosNyelv}";

            return szoveg;
        }

        public static void Tagorszagokszama()
        {
            int tagorszagokSzama = AdatLista.Count;
            string kiir = $"1. Feladat: Tagországok száma: {tagorszagokSzama}";
            Console.WriteLine(kiir);
        }

        public static void TeruletSzerint()
        {
            int elemszam = AdatLista.Count;
            AdatLista.Sort((s1, s2) => s1.Terulet.CompareTo(s2.Terulet));

            string teruletSzerint = $"2. Feladat: Legkisebb területű tagország: {AdatLista[0].TagorszagNev}";
            teruletSzerint += $"\n\tLegnagyobb területű tagország: {AdatLista[elemszam - 1].TagorszagNev}";

            Console.WriteLine(teruletSzerint);
        }

        public static void HivatalosNyelvek()
        {
            string kiir = "3. Feladat: Többnyelvű országok: \n";

            foreach (Tagorszag item in AdatLista)
            {
                string[] nyelvek = item.HivatalosNyelv.Split('/');
                
                if (nyelvek.Length > 1)
                {
                    kiir += $"\tTagország: {item.TagorszagNev}, beszélt nyelvek: ";

                    foreach (string nyelv in nyelvek)
                    {
                        kiir += $"{nyelv}, ";
                    }

                    kiir += "\n";
                }
            }

            Console.WriteLine(kiir);
        }

        public static void StatisztikaKeszites(string filenev)
        {
            Dictionary<int, int> konyvtar = new Dictionary<int, int>();

            foreach (Tagorszag item in AdatLista)
            {
                int csatlakozas = item.CsatlakozasEve;
                bool vanE = true;

                foreach (KeyValuePair<int, int> elem in konyvtar)
                {
                    int ertek = elem.Key;
                    int szam = elem.Value;

                    if (ertek == csatlakozas)
                    {
                        szam++;
                        vanE = false;
                        konyvtar.Remove(ertek);
                        konyvtar.Add(ertek, szam);
                        break;
                    }
                }

                if (vanE)
                {
                    konyvtar.Add(csatlakozas, 1);
                }
            }

            using (StreamWriter sw = new StreamWriter(filenev, false, Encoding.UTF8))
            {
                string kiir = "csatlakozás éve,országok száma\n";

                foreach (KeyValuePair<int, int> item in konyvtar)
                {
                    kiir += $"{item.Key},{item.Value}\n";
                }

                sw.WriteLine(kiir);
            }
        }
    }
}
