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
        public static List<Tagallam> TagallamokLista = new List<Tagallam>();

        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            Tagallam.AdatListaFeltolt();
            TagallamokLista = Tagallam.AdatLista;

            foreach (Tagallam item in TagallamokLista)
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

            foreach (Tagallam item in TagallamokLista)
            {
                comboBox1.Items.Add(item.TagallamNev);
            }
        }

        private void comboBox1_SelectedIndexChanged(object sender, EventArgs e)
        {
            string tagallam = comboBox1.Text;

            foreach (Tagallam item in TagallamokLista)
            {
                if (item.TagallamNev == tagallam)
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

            List<Tagallam> leszurt = new List<Tagallam>();

            foreach (Tagallam item in TagallamokLista)
            {
                if (kezdo < item.HaderoNagysaga && item.HaderoNagysaga < veg) leszurt.Add(item);
            }

            string kiir = "";

            if (leszurt.Count > 0)
            {
                foreach (var item in leszurt)
                {
                    kiir += $"{item.TagallamNev}\r\n";
                }
            }
            else
            {
                kiir = "Nincs elérhető tagállam!";
            }

            textBox1.Text = kiir;
        }
    }
}
