using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
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
    /// Interaction logic for SignupWindow.xaml
    /// </summary>
    public partial class SignupWindow : Window {
        private static readonly HttpClient client = new HttpClient();

        public SignupWindow() {
            InitializeComponent();
        }


        private void GotoLogin(object sender, RoutedEventArgs e) {
            LoginWindow lw = new LoginWindow();
            lw.Show();
            this.Close();
        }

        private void AttemptSignUp(object sender, RoutedEventArgs e) {
            if (PasswordField.Password != ConfirmPassword.Password) {
                MessageBox.Show("Passwords do not match");
                return;
            }

            Context.ActiveUserID = UsernameField.Text;
            Context.ActiveUserName = NameField.Text;

            JObject oJsonObj = new JObject();
            oJsonObj.Add("id", Context.ActiveUserID);
            oJsonObj.Add("name", Context.ActiveUserName);
            oJsonObj.Add("password", PasswordField.Password);
            oJsonObj.Add("server", Context.SERVER);

            var content = new StringContent(oJsonObj.ToString(), Encoding.UTF8, "application/json");

            var task = Task.Run(() => client.PostAsync(string.Format("http://{0}/api/signup", Context.SERVER), content));
            task.Wait();
            var response = task.Result;
            if (response.StatusCode == System.Net.HttpStatusCode.OK) {
                Stream s = response.Content.ReadAsStream();
                StreamReader readStream = new StreamReader(s, Encoding.UTF8);
                string strResp = readStream.ReadToEnd();
                Context.TOKEN = strResp;
                // Change screens
                MainWindow mw = new MainWindow();
                mw.Show();
                this.Close();

            } else {
                MessageBox.Show("Username or password is invalid");
            }
        }


    }
}
