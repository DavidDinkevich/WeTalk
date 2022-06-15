package com.example.whatsupandroid.api;

import com.example.whatsupandroid.models.SignupCreds;
import com.example.whatsupandroid.models.UserCred;
import com.example.whatsupandroid.room.Contact;
import com.example.whatsupandroid.room.Message;

import java.util.List;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.DELETE;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.POST;
import retrofit2.http.Path;

public interface WebServiceAPI {

    @POST("Signup")
    Call <ResponseBody> signup(@Body SignupCreds request);

    @POST("Login")
    Call <ResponseBody> login(@Body UserCred request);

}
