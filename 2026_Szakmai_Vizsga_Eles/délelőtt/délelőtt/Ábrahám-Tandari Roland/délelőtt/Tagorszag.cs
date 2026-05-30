using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EUTagorszagokKonzol
{
    internal class Tagorszag
    {
        public string TagorszagNev { get; init; }

        public int Terulet { get; init; }

        public int Lakossag { get; init; }

        public string TagorszagFovaros { get; init}

        public int TagorszagFovarosLakossag { get; init}

        public int CsatlakozasEve { get; init }

        public string Hivatalosnyelv { get; init}
    }
}
