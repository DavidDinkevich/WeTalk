using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;
using WeTalkWindows.Models;

namespace WeTalkWindows {
    /// <summary>
    /// Interaction logic for AddContactWindow.xaml
    /// </summary>
    public partial class AddContactWindow : Window { 

        public AddContactWindow() {
            InitializeComponent();
        }

        private void AddContact(object sender, RoutedEventArgs e) {
            HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Add("Authorization", "Bearer " + Context.TOKEN);

            JObject oJsonObject = new JObject();
                oJsonObject.Add("id", UsernameField.Text);
                oJsonObject.Add("name", NameField.Text);
                oJsonObject.Add("server", IPField.Text + ":" + PortField.Text);

                var content = new StringContent(oJsonObject.ToString(), Encoding.UTF8, "application/json");

                var task = Task.Run(() => client.PostAsync(string.Format("http://{0}/api/contacts", Context.SERVER), content));
                task.Wait();
                var response = task.Result;
                //if (response.StatusCode == System.Net.HttpStatusCode.Created) {
                    // Change screens
                    this.Close();

                //} else {
                    //MessageBox.Show("Couldn't add requested contact");
                //}


        }

    }
}
