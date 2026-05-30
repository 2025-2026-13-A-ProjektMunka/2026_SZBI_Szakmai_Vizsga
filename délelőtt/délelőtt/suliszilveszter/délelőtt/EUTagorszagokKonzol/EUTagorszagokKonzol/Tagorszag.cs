using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace EUTagorszagokKonzol
{
    public class Tagorszag
    {
        public string TagorszagNev { get; set; }
        
         public int Terulet {  get; set; }

        public int Lakossag { get; set; }

        public string TagorszagFovaros { get; set; }

        public int TagorszagLakossag { get; set; }

        public int CsatlakozasEve { get; set; }

        public string HivatalosNyelv { get; set; }

        List<Tagorszag>EuTagorszag = new List<Tagorszag>();
        string fileName = "eu_tagorszagok.txt";    
    
    public Tagorszag() 
        {
        }

       
        public List<Tagorszag> BeolvasAdatokat(string fajlNev)
        {
            List<Tagorszag> orszagok = new List<Tagorszag>();
            using (StreamReader sr = new StreamReader(fajlNev))
            {
                sr.ReadLine(); 
                while (!sr.EndOfStream)
                {
                    orszagok.Add(new Tagorszag(sr.ReadLine()));
                }
            }
            return orszagok;
        }

        public void KiirOsszesOrszag(List<Tagorszag> orszagok)
        {
            Console.WriteLine($"4. feladat: Az állományban {orszagok.Count} db tagország szerepel.");
        }

        public void KiirTeruletAdatok(List<Tagorszag> orszagok)
        {
            Tagorszag legkisebb = orszagok.OrderBy(o => o.Terulet).First();
            Tagorszag legnagyobb = orszagok.OrderByDescending(o => o.Terulet).First();

            Console.WriteLine($"5. feladat: Legkisebb területű: {legkisebb.TagorszagNev} ({legkisebb.Terulet} km2)");
            Console.WriteLine($"Legnagyobb területű: {legnagyobb.TagorszagNev} ({legnagyobb.Terulet} km2)");
        }
    }
}
