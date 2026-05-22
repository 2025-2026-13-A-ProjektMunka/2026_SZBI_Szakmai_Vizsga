using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NATOTagallamokKonzol
{
    public class Tagallam
    {
        public static List<Tagallam> AdatLista = new List<Tagallam>();

        // Property-k
        public string TagallamNev { get; set; }
        public int Terulet { get; set; }
        public int Lakossag { get; set; }
        public string TagallamFovaros { get; set; }
        public int TagallamFovarosLakossag { get; set; }
        public int CsatlakozasEve { get; set; }
        public int HaderoNagysaga { get; set; }

        // Konstruktor
        public Tagallam(string tan, int ter, int lak, string taf, int tafl, int cse, int hen)
        {
            this.TagallamNev = tan;
            this.Terulet = ter;
            this.Lakossag = lak;
            this.TagallamFovaros = taf;
            this.TagallamFovarosLakossag = tafl;
            this.CsatlakozasEve = cse;
            this.HaderoNagysaga = hen;
        }

        public static void AdatListaFeltolt()
        {
            string fileNev = "NATO_tagallamok.txt";

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
                    int hen = Int32.Parse(tomb[6]);
                    Tagallam vm = new Tagallam(tan, ter, lak, taf, tafl, cse, hen);
                    AdatLista.Add(vm);
                }
            }
        }

        public override string ToString()
        {
            string szoveg = $"\tTagállam: {this.TagallamNev}, " +
                $"terület: {this.Terulet}, " +
                $"lakosság: {this.Lakossag}, " +
                $"főváros: {this.TagallamFovaros}, " +
                $"lakosság: {this.TagallamFovarosLakossag}, " +
                $"csatlakozás éve: {this.CsatlakozasEve}, " +
                $"haderő nagysága: {this.HaderoNagysaga}";

            return szoveg;
        }

        public static void Tagallamokszama()
        {
            int tagorszagokSzama = AdatLista.Count;
            string kiir = $"1. Feladat: Tagállamok száma: {tagorszagokSzama}";
            Console.WriteLine(kiir);
        }

        public static void HaderoSzerint()
        {
            int elemszam = AdatLista.Count;
            AdatLista.Sort((s1, s2) => s1.HaderoNagysaga.CompareTo(s2.HaderoNagysaga));

            string teruletSzerint = $"2. Feladat: Legkisebb haderejű tagállam: {AdatLista[0].TagallamNev}";
            teruletSzerint += $"\n\tLegnagyobb haderejű tagállam: {AdatLista[elemszam - 1].TagallamNev}";

            Console.WriteLine(teruletSzerint);
        }

        public static void Aranyszamitas()
        {
            string kiir = "3. Feladat: 0.5%-nál nagyobb haderővel rendelkező tagállamok: \n";

            foreach (Tagallam item in AdatLista)
            {
                double arany = (double) item.HaderoNagysaga / item.Lakossag;
              
                if (arany > 0.005)
                {
                    kiir += $"\tTagállam: {item.TagallamNev}, arány: {arany:F5}";
                    kiir += "\n";
                }
            }

            Console.WriteLine(kiir);
        }

        public static void StatisztikaKeszites(string filenev)
        {
            Dictionary<int, int> konyvtar = new Dictionary<int, int>();

            foreach (Tagallam item in AdatLista)
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
                string kiir = "csatlakozás éve,tagállamok száma\n";

                foreach (KeyValuePair<int, int> item in konyvtar)
                {
                    kiir += $"{item.Key},{item.Value}\n";
                }

                sw.WriteLine(kiir);
            }
        }
    }
}
