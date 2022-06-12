package com.example.whatsupandroid;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;

import androidx.appcompat.app.AppCompatActivity;
import androidx.room.Room;

public class AddContact extends AppCompatActivity {
    private AppDB db;
    private ContactDao contactDao;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.add_contact);
        Button btnAddContact = findViewById(R.id.buttonAdd);

        db = Room.databaseBuilder(getApplicationContext(), AppDB.class, "ContactsDB")
                .allowMainThreadQueries().build();
        contactDao = db.contactDao();


        btnAddContact.setOnClickListener( view -> {
            Contact newContact = makeContactFromFields();
            contactDao.insert(newContact);

            Intent i = new Intent( this, ActivityList.class);
            i.putExtra("contactID", newContact.getId());
            i.putExtra("lastMessage", "not implemented");

            startActivity(i);
            finish();
        });
    }

    Contact makeContactFromFields() {
        EditText etContactID = findViewById(R.id.editTextPersonName);
        EditText etContactName = findViewById(R.id.nickName);
        EditText etContactIP = findViewById(R.id.IP);
        EditText etContactPort = findViewById(R.id.Port);
        String contactID = etContactID.getText().toString();
        String contactName = etContactName.getText().toString();
        String contactIP = etContactIP.getText().toString();
        String contactPort = etContactPort.getText().toString();
        String server = contactIP + ":" + contactPort;

        return new Contact(contactID, contactName, server);
    }
}