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

        public string TagallamNev { get; set; }
        public int Terulet { get; set; }
        public int Lakossag { get; set; }
        public string TagallamFovaros { get; set; }
        public int TagallamFovarosLakossag { get; set; }
        public int CsatlakozasEve { get; set; }
        public int HaderoNagysaga { get; set; }

        public Tagallam(string tn, int tt, int lak, string tf, int tl, int cse, int hn)
        {
            this.TagallamNev = tn;
            this.Terulet = tt;
            this.Lakossag = lak;
            this.TagallamFovaros = tf;
            this.TagallamFovarosLakossag = tl;
            this.CsatlakozasEve = cse;
            this.HaderoNagysaga = hn;
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

                    string tn = tomb[0];
                    int tt = Int32.Parse(tomb[1]);
                    int lak = Int32.Parse(tomb[2]);
                    string tf = tomb[3];
                    int tl = Int32.Parse(tomb[4]);
                    int cse = Int32.Parse(tomb[5]);
                    int hn = Int32.Parse(tomb[6]);
                    Tagallam tm = new Tagallam(tn, tt, lak, tf, tl, cse, hn);
                    AdatLista.Add(tm);
                }
            }
        }

        public static void TagallamokSzama()
        {
            int TagallamSzam = AdatLista.Count;
            string kiir = $"1. Feladat: Tagállamok száma: {TagallamSzam}";
            Console.WriteLine(kiir);
        }
    }
}
