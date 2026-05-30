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

namespace NATOTagallamokWinForm
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        public static List<Tagallam> TagallamLista = new List<Tagallam>();

        private void Form1_Load(object sender, EventArgs e)
        {
            Tagallam.AdatListaFeltolt();
            TagallamLista = Tagallam.AdatLista;

            foreach(Tagallam item in TagallamLista)
            {
                ListViewItem lvi = new ListViewItem(item.TagallamNev);
                lvi.SubItems.Add(item.Terulet.ToString());
                lvi.SubItems.Add(item.Lakossag.ToString());
                lvi.SubItems.Add(item.TagallamFovaros);
                lvi.SubItems.Add(item.TagallamFovarosLakossag.ToString());
                lvi.SubItems.Add(item.CsatlakozasEve.ToString());
                lvi.SubItems.Add(item.HaderoNagysaga.ToString());
                listView1.Items.Add(lvi);
            }
        }

        private void textBox1_TextChanged(object sender, EventArgs e)
        {

        }
    }
}
