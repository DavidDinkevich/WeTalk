using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Controls;

namespace WeTalkWindows.Models {
    class Context : UserControl {
        public ObservableCollection<Message> Messages { get; set; }
        public ObservableCollection<Contact> Contacts { get; set; }

        public string ActiveUserName { get; set; } = "David";

        public Context() {
            Messages = new ObservableCollection<Message>();
            Contacts = new ObservableCollection<Contact>();

            for (int i = 0; i < 14; ++i) {
                Contacts.Add(new Contact() {
                    Id = "Allison2 " + i,
                    Name = "Ally"
                });
            }
            for (int i = 0; i < 5; ++i) {
                Messages.Add(new Message("David", "you") {
                    Content = "Hello!"
                });
            }
        }

    }
}
