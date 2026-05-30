using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using NATOTagallamokKonzol;

namespace TagalamokWinForm
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }
        public static List TagallamokLista = new List();
        public static Tagallam KivalasztottAllam = null;
        private void Form1_Load(object sender, EventArgs e)
        {
            Tagallam.AdListaFeltolto();
            TagallamokLista = Tagallam.AdListaFeltolto();
            foreach (Tagallam item in TagallamokLista)
            {
                ListViewItem lvi = new ListViewItem(item.TagallamNev);
                lvi.SubItems.Add(item.TagallamNev);
                lvi.SubItems.Add(item.Terulet.ToString());
                lvi.SubItems.Add(item.Lakossag.ToString());
                lvi.SubItems.Add(item.TagallamFovaros);
                lvi.SubItems.Add(item.TagallamFovarosLakossag.ToString());
                lvi.SubItems.Add(item.CsatlakozasEve.ToString());
                lvi.SubItems.Add(item.HaderoNagysaga.ToString());
                listView1.Items.Add(lvi);
            }
        }
    }
}

