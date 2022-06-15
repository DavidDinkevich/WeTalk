package com.example.whatsupandroid;

import static com.example.whatsupandroid.MyApplication.context;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.widget.ArrayAdapter;

import androidx.appcompat.app.AppCompatActivity;
import androidx.room.Room;

import com.example.whatsupandroid.api.ContactAPI;
import com.example.whatsupandroid.api.Token;
import com.example.whatsupandroid.api.WebServiceAPI;
import com.example.whatsupandroid.models.UserCred;
import com.example.whatsupandroid.room.AppDB;
import com.example.whatsupandroid.room.Contact;
import com.example.whatsupandroid.room.ContactDao;

import java.io.IOException;
import java.util.List;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class Dog extends Activity {
    private final WebServiceAPI webServiceAPI;
    private AppDB db;
    private ContactDao contactDao;


    public Dog(Context context) {

        ContactAPI contactAPI = new ContactAPI();
        this.webServiceAPI = contactAPI.getWebServiceAPI();

        db = Room.databaseBuilder(context, AppDB.class, "ContactsDB")
                .allowMainThreadQueries().build();
        contactDao = db.contactDao();

    }

    public void login(String id, String password, Runnable onDone) {
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
//                Intent i = new Intent(context, ActivityList.class);
                //startActivity(i);

                onDone.run();

            }

            @Override
            public void onFailure(Call<ResponseBody> call, Throwable t) {
            }
        });

    }

    public void fetchContacts(Runnable onDone) {
        Call<List<Contact>> callContacts = webServiceAPI.getContacts(Token.mytoken);
        callContacts.enqueue(new Callback<List<Contact>>() {
            @Override
            public void onResponse(Call<List<Contact>> call, Response<List<Contact>> response) {
                List<Contact> contacts = response.body();
                contactDao.nukeTable();
                for (Contact c : contacts) {
                    contactDao.insert(c);
                }
                onDone.run();
            }
            @Override
            public void onFailure(Call<List<Contact>> call, Throwable t) {
            }
        });
    }
}
