using EUTagorszagokKonzol;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using static System.Windows.Forms.VisualStyles.VisualStyleElement;

namespace EUTagorszagokWinForm
{
    public partial class Form1 : Form
    {
        public static List<Tagorszag> TagorszagokLista = new List<Tagorszag>();

        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            Tagorszag.AdatListaFeltolt();
            TagorszagokLista = Tagorszag.AdatLista;

            foreach (Tagorszag item in TagorszagokLista)
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

            foreach (Tagorszag item in TagorszagokLista)
            {
                comboBox1.Items.Add(item.TagorszagFovaros);
            }
        }

        private void comboBox1_SelectedIndexChanged(object sender, EventArgs e)
        {
            string fovaros = comboBox1.Text;

            foreach (Tagorszag item in TagorszagokLista)
            {
                if (item.TagorszagFovaros == fovaros)
                {
                    label3.Visible = true;
                    label3.Text = item.ToString();
                }
            }
        }

        private void button1_Click(object sender, EventArgs e)
        {
            int kezdo = (int)numericUpDown1.Value;
            int veg = (int)numericUpDown2.Value;

            List<Tagorszag> leszurt = new List<Tagorszag>();

            foreach (Tagorszag item in TagorszagokLista)
            {
                if (kezdo < item.CsatlakozasEve && item.CsatlakozasEve < veg) leszurt.Add(item);
            }

            string kiir = "";

            if (leszurt.Count > 0)
            {
                foreach (var item in leszurt)
                {
                    kiir += $"{item.TagorszagNev}\r\n";
                }
            }
            else
            {
                kiir = "Nincs elérhető tagország!";
            }

            textBox1.Text = kiir;
        }
    }
}
