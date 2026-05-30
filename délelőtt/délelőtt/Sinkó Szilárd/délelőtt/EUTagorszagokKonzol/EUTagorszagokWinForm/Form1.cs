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
        List<string> list = new List<string>();
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            string[] row = { columnHeader1.Text, columnHeader2.Text, columnHeader3.Text, columnHeader4.Text, columnHeader5.Text, columnHeader6.Text, columnHeader7.Text};
            var listViewItem = new ListViewItem(row);
            listView1.Items.Add(listViewItem);
        }

        private void comboBox1_SelectedIndexChanged(object sender, EventArgs e)
        {

        }
    }
}
