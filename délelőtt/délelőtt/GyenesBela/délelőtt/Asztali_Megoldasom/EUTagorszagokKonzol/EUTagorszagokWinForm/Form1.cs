using System;
using System.Collections.Generic;
using System.Windows.Forms;
using EUTagorszagokKonzol;

namespace EUTagorszagokWinForm
{
    public partial class Form1 : Form
    {
        public List<Tagorszag> tagorszagListaWF = new List<Tagorszag>();
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            // Állomány betöltése
            Tagorszag.AllomanyBeolvas();
            tagorszagListaWF = Tagorszag.tagorszagLista;

            foreach (var item in tagorszagListaWF)
            {
                // ListView feltöltése
                ListViewItem lvt = new ListViewItem(item.TagorszagNev);
                lvt.SubItems.Add(item.Terulet.ToString());
                lvt.SubItems.Add(item.Lakossag.ToString());
                lvt.SubItems.Add(item.TagorszagFovaros);
                lvt.SubItems.Add(item.TagorszagFovarosLakossag.ToString());
                lvt.SubItems.Add(item.CsatlakozasEve.ToString());
                lvt.SubItems.Add(item.HivatalosNyelv);
                listView1.Items.Add(lvt);

                // ComboBox feltöltése
                comboBox1.Items.Add(item.TagorszagFovaros);
            }
        }

        private void comboBox1_SelectedIndexChanged(object sender, EventArgs e)
        {
            adatLabel.Visible = true;
            foreach (var item in tagorszagListaWF)
            {
                if (item.TagorszagFovaros == comboBox1.Text)
                {
                    adatLabel.Text = $"" +
                        $"Tagország: {item.TagorszagNev}," +
                        $"terület: {item.Terulet}," +
                        $"lakosság: {item.Lakossag}," +
                        $"főváros: {item.TagorszagFovaros}," +
                        $"lakosság: {item.TagorszagFovarosLakossag}," +
                        $"csatlakozás éve: {item.CsatlakozasEve}," +
                        $"hivatalos nyelv(ek): {item.HivatalosNyelv}";
                }
            }
        }

        private void button1_Click(object sender, EventArgs e)
        {
            textBox1.Text = "";
            bool van = false;

            // Muszáj decimális típusban, mert integerben nem fogadja el
            decimal minCsatErtek = minCsat.Value;
            decimal maxCsatErtek = maxCsat.Value;

            foreach (var item in tagorszagListaWF)
            {
                // A feladat azt kérte, hogy a két évszám közötti EU éves országokat nézzük
                if (item.CsatlakozasEve > minCsatErtek && item.CsatlakozasEve < maxCsatErtek) {
                    textBox1.Text += $"{item.TagorszagNev}\r\n";
                    van = true;
                }
            }

            if (!van)
            {
                textBox1.Text = "Nincs elérhető tagország!";
            }
        }
    }
}
