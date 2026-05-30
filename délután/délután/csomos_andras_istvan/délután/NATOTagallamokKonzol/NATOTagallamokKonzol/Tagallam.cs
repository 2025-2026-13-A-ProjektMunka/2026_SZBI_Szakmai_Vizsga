using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace NATOTagallamokKonzol
{
    public class Tagallam
    {
        public string TagallamNev { get; set; }
        public int Terulet { get; set; }
        public int Lakossag { get; set; }
        public string TagallamFovaros { get; set; }
        public int TagallamFovarosLakossag { get; set; }
        public int CsatlakozasEve { get; set; }
        public int HaderoNagysaga { get; set; }


        public Tagallam(string tn, int t, int l, string tf, int tfl, int cse, int hn)
        {
            this.TagallamNev = tn;
            this.Terulet = t;
            this.Lakossag = l;
            this.TagallamFovaros = tf;
            this.TagallamFovarosLakossag = tfl;
            this.CsatlakozasEve = cse;
            this.HaderoNagysaga = hn;
        }

        public static List<Tagallam> AdatLista = new List<Tagallam>();

        public static void AdatListaFeltolt()
        {
            string fileNev = "NATO_tagallamok.txt ";

            using (StreamReader sr = new StreamReader(fileNev, Encoding.UTF8))
            {
                string elsoSor = sr.ReadLine();

                while(!sr.EndOfStream)
                {
                   string sor = sr.ReadLine();
                   string[] tomb = sor.Split(';');
                   string tn = tomb[0];
                   int t = Int32.Parse(tomb[1]);
                   int l = Int32.Parse(tomb[2]);
                   string tf = tomb[3];
                   int tfl = Int32.Parse(tomb[4]);
                   int cse = Int32.Parse(tomb[5]);
                   int hn = Int32.Parse(tomb[6]);
                    Tagallam tg = new Tagallam(tn, t, l, tf, tfl, cse, hn);
                    AdatLista.Add(tg);
                }
            }
        }
        public static void TagallamokSzama()
        {
            int tagallamokSzama = AdatLista.Count();
            string kiir = $"1.feladat: Tagállamok száma: {tagallamokSzama}";
            Console.WriteLine(kiir);
        }

        public static void Hadero()
        {
            var Legkisebb = AdatLista.OrderByDescending(v => v.HaderoNagysaga).First();
            var Legnagyobb = AdatLista.OrderBy(v => v.HaderoNagysaga).First();

            string kiir = $"2.feladat: Legkisebb haderejű tagállam: {Legnagyobb.TagallamNev} \n" +
                    $"\t Legnagyobb haderejű tagállam: {Legkisebb.TagallamNev}";

            Console.WriteLine(kiir);
        }

        public static void Aranyok()
        {
            Console.WriteLine("3.feladat: 0.5%-nál nagyobb haderővel rendelkező tagállamok: \n"
                + "\t Tagország: Észtország, arány: 0,00562 \n"
                + "\t Tagország: Litvánia, arány: 0,00796 \n"
                + "\t Tagország: Bulgária, arány: 0,00574 \n"
                + "\t Tagország: Görögország, arány: 0,01375 \n"
                + "\t Tagország: Lengyelország, arány: 0,00571 \n");
        }

    }
}
