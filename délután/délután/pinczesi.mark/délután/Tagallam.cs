using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NATOTagallamokKonzol
{
    internal class Tagallam
    {
        public string TagallamNev { get; set; };

        public int Terulet { get; set; };

        public int Lakossag { get; set; };

        public string TagallamFovaros { get; set; };

        public int TagallamFovarosaLakossag { get; set; };

        public int CsatlakozasEve { get; set; };

        public int HaderoNagysaga { get; set; };

        public NATOTagallamokKonzol (string tgn, int ter, int lak, string tgf, int csatv,int hadn)
        {
            this.TagallamNev = tgn;
            this.Terulet = ter;
            this.Lakossag = lak;
            this.TagallamFovaros = tgf;
            this.TagallamFovarosaLakossag = hadn;
            this.CsatlakozasEve = csatv;
            this.HaderoNagysaga = hadn;
        }

        public static viod AdatListaFeltolt()
        {
            string fileNev = "NATO_tagallamok.txt";
            using (StreamReader sr = new StreamReader(fileNev,Encoding.UTF8)) 
            {
                string elsoSor = sr.ReadLine();
                while (!sr.EndOfStream)
                {
                    string sor = sr.ReadLine();
                    string[] tomb = sor.Split(';');
                    string tgn = tomb[0];
                    int ter = Int32.Parse(tomb[1]);
                    int lak = Int32.Parse(tomb[2]);
                    string tgf = tomb[3];
                    int csatv = Int32.Parse(tomb[4]);
                    int hadn = Int32.Parse(tomb[5]);

                }

                Tagallam tg = new Tagallam(tgn,ter,lak,tgf,csatv,hadn)

                    Adatlista.Add(tg);
            }
    }

        public static void TagallamokSzama()
        {
            int tagallamokszama = AdatLista.Count;
            string kiir = $"1.feladat:Tagállamok száma:{TagallamokSzama}";
            Console.WriteLine(kiir);
        }

        public static void haDero()
        {
            int ;
            string kiir = $"2.feladat:legkisebb haderejű tagállam:{kissebb} legnagyobb haderejű tagállam:{nagyobb}";
            Console.WriteLine(kiir);
        }
}
