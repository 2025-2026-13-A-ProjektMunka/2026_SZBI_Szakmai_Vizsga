using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace EUTagorszagokKonzol
{
    internal class Program
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

           
        }

        public static void file_beolvas(string eu_tagorszagok) 
        {
            using (var reader = new StreamReader("eu_tagorszagok.txt")) 
            {
                eu_tagorszagok = reader.ReadToEnd();
            }  
        }
        public static void Main(string[] args)
        {
           
        }
    }
}
