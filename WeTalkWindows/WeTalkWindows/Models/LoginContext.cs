using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WeTalkWindows.Models {
    public class LoginContext : Obs {

        public string Password { get; set; }

        private string _emailText = "";
        public string EmailText {
            get { return _emailText; }
            set {
                _emailText = value;
                OnPropertyChanged();
            }
        }

        public void AttemptLogin() {
            Console.WriteLine(EmailText);

            MainWindow mw = new MainWindow();
            mw.Show();
        }


    }
}
