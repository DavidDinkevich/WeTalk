package com.example.whatsupandroid;

import androidx.room.Database;
import androidx.room.RoomDatabase;

@Database(version = 2, entities = {Message.class})
public abstract class MessagesDB extends RoomDatabase {
    public abstract MessageDao messageDao();
}
