using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace NATOTagallamokKonzol
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

        public Tagallam(string tgn, int tr, int lak, string tgf, int tgfl, int cse, int hn)
        {
            this.TagallamNev = tgn;
            this.Terulet = tr;
            this.Lakossag = lak;
            this.TagallamFovaros = tgf;
            this.TagallamFovarosLakossag = tgfl;
            this.CsatlakozasEve = cse;
            this.HaderoNagysaga = hn;
        }

        public static

            
            

       
            

    };




}
