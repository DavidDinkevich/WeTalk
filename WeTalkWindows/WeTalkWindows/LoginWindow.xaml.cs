﻿using Newtonsoft.Json.Linq;
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
    /// Interaction logic for LoginWindow.xaml
    /// </summary>
    public partial class LoginWindow : Window {
        private static readonly HttpClient client = new HttpClient();


        public LoginWindow() {
            InitializeComponent();


        }

        private void GotoSignup(object sender, RoutedEventArgs e) {
            SignupWindow lw = new SignupWindow();
            lw.Show();
            this.Close();
        }


        private void AttemptLogin(object sender, RoutedEventArgs e) {
            Context.ActiveUserID = EmailField.Text;
            Context.ActiveUserName = EmailField.Text;

            JObject oJsonObj = new JObject();
            oJsonObj.Add("username", Context.ActiveUserID);
            oJsonObj.Add("password", PasswordField.Password);

            var content = new StringContent(oJsonObj.ToString(), Encoding.UTF8, "application/json");

            var task = Task.Run(() => client.PostAsync(string.Format("http://{0}/api/login", Context.SERVER), content));
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
