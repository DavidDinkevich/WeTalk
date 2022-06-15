package com.example.whatsupandroid.room;

import androidx.room.Entity;
import androidx.room.PrimaryKey;

@Entity
public class Contact {
    @PrimaryKey(autoGenerate = true)
    private int realID;
    private String id;
    private String name;
    private String server;
    private String userID;

    public Contact(String id, String name, String server, String userID) {
        this.id = id;
        this.name = name;
        this.server = server;
        this.userID = userID;
    }

    public Contact() {
    }

    public String getUserID() {
        return userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }


    public int getRealID() { return realID; }
    public void setRealID(int id) {
        realID = id;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getServer() {
        return server;
    }

    public void setServer(String server) {
        this.server = server;
    }

}
