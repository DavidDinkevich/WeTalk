package com.example.whatsupandroid;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;

public class Settings extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.settings);
        Button btnBackToList = findViewById(R.id.backToList);
        btnBackToList.setOnClickListener( view -> {
            Intent i = new Intent( this, ActivityList.class);
            startActivity(i);
        });
    }
}