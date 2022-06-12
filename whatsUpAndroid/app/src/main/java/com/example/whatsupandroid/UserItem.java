package com.example.whatsupandroid;

import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import androidx.appcompat.app.AppCompatActivity;

import java.util.List;

public class UserItem extends AppCompatActivity {
    private AppDB db;
    private ContactDao contactDao;
    private List<Contact> contacts;
    private ArrayAdapter<Contact> adapter;
    private ListView listView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.user_chat);

//        db = Room.databaseBuilder(getApplicationContext(), AppDB.class, "ContactsDB")
//                .allowMainThreadQueries().build();
//        contactDao = db.contactDao();
////        contactDao.nukeTable();
//
//        contacts = new ArrayList<>();
//
//        listView = findViewById(R.id.list_view);
//        adapter = new ContactListAdapter(this, R.layout.user_item, contacts);
//        listView.setAdapter(adapter);
//
//        Button addContact = findViewById(R.id.add_contact_b);
//        addContact.setOnClickListener( view -> {
//            Intent i = new Intent( this, AddContact.class);
//            startActivity(i);
//        });
//
//        // HANDLE CLICK EVENT ON CONTACT
//        listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
//            @Override
//            public void onItemClick(AdapterView<?> parent, View view, int position,
//                                    long id) {
//                Intent intent = new Intent(getApplicationContext(), UserChat.class);
//                String message = "abc";
//                intent.putExtra("new_msg", message);
//                startActivity(intent);
//            }
//        });

    }

    @Override
    protected void onResume() {
        super.onResume();
        contacts.clear();
        contacts.addAll(contactDao.index());
        adapter.notifyDataSetChanged();
    }


}