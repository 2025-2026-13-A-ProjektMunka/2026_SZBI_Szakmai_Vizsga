using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EUTagorszagokKonzol
{
    public class Tagorszag
    {
        public string TagorszagNev { get; set; }
        public int Terulet { get; set; }

        public int Lakossag { get; set; }

        public string TagorszagFovarosa { get; set; }

        public int TagorszagFovarosLakossag { get; set; }

        public int CsatlakozasEve { get; set; }
        public string HivatalosNyelv { get; set; }

        public Tagorszag(string tn, int t, int l, string tf, int tfl, int ce, string hn)
        {
            List<Tagorszag> Adat = new List<Tagorszag>();
            StreamReader read = null;
            String fileNev = "eu_tagorszagok.txt";

            try
            {
                read = new StreamReader(fileNev);
                while (!read.EndOfStream)
                {
                    string line = read.ReadLine();
                    string[] tomb = line.Split(';');
                    string[] TagorszagNev = new tomb[0];
                    int[] Terulet = Int32.Parse[1];
                    int[] Lakossag = Int32.Parse[2];
                    string[] TagorszagFovarosa = new tomb[3];
                    int[] TagorszagFovarosLakossag = Int32.Parse[4];
                    int[] CsatlakozasEve = Int32.Parse[5];
                    string[] HivatalosNyelv = new tomb[6];

                }
            }
            

        }

    }
}
