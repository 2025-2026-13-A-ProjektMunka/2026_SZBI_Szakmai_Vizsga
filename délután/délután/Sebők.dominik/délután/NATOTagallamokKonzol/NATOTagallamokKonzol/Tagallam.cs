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
        public string TagallamNev { get; set; } 
        public int Terulet { get; set; }
        public int Lakossag {  get; set; }
        public string TagallamFovaros { get; set; }
        public int TagallamFovarosLakossag { get; set; }
        public int CsatlakozasEve { get; set; }
        public int HaderoNagysaga { get; set; }

        public Tagallam(string tgn, int tr, int lak, string tgf, int tgfl, int cse, int hns)
        {
            this.TagallamNev = tgn;
            this.Terulet = tr;
            this.Lakossag = lak;
            this.TagallamFovaros = tgf;
            this.TagallamFovarosLakossag = tgfl;
            this.CsatlakozasEve = cse;
            this.HaderoNagysaga = hns;
        }

        public static <List> AdatList = new <List>();
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
                    string tgn = tomb[0];
                    int tr = Int32.Parse(tomb[1]);
                    int lak = Int32.Parse(tomb[2]);
                    string tgf = tomb[3];
                    int tgfl = Int32.Parse(tomb[4]);
                    int cse = Int32.Parse(tomb[5]);
                    int hns = Int32.Parse(tomb[6]);
                    Tagallam tgn = new Tagallam();
                    AdatList.Add(tgn);
                }
            }
        }

        public static void TagallamokSzama()
        {
            int tagallamokszama = AdatList.Count;
            string kiir = $"1. Feladat: Legnagyobb hadierő száma: {tagallamokszama}";
            Console.WriteLine(kiir);
        }
        public static void LegnagyobbHadierő()
        {
            int legnagyobbhadero = AdatList.Max;
            string kiir = $"2. Feladat: Legnagyobb hadierő száma: {legnagyobbhadero}";
            Console.WriteLine(kiir);
        }

    };

}
