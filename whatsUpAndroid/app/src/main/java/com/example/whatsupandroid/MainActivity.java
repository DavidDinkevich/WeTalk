package com.example.whatsupandroid;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;

import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.iid.FirebaseInstanceId;
import com.google.firebase.iid.InstanceIdResult;
import com.google.firebase.iid.internal.FirebaseInstanceIdInternal;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        FirebaseInstanceId.getInstance().getInstanceId().addOnSuccessListener(MainActivity.this, new OnSuccessListener<InstanceIdResult>(){
            public void onSuccess (InstanceIdResult instanceIdResult){
                String newToken = instanceIdResult.getToken();
            }
        });

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