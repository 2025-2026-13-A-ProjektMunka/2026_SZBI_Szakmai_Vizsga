using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NATOTagallamokKonzol
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Tagallam.AdatListaFeltolt();
            Tagallam.Tagallamokszama();
            Tagallam.HaderoSzerint();
            Tagallam.Aranyszamitas();
            Tagallam.StatisztikaKeszites("Statisztika.txt");

            Console.ReadKey(true);
        }
    }
}
