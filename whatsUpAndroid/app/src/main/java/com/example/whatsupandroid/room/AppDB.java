package com.example.whatsupandroid.room;

import androidx.room.Database;
import androidx.room.RoomDatabase;

@Database(version = 3, entities = {Contact.class})
public abstract class AppDB extends RoomDatabase {
    public abstract ContactDao contactDao();
}