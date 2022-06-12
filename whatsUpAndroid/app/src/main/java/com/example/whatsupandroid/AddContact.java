package com.example.whatsupandroid;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;

public class AddContact extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.add_contact);
        Button btnAddContact = findViewById(R.id.buttonAdd);
        btnAddContact.setOnClickListener( view -> {
            Intent i = new Intent( this, ActivityList.class);
            startActivity(i);
        });
    }
}