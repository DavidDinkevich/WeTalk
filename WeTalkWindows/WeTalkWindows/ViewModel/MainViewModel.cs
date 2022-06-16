using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WeTalkWindows.Models;

namespace WeTalkWindows.ViewModel {
    class MainViewModel {
        public ObservableCollection<Contact> Contacts { get; set; }

        public MainViewModel() {
            Contacts = new ObservableCollection<Contact>();
        }
    }
}
