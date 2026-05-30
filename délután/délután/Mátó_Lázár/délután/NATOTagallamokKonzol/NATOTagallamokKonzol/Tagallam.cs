using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace NATOTagallamokKonzol
{
    public class Tagallam
    {
        string TagallamNev {  get; set; }
        int Terulet { get; set; }
        int Lakossag { get; set; }
        string TagallamFovaros { get; set; }
        int TagallamFovarosLakossag { get; set; }
        int CsatlakozasEve { get; set; }
        int HaderoNagysaga { get; set; }

        public Tagallam(string tn, int tr, int lk, string tf, int tfl, int cse, int hn)
        {
            this.TagallamNev = tn;
            this.Terulet = tr;
            this.Lakossag = lk;
            this.TagallamFovaros = tf;
            this.TagallamFovarosLakossag = tfl;
            this.CsatlakozasEve = cse;
            this.HaderoNagysaga = hn;
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
                    string tn = tomb[0];
                    int tr = Int32.Parse(tomb[1]);
                    int lk = Int32.Parse(tomb[2]);
                    string tf = tomb[3];
                    int tfl = Int32.Parse(tomb[4]);
                    int cse = Int32.Parse(tomb[5]);
                    int hn = Int32.Parse(tomb[6]);
                    Tagallam ta = new Tagallam(tr, lk, tf, tfl, cse, hn);
                    AdatLista.Add(ta);
                }
            }
        }

    }
}

