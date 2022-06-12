package com.example.whatsupandroid;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.ListView;

public class ActivityList extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_list);
//        ListView btnContact = findViewById(R.id.list_view);
//        btnContact.setClickable(true);
//        btnContact.setOnClickListener( view -> {
//            Intent i = new Intent( this, UserChat.class);
//            startActivity(i);
//        });
        Button btnAddContact = findViewById(R.id.add_contact_b);
        btnAddContact.setOnClickListener( view -> {
            Intent i = new Intent( this, AddContact.class);
            startActivity(i);
        });
    }
}