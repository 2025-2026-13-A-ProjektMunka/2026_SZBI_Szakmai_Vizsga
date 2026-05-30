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
        public static List<Tagallam> TagallamLista = new List<Tagallam>();

        static void Main(string[] args)
        {
            string filenev = "NATO_tagallamok.txt";

            using (StreamReader sr = new StreamReader(filenev, Encoding.UTF8))
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
                    int hn = Int32.Parse(tomb[6]);
                    Tagallam tg = new Tagallam(tgn, tr, lak, tgf, tgfl, cse, hn);
                    TagallamLista.Add(tg);
                }
            }

            string negyedikfeladat = $"1.feladat: Tagállamok száma: {TagallamLista.Count}";
                Console.Writeline(negyedikfeladat);

            Console.ReadKey(true);

        }






    
    }
}
