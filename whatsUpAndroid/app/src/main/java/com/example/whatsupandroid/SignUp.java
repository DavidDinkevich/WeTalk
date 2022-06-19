package com.example.whatsupandroid;

import static com.example.whatsupandroid.MyApplication.context;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.example.whatsupandroid.api.ContactAPI;
import com.example.whatsupandroid.api.Token;
import com.example.whatsupandroid.api.WebServiceAPI;
import com.example.whatsupandroid.models.SignupCreds;

import java.io.IOException;

import javax.net.ssl.HttpsURLConnection;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class SignUp extends AppCompatActivity {
    private WebServiceAPI webServiceAPI;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        ContactAPI contactAPI = new ContactAPI();
        this.webServiceAPI = contactAPI.getWebServiceAPI();

        super.onCreate(savedInstanceState);
        setContentView(R.layout.sign_up_screen);
        Button btnSignup = findViewById(R.id.buttonSignup);
        btnSignup.setOnClickListener( view -> {
            String id = ((EditText)findViewById(R.id.editTextPersonName)).getText().toString();
            String nickname = ((EditText)findViewById(R.id.nickName)).getText().toString();
            String password = ((EditText)findViewById(R.id.editTextPassword)).getText().toString();
            String confirm_password = ((EditText)findViewById(R.id.confirmPassword)).getText().toString();
            String server = "10.0.2.2:5013";

            if (!password.equals(confirm_password)) {
                Toast t = Toast.makeText(this, "Passwords do not match", Toast.LENGTH_SHORT);
                t.show();
                return;
            }

            Call<ResponseBody> callSignup = this.webServiceAPI.signup(new SignupCreds(id,nickname,password, server));
            callSignup.enqueue(new Callback<ResponseBody>() {
                @Override
                public void onResponse( Call<ResponseBody> call, Response<ResponseBody> response) {
                    if (response.code() == HttpsURLConnection.HTTP_OK) {
                        String token = null;
                        try {
                            token = response.body().string();
                            Token.currentUser = id;
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                        Token.mytoken = "Bearer " + token;
                        Dog dog = new Dog(getApplicationContext());
                        dog.setFirebaseTokenInServer();
                        Intent i = new Intent(context, ActivityList.class);
                        startActivity(i);
                    } else {
                        Toast t = Toast.makeText(getApplicationContext(), "Username or password is invalid", Toast.LENGTH_SHORT);
                        t.show();
                    }
                }


                @Override
                public void onFailure(Call<ResponseBody> call, Throwable t) {
                    Toast toat = Toast.makeText(getApplicationContext(), "Couldn't establish server connection", Toast.LENGTH_SHORT);
                    toat.show();
                }
            });
        });
        Button btnLogin = findViewById(R.id.buttonLogin);
        btnLogin.setOnClickListener( view -> {
            Intent i = new Intent( this, MainActivity.class);
            startActivity(i);
        });
    }
}