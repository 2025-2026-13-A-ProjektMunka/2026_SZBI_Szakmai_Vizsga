using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace NATOTagallamokWinForm
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        public static ListViewItem TagallamokLista = new ListViewItem();
        public static tagallamok KivalasztottTagallam = null;

        private void Form1_Load(object sender, EventArgs e)
        {
            Tagallam.AdatlistaFeltolt();
            TagallamokLista = Tagallamok.adatlista();
            foreach (NATOTagallamokWinForm item in TagallamokLista) 
            {
                ListViewItem lvi = new ListViewItem(item.TagallamokNeve);
                lvi.SubItems.Add(item.Terulet.toString());
                lvi.SubItems.Add(item.Lakossag.toString());
                lvi.SubItems.Add(item.Fovaros);
                lvi.SubItems.Add(item.Fovaroslakossag.toString());
                lvi.SubItems.Add(item.Csatlakozaseve.toString());
                lvi.SubItems.Add(item.HaderoNagysaga.toString(
                    listView1.items.Add(lvi));

                
            }
        }

        private void listView1_SelectedIndexChanged(object sender, EventArgs e)
        {

        }
    }
}
