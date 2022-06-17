using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Net.Http;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json;
using System.Windows.Controls;
using System.IO;
using Newtonsoft.Json.Linq;
using System.Windows;

namespace WeTalkWindows.Models {
    public class Context : Obs {
        private static readonly HttpClient client = new HttpClient();
        public static string SERVER = "127.0.0.1:5013";
        public static string TOKEN = "";
        public static string ActiveUserName { get; set; } = "David";
        public static string ActiveUserID { get; set; } = "David100";

        public ObservableCollection<Message> Messages { get; set; }
        public ObservableCollection<Contact> Contacts { get; set; }


        private string _activeContactName = "";
        public string ActiveContactName {
            get { return _activeContactName; }
            set {
                if (value != null) {
                    _activeContactName = value;
                    OnPropertyChanged();
                }
            }
        }
        private Contact activeContact;
        public Contact ActiveContact {
            set {
                activeContact = value;
                ActiveContactName = activeContact?.Name;
                GetMessages();
            }
            get { return activeContact; }
        }

        private string _msgText = "";
        public string MessageText {
            get { return _msgText; }
            set {
                _msgText = value;
                OnPropertyChanged();
            }
        }

        public RelayCommand SendMessage { get; set; }



        //public TextBox Message { get; set; }

        public Context() {
            client.DefaultRequestHeaders.Add("Authorization", "Bearer " + TOKEN);


            Messages = new ObservableCollection<Message>();
            Contacts = new ObservableCollection<Contact>();

            SendMessage = new RelayCommand(o => {
                if (ActiveContact != null) {
                    Message newMessage = new(ActiveUserName, ActiveContact.Name) {
                        Content = _msgText
                    };
                    Messages.Add(newMessage);
                    PostMessage(newMessage.Content);
                    MessageText = "";
                }
                GetContacts();
            });

            GetContacts();

        }

        public void GetContacts() {
            var task = Task.Run(() => client.GetAsync(string.Format("http://{0}/api/contacts", SERVER)));
            task.Wait();
            var response = task.Result;
            if (response.StatusCode == System.Net.HttpStatusCode.OK) {
                Stream s = response.Content.ReadAsStream();
                StreamReader readStream = new StreamReader(s, Encoding.UTF8);
                string strResp = readStream.ReadToEnd();
                var options = new JsonSerializerOptions {
                    PropertyNameCaseInsensitive = true
                };
                var contacts = JsonSerializer.Deserialize<List<Contact>>(strResp, options);
                Contacts.Clear();
                foreach (var c in contacts)
                    Contacts.Add(c);
            }
        }

        public void GetMessages() {
            if (ActiveContact == null)
                return;
            var task = Task.Run(() => client.GetAsync(string.Format("http://{0}/api/contacts/{1}/messages", SERVER, ActiveContact.Id)));
            task.Wait();
            var response = task.Result;
            if (response.StatusCode == System.Net.HttpStatusCode.OK) {
                Stream s = response.Content.ReadAsStream();
                StreamReader readStream = new StreamReader(s, Encoding.UTF8);
                string strResp = readStream.ReadToEnd();
                var options = new JsonSerializerOptions {
                    PropertyNameCaseInsensitive = true
                };
                var messages = JsonSerializer.Deserialize<List<Message>>(strResp, options);
                Messages.Clear();
                foreach (var c in messages)
                    Messages.Add(c);
            }
        }

        public void PostMessage(string msg) {
            JObject oJsonObject = new JObject();
            oJsonObject.Add("from", ActiveUserID);
            oJsonObject.Add("to", activeContact.Id);
            oJsonObject.Add("content", msg);

            var content = new StringContent(oJsonObject.ToString(), Encoding.UTF8, "application/json");

            var task = Task.Run(() => client.PostAsync(string.Format("http://{0}/api/contacts/{1}/messages", SERVER, ActiveContact.Id), content));
            //task.Wait();
        }

    }

}
