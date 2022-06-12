package com.example.whatsupandroid;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;

public class SignUp extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.sign_up_screen);
        Button btnSignup = findViewById(R.id.buttonSignup);
        btnSignup.setOnClickListener( view -> {
            Intent i = new Intent( this, ActivityList.class);
            startActivity(i);
        });
        Button btnLogin = findViewById(R.id.buttonLogin);
        btnLogin.setOnClickListener( view -> {
            Intent i = new Intent( this, MainActivity.class);
            startActivity(i);
        });
    }
}