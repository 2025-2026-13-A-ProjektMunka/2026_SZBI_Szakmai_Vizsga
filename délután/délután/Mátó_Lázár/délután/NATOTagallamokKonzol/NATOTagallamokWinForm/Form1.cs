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
        public static List TagallamLista = new List();
        public static Tagallam KivalasztottTagallam = null;
        private void Form1_Load(object sender, EventArgs e)
        {
            Tagallam.AdatListaFeltolto();
            TagallamLista = Tagallam.AdatLista;
            foreach (Tagallam item in TagallamLista)
            {
                ListViewItem lvi = new ListViewItem(item.TagallamNeve);
                lvi.SubItems.Add(item.Tagallam);
                lvi.SubItems.Add(item.Terulet.ToString());
                lvi.SubItems.Add(item.Fovaros.());
                lvi.SubItems.Add(item.FovarosLakossaga);
                lvi.SubItems.Add(item.Csatlakozaseve.ToString());
                )); listView1.Items.Add(lvi);
            }
        }
    }
}

