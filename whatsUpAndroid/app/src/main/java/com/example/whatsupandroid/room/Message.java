package com.example.whatsupandroid.room;

import androidx.room.Entity;
import androidx.room.PrimaryKey;

@Entity
public class Message {
    @PrimaryKey(autoGenerate = true)
    private int id;
    private String sender;
    private String recipient;
    private String content;
    private String time;
    private String created;
    private boolean sent;

    public Message(String sender, String recipient, String content, String time, boolean sent) {
        this.sender = sender;
        this.recipient = recipient;
        this.content = content;
        this.time = time;
        this.created = time;
        this.sent = sent;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getRecipient() {
        return recipient;
    }

    public void setRecipient(String recipient) {
        this.recipient = recipient;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getCreated() {
        return getTime();
    }

    public void setCreated(String created) {
        setTime(created);
    }

    public boolean isSent() {
        return sent;
    }

    public void setSent(boolean sent) {
        this.sent = sent;
    }


}
