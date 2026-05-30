using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace NATOTagallamokKonzol
{
    internal class Program
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

            public Tagallam(string nev, int te, int lak, string fv, int fvl, int cse, int ho)
            {
                TagallamNev = nev;
                Terulet = te;
                Lakossag = lak;
                TagallamFovaros = fv;
                TagallamFovarosLakossag = fvl;
                CsatlakozasEve = cse;
                HaderoNagysaga = ho;


            }

            public static List AdatLista = new List();

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
                        string nev = tomb[0];
                        int te = Int32.Parse(tomb[1]);
                        int lak = Int32.Parse(tomb[2]);
                        string fv = tomb[3];
                        int fvl = Int32.Parse(tomb[4]);
                        int cse = Int32.Parse(tomb[5]);
                        int ho = Int32.Parse(tomb[6]);
                        Tagallam tmn = new Tagallam(nev, te, lak, fv, fvl, cse, ho);
                        AdatLista.Add(tmn);
                    }


                }
            }

            public static void Tagallamokszama()
            {
                int tagallamokszama = AdatLista.Count;
                string kiir = $"1. Feladat: Tagallamok száma: {tagallamokszama}";
                Console.WriteLine(kiir);
            }

            public static void Tagallamhaderöo()
            {
                int tagallamokszama = AdatLista.Va;
                string kiir = $"1. Feladat: Tagallamok száma: {tagallamokszama}";
                Console.WriteLine(kiir);



            }






            static void Main(string[] args)
            {


            }

        }
    }
}
