using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using EUTagorszagokKonzol;

namespace EUTagorszagokWinForm
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }
        public static List<Tagorszag> TagorszagLista = new List<Tagorszag>();
        public static Tagorszag KeresettTag = null;

        private void Form1_Load(object sender, EventArgs e)
        {
            Tagorszag.AdatListaFeltolt();
            TagorszagLista = Tagorszag.AdatLista;

            foreach(Tagorszag item in TagorszagLista)
            {
                ListViewItem lvi = new ListViewItem(item.TagorszagNev);
                lvi.SubItems.Add(item.Terulet.ToString());
                lvi.SubItems.Add(item.Lakossag.ToString());
                lvi.SubItems.Add(item.TagorszagFovaros);
                lvi.SubItems.Add(item.TagorszagFovarosLakossag.ToString());
                lvi.SubItems.Add(item.CsatlakozasEve.ToString());
                lvi.SubItems.Add(item.HivatalosNyelv);
                listView1.Items.Add(lvi);
                
            }

        }
    }
}
