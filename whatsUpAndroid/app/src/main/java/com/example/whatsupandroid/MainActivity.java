package com.example.whatsupandroid;

import static com.example.whatsupandroid.MyApplication.context;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListAdapter;

import com.example.whatsupandroid.api.ContactAPI;
import com.example.whatsupandroid.api.Token;
import com.example.whatsupandroid.api.WebServiceAPI;
import com.example.whatsupandroid.models.SignupCreds;
import com.example.whatsupandroid.models.UserCred;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.iid.FirebaseInstanceId;
import com.google.firebase.iid.InstanceIdResult;
import com.google.firebase.iid.internal.FirebaseInstanceIdInternal;

import java.io.IOException;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MainActivity extends AppCompatActivity {
    private WebServiceAPI webServiceAPI;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        ContactAPI contactAPI = new ContactAPI();
        this.webServiceAPI = contactAPI.getWebServiceAPI();

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Button btnLogin = findViewById(R.id.buttonLogin);
        btnLogin.setOnClickListener( view -> {
            String id = ((EditText)findViewById(R.id.editTextPersonName)).getText().toString();
            String password = ((EditText)findViewById(R.id.editTextPassword)).getText().toString();
            Call<ResponseBody> callLogin = this.webServiceAPI.login(new UserCred(id,password));

            callLogin.enqueue(new Callback<ResponseBody>() {
                @Override
                public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                    String token = null;
                    try {
                        token = response.body().string();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    Token.mytoken = "Bearer " + token;
                    Intent i = new Intent( context, ActivityList.class);
                    startActivity(i);
                }

                @Override
                public void onFailure(Call<ResponseBody> call, Throwable t) {

                }
            });


            Intent i = new Intent( this, ActivityList.class);
            startActivity(i);
        });

        FirebaseInstanceId.getInstance().getInstanceId().addOnSuccessListener(MainActivity.this, new OnSuccessListener<InstanceIdResult>(){
            public void onSuccess (InstanceIdResult instanceIdResult){
                String newToken = instanceIdResult.getToken();
            }
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