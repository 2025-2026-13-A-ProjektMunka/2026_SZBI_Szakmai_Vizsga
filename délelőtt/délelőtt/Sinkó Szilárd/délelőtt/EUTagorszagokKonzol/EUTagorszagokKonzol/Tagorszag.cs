using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Security.Cryptography.X509Certificates;
using System.Runtime.CompilerServices;
using System.Linq.Expressions;

namespace EUTagorszagokKonzol
{
    public class Tagorszag
    {
        public string TagorszagNev { get; set; }
        public int Terulet { get; set; }

        public int Lakossag { get; set; }

        public string TagorszagFovaros { get; set; }

        public int TagorszagFovarosLakossag { get; set; }

        public int CsatlakozasEve { get; set; }

        public string HivatalosNyelv { get; set; }

        public Tagorszag(string TN, int T, int L, string TF, int TFL, int CSE, string HNY)

        {
            this.TagorszagNev = TN;
            this.Terulet = T;
            this.Lakossag = L;
            this.TagorszagNev = TN;
            this.TagorszagFovaros = TF;
            this.TagorszagFovarosLakossag = TFL;
            this.CsatlakozasEve = CSE;
            this.HivatalosNyelv = HNY;
        }

        public static void Kiiratas()
        {

            using (StreamReader sr = new StreamReader("eu_tagorszagok.txt", Encoding.UTF8))
            {
                string tagOrszagok;

                while ((tagOrszagok = sr.ReadLine()) != null)
                {
                    Console.WriteLine(tagOrszagok);

                    Console.ReadKey(true);
                }
            }
        }
        
    }
}
