package com.example.whatsupandroid.api;
import androidx.lifecycle.MutableLiveData;

import com.example.whatsupandroid.MyApplication;
import com.example.whatsupandroid.R;
import com.example.whatsupandroid.room.Contact;
import com.example.whatsupandroid.room.ContactDao;

import java.util.List;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class ContactAPI {
//    private MutableLiveData<List<Contact>> contactListData;
//    private ContactDao contactDao;
    public Retrofit retrofit;
    public WebServiceAPI webServiceAPI;

    public ContactAPI() {
//        this.contactListData = contactListData;
//        this.contactDao = contactDao;

        retrofit = new Retrofit.Builder().baseUrl(MyApplication.context.getString(R.string.BaseUrl))
                .addConverterFactory(GsonConverterFactory.create())
                .build();
        webServiceAPI = retrofit.create(WebServiceAPI.class);

    }

    public WebServiceAPI getWebServiceAPI(){
        return this.webServiceAPI;
    }

}