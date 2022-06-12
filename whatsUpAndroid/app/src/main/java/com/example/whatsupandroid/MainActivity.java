package com.example.whatsupandroid;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Button btnLogin = findViewById(R.id.buttonLogin);
        btnLogin.setOnClickListener( view -> {
            Intent i = new Intent( this, ActivityList.class);
            startActivity(i);
        });
        Button btnRegister = findViewById(R.id.buttonRegister);
        btnRegister.setOnClickListener( view -> {
            Intent i = new Intent( this, SignUp.class);
            startActivity(i);
        });
        Button btnSettings = findViewById(R.id.buttonSettings);
        btnSettings.setOnClickListener( view -> {
            Intent i = new Intent( this, Settings.class);
            startActivity(i);
        });

    }
}