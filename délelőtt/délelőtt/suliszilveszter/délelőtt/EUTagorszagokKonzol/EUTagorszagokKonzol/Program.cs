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
            Tagorszag vezerlo = new Tagorszag();
            List<Tagorszag> euOrszagok = vezerlo.BeolvasAdatokat("eu_tagorszagok.txt");
            vezerlo.KiirOsszesOrszag(euOrszagok);
            vezerlo.KiirTeruletAdatok(euOrszagok);
        }
    }
}
