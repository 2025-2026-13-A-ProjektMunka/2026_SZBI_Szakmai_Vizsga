using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EUTagorszagokKonzol
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Tagorszag.AdatListaFeltolt();
            Tagorszag.Tagorszagokszama();
            Tagorszag.TeruletSzerint();
            Tagorszag.HivatalosNyelvek();
            Tagorszag.StatisztikaKeszites("Statisztika.txt");

            Console.ReadKey(true);
        }
    }
}
