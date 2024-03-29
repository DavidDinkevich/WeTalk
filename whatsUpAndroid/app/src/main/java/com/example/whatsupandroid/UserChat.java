package com.example.whatsupandroid;

import android.content.Intent;
import android.os.Bundle;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.ListView;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;
import androidx.room.Room;

import com.example.whatsupandroid.api.Token;
import com.example.whatsupandroid.room.Message;
import com.example.whatsupandroid.room.MessageDao;
import com.example.whatsupandroid.room.MessagesDB;

import java.util.ArrayList;
import java.util.List;

public class UserChat extends AppCompatActivity {
    private MessagesDB db;
    private MessageDao messageDao;
    private List<Message> messages;
    private ArrayAdapter<Message> adapter;
    private ListView listView;
    private String activeContactID;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.user_chat);

        db = Room.databaseBuilder(getApplicationContext(), MessagesDB.class, "MessagesDB")
                .allowMainThreadQueries().fallbackToDestructiveMigration().build();
        messageDao = db.messageDao();
//        messageDao.nukeTable();

        messages = new ArrayList<>();

        listView = findViewById(R.id.message_list_view);
        adapter = new MessageListAdapter(this, R.layout.message_item_right, messages);
        listView.setAdapter(adapter);

        Intent intent = getIntent();
        TextView nameView = findViewById(R.id.user_name);

        activeContactID = intent.getStringExtra("id");
        nameView.setText(intent.getStringExtra("name"));

        ImageButton sendButton = findViewById(R.id.sendButton);

        sendButton.setOnClickListener((view) -> {
            EditText messageTextView = findViewById(R.id.messageTextField);
            if (messageTextView.getText().toString().isEmpty())
                return;

            Message newMessage = new Message(
                    Token.currentUser,
                    activeContactID,
                    messageTextView.getText().toString(),
                    "sometime",
                true
            );
            messageTextView.setText("");

            Dog dog = new Dog(getApplicationContext());
            dog.postMessage(newMessage, () -> {
                messages.clear();
                messages.addAll(messageDao.getMessagesWithContact(activeContactID));
                adapter.notifyDataSetChanged();
//                recreate();
            });

        });

        // FILL ROOM FROM SERVER
        Dog dog = new Dog(getApplicationContext());
        dog.fetchMessages(activeContactID, () -> {
            messages.clear();
            messages.addAll(messageDao.index());
            adapter.notifyDataSetChanged();
        });
    }

    @Override
    protected void onResume() {
        super.onResume();
        messages.clear();
        messages.addAll(messageDao.getMessagesWithContact(activeContactID));
        adapter.notifyDataSetChanged();
    }


}