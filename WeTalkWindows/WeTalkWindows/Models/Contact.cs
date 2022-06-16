﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WeTalkWindows.Models {
    class Contact {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Server { get; set; }
        public string UserID { get; set; }
        public string LastMessage { get; set; } = "bla";
    }
}
