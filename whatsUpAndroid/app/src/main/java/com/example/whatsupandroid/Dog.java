package com.example.whatsupandroid;

import android.app.Activity;
import android.content.Context;
import android.util.Log;
import android.widget.Toast;

import androidx.room.Room;

import com.example.whatsupandroid.api.ContactAPI;
import com.example.whatsupandroid.api.Token;
import com.example.whatsupandroid.api.WebServiceAPI;
import com.example.whatsupandroid.models.SetFirebaseTokenRequest;
import com.example.whatsupandroid.models.UserCred;
import com.example.whatsupandroid.room.AppDB;
import com.example.whatsupandroid.room.Contact;
import com.example.whatsupandroid.room.ContactDao;
import com.example.whatsupandroid.room.Message;
import com.example.whatsupandroid.room.MessageDao;
import com.example.whatsupandroid.room.MessagesDB;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.iid.FirebaseInstanceId;
import com.google.firebase.iid.InstanceIdResult;

import java.io.IOException;
import java.util.List;

import javax.net.ssl.HttpsURLConnection;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.http.HTTP;

public class Dog extends Activity {
    private final WebServiceAPI webServiceAPI;
    private AppDB contactsDB;
    public static MainActivity activity;
    private ContactDao contactDao;
    private MessagesDB messagesDB;
    private MessageDao messageDao;
    private Context context;


    public Dog(Context context) {
        this.context = context;

        ContactAPI contactAPI = new ContactAPI();
        this.webServiceAPI = contactAPI.getWebServiceAPI();

        contactsDB = Room.databaseBuilder(context, AppDB.class, "ContactsDB")
                .allowMainThreadQueries().build();
        contactDao = contactsDB.contactDao();
        messagesDB = Room.databaseBuilder(context, MessagesDB.class, "MessagesDB")
                .allowMainThreadQueries().build();
        messageDao = messagesDB.messageDao();

    }

    public void serverConnectionError() {
        Toast toat = Toast.makeText(context, "Couldn't establish server connection", Toast.LENGTH_SHORT);
        toat.show();

    }

    public void setFirebaseTokenInServer() {
        String id = Token.currentUser;
        FirebaseInstanceId.getInstance().getInstanceId().addOnSuccessListener(this, (OnSuccessListener<InstanceIdResult>) instanceIdResult -> {
            String newToken = instanceIdResult.getToken();
            Call <Void> tokenCall = webServiceAPI.createToken(new SetFirebaseTokenRequest(newToken), Token.mytoken);
            tokenCall.enqueue(new Callback<Void>() {
                @Override
                public void onResponse(Call<Void> call, Response<Void> response) {
                    Log.d("firebase", "success");
                }

                @Override
                public void onFailure(Call<Void> call, Throwable t) {
                    Log.e("firebase", "failure");
                }
            });
        });
    }

    public void login(String id, String password, Runnable onSuccess, Runnable onFailure) {

        Call<ResponseBody> callLogin = this.webServiceAPI.login(new UserCred(id, password));

        callLogin.enqueue(new Callback<ResponseBody>() {
            @Override
            public void onResponse(Call<ResponseBody> call, Response<ResponseBody> response) {
                if (response.code() == HttpsURLConnection.HTTP_OK) {
                    String token = null;
                    try {
                        token = response.body().string();
                        Token.currentUser = id;
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    Token.mytoken = "Bearer " + token;
                    setFirebaseTokenInServer();
//                Intent i = new Intent(context, ActivityList.class);
                    //startActivity(i);
                    onSuccess.run();
                } else {
                    onFailure.run();
                }

            }

            @Override
            public void onFailure(Call<ResponseBody> call, Throwable t) {
                serverConnectionError();
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
                serverConnectionError();
            }
        });
    }

    public void postContact(Contact c, Runnable onDone) {
        Call<Contact> callLogin = this.webServiceAPI.postContact(Token.mytoken, c);

        callLogin.enqueue(new Callback<Contact>() {
            @Override
            public void onResponse(Call<Contact> call, Response<Contact> response) {
                if (response.code() == HttpsURLConnection.HTTP_CREATED) {
                    contactDao.insert(c);
                    onDone.run();
                } else {
                    Toast toast = Toast.makeText(context, "Contact details are invalid", Toast.LENGTH_SHORT);
                    toast.show();
                }
            }

            @Override
            public void onFailure(Call<Contact> call, Throwable t) {
                serverConnectionError();
            }
        });
    }

    public void fetchMessages(String contactId, Runnable onDone) {
        Call<List<Message>> messagesCall = webServiceAPI.getMessagesWithContact(Token.mytoken, contactId);
        messagesCall.enqueue(new Callback<List<Message>>() {
            @Override
            public void onResponse(Call<List<Message>> call, Response<List<Message>> response) {
                List<Message> messages = response.body();
                messageDao.nukeTable();
                for (Message m : messages) {
                    messageDao.insert(m);
                }
                onDone.run();
            }
            @Override
            public void onFailure(Call<List<Message>> call, Throwable t) {
                serverConnectionError();
            }
        });
    }

    public void postMessage(Message m, Runnable onDone) {
        Call<Message> callMessage = webServiceAPI.postMessage(Token.mytoken, m.getRecipient(), m);

        callMessage.enqueue(new Callback<Message>() {
            @Override
            public void onResponse(Call<Message> call, Response<Message> response) {
                messageDao.insert(m);
                onDone.run();
            }

            @Override
            public void onFailure(Call<Message> call, Throwable t) {
                serverConnectionError();
            }
        });
    }


}
