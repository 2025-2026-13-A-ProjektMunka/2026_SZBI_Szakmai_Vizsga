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
        public string TagorszagNev {  get; set; }
        public int Terulet { get; set; }
        public int Lakossag { get; set; }
        public string TagorszagFovaros { get; set; }
        public int TagorszagFovarosLakossag { get; set; }
        public int CsatlakozasEve { get; set; }
        public string HivatalosNyelv { get; set; }

        public Tagorszag(string tn, int te, int la, string tf, int tfl, int ce, string hn)
        {
            this.TagorszagNev = tn;
            this.Terulet = te;
            this.Lakossag = la;
            this.TagorszagFovaros = tf;
            this.TagorszagFovarosLakossag= tfl;
            this.CsatlakozasEve = ce;
            this.HivatalosNyelv = hn;
        }

        public static List<Tagorszag> AdatLista = new List<Tagorszag>();

        public static void AdatListaFeltolt()
        {
            string fileNev = "eu_tagorszagok.txt";

            using(StreamReader sr = new StreamReader(fileNev, Encoding.UTF8))
            {
                string elsoSor = sr.ReadLine();

                while(!sr.EndOfStream)
                {
                    string sor = sr.ReadLine();
                    string[] tomb = sor.Split(';');
                    string tn = tomb[0];
                    int te = Int32.Parse(tomb[1]);
                    int la = Int32.Parse(tomb[2]);
                    string tf = tomb[3];
                    int tfl = Int32.Parse(tomb[4]);
                    int ce = Int32.Parse(tomb[5]);
                    string hn = tomb[6];
                    Tagorszag ts = new Tagorszag(tn, te, la, tf, tfl, ce, hn);
                    AdatLista.Add(ts);
                }
            }
        }

        public static void TagorszagokSzama()
        {
            int tagorszagokszama = AdatLista.Count;
            string kiir = $"1. Feladat: Tagországok száma: {tagorszagokszama}";
            Console.WriteLine(kiir);
        }
        
        public static void Nepesseg()
        {
            var legnagyobb = AdatLista.OrderByDescending(v => v.Lakossag).First();
            var legkisebb = AdatLista.OrderBy(v => v.Lakossag).First();

            Console.WriteLine($"2.feldat: Legkisebb területű tagország: {legkisebb.TagorszagNev}");
            Console.WriteLine($"Legnagyobb területű tagország: {legnagyobb.TagorszagNev}");
        }

        
    }
}
